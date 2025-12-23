import { _decorator, Button, Component, find, Label, ProgressBar, Node, resources, Sprite, SpriteFrame, color ,Color} from 'cc';
import { GameData } from '../../Common/GameData';
import { TextUtils } from '../../Common/TextUtils';
import { ShowGoods } from '../../Common/ShowGoods';
import { GameApp } from '../../GameApp';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { DailyQuestController } from './DailyQuestController';
const { ccclass, property } = _decorator;

@ccclass('DailyQuestItemController')
export class DailyQuestItemController extends Component {
    icon_bg: Node = null
    icon: Node = null
    icon_number: Node = null
    reward_number: any = null
    desc: Node = null
    desc_num: Node = null
    progress_bar: Node = null
    claim_btn: Node = null
    item_info: any = null
    goood_info: any = null
    complete: Node = null;

    init(info) {
        this.item_info = info
        this.goood_info = TextUtils.Instance.goods__get_goods_info.find(item => item.id == this.item_info.task_reward)
        const icon_node = this.node.getChildByName("icon");
        this.icon_bg = icon_node.getChildByName("bg");
        this.icon = icon_node.getChildByName("icon");
        this.icon_number = icon_node.getChildByName("number");
        this.desc = this.node.getChildByName("desc");
        this.desc_num = this.node.getChildByName("desc_num");
        this.progress_bar = this.node.getChildByName("progressBar");
        this.claim_btn = this.node.getChildByName("claim_btn");
        this.claim_btn.on(Button.EventType.CLICK, this.claim, this);
        this.complete = this.node.getChildByName("complete");

        this.updateUI();
    }

    updateUI() {
        // resources.load(`textures/common/common_goods_${this.goood_info.quality}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
        //     if (err) {
        //         console.log(err);
        //         return
        //     }
        //     this.icon_bg.getComponent(Sprite).spriteFrame = spriteFrame;
        // });
        this.icon_bg.active = false;

        resources.load(`images/goods/${this.goood_info.id}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.icon.getComponent(Sprite).spriteFrame = spriteFrame;
        });

        if(this.item_info.task_reward == 1)
        {
            //计算建筑升级带来的任务金币加成
            this.icon_number.getComponent(Label).string = String(this.item_info.task_reward_num*(1+GameData.userData.furniture_add.task_coin_reward));
        }
        else{
            this.icon_number.getComponent(Label).string = this.item_info.task_reward_num
        }
        const label = this.claim_btn.getChildByName("Label").getComponent(Label)
        this.claim_btn.getChildByName("vip").active = false;
        if (GameData.taskData.dailyTaskContentNumStatus[this.item_info.task_id] > 0) {
            if (!GameData.userData.has_monthly_plan_2 || GameData.taskData.dailyTaskContentNumStatus[this.item_info.task_id] > 1) {
                // resources.load(`textures/common/common_button_gray_1_new/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                //     if (err) {
                //         console.log(err);
                //         return
                //     }
                //     this.claim_btn.getComponent(Sprite).spriteFrame = spriteFrame;
                // });
                label.string = "已完成"
                label.fontSize = 40
                this.claim_btn.getChildByName("common_red_dot").active = false;
                this.claim_btn.active = false;
                this.complete.active = true;
            } else {
                resources.load(`textures/common/common_button_green_new/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    this.claim_btn.getComponent(Sprite).spriteFrame = spriteFrame;
                });
                label.string = "领取"
                label.fontSize = 40
                label.color = new Color("#335E17");
                this.claim_btn.getChildByName("vip").active = false;
                this.claim_btn.getChildByName("common_red_dot").active = true;
            }
        } else {
            if (GameData.taskData.dailyTaskContentNumList[this.item_info.task_id] >= this.item_info.task_content_num) {
                GameData.taskData.dailyTaskContentNumList[this.item_info.task_id] = this.item_info.task_content_num;
                resources.load(`textures/common/common_button_green_new/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    this.claim_btn.getComponent(Sprite).spriteFrame = spriteFrame;
                });
                label.string = "领取"
                label.color = new Color("#335E17");
                label.fontSize = 40
                this.claim_btn.getChildByName("common_red_dot").active = true;
            } else {
                // resources.load(`textures/common/common_button_gray_1_new/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                //     if (err) {
                //         console.log(err);
                //         return
                //     }
                //     this.claim_btn.getComponent(Sprite).spriteFrame = spriteFrame;
                // });
                label.string = "进行中"
                label.fontSize = 40
                label.color = new Color("#572C14");
                this.claim_btn.getChildByName("common_red_dot").active = false;
            }
        }
        this.desc.getComponent(Label).string = `${this.item_info.task_content_name}`;
        this.desc_num.getComponent(Label).string = `${GameData.taskData.dailyTaskContentNumList[this.item_info.task_id]}/${this.item_info.task_content_num}`;
        this.progress_bar.getComponent(ProgressBar).progress = GameData.taskData.dailyTaskContentNumList[this.item_info.task_id] / this.item_info.task_content_num;
    }

    claim() {
        if ((GameData.taskData.dailyTaskContentNumStatus[this.item_info.task_id] > 0 && !GameData.userData.has_monthly_plan_2)
            || (GameData.taskData.dailyTaskContentNumStatus[this.item_info.task_id] > 1 && GameData.userData.has_monthly_plan_2)
            || GameData.taskData.dailyTaskContentNumList[this.item_info.task_id] < this.item_info.task_content_num) return
        GameData.taskData.dailyTaskContentNumStatus[this.item_info.task_id]++
        if(this.item_info.task_reward == 1)
        {
            //计算建筑升级带来的任务金币加成
            this.reward_number = this.item_info.task_reward_num*(1+GameData.userData.furniture_add.task_coin_reward);
        }
        else{
            this.reward_number = this.item_info.task_reward_num
        }

        const reward_item = [{
            reward: this.item_info.task_reward,
            number: this.reward_number
        }]

        this.updateUI()
        console.log("reward_item: " + reward_item);
        ShowGoods.init(reward_item);

         // 更新一键领取按钮状态
        const dailyQuestController = find("Canvas").getComponentInChildren(DailyQuestController);
        if (dailyQuestController) {
        dailyQuestController.updateClaimButtonState();
        }
        // find("Canvas").getComponent(MainUIControllers).updateRedDot();
        // if (this.item_info.reward === 1 || this.item_info.reward === 4 || this.item_info.reward === 2) {
        //     let MainTop = find("Canvas").getChildByName("MainTop");
        //     MainTop.getComponent(GameApp).updateplayerinfo()
        // }
        GameData.saveData(false);
    }
}
