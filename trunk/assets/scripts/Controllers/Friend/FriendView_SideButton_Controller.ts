import { _decorator, Button, Component, Node, resources,SpriteFrame,Sprite } from 'cc';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('FriendView_SideButton_Controller')
export class FriendView_SideButton_Controller extends Component {

    Friend_List_Button: Node = null;
    Friend_Apply_Button: Node = null;
    Friend_Add_Button: Node = null;

    nodeList: Node[] = [];

    onLoad() {

        this.Friend_List_Button = this.node.getChildByName("Friend_List_Button");
        this.Friend_Apply_Button = this.node.getChildByName("Friend_Apply_Button");
        this.Friend_Add_Button = this.node.getChildByName("Friend_Add_Button");

         this.nodeList = [
            this.Friend_List_Button,
            this.Friend_Apply_Button,
            this.Friend_Add_Button,
        ];

        this.Friend_List_Button.on(Button.EventType.CLICK, () => {
            this.On_Button_Click(this.Friend_List_Button.name);
        });

        this.Friend_Apply_Button.on(Button.EventType.CLICK, () => {
            this.On_Button_Click(this.Friend_Apply_Button.name);
        });

        this.Friend_Add_Button.on(Button.EventType.CLICK, () => {
            this.On_Button_Click(this.Friend_Add_Button.name);
        });
    }

    Init_Buttons()
    {
        this.Friend_List_Button = this.node.getChildByName("Friend_List_Button");
        this.On_Button_Click(this.Friend_List_Button.name);
    }


    On_Button_Click(buttonName: string) {

        resources.load(`textures/button/onDisable/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
        this.nodeList.forEach((node) => {
        if (node.name !== buttonName) {
                node.getComponent(Sprite).spriteFrame = spriteFrame;
            }
        });
        })

        resources.load(`textures/button/onEnable/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            this.nodeList.forEach((node) => {
            if (node.name === buttonName) {
                node.getComponent(Sprite).spriteFrame = spriteFrame;
            }
        });
        })

        EventManager.Instance.emit(EventConst.FRIEND_CHANGE_PAGE, buttonName);
    }
}


