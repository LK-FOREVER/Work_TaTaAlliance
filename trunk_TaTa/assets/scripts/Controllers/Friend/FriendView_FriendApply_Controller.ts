import { _decorator, Component, Node ,instantiate,Prefab,Label, Sprite, Button,director} from 'cc';
const { ccclass, property } = _decorator;
import { GameData } from '../../Common/GameData'; 
import { FriendContent_Controller } from './FriendContent_Controller';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';

@ccclass('FriendView_FriendApply_Controller')
export class FriendView_FriendApply_Controller extends Component {

    Is_Check_Time: boolean = false; // 是否需要检查时间

    @property(Prefab)
    Friend_Content: Prefab = null;

    Apply_Count :number = 0; // 申请好友的数量
    Apply_Limit: number = 20; // 申请好友的数量限制

    Apply_Content: Node = null;

    Record_Timer: number = 0; // 记录刷新时间
    Time_Offset: number = 0; // 时间偏移量(分钟)

    All_Apply_Button: Node = null; // 全部申请按钮
    All_Refuse_Button: Node = null; // 全部拒绝按钮

    Apply_Count_Text:Node = null; // 申请数量文本

    protected onLoad(): void {
        this.Apply_Content = this.node.getChildByName("Apply_List_Scroll").getChildByName("View").getChildByName("Content");
        this.All_Apply_Button = this.node.getChildByName("All_Apply_Button");
        this.All_Refuse_Button = this.node.getChildByName("All_Refuse_Button");
        this.Apply_Count_Text = this.node.getChildByName("Apply_Count_Text");
        EventManager.Instance.on(EventConst.FRIEND_REFRESH_APPLY, this.Single_Apply_Refresh, this); // 监听刷新申请列表事件
        this.All_Apply_Button.on(Button.EventType.CLICK, this.Apply_All_Friends, this);   
        this.All_Refuse_Button.on(Button.EventType.CLICK, this.Refuse_All_Friends, this);   
    }
    
    protected onDestroy(): void {
         EventManager.Instance.off(EventConst.FRIEND_REFRESH_APPLY, this.Update_Apply_Count_Text, this); 
    }

    Init_UI()
    {
        this.Init_Buttons();
    }

    Init_Buttons()
    {
        let Have_Apply = this.Apply_Content.children.length !== 0;
        this.All_Apply_Button.getComponent(Sprite).grayscale = !Have_Apply;
        this.All_Refuse_Button.getComponent(Sprite).grayscale = !Have_Apply;
        this.All_Apply_Button.getComponent(Button).interactable = Have_Apply;
        this.All_Refuse_Button.getComponent(Button).interactable = Have_Apply;
    }

    Disable_Buttons()
    {
        this.All_Apply_Button.getComponent(Sprite).grayscale = true;
        this.All_Refuse_Button.getComponent(Sprite).grayscale = true;
        this.All_Apply_Button.getComponent(Button).interactable = false;
        this.All_Refuse_Button.getComponent(Button).interactable = false;
    }
    
    start() {
        if (!this.Is_Check_Time) {
            this.Is_Check_Time = true;
            this.Time_Offset = 20;//每在线20分钟刷新一个
            this.schedule(this.updateTime, 1); // 每秒更新一次
        }
        
        this.Update_Apply_Count_Text(); // 初始化申请数量文本
    }

    // 每秒更新时间
    private updateTime() {
        //当前时间大于记录的时间，并且随机添加好友数量大于0，且申请数量小于限制时，添加一个随机好友
        if(GameData.userData.dailyAccumulatedTime - this.Record_Timer > this.Time_Offset && GameData.userData.random_friend_add_num > 0 &&
            this.Apply_Count < this.Apply_Limit )
        {
            // 更新记录的时间
            this.Record_Timer = GameData.userData.dailyAccumulatedTime;
            let Friend_Content = instantiate(this.Friend_Content)
            Friend_Content.setParent(this.Apply_Content);
            Friend_Content.getComponent(FriendContent_Controller).Set_Random_Player_Info();
            Friend_Content.getComponent(FriendContent_Controller).Set_Active_View('Apply');
            GameData.userData.random_friend_add_num--;
            this.Apply_Count++;
            this.Update_Apply_Count_Text();
            this.Init_Buttons();
        }
    }

    //同意全部好友
    Apply_All_Friends() 
    {
        let Full_Friend = false;
        this.Apply_Content.children.forEach((child) => {
            if(GameData.userData.friendlist.length<50)
            {
                child.getComponent(FriendContent_Controller).Friend_Apply.Apply_Friend();
                this.Apply_Count--;
            }
            else
            {
                EventManager.Instance.emit(EventConst.FULL_FRIEND_TIPS);
                Full_Friend = true;
            }

        });
        this.Update_Apply_Count_Text(); // 更新申请数量文本
        if(!Full_Friend)
        {
            this.Disable_Buttons();
        }

    }

    //拒绝全部好友
    Refuse_All_Friends() 
    {
        this.Apply_Content.children.forEach((child) => {
            child.getComponent(FriendContent_Controller).Friend_Apply.Refuse_Friend();
        });
        this.Apply_Count = 0; // 重置申请数量
        this.Update_Apply_Count_Text(); // 更新申请数量文本
        this.Disable_Buttons();
    }

    Update_Apply_Count_Text() {
        this.node = director.getScene().getChildByName("Canvas").getChildByName("Friend_View").getChildByName("Friend_Apply_View"); 
        this.Apply_Count_Text = this.node.getChildByName("Apply_Count_Text");
        this.Apply_Count_Text.getComponent(Label).string = `申请数量：${this.Apply_Count}/20`; // 更新申请数量文本
    }

    Single_Apply_Refresh() {
        this.Apply_Count--;
        this.Update_Apply_Count_Text(); // 更新申请数量文本
    }
}


