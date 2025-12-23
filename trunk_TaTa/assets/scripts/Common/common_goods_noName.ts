import { _decorator, Component, Label, Node, sp, Sprite } from "cc";
import TxtUtils from "../Utils/TxtUtils";
import LoadUtils from "../Utils/LoadUtils";
import Utils from "../Utils/Utils";
import common_touch from "./common_touch";
const { ccclass, property } = _decorator;

@ccclass("common_goods_noName")
export class common_goods_noName extends Component {
    @property(Sprite)
    goodsRatitySprite: Sprite = null;
    @property(Sprite)
    goodsSprite: Sprite = null;
    @property(Label)
    goodsNumLabel: Label = null;
	@property(Node)
    pieceNode: Node = null;
	@property(Node)
	completeNode: Node = null;
	@property(Node)
	chooseNode: Node = null;
	@property(Node)
	spineNode: Node = null;
	@property(Node)
	spineSignNode: Node = null;
	@property(Node)
	starsNode: Node = null;

	private _goodsId;
	
	public chooseState = false;
	//goodsId有 k, goods_id  give_goods_id  id 4种形式
	//goosnum有 v v2 goods_num num    4种形式
	//goodsStar有  v1
     init(data, scaleX = 1, scaleY = 0,have_tip:boolean = false) {
		if(data == undefined)
		{
			this.goodsRatitySprite.spriteFrame =LoadUtils.Instance.common.getSpriteFrame(`common_icon_bg_bag`);
			this.starsNode.active = false;
			this.goodsSprite.node.active = false;
			this.goodsNumLabel.node.active = false;
			this.pieceNode.active = false;
			return
		}
		let goodsId;
		if(data.k !== undefined) {
			goodsId = data.k;
		} else if(data.goods_id !== undefined){
			goodsId = data.goods_id;
		} else if(data.give_goods_id !== undefined){
			goodsId = data.give_goods_id;
		} else if(data.id !== undefined){
			goodsId = data.id;
		} else {
			//console.log("common_goods_noName error, data请转化为object形式")
			return;
			//goodsId = data; ///直接传的goodsid
		}
		this._goodsId = goodsId;
		let goodsNum = 0;
		if(data.v !== undefined) {
			goodsNum = data.v;
		} else if(data.v2 !== undefined) {
			goodsNum = data.v2;
		} else if(data.goods_num !== undefined) {
			goodsNum = data.goods_num;
		} else if(data.num !== undefined) {
			goodsNum = data.num;
		}

		let goodsStar = 0;
		if(data.v1 !== undefined) {
			goodsStar = data.v1;
		}
		
		this.starsNode.active = goodsStar !== 0;

		if(goodsStar !== 0) {
			let skill_nowStarImg;
			const skill_starImg0 = LoadUtils.Instance.common.getSpriteFrame("common_skill_star0");
			if (goodsStar <= 3) {
				skill_nowStarImg = LoadUtils.Instance.common.getSpriteFrame("common_skill_star1");
			} else if (goodsStar > 3 && goodsStar <= 6) {
				skill_nowStarImg = LoadUtils.Instance.common.getSpriteFrame("common_skill_star2");
			} else if (goodsStar > 6 && goodsStar <= 9) {
				skill_nowStarImg = LoadUtils.Instance.common.getSpriteFrame("common_skill_star3");
			}
			for(let i = 0; i < this.starsNode.children.length; i+= 1) {
				const starNum = goodsStar > 3 ? (goodsStar % 3 === 0 ? 3 : goodsStar % 3) : goodsStar;
				if (i + 1 <= starNum) {
					this.starsNode.children[i].getComponent(Sprite).spriteFrame = skill_nowStarImg;
				} else {
					this.starsNode.children[i].getComponent(Sprite).spriteFrame = skill_starImg0;
				}
			}
		}

		if(scaleY == 0) {
			this.node.setScale(scaleX, scaleX, 1);
		} else {
			this.node.setScale(scaleX, scaleY, 1);
		}
		
		this.chooseState = false;
		if(goodsNum === 0) {
			this.goodsNumLabel.node.active = false;
		}
        this.goodsNumLabel.string = Utils.changeNumber(goodsNum, 2);

		if(have_tip && this.node.getComponent(common_touch) == undefined)
		{
			this.node.addComponent(common_touch);
			this.node.getComponent(common_touch).init(undefined, ()=>{this.touch_handler()});
		}
    }

	private touch_handler()
	{
	}
	setComplete() {
		this.completeNode.active = true;
		this.chooseState = false;
		this.setSpineNodeActive(false);
		this.setSpineSignNodeActive(false);
	}
	setChooseState(active: boolean) {
		this.chooseState = active;
	}

	setSpineNodeActive(active:boolean) {
		this.spineNode.active = active;
		if(active) {
			this.spineNode.getComponent(sp.Skeleton).setAnimation(0, "show_shouchong", true);
		}

	}

	setSpineSignNodeActive(active:boolean) {
		this.spineSignNode.active = active;
	}
}
