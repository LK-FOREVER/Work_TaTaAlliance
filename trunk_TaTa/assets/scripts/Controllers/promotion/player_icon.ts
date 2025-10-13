import { _decorator, Component, Node ,Sprite,resources,SpriteFrame, Button} from 'cc';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('player_icon')
export class player_icon extends Component {
    icon_bg :Node= null;
    icon_content :Node= null;
    icon_choose :Node= null;
    icon_disable :Node= null;

    protected start(): void {
        this.icon_bg = this.node.getChildByName("icon_bg");
        this.icon_content = this.node.getChildByName("icon_content");
        this.icon_choose = this.node.getChildByName("icon_choose");
        this.icon_disable = this.node.getChildByName("icon_disable");
    }

    setIconContent(icon_name: string) {
        this.icon_content = this.node.getChildByName("icon_content");
        resources.load("images/goods/" + icon_name + "/spriteFrame", SpriteFrame, (err, spriteFrame) =>  {
            if (err) {
                console.log(err);
                return;
            }
            this.icon_content.getComponent(Sprite).spriteFrame =spriteFrame 
         })
    }
    
    setlocked(locked: boolean) {
        this.icon_choose = this.node.getChildByName("icon_choose");
        this.icon_disable = this.node.getChildByName("icon_disable");

        this.icon_disable.active = locked;
        this.icon_choose.active = false;
        if (!locked) {
           this.node.on(Button.EventType.CLICK, () => {
                    this.selected();
            });
        } 

    }

    selected()
    {
        EventManager.Instance.emit(EventConst.PLAYER_ICON_SELECT, this.node.name);
    }
}


