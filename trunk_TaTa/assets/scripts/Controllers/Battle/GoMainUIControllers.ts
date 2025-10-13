import { _decorator, Button, Component, Node } from 'cc';
import { BattleManager } from '../../Managers/BattleManager';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('GoMainUIControllers')
export class GoMainUIControllers extends Component {
    start() {
        this.node.on(Button.EventType.CLICK,this.GoMainUI,this);
    }
    GoMainUI(){
        if(GameData.userData.guidanceId != -1) return;
        BattleManager.Instance.goMainUI();
    }
}
