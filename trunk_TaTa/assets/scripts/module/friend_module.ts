import { _decorator, Node, find, instantiate, Prefab, resources } from "cc";
import EventManager from "../Common/EventManager";
import EventConst from "../Utils/EventConst";
import friend_model from "../data/friend_model";
import netManager from "../Network/netManager";
import Utils from "../Utils/Utils";
import { friend_view } from "../view/friend/friend_view";
import LoadUtils from "../Utils/LoadUtils";
import { ToastControllers } from "../Common/ToastControllers";
const { ccclass, property } = _decorator;

@ccclass("friend_module")
export default class friend_module {
    private static _instance: friend_module = null;
    private _model: friend_model = null;
    private friend_view: Node = null;
    private _callback_300: Action = null;
    private _callback_315: Action = null;
    private _callback_319: Action = null;
    static get Instance() {
        if (this._instance === null) {
            this._instance = new this();
            this._instance._model = new friend_model();
        }
        return this._instance;
    }
    public get_model() {
        return this._model;
    }

    public init(): void {
        EventManager.Instance.on(EventConst.OPEN_FRIEND_VIEW, this.open_friend_view, this);
        EventManager.Instance.on(EventConst.QUERY_300, this.query_300, this);
        EventManager.Instance.on(EventConst.QUERY_304, this.query_304, this);
        EventManager.Instance.on(EventConst.QUERY_305, this.query_305, this);
        EventManager.Instance.on(EventConst.QUERY_306, this.query_306, this);
        EventManager.Instance.on(EventConst.QUERY_307, this.query_307, this);
        EventManager.Instance.on(EventConst.QUERY_310, this.query_310, this);
        EventManager.Instance.on(EventConst.QUERY_311, this.query_311, this);
        EventManager.Instance.on(EventConst.QUERY_312, this.query_312, this);
        EventManager.Instance.on(EventConst.QUERY_314, this.query_314, this);
        EventManager.Instance.on(EventConst.QUERY_315, this.query_315, this);
        EventManager.Instance.on(EventConst.QUERY_316, this.query_316, this);
        EventManager.Instance.on(EventConst.QUERY_317, this.query_317, this);
        EventManager.Instance.on(EventConst.QUERY_318, this.query_318, this);
        EventManager.Instance.on(EventConst.QUERY_319, this.query_319, this);


        EventManager.Instance.on(EventConst.REPLY_300, this.reply_300, this);
        EventManager.Instance.on(EventConst.REPLY_304, this.reply_304, this);
        EventManager.Instance.on(EventConst.REPLY_305, this.reply_305, this);
        EventManager.Instance.on(EventConst.REPLY_306, this.reply_306, this);
        EventManager.Instance.on(EventConst.REPLY_307, this.reply_307, this);
        EventManager.Instance.on(EventConst.REPLY_310, this.reply_310, this);
        EventManager.Instance.on(EventConst.REPLY_311, this.reply_311, this);
        EventManager.Instance.on(EventConst.REPLY_312, this.reply_312, this);
        EventManager.Instance.on(EventConst.REPLY_313, this.reply_313, this);
        EventManager.Instance.on(EventConst.REPLY_314, this.reply_314, this);
        EventManager.Instance.on(EventConst.REPLY_315, this.reply_315, this);
        EventManager.Instance.on(EventConst.REPLY_316, this.reply_316, this);
        EventManager.Instance.on(EventConst.REPLY_317, this.reply_317, this);
        EventManager.Instance.on(EventConst.REPLY_318, this.reply_318, this);
        EventManager.Instance.on(EventConst.REPLY_319, this.reply_319, this);

        EventManager.Instance.on(EventConst.RESTART_INIT, this.restart_init, this);
    }

    private restart_init() {
        this.open_friend_view(false);
        this._model = null;
        this._model = new friend_model();
        this._callback_300 = null;
        this._callback_315 = null;
    }
    // 好友列表
    private query_300(callback_300) {
        this._callback_300 = callback_300;
        netManager.Instance.sendMessage(300, {});
    }
    private reply_300(data: any) {
        ////console.log('%c [ data ]-68', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        console.log('data300:========', data)
        this._model.set_friend_list(data);
        if (this._callback_300 && Utils.getValueType(this._callback_300) === "function") {
            this._callback_300();
        }
        this._callback_300 = null;
    }

