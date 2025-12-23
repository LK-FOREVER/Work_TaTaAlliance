import { _decorator, Component, Node, Event, Button, Prefab, instantiate, Toggle, Label, sys, native } from 'cc';
import { TextUtils } from '../../Common/TextUtils';
import { MoneyItemController } from './MoneyItemController';
import { AdItemController } from './AdItemController';
import { GoldItemController } from './GoldItemController';
import { GiftItemController } from './GiftItemController';
import { GameData } from '../../Common/GameData';
import { ShowGoods } from '../../Common/ShowGoods';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { MainUIControllers } from '../MainUI/MainUIControllers';
const { ccclass, property } = _decorator;

@ccclass('ShopController')
export class ShopController extends Component {
    @property(Prefab)
    shop_ad_item:Prefab = null

    @property(Prefab)
    shop_gold_item:Prefab = null

    @property(Prefab)
    shop_money_item:Prefab = null

    @property(Prefab)
    shop_daily_gift_item:Prefab = null

    @property(Prefab)
    shop_weekly_gift_item:Prefab = null

    @property(Prefab)
    shop_monthly_gift_item:Prefab = null

    page_1:Node = null;
    page_2:Node = null;
    page_3:Node = null;
    page_4:Node = null;

    currency:Label
    gold:Label

    tip: Node = null;
    tips:any = null;

    cur_idx:number = 0
    is_call_back:boolean = true;

    limit_tips_day:Node = null;
    limit_tips_month:Node = null;

    onLoad(): void {
        this.initUI();
        // EventManager.Instance.on(EventConst.PURCHASE,this.purchaseCallback,this)
        EventManager.Instance.on(EventConst.UPDATE_SHOP,this.updateAsset,this);
        EventManager.Instance.on(EventConst.DAY_SHOP_LIMIT,this.Show_Day_Limit,this);
        EventManager.Instance.on(EventConst.MONTH_SHOP_LIMIT,this.Show_Month_Limit,this);
    }

    onDestroy(): void {
        // EventManager.Instance.on(EventConst.PURCHASE,this.purchaseCallback,this)
        EventManager.Instance.off(EventConst.UPDATE_SHOP,this.updateAsset,this);
        EventManager.Instance.off(EventConst.DAY_SHOP_LIMIT,this.Show_Day_Limit,this);
        EventManager.Instance.off(EventConst.MONTH_SHOP_LIMIT,this.Show_Month_Limit,this);
    }

    initUI() {
        const page_container = this.node.getChildByName("page_container");
        this.limit_tips_day = this.node.getChildByName("limit_tips_day");
        this.limit_tips_month = this.node.getChildByName("limit_tips_month");
        this.limit_tips_day.active = false;
        this.limit_tips_month.active = false;

        let day_close_btn = this.limit_tips_day.getChildByName("close_btn");
        day_close_btn.on(Node.EventType.TOUCH_END,()=>{
            this.limit_tips_day.active = false;
        },this);
        let month_close_btn = this.limit_tips_month.getChildByName("close_btn");
        month_close_btn.on(Node.EventType.TOUCH_END,()=>{
            this.limit_tips_month.active = false;
        },this);

        this.page_1 = page_container.getChildByName("page_1");
        this.page_2 = page_container.getChildByName("page_2");
        this.page_3 = page_container.getChildByName("page_3");
        this.page_4 = page_container.getChildByName("page_4");

        // this.initPage1();
        // this.initPage2();
        this.initPage3();
        // this.initPage4();

        const close_btn = this.node.getChildByName("bottom").getChildByName("close_btn");
        close_btn.on(Button.EventType.CLICK,this.close,this);

        this.currency = this.node.getChildByName("shop_top").getChildByName("assets_list").getChildByName("assets_1").getChildByName("num").getComponent(Label)
        this.gold = this.node.getChildByName("shop_top").getChildByName("assets_list").getChildByName("assets_4").getChildByName("num").getComponent(Label)
        this.updateAsset()

        this.tip = this.node.getChildByName("tip_box");
        const tip_confirm = this.tip.getChildByName("container").getChildByName("confirm");
        const tip_cancel = this.tip.getChildByName("container").getChildByName("cancel");
        tip_confirm.on(Button.EventType.CLICK,this.confirm,this);
        tip_cancel.on(Button.EventType.CLICK,this.cancel,this);

        this.tips = this.node.getChildByName("tips");
        const tips_confirm = this.tips.getChildByName("container").getChildByName("confirm");
        tips_confirm.on(Button.EventType.CLICK,this.tips_confirm,this);
    }

    initPage1() {
        for(let i = 0; i < TextUtils.Instance.shop__get_ad_good_info.length; i++) {
            const item = instantiate(this.shop_ad_item);
            item.getComponent(AdItemController).init(TextUtils.Instance.shop__get_ad_good_info[i])
            item.setParent(this.page_1.getChildByName("ad_container").getChildByName("shop_bg"))
        }

        for(let i = 0; i < TextUtils.Instance.shop__get_gold_good_info.length; i++) {
            const item = instantiate(this.shop_gold_item);
            item.getComponent(GoldItemController).init(TextUtils.Instance.shop__get_gold_good_info[i])
            item.setParent(this.page_1.getChildByName("gold_container").getChildByName("shop_bg").getChildByName("view").getChildByName("content"))
        }
    }

