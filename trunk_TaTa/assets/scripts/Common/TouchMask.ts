import { _decorator, Component, Node } from 'cc';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('TouchMask')
export class TouchMask extends Component {
    start() {
        this.node.on(Node.EventType.TOUCH_END, (event) => {
            // 触摸结束时，隐藏或销毁当前节点
            if (GameData.userData.guidanceId > 30 || GameData.userData.guidanceId === -1) {
                if (this.node.parent.active) {
                    this.node.parent.active = false;
                    GameData.saveData(false);
                }
            }
        });
    }
}


