import { _decorator, Component, Node, EditBox, Label, tween, Tween, UIOpacity, find, SpriteFrame, Sprite, Animation } from 'cc';
import { GameData } from './GameData';
import { GameApp } from "../GameApp";
import TrieFilter from '../NameSensitive/TrieFilter';
import EventManager from './EventManager';
import EventConst from '../Utils/EventConst';
import player_base_model from '../data/player_base_model';

const { ccclass, property } = _decorator;

@ccclass('NicknameHandler')
export class NicknameHandler extends Component {
    @property(EditBox)
    editBox: EditBox = null!;

    @property(Node)
    popup: Node = null!;

    @property(Label)
    hintLable: Label = null!;

    @property(SpriteFrame)
    comicList: Array<any> = new Array(); //漫画列表

    @property(Node)
    fade: Node = null; //漫画播放前的淡入

    @property(Node)
    comic: Node = null; //漫画

    private _currentTween: Tween<UIOpacity> | null = null;
    private _model: player_base_model = new player_base_model();


    onLoad() {
        this.popup.active = false;
        this.popup.getComponent(UIOpacity)!.opacity = 255;
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

        if (this.fade && this.comic && !GameData.userData.play_comic) {
            this.comic.active = true;
            this.comic.getComponent(Sprite).spriteFrame = this.comicList[GameData.userData.play_comic_num];
            this.fade.active = true;
            const anim = this.fade.getComponent(Animation);
            if (anim) {
                anim.play('fadeOut');
            }
        }
        GameData.saveData(false);

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


