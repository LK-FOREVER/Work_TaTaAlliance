import { _decorator, Component, Label, Node, SpriteFrame, Sprite, resources, find, RichText, Button } from 'cc';
import { GameData } from '../../Common/GameData';
import { LoadUtils } from '../../Common/LoadUtils';
import { enemyInfoController } from './enemyInfoController';
import { TextUtils } from '../../Common/TextUtils';
const { ccclass, property } = _decorator;

@ccclass('enemyItemController')
export class enemyItemController extends Component {
    enemy_info: any = null!
    enemy_icon: Node = null!
    enemy_item_info: Node = null!
    enemy_name: Node = null!
    enemy_item_mask: Node = null!
    init(enemy_info) {
        this.enemy_info = enemy_info
        this.enemy_icon = this.node.getChildByName("mask").getChildByName("enemy_icon")
        this.enemy_item_info = this.node.getChildByName("enemy_item_info")
        this.enemy_name = this.enemy_item_info.getChildByName("enemy_name")
        this.enemy_item_mask = this.node.getChildByName("enemy_item_mask")

        if(this.enemy_info.id == 101){
            this.enemy_icon.setScale(2.34, 3);
        }else if(this.enemy_info.id == 102){
            this.enemy_icon.setScale(2.76, 2); 
        }else if(this.enemy_info.id == 103){
            this.enemy_icon.setScale(2.9, 2); 
        }else {
            this.enemy_icon.setScale(3, 3);
        }

        this.node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.staff.find(item => item.name == `staff_icon_bg_new_4`);
        resources.load("textures/enemys/" + this.enemy_info.id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.enemy_icon.getComponent(Sprite).spriteFrame = spriteFrame;
        })

        this.enemy_icon.on(Node.EventType.TOUCH_END, () => {
            const canvas = find('Canvas')
            const enemy_info_view = canvas.getChildByName("enemy_info_view")

            // 敌人页签
            enemy_info_view.getComponent(enemyInfoController).init(this.enemy_info)
            enemy_info_view.active = true
        })
        this.updateUI()
    }
    updateUI() {
        this.enemy_name.getComponent(Label).string = this.enemy_info.name
        this.enemy_item_mask.active = false
    }
}


