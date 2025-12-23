import { _decorator, Button, Component, Node } from 'cc';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendView_Full_Friend_Tips')
export class FriendView_Full_Friend_Tips extends Component {

    Confirm:Node = null;

    protected onLoad(): void {
        this.Confirm = this.node.getChildByName("Confirm");
        this.Confirm.on(Button.EventType.CLICK,this.Disable_Tips,this);
    }

    Disable_Tips()
    {
        this.node.active = false;
    }
}


