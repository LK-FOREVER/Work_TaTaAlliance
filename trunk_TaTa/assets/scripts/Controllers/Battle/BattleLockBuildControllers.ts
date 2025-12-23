import { _decorator, Button, Component, find, Label, Node, sys } from "cc";
import { GameData } from "../../Common/GameData";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { BattleManager } from "../../Managers/BattleManager";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
const { ccclass, property } = _decorator;

@ccclass("BattleLockBuildControllers")
export class BattleLockBuildControllers extends Component {
    public static instance: BattleLockBuildControllers = null;
    protected onLoad(): void {
        BattleLockBuildControllers.instance = this;
    }
    init() {
        //观看广告
        find("btn_start", this.node).on(Button.EventType.CLICK,() => {
                // if (sys.isNative) {
                //     console.log("观看广告");
                //     TapSDKManager.onPullAD("7");
                // } else {
                // if (GameData.userData.lockBuildNeedAdNum < 5) {
                //     this.changeBuild();
                // }
                // if (!SDKManagers.SdkOn) {
                //     if (GameData.userData.lockBuildNeedAdNum < 5) {
                //         this.changeBuild();
                //     }
                //     return;
                // }
                // if (GameData.userData.lockBuildNeedAdNum < 5) {
                //     if (sys.isNative) {
                //         if (SDKManagers.SDKType === 1) {
                //             LeChenManager.onAdClick(SDKManagers.Positions.ONE,"7");
                //         }
                //         return;
                //     }
                //     MoYangManagers.AD_id = "7";
                //     MoYangManagers.playAd();
                // }
            },this);
        find("btn_close", this.node).on(Button.EventType.CLICK,() => {
                this.node.active = false;
            },this);
        // find("num", this.node).getComponent(Label).string = GameData.userData.lockBuildNeedAdNum + "/5";
    }
    changeBuild() {
        console.log("解锁建造点7");

        // GameData.userData.lockBuildNeedAdNum = GameData.userData.lockBuildNeedAdNum + 1;
        // let num = GameData.userData.lockBuildNeedAdNum;
        // console.log("看广告数量", GameData.userData.lockBuildNeedAdNum);
        this.changeNum();
        // if (num >= 5) {
        //     //显示可解锁
        //     GameData.userData.unlockNum = GameData.userData.unlockNum + 1;
        //     globalThis.tar.emit("SHOWUNLOCK");
        //     BattleManager.Instance.changeLockBuild();
        // }
    }
    changeNum() {
        // find("num", this.node).getComponent(Label).string = GameData.userData.lockBuildNeedAdNum + "/5";
    }
}
