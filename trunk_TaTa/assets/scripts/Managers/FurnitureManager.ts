import { _decorator, Component, Node, resources, error, JsonAsset, instantiate, Prefab, Label, NodeEventType, ScrollView, Vec2, find } from 'cc';
import { GameData } from "../Common/GameData";
import { furnitureItemController } from "../Controllers/Furniture/furnitureItemController";
import { guideManager } from "./guideManager"
const { ccclass, property } = _decorator;

@ccclass('FumitureManager')
export class FurnitureManager extends Component {
    @property(Node)
    furniture_content: Node = null
    @property(Node)
    desc_box: Node = null
    @property(Prefab)
    furniture_type_box: Prefab = null
    @property(Prefab)
    furniture_item: Prefab = null
    furniture_buy: Node = null
    furniture_box: Node = null
    furniture_close: Node = null
    close_btn_furniture: Node = null
    close_btn_buy: Node = null
    furniture_desc: Node = null
    start() {
        const Canvas = find("Canvas")
        this.furniture_box = this.node.getChildByName("furniture_box")
        this.furniture_desc = this.furniture_box.getChildByName("furniture_desc")
        this.furniture_close = this.furniture_box.getChildByName("furniture_close")
        this.furniture_close.on(NodeEventType.TOUCH_END, () => {
            this.furniture_box.active = false
            // Canvas.getComponent(guideManager).guideNext(0)
        })
        // this.furniture_box.active = false
        // this.node.getChildByName("furniture_box").getComponent(ScrollView).vertical = false

        // this.furniture_desc.on(NodeEventType.TOUCH_END, () => {
        //     // 获取家具的数据
        //     this.desc_box.getChildByName("mask").getChildByName("desc_bg").children.forEach((item) => {
        //         for (const key in GameData.userData.furniture_add) {
        //             if (key == item.name) {
        //                 key !== "orangeStaff" ?
        //                     item.getChildByName("value").getComponent(Label).string = `+${GameData.userData.furniture_add[key]}` :
        //                     item.getChildByName("value").getComponent(Label).string = `+${GameData.userData.furniture_add[key] * 100}%`
        //             }
        //         }
        //     })
        //     this.desc_box.active = !this.desc_box.activeInHierarchy
        // })

        resources.load('data/furniture__get_furniture_info', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData: object = res.json!;
            for (const key1 in jsonData) {
                // 实例化预制体 instantiate
                let furniture_type_box = instantiate(this.furniture_type_box)
                // 设置其父节点
                furniture_type_box.setParent(this.furniture_content)
                for (const key in jsonData[key1]) {
                    furniture_type_box.name = key

                    let furniture_type_title = furniture_type_box.getChildByName("furniture_type_title").getChildByName("title_text").getComponent(Label)
                    jsonData[key1][key].map((value) => {
                        furniture_type_title.string = value.build_name
                        // 实例化预制体 instantiate
                        let furniture_item = instantiate(this.furniture_item)
                        furniture_item.name = value.build_lv_english_name
                        // 设置其父节点
                        furniture_item.setParent(furniture_type_box.getChildByName("furniture_type_scroll").getChildByName("view").getChildByName("content"))
                        furniture_item.getComponent(furnitureItemController).furnitureInfo = value
                    })
                }
            }
        })
    }

    scrollChange(event) {
        if (!GameData.userData.guideSwitch) return
        if (GameData.userData.guideSuspend) return
        if (GameData.userData.guideListId <= 35){
            const epsilon = 1; // 用于确定精度
            if (Math.abs(event.getScrollOffset().y - 500) < epsilon ||
                Math.abs(event.getScrollOffset().y - 965) < epsilon ||
                Math.abs(event.getScrollOffset().y - 1450) < epsilon ||
                Math.abs(event.getScrollOffset().y - 4564) < epsilon
            ) {
           //     console.log("isGuide")
                // 关闭垂直滚动
                event.vertical = false
                // 关闭水平滚动
                this.node.getChildByName("furniture_box").getChildByName("view").getChildByName("content").children.forEach((item) => {
                    item.getChildByName("furniture_type_scroll").getComponent(ScrollView).horizontal = false
                })
            }
        }
    }

    scrollFurniture(positionY: number) {
    //    console.log('positionY', positionY)
        // 开启垂直滚动
        this.node.getChildByName("furniture_box").getComponent(ScrollView).vertical = true
        // 开启水平滚动
        this.node.getChildByName("furniture_box").getChildByName("view").getChildByName("content").children.forEach((item) => {
            item.getChildByName("furniture_type_scroll").getComponent(ScrollView).horizontal = true
        })

        const scrollview = this.node.getChildByName("furniture_box").getComponent(ScrollView)
        scrollview.scrollToOffset(new Vec2(0, positionY));
        // 关闭垂直滚动
        this.node.getChildByName("furniture_box").getComponent(ScrollView).vertical = false
        // 关闭水平滚动
        this.node.getChildByName("furniture_box").getChildByName("view").getChildByName("content").children.forEach((item) => {
            item.getChildByName("furniture_type_scroll").getComponent(ScrollView).horizontal = false
        })
    }
    onDisable(){
        // 开启垂直滚动
        this.node.getChildByName("furniture_box").getComponent(ScrollView).vertical = true
        // 开启水平滚动
        this.node.getChildByName("furniture_box").getChildByName("view").getChildByName("content").children.forEach((item) => {
            item.getChildByName("furniture_type_scroll").getComponent(ScrollView).horizontal = true
        })
    }
}


