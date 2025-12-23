import { _decorator} from 'cc';
import EventManager from "../Common/EventManager";
import EventConst from '../Utils/EventConst';
import mainui_module from '../module/mainui_module';
const { ccclass, property } = _decorator;

@ccclass('chat_model')
export default class chat_model {
    public all_history_chat_list: any[] = [];
    public chat_friend_list: any[] = [];
    public friend_history_chat_list: any[] = [];

    // 跨服聊天记录
    public history_chat_list_1: any[] = [];
    // 世界聊天记录
    public history_chat_list_2: any[] = [];
    // 联盟聊天记录
    public history_chat_list_3: any[] = [];
    // 系统聊天记录
    public history_chat_list_6: any[] = [];
    // 我的好友列表
    public my_friend_list: any[] = [];
    //红点--聊天玩家
    public badgePlayerSet = new Set();
    // 红包领取记录
    public red_pack_reward_list: any[] = [];
    // 个人获奖记录
    public red_pack_reward_record_list: any[] = [];
    // 已读取过的红包
    public red_pack_guid_list: any[] = [];
    // 当前红包剩余的奖励
    public red_pack_remain_reward: any[] = [];

    // 屏蔽聊天频道
    public channel_hidden = {
        channel_world_hidden: 0,
        channel_cross_hidden: 0,
        channel_guild_hidden: 0,
        channel_system_hidden: 0,
    }


    // 历史聊天记录
    public set_history_chat_list(data) {
        this.all_history_chat_list = data;
        this.history_chat_list_1 = []
        this.history_chat_list_2 = []
        this.history_chat_list_3 = []
        this.history_chat_list_6 = []
        this.all_history_chat_list.forEach((chatData) => {
            if (chatData.channel == 1) {
                this.history_chat_list_1 = chatData.msg_list;
            } else if (chatData.channel == 2) {
                this.history_chat_list_2 = chatData.msg_list;
            } else if (chatData.channel == 3) {
                this.history_chat_list_3 = chatData.msg_list;
            } else if (chatData.channel == 6) {
                // this.history_chat_list_6 = chatData.msg_list;
                this.history_chat_list_6 = chatData.msg_list.slice(100);
            }
        })
    }
    // 好友列表
    public set_my_friend_list(data) {
        this.my_friend_list = data;
        EventManager.Instance.emit(EventConst.INIT_CHAT);
    }
    // 新消息
    public set_new_chat(data) {
        if (data.channel == 1) {
            this.history_chat_list_1.unshift(...data.msg_list);
        } else if (data.channel == 2) {
            if (this.channel_hidden.channel_world_hidden === 1) {
                return
            }else{
                this.history_chat_list_2.unshift(...data.msg_list);
            }
        } else if (data.channel == 3) {
            this.history_chat_list_3.unshift(...data.msg_list);
        } else if (data.channel == 6) {

            for (let i = 0; i < data.msg_list.length; i += 1) {
                mainui_module.Instance.get_model().marqueeList.push(data.msg_list[i]);
            }
            if (this.channel_hidden.channel_system_hidden === 0) {
                this.history_chat_list_6.unshift(...data.msg_list);
            } else return
        }
        EventManager.Instance.emit(EventConst.UPDATE_CHAT_LIST, true, data.msg_list[0].player, data.channel);
        EventManager.Instance.emit(EventConst.UPDATE_MAIN_CHAT_LIST);
    }
    // 聊天好友列表
    // isfriend: 是否为好友列表中打开的聊天界面
    public set_chat_friend_list(data: any, isfriend: boolean) {
        this.chat_friend_list = data.chat_friend_list;
        if(isfriend){
            return;
        }
        //正常打开主界面的聊天界面
        EventManager.Instance.emit(EventConst.INIT_CHAT, true);
        EventManager.Instance.emit(EventConst.UPDATE_CHAT_FRIEND_LIST);
    }
    // 好友聊天记录
    public set_friend_history_chat_list(data: any) {
        const chatDataForChannel4 = data.chat_list.find((chatData) => chatData.channel === 4);
        if (chatDataForChannel4) {
            this.friend_history_chat_list = chatDataForChannel4.msg_list;
        }
        EventManager.Instance.emit(EventConst.UPDATE_CHAT_FRIEND_CHAT_LIST);
    }
    /**
     * 红包领取记录
     */
    public set_red_pack_reward_list(data: any) {
        this.red_pack_reward_list = data.player_reward_list
    }
    /**
     * 当前红包剩余的奖励
     */
    public set_red_pack_remain_reward(data: any) {
        this.red_pack_remain_reward = data.remain_reward
    }
    /**
     * 个人获奖记录
     */
    public set_red_pack_reward_record_list(data: any) {
        this.red_pack_reward_record_list = data.reward_record_list
    }
    /**
     * 获取已读取过的红包
     */
    public set_red_pack_guid_list(data: any) {
        this.red_pack_guid_list = data.red_pack_guid_list
        EventManager.Instance.emit(EventConst.INIT_CHAT);
    }

}


