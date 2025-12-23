import { _decorator, Button, Component, find, Label, native, Node, resources, Sprite, SpriteFrame, sys } from 'cc';
import { GameData } from '../../Common/GameData';
import { ShowGoods } from '../../Common/ShowGoods';
import { GameApp } from '../../GameApp';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('MoneyItemController')
export class MoneyItemController extends Component {
    info:any

    protected onLoad(): void {
        EventManager.Instance.on(EventConst.PURCHASE,this.purchaseCallback,this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PURCHASE,this.purchaseCallback,this)
    }
    
    init(info:any) {
        this.info = info;
        const bg = this.node.getChildByName("icon").getChildByName("bg").getComponent(Sprite);
        resources.load("textures/common/common_goods_" + 6 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            bg.spriteFrame = spriteFrame;
        })
        const icon = this.node.getChildByName("icon").getChildByName("icon").getComponent(Sprite);
        resources.load("images/goods/" + 4 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            icon.spriteFrame = spriteFrame;
        })
        this.node.getChildByName("icon").getChildByName("number").getComponent(Label).string = info.num.toString();
        this.node.getChildByName("bottom").getChildByName("Label").getComponent(Label).string = "$" + info.price;
        this.node.getChildByName("double").active = !GameData.userData.money_item_status[info.id];
        this.node.on(Button.EventType.CLICK,this.buy,this);
    }

    purchaseCallback(itemId) {
        console.log("Good",itemId,this.info.tag)
        if(itemId !== this.info.tag) return
        console.log("curGood",itemId,this.info.tag)
        this.get_reward()
    }

    buy() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            //native.bridge.sendToNative('purchase',`${this.info.tag}`);
            this.get_reward();
        } else {
            this.get_reward();
        }
    }

    async get_reward() {
        const multiple = GameData.userData.money_item_status[this.info.id] ? 1:2;
        const reward = [
            {
                reward:4,
                number:this.info.num * multiple
            }
        ]
        GameData.userData.money_item_status[this.info.id] = true;
        await ShowGoods.init(reward);
        //GameData.Instance.sendDataRequest();
        this.node.getChildByName("double").active = false;
        find("Canvas").getChildByName("MainTop").getComponent(GameApp).updateplayerinfo();
    }
}
