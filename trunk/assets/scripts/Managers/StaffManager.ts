import { _decorator, Component, Node, Prefab, resources, JsonAsset, error, instantiate, NodeEventType, find, ScrollView } from 'cc';
import { staffItemController } from "../Controllers/Staff/staffItemController"
import { GameData } from '../Common/GameData';
import { guideManager } from "./guideManager"
const { ccclass, property } = _decorator;

@ccclass('StaffManager')
export class StaffManager extends Component {
    @property(Node)
    staff_content: Node = null
    @property(Prefab)
    staff_item: Prefab = null
    staff_box: Node = null
    staff_close: Node = null
    start() {
        this.staff_box = this.node.getChildByName("staff_box")
        this.staff_close = this.staff_box.getChildByName("staff_close")
        this.staff_box.getComponent(ScrollView).vertical = true
        this.closeScroll()
        this.staff_close.on(NodeEventType.TOUCH_END, () => {
            this.node.destroy()
            const Canvas = find("Canvas")
            Canvas.getComponent(guideManager).guideNext()
        })


        resources.load('data/tower__get_tower_info', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData: object = res.json!;
            let lastStaffList = []
            for (const key1 in jsonData) {
                for (const key in jsonData[key1]) {
                    // allStaffList = jsonData[key1][key]
                    jsonData[key1][key].forEach((tower_info) => {
                        if (GameData.userData.towerLv[tower_info.id] >= 1) {
                            // 实例化预制体 instantiate
                            let staff_item = instantiate(this.staff_item)
                            // 设置其父节点
                            staff_item.setParent(this.staff_content)
                            staff_item.getComponent(staffItemController).staff_info = tower_info
                            staff_item.name = tower_info.name
                        } else {
                            lastStaffList.push(tower_info)
                        }
                    })
                }
            }
            lastStaffList.forEach((tower_info) => {
                // 实例化预制体 instantiate
                let staff_item = instantiate(this.staff_item)
                // 设置其父节点
                staff_item.setParent(this.staff_content)
                staff_item.getComponent(staffItemController).staff_info = tower_info
                staff_item.name = tower_info.name
            })
        })
    }

    closeScroll() {
        if (!GameData.userData.guideSwitch) return
        if (GameData.userData.guideSuspend) return
        if (GameData.userData.guideListId <= 53) {
            this.staff_box.getComponent(ScrollView).vertical = false
        }
    }

    update(deltaTime: number) {

    }
}


