import {
    _decorator,
    Component,
    Node,
    NodeEventType,
    resources,
    JsonAsset,
    error,
    Label,
    find,
    RichText,
    sys,
    instantiate,
    Prefab,
} from "cc";
import { GameData } from "../../Common/GameData";
import { GameApp } from "../../GameApp";
import { ShowGoods } from "../../Common/ShowGoods";
import { BattleManager } from "../../Managers/BattleManager";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { MessageManager } from "../../Managers/MessageManager";
import { bonusItemController } from "./bonusItemController";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
const { ccclass, property } = _decorator;

@ccclass("bonusController")
export class bonusController extends Component {
    @property(Node)
    bonus_receive_btn: Node = null;
    @property(Node)
    bonus_close_text: Node = null;
    @property(Node)
    bonus_reward_num: Node = null;
    @property(Node)
    bonus_text_1: Node = null;
    @property(Node)
    bonus_buttom_text: Node = null;
    @property(Node)
    content: Node = null;
    @property(Prefab)
    bonus_reward: Node = null;
    bonus_info = null;
    reward_num = null;
    reward_data = null;
    task_reward = {
        reward: 1,
        number: 0,
    };
    promotionInfoList = null;
    nextPromotionInfo = null;
    public static Instance: bonusController = null!;
    protected onLoad(): void {
        bonusController.Instance = this;
    }
    start() {
        // // 保存三分钟后的时间戳
        // // 获取当前时间戳
        // const now = new Date().getTime();
        // // 计算三分钟后的时间戳
        // GameData.userData.threeMinutesLater = new Date(now + 1.5 * 60 * 1000).getTime();

        this.bonus_buttom_text.getComponent(
            RichText
        ).string = `<color=#84c03f>今日观看次数：</color><color=${
            GameData.userData.bonusADLastNum ===
            GameData.userData.bonusADTodayNum
                ? "#84c03f"
                : "#d04c42"
        }>${GameData.userData.bonusADLastNum}</color><color=#84c03f>/${
            GameData.userData.bonusADTodayNum
        }</color>`;

        // 获取奖金信息
        resources.load("data/bonus__get_bonus", (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData = res.json!;
            this.bonus_info = jsonData;
            this.updateUI();
        });

        //职位信息
        resources.load(
            "data/promotion__get_promotion_info",
            (err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return;
                }
                const jsonData = res.json!;
                this.promotionInfoList = jsonData;
                this.promotionInfoList.forEach((item) => {
                    // 拿到下个职位所对应的信息
                    if (item.id === GameData.userData.career + 1) {
                        this.nextPromotionInfo = item;
                    }
                });
                let gapLv =
                    this.nextPromotionInfo.level_progress -
                    (GameData.userData.max_chapter - 1);
                let info_str = "";
                if (gapLv <= 0) {
                    info_str = `已满足<color=#ff9a4d>${this.nextPromotionInfo.position_lv_name}</color>关卡进度`;
                } else {
                    info_str = `距离<color=#ff9a4d>${this.nextPromotionInfo.position_lv_name}</color>还差<color=#ff9a4d>${gapLv}</color>关`;
                }
                // console.log('this.nextPromotionInfo.level_progress', this.nextPromotionInfo.level_progress, GameData.userData.max_chapter - 1)
                this.bonus_text_1.getComponent(RichText).string = info_str;
            }
        );

        // 点击领取
        this.bonus_receive_btn.on(NodeEventType.TOUCH_END, (event) => {
            const Canvas = find("Canvas");
            if (
                GameData.userData.bonusADLastNum ===
                GameData.userData.bonusADTodayNum
            ) {
                Canvas.getComponent(MessageManager).openMessage(
                    "今日领取次数已用完，请明天再来"
                );
                return;
            }
            if (!SDKManagers.SdkOn) {
                this.bonusReceiveFn();
                return;
            }
            if (sys.isNative) {
                if (SDKManagers.SDKType === 1) {
                    LeChenManager.onAdClick(SDKManagers.Positions.TWO, "3");
                }
                return;
            }
            // if (sys.isNative) {
            //     TapSDKManager.onPullAD("3");
            // } else {
            //    this.bonusReceiveFn();
            //}
            MoYangManagers.AD_id = "3";
            MoYangManagers.playAd();
        });
        // 暂不领取
        this.bonus_close_text.on(NodeEventType.TOUCH_END, (event) => {
            this.node.destroy();
        });
    }
    bonusReceiveFn() {
        console.log("季度奖金3");

        const rewardList = [];
        this.task_reward.number = this.reward_num;
        // 碎片奖励
        this.reward_data.forEach((rewardItem, index) => {
            const reward = {
                reward: rewardItem.k,
                number: rewardItem.v,
            };
            rewardList.push(reward);
        });
        const taskReward = JSON.parse(JSON.stringify(this.task_reward));
        ShowGoods.init([taskReward, ...rewardList]);
        //引导任务
        //GameData.taskData.taskMoneyNum += this.reward_num;
        // 更新显示
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();
        this.node.destroy();
        GameData.userData.bonusADLastNum += 1;
    }
    updateUI() {
        this.bonus_info.map((item) => {
            if (item.max_chapter === GameData.userData.max_chapter) {
                // 资金奖励
                const rewardItemMoney = { k: 1, v: item.reward_num };
                let bonus_reward = instantiate(this.bonus_reward);
                bonus_reward.name = "bonus_reward_money";
                bonus_reward.setParent(this.content);
                bonus_reward.setPosition(0, 0);
                bonus_reward.getComponent(bonusItemController).rewardData =
                    rewardItemMoney;
                // 碎片奖励
                item.reward_data.forEach((rewardItem, index) => {
                    let bonus_reward = instantiate(this.bonus_reward);
                    bonus_reward.name = "bonus_reward_" + index;
                    bonus_reward.setParent(this.content);
                    bonus_reward.setPosition(0, 0);
                    bonus_reward.getComponent(bonusItemController).rewardData =
                        rewardItem;
                });
                this.reward_num = item.reward_num;
                this.reward_data = item.reward_data;
                // this.bonus_reward_num.getComponent(Label).string = this.reward_num
                return;
            }
        });
    }
    onDestroy() {
        BattleManager.Instance.returnChapter();
    }
}
