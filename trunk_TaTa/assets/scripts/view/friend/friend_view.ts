import { _decorator, Button, Color, Component, Label, Node, EditBox, Sprite, v3, Texture2D, SpriteFrame } from 'cc';
import Utils from '../../Utils/Utils';
import EventConst from '../../Utils/EventConst';
import EventManager from '../../Common/EventManager';
import friend_module from '../../module/friend_module';
import { friend_item } from './item/friend_item';
import TxtUtils from '../../Utils/TxtUtils';
import LoadUtils from '../../Utils/LoadUtils';
import common_scrollView from '../../Common/common_scrollView';
import { ToastControllers } from '../../Common/ToastControllers';
import { TextUtils } from '../../Common/TextUtils';
const { ccclass, property } = _decorator;

const BADGE_POSITION = v3(110, 30);

@ccclass('friend_view')
export class friend_view extends Component {
	@property(common_scrollView)
	scrollView: common_scrollView = null;
    @property(Node)
    num_text: Node = null;
	@property(Node)
	friendSearchNode: Node = null; // 搜索框
	@property(EditBox)
	editBox: EditBox = null; // 搜索框
    @property(Node)
    close_btn: Node = null; // 关闭按钮
    @property(SpriteFrame) 
    tab_bg_1: SpriteFrame = null!; // tab背景,选中
    @property(SpriteFrame)
    tab_bg_2: SpriteFrame = null!; // tab背景,未选中
    // 选中的tab
    selectedIdx = 0;
    tab_bg: Node = null!;
    board: Node = null!;
    container: Node = null!;
    // 好友的请求数据
    friendData: any = null;
    // 当前列表的数据
    nowList: any;

