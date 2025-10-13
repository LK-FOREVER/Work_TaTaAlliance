import { _decorator, Button, Component, Node } from 'cc';
import { MainUIControllers } from './MainUIControllers';
const { ccclass, property } = _decorator;

@ccclass('GoBattleControllers')
export class GoBattleControllers extends Component {
    start() {
        this.node.on(Button.EventType.CLICK,this.GoBattle,this);
        console.log('注册按钮监听GoBattle');
        

    }
    GoBattle(){
        console.log('GoBattle');
        MainUIControllers.instance.goBattle();
    }

    update(deltaTime: number) {
        
    }
}


