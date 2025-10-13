import { _decorator, Component, Node } from 'cc';
import { FriendContent_Controller } from './FriendContent_Controller';
import { GameData } from '../../Common/GameData'; 
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendContent_AddView')
export class FriendContent_AddView extends Component {
   
    Add_Button: Node = null;
    Add_Button_Text: Node = null;
    Is_Added:boolean = false;

    protected onLoad(): void {
        this.Add_Button = this.node.getChildByName('Add_Button');
        this.Add_Button_Text = this.node.getChildByName('Added_Button_Text');
        this.Add_Button.active = true;
        this.Add_Button_Text.active = false;
        this.Is_Added = false;
        this.Add_Button.on(Node.EventType.TOUCH_END, this.Add_Friend, this);   
    }

    Add_Friend() {
        if(GameData.userData.friendlist.length<50)
        {
            this.Add_Button.active = false;
            this.Add_Button_Text.active = true;
            this.Is_Added = true;
            this.node.parent.getComponent(FriendContent_Controller).Add_Friend();          
        }
        else
        {
            EventManager.Instance.emit(EventConst.FULL_FRIEND_TIPS);
        }
    }

    Init_AddView()
    {
        this.Add_Button.active = true;
        this.Add_Button_Text.active = false;
        this.Is_Added = false;
    }
}


