import { _decorator, Component, Label, Node, NodeEventType, resources, error, Sprite, SpriteFrame, Color, Button, find } from 'cc';
import { GameData } from '../../Common/GameData';
import { MessageManager } from '../../Managers/MessageManager';
import { MainFurnitureManager } from '../../Managers/MainFurnitureManager';
import { furnitureItemController } from './furnitureItemController';
import { guideManager } from "../../Managers/guideManager"
import { GameApp } from '../../GameApp';
import { LoadUtils } from '../../Common/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('furnitureBuyController')
export class furnitureBuyController extends Component {
    introduce_text: Node = null
    condition_item1: Node = null
    condition_item2: Node = null
    effect_item1: Node = null
    effect_item2: Node = null
    buy_price: Node = null
    furniture_buy_btn: Node = null
    close_btn_buy: Node = null
    furniture_body = null
    furnitureBuyInfo = null
    conditionArray = null
    effectArray = null
    // 建筑的状态，未解锁0，已升级解锁1，正在使用2
    buildStatus = 0
    start() {
        this.furniture_body = this.node.getChildByName("furniture_body")
        this.close_btn_buy = this.node.getChildByName("close_btn_buy")
        this.furniture_buy_btn = this.node.getChildByName("furniture_buy_btn")
        this.buy_price = this.node.getChildByName("buy_price")
        this.buy_price.getChildByName("buy_text").getComponent(Label).string = this.furnitureBuyInfo.upgrade_cost_1
        GameData.userData.hasGoodsList[1] < this.furnitureBuyInfo.upgrade_cost_1 ?
            this.buy_price.getChildByName("buy_text").getComponent(Label).color = new Color("#d04c42") :
            this.buy_price.getChildByName("buy_text").getComponent(Label).color = new Color("#ffffff")
        this.introduce_text = this.node.getChildByName("introduce_text").getComponent(Label).string = this.furnitureBuyInfo.introduce


        // 按钮点击
        this.furniture_buy_btn.on(Button.EventType.CLICK, () => {
            let Canvas = find("Canvas")
            if (this.buildStatus === 1) {
                GameData.userData.buildList.forEach((item) => {
                    if (item.buildId == this.furnitureBuyInfo.build_id) {
                        item.build_lv = this.furnitureBuyInfo.build_lv
                    }
                })
                // 更新主页面家具
                Canvas.getComponent(MainFurnitureManager).updateFurniture()
                // 更新家具列表
                let furnitureTypeBoxList = this.node.parent.getChildByName("furniture_box").getChildByName("view").getChildByName("content").children
                furnitureTypeBoxList.forEach((typeBoxItem) => {
                    let typeBoxList = typeBoxItem.getChildByName("furniture_type_scroll").getChildByName("view").getChildByName("content").children
                    typeBoxList.forEach((item) => {
                        item.getComponent(furnitureItemController).updateUI()
                    })
                })
                this.node.destroy()
                return
            }
            if (this.buildStatus === 2) {
                //Canvas.getComponent(MessageManager).openMessage("使用中")
                return
            }
            if (!this.condition_item1.getChildByName("condition_ok").active) {
                //Canvas.getComponent(MessageManager).openMessage("未达到购买条件")
                return
            }
            console.log('Number(this.furnitureBuyInfo.upgrade_cost_1)', Number(this.furnitureBuyInfo.upgrade_cost_1))
            console.log('GameData.userData.money', GameData.userData.hasGoodsList[1])
            if (GameData.userData.hasGoodsList[1] < Number(this.furnitureBuyInfo.upgrade_cost_1)) {
                //Canvas.getComponent(MessageManager).openMessage("资金不足")
                return
            }

            // 购买
            // 消耗资源
            GameData.userData.hasGoodsList[1] -= Number(this.furnitureBuyInfo.upgrade_cost_1)

            // 家具的加成
            this.furnitureBuyInfo.effect_data.forEach(item => {
                for (const key in GameData.userData.furniture_add) {
                    if (key === item.k) GameData.userData.furniture_add[key] += item.v
                }
                // if (item.k === "atk") {
                //     // 为拥有的每个员工增加攻击
                //     GameData.userData.towerlist.forEach((towerItem) => {
                //         towerItem.atk += item.v
                //     })
                // } else 
                // if (item.k === "inviteTodayNum") {
                //     // 每日免费招聘次数增加时也要增加一次当日剩余员工数
                //     GameData.userData.inviteTodayNum += item.v
                //     GameData.userData.inviteTodayLastNum += item.v
                // } else {
                //     GameData.userData[item.k] += item.v
                // }
            });

            // 更新显示
            let MainTop = find("Canvas").getChildByName("MainTop");
            MainTop.getComponent(GameApp).updateplayerinfo()
            // 添加物品
            for (const key in GameData.userData.buildLvList) {
                if (key == this.furnitureBuyInfo.build_id) {
                    GameData.userData.buildLvList[key].push(Number(this.furnitureBuyInfo.build_lv))
                }
            }
            // 购买后立即使用家具
            GameData.userData.buildList.forEach((item) => {
                if (item.buildId == this.furnitureBuyInfo.build_id) {
                    item.build_lv = this.furnitureBuyInfo.build_lv
                }
            })
            // 更新主页面家具
            Canvas.getComponent(MainFurnitureManager).updateFurniture()

            // 更新家具列表
            let furnitureTypeBoxList = this.node.parent.getChildByName("furniture_box").getChildByName("view").getChildByName("content").children
            furnitureTypeBoxList.forEach((typeBoxItem) => {
                let typeBoxList = typeBoxItem.getChildByName("furniture_type_scroll").getChildByName("view").getChildByName("content").children
                typeBoxList.forEach((item) => {
                    item.getComponent(furnitureItemController).updateUI()
                })
            })

            this.node.destroy()
            // console.log('GameData.userData.furniture_add', GameData.userData.furniture_add)
            Canvas.getComponent(guideManager).guideNext()
        });

        // 购买按钮状态
        let furniture_buy_btn_name = "common_button_green"
        if (this.buildStatus === 0) {
            furniture_buy_btn_name = "common_button_green"
            this.furniture_buy_btn.getChildByName("Label").getComponent(Label).string = 'Purchase'
            this.furniture_buy_btn.getChildByName("Label").getComponent(Label).color = GameData.userData.hasGoodsList[1] >= Number(this.furnitureBuyInfo.upgrade_cost_1)
                                                                                    ? new Color("#ffffff") : new Color("#d04c42");
            this.buy_price.active = true
        } else if (this.buildStatus === 1) {
            furniture_buy_btn_name = "common_button_green"
            this.furniture_buy_btn.getChildByName("Label").getComponent(Label).string = 'Occupy'
            this.buy_price.active = false
        } else if (this.buildStatus === 2) {
            furniture_buy_btn_name = "common_button_gray"
            this.furniture_buy_btn.getChildByName("Label").getComponent(Label).string = 'Occupied'
            this.buy_price.active = false
        }

        resources.load(`textures/common/${furniture_buy_btn_name}/spriteFrame`, SpriteFrame, (err, sp) => {
            if (err) {
                error(err.message || err);
                return;
            }
            this.furniture_buy_btn.getComponent(Sprite).spriteFrame = sp
        })

        // 购买条件
        this.conditionArray = this.furnitureBuyInfo.build_buy_condition.split(',')
        this.condition_item1 = this.node.getChildByName("condition").getChildByName("condition_item1")
        //this.condition_item2 = this.node.getChildByName("condition").getChildByName("condition_item2")
        this.condition_item1.getChildByName("item_text").getComponent(Label).string = this.conditionArray[0]
        //this.condition_item2.getChildByName("item_text").getComponent(Label).string = this.conditionArray[1]
        this.condition_item1.getChildByName("condition_ok").active = false
        //this.condition_item2.getChildByName("condition_ok").active = false

        // 家具效果
        this.effectArray = this.furnitureBuyInfo.build_effect.split(',')
        this.effect_item1 = this.node.getChildByName("effect").getChildByName("effect_item1")
        this.effect_item2 = this.node.getChildByName("effect").getChildByName("effect_item2")
        this.effect_item1.getChildByName("item_text").getComponent(Label).string = this.effectArray[0]
        this.effect_item2.getChildByName("item_text").getComponent(Label).string = this.effectArray[1]

        this.close_btn_buy.on(NodeEventType.TOUCH_END, () => this.node.active = false)

        let build_id = 0
        if (this.furnitureBuyInfo.build_id == 1) build_id = 1
        else if (this.furnitureBuyInfo.build_id == 2 ||
            this.furnitureBuyInfo.build_id == 3 ||
            this.furnitureBuyInfo.build_id == 4 ||
            this.furnitureBuyInfo.build_id == 5 ||
            this.furnitureBuyInfo.build_id == 6 ||
            this.furnitureBuyInfo.build_id == 7) build_id = 2
        else if (this.furnitureBuyInfo.build_id == 8) build_id = 3
        else if (this.furnitureBuyInfo.build_id == 9) build_id = 4
        else if (this.furnitureBuyInfo.build_id == 10) build_id = 5
        else if (this.furnitureBuyInfo.build_id == 11) build_id = 6
        else if (this.furnitureBuyInfo.build_id == 12) build_id = 7

        // 动态加载图片
        let Img = LoadUtils.Instance.furniture_icon.getSpriteFrame(build_id+"0"+this.furnitureBuyInfo.build_lv);
        this.furniture_body.getComponent(Sprite).spriteFrame = Img

        // 判断是否达到购买条件
        // 职位
        if ( GameData.userData.career >= this.furnitureBuyInfo.condition_career && GameData.userData.hasGoodsList[1] >= Number(this.furnitureBuyInfo.upgrade_cost_1) && this.buildStatus == 0) {
            this.furniture_buy_btn.getChildByName("common_red_dot").active = true
        } else {
            this.furniture_buy_btn.getChildByName("common_red_dot").active = false
        }
        GameData.userData.career >= this.furnitureBuyInfo.condition_career
            ? (() => {
                this.condition_item1.getChildByName("condition_ok").active = true
                this.condition_item1.getChildByName("item_text").getComponent(Label).color = new Color("#84c03f")
            })() : this.condition_item1.getChildByName("item_text").getComponent(Label).color = new Color("#a6a6a6")
        // // 业绩
        // GameData.userData.performance_value >= this.furnitureBuyInfo.condition_performance
        //     ? (() => {
        //         this.condition_item2.getChildByName("condition_ok").active = true
        //         this.condition_item2.getChildByName("item_text").getComponent(Label).color = new Color("#84c03f")
        //     })() : this.condition_item2.getChildByName("item_text").getComponent(Label).color = new Color("#a6a6a6")
    }
}
