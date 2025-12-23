import { _decorator, Button, Color, Component, Label, Node, resources, Sprite, SpriteFrame, v3 } from 'cc';
import Utils from '../../../Utils/Utils';
import EventManager from '../../../Common/EventManager';
import EventConst from '../../../Utils/EventConst';
import { common_user_head } from '../../../Common/common_user_head';
import { StorageManager } from '../../../Managers/StorageManager';
import { Const } from '../../../const/consts';
const { ccclass, property } = _decorator;

const BADGE_POSITION = v3(-810, 70)

@ccclass('friend_item')
export class friend_item extends Component {
    //等级
    // @property(Node)
    // lv: Node = null;
    //头像
    @property(Node)
    avatar: Node = null;
    // //vip等级
    // @property(Node)
    // vip_lv: Node = null;
    //vip节点
    // @property(Node)
    // vip_bg: Node = null;
    //昵称
    @property(Node)
    nickname: Node = null;
    //在线状态
    @property(Node)
    online_text: Node = null;
    //战力
    @property(Node)
    power_text: Node = null;

    @property(Label)
    guildNameLabel: Label = null;

    @property(Node)
    funcitonListNode: Node = null;


    avatar_bg: Node = null;
    // 好友信息
    friend_info: any;
    // 选中索引
    selectedIdx: any;
    setData(data, selectedIdx) {
        ////console.log('%c [ selectedIdx ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', selectedIdx)
        this.friend_info = data;
        this.selectedIdx = selectedIdx;
        this.node.getChildByName('friend_item_bg').getChildByName('function_list').children.forEach((funNode, index) => {
            funNode.children.forEach(btnNode => {
                btnNode.on(Button.EventType.CLICK, this.btn_handler, this);
            });
        });
        const userHead = this.node.getChildByName('friend_item_bg').getChildByName('user_head');
        userHead.getComponent(common_user_head).init(this.friend_info.other_player);
        this.avatar_bg = userHead.getChildByName("avatar_bg");
        // this.avatar_bg.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = `${this.friend_info.vip}`
        // this.avatar_bg.getChildByName("lv").getComponent(Label).string = `${this.friend_info.lv}`
        this.avatar_bg.on(Node.EventType.TOUCH_END, this.btn_avatar, this)
        this.updateUI();
    }

    btn_avatar() {
        // EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, true, false, this.friend_info.other_player)
    }
    btn_handler(evt) {
        let target_name = evt.target.name;
        if (target_name == "battle") {

        } else if (target_name == "message") {
            // 聊天
            EventManager.Instance.emit(EventConst.QUERY_409, this.friend_info.other_player_full_id, 1);
            EventManager.Instance.emit(EventConst.OPEN_CHAT_VIEW, true, 1);
        } else if (target_name == "add") {
            // 添加
            const skipTipInfo = StorageManager.Instance.getLocalStorageJson(Const.account + "skiptip");
            if (skipTipInfo.isSkip === 0) {
                Utils.create_tips_view(`确定添加<color=#9d331e>${this.friend_info.other_player.nickname}</color>为好友？`, "提示", 1, () => {
                    EventManager.Instance.emit(EventConst.QUERY_306, this.friend_info.other_player_full_id);
                    this.funcitonListNode.getChildByName("send_fun").active = true;
                    this.funcitonListNode.getChildByName("suggest_fun").active = false;
                });
            } else {
                EventManager.Instance.emit(EventConst.QUERY_306, this.friend_info.other_player_full_id);
                this.funcitonListNode.getChildByName("send_fun").active = true;
                this.funcitonListNode.getChildByName("suggest_fun").active = false;
            }

        } else if (target_name == "reject") {
            // 拒绝
            EventManager.Instance.emit(EventConst.QUERY_314, [this.friend_info.other_player_full_id]);
        } else if (target_name == "agree") {
            // 同意
            EventManager.Instance.emit(EventConst.QUERY_311, this.friend_info.other_player_full_id);
        } else if (target_name == "remove") {
            // 移除黑名单
            const skipTipInfo = StorageManager.Instance.getLocalStorageJson(Const.account + "skiptip");
            if (skipTipInfo.isSkip === 0) {
                Utils.create_tips_view(`确定将<color=#9d331e>${this.friend_info.other_player.nickname}</color>移除黑名单？`, "提示", 1, () => {
                    EventManager.Instance.emit(EventConst.QUERY_317, [this.friend_info.other_player_full_id]);
                });
            } else {
                EventManager.Instance.emit(EventConst.QUERY_317, [this.friend_info.other_player_full_id]);
            }

        }
    }
    updateUI() {
        this.nickname.getComponent(Label).string = this.friend_info.other_player.nickname;
        //改为职位称号
        this.guildNameLabel.string = this.friend_info.other_player.guild_name;
        // this.lv.getComponent(Label).string = this.friend_info.other_player.lv;
        this.power_text.getComponent(Label).string = "战" + Utils.changeNumber(this.friend_info.other_player.power, 1);
        this.power_text.parent.active = false;
        // 头像
        resources.load("images/goods/" + this.friend_info.other_player.head_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            this.avatar.getComponent(Sprite).spriteFrame = spriteFrame
        })
        // if (this.friend_info.other_player.vip === 0) {
        //     this.vip_bg.active = false;
        // } else {
        //     this.vip_bg.active = true;
        //     this.vip_lv.getComponent(Label).string = this.friend_info.other_player.vip;
        // }
        // 判断是否在线
        if (this.friend_info.other_player.online_flag == 1) {
            this.online_text.getComponent(Label).string = "在线";
            this.online_text.getComponent(Label).color = new Color('#29991F');
        } else {
            // 计算离线时间
            if (Utils.getTimeElapsedSince(this.friend_info.other_player.last_logout_time))
                this.online_text.getComponent(Label).string = Utils.getTimeElapsedSince(this.friend_info.other_player.last_logout_time)
            this.online_text.getComponent(Label).color = new Color('#998f7e');
        }
        //关系
        if (this.selectedIdx === 0) {
            this.funcitonListNode.getChildByName("friend_fun").active = true;
            // this.funcitonListNode.getChildByName("friend_fun").getChildByName("battle").active = false;
        } else {
            this.funcitonListNode.getChildByName("friend_fun").active = this.friend_info.is_friend === 1;
            this.funcitonListNode.getChildByName("suggest_fun").active = this.friend_info.is_friend === 0;
            this.funcitonListNode.getChildByName("application_fun").active = this.friend_info.is_friend === 3;
            this.funcitonListNode.getChildByName("blacklist_fun").active = this.friend_info.is_friend === 9;
            this.funcitonListNode.getChildByName("send_fun").active = this.friend_info.is_friend === 2;
        }

    }
}


