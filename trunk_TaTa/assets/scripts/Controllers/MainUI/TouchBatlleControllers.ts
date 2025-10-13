import { _decorator, Component, EventTouch, Input, input, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;
//左滑进入战斗界面
@ccclass('TouchBatlleControllers')
export class TouchBatlleControllers extends Component {
    private _touchId: number;
    private clickNodeList: Node[] = []
    // 1为销毁，0为隐藏
    closeStatus: number = 0
    private static readonly defaultTouchId = -1;

    gobattle: boolean;

    public static readonly SingleTouchDownEvent: string = 'SingleTouchDownEvent';
    public static readonly SingleTouchMoveEvent: string = 'SingleTouchMoveEvent';
    public static readonly SingleTouchUpEvent: string = 'SingleTouchUpEvent';

    start() {
        this.init();
    }

    init(): void {
        this.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this.resetTouchId();

    }
    resetTouchId(): void {
        this._touchId = TouchBatlleControllers.defaultTouchId;
    }
    hasTouchId(): boolean {
        return this._touchId != TouchBatlleControllers.defaultTouchId;
    }

    onTouchStart(event: EventTouch): void {
        // console.log("touchStart")
        if (!this.hasTouchId()) {
            this._touchId = event.touch.getID();
            // console.log(this._touchId);
            this.node.emit(TouchBatlleControllers.SingleTouchDownEvent, event.touch.getLocation());
        }
    }
    
    onTouchMove(event: EventTouch): void {
        if (this._touchId == event.touch.getID()) {
            // console.log(this._touchId);
            this.node.emit(TouchBatlleControllers.SingleTouchMoveEvent, event.touch.getLocation());
        }
    }
    onTouchEnd(event: EventTouch): void {
        console.log("onTouchEnd")
        if (this._touchId == event.touch.getID()) {
            // console.log(this._touchId);
            this.node.emit(TouchBatlleControllers.SingleTouchUpEvent, event.touch.getLocation());
            this.resetTouchId();
        }
    }
}




