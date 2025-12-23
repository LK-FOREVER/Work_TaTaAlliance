import { _decorator, CCFloat, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('common_touch')
export default class common_touch extends Component {
	@property(CCFloat)
	longPressDuration: number =  1.0; //秒
	private _data = null;
	private _touchCallback =  null; //单击
	private _longTouchCallback =  null;//长按

	private _startTime: number = 0;

	protected onLoad(): void {
		this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
	}
	protected onDestroy(): void {
		this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
	}
	public init(data, touchCallback, longTouchCallback?) {
		this._data = data;
		this._touchCallback = touchCallback;
		this._longTouchCallback = longTouchCallback;
	}
	onTouchStart(event) {
        this._startTime = Date.now();
		if(this._longTouchCallback) {
			this.scheduleOnce(this.longTouchCallback, this.longPressDuration);
			
		}
    }
	longTouchCallback() {
		this._longTouchCallback(this._data);
	}
	onTouchEnd(event) {
		const duration = Date.now() - this._startTime;
		if (duration < this.longPressDuration * 1000) {
			this._longTouchCallback && this.unschedule(this.longTouchCallback);
			this._touchCallback && this._touchCallback(this._data);
        }

	}
	onTouchCancel(event) {
		this.unschedule(this.longTouchCallback);
	}
}


