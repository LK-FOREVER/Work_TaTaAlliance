import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { FriendContent_Controller } from './FriendContent_Controller';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { GameData } from '../../Common/GameData';

@ccclass('FriendContent_ApplyView')
export class FriendContent_ApplyView extends Component {
    Apply_Button: Node = null;
    Refuse_Button: Node = null;

    protected onLoad(): void {
        this.Apply_Button = this.node.getChildByName('Apply_Button');
        this.Refuse_Button = this.node.getChildByName('Refuse_Button');
        this.Apply_Button.on(Node.EventType.TOUCH_END, this.Apply_Friend, this);   
        this.Refuse_Button.on(Node.EventType.TOUCH_END, this.Refuse_Friend, this);   
    }

    Apply_Friend() {
        if(GameData.userData.friendlist.length<50)
        {
            this.node.parent.getComponent(FriendContent_Controller).Add_Friend();
            EventManager.Instance.emit(EventConst.FRIEND_REFRESH_APPLY);// 通知刷新申请列表
            this.node.parent.destroy(); // 申请成功后销毁当前节点
        }
        else
        {
            EventManager.Instance.emit(EventConst.FULL_FRIEND_TIPS);// 通知刷新申请列表
        }
     
    }

    Refuse_Friend() {
        EventManager.Instance.emit(EventConst.FRIEND_REFRESH_APPLY);// 通知刷新申请列表
        this.node.parent.destroy(); 
    }
}


