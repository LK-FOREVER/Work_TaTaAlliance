import { _decorator, Component, Node, instantiate, Prefab, Label, Button, Sprite, RichText, ScrollView, Animation, UITransform } from 'cc';
import LoadUtils from '../../Utils/LoadUtils';
import EventManager from '../../Common/EventManager';
import EventConst from '../../Utils/EventConst';
import { StorageManager } from '../../Managers/StorageManager';
import { Const } from '../../const/consts';
const { ccclass, property } = _decorator;

@ccclass('notice_view')
export default class notice_view extends Component {
	noticeData: any[] = null;
	notice_item: Node = null;
	@property({ type: Node })
	notice_tab_container: Node = null;
	@property({ type: Node })
	text_title: Node = null;
	@property({ type: Node })
	text_content: Node = null;
	@property({ type: Node })
	label_name: Node = null;
	@property(Prefab)
	noticeItemPrefab: Prefab = null;
	selectedIndex: number = 0;
	start() {
		// 请求公告信息
		fetch(Const.notice_url + `?random=${Date.now()}`).then((response: Response) => {
			return response.text()
		}).then((value) => {
			this.noticeData = JSON.parse(value)
			this.loadResourcePrefab()
		})
	}
	// 加载预制体
	loadResourcePrefab() {
		for (let i = 0; i < this.noticeData.length; i += 1) {
			const noticeDataItem = this.noticeData[i];
			const item = instantiate(this.noticeItemPrefab);
			this.notice_tab_container.addChild(item);
			item.getChildByName("notice_item_title").getComponent(Label).string = noticeDataItem.tab
			if (i === 0) {
				item.getChildByName("notice_label").getComponent(Sprite).spriteFrame = LoadUtils.Instance.notice.getSpriteFrame("notice_label_topping");
			} else {
				item.getChildByName("notice_label").getComponent(Sprite).spriteFrame = LoadUtils.Instance.notice.getSpriteFrame("notice_label_activity");
			}
		}

		for (let i = 0; i < this.notice_tab_container.children.length; i += 1) {
			const item = this.notice_tab_container.children[i];
			item.on(Button.EventType.CLICK, this.updateTab, this);
			item["index"] = i;
		}
		this.updateTab(null);
	}
	updateTab(event) {
		if (event === null) {
			this.selectedIndex = 0;
		} else {
			if (event.target["index"] !== this.selectedIndex){
				this.selectedIndex = event.target["index"];
				this.node.getChildByName("container").getComponent(Animation).play()
			}
		}
		for (let i = 0; i < this.notice_tab_container.children.length; i += 1) {
			const item = this.notice_tab_container.children[i];
			if (i === this.selectedIndex) {
				item.getChildByName("notice_item_bg").getComponent(Sprite).spriteFrame = LoadUtils.Instance.notice.getSpriteFrame("notice_tab_selected");
			} else {
				item.getChildByName("notice_item_bg").getComponent(Sprite).spriteFrame = LoadUtils.Instance.notice.getSpriteFrame("notice_tab_default");
			}
		}
		if(this.noticeData.length == 0)
		{
			return;
		}
		// 更新文字
		let tabName = this.noticeData[this.selectedIndex].tab;
		if(tabName.length > 23) {
			tabName = tabName.substring(0, 23);
		}
		this.label_name.getComponent(Label).string = tabName;
		this.label_name.getComponent(Label).updateRenderData(true);
		if(tabName.length < 6) {
			this.label_name.parent.getComponent(UITransform).width = 280; //最小值
		} else {
			const w = this.label_name.getComponent(UITransform).width;
			this.label_name.parent.getComponent(UITransform).width = w + 20;
		}

		this.text_title.getComponent(Label).string = this.noticeData[this.selectedIndex].title;
		this.text_content.getComponent(RichText).string = this.noticeData[this.selectedIndex].content;
		this.node.getChildByName("container").getChildByName("notice_text_scroll").getComponent(ScrollView).scrollToTop(0.1);
		StorageManager.Instance.saveLocalStorage(Const.account + "notice" + this.noticeData[this.selectedIndex].tab, 1);
	}
	close() {
		EventManager.Instance.emit(EventConst.OPEN_NOTICE_VIEW, false);
	}
}