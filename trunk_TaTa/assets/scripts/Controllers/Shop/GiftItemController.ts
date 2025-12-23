import { _decorator, Button, Color, Component, find, Label, native, Node, resources, Sprite, SpriteFrame, sys, Vec2, Vec3 } from 'cc';
import { TextUtils } from '../../Common/TextUtils';
import { GameData } from '../../Common/GameData';
import { ShowGoods } from '../../Common/ShowGoods';
import { GameApp } from '../../GameApp';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { MainUIControllers } from "../MainUI/MainUIControllers";

const { ccclass, property } = _decorator;

@ccclass('GiftItemController')
export class GiftItemController extends Component {
    info:any
    index:number = 0
    data:any = null
    times_Label:any =null;
    tips:any = null;
    can_buy:boolean = false;
    is_choosed:boolean = false;
    cost_icon:any = null;
    cost_number:any = null;

    protected onLoad(): void {
        EventManager.Instance.on(EventConst.BUY,this.buy,this);
        EventManager.Instance.on(EventConst.CHOSE_SHOP_GOOD,this.cancelChose,this);
        // EventManager.Instance.on(EventConst.PURCHASE,this.purchaseCallback,this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.BUY,this.buy,this);
        EventManager.Instance.off(EventConst.CHOSE_SHOP_GOOD,this.cancelChose,this);
        // EventManager.Instance.off(EventConst.PURCHASE,this.purchaseCallback,this)
    }
    init(info:any,index:number) {
        this.info = info;
        this.index = index
        this.tips = find("Canvas").getChildByName("shop_view").getChildByName("tips");

        const items_1 = this.node.getChildByName("items_1");
        const items_2 = this.node.getChildByName("items_2");

        if(this.info.type == 1 || this.info.type == 2) {
            this.cost_number = this.node.getChildByName("bottom").getChildByName("Label");
            this.cost_number.setPosition(new Vec3(30.86,3.774,0));
            this.cost_number.getComponent(Label).horizontalAlign = Label.HorizontalAlign.LEFT; 
            this.cost_icon = this.node.getChildByName("bottom").getChildByName("cost_icon");
            if(this.cost_icon) {
            this.cost_icon.active = true;
             switch (this.info.cost_type) {
                //图片资源1：金币
                case 1:
                //图片资源11：水晶
                case 11:
                     resources.load("images/goods/" + this.info.cost_type + "/spriteFrame", SpriteFrame, (err, spriteFrame) =>  {
                        if (err) {
                            console.log(err);
                            return;
                        }
                       this.cost_icon.getComponent(Sprite).spriteFrame =spriteFrame 
                    })
                    break;
                default:
                    this.cost_icon.active = false;
                    //去掉图标的居中
                    this.cost_number.setPosition(new Vec3(0,3.774,0));
                    this.cost_number.getComponent(Label).horizontalAlign = Label.HorizontalAlign.CENTER; 
                    break;
                }    
            }
        }
      
        
        if(this.info.good_id_2 == 0) {
            items_1.active = true;
            items_2.active = false;
            if(this.info.type == 1 || this.info.type == 2) {
                this.times_Label = this.node.getChildByName("times_label").getComponent(Label);
            }
            if(this.times_Label){
                if(this.info.type == 1)
                {
                     this.times_Label.string = "每日限购"+this.info.times.toString()+"次";
                    // resources.load("textures/shop/shop_daily_purchase_limit_" + this.info.times + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                    //     if (err) {
                    //         console.log(err);
                    //         return;
                    //     }
                       
                    // })
                }
                if(this.info.type == 2)
                {
                    this.times_Label.string = "每周限购"+this.info.times.toString()+"次";
                    // resources.load("textures/shop/shop_week_purchase_limit_" + this.info.times + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                    //     if (err) {
                    //         console.log(err);
                    //         return;
                    //     }
                         
                    // })
                }

            }
            // const bg = items_1.getChildByName("bg").getComponent(Sprite);
            // const quality = TextUtils.Instance.goods__get_goods_info.find(item => item.id == this.info.good_id_1).quality
            // resources.load("textures/common/common_goods_" + quality + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     bg.spriteFrame = spriteFrame;
            // })
            const icon = items_1.getChildByName("icon").getComponent(Sprite);
            resources.load("images/goods/" + this.info.good_id_1 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                icon.spriteFrame = spriteFrame;
            })
            items_1.getChildByName("number").getComponent(Label).string = info.num_1.toString();
        } else {
            items_1.active = false;
            items_2.active = true;
            const item_1 = items_2.getChildByName("item_1");
            const bg = item_1.getChildByName("bg").getComponent(Sprite);
            const quality = TextUtils.Instance.goods__get_goods_info.find(item => item.id == this.info.good_id_1).quality
            resources.load("textures/common/common_goods_" + quality + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return;
                }
                bg.spriteFrame = spriteFrame;
            })
            const icon = item_1.getChildByName("icon").getComponent(Sprite);
            resources.load("images/goods/" + this.info.good_id_1 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                icon.spriteFrame = spriteFrame;
            })
            // item_1.getChildByName("number").getComponent(Label).string = this.info.num_1.toString();

            const item_2 = items_2.getChildByName("item_2");
            const bg2 = item_2.getChildByName("bg").getComponent(Sprite);
            const quality2 = TextUtils.Instance.goods__get_goods_info.find(item => item.id == this.info.good_id_2).quality
            resources.load("textures/common/common_goods_" + quality2 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return;
                }
                bg2.spriteFrame = spriteFrame;
            })
            const icon2 = item_2.getChildByName("icon").getComponent(Sprite);
            resources.load("images/goods/" + this.info.good_id_2 + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                icon2.spriteFrame = spriteFrame;
            })
            item_2.getChildByName("number").getComponent(Label).string = this.info.num_2.toString();
        }
        this.node.getChildByName("name").getComponent(Label).string = this.info.name + "*" + this.info.num_1.toString();
        this.node.getChildByName("bottom").getChildByName("Label").getComponent(Label).string = `${this.info.price}`;
        const times = this.node.getChildByName("times").getComponent(Label)
        switch(this.info.type) {
            case 1: times.string = GameData.userData.daily_item_times[this.index].toString();
            break
            case 2: times.string = GameData.userData.weekly_item_times[this.index].toString();
            break
            case 3: times.string = GameData.userData.monthly_item_times[this.index].toString();
            break
            default:break
        }

        switch(this.info.type) {
            case 1: this.data = GameData.userData.daily_item_times
            break
            case 2: this.data = GameData.userData.weekly_item_times
            break
            case 3: this.data = GameData.userData.monthly_item_times
            break
            default:break
        }
        this.data[this.index] <= 0 ? this.sold_out() : this.normal();

        this.node.on(Button.EventType.CLICK,this.showBuyTip,this);
    }

    showBuyTip(){
        //购买弹窗
        if(this.data[this.index] <= 0) return;
        const tip_box = find("Canvas").getChildByName("shop_view").getChildByName("tip_box");
        tip_box.active = true;
        this.is_choosed = true;
    }
    buy() {
        if(!this.is_choosed) return;
        if(this.limit_judge() == false) return;
        if (this.data[this.index] <= 0) return;
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            if(this.data[this.index] <= 0) return;
            //native.bridge.sendToNative('purchase',`${this.info.tag}`);
            this.get_reward();
        } else {
            this.get_reward();
        }
    }

    purchaseCallback(itemId:string) {
        if(itemId !== this.info.tag) return
        this.get_reward();
    }

    limit_judge():boolean
    {
        const cost = Number(this.info.price);
        console.log(GameData.userData.age)
        if(GameData.userData.age == "2" && cost>100)
        {
                 console.log("cost : "+cost);
                 this.can_buy = false;
                 this.is_choosed = false;
                 EventManager.Instance.emit(EventConst.DAY_SHOP_LIMIT)
                 return false;
        }
        GameData.userData.cost_money_month+=cost;
        if(GameData.userData.age == "2" && GameData.userData.cost_money_month>400)
            {
                 GameData.userData.cost_money_month-=this.info.price;
                 this.can_buy = false;
                 this.is_choosed = false;
                 EventManager.Instance.emit(EventConst.MONTH_SHOP_LIMIT)
                 return false;
        }
        return true;
            
    }
    async get_reward() {
        if(this.data[this.index] <= 0) return;
        if(this.info.type == 1) {
            switch(this.index) {
                case 0: this.can_buy = true;this.data[this.index]--; break;
                case 1: if(GameData.userData.hasGoodsList[11] >= 20){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[11] -= 20;
                    this.can_buy = true;
                }else{
                    this.tips.active = true;
                    this.can_buy = false;
                };break;
                case 2: if(GameData.userData.hasGoodsList[1] >= 10000){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[1] -= 10000;
                    this.can_buy = true;
                    GameData.taskData.dailyTaskContentNumList[6]+=10000;
                }else{
                    this.tips.active = true;
                    this.can_buy = false;
                };break;
                case 3: if(GameData.userData.hasGoodsList[11] >= 100){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[11] -= 100;
                    this.can_buy = true;
                }
                else{
                    this.tips.active = true;
                    this.can_buy = false;
                }
                break;
                case 4: if(GameData.userData.hasGoodsList[11] >= 50){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[11] -= 50;
                    this.can_buy = true;
                }else{
                    this.tips.active = true;
                    this.can_buy = false;
                };break;
            }
        }
        if(this.info.type == 2) {
            switch(this.index) {
                case 0: if(GameData.userData.hasGoodsList[11] >= 500){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[11] -= 500;
                    this.can_buy = true;
                }else{
                    this.tips.active = true;
                    this.can_buy = false;
                };break; 
                case 1: if(GameData.userData.hasGoodsList[11] >= 30){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[11] -= 30;
                    this.can_buy = true;
                }else{
                    this.tips.active = true;
                    this.can_buy = false;
                };break; 
                case 2: if(GameData.userData.hasGoodsList[11] >= 50){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[11] -= 50;
                    this.can_buy = true;
                }else{
                    this.tips.active = true;
                    this.can_buy = false;
                };break; 
                case 3: if(GameData.userData.hasGoodsList[11] >= 500){
                    this.data[this.index]--;
                    GameData.userData.hasGoodsList[11] -= 500;
                    this.can_buy = true;
                }else{
                    this.tips.active = true;
                    this.can_buy = false;
                };break; 

            } 
        }
        if(this.info.type == 3) 
        {
            this.can_buy = true;
            
            if(this.can_buy) {
            {
                GameData.taskData.dailyTaskContentNumList[4]++;
            } 
        }
    }

        if(this.can_buy){
            let reward = []
            if(this.info.good_id_2 == 0) {
                if(this.info.type == 1) {
                    if(this.index == 0 || this.index == 1) {
                        reward = [{
                            reward:1,
                            number:this.info.num_1 
                        }]
                    }else if(this.index == 3) {
                        reward = [{
                            reward:5,
                            number:this.info.num_1 
                        }]
                    }else{
                        reward = [{
                            reward:this.info.good_id_1,
                            number:this.info.num_1 
                        }]
                    }
                }
                else if(this.info.type == 2) {
                    if(this.index == 0) 
                    {
                        reward = [{
                            reward:1,
                            number:this.info.num_1
                        }] 
                    }
                    else if(this.index == 3) {
                        reward = [{
                            reward:5,
                            number:this.info.num_1
                        }]
                    } 
                    else{
                        reward = [{
                            reward:this.info.good_id_1,
                            number:this.info.num_1
                        }]
                    }
                }
                else if(this.info.type == 3) {
                    reward = [{
                        reward:11,
                        number:this.info.num_1
                    }] 
                }
            } else {
                reward = [{
                        reward:this.info.good_id_1,
                        number:this.info.num_1 
                    },
                    {
                        reward:this.info.good_id_2,
                        number:this.info.num_2 
                    }]
            }
            await ShowGoods.init(reward);
            //GameData.Instance.sendDataRequest();
            this.init(this.info,this.index);
            GameData.taskData.dailyTaskContentNumList[3]++;
            //更新主界面红点
            find("Canvas").getComponent(MainUIControllers).updateRedDot();
            //更新玩家信息
            find("Canvas").getChildByName("MainTop").getComponent(GameApp).updateplayerinfo(); 
        }
        this.is_choosed = false;
        this.can_buy = false;
    }

    normal() {
        this.node.getChildByName("bg").getComponent(Sprite).grayscale = false;
        this.node.getChildByName("times").getComponent(Label).color = new Color("#ffffff");
        this.node.getChildByName("bottom").getComponent(Sprite).grayscale = false;
        if(this.info.type == 3)
        {
            this.node.getChildByName("bottom").getChildByName("Label").getComponent(Label).string = `${this.info.price}元`;
        }
        else
        {
            this.node.getChildByName("bottom").getChildByName("Label").getComponent(Label).string = `${this.info.price}`;
        }
        // this.node.getChildByName("bottom").getChildByName("Label").getComponent(Label).color = new Color("#3c2d19");

        const items_1 = this.node.getChildByName("items_1");
        const items_2 = this.node.getChildByName("items_2");

        if(this.info.good_id_2 == 0) {
            items_1.getChildByName("bg").getComponent(Sprite).grayscale = false;
            items_1.getChildByName("icon").getComponent(Sprite).grayscale = false;
        } else {
            items_2.getChildByName("item_1").getChildByName("bg").getComponent(Sprite).grayscale = false;
            items_2.getChildByName("item_2").getChildByName("bg").getComponent(Sprite).grayscale = false;
            items_2.getChildByName("item_1").getChildByName("icon").getComponent(Sprite).grayscale = false;
            items_2.getChildByName("item_2").getChildByName("icon").getComponent(Sprite).grayscale = false;
        }
    }

    sold_out() {
        this.node.getChildByName("bg").getComponent(Sprite).grayscale = true;
        this.node.getChildByName("times").getComponent(Label).color = new Color("#d04c42");
        this.node.getChildByName("bottom").getComponent(Sprite).grayscale = true;
        this.node.getChildByName("bottom").getChildByName("Label").getComponent(Label).string = `已售罄`;
        this.cost_icon.active = false;
        //去掉图标的居中
        this.cost_number.setPosition(new Vec3(0,3.774,0));
        this.cost_number.getComponent(Label).horizontalAlign = Label.HorizontalAlign.CENTER; 
        // this.node.getChildByName("bottom").getChildByName("Label").getComponent(Label).color = new Color("#d04c42");
        // this.node.getChildByName("name").getComponent(Label).color = new Color("#3c2d19");

        const items_1 = this.node.getChildByName("items_1");
        const items_2 = this.node.getChildByName("items_2");

        if(this.info.good_id_2 == 0) {
            items_1.getChildByName("bg").getComponent(Sprite).grayscale = true;
            items_1.getChildByName("icon").getComponent(Sprite).grayscale = true;
        } else {
            items_2.getChildByName("item_1").getChildByName("bg").getComponent(Sprite).grayscale = true;
            items_2.getChildByName("item_2").getChildByName("bg").getComponent(Sprite).grayscale = true;
            items_2.getChildByName("item_1").getChildByName("icon").getComponent(Sprite).grayscale = true;
            items_2.getChildByName("item_2").getChildByName("icon").getComponent(Sprite).grayscale = true;
        }
    }
    cancelChose() {
        this.is_choosed = false;
    }
}
