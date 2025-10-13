import { _decorator, Button, Color, Component, instantiate, Label, Node, Prefab, RichText, sp, Sprite } from 'cc';
import { GameData } from '../../Common/GameData';
import { LoadUtils } from '../../Common/LoadUtils';
import { Utils } from '../../Common/Utils';
import { staffController } from '../Staff/staffController';
import { TextUtils } from '../../Common/TextUtils';
import { staffAttrController } from '../Staff/staffAttrController';
const { ccclass, property } = _decorator;

@ccclass('enemyInfoController')
export class enemyInfoController extends Component {
    enemy_name: Node = null!;
    close_btn: Node = null!;
    enemy_info_container: Node = null!;
    enemy_introduce: Node = null!;
    enemy_lv_attr_content: Node = null!;
    enemy_info: any = null!;

    init(enemy_info) {
        this.enemy_info = enemy_info
        this.enemy_name = this.node.getChildByName("enemy_title").getChildByName("enemy_name")
        this.close_btn = this.node.getChildByName("close_btn")
        this.enemy_info_container = this.node.getChildByName("enemy_info_container")
        this.enemy_introduce = this.node.getChildByName("enemy_introduce")
        this.enemy_lv_attr_content = this.node.getChildByName("enemy_lv_attr").getChildByName("view").getChildByName("content")

        this.close_btn.on(Button.EventType.CLICK, this.close_handler, this)

        this.updateUI();
    }

    updateUI() {
        this.update_enemy_name();
        this.update_enemy_info_container();
        this.update_enemy_introduce();
    }

    update_enemy_name() {
        this.enemy_name.getComponent(Label).string = this.enemy_info.name;
    }

    update_enemy_info_container() {
        const enemy = this.enemy_info_container.getChildByName("enemy");
        if (this.enemy_info.id == 101) {
            enemy.setScale(1, 1);
        }else if (this.enemy_info.id == 103) {
            enemy.setScale(2, 2);
        }else if (this.enemy_info.id == 102) {
            enemy.setScale(3, 3);
        }else{
            enemy.setScale(4, 4); 
        }
        if (this.enemy_info.id == 102 || this.enemy_info.id == 104 || this.enemy_info.id == 117 || this.enemy_info.id == 118 || this.enemy_info.id == 119) {
            LoadUtils.Instance.changeEnemysBones(this.enemy_info.id,enemy,"idle");
        }else{
            LoadUtils.Instance.changeEnemysBones(this.enemy_info.id,enemy,"walk");
        }
    }

    update_enemy_introduce() {
        this.enemy_introduce.getChildByName("text").getComponent(Label).string = this.enemy_info.desc;
    }

    close_handler() {
        this.node.active = false;
    }
}
