import { _decorator, Button, Component, Label, Node, Sprite } from 'cc';
import { common_user_head } from '../../../Common/common_user_head';
import LoadUtils from '../../../Utils/LoadUtils';
import Utils from '../../../Utils/Utils';
import player_base_module from '../../../module/player_base_module';
import EventManager from '../../../Common/EventManager';
import EventConst from '../../../Utils/EventConst';
const { ccclass, property } = _decorator;

@ccclass('rank_top_item')
export class rank_top_item extends Component {
	@property(Node)
	userHeadNode: Node = null;
	@property(Label)
	userNameLabel: Label = null;
	@property(Sprite)
	typeSprite: Sprite = null;
	@property(Label)
	valueLabel: Label = null;

	private _rankId: number = 0;
	private _data = null;
	private _player_info = null;

    init(data, rankId) {
		this._data = data;
		this._rankId = rankId;
		if(!data) {
			this.userHeadNode.getComponent(common_user_head).init(null);
			this.userNameLabel.string = "虚位以待";
			this.typeSprite.node.active = false;
			this.valueLabel.node.active = false;
		} else {
			this.userHeadNode.getComponent(common_user_head).init(data.other_player);
			this.userNameLabel.string = data.other_player.nickname;
			this.typeSprite.node.active = true;
			if(this._rankId === 1001) {
				this.typeSprite.node.active = false;
			} else {
				if(this._rankId === 1004 || this._rankId === 1002) {
					this.typeSprite.spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_16");
				} else {
					this.typeSprite.spriteFrame = LoadUtils.Instance.rank.getSpriteFrame("rank_19");
				}
			}
			
			this.valueLabel.node.active = true;
			this.valueLabel.string = Utils.changeNumber(data.value1, 1);

			this.userHeadNode.getChildByName("avatar_bg").on(Button.EventType.CLICK, this.btn_avatar, this)
		}

		
	}

	btn_avatar(event) {
		const _playerId = this._data.other_player.player_id;
		const player_id = player_base_module.Instance.get_model().base_info.player_id;
		// EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, true, _playerId === player_id, this._data.other_player)
	 }
}


