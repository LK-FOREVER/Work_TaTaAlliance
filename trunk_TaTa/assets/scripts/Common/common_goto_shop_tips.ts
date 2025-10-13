import { _decorator, Button, Component, director, find, Label, Node } from 'cc';
import { MessageManager } from '../Managers/MessageManager';
import { BattleManager } from '../Managers/BattleManager';
const { ccclass, property } = _decorator;

@ccclass('common_goto_shop_tips')
export class common_goto_shop_tips extends Component {
    tip_goods_name: Node = null;
    confirm: Node = null;
    cancel: Node = null;
    initUI(goods_name: string) {
        this.tip_goods_name = this.node.getChildByName("container").getChildByName("tip_text_box").getChildByName("tip_goods_name")
        this.confirm = this.node.getChildByName("container").getChildByName("confirm")
        this.cancel = this.node.getChildByName("container").getChildByName("cancel")

        this.confirm.on(Button.EventType.CLICK, this.confirm_handler, this)
        this.cancel.on(Button.EventType.CLICK, this.close_handler, this)

        this.tip_goods_name.getComponent(Label).string = goods_name;
    }
    confirm_handler() {
        if (director.getScene().name == "Battle") {
            BattleManager.Instance.audioMgr.stopMusic();
            BattleManager.Instance.audioMgr.stopAllSound();
            director.loadScene("Main UI",()=>{
                const Canvas = find("Canvas");
                Canvas.getChildByName("shop_view").active = true;
            });
        } else {
            const Canvas = find("Canvas");
            Canvas.getChildByName("shop_view").active = true;
            Canvas.getChildByName("equip_view").active = false;
            this.node.destroy();
        }
        
        
        //Canvas.getComponent(MessageManager).openMessage("Go to the shop");
    }
    close_handler(){
        this.node.destroy();
    }
}


