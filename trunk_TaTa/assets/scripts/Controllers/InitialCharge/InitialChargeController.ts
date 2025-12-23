import { _decorator, Button, Component, native, Node, sys } from 'cc';
import { ShowGoods } from '../../Common/ShowGoods';
import { GameData } from '../../Common/GameData';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('InitialChargeController')
export class InitialChargeController extends Component {
    protected onLoad(): void {
        EventManager.Instance.on(EventConst.PURCHASE,this.purchaseCallback,this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PURCHASE,this.purchaseCallback,this)
    }
    
    init() {
        const charge_btn = this.node.getChildByName("main_bg").getChildByName("charge_btn");
        const close_btn = this.node.getChildByName("close");
        charge_btn.on(Button.EventType.CLICK,this.buy,this);
        close_btn.on(Button.EventType.CLICK,this.close,this);
    }

    purchaseCallback(itemId) {
        if(itemId !== `hc_gift_16`) return
        this.get_reward()
    }

    buy() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            //native.bridge.sendToNative('purchase',`hc_gift_16`);
            this.get_reward();
        } else {
            this.get_reward();
        }
        GameData.saveData(false);
    }

    async get_reward() {
        const reward_list = [
            {
                reward:2007,
                number:30
            },
            {
                reward:1,
                number:5000
            },
             {
                reward:5,
                number:5
            },
        ]
        GameData.userData.isInitialCharge = true;
        await ShowGoods.init(reward_list);
        //GameData.Instance.sendDataRequest();
        this.node.parent.getChildByName("open_initial_charge_btn").active = false
        this.close();
    }

    close() {
        this.node.active = false
    }
}
