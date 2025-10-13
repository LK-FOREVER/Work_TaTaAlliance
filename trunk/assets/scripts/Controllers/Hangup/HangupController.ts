import {
    _decorator,
    Button,
    Component,
    error,
    instantiate,
    JsonAsset,
    Label,
    Node,
    Prefab,
    resources,
    sys,
} from "cc";
import { GameData } from "../../Common/GameData";
import { HangupToplimitController } from "./HangupToplimitController";
import { ShowGoods } from "../../Common/ShowGoods";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { MainUIControllers } from "../MainUI/MainUIControllers";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
const { ccclass, property } = _decorator;

@ccclass("HangupController")
export class HangupController extends Component {
    @property(Node)
    hangup_time: Node = null;
    @property(Node)
    hangup_toplimit: Node = null;
    @property(Node)
    reward_item_money: Node = null;
    @property(Node)
    reward_item_purple: Node = null;
    @property(Node)
    reward_item_orange: Node = null;
    @property(Node)
    hangup_free_btn: Node = null;
    @property(Node)
    hangup_ad_btn: Node = null;
    @property(Node)
    hangup_close_btn: Node = null;
    @property(Node)
    hangup_desc_btn: Node = null;
    @property(Node)
    desc_box: Node = null;
    @property(Prefab)
    hangup_toplimit_prefab: Prefab = null;

