import { _decorator, Component, Node, Button, Label, Sprite, SpriteFrame, resources, find, LabelOutline, Color } from 'cc';
import { GameData } from '../../Common/GameData';
import { ToastControllers } from '../../Common/ToastControllers';
import { ShowGoods } from '../../Common/ShowGoods';
import { GameApp } from '../../GameApp';
import { EndlessController } from './EndlessController';
import { MainUIControllers } from '../MainUI/MainUIControllers';
const { ccclass, property } = _decorator;

@ccclass('EndlessRewardItemController')
export class EndlessRewardItemController extends Component {
    reward_info: any = null!; // 奖励信息
    desc: Node = null!; //奖励条件描述
    icon_1: Node = null!; //奖励物品1
    icon_2: Node = null!; //奖励物品2
    icon_1_icon: Node = null!; //奖励物品1图标
    icon_2_icon: Node = null!; //奖励物品2图标
    reward_num_1: Node = null!; //奖励物品1数量
    reward_num_2: Node = null!; //奖励物品2数量
    claim_btn: Node = null!; //领取按钮
    common_red_dot: Node = null!; //红点
    have_claim: Node = null!; //已领取标识
    reward_number: any = null

    init(reward_info) {
        this.reward_info = reward_info;
        this.desc = this.node.getChildByName("desc");
        this.icon_1 = this.node.getChildByName("rewards").getChildByName("icon1");
        this.icon_2 = this.node.getChildByName("rewards").getChildByName("icon2");
        this.icon_1_icon = this.icon_1.getChildByName("icon");
        this.icon_2_icon = this.icon_2.getChildByName("icon");
        this.reward_num_1 = this.icon_1.getChildByName("number");
        this.reward_num_2 = this.icon_2.getChildByName("number");
        this.claim_btn = this.node.getChildByName("claim_btn");
        this.common_red_dot = this.claim_btn.getChildByName("common_red_dot");
        this.have_claim = this.node.getChildByName("have_claim");
        this.claim_btn.on(Button.EventType.CLICK, this.claim_handler, this);

        this.updateUI();
    }

    updateUI() {
        this.desc.getComponent(Label).string = this.reward_info.reward_content_name;
        if (this.reward_info.reward_2 == 0) {
            this.icon_1.active = true;
            this.icon_2.active = false;
            resources.load("images/goods/" + this.reward_info.reward_1 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.icon_1_icon.getComponent(Sprite).spriteFrame = spriteFrame;
            })
            this.reward_num_1.getComponent(Label).string = this.reward_info.reward_num_1.toString();
        } else {
            this.icon_1.active = true;
            this.icon_2.active = true;
            resources.load("images/goods/" + this.reward_info.reward_1 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.icon_1_icon.getComponent(Sprite).spriteFrame = spriteFrame;
            })
            resources.load("images/goods/" + this.reward_info.reward_2 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.icon_2_icon.getComponent(Sprite).spriteFrame = spriteFrame;
            })
            this.reward_num_1.getComponent(Label).string = this.reward_info.reward_num_1.toString();
            this.reward_num_2.getComponent(Label).string = this.reward_info.reward_num_2.toString();
        }

        // 领取按钮状态
        if (GameData.userData.endlessRewardStatus[this.reward_info.reward_id] == 0) {
            // 未领取
            this.claim_btn.active = true;
            this.claim_btn.getComponent(Button).interactable = GameData.userData.endlessChallengeMaxScore >= this.reward_info.score; // 按钮可点击条件
            this.claim_btn.getComponent(Sprite).grayscale = !this.claim_btn.getComponent(Button).interactable; // 按钮不可点击时变灰
            this.claim_btn.getChildByName("Label").getComponent(LabelOutline).color = this.claim_btn.getComponent(Button).interactable ? new Color("#256A04") : new Color("#000000")
            this.have_claim.active = false;
            this.common_red_dot.active = GameData.userData.endlessChallengeMaxScore >= this.reward_info.score; // 红点显示条件
        } else {
            // 已领取
            this.claim_btn.active = false;
            this.have_claim.active = true;
        }

    }

    // 领取奖励逻辑
    claim_handler() {
        let reward_item: any = null;
        if (GameData.userData.endlessChallengeMaxScore < this.reward_info.score) {
            // ToastControllers.Instance.showToast("挑战积分不足，无法领取！");
        } else {
            if (this.reward_info.reward_2 != 0) {
                reward_item = [
                    {
                        reward: this.reward_info.reward_1,
                        number: this.reward_info.reward_num_1
                    },
                    {
                        reward: this.reward_info.reward_2,
                        number: this.reward_info.reward_num_2
                    }
                ]
            } else {
                reward_item = [
                    {
                        reward: this.reward_info.reward_1,
                        number: this.reward_info.reward_num_1
                    }
                ]
            }
            ShowGoods.init(reward_item);
            GameData.userData.endlessRewardStatus[this.reward_info.reward_id] = 1;
            this.updateUI();
            // Toggle红点
            find("Canvas").getChildByName("endless_view").getComponent(EndlessController).updateRewardToggleRedDot();
            //主界面红点
            find("Canvas").getComponent(MainUIControllers).updateRedDot();
        }
        GameData.saveData(false);
    }
}


