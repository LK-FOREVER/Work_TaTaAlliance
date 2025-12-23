import { _decorator, Button, Component, Node, find } from 'cc';
import { BattleManager } from '../../Managers/BattleManager';
import { guideManager } from "../../Managers/guideManager"
import { GameData } from "../../Common/GameData"
const { ccclass, property } = _decorator;

@ccclass('DecisionStartController')
export class DecisionStartController extends Component {
    btn_cancel: Node;
    btn_start: Node;


    start() {
       // this.btn_cancel = this.node.getChildByName('cancel');
        this.btn_start = this.node.getChildByName('start');
      //  this.btn_cancel.on(Button.EventType.CLICK, this.cancelDecision, this);
        this.btn_start.on(Button.EventType.CLICK, this.startDecision, this);




    }
    //取消决策，关闭窗口，直接开始游戏
    cancelDecision() {
        //this.closeBySelf();
        // BattleManager.Instance.setDecisionStartView(false);
        BattleManager.Instance.is_start = true;
        BattleManager.Instance.ctorEnemyObj();


    }
    //开始决策，关闭窗口，显示决策界面
    startDecision() {
        // this.closeBySelf();
        // BattleManager.Instance.setDecisionStartView(false);
        // BattleManager.Instance.setDecisionView(true);
        if (GameData.userData.guideListId === 83){
            const Canvas = find("Canvas")
            Canvas.getComponent(guideManager).guideNext()
        }
    }



    update(deltaTime: number) {

    }
}


