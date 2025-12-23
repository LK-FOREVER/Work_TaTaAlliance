import { _decorator, Component, find, instantiate, Node, Prefab } from 'cc';
import EventManager from '../Common/EventManager';
import EventConst from '../Utils/EventConst';
import notice_model from '../data/notice_model';
import Utils from '../Utils/Utils';
import { Const } from '../const/consts';
import LoadUtils from '../Utils/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('notice_module')
export default class notice_module extends Component {
    private static _instance: notice_module = null;
    private notice_view: Node = null;
	private _model: notice_model = null;
	private _callback_notice: Action = null;

    static get Instance() {
        if (this._instance === null) {
            this._instance = new this();
			this._instance._model = new notice_model();
        }
        return this._instance
    }

	public get_model() {
        return this._model
    }

    public init(): void {
        EventManager.Instance.on(EventConst.OPEN_NOTICE_VIEW, this.open_notice_view, this);
		EventManager.Instance.on(EventConst.QUERY_NOTICE, this.query_notice, this);
        EventManager.Instance.on(EventConst.RESTART_INIT, this.restart_init, this);
    }

    private restart_init()
    {
        this.open_notice_view(false);
        this._model = null;
        this._model = new notice_model();
        this._callback_notice = null;
    }

    private open_notice_view(val: boolean) {
        if (val) {
            if (!this.notice_view) {
                LoadUtils.Instance.resBundle.load("prefab/view/notice/notice_view", Prefab, (_err, prefab) => {
                    if(this.notice_view != null)
                    {
                        return;
                    }
                    this.notice_view = instantiate(prefab);
                    this.notice_view.setParent(find("MainCanvas/ui_layer"));
                    Utils.getPopCommonEffect(this.notice_view)
                });
            }
        }
        else {
            if (this.notice_view !== null) {
                this.notice_view.removeFromParent();
                this.notice_view.destroy();
                this.notice_view = null;
                LoadUtils.Instance.resBundle.release("prefab/view/notice/notice_view",Prefab);
            }
        }
    }

	private query_notice(callback_notice) {
		this._callback_notice = callback_notice;
		fetch(Const.notice_url+`?random=${Date.now()}`).then((response: Response) => {
            return response.text()
        }).then((value) => {
            ////console.log('%c [ value ]-60', 'font-size:13px; background:pink; color:#bf2c9f;', value)
            this._model.noticeData = JSON.parse(value)
		 	this._callback_notice && this._callback_notice();
			this._callback_notice = null;
        })
	}
}


