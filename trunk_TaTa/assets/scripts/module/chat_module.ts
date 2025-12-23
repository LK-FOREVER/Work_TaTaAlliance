import { _decorator, Component, Node, instantiate, find, Prefab, resources } from 'cc';
import EventManager from "../Common/EventManager";
import EventConst from '../Utils/EventConst';
import netManager from '../Network/netManager';
import chat_model from '../data/chat_model';
import Utils from '../Utils/Utils';
import chat_view from '../view/chat/chat_view';
import LoadUtils from '../Utils/LoadUtils';
import { ToastControllers } from '../Common/ToastControllers';
const { ccclass, property } = _decorator;

@ccclass('chat_module')
export default class chat_module extends Component {
    private static _instance: chat_module = null;
    private chat_view: Node = null
    private chat_red_pack_view: Node = null
    private chat_red_pack_content_view: Node = null
    private chat_red_pack_finish_view: Node = null
    private _model: chat_model = null;
    private red_pack_operate_type: number = null;
    private _callback_400: Action = null;
    static get Instance() {
        if (this._instance === null) {
            this._instance = new this()
            this._instance._model = new chat_model();
        }
        return this._instance
    }
    public get_model() {
        return this._model
    }

    public init(): void {
        EventManager.Instance.on(EventConst.OPEN_CHAT_VIEW, this.open_chat_view, this);
        EventManager.Instance.on(EventConst.QUERY_400, this.query_400, this);
        EventManager.Instance.on(EventConst.QUERY_402, this.query_402, this);
        EventManager.Instance.on(EventConst.QUERY_405, this.query_405, this);
        EventManager.Instance.on(EventConst.QUERY_406, this.query_406, this);
        EventManager.Instance.on(EventConst.QUERY_407, this.query_407, this);
        EventManager.Instance.on(EventConst.QUERY_408, this.query_408, this);
        EventManager.Instance.on(EventConst.QUERY_409, this.query_409, this);
        EventManager.Instance.on(EventConst.QUERY_410, this.query_410, this);
        EventManager.Instance.on(EventConst.QUERY_411, this.query_411, this);
        EventManager.Instance.on(EventConst.QUERY_412, this.query_412, this);
        EventManager.Instance.on(EventConst.QUERY_413, this.query_413, this);
        EventManager.Instance.on(EventConst.REPLY_400, this.reply_400, this);
        EventManager.Instance.on(EventConst.REPLY_401, this.reply_401, this);
        EventManager.Instance.on(EventConst.REPLY_402, this.reply_402, this);
        EventManager.Instance.on(EventConst.REPLY_405, this.reply_405, this);
        EventManager.Instance.on(EventConst.REPLY_406, this.reply_406, this);
        EventManager.Instance.on(EventConst.REPLY_407, this.reply_407, this);
        EventManager.Instance.on(EventConst.REPLY_408, this.reply_408, this);
        EventManager.Instance.on(EventConst.REPLY_409, this.reply_409, this);
        EventManager.Instance.on(EventConst.REPLY_410, this.reply_410, this);
        EventManager.Instance.on(EventConst.REPLY_411, this.reply_411, this);
        EventManager.Instance.on(EventConst.REPLY_412, this.reply_412, this);
        EventManager.Instance.on(EventConst.REPLY_413, this.reply_413, this);
        EventManager.Instance.on(EventConst.RESTART_INIT, this.restart_init, this);
    }
    /**
     * 重置初始化方法
     * 用于重新初始化聊天相关的状态和模型
     */
    private restart_init() {
        this.open_chat_view(false); // 关闭聊天视图，参数false表示不强制打开
        this._model = null; // 将当前模型引用置空
        this._model = new chat_model(); // 创建新的聊天模型实例
        this._callback_400 = null; // 清除400错误回调函数
    }
    /**
     * 获取历史聊天记录
     */
    private query_400(callback_400) {
        this._callback_400 = callback_400;
        netManager.Instance.sendMessage(400, {})
    }
    private reply_400(data: any) {
        console.log("历史聊天记录数据：", data);
        this._model.set_history_chat_list(data.chat_list);
        this._model.set_my_friend_list(data.friend_list);
        if (this._callback_400 && Utils.getValueType(this._callback_400) === "function") {
            this._callback_400();
        }
        this._callback_400 = null;
    }

    // 推送新消息
    private reply_401(data: any) {
        this._model.set_new_chat(data.chat);
    }

