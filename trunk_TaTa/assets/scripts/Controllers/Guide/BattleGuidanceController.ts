import { _decorator, Button, Component, Node, RichText, Toggle, Tween, tween, UITransform, v3, Vec3 } from 'cc';
import { GameData } from '../../Common/GameData';
import { TextUtils } from '../../Common/TextUtils';
import { BattleManager } from '../../Managers/BattleManager';
const { ccclass, property } = _decorator;

@ccclass('BattleGuidanceController')
export class BattleGuidanceController extends Component {
    @property(Node)
    bg: Node = null

    @property(Node)
    mask: Node = null

    @property(Node)
    finger: Node = null

    @property(Node)
    guide_text: Node = null

    @property(Node)
    move_finger: Node = null

    tw:Tween<unknown> = null

    init() {
        this.updateGuidance()
    }

    updateGuidance() {
        if(GameData.userData.guidanceId == 2) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            this.mask.setPosition(-507,630);
            this.mask.getChildByName('layer').setPosition(507, 630);
            this.finger.setPosition(-507,630);
            this.guide_text.setPosition(0,400);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 3) {
            this.bg.active = false
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            this.mask.setPosition(530,-442);
            this.mask.getChildByName('layer').setPosition(-530, 442);
            this.finger.setPosition(530,-442);
            this.guide_text.setPosition(0,-163);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 4) {
            const enemy_arrow1 = this.node.parent.getChildByName("map").getChildByName("map1").getChildByName("enemy_arrow1");
            const enemy_arrow2 = this.node.parent.getChildByName("map").getChildByName("map1").getChildByName("enemy_arrow2");
            if(enemy_arrow1 && enemy_arrow2) {
                enemy_arrow1.active = false;
                enemy_arrow2.active = false; 
            }
            
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("tower_list").getChildByName("tower_view").getChildByName("battle_check_box").getChildByName("battle_check_btn_2");
            // 获取 node 在世界坐标系下的位置
            let worldPos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,0,0));
            // 将世界坐标转换为当前 this.node 的父节点即Canvas下的本地坐标
            let pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
            this.mask.setPosition(pos);
            this.mask.getChildByName('layer').setPosition(-pos.x, -pos.y);
            this.finger.setPosition(pos);
            this.guide_text.setPosition(0,-300);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
            // const node = this.node.parent.getChildByName("tower_list").getChildByName("tower_view").getChildByName("battle_bottom_container").getChildByName("staff_into_battle").getChildByName("staff_scroll").getChildByName("view").getChildByName("content").getChildByName("item1")
            // let pos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,0,0))
            // pos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            // pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            // pos = node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            // pos = node.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            // pos = node.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            // pos = node.parent.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            // pos = node.parent.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            // pos = node.parent.parent.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            // pos = node.parent.parent.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            // pos = node.parent.parent.parent.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            // pos = node.parent.parent.parent.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            // pos = node.parent.parent.parent.parent.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            // pos = node.parent.parent.parent.parent.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos);

            // this.mask.setPosition(pos);
            // this.mask.getChildByName('layer').setPosition(-pos.x,-pos.y);
            // this.finger.setPosition(pos);
            // this.guide_text.setPosition(0,-300);
            // this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 5) {
            this.bg.active = false;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = false;

            this.move(0);
        } else if (GameData.userData.guidanceId == 6) {
            this.bg.active = false;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = false;

            this.move(1);
        } else if (GameData.userData.guidanceId == 7) {
            this.bg.active = false;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = false;

            this.move(2);
        } else if (GameData.userData.guidanceId == 8) {
            this.bg.active = false;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = false;

            this.move(3);
        } else if (GameData.userData.guidanceId == 9) {
            this.bg.active = true;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = true;
            this.tw?.stop();
            this.move_finger.active = false;

            this.guide_text.setPosition(0,400);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 10) {
            // GameData.userData.guidanceId = 13;
            // this.changeText();
            
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("tower_list").getChildByName("tower_view").getChildByName("battle_check_box").getChildByName("battle_check_btn_1")
            let worldPos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,0,0))
            let pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos)
            this.mask.setPosition(pos);
            this.mask.getChildByName('layer').setPosition(-pos.x,-pos.y);
            this.finger.setPosition(pos);
            this.guide_text.setPosition(0,-300);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 11) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("tower_list").getChildByName("tower_view").getChildByName("battle_bottom_container").getChildByName("total_enhancement").getChildByName("enhance_btn")
            let worldPos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,0,0))
            let pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos)
            this.mask.setPosition(pos);
            this.mask.getChildByName('layer').setPosition(-pos.x,-pos.y);
            this.finger.setPosition(pos);
            this.guide_text.setPosition(0,-300);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 12) {
            this.bg.active = true;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = true;

            this.guide_text.setPosition(0,400);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 13) {
            GameData.userData.guidanceId ++;
            this.updateGuidance();
            // this.bg.active = true;
            // this.mask.active = false;
            // this.finger.active = false;
            // this.guide_text.active = true;

            // this.guide_text.setPosition(0,400);
            // this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 14) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("btn_go_MainUI")
            this.mask.setPosition(node.position);
            this.mask.getChildByName('layer').setPosition(-node.position.x,-node.position.y);
            this.finger.setPosition(node.position);
            this.guide_text.setPosition(0,400);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
            console.log("guidanceId14:", GameData.userData.guidanceId);

        } else {
            console.log("guidanceId", GameData.userData.guidanceId);
            this.node.active = false;
        }
    }

    changeMask() {
        if(GameData.userData.guidanceId == 4) {
            this.node.parent.getComponent(BattleManager).checkTowerViewByIdx(1);
        } else if (GameData.userData.guidanceId == 10) {
            this.node.parent.getComponent(BattleManager).checkTowerViewByIdx(0);
        } else if (GameData.userData.guidanceId == 11) {
            this.node.parent.getComponent(BattleManager).batteryStrengthenBtnHandler();
        } else if (GameData.userData.guidanceId == 14) {
            this.node.parent.getComponent(BattleManager).goMainUI();
        }
        GameData.userData.guidanceId++;
        this.updateGuidance();
    }

    changeText() {
        if(GameData.userData.guidanceId == 9) {
            GameData.userData.guidanceId++;
            this.updateGuidance();
        } else if (GameData.userData.guidanceId == 12) {
            this.bg.active = false;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = false;
            this.node.parent.getComponent(BattleManager).ctorEnemyObj();
            GameData.userData.guidanceId++;
        }
    }

    move(id:number) {
        this.tw?.stop();
        this.move_finger.active = true;
        this.move_finger.setPosition(-443,-950);
        const build_pos = TextUtils.Instance.chapter__get_build.get(1)[id]
        this.tw = tween(this.move_finger)
                    .to(1.5, {position:new Vec3(build_pos.x+55,build_pos.y-55,0)},{easing:"fade"})
                    .to(0.7, {position:new Vec3(-443,-950,0)})
                    .union()
                    .repeatForever()
                    .start()
    }
}
