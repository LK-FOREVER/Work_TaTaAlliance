import { _decorator, Color, Component, Label, Node, RichText, Sprite, SpriteFrame } from 'cc';
import rank_view from '../rank_view';
import LoadUtils from '../../../Utils/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('rank_tab_item')
export class rank_tab_item extends Component {
	@property(RichText)
    tabNameLabel: RichText = null;
    @property(SpriteFrame)
    rank_tab1_2: SpriteFrame = null;//选中
    @property(SpriteFrame)
    rank_tab1_1: SpriteFrame = null;//未选中
	private _parent: Node = null;
	private _rankId: number = 0;

    public init(parent: Node, rankId, shopConfig) {
		this._parent = parent;
        this._rankId = rankId;
        //shopConfig.name中的每个字符都要换行显示
        this.tabNameLabel.string = shopConfig.name.split("").join("\n");
    }

	public clickTab() {
        this._parent.getComponent(rank_view).clickLeftTab(this._rankId);
    }

	public setSelectedSprite(selected: boolean) {
        if (selected) {
            this.node.getComponent(Sprite).spriteFrame = this.rank_tab1_2;
			this.tabNameLabel.fontColor = new Color("#ffffff");
			// this.tabNameLabel.node.getComponent(Label).enableOutline = true;
        } else {
            this.node.getComponent(Sprite).spriteFrame = this.rank_tab1_1;
			this.tabNameLabel.fontColor = new Color("#fbe9b7");
			// this.tabNameLabel.node.getComponent(Label).enableOutline = false;
        }
    }
}