    add_time_promotion_info = null;
    reward_info = null;
    nowRewardInfo = null;
    basicHangupTime = null;
    addHangupTime = null;
    timeDifference = null;
    // 挂机时间秒数 60秒清空并刷新奖励
    // hangupSecond = 0
    // 三个奖励的数量
    rewardData = [
        {
            reward: 1,
            number: 0,
        },
        {
            reward: 11002,
            number: 0,
        },
        {
            reward: 11001,
            number: 0,
        },
    ];
    public static Instance: HangupController = null!;
    protected onLoad(): void {
        HangupController.Instance = this;
    }
    start() {
        // 点击desc
        this.hangup_desc_btn.on(Button.EventType.CLICK, (event) => {
            this.desc_box.active = !this.desc_box.active;
        });
        // 点击关闭
        this.hangup_close_btn.on(Button.EventType.CLICK, (event) => {
            this.node.destroy();
        });
        // 领取
        this.hangup_free_btn.on(Button.EventType.CLICK, (event) => {
            this.receiveFn();
        });
        // 双倍领取
        this.hangup_ad_btn.on(Button.EventType.CLICK, (event) => {
            // if (sys.isNative) {
            //     TapSDKManager.onPullAD("11");
            // } else {
            // 将奖励数量翻倍
            //    this.receiveFn(true)
            // }
            if (!SDKManagers.SdkOn) {
                this.receiveFn(true);
                return;
            }
            if (sys.isNative) {
                if (SDKManagers.SDKType === 1) {
                    LeChenManager.onAdClick(SDKManagers.Positions.TWO, "11");
                }
                return;
            }
            MoYangManagers.AD_id = "11";
            MoYangManagers.playAd();
        });
        // 打开增加上限窗口
        this.hangup_toplimit
            .getChildByName("add_btn")
            .on(Button.EventType.CLICK, (event) => {
                // 实例化预制体 instantiate
                let hangup_toplimit_prefab = instantiate(
                    this.hangup_toplimit_prefab
                );
                hangup_toplimit_prefab.setParent(this.node);
                hangup_toplimit_prefab.setPosition(0, 0);
                hangup_toplimit_prefab
                    .getComponent(HangupToplimitController)
                    .setData(this.add_time_promotion_info);
            });
        //挂机提升职位要求
        resources.load(
            "data/hangup__get_promotion_info",
            (err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return;
                }
                const jsonData = res.json!;
                this.add_time_promotion_info = jsonData;
            }
        );
        //挂机奖励信息
        resources.load(
            "data/hangup__get_reward_info",
            (err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return;
                }
                const jsonData = res.json!;
                this.reward_info = jsonData;
                this.updateTime();
            }
        );
    }

    receiveFn(isAd = false) {
        console.log("挂机奖励11");

        console.log("this.rewardData", this.rewardData);

        // 判断是否为看广告 将奖励数量翻倍
        const rewardList = this.rewardData.map((item) => ({
            ...item,
            number: item.number * (isAd ? 2 : 1),
        }));
        // 没有奖励返回true
        let allNumbersAreZero = rewardList.every((item) => item.number === 0);
        // 判断奖励列表里是否有奖励
        if (!allNumbersAreZero) {
            ShowGoods.init(rewardList);
            GameData.userData.hangupStartTime = Date.now();
            // 重置奖励数量
            this.rewardData = this.rewardData.map((item) => ({
                ...item,
                number: 0,
            }));
            MainUIControllers.instance.hangupUpdataTime();
            this.updateTime();
        }
    }

    updateTime() {
        this.unscheduleAllCallbacks();
        // 现在时间
        const nowTime = Date.now();
        // 基础挂机时间戳
        this.basicHangupTime = GameData.userData.basicHangupTime * 60 * 1000;
        // 加成挂机时间戳
        this.addHangupTime = GameData.userData.addHangupTime * 60 * 1000;
        // 当前时间戳减开始时间戳 用这个值判断是否超过挂机上限
        this.timeDifference = nowTime - GameData.userData.hangupStartTime;

        // 用当前时间-开始时间，如果小于挂机上限，已经挂机时间变为开始时间+未超过挂机上限的值
        if (this.basicHangupTime + this.addHangupTime > this.timeDifference) {
            // GameData.userData.hangupAlreadyTime = GameData.userData.hangupStartTime + timeDifference
            // 每秒钟刷新时间
            this.schedule(() => {
                this.changeNowTime();
            }, 1);
        } else {
            // 已挂机时间减开始时间为已挂机时间
            let hangupTime =
                GameData.userData.hangupAlreadyTime -
                GameData.userData.hangupStartTime;

            console.log("时间已到");
            this.hangup_time.getChildByName("time").getComponent(Label).string =
                this.convertTime(hangupTime);
            // 刷新奖励
            this.updataReward(hangupTime);
        }
        // 刷新时长上限
        this.hangup_toplimit.getChildByName("time").getComponent(Label).string =
            this.convertTime(this.basicHangupTime + this.addHangupTime);
    }

    changeNowTime() {
        // this.basicHangupTime + this.addHangupTime > this.timeDifference
        if (
            GameData.userData.hangupAlreadyTime >=
            GameData.userData.hangupStartTime +
                this.basicHangupTime +
                this.addHangupTime
        ) {
            console.log("时间已到");
            this.unscheduleAllCallbacks();
        }
        // 已挂机时间减开始时间为已挂机时间
        let hangupTime =
            GameData.userData.hangupAlreadyTime -
            GameData.userData.hangupStartTime;
        // 将hangupTime时间戳转换成00:00:00格式
        this.hangup_time.getChildByName("time").getComponent(Label).string =
            this.convertTime(hangupTime);
        this.updataReward(hangupTime);
    }

    updataReward(hangupTime) {
        console.log("updataReward");
        this.reward_item_money.active = false;
        this.reward_item_purple.active = false;
        this.reward_item_orange.active = false;

        // 获取当前关卡的奖励信息
        this.reward_info.map((item) => {
            if (
                GameData.userData.max_chapter >= item.chapter_start &&
                GameData.userData.chapter <= item.chapter_end
            ) {
                this.nowRewardInfo = item;
                return;
            }
        });
        // 将毫秒转换为秒
        let seconds = Math.floor(hangupTime / 1000);
        // 将秒转换为小时、分钟
        let hours = Math.floor(seconds / 3600); // 每小时3600秒
        let minutes = Math.floor(seconds / 60); // 每分钟60秒
        let halfHour = Math.floor(minutes / 30); // 30分钟
        // 挂机的分钟数
        // console.log('minutes', minutes)
        // 挂机的小时数
        // console.log('hours', hours)
        // 挂机的半小时数
        // console.log('halfHour', halfHour)

        let one_min_reward = this.nowRewardInfo.one_min_reward[0];
        let thirty_min_reward = this.nowRewardInfo.thirty_min_reward[0];
        let sixty_min_reward = this.nowRewardInfo.sixty_min_reward[0];

        if (one_min_reward.v * minutes > 0) {
            this.reward_item_money
                .getChildByName("num")
                .getComponent(Label).string = (
                one_min_reward.v * minutes
            ).toString();
            this.rewardData[0].number = one_min_reward.v * minutes;
            this.reward_item_money.active = one_min_reward.v * minutes !== 0;
        }

        if (thirty_min_reward) {
            this.reward_item_purple
                .getChildByName("num")
                .getComponent(Label).string = (
                thirty_min_reward.v * halfHour
            ).toString();
            this.rewardData[1].number = thirty_min_reward.v * halfHour;
            this.reward_item_purple.active =
                thirty_min_reward.v * halfHour !== 0;
        } else {
            this.reward_item_purple.active = false;
        }

        if (sixty_min_reward) {
            this.reward_item_orange
                .getChildByName("num")
                .getComponent(Label).string = (
                sixty_min_reward.v * hours
            ).toString();
            this.rewardData[2].number = sixty_min_reward.v * hours;
            this.reward_item_orange.active = sixty_min_reward.v * hours !== 0;
        } else {
            this.reward_item_orange.active = false;
        }
    }

    // 转换时间戳的函数
    convertTime(time: number) {
        // 将毫秒转换为秒
        let seconds = Math.floor(time / 1000);
        // 将秒转换为小时、分钟和秒
        let hours = Math.floor(seconds / 3600); // 每小时3600秒
        let minutes = Math.floor((seconds % 3600) / 60); // 每分钟60秒
        let remainingSeconds = seconds % 60; // 剩余的秒数
        let timeString = `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
        return timeString;
    }

    update(deltaTime: number) {}
}
