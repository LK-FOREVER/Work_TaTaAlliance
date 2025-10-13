import { _decorator, Component, Node ,Prefab,instantiate, Button,Sprite} from 'cc';
import { FriendContent_Controller } from './FriendContent_Controller';
import { GameData } from '../../Common/GameData'; 
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendView_FriendAdd_Controller')
export class FriendView_FriendAdd_Controller extends Component {

    @property(Prefab)
    Friend_Content: Prefab = null;

    Add_Content: Node = null;

    All_Add_Button :Node = null;

    Refresh_Button: Node = null;
    
    protected onLoad(): void {
        this.Add_Content = this.node.getChildByName("Add_List_Scroll").getChildByName("View").getChildByName("Content");
        this.All_Add_Button = this.node.getChildByName("All_Add_Button");
        this.Refresh_Button = this.node.getChildByName("Refresh_Button");
        this.Refresh_Button.on(Button.EventType.CLICK, this.Instantiate_Random_Player, this);
        this.All_Add_Button.on(Button.EventType.CLICK, this.Add_All_Friends, this);
    }

    Is_Player_Already_Added(playerInfo: any): boolean {
        let Find_Friend =GameData.userData.friendlist.some((friend: any) => friend.PlayerName === playerInfo.PlayerName);
        return Find_Friend;
    }

    Check_All_Added_Status() {
        this.Add_Content.children.forEach((child) => {
            const playerInfo = child.getComponent(FriendContent_Controller).This_Player_Info;
            if (!this.Is_Player_Already_Added(playerInfo)) {
               child.getComponent(FriendContent_Controller).Friend_Add.Init_AddView();
            }
        });
    }

    Instantiate_Random_Player() {
        this.Add_Content.removeAllChildren(); // 清空之前的内容
        const Instantiate_Number = 10; // 设置需要实例化的数量(默认10个)
        for (let i = 0; i < Instantiate_Number; i++) {
            let Friend_Content = instantiate(this.Friend_Content);
            Friend_Content.setParent(this.Add_Content);
            Friend_Content.getComponent(FriendContent_Controller).Set_Random_Player_Info();
            Friend_Content.getComponent(FriendContent_Controller).Set_Active_View('Add');
        }
        this.Init_Buttons();
    }

    Add_All_Friends() {
        this.Add_Content.children.forEach((child) => {
            if(!child.getComponent(FriendContent_Controller).Friend_Add.Is_Added)
            {
                if(GameData.userData.friendlist.length<50)
                {
                    child.getComponent(FriendContent_Controller).Friend_Add.Add_Friend();
                }
                else
                {
                    EventManager.Instance.emit(EventConst.FULL_FRIEND_TIPS);
                    return;
                }
            }
        });
        this.Init_Buttons();
    }

    Init_UI()
    {
        this.Init_Buttons();
        this.Check_All_Added_Status();
    }

    Init_Buttons()
    {
        let Is_All_Added = true;
        this.Add_Content.children.forEach((child) => {
            if(!child.getComponent(FriendContent_Controller).Friend_Add.Is_Added)
            {
                Is_All_Added = false;
            }
        });

        this.All_Add_Button.getComponent(Sprite).grayscale = Is_All_Added;
        this.All_Add_Button.getComponent(Button).interactable = !Is_All_Added;
    }
}


