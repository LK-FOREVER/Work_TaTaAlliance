import { _decorator, Component, Node, NodeEventType, find, Prefab, instantiate, Button } from 'cc';
import { GameData } from '../../Common/GameData';
import { guideManager } from '../../Managers/guideManager';
import { TextUtils } from '../../Common/TextUtils';
import { ShopController } from '../Shop/ShopController';
import { Promotion_Player_Manager } from '../../Managers/Promotion_Player_Manager';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { player_icon } from "../../Controllers/promotion/player_icon";
const { ccclass, property } = _decorator;

@ccclass('MainTopController')
export class MainTopController extends Component {
    main_top: Node = null
    head_icon: Node = null
    @property(Prefab)
    promotion: Prefab = null
    desc_btn: Node = null
    @property(Prefab)
    resource_box: Prefab = null

    protected onLoad(): void {
        EventManager.Instance.on(EventConst.PLAYER_ICON_CHANGE, this.change_head_icon,this);
        this.head_icon = this.node.getChildByName("head_icon");
         // 打开晋升
        this.head_icon.on(Button.EventType.CLICK, this.open_promotion,this);
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PLAYER_ICON_CHANGE, this.change_head_icon,this);
    }

    start() {
        this.head_icon = this.node.getChildByName("head_icon");
        this.desc_btn = this.node.getChildByName("desc_btn");
        this.change_head_icon();
        this.updateRedDot();
       
        
        // this.node.getChildByName("currency_bg").on(Button.EventType.CLICK,this.goShop,this);
        
        // // 打开说明
        // this.desc_btn.on(NodeEventType.TOUCH_END, (event) => {
        //     // 使用.find()方法查找具有特定name的对象
        //     const foundItem = Canvas.children.find(item => item.name === 'resource_box');
        //     if (!foundItem) {
        //         let promotion = instantiate(this.resource_box)
        //         promotion.setParent(Canvas)
        //         promotion.setPosition(0, 0)
        //     } else {
        //         foundItem.destroy()
        //     }
        // })
    }

    open_promotion() {
        const Canvas = find("Canvas")
        const foundItem = Canvas.getChildByName("promotionBox").getChildByName("promotion");
        foundItem.active = true;
        foundItem.getComponent(Promotion_Player_Manager).initUI();
    }

    change_head_icon() {
        this.head_icon.getComponent(player_icon).setIconContent(GameData.userData.head_icon + "");
    }

    updateRedDot() {
        const promotionInfoList = TextUtils.Instance.promotion__get_promotion_info;
        const nextPromotionInfo = promotionInfoList.find(item=>item.id == GameData.userData.career + 1);
        if (GameData.userData.career === promotionInfoList.length) {
            this.head_icon.getChildByName("common_red_dot").active = false;
        } else if (GameData.userData.max_chapter > nextPromotionInfo.level_progress && GameData.userData.hasGoodsList[1] >= nextPromotionInfo.position_fund && GameData.userData.hasGoodsList[2] > nextPromotionInfo.performance) {
            this.head_icon.getChildByName("common_red_dot").active = true;
        } else {
            this.head_icon.getChildByName("common_red_dot").active = false;
        }
    }

    goShop() {
        const node = find("Canvas").getChildByName("shop_view");
        node.active = true;
        node.getComponent(ShopController).checkPageByIdx(3,false);
    }
}
