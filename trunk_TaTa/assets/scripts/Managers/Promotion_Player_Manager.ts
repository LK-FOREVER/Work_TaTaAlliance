import { _decorator, Component, Node, Label, Color, Button, SpriteFrame, resources, Sprite, NodeEventType } from 'cc';
import { PlayerMessageManager } from './PlayerMessageManager';
const { ccclass, property } = _decorator;

@ccclass('Promotion_Player_Manager')
export class Promotion_Player_Manager extends Component {
   promotion_box : Node = null;
   player_message_box : Node = null;
   promotion_button : Node = null;
   player_message_button : Node = null;

   on_button_enable_button:SpriteFrame = null;
   on_button_disable_button:SpriteFrame = null;

   promotion_close: Node = null
   

   protected start(): void {
       this.initUI();
   }

   initUI()
   {
        this.promotion_box = this.node.getChildByName("promotion_box");
        this.player_message_box = this.node.getChildByName("player_message_box");
        this.promotion_button = this.node.getChildByName("promotion_button");
        this.player_message_button = this.node.getChildByName("player_message_button");
        this.promotion_close = this.node.getChildByName("promotion_close");
        this.openPromotionBox();
    
        this.promotion_button.on(Button.EventType.CLICK, () => {
             this.openPromotionBox();
        });
    
        this.player_message_button.on(Button.EventType.CLICK, () => {
            this.openPlayerMessageBox();
        });

         //加载按钮背景
        resources.load(`textures/button/onDisable/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.on_button_disable_button = spriteFrame;
             this.player_message_button.getComponent(Sprite).spriteFrame = this.on_button_disable_button;
        })

          //加载按钮背景
        resources.load(`textures/button/onEnable/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.on_button_enable_button = spriteFrame;
            this.promotion_button.getComponent(Sprite).spriteFrame = this.on_button_enable_button;
        })

        this.promotion_close.on(NodeEventType.TOUCH_END, () => {
            this.node.active = false;
        })

        this.player_message_box.getComponent(PlayerMessageManager).clear_icons();
        this.player_message_box.getComponent(PlayerMessageManager).instantiate_icons();
   }

   //打开晋升界面
   openPromotionBox() {
        this.promotion_box.active = true;
        this.player_message_box.active = false;
        this.promotion_button.getChildByName("Label").getComponent(Label).color = new Color(255, 255, 255, 255);
        this.player_message_button.getChildByName("Label").getComponent(Label).color = new Color(251, 233, 183, 255);
        this.promotion_button.getComponent(Sprite).spriteFrame = this.on_button_enable_button;
        this.player_message_button.getComponent(Sprite).spriteFrame = this.on_button_disable_button;
   }

   //打开玩家信息界面
   openPlayerMessageBox() {
        this.promotion_box.active = false;
        this.player_message_box.active = true;
        this.promotion_button.getChildByName("Label").getComponent(Label).color = new Color(251, 233, 183, 255);
        this.player_message_button.getChildByName("Label").getComponent(Label).color = new Color(255, 255, 255, 255);
        this.promotion_button.getComponent(Sprite).spriteFrame = this.on_button_disable_button;
        this.player_message_button.getComponent(Sprite).spriteFrame = this.on_button_enable_button;
   }
}


