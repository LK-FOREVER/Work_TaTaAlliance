import { _decorator, instantiate, find, sys, Prefab } from "cc";
const { ccclass, property } = _decorator;
import EventManager from '../Common/EventManager';
import EventConst from '../Utils/EventConst';
import Utils from "../Utils/Utils";
import { md5 } from "./../Network/MD5";
import netManager from "./../Network/netManager";
import { Async } from "../Utils/Async";
import { Const } from "../const/consts";
import { StorageManager } from "../Managers/StorageManager";
import LoadUtils from "../Utils/LoadUtils";
import { ToastControllers } from "../Common/ToastControllers";
import { GameData } from "../Common/GameData";

@ccclass("login_module")
export default class login_module {

    private loadCount: number = 0;
    private static _instance: login_module = null;
    private login_view = null; //登录界面
    private select_server_view = null; //服务器选择界面

    public loginBtnCanClick = true;

    static get Instance() {
        if (this._instance === null) {
            this._instance = new this();
        }
        return this._instance;
    }
    public init(): void {
        EventManager.Instance.on(EventConst.QUERY_101, this.query_101, this);
        EventManager.Instance.on(EventConst.REPLY_101, this.handler_101, this);
        EventManager.Instance.on(EventConst.REPLY_102, this.handler_102, this);
        EventManager.Instance.on(EventConst.REPLY_103, this.handler_103, this);
        EventManager.Instance.on(EventConst.QUERY_265, this.query_265, this);
        EventManager.Instance.on(EventConst.REPLY_265, this.handler_265, this);
        EventManager.Instance.on(EventConst.QUERY_266, this.query_266, this);

        EventManager.Instance.on(EventConst.OPEN_LOGIN_VIEW, this.open_login_view, this);
        EventManager.Instance.on(EventConst.OPEN_SELECT_SERVER_VIEW, this.open_select_server_view, this);
        // EventManager.Instance.on(EventConst.LOAD_RES_SUCCESS,this.loadSuss,this);
        EventManager.Instance.on(EventConst.RESTART_INIT, this.restart_init, this);
    }

    private restart_init() {
        this.open_login_view(false);
        this.open_select_server_view(false);
        this.loginBtnCanClick = true;
    }

    private open_login_view(val: boolean) {
        if (val) {
            if (this.login_view == null) {
                LoadUtils.Instance.resBundle.load("prefab/view/login/login_view", Prefab, (_err, prefab) => {
                    if (this.login_view != null) {
                        return
                    }
                    this.login_view = instantiate(prefab);
                    this.login_view.setParent(find("MainCanvas/ui_layer"));

                    EventManager.Instance.emit(EventConst.OPEN_LOADING_VIEW, false);
                }
                );
            }
        } else {
            if (this.login_view != null) {
                this.login_view.removeFromParent();
                this.login_view.destroy();
                this.login_view = null;
                LoadUtils.Instance.resBundle.release("prefab/view/login/login_view");
            }
        }
    }
    private open_select_server_view(val: boolean) {
        if (val) {
            if (this.select_server_view == null) {
                LoadUtils.Instance.resBundle.load("prefab/view/login/select_server_view", Prefab, (_err, prefab) => {
                    if (this.select_server_view != null) {
                        return
                    }
                    this.select_server_view = instantiate(prefab);
                    this.select_server_view.setParent(find("MainCanvas/ui_layer"));
                    Utils.getPopCommonEffect(this.select_server_view);
                });
            }
        } else {
            if (this.select_server_view != null) {
                this.select_server_view.removeFromParent();
                this.select_server_view.destroy();
                this.select_server_view = null;
                LoadUtils.Instance.resBundle.release("prefab/view/login/select_server_view");
            }
        }
    }
    loadSuss() {
        this.loadCount++;
        // //console.log("count", this.loadCount);
        if (this.loadCount >= 2) {
            //所有资源加载完毕，在这里进行转跳
            if (sys.isNative) {
                this.open_login_view(true);
            } else {
                this.open_login_view(true);
            }
        }
    }
    private handler_101(data: any) {
        if (data.status == 1) {
            let aunt_info = data.player_to_login_list[0];
            this.query_103(aunt_info.player_id, aunt_info.srvno);
            GameData.userData.srvno = aunt_info.srvno; //服务器编号
        } else if (data.status == 2) {
            //2还没有创建角色
            this.query_102();
        }
        else {
            ToastControllers.Instance.showToast(data.message);
        }
    }
    private handler_102(data: any) {
        if (data.status != 1) {
            ToastControllers.Instance.showToast(data.message);
            return;
        }
        this.query_103(data.player_id, data.srvno);
    }
    private handler_103(data: any) {
        if (data.status != 1) {
            login_module.Instance.loginBtnCanClick = true;
            ToastControllers.Instance.showToast(data.message);
            return;
        }
        // 跳过弹窗
        // const st = StorageManager.Instance.getLocalStorageJson(Const.account + "skiptip");
        // const now = Utils.getTodayTimestamp();
        // let skipTipInfo;
        // if(st === null) {
        // 	skipTipInfo = {
        // 		isSkip: 0,
        // 		time: now
        // 	}
        // 	StorageManager.Instance.saveLocalStorage(Const.account + "skiptip", skipTipInfo);
        // } else {
        // 	const preTime = st.time;
        // 	if(!Utils.isSameDay(now, preTime)) {
        // 		skipTipInfo = {
        // 			isSkip: 0,
        // 			time: now
        // 		}
        // 		StorageManager.Instance.saveLocalStorage(Const.account + "skiptip", skipTipInfo);
        // 	}

        // }
        //请求
        // EventManager.Instance.emit(EventConst.GAME_RES_START_LOAD, "startLoadViewsPrefab");
        const tasks = [];
        EventManager.Instance.emit(EventConst.QUERY_265);
        tasks.push((cb) => {
            EventManager.Instance.emit(EventConst.QUERY_300, () => { //好友列表
                cb();
            });
        });
        // tasks.push((cb)=>{
        // 	EventManager.Instance.emit(EventConst.QUERY_315, ()=>{ //黑名单
        // 		EventManager.Instance.emit(EventConst.LOAD_DATA_PROGRESS);
        // 		cb();
        // 	});
        // });
        tasks.push((cb) => {
            EventManager.Instance.emit(EventConst.QUERY_209, () => { //获取玩家配置信息等
                cb();
            });
        });
        // tasks.push((cb) => {
        //     EventManager.Instance.emit(EventConst.QUERY_100001, () => { //邮件
        // 		EventManager.Instance.emit(EventConst.LOAD_DATA_PROGRESS);
        //         cb();
        //     });
        // });
        tasks.push((cb) => {
            EventManager.Instance.emit(EventConst.QUERY_400, () => { //历史聊天记录
                cb();
            });
        });

        Async.waterfall(tasks, () => {
            EventManager.Instance.emit(EventConst.QUERY_204);
            EventManager.Instance.emit(EventConst.NETWORK_CONNECT_SUCCESS); //网络连接成功
        });
    }

