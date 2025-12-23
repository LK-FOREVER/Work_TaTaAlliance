import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;
import { FriendView_FriendList_Controller } from '../Controllers/Friend/FriendView_FriendList_Controller';
import { FriendView_FriendApply_Controller } from '../Controllers/Friend/FriendView_FriendApply_Controller';
import { FriendView_FriendAdd_Controller } from '../Controllers/Friend/FriendView_FriendAdd_Controller';
import { FriendView_SideButton_Controller } from '../Controllers/Friend/FriendView_SideButton_Controller';

import EventManager from '../Common/EventManager';
import { EventConst } from '../Common/EventConst';

@ccclass('FriendManager')
export class FriendManager extends Component {

    Friend_List_View: FriendView_FriendList_Controller = null;
    Friend_Apply_View: FriendView_FriendApply_Controller = null;
    Friend_Add_View: FriendView_FriendAdd_Controller = null;
    All_Side_Button:FriendView_SideButton_Controller = null;
    Close_Button: Node = null;
    NodeList: Node[] = [];

    First_Open_Add: boolean = true; // 是否第一次打开添加好友界面

    protected onLoad(): void {
        EventManager.Instance.on(EventConst.FRIEND_CHANGE_PAGE, this.change_Page, this);
        this.Close_Button = this.node.getChildByName('Close_Button');
        this.Find_Obj();
        this.Close_Button.on(Button.EventType.CLICK, () => {  
            this.node.active = false;
        });

        EventManager.Instance.on(EventConst.FULL_FRIEND_TIPS,this.Active_FULL_FRIEND_TIPS,this);
        EventManager.Instance.on(EventConst.DELETE_FRIEND_TIPS,this.Active_DELETE_FRIEND_TIPS,this);
    }

    protected onDestroy(): void {
         EventManager.Instance.off(EventConst.FRIEND_CHANGE_PAGE, this.change_Page, this);
         EventManager.Instance.off(EventConst.FULL_FRIEND_TIPS,this.Active_FULL_FRIEND_TIPS,this);
         EventManager.Instance.off(EventConst.DELETE_FRIEND_TIPS,this.Active_DELETE_FRIEND_TIPS,this);
    }

    Init_UI()
    {
        //默认选择 好友列表 按钮
         this.Show_Friend_Part(this.Friend_List_View.node);
         this.All_Side_Button.Init_Buttons();
         this.Friend_List_View.Init_All_Money_State();
    }

    Find_Obj()
    {
        this.node = director.getScene().getChildByName("Canvas").getChildByName("Friend_View");   
        const friendListNode = this.node.getChildByName("Friend_List_View");
        const friendApplyNode = this.node.getChildByName("Friend_Apply_View");
        const friendAddNode = this.node.getChildByName("Friend_Add_View");
        const allSideButtonNode = this.node.getChildByName("All_Side_Button");
        this.Friend_List_View = friendListNode.getComponent(FriendView_FriendList_Controller);
        this.Friend_Apply_View = friendApplyNode.getComponent(FriendView_FriendApply_Controller);  
        this.Friend_Add_View = friendAddNode.getComponent(FriendView_FriendAdd_Controller);
        this.All_Side_Button = allSideButtonNode.getComponent(FriendView_SideButton_Controller);
        this.NodeList = [
            this.Friend_List_View.node,
            this.Friend_Apply_View.node,
            this.Friend_Add_View.node,
        ];
    }

    Show_Friend_Part(showPart: Node) {
        this.NodeList.forEach((node) => {
            node.active = false;
        });
        showPart.active = true;
    }

    change_Page(pageName: string) {
        this.Find_Obj();
        switch (pageName) {
            case 'Friend_List_Button':  
                this.Show_Friend_Part(this.Friend_List_View.node);
                this.Friend_List_View.Init_Friend_List();
                break;
            case 'Friend_Apply_Button': 
                this.Show_Friend_Part(this.Friend_Apply_View.node);
                this.Friend_Apply_View.Init_UI();
                break;
            case 'Friend_Add_Button':
                this.Show_Friend_Part(this.Friend_Add_View.node);
                if (this.First_Open_Add) {
                    this.Friend_Add_View.Instantiate_Random_Player(); // 实例化随机玩家
                    this.First_Open_Add = false; // 设置为false，表示不是第一次打开
                }
                this.Friend_Add_View.Init_UI();
                break;
            default:
                console.error(`Unknown page name: ${pageName}`);
                return; 
        }
    }

    Active_FULL_FRIEND_TIPS()
    {
        this.node.getChildByName("Full_Friend_Tips").active = true;
        
    }

    Active_DELETE_FRIEND_TIPS()
    {
         this.node.getChildByName("Delete_Tips").active = true;
    }


}


