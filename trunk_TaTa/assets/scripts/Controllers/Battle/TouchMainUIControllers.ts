import { _decorator, Component, EventTouch,  NodeEventType } from 'cc';
const { ccclass, property } = _decorator;
//左滑进入战斗界面
@ccclass('TouchMainUIControllers')
export class TouchMainUIControllers extends Component {
    private _touchId: number;
    private static readonly defaultTouchId = -1;

    gobattle: boolean;

    public static readonly SingleTouchDownEvent: string = 'SingleTouchDownEvent';
    public static readonly SingleTouchMoveEvent: string = 'SingleTouchMoveEvent';
    public static readonly SingleTouchUpEvent: string = 'SingleTouchUpEvent';
    start()
    {
        this.init();
    }
 
    private init(): void
    {
        this.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this.resetTouchId();
    }

    private resetTouchId(): void
    { 
        this._touchId = TouchMainUIControllers.defaultTouchId;
    }
    private hasTouchId(): boolean
    { 
        return this._touchId != TouchMainUIControllers.defaultTouchId;
    }

    private onTouchStart(event: EventTouch):void
    { 
       if (!this.hasTouchId())
       {
           this._touchId = event.touch.getID();
            this.node.emit(TouchMainUIControllers.SingleTouchDownEvent, event.touch.getLocation());
       }
    }
    private onTouchMove(event: EventTouch):void
    { 
       if (this._touchId == event.touch.getID())
       {
            this.node.emit(TouchMainUIControllers.SingleTouchMoveEvent, event.touch.getLocation());
       }
    }
    private onTouchEnd(event: EventTouch):void
    { 
       if (this._touchId == event.touch.getID())
       {
            this.node.emit(TouchMainUIControllers.SingleTouchUpEvent, event.touch.getLocation());
           this.resetTouchId();
       }
    }
}
