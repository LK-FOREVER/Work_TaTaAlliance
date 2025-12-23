import { _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SDKManagers")
export class SDKManagers {
    static SDKs = {
        LOADLOGIN: "LOADLOGIN", //登录初始化验证是否已经登陆过
        TAPLOGIN: "TAPLOGIN", //tap登录
        SHARE: "SHARE", //tap分享
        QUIT: "QUIT", //退出游戏
        UPDATECLENT: "UPDATECLENT", //tap更新
        PULL_UP_AD: "PULL_UP_AD", //拉起广告
        SHOW_AD_SUCCESS: "SHOW_AD_SUCCESS", //广告结束
        SHARE_SUCCESS: "SHARE_SUCCESS", //分享成功获得奖励
        SAVE_TO_LOCAL: "SAVE_TO_LOCAL", //保存二维码
    };
    //
    static SdkOn = false;
    //1 LeChen
    static SDKType = 1;

    static Positions = {
        ONE: "广告招聘",
        TWO: "三倍奖励",
        THREE: "季度奖金",
    };
}
