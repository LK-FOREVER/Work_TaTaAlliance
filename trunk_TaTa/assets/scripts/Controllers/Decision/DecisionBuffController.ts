import { _decorator, Button, Component, Node, sys } from "cc";
import { BattleManager } from "../../Managers/BattleManager";
import { AddControllers } from "../../Common/AddControllers";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
const { ccclass, property } = _decorator;

@ccclass("DecisionBuffController")
export class DecisionBuffController extends Component {
    public static instance: DecisionBuffController = null;
    btn_remove: Node;
    btn_continue: Node;
    nagetiveList: any;
    start() {
        DecisionBuffController.instance = this;
    }
    init(nagetiveList) {
        let view = this.node.getChildByName("view");
        this.btn_remove = view.getChildByName("btn_remove");
        this.btn_continue = view.getChildByName("btn_continue");
        this.btn_remove.on(Button.EventType.CLICK, this.getremovebuff, this);
        this.btn_continue.on(Node.EventType.TOUCH_END, this.closeBySelf, this);
        this.nagetiveList = nagetiveList;
    }
    getremovebuff() {
        // if (sys.isNative) {
        //     TapSDKManager.onPullAD("5");
        // }else {
        //    this.setremovebuff();
        // }
        if (!SDKManagers.SdkOn) {
            this.setremovebuff();
            return;
        }
        if (sys.isNative) {
            if (SDKManagers.SDKType === 1) {
                LeChenManager.onAdClick(SDKManagers.Positions.TWO, "5");
            }
            return;
        }
        MoYangManagers.AD_id = "5";
        MoYangManagers.playAd();
    }
    //观看广告消除负面buff，不加负面效果
    setremovebuff() {
        console.log("消除负面buff5");

        // BattleManager.Instance.setDecisionRemoveBuff(false, null);
    }
    //继续游戏，不消除负面效果,加上负面效果
    public closeBySelf() {
        for (let index = 0; index < this.nagetiveList.length; index++) {
            const element = this.nagetiveList[index];
            AddControllers.add(element.type, element.add, element.num);
        }

        // BattleManager.Instance.setDecisionRemoveBuff(false, null);
    }
}
