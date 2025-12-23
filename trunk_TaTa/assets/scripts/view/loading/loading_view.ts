import { _decorator, Component, Label, Node, ProgressBar } from 'cc';
import EventManager from '../../Common/EventManager';
import EventConst from '../../Utils/EventConst';
const { ccclass, property } = _decorator;

@ccclass('loading_view')
export class loading_view extends Component {
	@property(ProgressBar)
	progressBar: ProgressBar = null;
	@property(Node)
	labelNode: Node = null;
	@property(Label)
	centerLabel: Label = null;
	@property(Label)
	curResLabel: Label = null;
	@property(Label)
	totalResLabel: Label = null;
	@property(Label)
	downLoadSpeedLabel: Label = null;


	private _progress = 0;
	private _ishotupdate = false;
	private _timer = 0;
	private _preDownloadRes = 0;
	private _currentDownloadRes = 0;

	protected onLoad(): void {
		EventManager.Instance.on(EventConst.GAME_RES_START_LOAD, this.gameResStartLoad, this);
		EventManager.Instance.on(EventConst.LOAD_RES_PROGRESS, this.LoadResProgress, this);
	}
	protected onDestroy(): void {
		EventManager.Instance.off(EventConst.GAME_RES_START_LOAD, this.gameResStartLoad, this);
		EventManager.Instance.off(EventConst.LOAD_RES_PROGRESS, this.LoadResProgress, this);
	}
    public init() {
		this._ishotupdate = false;
		this.progressBar.progress = 0;
		
	}
	private gameResStartLoad(type) {
		this._progress = 0;
		this.progressBar.progress = 0;
		if(type === "startLoadRes") {
			this.labelNode.active = false;
			this.centerLabel.string = "加载资源中请不要关闭界面";
		} else if(type === "startHotUpdate") {
			this.labelNode.active = true;
			this._ishotupdate = true;
			this.centerLabel.string = "更新资源中请不要关闭界面";
		}
	}

	private setBytesToK_M_2(bytes) {
		if(bytes < 1000) {
			return (bytes / 1000).toFixed(2) + "K/S";
		} else {
			return (bytes / 1000000).toFixed(2) + "M/S";
		}
	}

	private LoadResProgress() {
		this._progress += 1.8;
		this.progressBar.progress = this._progress / 100;
	}

	protected update(dt: number): void {
		if(!this._ishotupdate) return;
		this._timer += dt;
		if(this._timer >= 1) {
			this._timer = 0;
			if(this._preDownloadRes === 0) {
				this.downLoadSpeedLabel.string = this.setBytesToK_M_2(this._currentDownloadRes);
				this._preDownloadRes = this._currentDownloadRes;
			} else {
				this.downLoadSpeedLabel.string = this.setBytesToK_M_2(this._currentDownloadRes - this._preDownloadRes);
			}
		}
	}
}


