import { _decorator, Button, Color, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
import LoadUtils from '../../../Utils/LoadUtils';
import { common_user_head } from '../../../Common/common_user_head';
import TxtUtils from '../../../Utils/TxtUtils';
import Utils from '../../../Utils/Utils';
import player_base_module from '../../../module/player_base_module';
import EventConst from '../../../Utils/EventConst';
import EventManager from '../../../Common/EventManager';
import { TextUtils } from '../../../Common/TextUtils';
import { GameData } from '../../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('rank_my_item')
export class rank_my_item extends Component {
	@property(Sprite)
	rankSprite: Sprite = null; //名次
	@property(Node)
	userHeadNode: Node = null;
	@property(Label)
	userNameLabel: Label = null;
	@property(Node)
	likeNode: Node = null; //点赞按钮
	@property(Sprite)
	levelSprite: Sprite = null; //段位
	@property(Label)
	levelLabel: Label = null;
	@property(Sprite)
	valueSprite: Sprite = null;
	@property(Label)
	valueLabel: Label = null;
	@property(Node)
	noNameNode: Node = null;
	@property(SpriteFrame)
	rankSpriteFrame_1: SpriteFrame = null; //第一名名次图标
	@property(SpriteFrame)
	rankSpriteFrame_2: SpriteFrame = null; //第二名名次图标
	@property(SpriteFrame)
	rankSpriteFrame_3: SpriteFrame = null; //第三名名次图标

	private _data = null;
	promotionInfoList: any[] = null

	init(data, rankId) {
		this._data = data;
		const rank = data.rank; //名次
		this.rankSprite.enabled = true;
		if (rank === 1) {
			// this.rankSprite.spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_21");
			this.rankSprite.spriteFrame = this.rankSpriteFrame_1;
			this.rankSprite.node.getChildByName("Label").getComponent(Label).string = rank;
		} else if (rank === 2) {
			// this.rankSprite.spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_22");
			this.rankSprite.spriteFrame = this.rankSpriteFrame_2;
			this.rankSprite.node.getChildByName("Label").getComponent(Label).string = rank;
		} else if (rank === 3) {
			// this.rankSprite.spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_23");
			this.rankSprite.spriteFrame = this.rankSpriteFrame_3;
			this.rankSprite.node.getChildByName("Label").getComponent(Label).string = rank;
		} else {
			this.rankSprite.enabled = false; //隐藏名次的图标
			// this.rankSprite.spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_9");
			// this.rankSprite.node.getChildByName("Label").active = true;
			if (rank === 0) {
				this.rankSprite.node.getChildByName("Label").getComponent(Label).string = "未上榜";
			} else {
				this.rankSprite.node.getChildByName("Label").getComponent(Label).string = rank;
			}
		}
		this.likeNode.active = false;
		this.userHeadNode.setScale(1, 1, 1);
		this.userHeadNode.getComponent(common_user_head).init(data.other_player);
		// this.userNameLabel.fontSize = 28;
		// this.userNameLabel.color = new Color("#f4d7a5");
		console.log("rankmydata:", data);
		this.userNameLabel.string = data.other_player.nickname;
		this.levelLabel.node.active = false;
		if (this.levelSprite) {
			this.levelLabel.node.active = false;
			// this.promotionInfoList = TextUtils.Instance.promotion__get_promotion_info;
			// let nowPromotionInfo = this.promotionInfoList.find(item => item.id == GameData.userData.career)
			// this.levelLabel.string = nowPromotionInfo.position_lv_name


			// const playerRankConf = TxtUtils.Instance.getPlayerRankConfByScore(data.value1);
			// this.levelSprite.spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf.rank_grade_icon);
			// this.levelLabel.fontSize = 28;
			// this.levelLabel.color = new Color("#f4d7a5");
			// this.levelLabel.string = playerRankConf.rank_name;



			//const rankScale = rank_utils.getScaleByRankGrade(playerRankConf.rank_grade);
			//this.levelSprite.node.setScale(rankScale, rankScale, 1);

		}
		// this.valueLabel.fontSize = 28;
		// this.valueLabel.color = new Color("#f4d7a5");
		if (rankId == 1001) {
			//无尽排行
			if (data && data.other_player) {
				this.valueLabel.string = data.other_player.endlessChallengeMaxScore ? data.other_player.endlessChallengeMaxScore + "" : "";
			}
		} else if (rankId == 1002) {
			//普通挑战
			if (data && data.other_player) {
				this.valueLabel.string = data.other_player.max_chapter ? data.other_player.max_chapter + "" : "";
			}
		}

		// this.userHeadNode.getChildByName("avatar_bg").on(Button.EventType.CLICK, this.btn_avatar, this)
	}


	btn_avatar(event) {
		const _playerId = this._data.other_player.player_id;
		const player_id = player_base_module.Instance.get_model().base_info.player_id;
		// EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, true, _playerId === player_id, this._data.other_player);
	}
}


