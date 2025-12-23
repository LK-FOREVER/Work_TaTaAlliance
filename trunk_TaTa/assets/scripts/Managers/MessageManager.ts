import { _decorator, Component,  instantiate, Prefab, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MessageManager')
export class MessageManager extends Component {
    @property(Prefab)
    message: Prefab = null
    openMessage(content, title?){
        // 实例化预制体 instantiate
        let staff_text_box = instantiate(this.message)
        staff_text_box.setParent(this.node)
        if(title !== undefined) staff_text_box.getChildByName("message_title").getComponent(Label).string = title
        staff_text_box.getChildByName("message_content").getComponent(Label).string = content
    }

    update(deltaTime: number) {
        
    }
}