    private handler_265(data: any) {
        // 收到服务器返回的客户端数据
        if (data.client_data) {
            console.log("收到服务器返回的客户端数据111:", data);
            console.log("收到服务器返回的客户端数据222:", data.client_data);
            GameData.client_data = data;
            GameData.saveData(true);
        }
    }

    private query_103(player_id: number, srvno: any) {
        let data = {
            player_id: player_id,
            srvno: srvno,
            device_type: "web", //设备类型
            device_id: "device_id", //设备id
            device_code: 1, //设备唯一识别码
            app_name: "App_Name", //app名字
            package_name: "Package_Name", //包名
            package_version: "Package_Version", //包版本
            os_name: "platform", //系统名称platform
            os_ver: "platform", //系统版本号
            resolution: "1920x1080", //分辨率
            carrier_name: "sss", //运营商名称
            network_name: "wifi", //网络名称
        };
        netManager.Instance.sendMessage(103, data);
    }
    private query_102() {
        let data = {
            device_type: "web", //设备类型
            device_id: "device_id", //设备id
            device_code: "1", //设备唯一识别码
            app_name: "App_Name", //app名字
            package_name: "Package_Name", //包名
            package_version: "Package_Version", //包版本
            os_name: "platform", //系统名称platform
            os_ver: "platform", //系统版本号
            resolution: "1920x1080", //分辨率
            carrier_name: "sss", //运营商名称
            network_name: "wifi", //网络名称
        };
        netManager.Instance.sendMessage(102, data);
    }
    private query_101(account_str: string) {
        if (account_str == null) {
            // let account_str = account"18182";
            // account_str = "18168";
            account_str = sys.localStorage.getItem("account");
            if (account_str == null) {
                account_str = Math.round(Math.random() * 100000) + "";
            }

        }
        sys.localStorage.setItem("account", account_str);
        let timestamp = Math.floor(new Date().getTime() / 1000);
        let sign = md5(
            account_str + timestamp + "06a3dfa704c921091af91c9e43a2d126"
        );

        let data = {
            account: account_str,
            timestamp: timestamp,
            sign: sign,
            check_guid_key: "7D957B08-7E8B-4766-A043-A726B645A5D0"
        };
        netManager.Instance.sendMessage(101, data);
    }
    private query_265() {
        netManager.Instance.sendMessage(265, {});
    }
    private query_266(data: any) {
        // client_data.version = client_data.version;
        // client_data.is_new = client_data.is_new;
        // client_data.user_data.
        netManager.Instance.sendMessage(266, data);

    }
}
