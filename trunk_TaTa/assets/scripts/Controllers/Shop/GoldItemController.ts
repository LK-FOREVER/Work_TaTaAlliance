import { _decorator, Button, Color, Component, find, Label, Node, resources, Sprite, SpriteFrame } from 'cc';
import { TextUtils } from '../../Common/TextUtils';
import { ShowGoods } from '../../Common/ShowGoods';
import { GameApp } from '../../GameApp';
import { GameData } from '../../Common/GameData';
import { Utils } from '../../Common/Utils';
import { ShopController } from './ShopController';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('GoldItemController')
export class GoldItemController extends Component {
    info: any
    isChoose:boolean = false
    init(info: any) {
        this.info = info;
        this.isChoose = false;
        const bg = this.node.getChildByName("icon").getChildByName("bg").getComponent(Sprite);
        const quality = TextUtils.Instance.goods__get_goods_info.find(item => item.id == info.good_id).quality
        resources.load("textures/common/common_goods_" + quality + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            bg.spriteFrame = spriteFrame;
        })
        const icon = this.node.getChildByName("icon").getChildByName("icon").getComponent(Sprite);
        resources.load("images/goods/" + info.good_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            icon.spriteFrame = spriteFrame;
        })
        this.node.getChildByName("name").getComponent(Label).string = TextUtils.Instance.goods__get_goods_info.find(item => item.id == info.good_id).english_name;
        this.node.getChildByName("icon").getChildByName("number").getComponent(Label).string = info.num.toString();
        const label = this.node.getChildByName("bottom").getChildByName("Label")
        label.getComponent(Label).string = info.price.toString();

        this.node.on(Button.EventType.CLICK, this.buy, this);
        // EventManager.Instance.on(EventConst.BUY,this.get_good,this);
        EventManager.Instance.on(EventConst.UPDATE_GOLD_ITEM,this.updatePrice,this);
    }

    onDestroy(): void {
        // EventManager.Instance.off(EventConst.BUY,this.get_good,this);
        EventManager.Instance.off(EventConst.UPDATE_GOLD_ITEM,this.updatePrice,this);
    }

    buy() {
        if(GameData.userData.hasGoodsList[4] < this.info.price) {
            Utils.create_message("Insufficient Gold Bar")
            return;
        }
        find("Canvas").getChildByName("shop_view").getChildByName("tip_box").active = true
        this.isChoose = true
    }

    get_good() {
        if(!this.isChoose) return
        this.isChoose = false
        GameData.userData.hasGoodsList[4] -= this.info.price;
        const reward = [
            {
                reward: this.info.good_id,
                number: this.info.num
            }
        ]
        ShowGoods.init(reward);
        find("Canvas").getChildByName("MainTop").getComponent(GameApp).updateplayerinfo();
    }

    updatePrice() {
        const label = this.node.getChildByName("bottom").getChildByName("Label")
        label.getComponent(Label).color = GameData.userData.hasGoodsList[4] >= this.info.price ? new Color("#ffffff") : new Color("#d04c42");
    }
}