    // 删除好友
    private query_304(player_full_id) {
        netManager.Instance.sendMessage(304, {
            player_full_id: player_full_id,
        });
    }
    private reply_304(data: any) {
        ////console.log('%c [ data ]-78', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.delete_friend(data.player_full_id);
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);
        this.query_300(null);
    }

    // 可添加为好友的陌生人列表
    // 可按玩家昵称查询，若不输入玩家昵称，则返回随机在线玩家列表
    private query_305(nickname: string) {
        netManager.Instance.sendMessage(305, {
            nickname: nickname,
        });
        console.log('nickname:========', nickname)
    }
    private reply_305(data: any) {
        console.log('data305:========', data)
        ////console.log('%c [ data ]-91', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.set_search_friend_list(data);
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);
    }

    // 申请添加好友,单个添加
    private query_306(player_full_id) {
        netManager.Instance.sendMessage(306, {
            player_full_id: player_full_id,
        });
    }
    private reply_306(data: any) {
        ////console.log('%c [ data ]-105', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.add_friend(data);
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);
    }

    // 批量添加好友，添加有成功有失败时不返回失败消息，只返回成功数量
    private query_307(full_id_list) {
        ////console.log('%c [ full_id_list ]-120', 'font-size:13px; background:pink; color:#bf2c9f;', full_id_list)
        netManager.Instance.sendMessage(307, { full_id_list });
    }
    private reply_307(data: any) {
        if (data.status === 1) {
            this.friend_view.getComponent(friend_view).removeAllSuggestFriendList();
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);
    }

    // 好友申请列表
    private query_310() {
        netManager.Instance.sendMessage(310, {});
    }
    private reply_310(data: any) {
        ////console.log('%c [ data ]-129', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        this._model.set_application_friend_list(data);
    }

    // 同意 好友申请
    private query_311(player_full_id) {
        netManager.Instance.sendMessage(311, {
            player_full_id: player_full_id,
        });
    }
    private reply_311(data: any) {
        // //console.log('%c [ data ]-139', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.agree_friend_request(data);
            this.query_310();
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);

    }

    // 批量同意 好友申请
    private query_312(full_id_list) {
        netManager.Instance.sendMessage(312, {
            full_id_list: full_id_list,
        });
    }
    private reply_312(data: any) {
        ////console.log('%c [ data ]-154', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.agree_friend_request_list(data);
            this.query_310();
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);

    }

    // 好友列表中追加好友
    private reply_313(data: any) {
        ////console.log('%c [ data ]-173', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.agree_friend_request_list(data);
        }
    }

    // 批量忽略好友申请，单个忽略也调用这个，忽略申请不会有失败
    private query_314(full_id_list) {
        netManager.Instance.sendMessage(314, {
            full_id_list: full_id_list,
        });
    }
    private reply_314(data: any) {
        ////console.log('%c [ data ]-176', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.agree_friend_request_list(data);
            this.query_310();
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);

    }

    // 黑名单列表
    private query_315(callback_315) {
        this._callback_315 = callback_315;
        netManager.Instance.sendMessage(315, {});
    }
    private reply_315(data: any) {
        ////console.log('%c [ data ]-189', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        this._model.set_black_list(data);
        if (this._callback_315 && Utils.getValueType(this._callback_315) === "function") {
            this._callback_315();
        }
        this._callback_315 = null;
    }

    // 加入黑名单
    private query_316(full_id_list) {
        netManager.Instance.sendMessage(316, {
            full_id_list: full_id_list,
        });
    }
    private reply_316(data: any) {
        ////console.log('%c [ data ]-199', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            this._model.add_black_list(data);
            this.query_300(null);
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);

    }

    // 移出黑名单
    private query_317(full_id_list) {
        netManager.Instance.sendMessage(317, {
            full_id_list: full_id_list,
        });
    }
    private reply_317(data: any) {
        ////console.log('%c [ data ]-216', 'font-size:13px; background:pink; color:#bf2c9f;', data)

        if (data.status === 1) {
            this._model.remove_black_list(data);
            this.query_315(null);
        }
        if (data.message !== "") ToastControllers.Instance.showToast(data.message);

    }
    //留言
    private query_318(text, to_full_id) {
        netManager.Instance.sendMessage(318, {
            text, to_full_id
        });
    }

    private reply_318(data) {
        //console.log('%c [ data ]-263', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        if (data.status === 1) {
            ToastControllers.Instance.showToast("已发送留言");
            this._model.leaveMessageMap.set(data.leave_message_info.full_id.player_id, data.leave_message_info.num);
        }

    }

    //留言次数
    private query_319(callback_319) {
        this._callback_319 = callback_319;
        netManager.Instance.sendMessage(319, {});
    }
    private reply_319(data) {
        if (data.status == 0) {
            ToastControllers.Instance.showToast(data.message);
            return;
        }
        if (this._callback_319 && Utils.getValueType(this._callback_319) === "function") {
            this._callback_319();
        }
        this._callback_319 = null;
        const leave_message_info_list = data.leave_message_info_list;
        for (let i = 0; i < leave_message_info_list.length; i += 1) {
            this._model.leaveMessageMap.set(leave_message_info_list[i].full_id.player_id, leave_message_info_list[i].num);
        }
    }

    private open_friend_view(val: boolean, index: number = 0) {
        if (val) {
            // if (!this.friend_view) {
            //     LoadUtils.Instance.resBundle.load("prefab/view/friend/friend_view",Prefab,(_err, prefab) => {
            // 			if(this.friend_view != null)
            //        		{
            //             	return;
            //         	}
            //             this.friend_view = instantiate(prefab);
            //             this.friend_view.setParent(find("MainCanvas/ui_layer"));
            // 			this.friend_view.getComponent(friend_view).init(index)
            //         }
            //     );
            // }
            if (this.friend_view != null) {
                this.friend_view.destroy();
                this.friend_view = null;
            }
            resources.load("prefabs/friend/item/friend_view", Prefab, (_err, prefab) => {
                if (this.friend_view != null) {
                    return;
                }
                this.friend_view = instantiate(prefab);
                this.friend_view.setParent(find("Canvas/ui_layer"));
                this.friend_view.active = true;
                this.friend_view.getComponent(friend_view).init(index)
            })
            // console.log('this.friend_view111:=======', this.friend_view)

            // if (!this.friend_view) {
            //     this.friend_view = find("Canvas/friend_view");
            // }
            // console.log('this.friend_view222:=======', this.friend_view)
            // this.friend_view.active = true;
            // console.log('this.friend_view333:=======', this.friend_view)
            // this.friend_view.getComponent(friend_view).init(index)
        } else {
            if (this.friend_view !== null) {
                this.friend_view.removeFromParent();
                this.friend_view.destroy();
                this.friend_view = null;
                // LoadUtils.Instance.resBundle.release("prefab/view/friend/friend_view");
                // this.friend_view.active = false;
            }
        }
    }
}
