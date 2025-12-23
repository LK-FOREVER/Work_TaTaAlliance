import { _decorator, Component, Label, Node, NodeEventType, find, Prefab, resources, SpriteFrame, Sprite, error, instantiate, Color, color, } from 'cc';
import { furnitureBuyController } from "../Furniture/furnitureBuyController"
import { guideManager } from "../../Managers/guideManager"
import { GameData } from '../../Common/GameData';
import { LoadUtils } from '../../Common/LoadUtils';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { buildUpgradeController } from "./buildUpgradeController"
const { ccclass, property } = _decorator;

@ccclass('furnitureItemController')
export class furnitureItemController extends Component {
    @property(Prefab)
    furniture_buy: Prefab = null
    item_title: Node = null
    furniture: Node = null
    build_status: Node = null
    item_buy_status: Node = null
    furnitureInfo = null
    // 建筑的状态，未解锁0，已升级解锁1，正在使用2
    buildStatus = 0
    start() {
        this.item_title = this.node.getChildByName("item_title")
        this.furniture = this.node.getChildByName("furniture")
        this.build_status = this.node.getChildByName("build_status")
        this.item_buy_status = this.node.getChildByName("item_buy_status")

        this.updateUI()

        this.item_title.getComponent(Label).string = this.furnitureInfo.build_lv_name
        this.node.on(NodeEventType.TOUCH_END, (event) => {
            const canvas = find('Canvas')
            const build_upgrade_view = canvas.getChildByName("build_upgrade_view")
            build_upgrade_view.active = true
            build_upgrade_view.getComponent(buildUpgradeController).init(this.furnitureInfo, this.buildStatus)
        })

        // 动态加载图片
        let itemName = this.furnitureInfo.build_id + "0" + this.furnitureInfo.build_lv;
        this.furniture.getComponent(Sprite).spriteFrame = LoadUtils.Instance.main_build.find((item) => item.name === itemName);
        // if(itemName == "103"){
        //     this.furniture.setScale(0.4,0.4)
        // }else if(itemName == "104"){
        //     this.furniture.setScale(0.3,0.3) 
        // }else if(itemName == "201" || itemName == "202" || itemName == "203" || itemName == "204"){
        //     this.furniture.setScale(0.4,0.4) 
        // }else if(itemName == "301" || itemName == "302" || itemName == "303" || itemName == "304"){
        //     this.furniture.setScale(0.25,0.25) 
        // }else 
        if (itemName == "401" || itemName == "402" || itemName == "403" || itemName == "404") {
            this.furniture.setScale(0.2, 0.4)
        } else {
            this.furniture.setScale(0.4, 0.4)
        }
    }

    updateUI() {
        let isHasFurniture = false
        // 判断是否拥有此建筑和是否使用
        // 遍历拥有建筑的列表
        for (const key in GameData.userData.buildLvList) {
            if (key == this.furnitureInfo.build_id) {
                GameData.userData.buildLvList[key].forEach(item => {
                    if (item === this.furnitureInfo.build_lv) {
                        // this.item_buy_status.active = true
                        // this.build_status.active = false
                        this.build_status.getChildByName("build_status_text").getComponent(Label).string = "已解锁"
                        this.build_status.getChildByName("arrow_icon").active = false
                        // this.item_buy_status.getComponent(Label).string = "已拥有"
                        // this.item_buy_status.getComponent(Label).color = new Color("#959BA6")
                        this.buildStatus = 1
                        isHasFurniture = true
                        // 遍历使用建筑的列表
                        GameData.userData.buildList.forEach(value => {
                            if (this.furnitureInfo.build_id === value.buildId) {
                                if (this.furnitureInfo.build_lv === value.build_lv) {
                                    // this.item_buy_status.getComponent(Label).string = "正在使用"
                                    // this.item_buy_status.getComponent(Label).color = new Color("#84c03f")
                                    this.build_status.getChildByName("build_status_text").getComponent(Label).string = "当前建筑"
                                    this.buildStatus = 2
                                }
                            }
                        });
                    }
                });
            }
        }
        if (GameData.userData.career >= this.furnitureInfo.condition_career && GameData.userData.hasGoodsList[1] >= Number(this.furnitureInfo.upgrade_cost_1) && GameData.userData.hasGoodsList[2] >= Number(this.furnitureInfo.upgrade_cost_2) && !isHasFurniture) {
            this.node.getChildByName("common_red_dot").active = true
            this.build_status.getChildByName("build_status_text").getComponent(Label).string = "可升级"
            this.build_status.getChildByName("arrow_icon").active = true
            this.build_status.getChildByName("build_status_text").getComponent(Label).color = new Color("#36791B")
        } else {
            this.node.getChildByName("common_red_dot").active = false
            this.build_status.getChildByName("arrow_icon").active = false
            if (!isHasFurniture) {
                this.build_status.getChildByName("build_status_text").getComponent(Label).string = "未解锁"
                this.build_status.getChildByName("build_status_text").getComponent(Label).color = new Color("#bc8252")

            } else {
                this.build_status.getChildByName("build_status_text").getComponent(Label).string = "已解锁"
                this.build_status.getChildByName("build_status_text").getComponent(Label).color = new Color("#bc8252")
                // 遍历使用建筑的列表
                GameData.userData.buildList.forEach(value => {
                    if (this.furnitureInfo.build_id === value.buildId) {
                        if (this.furnitureInfo.build_lv === value.build_lv) {
                            // this.item_buy_status.getComponent(Label).string = "正在使用"
                            // this.item_buy_status.getComponent(Label).color = new Color("#84c03f")
                            this.build_status.getChildByName("build_status_text").getComponent(Label).string = "当前建筑"
                            this.build_status.getChildByName("build_status_text").getComponent(Label).color = new Color("#644737")
                            this.buildStatus = 2
                        }
                    }
                });
            }
        }
        find("Canvas").getComponent(MainUIControllers).updateRedDot()

        // if (!isHasFurniture) {
        //     // this.item_buy_status.active = false
        //     // this.build_status.active = true
        //     this.build_status.getChildByName("build_status_text").getComponent(Label).string = "未解锁"
        //     this.build_status.getChildByName("arrow_icon").active = false
        //     GameData.userData.hasGoodsList[1] < this.furnitureInfo.upgrade_cost_1 ?
        //         this.build_status.getChildByName("price_text").getComponent(Label).color = color("#D04C42") :
        //         this.build_status.getChildByName("price_text").getComponent(Label).color = color("#ffffff")
        // }
    }
}
