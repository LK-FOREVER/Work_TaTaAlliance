import { _decorator, Component, Node, NodeEventType, director, find, resources, JsonAsset, error, Label } from 'cc';
import { BattleManager } from '../../Managers/BattleManager';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('promotion_success')
export class promotion_success extends Component {
    btn_close: Node = null
    btn_go: Node = null
    nowCareer: Node = null
    nextCareer: Node = null
    container_furnitrue: Node = null
    start() {
        const Canvas = find("Canvas")
        this.btn_close = this.node.getChildByName("btn_close")
        this.btn_go = this.node.getChildByName("btn_go")
        this.nowCareer = this.node.getChildByName("container").getChildByName("nowCareer")
        this.nextCareer = this.node.getChildByName("container").getChildByName("nextCareer")
        this.container_furnitrue = this.node.getChildByName("container_furnitrue")

        // 关闭
        this.btn_close.on(NodeEventType.TOUCH_END, () => { this.node.destroy() })
        // 前往
        this.btn_go.on(NodeEventType.TOUCH_END, () => {
            if (director.getScene().name === "Main UI") {
                this.node.destroy()
                Canvas.getChildByName("promotionBox").getChildByName("promotion").destroy()
                Canvas.getChildByName("Furniture").getChildByName("furniture_box").active = true
            } else {
                this.node.destroy()
                Canvas.getChildByName("promotionBox").getChildByName("promotion").destroy()
                BattleManager.Instance.goMainUI();
                GameData.openFurniture = true
            }
        })

        //职位信息
        resources.load('data/promotion__get_promotion_info', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            const jsonData = res.json!;
            jsonData.forEach(item => {
                // 拿到当前职位所对应的信息
                if (item.id === GameData.userData.career) {
                    this.nowCareer.getComponent(Label).string = item.position_lv_name
                }
                // 拿到下个职位所对应的信息
                if (item.id === GameData.userData.career + 1) {
                    this.nextCareer.getComponent(Label).string = item.position_lv_name
                }
            });
        })

        //解锁家具信息
        resources.load('data/furniture_unlock__get_furniture_unlock_info', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            const jsonData = res.json!;
            jsonData.forEach(item => {
                // 拿到当前职位所对应的信息
                if (item.position_lv === GameData.userData.career) {
                    const unlock_furniture = item.unlock_furniture.split(',')
                    console.log('unlock_furniture',unlock_furniture)
                    this.container_furnitrue.getChildByName("furniture_name1").getComponent(Label).string = unlock_furniture[0]
                    this.container_furnitrue.getChildByName("furniture_name2").getComponent(Label).string = unlock_furniture[1]
                    this.container_furnitrue.getChildByName("furniture_name3").getComponent(Label).string = unlock_furniture[2]
                    this.container_furnitrue.getChildByName("furniture_name4").getComponent(Label).string = unlock_furniture[3]
                }
            });
        })
    }
}
