import { _decorator, Component, native, Node, sys } from "cc";
import { LeChenManager } from "./LeChenManager";
import { LoginController } from "../Controllers/login/LoginController";
import { SDKManagers } from "../Common/SDKManagers";
import { BoxRewardControllers } from "../Controllers/Battle/BoxRewardControllers";
import { DecisionBuffController } from "../Controllers/Decision/DecisionBuffController";
import { InviteController } from "../Controllers/invite/InviteController";
import { promotion_free } from "../Controllers/promotion/promotion_free";
import { bonusController } from "../Controllers/Bonus/bonusController";

import { ShowGoods } from "../Common/ShowGoods";
import { GameData } from "../Common/GameData";
import { MainUIControllers } from "../Controllers/MainUI/MainUIControllers";
import { staffUpController } from "../Controllers/StaffUp/staffUpController";
import { BattleLockBuildControllers } from "../Controllers/Battle/BattleLockBuildControllers";
import { BattleManager } from "../Managers/BattleManager";
import { SevenSignController } from "../Controllers/SevenSign/SevenSignController";
import { HangupController } from "../Controllers/Hangup/HangupController";
const { ccclass, property } = _decorator;

@ccclass("TapSDKManager")
export class TapSDKManager extends Component {
    //注册原生侦听
    public static native_call() {
        console.log("注册原生侦听");

        native.bridge.onNative = (arg0: string, arg1: string): void => {
            if (arg0 == SDKManagers.SDKs.LOADLOGIN) {
                if (arg1) {
                    console.log("本地有账号");
                    LoginController.instance.btn_login.active = false;
                    //乐辰登录
                    LeChenManager.onLogin(arg1);
                } else {
                    console.log("本地没有账号");
                    LoginController.instance.btn_login.active = true;
                }
            } else if (arg0 == SDKManagers.SDKs.TAPLOGIN) {
                if (arg1) {
                    console.log("登陆成功");
                    //乐辰登录
                    LeChenManager.onLogin(arg1);
                } else {
                    console.log("登陆失败");
                }
            } else if (arg0 == SDKManagers.SDKs.SHARE_SUCCESS) {
                console.log("收到分享奖励");

                if (!GameData.userData.isShare) {
                    let reward_list = [
                        {
                            reward: 1,
                            number: 6666,
                        },
                    ];
                    ShowGoods.init(reward_list);
                    GameData.userData.isShare = true;
                    if (GameData.userData.isShare) {
                        MainUIControllers.instance.btn_share.getChildByName(
                            "reddot"
                        ).active = false;
                    }
                    //引导任务
                    //GameData.taskData.taskMoneyNum += reward_list[0].number;
                }
            } else if (arg0 == SDKManagers.SDKs.UPDATECLENT) {
                console.log("tap更新");
            }
            // else if (arg0 == SDKManagers.SDKs.PULL_UP_AD) {
            //     console.log('拉起广告');
            // }
            else if (arg0 == SDKManagers.SDKs.SHOW_AD_SUCCESS) {
                console.log("arg1-->", arg1);
                if (arg1) {
                    console.log("广告结束");
                    const arg = arg1.split("|");
                    LeChenManager.AdCallback(arg[0]);
                    switch (arg[1]) {
                        case "1":
                            //招聘次数不够时看广告进行招聘
                            InviteController.Instance.inviteStaff(true);
                            break;
                        case "2":
                            //职位晋升时金币不足看广告领取-
                            promotion_free.Instance.promotionFree();
                            break;
                        case "3":
                            //季度奖金看广告领取金币
                            bonusController.Instance.bonusReceiveFn();
                            break;
                        case "4":
                            //领取宝箱奖励时看广告领取双倍奖励
                            BoxRewardControllers.Instance.setDoubleReward();
                            break;
                        case "5":
                            //决策有负面效果时看广告消除负面效果
                            DecisionBuffController.instance.setremovebuff();
                            break;
                        case "6":
                            //角色直升领取奖励
                            staffUpController.Instance.receiveFn();
                            break;
                        case "7":
                            //观看广告解锁建造点
                            BattleLockBuildControllers.instance.changeBuild();
                            break;
                        case "8":
                            //观看广告释放全体禁锢
                            BattleManager.Instance.onAdAllStop();
                            break;
                        case "9":
                            //观看广告释放全体伤害
                            BattleManager.Instance.onAdAllHurt();
                            break;
                        case "10":
                            //七日登录
                            SevenSignController.Instance.receiveFn(true);
                            break;
                        case "11":
                            //挂机奖励
                            HangupController.Instance.receiveFn(true);
                            break;
                    }
                }
            } else {
                console.log("sdk回调错误");
            }
        };
    }
    //tap分享
    public static onShare() {
        if (SDKManagers.SdkOn && sys.isNative) {
            native.bridge.sendToNative(SDKManagers.SDKs.SHARE);
        }
    }
    //tap更新
    public static onUpdate() {
        if (SDKManagers.SdkOn && sys.isNative) {
            native.bridge.sendToNative(SDKManagers.SDKs.UPDATECLENT);
        }
    }
    //拉起广告，传广告点ID
    public static onPullAD(position, id) {
        if (SDKManagers.SdkOn && sys.isNative) {
            native.bridge.sendToNative(
                SDKManagers.SDKs.PULL_UP_AD,
                position + "|" + id
            );
        }
    }
    //登录初始化验证是否已经登陆过
    public static setLoadLogin() {
        if (SDKManagers.SdkOn && sys.isNative) {
            console.log("登录初始化验证是否已经登陆过");
            native.bridge.sendToNative(SDKManagers.SDKs.LOADLOGIN, "LoadLogin");
        }
    }
    //登录sdk请求java端
    public static setTapLogin() {
        if (SDKManagers.SdkOn && sys.isNative) {
            console.log("登录sdk请求java端");
            native.bridge.sendToNative(SDKManagers.SDKs.TAPLOGIN, "Taplogin");
        }
    }
    //保存二维码
    public static onSaveQRCode(path) {
        if (SDKManagers.SdkOn && sys.isNative) {
            native.bridge.sendToNative(SDKManagers.SDKs.SAVE_TO_LOCAL, path);
        }
    }

    update(deltaTime: number) {}
}
