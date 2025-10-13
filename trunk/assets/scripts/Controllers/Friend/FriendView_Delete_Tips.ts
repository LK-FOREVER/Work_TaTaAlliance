import { _decorator, Button, Component, Node } from 'cc';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendView_Delete_Tips')
export class FriendView_Delete_Tips extends Component {
    Cancel:Node = null;
    Confirm:Node = null;

    protected onLoad(): void {
        this.Cancel = this.node.getChildByName("Cancel");
        this.Confirm = this.node.getChildByName("Confirm");
        this.Cancel.on(Button.EventType.CLICK,this.Cancel_This_Tips,this);
        this.Confirm.on(Button.EventType.CLICK,this.Confirm_Delete,this);
    }

    Cancel_This_Tips()
    {
        this.node.active = false;
    }

    Confirm_Delete()
    {
        EventManager.Instance.emit(EventConst.DELETE_FRIEND);
        this.node.active = false;
    }



}


