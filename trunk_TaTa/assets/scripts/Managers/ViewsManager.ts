import { _decorator, Component, director, instantiate, Node, NodePool, Prefab } from 'cc';
import EventManager from '../Common/EventManager';
import EventConst from '../Utils/EventConst';
import LoadUtils from '../Utils/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('ViewsManager')
export class ViewsManager extends Component {

	private prefabMap: Map<number, Prefab> = new Map<number, Prefab>();
	private _data:any = null;
	//只存放大点的界面，弹窗/小界面没必要放
	private prefabResources = [
		{id: 10006, path: "prefab/common/common_top",is_prefab:true},//新手引导
		{id: 1021, path: "prefab/view/mail/mail_view"}
	]
	protected onLoad(): void {
		director.addPersistRootNode(this.node);
		this.prefabMap.clear();
	}
    public init(data) {
		this._data = data;
		this.do_preload();
	}

	private do_preload()
	{
		if(this.prefabResources.length == 0)
		{
			EventManager.Instance.emit(EventConst.LOAD_PREFABS_COMPLETE, this._data);
		}
		else
		{
			let pre_conf = this.prefabResources.shift();
			LoadUtils.Instance.resBundle.load(pre_conf.path, Prefab, (error, prefab)=>{
				if(pre_conf.is_prefab)
				{
					this.prefabMap.set(pre_conf.id, prefab);
				}
				else
				{
					const view = instantiate(prefab);
					this.node.addChild(view);
					view.active = false;
					view.name = pre_conf.id + "";
					EventManager.Instance.emit(EventConst.LOAD_DATA_PROGRESS);
				}
				this.scheduleOnce(()=>{
					this.do_preload();
				});
				
			});
		}
	}
	public putView(viewNode: Node) {
		if(!viewNode) {
			console.log("putView 无此节点")
			return;
		}
		viewNode.removeFromParent();
		this.node.addChild(viewNode);
		viewNode.active = false;
	}
	public getView(func_id: number) {
		const view = this.node.getChildByName(func_id + "");
		if(!view) {
			console.log("getView null-->", func_id);
			return;
		}
		view.removeFromParent();
		return view;
	}
	public getPrefab(func_id: number):Prefab {
		return this.prefabMap.get(func_id);
	}

	public destroyAllChildren() {
		this.node.destroyAllChildren();
		this.prefabMap.clear();
	}
}


