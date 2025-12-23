import { _decorator, Component, Prefab, Node, Label, UITransform, Button, instantiate, Sprite, Vec3, Color, ScrollView } from 'cc';
import Utils from '../../Utils/Utils';
import EventConst from '../../Utils/EventConst';
import common_scrollView from '../../Common/common_scrollView';
import TxtUtils from '../../Utils/TxtUtils';
import { rank_tab_item } from './item/rank_tab_item';
import EventManager from '../../Common/EventManager';
import { rank_top_item } from './item/rank_top_item';
import { rank_item } from './item/rank_item';
import _ from 'lodash';
import { rank_my_item } from './item/rank_my_item';
import LoadUtils from '../../Utils/LoadUtils';
import rank_module from '../../module/rank_module';
import { TextUtils } from '../../Common/TextUtils';
const { ccclass, property } = _decorator;

const scrollViewContentMaxHeight = 273 + 100 * 113 + 99 * 10;
const scrollViewHeight = 650;

const rankChunk = 100; //每页100

@ccclass('rank_view')
export default class rank_view extends Component {
	@property(Node)
	leftTabsNode: Node = null;
	@property(Prefab)
	tabPrefab: Prefab = null;
	@property(Node)
	rankTitlesNode: Node = null;
	@property(common_scrollView)
	commonScrollView: common_scrollView = null;
	@property(Node)
	pageNode: Node = null;
	@property(Node)
	myRankNode: Node = null;
	@property(Node)
	sideBarNode: Node = null;
	@property(Node)
	close_btn: Node = null;
	@property(Prefab)
	normalPrefab: Prefab = null;
	@property(Prefab)
	otherPrefab: Prefab = null;
	@property(Prefab)
	endlessPrefab: Prefab = null;
	@property(ScrollView)
	scrollView: ScrollView = null;

	private _rankId = 0;
	private _rankLeftTabMap: Map<number, Node> = new Map();
	private page: number = 1;
	private max_num: number = 0;

	private _rank_chunk_item_list = [];

	protected onLoad(): void {
		// Utils.create_common_top(EventConst.OPEN_RANK_VIEW,"common_top_tn_rank",[],this.node, 11);
		this.scrollView.node.on("scrolling", this.scollCallback, this);
		this.close_btn.on(Button.EventType.CLICK, () => {
			EventManager.Instance.emit(EventConst.OPEN_RANK_VIEW, false);
		}, this);
	}

	public init(rankId) {
		this._rankId = rankId;
		this._updateTab();
		for (let i = 0; i < this.pageNode.children.length; i += 1) {
			this.pageNode.children[i].on(Button.EventType.CLICK, this.page_click_handler, this);
			this.pageNode.children[i]["chunkIndex"] = i;
		}
	}

