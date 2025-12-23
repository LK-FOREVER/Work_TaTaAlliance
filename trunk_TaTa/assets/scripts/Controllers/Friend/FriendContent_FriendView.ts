import { _decorator, Button, Component, Node, Sprite, SpriteFrame } from 'cc';
import { FriendSys_PlayerInfo } from './FriendSys_PlayerInfo';
import { GameData } from '../../Common/GameData'; 
import { FriendContent_Controller } from './FriendContent_Controller';
import { ShowGoods } from '../../Common/ShowGoods';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendContent_FriendView')
export class FriendContent_FriendView extends Component {

    Online_Text:Node = null;
    Offline_Text:Node= null;
    Send_Money_Button:Node = null;
    Get_Money_Button:Node = null;
    This_Player_Info:FriendSys_PlayerInfo = null;

    //是否为一键获取
    All_Get_Money:boolean = false;

    Select:Node = null;


    protected onLoad(): void {
        this.Online_Text = this.node.getChildByName("Online_Text");
        this.Offline_Text = this.node.getChildByName("Offline_Text");
        this.Send_Money_Button = this.node.getChildByName("Send_Money_Button");
        this.Get_Money_Button = this.node.getChildByName("Get_Money_Button");
        this.Send_Money_Button.on(Button.EventType.CLICK, this.Send_Money, this);   
        this.Get_Money_Button.on(Button.EventType.CLICK, this.Get_Money, this);  
        this.Select = this.node.getChildByName("Select");
        this.Select.on(Button.EventType.CLICK,this.Friend_Selected,this);
    }
    
    protected start(): void {
       this.Init_Money_State();
    }

    Init_Money_State()
    {
        const Friend = this.Search_Player();
        this.Send_Money_Button.getComponent(Button).interactable = !Friend.SendMoney;
        this.Get_Money_Button.getComponent(Button).interactable =!Friend.GetMoney;
        this.Send_Money_Button.getComponent(Sprite).grayscale = Friend.SendMoney;
        this.Get_Money_Button.getComponent(Sprite).grayscale = Friend.GetMoney;
    }

    Update_Player_Online(Online:boolean)
    {
        const Friend = this.Search_Player();
        if (Friend) {
            Friend.Online = Online;
            this.Set_Friend_Status(Online);
        }
    }

    // 设置好友状态
    Set_Friend_Status(Online:boolean) {
        this.Online_Text.active = Online;
        this.Offline_Text.active = !Online;
    }

    Init_Online_State()
    {
         const Friend = this.Search_Player();
         this.Set_Friend_Status(Friend.Online);
    }

    Send_Money()
    {
        const Friend = this.Search_Player();
        if (!Friend.SendMoney) {
            Friend.SendMoney = true;
            this.Send_Money_Button.getComponent(Sprite).grayscale = true;
        }
        EventManager.Instance.emit(EventConst.REFRESH_GET_SEND_BUTTON);
    }

    Get_Money()
    {
        const Friend = this.Search_Player();
        if (!Friend.GetMoney) {
            Friend.GetMoney = true;
            this.Get_Money_Button.getComponent(Sprite).grayscale = true;
            this.Reward_Process();
        }
         EventManager.Instance.emit(EventConst.REFRESH_GET_SEND_BUTTON);
    }

    Get_Send_All_Money()
    {
        const Friend = this.Search_Player();
        if (!Friend.GetMoney) {
            Friend.GetMoney = true;
            this.Get_Money_Button.getComponent(Sprite).grayscale = true;
        }
        if (!Friend.SendMoney) {
            Friend.SendMoney = true;
            this.Send_Money_Button.getComponent(Sprite).grayscale = true;
        }
    }

    Reward_Process()
    {
        let reward = 
        [{
            reward:1,
            number:100
        }]
        ShowGoods.init(reward);
    }

    //过24点更新送钱和获取的状态
    Init_By_Day()
    {
        const Friend = this.Search_Player();
        if (Friend) {
            Friend.GetMoney = false;
            Friend.SendMoney = false;
        }
    }



    Search_Player(): FriendSys_PlayerInfo {
        // 在 friendlist 中查找并更新 Online 参数
        const friend = GameData.userData.friendlist.find(
            (f: FriendSys_PlayerInfo) => f.PlayerName === this.node.parent.getComponent(FriendContent_Controller).This_Player_Info.PlayerName
        );
        return friend;
    }

    Friend_Selected()
    {
        EventManager.Instance.emit(EventConst.SELECT_FRIEND,this.node.name);
    }
}


