import { _decorator, Button, Component, Node, Sprite } from 'cc';
import EventManager from '../../../Common/EventManager';
import EventConst from '../../../Utils/EventConst';
import chat_module from '../../../module/chat_module';
import LoadUtils from '../../../Utils/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('chat_item')
export class chat_item extends Component {
    is_me: boolean = false;
    player_info: any = null;
    red_pack_guid: string = null;
    red_pack_guid_list: any[] = [];
    red_pack: Node = null!;

    public out_date:boolean = false;
    start() {
        const head_node = this.node.getChildByName("head_node");
        this.red_pack = this.node.getChildByName("red_pack")
        // head_node.on(Button.EventType.CLICK, () => {
        //     EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, true, this.is_me, this.player_info);
        // });
        this.red_pack.on(Node.EventType.TOUCH_END, this.open_red_pack_handler, this);
        this.add_listener();
    }
    protected onDestroy(): void {
        this.remove_listener();
    }
    private add_listener() {
    }
    private remove_listener() {
    }
    setData(is_me: boolean, playerInfo = null, red_pack_guid = null,pve_guid:string = null,pvp_guid:string = null) {
        this.is_me = is_me;
        this.player_info = playerInfo;
        this.red_pack_guid = red_pack_guid;

        // 已查看红包的guid
        this.red_pack_guid_list = chat_module.Instance.get_model().red_pack_guid_list;
    }
    updateUI(){
        this.red_pack_guid_list = chat_module.Instance.get_model().red_pack_guid_list;
        // 判断已查看红包的列表中是否有当前红包的guid
        // if (this.red_pack_guid_list.indexOf(this.red_pack_guid) !== -1) {
        //     // 查看领取记录
        //     this.red_pack.getChildByName("center_icon").getComponent(Sprite).spriteFrame = LoadUtils.Instance.chat.getSpriteFrame("chat_red_pack_icon_show");
        //     this.red_pack.getChildByName("mask").active = true;
        // } else {
        //     // 开红包
        //     this.red_pack.getChildByName("center_icon").getComponent(Sprite).spriteFrame = LoadUtils.Instance.chat.getSpriteFrame("chat_red_pack_icon_open");
        //     this.red_pack.getChildByName("mask").active = false;
        // }
    }
    private open_red_pack_handler() {
        let operate_type: number = 1
        // 判断已查看红包的列表中是否有当前红包的guid
        if (this.red_pack_guid_list.indexOf(this.red_pack_guid) !== -1) {
            // 查看详情
            operate_type = 2
            // console.log("info")
        } else {
            // 领取奖励
            operate_type = 1
            // console.log("reward")
        }
        EventManager.Instance.emit(EventConst.QUERY_411, this.red_pack_guid, operate_type);
    }
}


