import { _decorator, Button, Component, Label, Node, NodeEventType, resources, Sprite, SpriteFrame } from 'cc';
import { GameData } from '../../Common/GameData';
import { BattleManager } from '../../Managers/BattleManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyDescControllers')
export class EnemyDescControllers extends Component {
    close: Node;
    title_txt: Node;
    desc: Node;
    enemyname: Node;
    enemy: Node;
    title: Node;
    mask: Node;

    init(baseinfo,enemy_id){
        let panel = this.node.getChildByName("panel");
        this.close = panel.getChildByName("close");
        this.close.on(Button.EventType.CLICK, this.closeSelf, this);
        this.title = panel.getChildByName("title");
        this.title_txt = this.title.getChildByName("title_txt");
        let name_bg = panel.getChildByName("name_bg");
        this.enemyname = name_bg.getChildByName("name");
        let desc_bg = panel.getChildByName("desc_bg");
        this.desc = desc_bg.getChildByName("desc");
        this.enemy = panel.getChildByName("enemy");
        this.mask = this.node.getChildByName("mask_bg");

        this.mask.on(NodeEventType.TOUCH_END, this.closeSelf,this)

        for (let [key, value] of baseinfo) {
            const base_data = value;
            if(baseinfo.has(enemy_id) && key == enemy_id) {
                this.enemyname.getComponent(Label).string = base_data[0].name; //姓名
                this.desc.getComponent(Label).string = base_data[0].desc;      //简介
            }
        }

        //标题
        let chapter = GameData.userData.chapter;
        let title_str = chapter % 10 == 0 ? 'BOSS出没' : '本关新增'
        let title_url = chapter % 10 == 0 ? 'textures/battle/boss_title/spriteFrame' : 'textures/battle/normal_title/spriteFrame'

        this.title_txt.getComponent(Label).string = title_str;

        resources.load(title_url, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.title.getComponent(Sprite).spriteFrame = spriteFrame;
        })

        resources.load("textures/enemys/"+enemy_id+"/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.enemy.getComponent(Sprite).spriteFrame = spriteFrame;
        })
    }

    closeSelf(){
        if (this.node.active) {
            this.node.active = false;
            BattleManager.Instance.ctorEnemyObj();
        } 
    }
}