    initPage2() {
        const monthly_plan_1 = this.page_2.getChildByName("monthly_plan_1")
        const pay_1 = monthly_plan_1.getChildByName("pay")
        pay_1.on(Button.EventType.CLICK,this.buy_monthly_plan_1,this)
        const tip_1 = monthly_plan_1.getChildByName("tip")
        if(GameData.userData.has_monthly_plan_1) {
            pay_1.active = false
            tip_1.active = true
            tip_1.getComponent(Label).string = `Remaining Days:${30 - GameData.userData.monthly_plan_1_day}`
        } else {
            pay_1.active = true
            tip_1.active = false
        }

        const monthly_plan_2 = this.page_2.getChildByName("monthly_plan_2")
        const pay_2 = monthly_plan_2.getChildByName("pay")
        pay_2.on(Button.EventType.CLICK,this.buy_monthly_plan_2,this)
        const tip_2 = monthly_plan_2.getChildByName("tip")
        if(GameData.userData.has_monthly_plan_2) {
            pay_2.active = false
            tip_2.active = true
            tip_2.getComponent(Label).string = `Remaining Days:${30 - GameData.userData.monthly_plan_2_day}`
        } else {
            pay_2.active = true
            tip_2.active = false
        }
    }

    initPage3() {
        const content = this.page_3.getChildByName("ScrollView").getChildByName("view").getChildByName("content")
        for(let[key,value] of TextUtils.Instance.shop__get_gift_info) {
            if(key == 1) {
                for(let i = 0; i < value.length; i++) {
                    const item = instantiate(this.shop_daily_gift_item);
                    item.getComponent(GiftItemController).init(value[i],i);
                    item.setParent(content.getChildByName("daily_container").getChildByName("shop_bg").getChildByName("shop_view").getChildByName("shop_content"));
                }
            } else if (key == 2) {
                for(let i = 0; i < value.length; i++) {
                    const item = instantiate(this.shop_weekly_gift_item);
                    item.getComponent(GiftItemController).init(value[i],i);
                    item.setParent(content.getChildByName("weekly_container").getChildByName("shop_bg").getChildByName("shop_view").getChildByName("shop_content"));
                }
            } else if (key == 3) {
                for(let i = 0; i < value.length; i++) {
                    const item = instantiate(this.shop_monthly_gift_item);
                    item.getComponent(GiftItemController).init(value[i],i);
                    item.setParent(content.getChildByName("monthly_container").getChildByName("shop_bg").getChildByName("shop_view").getChildByName("shop_content"));
                }
            }
        }
    }

    initPage4() {
        for(let i = 0; i < TextUtils.Instance.shop__get_recharge_info.length; i++) {
            const item = instantiate(this.shop_money_item);
            item.getComponent(MoneyItemController).init(TextUtils.Instance.shop__get_recharge_info[i])
            item.setParent(this.page_4.getChildByName("container").getChildByName("shop_bg"))
        }
    }

    public onToggleValueChanged(toggle,idx:number) {
        if(!this.is_call_back) return
        this.checkPageByIdx(idx);
	}

    checkPage(event:Event) {
        const target: Node = event.target;
        this.checkPageByIdx(target.getSiblingIndex());
    }

    checkPageByIdx(idx:number,is_call_back:boolean = true) {
        this.is_call_back = is_call_back;
        this.cur_idx = idx;
        if(!this.is_call_back){
            this.node.getChildByName("toggle_container").children.forEach(element=>{
                element.getComponent(Toggle).isChecked = element.getSiblingIndex() == idx
            });
        }
        this.node.getChildByName("page_container").children.forEach(element => {
            const child_index = element.getSiblingIndex()
            element.active = child_index == idx
        });
        this.is_call_back = true;
    }

    buy_monthly_plan_1() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            //native.bridge.sendToNative('purchase',`hc_mc_1`);
            this.get_monthly_plan_1();
        } else {
            this.get_monthly_plan_1();
        }
    }

    async get_monthly_plan_1() {
        GameData.userData.monthly_plan_1_date = new Date().getTime();
        GameData.userData.has_monthly_plan_1 = true;
        const reward = [{
            reward:4,
            number:6400
        }]
        GameData.userData.has_monthly_plan_1_reward = true;
        await ShowGoods.init(reward);
        //GameData.Instance.sendDataRequest();
        this.initPage2();
    }

    buy_monthly_plan_2() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            //native.bridge.sendToNative('purchase',`hc_mc_2`);
            this.get_monthly_plan_2();
        } else {
            this.get_monthly_plan_2();
        }
    }

    get_monthly_plan_2() {
        // GameData.userData.monthly_plan_2_date = new Date().getTime();
        // GameData.userData.has_monthly_plan_2 = true;
        // //GameData.Instance.sendDataRequest();
        // this.initPage2();
        // this.node.parent.getComponent(MainUIControllers).updateRedDot();
    }

    purchaseCallback(id:string) {
        if(id == `hc_mc_1`) {
            this.get_monthly_plan_1();
        } else if (id == `hc_mc_2`) {
            this.get_monthly_plan_2();
        }
    }

    close() {
        EventManager.Instance.emit(EventConst.CLOSE_SHOP);
        this.node.active = false
        GameData.saveData(false);
    }

    confirm() {
        EventManager.Instance.emit(EventConst.BUY);
        this.tip.active = false;
        GameData.saveData(false);
    }

    cancel() {
        EventManager.Instance.emit(EventConst.CHOSE_SHOP_GOOD);
        this.tip.active = false;
    }
    tips_confirm() {
        this.tips.active = false;
    }

    updateAsset() {
        this.currency.string = GameData.num2cn(GameData.userData.hasGoodsList[1]) as unknown as string;
        this.gold.string = GameData.num2cn(GameData.userData.hasGoodsList[4]) as unknown as string;
        EventManager.Instance.emit(EventConst.UPDATE_GOLD_ITEM);
    }

    Show_Day_Limit()
    {
        this.limit_tips_day.active = true;
    }

    Show_Month_Limit()
    {
        this.limit_tips_month.active = true;
    }
}
