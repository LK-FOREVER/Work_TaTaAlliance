import { _decorator, Component, Node, resources, SpriteFrame, Sprite, error, sp, v3 } from 'cc';
import { GameData } from '../Common/GameData';
import { LoadUtils } from '../Common/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('MainFurnitureManager')
export class MainFurnitureManager extends Component {
    layout_bg: Node = null

    start() {
        // this.layout_bg = this.node.getChildByName("layout_bg")
        // this.updateFurniture()
        // this.updateNPC()
    }

    updateNPC() {
        // 拿到6个工位
        const stationList = []
        stationList.push(this.layout_bg.getChildByName("furniture_2"))
        stationList.push(this.layout_bg.getChildByName("furniture_3"))
        stationList.push(this.layout_bg.getChildByName("furniture_4"))
        stationList.push(this.layout_bg.getChildByName("furniture_5"))
        stationList.push(this.layout_bg.getChildByName("furniture_6"))
        stationList.push(this.layout_bg.getChildByName("furniture_7"))
        // console.log('GameData.battleData.TowerObj', GameData.battleData.TowerObj)
        stationList.forEach((item: Node, index) => {
            GameData.battleData.TowerObj.forEach((TowerObjItem, TowerIndex) => {
                if (TowerObjItem !== null && TowerObjItem !== undefined) {
                    if (index === TowerObjItem.build_id) {
                        // console.log('TowerObjItem', TowerObjItem, TowerObjItem.build_id)
                        item.getChildByName("npc").active = true
                        if (TowerObjItem.id === 1009) {
                            item.getChildByName("npc").setPosition(v3(-15, 43, 0))
                        } else if (TowerObjItem.id === 1007) {
                            item.getChildByName("npc").setPosition(v3(-15, 58, 0))
                        } else if (TowerObjItem.id === 1003) {
                            item.getChildByName("npc").setPosition(v3(-15, 75, 0))
                        } else {
                            item.getChildByName("npc").setPosition(v3(-15, 60, 0))
                        }
                        let npc = item.getChildByName("npc");
                        // //动态更换骨骼资源
                        LoadUtils.Instance.changeNpcBones(TowerObjItem.id,npc);
                    }
                }
            })
        })

    }

    updateFurniture() {
        this.layout_bg.children.forEach((furnitureItem) => {
            let furnitureItemName = furnitureItem.name
            GameData.userData.buildList.forEach(value => {
                // 加载家具图片
                if (`furniture_${value.buildId}` === furnitureItemName && value.build_lv !== 0) {
                    furnitureItem.active = true

                    let build_id = 0
                    if (value.buildId == 1) build_id = 1
                    else if (value.buildId == 2 ||
                        value.buildId == 3 ||
                        value.buildId == 4 ||
                        value.buildId == 5 ||
                        value.buildId == 6 ||
                        value.buildId == 7) build_id = 2
                    else if (value.buildId == 8) build_id = 3
                    else if (value.buildId == 9) build_id = 4
                    else if (value.buildId == 10) build_id = 5
                    else if (value.buildId == 11) build_id = 6
                    else if (value.buildId == 12) build_id = 7

                    // 判断此id是不是在主页面出现多个家具的id
                    if (value.buildId === 10) {
                        furnitureItem.children.forEach((item) => {
                      //      console.log('item', item)
                            let Img = LoadUtils.Instance.main_furniture.getSpriteFrame(build_id+"0"+value.build_lv);
                            item.getChildByName("furniture_content").getComponent(Sprite).spriteFrame = Img
                        })
                    } else {
                        // 判断饮水机的id来动态显示阴影
                        if (build_id === 3) {
                            if (value.build_lv <= 3) {
                                let Img = LoadUtils.Instance.main_furniture.getSpriteFrame("shadow_" + build_id + "_1");
                                furnitureItem.getComponent(Sprite).spriteFrame =  Img
                            } else {
                                let Img = LoadUtils.Instance.main_furniture.getSpriteFrame("shadow_" + build_id + "_2");
                                furnitureItem.getComponent(Sprite).spriteFrame =  Img
                            }
                        }
                        if (build_id == 2) {
                            if (value.build_lv === 1) {
                                furnitureItem.getChildByName("furniture_content").setPosition(v3(-7, 95, 0))
                            } else {
                                furnitureItem.getChildByName("furniture_content").setPosition(v3(-7, 80, 0))
                            }
                            // 靠背
                            if (value.build_lv === 5 || value.build_lv === 6) {
                                furnitureItem.getChildByName("furniture_back").active = true
                                    if (value.build_lv === 5){
                                        furnitureItem.getChildByName("furniture_back").setPosition(v3(-10, 35, 0))
                                    }else{
                                        furnitureItem.getChildByName("furniture_back").setPosition(v3(-11, 31, 0))
                                    }
                                // })
                            } else {
                                furnitureItem.getChildByName("furniture_back").active = false
                            }
                        }
                        let Img = LoadUtils.Instance.main_furniture.getSpriteFrame(build_id + "0" + value.build_lv);
                        furnitureItem.getChildByName("furniture_content").getComponent(Sprite).spriteFrame =  Img
                    }
                }
            });
        })
    }

    update(deltaTime: number) {

    }
}


