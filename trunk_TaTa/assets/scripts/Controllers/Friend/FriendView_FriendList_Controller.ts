import { _decorator, Component, Node ,Prefab,instantiate, Button, Sprite, Label} from 'cc';
import { FriendContent_Controller } from './FriendContent_Controller';
import { FriendContent_FriendView } from './FriendContent_FriendView';
import { FriendSys_PlayerInfo } from './FriendSys_PlayerInfo';
import { GameData } from '../../Common/GameData'; 
import { ShowGoods } from '../../Common/ShowGoods';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendView_FriendList_Controller')
export class FriendView_FriendList_Controller extends Component {

    Friend_List_Content: Node = null;

    @property(Prefab)
    Friend_Content: Prefab = null;
    Send_Gift_Button:Node = null;
    Is_Check_Time: boolean = false; // 是否需要检查时间
    Record_Timer: number = 0; // 记录刷新时间
    Time_Offset: number = 0; // 时间偏移量(分钟)
    Reward_Total_Money:number = 0;
    Delete_Friend_Button:Node = null;
    Current_Selected_Friend_ID:number = -1;
    Friend_Count_Text:Node = null;

    protected onLoad(): void {
        this.Friend_List_Content = this.node.getChildByName("Friend_List_Scroll").getChildByName("View").getChildByName("Content");
        this.Send_Gift_Button = this.node.getChildByName("Send_Gift_Button");
        this.Delete_Friend_Button = this.node.getChildByName("Delete_Friend_Button");
        this.Friend_Count_Text = this.node.getChildByName("Friend_Count_Text");


        //按钮
        this.Send_Gift_Button.on(Button.EventType.CLICK,this.Get_All_Friend_Money,this);
        this.Delete_Friend_Button.on(Button.EventType.CLICK,this.Active_Delect_Tips,this);

        //注册事件
        EventManager.Instance.on(EventConst.SELECT_FRIEND,this.Select_Friend,this);    
        EventManager.Instance.on(EventConst.DELETE_FRIEND,this.Delete_Friend,this);    
        EventManager.Instance.on(EventConst.REFRESH_GET_SEND_BUTTON,this.Init_Get_Send_Button,this);    
    }

    protected onDestroy(): void {
        //注销事件
        EventManager.Instance.off(EventConst.SELECT_FRIEND,this.Select_Friend,this);  
        EventManager.Instance.off(EventConst.DELETE_FRIEND,this.Delete_Friend,this);   
        EventManager.Instance.off(EventConst.REFRESH_GET_SEND_BUTTON,this.Init_Get_Send_Button,this);    
    }

    start() {
        if (!this.Is_Check_Time) {
            this.Is_Check_Time = true;
            this.Time_Offset = 40;//每在线40分钟刷新一次
            this.schedule(this.Update_All_Online_States, 1); // 每秒更新一次
        }
        this.Reward_Total_Money = 0;
    }

    Init_Friend_List()
    {
        this.Delete_Friend_Button.getComponent(Sprite).grayscale = true;
        this.Delete_Friend_Button.getComponent(Button).interactable = false;
        this.Current_Selected_Friend_ID = -1;
        this.Init_Friend_Selected();
        this.Show_All_Friends();
        this.Init_All_Money_State();
        this.Init_Get_Send_Button();
    }

    Show_All_Friends(){
        this.Friend_List_Content.removeAllChildren(); // 清空之前的内容
        if (GameData.userData.friendlist.length !== 0) {

            // 先生成Online为true且按照Friend_Id排序的
            for (const friend of GameData.userData.friendlist
                .filter(f => f.Online === true)
                .sort((a, b) => a.Friend_Id - b.Friend_Id)) {
                this.Instantiate_Friend_Item(friend);
            }

             // 先生成Online为false且按照Friend_Id排序的
            for (const friend of GameData.userData.friendlist.
                filter(f => f.Online !== true)
                .sort((a, b) => a.Friend_Id - b.Friend_Id)) {
                this.Instantiate_Friend_Item(friend);
            }
        }
        this.Friend_Count_Text.getComponent(Label).string =  `好友数量：${GameData.userData.friendlist.length}/50`;
    }

    Init_All_Money_State()
    {   
        this.Friend_List_Content.children.forEach(child => {
            let friend= child.getComponent(FriendContent_Controller);
            if(friend)
            {
                friend.Friend_View.Init_Money_State();
            }
        });
    }

