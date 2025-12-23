import { _decorator, Button, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
import LoadUtils from '../../../Utils/LoadUtils';
import { common_user_head } from '../../../Common/common_user_head';
import TxtUtils from '../../../Utils/TxtUtils';
import Utils from '../../../Utils/Utils';
import EventManager from '../../../Common/EventManager';
import EventConst from '../../../Utils/EventConst';
import player_base_module from '../../../module/player_base_module';
import { TextUtils } from '../../../Common/TextUtils';
import { GameData } from '../../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('rank_item')
export class rank_item extends Component {
	@property(Sprite)
	rankSprite: Sprite = null; //名次
	@property(Node)
	userHeadNode: Node = null;
	@property(Label)
	userNameLabel: Label = null;
	@property(Node)
	noNameNode: Node = null;
	@property(Node)
	likeNode: Node = null;
	@property(Sprite)
	levelSprite: Sprite = null; //段位
	@property(Label)
	levelLabel: Label = null;
	@property(Sprite)
	valueSprite: Sprite = null;
	@property(Label)
	valueLabel: Label = null;
	@property(SpriteFrame)
	rankSpriteFrame_1: SpriteFrame = null; //第一名名次图标
	@property(SpriteFrame)
	rankSpriteFrame_2: SpriteFrame = null; //第二名名次图标
	@property(SpriteFrame)
	rankSpriteFrame_3: SpriteFrame = null; //第三名名次图标
	@property(SpriteFrame)
	like_btn_spriteFrame_1: SpriteFrame = null; //点赞按钮图标
	@property(SpriteFrame)
	like_btn_spriteFrame_2: SpriteFrame = null; //已点赞按钮图标

	private _data = null;
	private _player_info = null;
	promotionInfoList: any[] = null
	// pageindex * 100 + 1
	// 0:  1     2    3   4
	// 1: 101  102  103 ...
	// 2: 201  202  203 ...
	init(data, pageIndex: number, index: number, rank_id: number) {
		if (data) {
			console.log("rankitemdata:", data);
		}
		if (pageIndex === 0) {
			if ((data && data[index] && data[index].rank === 1) || index === 0) {
				this.rankSprite.enabled = true;
				this.rankSprite.spriteFrame = this.rankSpriteFrame_1;
				this.rankSprite.node.getChildByName("Label").active = true;
			} else if ((data && data[index] && data[index].rank === 2) || index === 1) {
				this.rankSprite.enabled = true;
				this.rankSprite.spriteFrame = this.rankSpriteFrame_2;
				this.rankSprite.node.getChildByName("Label").active = true;
			} else if ((data && data[index] && data[index].rank === 3) || index === 2) {
				this.rankSprite.enabled = true;
				this.rankSprite.spriteFrame = this.rankSpriteFrame_3;
				this.rankSprite.node.getChildByName("Label").active = true;
			} else {
				this.rankSprite.enabled = false;
				this.rankSprite.node.getChildByName("Label").active = true;
				// this.rankSprite.node.getChildByName("Label").getComponent(Label).string = (pageIndex * 100 + index + 1) + "";
			}
		} else {
			this.rankSprite.enabled = false;
			this.rankSprite.node.getChildByName("Label").active = true;
		}

		if (!data || !data[index]) {
			this.noNameNode.active = true;
			this.userNameLabel.node.active = false;
			this.levelLabel.node.active = false;
			this.userHeadNode.active = false;
			this.likeNode.active = false;
			if (this.levelSprite) {
				this.levelSprite.node.active = false;
			}

			this.valueSprite.node.active = false;
			this.valueLabel.node.active = false;
			this.rankSprite.node.getChildByName("Label").getComponent(Label).string = (pageIndex * 100 + index + 1) + "";
		} else {
			this._data = data[index];
			this.levelLabel.node.active = false;
			this.noNameNode.active = false;
			this.userHeadNode.active = true;
			this.userHeadNode.getComponent(common_user_head).init(this._data.other_player);
			this.userNameLabel.node.active = true;
			this.userNameLabel.string = this._data.other_player.nickname;
			// this.likeNode.active = this._data.other_player.player_id != player_base_module.Instance.get_model().base_info.player_id;
			this.likeNode.active = false;
			if (this.levelSprite) {
				//段位
				this.levelSprite.node.active = false;
				this.levelLabel.node.active = false;
				// this.promotionInfoList = TextUtils.Instance.promotion__get_promotion_info;
				// let nowPromotionInfo = this.promotionInfoList.find(item => item.id == GameData.userData.career)
				// this.levelLabel.string = nowPromotionInfo.position_lv_name

				// const playerRankConf = TxtUtils.Instance.getPlayerRankConfByScore(rank_id == 1004 ? this._data.other_player.power : this._data.value1);
				// this.levelLabel.string = playerRankConf.rank_name;

				//const rankScale = rank_utils.getScaleByRankGrade(playerRankConf.rank_grade);
				//this.levelSprite.node.setScale(rankScale, rankScale, 1);
			}
			//分数
			this.valueLabel.node.active = true;
			// this.valueLabel.string = Utils.changeNumber(rank_id == 1004 ? this._data.other_player.power : this._data.value1, 1);
			if (rank_id == 1001) {
				//无尽排行
				if (this._data && this._data.other_player) {
					this.valueLabel.string = this._data.other_player.endlessChallengeMaxScore ? this._data.other_player.endlessChallengeMaxScore + "" : "";
				}
			} else if (rank_id == 1002) {
				//普通挑战
				console.log("data.other_player.max_chapter:" + this._data.other_player.max_chapter)
				if (this._data && this._data.other_player) {
					this.valueLabel.string = this._data.other_player.max_chapter ? this._data.other_player.max_chapter + "" : "";
				}
			}
			// this.userHeadNode.getChildByName("avatar_bg").on(Button.EventType.CLICK, this.btn_avatar, this);
			this.rankSprite.node.getChildByName("Label").getComponent(Label).string = this._data.rank;
		}

	}
	btn_avatar(event) {
		const _playerId = this._data.other_player.player_id;
		const player_id = player_base_module.Instance.get_model().base_info.player_id;
		// EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, true, _playerId === player_id, this._data.other_player)
	}
}


