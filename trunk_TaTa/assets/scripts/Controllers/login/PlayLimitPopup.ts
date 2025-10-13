import { _decorator, Component, Node,sys, native } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayLimitPopup')
export class PlayLimitPopup extends Component {
    protected onLoad(): void {
        let close_btn = this.node.getChildByName("close_btn");
        close_btn.on(Node.EventType.TOUCH_END, () => {
            console.log("关闭游戏");
            if (sys.os === sys.OS.ANDROID || sys.isNative) {
                    native.bridge.sendToNative('exit', 'test');
                }
        });
    }
}


