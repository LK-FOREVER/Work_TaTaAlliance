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
const { ccclass, property } = _decorator;

@ccclass("loadManagers")
export class loadManagers extends Component {
    @property(Label)
    percent: Label | null = null;

    private loadCount: number = 0;

    onLoad() {
        director.addPersistRootNode(this.node);
        EventManager.Instance.on(EventConst.LOAD_RES_SUCCESS,this.loadSuccess,this);
        EnterManagers.onEnter();
        TextUtils.Instance.load();
        LoadUtils.Instance.load();
    }

    onDestroy(): void {
        EventManager.Instance.off(EventConst.LOAD_RES_SUCCESS,this.loadSuccess,this);
    }

    private loadSuccess() {
        this.loadCount++;
        if (this.loadCount >= 2) {
            director.preloadScene(
                "Login",
                (completedCount: number, totalCount: number, item: any) => {},
                () => {
                    console.log("登录界面预加载完成");
                    director.loadScene("Login");
                }
            );
        }
    }
}
