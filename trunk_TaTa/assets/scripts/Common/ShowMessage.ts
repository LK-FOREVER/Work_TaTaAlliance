import { _decorator, Component, Node, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowMessage')
export class ShowMessage extends Component {
    message_title:Node = null
    message_close:Node = null
    init(message:string) {
        this.message_title = this.node.getChildByName("message_title")
        const message_content = this.node.getChildByName("message_content").getComponent(Label)
        message_content.string = message
        this.message_close = this.node.getChildByName("mask_destroy_bg")
        this.message_close.on(Button.EventType.CLICK, ()=>{
            this.node.destroy()
        });
    }
}