    /**
     * 发送新消息
     * @param channel 聊天频道
     * @param content 内容
     */
    private query_402(channel, content) {
        netManager.Instance.sendMessage(402, {
            channel: channel,
            content: content
        })
    }
    private reply_402(data: any) {
        if (data.status === 1) {
            EventManager.Instance.emit(EventConst.SEND_CHAT);
            EventManager.Instance.emit(EventConst.DISABLE_CHAT);
        }
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    /**
     * 设置屏蔽聊天频道 默认为0 传1为屏蔽
     * @param channel_world_hidden 世界频道
     * @param channel_cross_hidden 交易频道
     * @param channel_guild_hidden 帮会频道
     * @param channel_system_hidden 系统频道
     */
    private query_405(channel_world_hidden: number, channel_cross_hidden: number, channel_guild_hidden: number, channel_system_hidden: number) {
        netManager.Instance.sendMessage(405, {
            channel_world_hidden: channel_world_hidden,
            channel_cross_hidden: channel_cross_hidden,
            channel_guild_hidden: channel_guild_hidden,
            channel_system_hidden: channel_system_hidden
        })
    }
    private reply_405(data: any) {
        if (data.status === 1) {
            this._model.channel_hidden = {
                channel_world_hidden: data.channel_world_hidden,
                channel_cross_hidden: data.channel_cross_hidden,
                channel_guild_hidden: data.channel_guild_hidden,
                channel_system_hidden: data.channel_system_hidden
            }
            EventManager.Instance.emit(EventConst.UPDATE_CHANNEL_HIDDEN);
        }
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    /**
     * 获取私聊好友列表
     */
    private query_406() {
        netManager.Instance.sendMessage(406, {})
    }
    private reply_406(data: any) {
        if (data.status === 1) {
            this._model.set_chat_friend_list(data, false);
        }
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    /**
     * 私聊发送新消息
     * @param channel 聊天频道
     * @param content 内容
     * @param player_full_id 私聊的对象
     */
    private query_407(channel: number, content: string, player_full_id) {
        netManager.Instance.sendMessage(407, {
            channel: channel,
            content: content,
            player_full_id: player_full_id
        })
    }
    private reply_407(data: any) {
        if (data.status === 1) {
            EventManager.Instance.emit(EventConst.DISABLE_CHAT);
        }
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    /**
     * 获取与某个用户的历史聊天记录
     * @param full_id 对方的id
     */
    private query_408(full_id) {
        netManager.Instance.sendMessage(408, {
            full_id: full_id
        })
    }
    private reply_408(data: any) {
        if (data.status === 1) {
            this._model.set_friend_history_chat_list(data);
        }
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    /**
     * 删除或者添加私聊信息
     * @param full_id 对方的id
     * @param query_type 传1为添加，传2为删除
     */
    private query_409(full_id, query_type: number) {
        netManager.Instance.sendMessage(409, {
            full_id: full_id,
            query_type: query_type
        })
    }
    private reply_409(data: any) {
        if (data.status === 1) this._model.set_chat_friend_list(data, true);
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    private query_410(full_id) {
        netManager.Instance.sendMessage(410, {
            full_id: full_id,
        })
    }

    private reply_410(data: any) {
        ////console.log('%c [ data ]-174', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {

        }
    }

    /**
     * 领取红包/查看详情
     * @param guid 红包的guid
     * @param operate_type 1是领取奖励，2是查看详情
     */
    private query_411(guid: string, operate_type: number) {
        this.red_pack_operate_type = operate_type
        netManager.Instance.sendMessage(411, {
            guid: guid,
            operate_type: operate_type
        })
    }
    private reply_411(data: any) {

    }

    /**
     * 个人的获奖记录
     */
    private query_412() {
        netManager.Instance.sendMessage(412, {})
    }
    private reply_412(data: any) {
        // console.log('data',data)
        if (data.status === 1) this._model.set_red_pack_reward_record_list(data);
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    /**
     * 获取已读取过的红包
     */
    private query_413() {
        netManager.Instance.sendMessage(413, {})
    }
    private reply_413(data: any) {
        if (data.status === 1) this._model.set_red_pack_guid_list(data);
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }

    private open_chat_view(val: boolean, topIdx: number = 0, tabIdx: number = 0) {
        if (val) {
            if (!this.chat_view) {
                // LoadUtils.Instance.resBundle.load("prefab/view/chat/chat_view", Prefab, (_err, prefab) => {
                //     if (this.chat_view != null) {
                //         return;
                //     }
                //     this.chat_view = instantiate(prefab);
                //     this.chat_view.setParent(find("MainCanvas/ui_layer"));
                //     this.chat_view.getComponent(chat_view).selected_top_idx = topIdx
                //     if (tabIdx !== 0) {
                //         this.chat_view.getComponent(chat_view).selected_tab0_idx = tabIdx
                //     }
                //     // this.chat_view.getComponent(chat_view).startTween()
                //     this.chat_view.getComponent(chat_view).startRequest()
                // });
                resources.load("prefabs/chat/chat_view", Prefab, (_err, prefab) => {
                    if (this.chat_view != null) {
                        return;
                    }
                    this.chat_view = instantiate(prefab);
                    this.chat_view.setParent(find("Canvas/ui_layer"));
                    this.chat_view.getComponent(chat_view).selected_top_idx = topIdx
                    if (tabIdx !== 0) {
                        this.chat_view.getComponent(chat_view).selected_tab0_idx = tabIdx
                    }
                    // this.chat_view.getComponent(chat_view).startTween()
                    this.chat_view.getComponent(chat_view).startRequest()
                    this.chat_view.getComponent(chat_view).initUI();
                })
                // this.chat_view = find("Canvas/chat_view");
                // this.chat_view.active = true;
                // this.chat_view.getComponent(chat_view).selected_top_idx = topIdx
                // if (tabIdx !== 0) {
                //     this.chat_view.getComponent(chat_view).selected_tab0_idx = tabIdx
                // }
                // // this.chat_view.getComponent(chat_view).startTween()
                // this.chat_view.getComponent(chat_view).startRequest()
                // this.chat_view.getComponent(chat_view).initUI();
            } else {
                this.chat_view.getComponent(chat_view).selected_top_idx = topIdx
            }
        }
        else {
            if (this.chat_view !== null) {
                this.chat_view.removeFromParent();
                this.chat_view.destroy();
                this.chat_view = null;
                // LoadUtils.Instance.resBundle.release("prefab/view/chat/chat_view");
                // this.chat_view.active = false;
            }
        }
    }
}