    protected onLoad(): void {
		// Utils.create_common_top(EventConst.OPEN_FRIEND_VIEW, "common_top_tn_friend", [], this.node);
        EventManager.Instance.on(EventConst.UPDATE_FRIEND_LIST, this.updateList, this);

		this.tab_bg = this.node.getChildByName("tab_bg");
        this.board = this.node.getChildByName("board");
        this.container = this.node.getChildByName("container");
    }
    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.UPDATE_FRIEND_LIST, this.updateList, this);
    }
    start() {
        this.tab_bg.children.forEach((item, idx) => {
            item.on(Button.EventType.CLICK, this.tab_btn_handler, this);
        });
        this.close_btn.on(Button.EventType.CLICK, () => {
            EventManager.Instance.emit(EventConst.OPEN_FRIEND_VIEW, false);
        })
    }

	init(index) {
		this.selectedIdx = index;
        this.change_board();
	}
	search_handler() {
		const searchValue = this.editBox.string.trim();
		EventManager.Instance.emit(EventConst.QUERY_305, searchValue);
	}
    // 一键操作
    all_opt_handler(evt) {
        let target_name = evt.target.name;
        if (this.nowList === undefined || this.nowList === null) {
            ToastControllers.Instance.showToast("您的列表为空");
            return;
        }
        const full_id_list = [];
        this.nowList.forEach(item => {
            full_id_list.push(item.other_player_full_id);
        });
        if (target_name == "agree_btn") {
            // 一键同意
            EventManager.Instance.emit(EventConst.QUERY_312, full_id_list);
        } else if (target_name == "reject_btn") {
            // 一键拒绝
            EventManager.Instance.emit(EventConst.QUERY_314, full_id_list);
        } else if (target_name == "remove_btn") {
            // 一键移除黑名单
            EventManager.Instance.emit(EventConst.QUERY_317, full_id_list);
        }
    }

    tab_btn_handler(evt) {
        let idx = evt.target.getSiblingIndex();
        if (this.selectedIdx == idx) {
            return;
        }
        this.selectedIdx = idx;
        this.change_board();
    }
    change_board() {
        this.tab_bg.children.forEach((item, idx) => {
            const selectedBg = item.getChildByName("selected_bg");
            const titleLabel = item.getChildByName("title").getComponent(Label);
            // titleLabel.color = idx === this.selectedIdx ? new Color('#5c271f') : new Color('#d9a475');
			// item.getChildByName("title").getComponent(Label).enableOutline = idx === this.selectedIdx;
			// selectedBg.getComponent(Sprite).spriteFrame = LoadUtils.Instance.friend.getSpriteFrame(idx === this.selectedIdx? "friend_3": "friend_2");
			selectedBg.getComponent(Sprite).spriteFrame = idx === this.selectedIdx? this.tab_bg_1: this.tab_bg_2;
        });
        const TAB_CONFIGS = [
            {queryEvent: EventConst.QUERY_300}, // 获取好友
            {queryEvent: EventConst.QUERY_305}, // 推荐好友
            {queryEvent: EventConst.QUERY_310}, // 好友申请
            {queryEvent: EventConst.QUERY_315}, // 黑名单
        ];
        const tabConfig = TAB_CONFIGS[this.selectedIdx];
        EventManager.Instance.emit(tabConfig.queryEvent);

		// this.friendSearchNode.active = (this.selectedIdx === 0 || this.selectedIdx === 1);
    }

	public removeAllSuggestFriendList() {
		this.scrollView.removeChildren();
	}
    // 更新列表
    public updateList(selectedIdx: number) {
        if (selectedIdx !== this.selectedIdx && selectedIdx !== 999) return
        this.friendData = friend_module.Instance.get_model();
        switch (this.selectedIdx) {
            case 0:
                this.nowList = this.friendData.get_friend_list().friend_list; //好友列表
                break;
            case 1:
                this.nowList = this.friendData.get_suggest_friend_list();   //推荐好友
                break;
            case 2:
                this.nowList = this.friendData.get_application_friend_list().relation_list; //好友申请列表
                break;
            case 3:
                this.nowList = this.friendData.get_black_list().relation_list;  // 黑名单列表
                break;
        }
        const messages = {
            0: "您还没有好友！快去结交一些吧！",
            1: "暂时没有推荐好友！",
            2: "暂时没有好友申请！",
            3: "暂时没有拉黑玩家！",
        };
		this.node.getChildByName("bg").getChildByName("refresh").active = false;
		this.node.getChildByName("bg").getChildByName("addAll").active = false;
		this.node.getChildByName("bg").getChildByName("agreeAll").active = false;
		this.node.getChildByName("bg").getChildByName("rejectAll").active = false;
		this.node.getChildByName("bg").getChildByName("removeAll").active = false;
        if (this.nowList) {
            if (this.nowList.length === 0) {
				this.scrollView.node.active = false;
                this.updateFriendNothingNode(true, messages[this.selectedIdx]);
            } else {
                this.updateFriendNothingNode(false);
				this.node.getChildByName("bg").getChildByName("refresh").active = this.selectedIdx === 1;
				this.node.getChildByName("bg").getChildByName("addAll").active = this.selectedIdx === 1;
				this.node.getChildByName("bg").getChildByName("agreeAll").active = this.selectedIdx === 2;
				this.node.getChildByName("bg").getChildByName("rejectAll").active = this.selectedIdx === 2;
				this.node.getChildByName("bg").getChildByName("removeAll").active = this.selectedIdx === 3;
            }
			this.scrollView.node.active = true;
			this.scrollView.initData(this.nowList.length, (itemNode: Node, index)=>{
				itemNode.getChildByName('friend_item_bg').getChildByName('function_list').children.forEach((funNode, index) => {
					funNode.active = index === this.selectedIdx;
				});
				itemNode.getComponent(friend_item).setData(this.nowList[index], this.selectedIdx);
			});
        } else {
			this.scrollView.node.active = false;
            this.updateFriendNothingNode(true, messages[this.selectedIdx]);
        }
        // 更新下方文字
        let listLength: number;
        if (this.nowList === undefined || this.nowList === null) {
            listLength = 0;
        } else {
            listLength = this.nowList.length;
        }
        switch (this.selectedIdx) {
            case 0:
                this.num_text.getComponent(Label).string = `好友数量：${listLength}/${TextUtils.Instance.friend__get_const.get("limit_num").value}`;
                break;
            case 1:
                this.num_text.getComponent(Label).string = `推荐好友：${listLength}/${TextUtils.Instance.friend__get_const.get("limit_num").value}`;
                break;
            case 2:
                this.num_text.getComponent(Label).string = `好友申请：${listLength}/${TextUtils.Instance.friend__get_const.get("apply_add_friend_max_num").value}`;
                break;
            case 3:
                this.num_text.getComponent(Label).string = `黑名单：${listLength}/${TextUtils.Instance.friend__get_const.get("black_limit_num").value}`;
                break;

            default:
                break;
        }
    }

	clearScrollView() {
		this.scrollView.removeChildren();
	}

    // 更新没有好友的节点
    updateFriendNothingNode(active: boolean, message?: string) {
        const friendNothingNode = this.node.getChildByName("bg").getChildByName("friend_nothing");
        friendNothingNode.active = active;
        if (message) {
            const labelNode = friendNothingNode.getChildByName("Label").getComponent(Label);
            labelNode.string = message;
        }
    }
	//推荐好友：刷新
	private refresh() {
		EventManager.Instance.emit(EventConst.QUERY_305);
	}
	//推荐好友：一键添加
	private addAll() {
		if(!this.nowList || this.nowList.length === 0) return;
		let params = []
		for(let i = 0; i < this.nowList.length; i += 1) {
			params.push(this.nowList[i].other_player_full_id);
		}
		EventManager.Instance.emit(EventConst.QUERY_307, params);
	}
	//好友申请：都同意
	private agreeAll() {
		EventManager.Instance.emit(EventConst.QUERY_312, this.nowList);
	}
	//好友申请：都拒绝
	private rejectAll() {
		EventManager.Instance.emit(EventConst.QUERY_314, this.nowList);
	}
	//一键移除黑名单
	private removeAll() {
		EventManager.Instance.emit(EventConst.QUERY_317, this.nowList);
	}
}
