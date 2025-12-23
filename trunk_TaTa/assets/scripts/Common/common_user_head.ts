import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame } from 'cc';
import LoadUtils from '../Utils/LoadUtils';
import player_base_module from '../module/player_base_module';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('common_user_head')
export class common_user_head extends Component {
	@property(Sprite)
	avatarSprite: Sprite = null;
	@property(Label)
	vipLvLabel: Label = null;
	@property(Label)
	lvLabel: Label = null;

	init(playerData, flipX = false) {
		if (!playerData) {
			this.avatarSprite.node.active = false;
			this.vipLvLabel.node.parent.active = false;
			this.lvLabel.node.active = false;
			return;
		}
		this.avatarSprite.node.active = true;
		resources.load("images/goods/" + playerData.head_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
			if (err) {
				console.log(err);
				return;
			}
			this.avatarSprite.spriteFrame = spriteFrame
		})
		if (playerData.player_id == player_base_module.Instance.get_model().base_info.player_id) {
			resources.load("images/goods/" + GameData.client_data.client_data.user_data.head_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
				if (err) {
					console.log(err);
					return;
				}
				this.avatarSprite.spriteFrame = spriteFrame
			})
		}
		if (flipX) {
			this.avatarSprite.node.setScale(-1, 1);
		}
		this.vipLvLabel.node.parent.active = true;
		if (playerData.vip_lv !== undefined) {
			this.vipLvLabel.string = playerData.vip_lv;
		} else if (playerData.vip !== undefined) {
			this.vipLvLabel.string = playerData.vip;
		}

		this.lvLabel.node.active = false;
		// this.lvLabel.string = playerData.lv;
		this.vipLvLabel.node.parent.active = false;
	}
}


