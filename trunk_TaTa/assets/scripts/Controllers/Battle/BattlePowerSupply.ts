import { _decorator, Button, Component, Label, Node, Event, resources, SpriteFrame, Sprite, sys, native } from 'cc';
import { GameData } from '../../Common/GameData';
import { BattleManager } from '../../Managers/BattleManager';
import { Utils } from '../../Common/Utils';
import { TextUtils } from '../../Common/TextUtils';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('BattlePowerSupply')
export class BattlePowerSupply extends Component {
    button_gray_1: SpriteFrame = null;
    button_yellow: SpriteFrame = null;
    button_blue: SpriteFrame = null;
    ad_times: Label = null;
    buy_times: Label = null;
    buy_num: Label = null;
    btn_ad: Node = null;
    btn_buy: Node = null;
    btn_close: Node = null;
    protected onLoad(): void {
        EventManager.Instance.on(EventConst.PLAY_AD,this.play_ad,this)
    }
    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PLAY_AD,this.play_ad,this)
    }
    init() {
        this.ad_times = this.node.getChildByName("ad_times").getComponent(Label);
        this.buy_times = this.node.getChildByName("buy_times").getComponent(Label);
        this.buy_num = this.node.getChildByName("buy_icon").getChildByName("buy_num").getComponent(Label);
        this.btn_ad = this.node.getChildByName("btn_ad");
        this.btn_buy = this.node.getChildByName("btn_buy");
        this.btn_close = this.node.getChildByName("btn_close");

        // 使用 Promise.all 确保资源都加载完毕后在进行后续操作
        Promise.all([
            this.loadResource("textures/common/common_button_gray_new/spriteFrame", SpriteFrame),
            this.loadResource("textures/common/common_button_yellow_new/spriteFrame", SpriteFrame),
            this.loadResource("textures/common/common_button_blue/spriteFrame", SpriteFrame),
        ]).then(([
            button_gray_1,
            button_yellow,
            button_blue
        ]: [SpriteFrame, SpriteFrame, SpriteFrame]
        ) => {
            this.button_gray_1 = button_gray_1;
            this.button_yellow = button_yellow;
            this.button_blue = button_blue;
            // 在这里添加后续操作
            this.btn_ad.on(Button.EventType.CLICK, this.btn_handler, this)
            this.btn_buy.on(Button.EventType.CLICK, this.btn_handler, this)
            this.btn_close.on(Button.EventType.CLICK, this.close_handler, this)

            this.updateUI();
        }).catch((error) => {
            console.error('error', error);
        });
    }
    updateUI() {
        // this.ad_times.string = `次数: ${GameData.userData.batteryAdBuyLastNumber}/${GameData.userData.batteryAdBuyNumber}`
        this.buy_times.string = `次数: ${GameData.userData.batteryBullionBuyLastNumber}/${GameData.userData.batteryBullionBuyNumber}`
        this.buy_num.string = `x${GameData.userData.batteryBullionCost}`

        if (GameData.userData.batteryBullionBuyLastNumber <= 0) {
            this.btn_buy.getComponent(Sprite).spriteFrame = this.button_gray_1;
            this.btn_buy.getComponent(Button).interactable = false;
        } else {
            this.btn_buy.getComponent(Sprite).spriteFrame = this.button_yellow;
            this.btn_buy.getComponent(Button).interactable = true;
        }
        // if (GameData.userData.batteryAdBuyLastNumber <= 0) {
        //     this.btn_ad.getComponent(Sprite).spriteFrame = this.button_gray_1;
        //     this.btn_ad.getComponent(Button).interactable = false;
        // } else {
        //     this.btn_ad.getComponent(Sprite).spriteFrame = this.button_blue;
        //     this.btn_ad.getComponent(Button).interactable = true;
        // }
        BattleManager.Instance.updateBatteryStrengthen()
    }
    btn_handler(event: Event) {
        const target: Node = event.target;
        if (target.name === "btn_ad") {
            // if (GameData.userData.batteryAdBuyLastNumber > 0) {
            //     if(sys.os === sys.OS.ANDROID || sys.isNative) {
            //         if(!GameData.userData.has_monthly_plan_2) {
            //             //native.bridge.sendToNative('play_ad',`power`);
            //             this.get_reward();
            //         } else {
            //             this.get_reward();
            //         }
            //     } else {
            //         this.get_reward();
            //     } 
            // }
        } else if (target.name === "btn_buy") {
            if (GameData.userData.batteryBullionBuyLastNumber > 0) {
                if (GameData.userData.hasGoodsList[11] >= GameData.userData.batteryBullionCost) {
                    GameData.userData.batteryBullionBuyLastNumber -= 1
                    GameData.userData.hasGoodsList[12] += 120
                    GameData.userData.hasGoodsList[11] -= GameData.userData.batteryBullionCost
                    GameData.saveData(false);
                } else {
                    Utils.create_goto_shop_tips("水晶")
                }
            }
        }
        this.updateUI();
    }

    play_ad(id:string) {
        if(id !== `power`) return 
        this.get_reward();
    }

    get_reward() {
        // let id = GameData.taskData.continuousTaskId % TextUtils.Instance.task__get_continuous_task.length
        // if (id == 2) {
        //     GameData.taskData.continueTaskContentNumList[id]++;
        // }
        GameData.taskData.dailyTaskContentNumList[1]++;

        // GameData.userData.batteryAdBuyLastNumber -= 1
        GameData.userData.hasGoodsList[12] += 120
        // //GameData.Instance.sendDataRequest();
    }

    // 加载资源并返回 Promise 的函数
    loadResource(path: string, type: any) {
        return new Promise((resolve, reject) => {
            resources.load(path, type, (err, spriteFrame) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(spriteFrame);
                }
            });
        });
    };
    close_handler() {
        this.node.active = false;
    }
}