	private _updateTab() {
		const openIdsArray = [];
		const rankConf = TextUtils.Instance.getRankConf();
		for (let [key, value] of rankConf) {
			openIdsArray.push(key);
		}

		for (let i = 0; i < openIdsArray.length; i += 1) {
			const rc = TextUtils.Instance.getRankConfById(openIdsArray[i]);
			const leftTab = instantiate(this.tabPrefab);
			this.leftTabsNode.addChild(leftTab);
			leftTab.getComponent(rank_tab_item).init(this.node, openIdsArray[i], rc);
			this._rankLeftTabMap.set(openIdsArray[i], leftTab);
		}
		if (this._rankLeftTabMap.get(this._rankId)) {
			this._rankLeftTabMap.get(this._rankId).getComponent(rank_tab_item).clickTab();
		} else {
			this._rankLeftTabMap.values().next().value.getComponent(rank_tab_item).clickTab();
		}
	}
	clickLeftTab(rankId) {
		this._rankId = rankId;
		for (let [key, value] of this._rankLeftTabMap) {
			value.getComponent(rank_tab_item).setSelectedSprite(key === rankId);
		}
		this.rankTitlesNode.getChildByName("normal").active = false;
		this.rankTitlesNode.getChildByName("endless").active = false;
		this.rankTitlesNode.getChildByName("power").active = false;
		this.rankTitlesNode.getChildByName("library").active = false;
		if (this._rankId === 1001) {
			this.rankTitlesNode.getChildByName("endless").active = true;
		} else if (this._rankId === 1002 || this._rankId === 1004) {
			this.rankTitlesNode.getChildByName("normal").active = true;
		} else {
			// this.rankTitlesNode.getChildByName("library").active = true;
		}

		this.sideBarNode.active = this._rankId === 1004;
		rank_module.Instance.get_model().currentRankId = this._rankId;
		this.page_click_handler(0);
		if (this._rankId === 1004) {
			this.sideBarNode.getChildByName("6").active = true;
			this.sideBarNode.getChildByName("7").active = true;

			const node5 = this.sideBarNode.getChildByName("5");
			node5.setPosition(new Vec3(0, -437));
			const node6 = this.sideBarNode.getChildByName("6");
			node6.setPosition(new Vec3(0, -262));
			this.sideBarNode.getComponent(UITransform).height = 175 * 3;
			const node7 = this.sideBarNode.getChildByName("7");
			node7.setPosition(new Vec3(0, -87));
			this.clickSubArena(null, 1006);


			return;
		}
	}
	clickSubArena(event, rankId) {
		rankId = Number(rankId);
		rank_module.Instance.get_model().currentRankId = rankId;
		const node5 = this.sideBarNode.getChildByName("5");
		const node6 = this.sideBarNode.getChildByName("6");
		const node7 = this.sideBarNode.getChildByName("7");
		if (rankId === 1006) {
			this.sideBarNode.getChildByName("rank_8").setPosition(new Vec3(0, node7.position.y));
			node7.getComponent(Label).color = new Color("#5b241d");
			node6.getComponent(Label).color = new Color("#8c7959");
			node5.getComponent(Label).color = new Color("#8c7959");
		} if (rankId === 1005) {
			this.sideBarNode.getChildByName("rank_8").setPosition(new Vec3(0, node6.position.y));
			node5.getComponent(Label).color = new Color("#8c7959");
			node6.getComponent(Label).color = new Color("#5b241d");
			node7.getComponent(Label).color = new Color("#8c7959");
		} if (rankId === 1004) {
			this.sideBarNode.getChildByName("rank_8").setPosition(new Vec3(0, node5.position.y));
			node7.getComponent(Label).color = new Color("#8c7959");
			node6.getComponent(Label).color = new Color("#8c7959");
			node5.getComponent(Label).color = new Color("#5b241d");
		}
		EventManager.Instance.emit(EventConst.QUERY_5901, rankId, 1, rankChunk);
	}
	reply5901(data) {
		//console.log('%c [ data ]-166', 'font-size:13px; background:pink; color:#bf2c9f;', data)
		this.max_num = data.sub_rank.num
		const v = data.sub_rank.rank_item_list;
		v.sort((a, b) => {
			return a.rank - b.rank;
		})
		// this.node.getChildByName("bg").getChildByName("rank_top1").getComponent(rank_top_item).init(v[0], this._rankId);
		// this.node.getChildByName("bg").getChildByName("rank_top2").getComponent(rank_top_item).init(v[1], this._rankId);
		// this.node.getChildByName("bg").getChildByName("rank_top3").getComponent(rank_top_item).init(v[2], this._rankId);
		if (this._rankId === 1001) {
			this.commonScrollView.setItemPrefab(this.normalPrefab);
		} else if (this._rankId === 1002 || this._rankId === 1004) {
			this.commonScrollView.setItemPrefab(this.endlessPrefab);
		} else {
			this.commonScrollView.setItemPrefab(this.endlessPrefab);
		}
		this._rank_chunk_item_list = v;

		//显示下面自己的信息
		this.showMyItemData(data.my_rank);
		//分页显示数据
		this.fresh_list();
		this.update_page_node();

	}
	private showMyItemData(myRank) {
		let prefabNode: Node;
		this.myRankNode.destroyAllChildren();
		if (this._rankId === 1001) {
			prefabNode = instantiate(this.normalPrefab);
		} else if (this._rankId === 1002 || this._rankId === 1004) {
			prefabNode = instantiate(this.endlessPrefab);
		} else {
			prefabNode = instantiate(this.endlessPrefab);
		}
		prefabNode.setPosition(new Vec3(0, 0));
		this.myRankNode.addChild(prefabNode);
		prefabNode.getComponent(Sprite).enabled = false;
		prefabNode.getComponent(rank_my_item).init(myRank, this._rankId);
	}
	private page_click_handler(event) {
		let pageIndex;
		if (event) {
			pageIndex = event.target["chunkIndex"];
		} else {
			pageIndex = 0;
		}
		this.page = pageIndex + 1;
		for (let i = 0; i < 10; i += 1) {
			const page = this.pageNode.getChildByName("page" + i);
			console.log("pageIndex:", pageIndex);
			// if(pageIndex === i) {
			// 	page.getComponent(Sprite).spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_4_2");
			// 	page.getChildByName("num").getComponent(Label).color = new Color("#5c251e");
			// } else {
			// 	page.getComponent(Sprite).spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_4_1");
			// 	page.getChildByName("num").getComponent(Label).color = new Color("#ad9971");
			// }
		}
		EventManager.Instance.emit(EventConst.QUERY_5901, this._rankId, this.page, rankChunk);
	}

	scollCallback(scrollView: ScrollView) {
		const contentPosY = scrollView.content.position.y;
		if (contentPosY >= 20455) {
			if (!this.pageNode.active) {
				this.pageNode.active = true;
			}
		} else {
			if (this.pageNode.active) {
				this.pageNode.active = false;
			}
		}
	}

	private update_page_node() {
		let page_num = Math.ceil(this.max_num / rankChunk);
		for (let i = 0; i < 10; i += 1) {
			const page_btn = this.pageNode.getChildByName("page" + i);
			page_btn.active = i <= page_num
		}
	}

	private fresh_list() {
		this.commonScrollView.initData(rankChunk, (itemNode: Node, index: number) => {
			itemNode.getComponent(rank_item).init(this._rank_chunk_item_list, this.page - 1, index, this._rankId);
		});
	}
}

