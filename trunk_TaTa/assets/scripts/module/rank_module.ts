import { _decorator, instantiate, find, Prefab, Node, resources } from 'cc';
const { ccclass, property } = _decorator;

import EventConst from "../Utils/EventConst";
import netManager from "../Network/netManager";
import EventManager from "../Common/EventManager";
import rank_model from '../data/rank_model';
import rank_view from '../view/rank/rank_view';
import LoadUtils from '../Utils/LoadUtils';

@ccclass('rank_module')
export default class rank_module {
    private static _instance: rank_module = null;
    private _model: rank_model = null;
    private rank_view: Node = null;

    static get Instance() {
        if (this._instance === null) {
            this._instance = new this()
            this._instance._model = new rank_model();
        }
        return this._instance
    }
    public get_model() {
        return this._model
    }
    public init(): void {
        EventManager.Instance.on(EventConst.OPEN_RANK_VIEW, this.open_rank_view, this);
        EventManager.Instance.on(EventConst.QUERY_5901, this.query_5901, this);
        EventManager.Instance.on(EventConst.REPLY_5901, this.reply_5901, this);
        EventManager.Instance.on(EventConst.RESTART_INIT, this.restart_init, this);
    }

    private restart_init() {
        this.open_rank_view(false);
        this._model = null;
        this._model = new rank_model();
    }

    private open_rank_view(val: boolean, rankId: number = 1001) {
        if (val) {
            if (this.rank_view === null) {
                resources.load("prefabs/rank/rank_view", Prefab, (_err, prefab) => {
                    if (this.rank_view != null) {
                        return;
                    }
                    this.rank_view = instantiate(prefab);
                    this.rank_view.setParent(find("Canvas/ui_layer"));
                    this.rank_view.getComponent(rank_view).init(rankId);
                });
                // LoadUtils.Instance.resBundle.load("prefab/view/rank/rank_view",Prefab,(_err, prefab) => {
                // 		if(this.rank_view != null) {
                // 			return;
                // 		}
                // 		this.rank_view = instantiate(prefab);
                // 		this.rank_view.setParent(find("MainCanvas/ui_layer"));
                // 		this.rank_view.getComponent(rank_view).init(rankId);
                // 	}
                // );
            }
        } else {
            if (this.rank_view != null) {
                this._model.currentRankId = 0;
                this.rank_view.removeFromParent();
                this.rank_view.destroy();
                this.rank_view = null;
            }
        }
    }
    private query_5901(rank_id: number, page: number, num: number) {
        netManager.Instance.sendMessage(5901, { rank_id: rank_id, page: page, num: num });
    }

    private reply_5901(data) {
        if (data.status === 1) {
            if (this.rank_view && this.rank_view.isValid) {
                this.rank_view.getComponent(rank_view).reply5901(data);
            }
        }
    }
}

