import { _decorator, Component, Node, EditBox, Label, tween, Tween, UIOpacity, find, SpriteFrame, Sprite, Animation } from 'cc';
import { GameData } from './GameData';
import { GameApp } from "../GameApp";
import { PlayerMessageManager } from '../Managers/PlayerMessageManager';
import TrieFilter from '../NameSensitive/TrieFilter';
import netManager from '../Network/netManager';
import EventManager from './EventManager';
import EventConst from '../Utils/EventConst';
import player_base_model from '../data/player_base_model';

const { ccclass, property } = _decorator;

@ccclass('NicknameChange')
export class NicknameChange extends Component {
    @property(EditBox)
    editBox: EditBox = null!;

    @property(Node)
    popup: Node = null!;

    @property(Label)
    hintLable: Label = null!;

    private _currentTween: Tween<UIOpacity> | null = null;
    private _model: player_base_model = new player_base_model();

    onLoad() {
        this.popup.active = false;
        this.popup.getComponent(UIOpacity)!.opacity = 255;
        this.editBox.string = "";
    }

    onConfirmClicked() {
        const nickname = this.editBox.string.trim();
        if (TrieFilter.getInstance().containsSensitiveWords(nickname)) {
            this.showHint("昵称包含敏感词，请重新输入。");
            return;
        }
        if (!nickname) {
            this.showHint("昵称不能为空。");
            return;
        }
        if (nickname.length > 6) {
            this.showHint("昵称不能超过6个字符。");
            return;
        }

        //昵称有效时的处理
        this.handleValidNickname(nickname);
    }

    private showHint(message: string) {
        //停止正在进行的动画
        if (this._currentTween) {
            Tween.stopAllByTarget(this.popup.getComponent(UIOpacity));
        }

        //更新提示文字并显示弹窗
        this.hintLable.string = message;
        this.popup.active = true;

        const uiOpacity = this.popup.getComponent(UIOpacity)!;
        uiOpacity.opacity = 255;

        //使用Tween进行淡入淡出动画
        this._currentTween = tween(uiOpacity)
            .delay(1.0)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.popup.active = false;
                this.popup.getComponent(UIOpacity)!.opacity = 255;
            })
            .start();
    }

    private handleValidNickname(nickname: string) {
        GameData.userData.nickName_InGame = nickname;
        GameData.userData.create_nickname = true;
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();

        let player_message_box = find("Canvas").getChildByName("promotionBox").getChildByName("promotion").getChildByName("player_message_box");
        player_message_box.getComponent(PlayerMessageManager).set_user_name();
        GameData.saveData(false);
        console.log("this._model.base_info:", this._model.base_info);
        // this._model.base_info.nickname = nickname;

        this.onClickClose();
    }

    onClickClose() {
        if (this._currentTween) {
            Tween.stopAllByTarget(this.popup.getComponent(UIOpacity));
        }
        this.node.active = false;
    }
}


