import { _decorator, Component, Node, Sprite, resources, SpriteFrame, Label, Button, find } from 'cc';
import { GameData } from '../../Common/GameData';
import { ToastControllers } from '../../Common/ToastControllers';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { GameApp } from '../../GameApp';
import { ShowGoods } from '../../Common/ShowGoods';
const { ccclass, property } = _decorator;

@ccclass('EndlessRankItemController')
export class EndlessRankItemController extends Component {
    rank_info: any = null!
    rank_bg: Node = null!;
    rank_num: Node = null!;
    player_icon: Node = null!;
    player_name: Node = null!
    player_career: Node = null!;
    player_score: Node = null!;
    like_btn: Node = null!;
    is_like: boolean = false; // 是否已点赞
    init(rank_info) {
        this.rank_info = rank_info;
        this.rank_bg = this.node.getChildByName("ranking").getChildByName("rank_bg");
        this.rank_num = this.node.getChildByName("ranking").getChildByName("rank_num");
        this.player_icon = this.node.getChildByName("head_frame").getChildByName("player_icon");
        this.player_name = this.node.getChildByName("player_name");
        this.player_career = this.node.getChildByName("player_career");
        this.player_score = this.node.getChildByName("player_score");
        this.like_btn = this.node.getChildByName("like_btn");
        this.like_btn.on(Button.EventType.CLICK, this.like_handler, this);
        this.updateUI();
    }

    updateUI() {
        this.like_btn.active = false;
        this.rank_bg.active = this.rank_info.id <= 2;
        if (this.rank_bg.active) {
            resources.load("textures/endless/rank_bg_" + this.rank_info.id + "/spriteFrame", SpriteFrame, (err, sp) => {
                if (err) {
                    console.error("加载图片失败:", err);
                    return;
                }
                this.rank_bg.getComponent(Sprite).spriteFrame = sp;
            });
        }
        this.rank_num.getComponent(Label).string = (this.rank_info.id + 1).toString();
        resources.load("images/goods/" + this.rank_info.icon + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            this.player_icon.getComponent(Sprite).spriteFrame = spriteFrame
        })
        this.player_name.getComponent(Label).string = this.rank_info.name;
        this.player_career.getComponent(Label).string = this.rank_info.career;
        this.player_score.getComponent(Label).string = this.rank_info.score.toString() + "积分";

        // 检查是否已点赞
        if (GameData.userData.endlessLikedPlayers[this.rank_info.player_id]) {
            this.like_btn.getComponent(Button).interactable = false; // 禁用点赞按钮
            this.is_like = true; // 标记为已点赞 
        }
    }

    like_handler() {
        //玩家可对排行榜的玩家进行点赞，每天限3次，每名玩家限1次，点赞获得100金币。
        let reward_item: any = null;
        if (!this.rank_info.is_player && !this.is_like) {
            if (GameData.userData.endlessLikeCount > 0) {
                GameData.userData.endlessLikeCount -= 1;
                reward_item = [
                    {
                        reward: 1,
                        number: 100
                    }
                ]
                if (reward_item) {
                    ShowGoods.init(reward_item);
                }
                //点赞后将点赞按钮置灰，并标记该item已点赞
                this.like_btn.getComponent(Button).interactable = false;
                this.is_like = true;
                //记录点赞状态，“player_id”为玩家唯一id
                GameData.userData.endlessLikedPlayers[this.rank_info.player_id] = true;
            }
            else {
                //弹出提示框，提示玩家今日点赞次数已用完
                ToastControllers.Instance.showToast("今日点赞次数已用完，明天再来吧！");
            }
        }
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();
    }
}
