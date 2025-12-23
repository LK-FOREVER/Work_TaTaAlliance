import {
    _decorator,
    Component,
    director,
    Label,
} from "cc";
import { LoadUtils } from "../Common/LoadUtils";
import { EnterManagers } from "../MoYang/EnterManagers";
import { TextUtils } from "../Common/TextUtils";
import EventManager from "../Common/EventManager";
import { EventConst } from "../Common/EventConst";
import login_module from "../module/login_module";
import player_base_module from "../module/player_base_module";
import mainui_module from "../module/mainui_module";
import friend_module from "../module/friend_module";
import chat_module from "../module/chat_module";
import notice_module from "../module/notice_module";
// import mail_module from "../module/mail_module";
import rank_module from "../module/rank_module";
const { ccclass, property } = _decorator;

@ccclass("loadManagers")
export class loadManagers extends Component {
    @property(Label)
    percent: Label | null = null;

    private loadCount: number = 0;

    onLoad() {
        director.addPersistRootNode(this.node);
        EventManager.Instance.on(EventConst.LOAD_RES_SUCCESS, this.loadSuccess, this);
        EnterManagers.onEnter();
        this.init_game_module();
        TextUtils.Instance.load();
        LoadUtils.Instance.load();
        console.log("============loadManagers onLoad==========");
    }

    onDestroy(): void {
        EventManager.Instance.off(EventConst.LOAD_RES_SUCCESS, this.loadSuccess, this);
    }
    /**
     *
     *注册模块控制器
    */
    private init_game_module() {
        login_module.Instance.init();
        player_base_module.Instance.init();
        mainui_module.Instance.init();
        friend_module.Instance.init();
        chat_module.Instance.init();
        notice_module.Instance.init();
        // mail_module.Instance.init();
        rank_module.Instance.init();
    }

    private loadSuccess() {
        this.loadCount++;
        if (this.loadCount >= 2) {
            director.preloadScene(
                "Login",
                (completedCount: number, totalCount: number, item: any) => { },
                () => {
                    console.log("登录界面预加载完成");
                    director.loadScene("Login");
                }
            );
        }
    }
}
