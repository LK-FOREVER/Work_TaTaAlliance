import { _decorator, instantiate, find, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

import player_base_model from "../data/player_base_model";
import EventManager from "../Common/EventManager";
import netManager from "../Network/netManager";
import EventConst from "../Utils/EventConst";
import player_info_view from "../view/playerinfo/player_info_view";
import Utils from "../Utils/Utils";
import login_module from "./login_module";
import { ViewsManager } from "../Managers/ViewsManager";
import chat_module from "./chat_module";
import LoadUtils from "../Utils/LoadUtils";
import { ToastControllers } from "../Common/ToastControllers";
import { GameData } from "../Common/GameData";

@ccclass("player_base_module")
export default class player_base_module {
    private static _instance: player_base_module = null;
    private _model: player_base_model = null;
    private player_info_view: Node = null;
    public other_player_info = null;
    public new_func_list = [];
    private _callback_209: Action = null;

    static get Instance() {
        if (this._instance === null) {
            this._instance = new this();
            this._instance._model = new player_base_model();
        }
        return this._instance;
    }
    public get_model() {
        return this._model;
    }
    public init(): void {
        EventManager.Instance.on(EventConst.OPEN_PLAYER_INFO_VIEW, this.open_player_info_view, this);
        EventManager.Instance.on(EventConst.LOAD_PREFABS_COMPLETE, this.load_prfabs_complete, this);

        EventManager.Instance.on(EventConst.QUERY_204, this.query_204, this);
        EventManager.Instance.on(EventConst.QUERY_206, this.query_206, this);
        EventManager.Instance.on(EventConst.QUERY_208, this.query_208, this);
        EventManager.Instance.on(EventConst.QUERY_228, this.query_228, this);
        EventManager.Instance.on(EventConst.REPLY_201, this.handler_201, this);
        EventManager.Instance.on(EventConst.REPLY_206, this.handler_206, this);
        EventManager.Instance.on(EventConst.REPLY_207, this.handler_207, this);
        EventManager.Instance.on(EventConst.REPLY_208, this.handler_208, this);
        EventManager.Instance.on(EventConst.QUERY_209, this.query_209, this);
        EventManager.Instance.on(EventConst.REPLY_209, this.handler_209, this);
        EventManager.Instance.on(EventConst.REPLY_266, this.handler_266, this);

        EventManager.Instance.on(EventConst.RESTART_INIT, this.restart_init, this);
    }

    private restart_init() {
        this.open_player_info_view(false);
        this._model = null;
        this._model = new player_base_model();
        this._callback_209 = null;
    }


    // 
    private open_player_info_view(val: boolean, is_me: boolean = false, player_full_id = null) {
        if (val) {
            if (this.player_info_view === null) {
                LoadUtils.Instance.resBundle.load("prefab/view/player/player_info_view", Prefab, (_err, prefab) => {
                    if (this.player_info_view != null) {
                        return;
                    }
                    this.player_info_view = instantiate(prefab);
                    this.player_info_view.setParent(find("MainCanvas/ui_layer"));
                    this.player_info_view.getComponent(player_info_view).init(is_me, player_full_id);
                    Utils.getPopCommonEffect(this.player_info_view)
                });
            }
        } else {
            if (this.player_info_view != null) {
                this.player_info_view.removeFromParent();
                this.player_info_view.destroy();
                this.player_info_view = null;
                LoadUtils.Instance.resBundle.release("prefab/view/player/player_info_view");
            }
        }
    }

    private query_204() {
        netManager.Instance.sendMessage(204, {});
    }

    private query_209(callback_209) {
        this._callback_209 = callback_209;
        netManager.Instance.sendMessage(209, {});
    }
    private handler_209(data: any) {
        // console.log('%c [ data ]-193', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        this._model.is_first_pve = data.config_info.is_first_pve;
        // 设置屏蔽聊天频道
        chat_module.Instance.get_model().channel_hidden.channel_world_hidden = data.config_info.chat_world_hidden;
        chat_module.Instance.get_model().channel_hidden.channel_cross_hidden = data.config_info.chat_cross_hidden;
        chat_module.Instance.get_model().channel_hidden.channel_guild_hidden = data.config_info.chat_guild_hidden;
        chat_module.Instance.get_model().channel_hidden.channel_system_hidden = data.config_info.chat_system_hidden;

        if (this._callback_209 && Utils.getValueType(this._callback_209) === "function") {
            this._callback_209();
        }
        this._callback_209 = null;
    }
    private handler_201(data: any) {
        netManager.Instance.server_kick();
        Utils.create_tips_view(data.message, "提示", 2, () => {
            login_module.Instance.loginBtnCanClick = true;
            EventManager.Instance.emit(EventConst.RESTART_INIT);
            EventManager.Instance.emit(EventConst.OPEN_LOGIN_VIEW, true);
        }, undefined, true)

    }

    private handler_206(data: any) {
        console.log("改名返回的数据：", data);
        if (data.status !== 1) {
            ToastControllers.Instance.showToast(data.message);
            return;
        }
        player_base_module.Instance.get_model().base_info.nickname =
            data.nick_name;
        player_base_module.Instance.get_model().base_info.nickname_change_num =
            data.nickname_change_num;
        // EventManager.Instance.emit(EventConst.PLAYER_BASE_CHANGE);
    }
    private handler_207(data: any) {
        // console.log('%c [ data ]-152', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        this._model.set_player_base(data);
        this._model.base_info.nickname = GameData.client_data.client_data.user_data.nickname;
        this._model.base_info.head_id = GameData.client_data.client_data.user_data.head_id;

        // find("views").getComponent(ViewsManager).init(data);
    }
    load_prfabs_complete(data) {
        EventManager.Instance.emit(EventConst.OPEN_MAINUI_VIEW, true);
    }
    private handler_208(data: any) {
        ////console.log('%c [ data ]-173', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        this._model.set_player_base(data);
    }
    private query_206(name: string) {
        netManager.Instance.sendMessage(206, { nick_name: name });
    }
    private query_208() {
        netManager.Instance.sendMessage(208, {});
    }
    private query_228(status: number) {
        netManager.Instance.sendMessage(228, { fame_lock_status: status });
    }

    private handler_266(data: any) {
        // 打印收到的266回复数据
        console.log("收到266回复:", data);
        if (data.message !== '') ToastControllers.Instance.showToast(data.message)
    }
}
