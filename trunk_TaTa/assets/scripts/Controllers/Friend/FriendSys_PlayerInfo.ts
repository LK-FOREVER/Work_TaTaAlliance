import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FriendSys_PlayerInfo')
export class FriendSys_PlayerInfo extends Component {
        Friend_Id: number;
        HeadIcon: string;
        PlayerName: string;
        Career: number;
        Online: boolean;
        GetMoney: boolean;
        SendMoney: boolean;
}


