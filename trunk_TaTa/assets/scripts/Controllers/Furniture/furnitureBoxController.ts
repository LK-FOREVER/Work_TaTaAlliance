import { _decorator, Component, Node } from 'cc';
import { furnitureItemController } from './furnitureItemController';
const { ccclass, property } = _decorator;

@ccclass('furnitureBoxController')
export class furnitureBoxController extends Component {
    onEnable() {
        setTimeout(() => {
            // 更新家具列表
            let furnitureTypeBoxList = this.node.getChildByName("view").getChildByName("content").children
            furnitureTypeBoxList.forEach((typeBoxItem) => {
                let typeBoxList = typeBoxItem.getChildByName("furniture_type_scroll").getChildByName("view").getChildByName("content").children
                typeBoxList.forEach((item) => {
                    if (item) item.getComponent(furnitureItemController).updateUI()
                })
            })

        }, 500);
    }
}
