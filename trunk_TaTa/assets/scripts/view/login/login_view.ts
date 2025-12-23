import { _decorator, Component, Label, find, Node, Button, EditBox, sys, Sprite, ProgressBar} from 'cc';
const { ccclass, property } = _decorator;

import netManager from "../../Network/netManager";
import EventManager from "../../Common/EventManager";
import EventConst from "../../Utils/EventConst";
import Utils from '../../Utils/Utils';
import login_module from '../../module/login_module';
import { Const } from '../../const/consts';
import { StorageManager } from '../../Managers/StorageManager';
import LoadUtils from '../../Utils/LoadUtils';
import { ToastControllers } from '../../Common/ToastControllers';

@ccclass('login_view')
export default class login_view extends Component {
	@property(ProgressBar)
	progressBar: ProgressBar = null;
	@property(Label)
	centerLabel: Label = null;

    private def_server:any = null;

	private _progress = 0;

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.CHANGE_SERVER,this.change_server,this);
		EventManager.Instance.off(EventConst.GAME_RES_START_LOAD, this.gameResStartLoad, this);
		EventManager.Instance.off(EventConst.LOAD_DATA_PROGRESS, this.LoadDataProgress, this);
    }

    onLoad() {
        EventManager.Instance.on(EventConst.CHANGE_SERVER,this.change_server,this);
		EventManager.Instance.on(EventConst.GAME_RES_START_LOAD, this.gameResStartLoad, this);
		EventManager.Instance.on(EventConst.LOAD_DATA_PROGRESS, this.LoadDataProgress, this);

        this.node.getChildByName("load_bg").active = false;
		this.node.getChildByName("mask").active = false;
		this.node.getChildByName("login_bg").active = true;
		this.node.getChildByName("login_bg_2").active = false;

        let btn_enter = find("btn_enter", this.node);
        let notice = find("notice", this.node);
        let select_server_btn = find("select_server_btn", this.node);

        this.set_def_sv();
        find("account_panel", this.node).active = true;
        find("account_panel/btn_confirm", this.node).on(Node.EventType.TOUCH_END, () => {
            
                let account = find("account_panel/input_account", this.node).getComponent(EditBox).textLabel.string;
                account = account.replace(/[\r\n\s]+/g, '');
                if(!account || account == "")
                {
                    ToastControllers.Instance.showToast("无效的帐号");
                    return;
                }
                if(!login_module.Instance.loginBtnCanClick) {
                    return;
                }
                login_module.Instance.loginBtnCanClick = false;
                Const.account = account;
                sys.localStorage.setItem("account",account);
                netManager.Instance.is_reconnect = true;
                netManager.Instance.init(Const.default_ip,Const.default_port);
            
        })

        let account_str = sys.localStorage.getItem("account");
        // account_str = "18168";
        if (account_str != null)
        {
            find("account_panel/input_account", this.node).getComponent(EditBox).textLabel.string = account_str;
            find("account_panel/input_account", this.node).getComponent(EditBox).placeholderLabel.string = account_str;
        }

		if(Const.is_platform) {
			find("account_panel", this.node).active = false;
		}
        else
        {
            btn_enter.active = false;
        }
		
		
        btn_enter.on(Node.EventType.TOUCH_END, () => {
            if(this.def_server == null || this.def_server.status == 0)
            {
                ToastControllers.Instance.showToast("服务器维护中,请选择其他服务器");
                return;
            }
            if(!login_module.Instance.loginBtnCanClick) {
                return;
            }
            login_module.Instance.loginBtnCanClick = false;

            StorageManager.Instance.saveLocalStorage(Const.account+"def_server",this.def_server);
            netManager.Instance.is_reconnect = true;
            netManager.Instance.init(this.def_server.ip,this.def_server.port);
            this.scheduleOnce(()=>
            {
                login_module.Instance.loginBtnCanClick = true;
            },5);

        })
        notice.on(Button.EventType.CLICK, () => {
            EventManager.Instance.emit(EventConst.OPEN_NOTICE_VIEW, true);
        });
        select_server_btn.on(Node.EventType.TOUCH_END, () => {
            EventManager.Instance.emit(EventConst.OPEN_SELECT_SERVER_VIEW, true);
        });
    }

    private change_server(server_data)
    {
        find("select_server_btn/server_name", this.node).getComponent(Label).string = server_data.svr_name;
        const tag_node = find("select_server_btn/tag_icon", this.node)
        if (server_data.status === 0) {
            // 维护
            tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_3")
        } else if (server_data.status === 1) {
            // 爆满
            tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_1")
        } else if (server_data.status === 2) {
            // 流畅
            tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_2")
        }
        this.def_server = server_data;
    }

    private set_def_sv()
    {
        this.def_server = StorageManager.Instance.getLocalStorageJson(Const.account+"def_server");
        if(this.def_server == null )
        {
            // 请求服务器信息
            fetch(Const.srv_list_url+`?random=${Date.now()}`).then((response: Response) => {
                return response.text()
            }).then((value) => {
                let serverData = JSON.parse(value);
                if(serverData && serverData.length > 0)
                {
                    let server_data = serverData[0].servers[0];

                    find("select_server_btn/server_name", this.node).getComponent(Label).string = server_data.svr_name;
                    const tag_node = find("select_server_btn/tag_icon", this.node)
                    if (server_data.status === 0) {
                        // 维护
                        tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_3")
                    } else if (server_data.status === 1) {
                        // 爆满
                        tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_1")
                    } else if (server_data.status === 2) {
                        // 流畅
                        tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_2")
                    }
                    this.def_server = server_data;
                }
            })
        }
        else
        {
            find("select_server_btn/server_name", this.node).getComponent(Label).string = this.def_server.svr_name;
            const tag_node = find("select_server_btn/tag_icon", this.node)
            if (this.def_server.status === 0) {
                // 维护
                tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_3")
            } else if (this.def_server.status === 1) {
                // 爆满
                tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_1")
            } else if (this.def_server.status === 2) {
                // 流畅
                tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_2")
            }
        }
    }
	gameResStartLoad(type) {
		this.node.getChildByName("mask").active = true;
		this.node.getChildByName("account_panel").active = false;
		this.node.getChildByName("load_bg").active = true;
		this.node.getChildByName("login_bg").active = false;
		this.node.getChildByName("login_bg_2").active = true;
		this._progress = 0;
		this.progressBar.progress = 0;
		if(type === "startLoadViewsPrefab") {
			this.centerLabel.string = "加载数据中请不要关闭界面";
		}
	}
	LoadDataProgress() {
		this._progress += 2;
		this.progressBar.progress = this._progress / 100;
	}
}
