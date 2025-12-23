import { _decorator, instantiate, find, Prefab, Node } from 'cc';
const {ccclass, property} = _decorator;

import EventConst from "../Utils/EventConst";
import EventManager from "./../Common/EventManager";
import mainui_model from '../data/mainui_model';
import LoadUtils from '../Utils/LoadUtils';

@ccclass('mainui_module')
export default class mainui_module {
    private static _instance: mainui_module = null;
    public mainui_view: Node = null;//主UI界面
	public set_view: Node = null;
	public bzcz_view: Node = null;
	public other_way_view: Node = null;
	private _model: mainui_model = null;
 
    static get Instance() {
        if (this._instance === null) {
        	this._instance = new this();
			this._instance._model = new mainui_model();
        }
        return this._instance
    }
	public get_model() {
        return this._model;
    }
    public getMainUIRoot()
    {
        return this.mainui_view;
    }
    public init():void
    {
        EventManager.Instance.on(EventConst.OPEN_MAINUI_VIEW,this.open_manui_view,this);

		EventManager.Instance.on(EventConst.RESTART_INIT, this.restart_init, this);
    }

	private restart_init()
    {
        this.open_manui_view(false);
		this._model = null;
        this._model = new mainui_model();
    }
    
    private open_manui_view(val:boolean)
    {
        if(val)
        {
            if(this.mainui_view == null)
            {
                LoadUtils.Instance.resBundle.load("prefab/view/mainui/mainui_view", Prefab, (_err,prefab) =>
                {
                    if(this.mainui_view != null)
                    {
                        return;
                    }
                    this.mainui_view = instantiate(prefab);
                    this.mainui_view.setParent(find("MainCanvas/ui_layer"));
                    this.mainui_view.setSiblingIndex(0);
					EventManager.Instance.emit(EventConst.OPEN_LOADING_VIEW,false);
                    EventManager.Instance.emit(EventConst.OPEN_LOGIN_VIEW,false);
                });
            }
            else
            {
                EventManager.Instance.emit(EventConst.OPEN_LOGIN_VIEW,false);
            }
        }
        else
        {
            if(this.mainui_view != null)
            {
                this.mainui_view.removeFromParent();
                this.mainui_view.destroy();
                this.mainui_view = null;
				LoadUtils.Instance.resBundle.release("prefab/view/mainui/mainui_view");
            }
        }
    }
	
	public unable_marquee()
	{
		this._model.can_show_marquee = false;
		const marqueeNode = find("MainCanvas/top_layer").getChildByName("marqueeNode")
		if(marqueeNode) {
			marqueeNode.destroy();
		}
	}
}