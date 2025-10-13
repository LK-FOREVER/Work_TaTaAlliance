import { _decorator, Component, Node, Button, sys } from "cc";
import { PromotionManager } from "../../Managers/PromotionManager";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";

const { ccclass, property } = _decorator;

@ccclass("promotion_free")
export class promotion_free extends Component {
    promotion_free_btn: Node = null;
    promotion_close_text: Node = null;
    public static Instance: promotion_free = null!;
    protected onLoad(): void {
        promotion_free.Instance = this;
    }
    start() {
        this.promotion_free_btn =
            this.node.getChildByName("promotion_free_btn");
        this.promotion_close_text = this.node.getChildByName(
            "promotion_close_text"
        );
        this.promotion_free_btn.on(Button.EventType.CLICK, () => {
            // if (sys.isNative) {
            //     TapSDKManager.onPullAD("2");
            // }else {
            //    this.promotionFree();
            //}
            if (!SDKManagers.SdkOn) {
                this.promotionFree();
                return;
            }
            if (sys.isNative) {
                if (SDKManagers.SDKType === 1) {
                    LeChenManager.onAdClick(SDKManagers.Positions.THREE, "2");
                }
                return;
            }
            MoYangManagers.AD_id = "2";
            MoYangManagers.playAd();
        });
        this.promotion_close_text.on(Button.EventType.CLICK, () => {
            this.node.destroy();
        });
    }

    promotionFree() {
        console.log("职位晋升2");
        PromotionManager.Instance.promotionFn();
        this.node.destroy();
    }
}