    //初始化一键领取赠送按钮
    Init_Get_Send_Button()
    {
        let All_Sended = true;
        let All_Geted = true;
        this.Friend_List_Content.children.forEach(child => {
            let friend= child.getComponent(FriendContent_Controller);
            if(!friend.Friend_View.Search_Player().GetMoney)
            {
                All_Geted = false;
            }
            if(!friend.Friend_View.Search_Player().SendMoney)
            {
                All_Sended = false;
            }
        });
        this.Send_Gift_Button.getComponent(Sprite).grayscale = All_Sended && All_Geted;
        this.Send_Gift_Button.getComponent(Button).interactable = !(All_Sended && All_Geted);
    }

    
    //生成每个好友
    Instantiate_Friend_Item(friend:FriendSys_PlayerInfo)
    {
        let Friend_Content = instantiate(this.Friend_Content);
        Friend_Content.setParent(this.Friend_List_Content);
        Friend_Content.name  = "FriendContent_"+friend.Friend_Id;
        let Friend_Item = Friend_Content.getComponent(FriendContent_Controller);
        Friend_Item.Set_Active_View('Friend');
        Friend_Item.Set_Player_Career(friend.Career);
        Friend_Item.Set_Player_Name(friend.PlayerName);
        Friend_Item.Set_Player_Icon(friend.HeadIcon);
        Friend_Item.Friend_View.Init_Online_State();
    }

    // 每秒更新时间
    private Update_All_Online_States() {
        //当前时间大于记录的时间，并且随机添加好友数量大于0，且申请数量小于限制时，添加一个随机好友
        if(GameData.userData.dailyAccumulatedTime - this.Record_Timer > this.Time_Offset){
            // 更新记录的时间
            this.Record_Timer = GameData.userData.dailyAccumulatedTime;
            this.Friend_List_Content.children.forEach(child => {
                let friend= child.getComponent(FriendContent_Controller);
                if (friend) {
                    const isOnline = Math.random() < 0.7;
                    friend.Friend_View.Update_Player_Online(isOnline);
                }
            });
            this.Show_All_Friends();
        }
    }

    //一键获取全部赠送的金币
    Get_All_Friend_Money()
    {
        this.Friend_List_Content.children.forEach(child => {
            let friend= child.getComponent(FriendContent_Controller);
            if(friend)
            {
                if (!friend.Friend_View.Search_Player().GetMoney) 
                {
                    this.Reward_Total_Money+=100;       
                }
                friend.Friend_View.Get_Send_All_Money();
            }
        });
        this.Reward_Process();
        this.Init_Get_Send_Button();
    }

    //奖励弹窗
    Reward_Process()
    {
        if(this.Reward_Total_Money!==0)
        {
             let reward = 
        [{
            reward:1,
            number:this.Reward_Total_Money
        }]
        ShowGoods.init(reward);
        this.Reward_Total_Money = 0;
        }
    }

    Select_Friend(Select_Item:any)
    {
        this.Friend_List_Content.children.forEach(child => 
        {
            let friend= child.getComponent(FriendContent_Controller);
            if(child.name === Select_Item)
            {
                friend.Friend_View.Select.active = true;
                // 取child.name最后一个"_"后面的数字作为Current_Selected_Friend_ID
                const parts = child.name.split("_");
                this.Current_Selected_Friend_ID = parseInt(parts[1]);
                this.Delete_Friend_Button.getComponent(Sprite).grayscale = false;
                this.Delete_Friend_Button.getComponent(Button).interactable = true;
            }
            else
            {
                if(friend)
                {
                    friend.Friend_View.Select.active =false;
                }
            }
        });
    }

    //将好友列表显示为无选中
    Init_Friend_Selected()
    {
         this.Friend_List_Content.children.forEach(child => 
        {
            let friend= child.getComponent(FriendContent_Controller);
            if(friend)
            {
                friend.Friend_View.Select.active =false;
            }
        });
    }

    Active_Delect_Tips()
    {
        EventManager.Instance.emit(EventConst.DELETE_FRIEND_TIPS);
    }

    Delete_Friend()
    {
        if (this.Current_Selected_Friend_ID !== -1) {
            const index = GameData.userData.friendlist.findIndex(
            (f: FriendSys_PlayerInfo) => f.Friend_Id === this.Current_Selected_Friend_ID
            );
            if (index !== -1) {
            GameData.userData.friendlist.splice(index, 1);
            this.Show_All_Friends();
            this.Init_Friend_List();
            }
        }
    }
}


