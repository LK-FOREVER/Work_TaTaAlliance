import { _decorator, Button, Component, find, instantiate, Node, Prefab, Sprite, Color } from 'cc';
import { TextUtils } from '../../Common/TextUtils';
import { DailyQuestItemController } from './DailyQuestItemController';
import { GameData } from '../../Common/GameData';
import { ShowGoods } from '../../Common/ShowGoods';
import { MainUIControllers } from '../MainUI/MainUIControllers';

const { ccclass, property } = _decorator;

interface RewardData {
    reward: number;
    number: number;
}

@ccclass('DailyQuestController')
export class DailyQuestController extends Component {
    @property(Prefab)
    quest_item: Prefab = null;

    close_btn: Node = null;
    content: Node = null;
    claim_btn: Node = null;
    items: Node[] = [];
    item_info: any = null;
    reward_number: any = null;

    // 定义奖励数据类型
    rewardList: RewardData[] = [];

    init() {
        this.close_btn = this.node.getChildByName("close");
        this.close_btn.on(Button.EventType.CLICK, this.close, this);
        this.content = this.node.getChildByName("quest_list_scroll").getChildByName("view").getChildByName("content");
        this.content.destroyAllChildren();
        this.claim_btn = this.node.getChildByName("claim_btn");
        this.claim_btn.on(Button.EventType.CLICK, this.one_click_claim, this);
        // 将 this.items 清空
        this.items = [];

        this.create_item();
        this.updateClaimButtonState(); // 初始化时检测是否有奖励可领取
    }

    create_item() {
        for (let i = 0; i < TextUtils.Instance.task__get_daily_task.length; i++) {
            const item = instantiate(this.quest_item);
            item.getComponent(DailyQuestItemController).init(TextUtils.Instance.task__get_daily_task[i]);
            item.setParent(this.content);
            this.items.push(item);
        }
    }

    close() {
        this.node.active = false;
    }

    // 检测是否有奖励可以领取
    updateClaimButtonState() {
        let hasReward = false;

        this.item_info = TextUtils.Instance.task__get_daily_task;
        for (let i = 0; i < this.item_info.length; i++) {
            if (
                GameData.taskData.dailyTaskContentNumStatus[this.item_info[i].task_id] == 0 &&
                GameData.taskData.dailyTaskContentNumList[this.item_info[i].task_id] >= this.item_info[i].task_content_num
            ) {
                hasReward = true;
                break;
            }
        }

        const claimBtnSprite = this.claim_btn.getComponent(Sprite);
        if (hasReward) {
            // 有奖励可领取
            claimBtnSprite.color = new Color(255, 255, 255, 255); // 设置为不透明
            this.claim_btn.getComponent(Button).interactable = true; // 启用按钮
            this.claim_btn.getChildByName("common_red_dot").active = true; // 隐藏红点
        } else {
            // 没有奖励可领取
            claimBtnSprite.color = new Color(255, 255, 255, 100); // 设置为半透明
            this.claim_btn.getComponent(Button).interactable = false; // 禁用按钮
            this.claim_btn.getChildByName("common_red_dot").active = false; // 隐藏红点
        }

        find("Canvas").getComponent(MainUIControllers).updateRedDot();
    }

    // 一键领取任务奖励
    async one_click_claim() {
        this.item_info = TextUtils.Instance.task__get_daily_task;
        for (let i = 0; i < this.item_info.length; i++) {
            if (
                GameData.taskData.dailyTaskContentNumStatus[this.item_info[i].task_id] == 0 &&
                GameData.taskData.dailyTaskContentNumList[this.item_info[i].task_id] >= this.item_info[i].task_content_num
            ) {
                GameData.taskData.dailyTaskContentNumStatus[this.item_info[i].task_id]++;
                if (this.item_info[i].task_reward == 1) {
                    // 计算建筑升级带来的任务金币加成
                    this.reward_number = this.item_info[i].task_reward_num * (1 + GameData.userData.furniture_add.task_coin_reward);
                } else {
                    this.reward_number = this.item_info[i].task_reward_num;
                }

                const reward_item = {
                    reward: this.item_info[i].task_reward,
                    number: this.reward_number,
                };
                this.rewardList.push(reward_item);
            }
        }

        // 更新每日任务UI
        if (this.items.length !== 0) {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].getComponent(DailyQuestItemController).updateUI();
            }
        }

        if (this.rewardList.length > 0) {
            await ShowGoods.init(this.rewardList);
            this.rewardList = [];
        }

        // 更新按钮状态
        this.updateClaimButtonState();
        GameData.saveData(false);
    }
}
