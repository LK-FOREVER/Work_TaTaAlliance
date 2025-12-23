import { _decorator, Button, Component, find, Node, RichText, sys } from "cc";
import { GameData } from "../../Common/GameData";
import { MessageManager } from "../../Managers/MessageManager";
import { HangupController } from "./HangupController";
import { MainUIControllers } from "../MainUI/MainUIControllers";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
const { ccclass, property } = _decorator;

@ccclass("HangupToplimitController")
export class HangupToplimitController extends Component {
    public static instance: HangupToplimitController = null;
    add_time_promotion_info = null;
    nowPromotionInfo = null;
    isWatchAD = false;

    @property(Node)
    hangup_toplimit_text: Node = null;
    @property(Node)
    hangup_toplimit_text_1: Node = null;
    @property(Node)
    top_limit_add_btn: Node = null;
    start() {
        HangupToplimitController.instance = this;
        find("btn_close", this.node).on(
            Button.EventType.CLICK,
            () => {
                this.node.destroy();
            },
            this
        );
        const Canvas = find("Canvas");
        // 增加挂机时长按钮
        this.top_limit_add_btn.on(Button.EventType.CLICK, (event) => {
            console.log("this.isWatchAD", this.isWatchAD);
            if (!this.isWatchAD) {
                Canvas.getComponent(MessageManager).openMessage(
                    "未满足职位要求"
                );
                return;
            } else {
                if (!SDKManagers.SdkOn) {
                    return;
                }
                if (sys.isNative) {
                    if (SDKManagers.SDKType === 1) {
                        LeChenManager.onAdClick(
                            SDKManagers.Positions.TWO,
                            "12"
                        );
                    }
                    return;
                }
                MoYangManagers.AD_id = "12";
                MoYangManagers.playAd();
            }
        });
    }
    hangup() {
        GameData.userData.addHangupTime += this.nowPromotionInfo.add_toplimit;
        GameData.userData.hangupPromotionId += 1;
        // GameData.saveData()
        MainUIControllers.instance.hangupUpdataTime(true);
        this.node.parent.getComponent(HangupController).updateTime();
        this.node.destroy();
    }

    setData(add_time_promotion_info) {
        this.add_time_promotion_info = add_time_promotion_info;
        this.add_time_promotion_info.forEach((item) => {
            if (item.id === GameData.userData.hangupPromotionId) {
                this.nowPromotionInfo = item;
            }
        });
        this.isWatchAD =
            GameData.userData.career >= this.nowPromotionInfo.promotion_id;
        let promotionColor = this.isWatchAD ? "#84c03f" : "#e34135";
        this.hangup_toplimit_text_1.getComponent(
            RichText
        ).string = `<color=#ffffff>职位需求：</color><color=${promotionColor}>${this.nowPromotionInfo.promotion_name}</color>`;
        this.hangup_toplimit_text.getComponent(
            RichText
        ).string = `<color=#ffda2b>永久增加</color><color=#ffffff>${this.nowPromotionInfo.add_toplimit}分钟挂机时长上限</color>`;
    }

    update(deltaTime: number) {}
}
