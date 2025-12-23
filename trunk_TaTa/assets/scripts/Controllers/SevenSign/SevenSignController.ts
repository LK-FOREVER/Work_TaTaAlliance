import { _decorator, Button, Component, debug, error, find, JsonAsset, Label, Node, resources, Sprite, SpriteFrame, sys, } from "cc";
import { GameData } from "../../Common/GameData";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { ShowGoods } from "../../Common/ShowGoods";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
import { TextUtils } from "../../Common/TextUtils";
import EventManager from "../../Common/EventManager";
import { EventConst } from "../../Common/EventConst";
import { MainUIControllers } from "../MainUI/MainUIControllers";
const { ccclass, property } = _decorator;

@ccclass("SevenSignController")
export class SevenSignController extends Component {
    @property({ type: [Node], displayName: "七日登录奖励" })
    seven_sign_item_list: Array<Node> = new Array<Node>();

    seven_sign_info = null;
    seven_sign_today_info = null;
    seven_sign_free_btn: Node = null;
    seven_sign_ad_btn: Node = null;

    public static Instance: SevenSignController = null!;
    protected onLoad(): void {
        SevenSignController.Instance = this;
    }
    start() {
        find("btn_close", this.node).on(Button.EventType.CLICK, () => {
            this.node.destroy();
        }, this);
        this.seven_sign_free_btn = this.node.getChildByName("seven_sign_main_bg").getChildByName("seven_sign_free_btn");
        this.seven_sign_ad_btn = this.node.getChildByName("seven_sign_main_bg").getChildByName("seven_sign_ad_btn");
        this.seven_sign_ad_btn.active = false;
        // 是否开启
        GameData.userData.sevenSignIsOpen = true;

        // 更新主场景图标
        //const Canvas = find("Canvas");
        //Canvas.getChildByName("open_seven_sign_btn").getChildByName("reddot").active = false;

        //七日登录信息
        resources.load("data/seven_sign__get_info", (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            const jsonData = res.json!;
            this.seven_sign_info = jsonData;
            // 拿到当前登录天数的信息
            this.seven_sign_info.forEach((itemInfo) => {
                if (GameData.userData.sevenSignDay === itemInfo.day) {
                    this.seven_sign_today_info = itemInfo;
                }
                this.seven_sign_item_list.forEach((itemNode) => {
                    // 更换奖励信息
                    if (itemInfo.day === Number(itemNode.name.slice(-1))) {
                        const reward = itemInfo.reward[0];
                        resources.load(`images/goods/${itemInfo.reward_icon}/spriteFrame`, SpriteFrame, (err, sp) => {
                            itemNode.getChildByName("icon").getComponent(Sprite).spriteFrame = sp;
                        });
                        itemNode.getChildByName("num").getComponent(Label).string = itemInfo.reward_name;
                    }
                });
            });
            this.updateUI();
        });

        // 添加领取奖励的点击事件
        this.seven_sign_free_btn.on(Button.EventType.CLICK, (event) => {
            this.receiveFn();
        });
        this.seven_sign_ad_btn.on(Button.EventType.CLICK, (event) => {
            // if (sys.isNative) {
            //     TapSDKManager.onPullAD("10");
            // } else {
            //  this.receiveFn(true);
            //   }
            if (!SDKManagers.SdkOn) {
                this.receiveFn(true);
                return;
            }
            if (sys.isNative) {
                if (SDKManagers.SDKType === 1) {
                    LeChenManager.onAdClick(SDKManagers.Positions.THREE, "10");
                }
                return;
            }
            MoYangManagers.AD_id = "10";
            MoYangManagers.playAd();
        });
    }
    async receiveFn(isAd = false) {
        this.node.parent.getComponent(MainUIControllers).updateRedDot();
        let rewardList = null;
        //如果是8（紫色碎片），或者是9（橙色碎片），则从不同稀有度的碎片中，随机一个碎片
        if (this.seven_sign_today_info.reward[0].k == 8 || this.seven_sign_today_info.reward[0].k == 9) {
            if (TextUtils.Instance.goods__get_goods_info && Array.isArray(TextUtils.Instance.goods__get_goods_info)) {
                const goodsList = TextUtils.Instance.goods__get_goods_info.filter(
                    (item: { id: number; quality: number; icon: string }) =>
                        item.id >= 5001 &&
                        item.id <= 5012 &&
                        item.quality === this.seven_sign_today_info.reward[0].k - 3
                );
                if (goodsList.length > 0) {
                    const randomIndex = Math.floor(Math.random() * goodsList.length);
                    const selectedGoods = goodsList[randomIndex];
                    rewardList = [
                        {
                            reward: selectedGoods.icon,
                            number: this.seven_sign_today_info.reward[0].v,
                        },
                    ];
                } else {
                    rewardList = [];
                    console.error("没有找到符合条件的物品");
                }
            } else {
                rewardList = [];
                console.error("goods__get_goods_info 未定义或不是数组");
            }
        }
        else {
            rewardList = [
                {
                    reward: this.seven_sign_today_info.reward[0].k,
                    number: this.seven_sign_today_info.reward[0].v,
                },];
        }
        if (!isAd) {
            // 奖励弹窗
            await ShowGoods.init(rewardList);
            GameData.userData.sevenSignIsReceive = true;
            this.seven_sign_free_btn.getComponent(Button).interactable = false;
            this.seven_sign_free_btn.getComponent(Sprite).grayscale = true;
            this.seven_sign_free_btn.getChildByName("Label").getComponent(Label).string = "已签到";
            this.seven_sign_free_btn.getChildByName("common_red_dot").active = false;
            find("Canvas").getComponent(MainUIControllers).updateRedDot();
        } else {
            // 奖励弹窗
            // let id = GameData.taskData.continuousTaskId % TextUtils.Instance.task__get_continuous_task.length
            // if (id == 2) {
            //     GameData.taskData.continueTaskContentNumList[id]++;
            //     EventManager.Instance.emit(EventConst.UPDATE_CONTINUOUS_TASK)
            // }
            GameData.taskData.dailyTaskContentNumList[1]++;

            ShowGoods.init(rewardList);
            GameData.userData.sevenSignIsADReceive = true;
        }
        this.updateUI();
        //GameData.Instance.sendDataRequest();
        GameData.saveData(false);
    }
    updateUI() {
        // 判断是否全部领完
        if (GameData.userData.sevenSignDay >= this.seven_sign_info.length) {
            // 判断是否领取了当天广告的奖励
            if (GameData.userData.sevenSignIsADReceive) {
                this.node.destroy();
                // 隐藏主场景图标
                const Canvas = find("Canvas");
                Canvas.getChildByName("open_seven_sign_btn").active = false;
            }
        }
        this.seven_sign_item_list.forEach((item) => {
            // 隐藏全部节点的outline和mask
            // item.getChildByName("outline").active = false;
            item.getChildByName("mask").active = false;
            // 判断当前登录天数是否与当前节点的天数一致
            if (this.seven_sign_today_info.day === Number(item.name.slice(-1))) {
                // item.getChildByName("outline").active = true;
                // 判断是否领取今天的奖励
                if (GameData.userData.sevenSignIsReceive) {
                    item.getChildByName("mask").active = true;
                }
            }
            // 如果当前天数大于当前节点的天数，则显示其节点的mask
            if (this.seven_sign_today_info.day > Number(item.name.slice(-1))) {
                item.getChildByName("mask").active = true;
            }
        });
        // 判断是否领取今天的奖励
        //this.seven_sign_free_btn.active = !GameData.userData.sevenSignIsReceive;
        //this.seven_sign_ad_btn.active = GameData.userData.sevenSignIsReceive;

        // 判断是否领取今天的广告奖励
        // 按钮禁用
        //this.seven_sign_ad_btn.getComponent(Button).interactable =!GameData.userData.sevenSignIsADReceive;
        // 按钮变灰
        //this.seven_sign_ad_btn.getComponent(Sprite).grayscale = GameData.userData.sevenSignIsADReceive;
        //this.seven_sign_ad_btn.getChildByName("common_red_dot").active = !GameData.userData.sevenSignIsADReceive;
        console.log("sevenSignIsReceive:=======>>", GameData.userData.sevenSignIsReceive)
        this.seven_sign_free_btn.getComponent(Button).interactable = !GameData.userData.sevenSignIsReceive;
        this.seven_sign_free_btn.getComponent(Sprite).grayscale = GameData.userData.sevenSignIsReceive;
        this.seven_sign_free_btn.getChildByName("Label").getComponent(Label).string = GameData.userData.sevenSignIsReceive ? "已签到" : "领取";
        this.seven_sign_free_btn.getChildByName("common_red_dot").active = !GameData.userData.sevenSignIsReceive;
    }
}
