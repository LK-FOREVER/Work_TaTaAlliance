import {
    _decorator,
    Button,
    Component,
    find,
    Label,
    Node,
    SpringJoint2D,
    Sprite,
    sys,
} from "cc";
import { GameData } from "../Common/GameData";
import { MainUIControllers } from "../Controllers/MainUI/MainUIControllers";
import { ShowGoods } from "../Common/ShowGoods";
import { ToastControllers } from "../Common/ToastControllers";
import { SDKManagers } from "../Common/SDKManagers";
const { ccclass, property } = _decorator;
declare var tt: any;
@ccclass("EnterManagers")
export class EnterManagers extends Component {
    // public static instance: EnterManagers = null;
    // onLoad() {
    //     EnterManagers.instance = this;
    // }
    protected start(): void {
        find("btn_close", this.node).on(
            Button.EventType.CLICK,
            () => {
                this.node.active = false;
            },
            this
        );
        find("btn_enter", this.node).on(
            Button.EventType.CLICK,
            () => {
                if (
                    GameData.userData.isSidebarEnter &&
                    GameData.userData.isFirstEnterReward
                ) {
                    let reward_list = [
                        {
                            reward: 1,
                            number: 6666,
                        },
                    ];
                    ShowGoods.init(reward_list);
                    GameData.userData.isFirstEnterReward = false;
                    this.changeBtn();
                } else if (
                    !GameData.userData.isSidebarEnter &&
                    GameData.userData.isFirstEnterReward
                ) {
                    EnterManagers.toSideBar();
                    this.node.active = false;
                } else {
                    ToastControllers.Instance.showToast(
                        "今日已领取，请明天再来"
                    );
                }
            },
            this
        );
    }
    public changeBtn() {
        if (GameData.userData.isSidebarEnter) {
            find("btn_enter/txt_btn", this.node).getComponent(Label).string =
                "领取奖励";
        } else {
            find("btn_enter/txt_btn", this.node).getComponent(Label).string =
                "进入侧边栏";
        }
        if (!GameData.userData.isFirstEnterReward) {
            find("btn_enter/txt_btn", this.node).getComponent(Label).string =
                "已领取";
            find("btn_enter", this.node).getComponent(Sprite).grayscale = true;
        }
    }

    public static onEnter() {
        if (!SDKManagers.SdkOn) return;
        if (sys.isNative) return;
        tt.onShow((res) => {
            console.log("启动参数：", res.query);
            console.log("来源信息：", res.refererInfo);
            console.log("场景值：", res.scene);
            console.log("启动场景字段：", res.launch_from, ", ", res.location);
            if (
                res.launch_from == "homepage" &&
                res.location == "sidebar_card"
            ) {
                GameData.userData.isSidebarEnter = true;
            }
        });
    }
    public static onShowEnterBtn() {
        if (!SDKManagers.SdkOn) return;
        if (sys.isNative) return;
        tt.checkScene({
            scene: "sidebar",
            success: (res) => {
                console.log("check scene success: ", res.isExist);
                //成功回调逻辑
                MainUIControllers.instance.open_enter_btn.active = true;
            },
            fail: (res) => {
                console.log("check scene fail:", res);
                //失败回调逻辑
                MainUIControllers.instance.open_enter_btn.active = false;
            },
        });
    }
    //点击按钮跳转侧边栏
    public static toSideBar() {
        if (!SDKManagers.SdkOn) return;
        if (sys.isNative) return;
        tt.navigateToScene({
            scene: "sidebar",
            success: (res) => {
                console.log("navigate to scene success");
                // 跳转成功回调逻辑
            },
            fail: (res) => {
                console.log("navigate to scene fail: ", res);
                // 跳转失败回调逻辑
            },
        });
    }
    //领取入口奖励
    public static onReward() {}
}
