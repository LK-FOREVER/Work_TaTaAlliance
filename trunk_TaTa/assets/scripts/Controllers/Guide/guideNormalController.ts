import { _decorator, Component, Node, find } from 'cc';
import { GameData } from '../../Common/GameData';
import { guideManager } from '../../Managers/guideManager';
const { ccclass, property } = _decorator;

@ccclass('guideNormalController')
export class guideNormalController extends Component {
    isLast = 0
    isNext = true
    start() {
        this.isNext = true
        if (GameData.userData.guideListId === 5 || GameData.userData.guideListId === 6) {
            this.node.getChildByName("Arrow").active = true
            this.node.getChildByName("Finger").getChildByName("guide_circle").active = false
        } else {
            this.node.getChildByName("Arrow").active = false
            this.node.getChildByName("Finger").getChildByName("guide_circle").active = true
        }
    }

    onDestroy() {
        let Canvas = find("Canvas")
        if(this.isNext){
            Canvas.getComponent(guideManager).guideNext(this.isLast)
        }
    }
}


