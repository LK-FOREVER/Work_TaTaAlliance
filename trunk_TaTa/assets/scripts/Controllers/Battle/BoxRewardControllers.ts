import {_decorator,Button,Component,instantiate,Label,Node,Prefab,resources,Sprite,SpriteFrame,sys,v3,} from "cc";
import { GameData } from "../../Common/GameData";
import { BattleManager } from "../../Managers/BattleManager";
import { GameApp } from "../../GameApp";
import { ShowGoods } from "../../Common/ShowGoods";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
const { ccclass, property } = _decorator;

@ccclass("BoxRewardControllers")
export class BoxRewardControllers extends Component {
    public static Instance: BoxRewardControllers = null!;
    btn_reward: Node;
    btn_double: Node;
    btn_close: Node;
    content: Node;
    protected onLoad(): void {
        BoxRewardControllers.Instance = this;
    }
    start() {
        this.btn_reward = this.node.getChildByName("btn_get");
        this.btn_double = this.node.getChildByName("btn_double");
        this.btn_close = this.node.getChildByName("btn_close");
        this.btn_reward.on(Button.EventType.CLICK, this.getReward, this);
        this.btn_double.on(Button.EventType.CLICK, this.getDoubleReward, this);
        this.btn_close.on(Button.EventType.CLICK, this.closeSelf, this);
    }
    //刷新宝箱存储奖励
    public setboxReward() {
        this.content = this.node.getChildByName("bg").getChildByName("view").getChildByName("content");
        //console.log('刷新宝箱存储奖励');
        let reward_list = GameData.battleData.BoxRewardList;
        //console.log('奖励icon', reward_list);
        for (let index = 0; index < reward_list.length; index++) {
            const element = reward_list[index];
            this.initReward(element, index);
        }
    }
    public initReward(data, index) {
        if (data.reward == 0 || data.number == 0) return;

        //清空
        // console.log(this.content);

        this.content.removeAllChildren();

        //实例化奖励预制体
        resources.load("prefabs/battle/BaseIcon", Prefab, (err, prefab) => {
            let reward_icon = instantiate(prefab);

            this.content.addChild(reward_icon);
            let icon = reward_icon.getChildByName("icon").getComponent(Sprite);
            resources.load("images/goods/" + data.reward + "/spriteFrame",SpriteFrame,(err, spriteFrame) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    icon.spriteFrame = spriteFrame;
                    //console.log(spriteFrame);
                }
            );
            let reward_num = reward_icon.getChildByName("number").getComponent(Label);

            reward_num.string = data.number;
        });
    }
    //普通领取奖励
    getReward() {
        //GameData.taskData.taskReceiveNum += 1;

        //清空显示
        this.content.removeAllChildren();

        //领取奖励到个人数据
        let reward_list = GameData.battleData.BoxRewardList;

        if (reward_list.length != 0) {
            ShowGoods.init(reward_list);
        }
        // for (let index = 0; index < reward_list.length; index++) {
        //     const element = reward_list[index];
        //     if (element.reward == 1) {
        //         //引导任务
        //         GameData.taskData.taskMoneyNum += element.number;
        //     }
        // }

        //删除宝箱存储奖励
        GameData.battleData.BoxRewardList = [];
        GameData.setBattleData();

        this.closeSelf();
    }
    getDoubleReward() {
        // if (sys.isNative) {
        //     TapSDKManager.onPullAD("4");
        // }else {
        //    this.setDoubleReward();
        //}
        if (!SDKManagers.SdkOn) {
            this.setDoubleReward();
            return;
        }
        if (sys.isNative) {
            if (SDKManagers.SDKType === 1) {
                LeChenManager.onAdClick(SDKManagers.Positions.ONE, "4");
            }
            return;
        }
        MoYangManagers.AD_id = "4";
        MoYangManagers.playAd();
    }
    //观看广告领取三倍奖励
    setDoubleReward() {
        //GameData.taskData.taskReceiveNum += 1;

        //清空显示
        this.content.removeAllChildren();

        //领取奖励到个人数据
        let reward_list = GameData.battleData.BoxRewardList;
        for (let index = 0; index < reward_list.length; index++) {
            const element = reward_list[index];
            // element.number = element.number * 3;
            element.number = element.number;
        }

        if (reward_list.length != 0) {
            ShowGoods.init(reward_list);
        }
        // for (let index = 0; index < reward_list.length; index++) {
        //     const element = reward_list[index];
        //     if (element.reward == 1) {
        //         //引导任务
        //         GameData.taskData.taskMoneyNum += element.number;
        //     }
        // }

        //删除宝箱存储奖励
        GameData.battleData.BoxRewardList = [];
        GameData.setBattleData();

        this.closeSelf();
    }

    //关闭自身
    closeSelf() {
        BattleManager.Instance.clickOther();
    }
}
