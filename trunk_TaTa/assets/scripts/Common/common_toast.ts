import { _decorator, Component,find, Label } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('common_toast')
export class common_toast extends Component {

    private show_time = 1;
    public init(msg:string)
    {
        find("txt_msg", this.node).getComponent(Label).string = msg;
        this.schedule(()=>{
            // 这里的 this 指向 component
            this.unscheduleAllCallbacks();
            this.node.removeFromParent();
            this.destroy();
        }, this.show_time, 0);
    }

}


