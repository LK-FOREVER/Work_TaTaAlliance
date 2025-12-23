import { _decorator, Component, Label, Node ,resources,JsonAsset, Button} from 'cc';
import { TextUtils } from '../../Common/TextUtils';
import { GameData } from '../../Common/GameData'; 
import { player_icon } from "../../Controllers/promotion/player_icon";
import { FriendSys_PlayerInfo } from './FriendSys_PlayerInfo';
import { FriendContent_FriendView } from './FriendContent_FriendView';
import { FriendContent_ApplyView } from './FriendContent_ApplyView';
import { FriendContent_AddView } from './FriendContent_AddView';
import { FriendView_FriendList_Controller } from './FriendView_FriendList_Controller';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendContent_Controller')
export class FriendContent_Controller extends Component {
    Player_Message : Node = null;
    Head_Icon_Content: Node = null;
    Player_Name: Node = null;
    Player_Career: Node = null;

    Friend_View:FriendContent_FriendView = null;
    Friend_Apply:FriendContent_ApplyView = null;
    Friend_Add:FriendContent_AddView = null;

    /**
     * 设置当前显示的好友面板
     * @param viewType 'friend' | 'apply' | 'add'
     */
    Set_Active_View(viewType: 'Friend' | 'Apply' | 'Add') {
        this.Friend_View.node.active = viewType === 'Friend';
        this.Friend_Apply.node.active = viewType === 'Apply';
        this.Friend_Add.node.active = viewType === 'Add';
    }

    // 用于存储玩家信息
    This_Player_Info:FriendSys_PlayerInfo = new FriendSys_PlayerInfo();

    protected onLoad(): void {
        this.Player_Message = this.node.getChildByName('Player_Message');
        this.Head_Icon_Content = this.Player_Message.getChildByName('Head_Icon_Content');
        this.Player_Name = this.Player_Message.getChildByName('Player_Name');
        this.Player_Career = this.Player_Message.getChildByName('Player_Career');

        this.Friend_View = this.node.getChildByName('Friend_View').getComponent(FriendContent_FriendView);
        this.Friend_Apply = this.node.getChildByName('Apply_View').getComponent(FriendContent_ApplyView); 
        this.Friend_Add = this.node.getChildByName('Add_View').getComponent(FriendContent_AddView);

        this.node.on(Button.EventType.CLICK,this.Select_Friend,this);
    }

    Set_Random_Player_Info() {
        this.Set_Player_Random_Name();
        this.Set_Player_Random_Promotion();
        this.Set_Player_Random_Icon();   
    }

    Set_Player_Name(name: string) {
        this.Player_Name.getComponent(Label).string = name;
        this.This_Player_Info.PlayerName = name;
    }

    Set_Player_Career(career: number) {
          resources.load('data/promotion__get_promotion_info', (err: any, res: JsonAsset) => {
            const jsonData = res.json!;
            jsonData.forEach(item => {
            // 拿到当前职位所对应的信息
                if (item.id === career) {
                    this.Player_Message.getChildByName("Player_Career").getComponent(Label).string = item.position_lv_name
                    this.This_Player_Info.Career = career;
                    }
                });
            })
    }

    Set_Player_Icon(newId: string) {
        this.Head_Icon_Content.getComponent(player_icon).setIconContent(newId);   
        this.This_Player_Info.HeadIcon = newId;
    }

    //用于生成随机好友（添加，申请）
    Set_Player_Random_Name() {
        const names = TextUtils.Instance.player__random_name;
        const getRandomIndex1 = () => Math.floor(Math.random() * names.get(0).length);
        const getRandomIndex2 = () => Math.floor(Math.random() * names.get(1).length);
        const idx1 = getRandomIndex1();
        let idx2 = getRandomIndex2();
        const name1 = names.get(0)[idx1].name;
        const name2 = names.get(1)[idx2].name;
        const randomName = { name: name1 + name2 };
        this.Set_Player_Name(randomName.name);
    }

   Set_Player_Random_Promotion()
    {
        const user_career = Math.floor(Math.random() * 22) + 1;
        this.Set_Player_Career(user_career);
    }
    
    Set_Player_Random_Icon() {
        const newId = Math.floor(Math.random() * 12) + 6001;
        this.Set_Player_Icon(newId.toString());
    }

    Add_Friend() {
        this.This_Player_Info.Online = Math.random()<0.7;
        GameData.userData.friend_added_num++;
        this.This_Player_Info.Friend_Id = GameData.userData.friend_added_num;
        GameData.userData.friendlist.push(this.This_Player_Info);
        this.Friend_View.This_Player_Info = this.This_Player_Info;
    }

    Select_Friend()
    {
        EventManager.Instance.emit(EventConst.SELECT_FRIEND,this.node.name);
    }
}


