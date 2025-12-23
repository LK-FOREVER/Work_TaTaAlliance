import { _decorator, Component, find, Node, RichText, UITransform, v3 } from 'cc';
import { GameData } from '../../Common/GameData';
import { TextUtils } from '../../Common/TextUtils';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { MainTopController } from '../MainTop/MainTopController';
import { staffController } from '../Staff/staffController';
import { equipController } from '../equip/equipController';
import { Console } from 'console';
const { ccclass, property } = _decorator;

@ccclass('MainUIGuidanceController')
export class MainUIGuidanceController extends Component {
    @property(Node)
    bg: Node = null

    @property(Node)
    mask: Node = null

    @property(Node)
    finger: Node = null

    @property(Node)
    guide_text: Node = null

    init() {
        this.updateGuidance()
    }

    updateGuidance() {
        if (GameData.userData.guidanceId == 0) {
            this.bg.active = true;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = true;
            this.guide_text.setPosition(0, 0);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 1) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("arrow_btn")
            this.mask.setPosition(node.position);
            this.mask.getChildByName('layer').setPosition(-node.position.x, -node.position.y);
            this.finger.setPosition(node.position);
            this.guide_text.setPosition(0, 400);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        }
        // else if (GameData.userData.guidanceId == 15) {
        //     this.bg.active = true;
        //     this.mask.active = false;
        //     this.finger.active = false;
        //     this.guide_text.active = true;
        //     this.guide_text.setPosition(0,0);
        //     this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        // }
        else if (GameData.userData.guidanceId == 15) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("MainTop").getChildByName("main_top").getChildByName("head_icon")
            let pos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0))
            pos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos);
            this.mask.setPosition(pos);
            this.mask.getChildByName('layer').setPosition(-pos.x, -pos.y);
            this.finger.setPosition(pos);
            this.guide_text.setPosition(0, 400);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 16) {
            this.bg.active = true;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = true;

            this.guide_text.setPosition(0, 0);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        }
        else if (GameData.userData.guidanceId == 17) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = false;

            const node = this.node.parent.getChildByName("promotionBox").getChildByName("promotion").getChildByName("promotion_close")
            let pos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0))
            pos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            this.mask.setPosition(pos);
            this.mask.getChildByName('layer').setPosition(-pos.x, -pos.y);
            this.finger.setPosition(pos);
        }
        else if (GameData.userData.guidanceId == 18) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("open_build_btn")
            this.mask.setPosition(node.position);
            this.mask.getChildByName('layer').setPosition(-node.position.x, -node.position.y);
            this.finger.setPosition(node.position);
            this.guide_text.setPosition(0, 0);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        }
        else if (GameData.userData.guidanceId == 19) {
            this.bg.active = true;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = true;

            this.guide_text.setPosition(0, 0);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        }
        else if (GameData.userData.guidanceId == 20) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = false;

            const node = this.node.parent.getChildByName("Furniture").getChildByName("furniture_box").getChildByName("furniture_close")
            let pos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0))
            pos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            this.mask.setPosition(pos);
            this.mask.getChildByName('layer').setPosition(-pos.x, -pos.y);
            this.finger.setPosition(pos);
        }
        // else if (GameData.userData.guidanceId == 21) {
        //     this.bg.active = false;
        //     this.mask.active = true;
        //     this.finger.active = true;
        //     this.guide_text.active = true;

        //     const node = this.node.parent.getChildByName("open_illustration_btn")
        //     this.mask.setPosition(node.position);
        //     this.mask.getChildByName('layer').setPosition(-node.position.x, -node.position.y);
        //     this.finger.setPosition(node.position);
        //     this.guide_text.setPosition(0,-450);
        //     this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        // } else if (GameData.userData.guidanceId == 22) {
        //     this.bg.active = true;
        //     this.mask.active = false;
        //     this.finger.active = false;
        //     this.guide_text.active = true;

        //     this.guide_text.setPosition(0,-450);
        //     this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        // } else if (GameData.userData.guidanceId == 23) {
        //     this.bg.active = true;
        //     this.mask.active = false;
        //     this.finger.active = false;
        //     this.guide_text.active = true;

        //     this.guide_text.setPosition(0,-500);
        //     this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        // } else if (GameData.userData.guidanceId == 24) {
        //     this.bg.active = false;
        //     this.mask.active = true;
        //     this.finger.active = true;
        //     this.guide_text.active = false;

        //     const node = this.node.parent.getChildByName("staff_view").getChildByName("staff_bottom").getChildByName("close_btn")
        //     let pos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,0,0))
        //     pos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
        //     pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
        //     pos = node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
        //     pos = node.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
        //     pos = node.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
        //     this.mask.setPosition(pos);
        //     this.mask.getChildByName('layer').setPosition(-pos.x, -pos.y);
        //     this.finger.setPosition(pos);
        // } else if (GameData.userData.guidanceId == 25) {
        //     this.bg.active = false;
        //     this.mask.active = true;
        //     this.finger.active = true;
        //     this.guide_text.active = true;

        //     const node = this.node.parent.getChildByName("open_invite_box_btn")
        //     this.mask.setPosition(node.position);
        //     this.mask.getChildByName('layer').setPosition(-node.position.x, -node.position.y);
        //     this.finger.setPosition(node.position);
        //     this.guide_text.setPosition(0,-450);
        //     this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        // } else if (GameData.userData.guidanceId == 26) {
        //     this.bg.active = true;
        //     this.mask.active = false;
        //     this.finger.active = false;
        //     this.guide_text.active = true;

        //     this.guide_text.setPosition(0,-450);
        //     this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        // } else if (GameData.userData.guidanceId == 27) {
        //     this.bg.active = false;
        //     this.mask.active = true;
        //     this.finger.active = true;
        //     this.guide_text.active = false;

        //     const node = this.node.parent.getChildByName("Invite").getChildByName("invite_box").getChildByName("bottom_bg").getChildByName("invite_close")
        //     let pos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,0,0))
        //     pos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
        //     pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
        //     pos = node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
        //     pos = node.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
        //     pos = node.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
        //     pos = node.parent.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
        //     pos = node.parent.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)

        //     this.mask.setPosition(pos);
        //     this.mask.getChildByName('layer').setPosition(-pos.x, -pos.y);
        //     this.finger.setPosition(pos);
        // } 
        else if (GameData.userData.guidanceId == 21) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = true;

            const node = this.node.parent.getChildByName("open_equip_btn")
            this.mask.setPosition(node.position);
            this.mask.getChildByName('layer').setPosition(-node.position.x, -node.position.y);
            this.finger.setPosition(node.position);
            this.guide_text.setPosition(0, 0);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        }
        else if (GameData.userData.guidanceId == 22) {
            this.bg.active = true;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = true;

            this.guide_text.setPosition(0, 0);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        } else if (GameData.userData.guidanceId == 23) {
            this.bg.active = false;
            this.mask.active = true;
            this.finger.active = true;
            this.guide_text.active = false;

            const node = this.node.parent.getChildByName("equip_view").getChildByName("equip_bottom").getChildByName("close_btn")
            let pos = node.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0))
            pos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            pos = node.parent.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
            pos = node.parent.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(pos)
            this.mask.setPosition(pos);
            this.mask.getChildByName('layer').setPosition(-pos.x, -pos.y);
            this.finger.setPosition(pos);
        } else if (GameData.userData.guidanceId == 24) {
            this.bg.active = true;
            this.mask.active = false;
            this.finger.active = false;
            this.guide_text.active = true;

            this.guide_text.setPosition(0, 0);
            this.guide_text.getChildByName('Label').getComponent(RichText).string = TextUtils.Instance.guide__get_guidance[GameData.userData.guidanceId].guide_text;
        }else {
            if (GameData.userData.guidanceId == 25) {
                GameData.userData.guidanceId = -1;
                GameData.userData.isBattleSuspend = false;
                GameData.saveData(false);
            }
            this.node.active = false
        }
    }

    changeMask() {
        if (GameData.userData.guidanceId == 1) {
            this.node.parent.getComponent(MainUIControllers).goBattle();
        } else if (GameData.userData.guidanceId == 15) {
            this.node.parent.getChildByName("MainTop").getChildByName("main_top").getComponent(MainTopController).open_promotion();
        } else if (GameData.userData.guidanceId == 17) {
            find("Canvas").getChildByName("promotionBox").getChildByName("promotion").active = false;
        } else if (GameData.userData.guidanceId == 18) {
            this.node.parent.getChildByName("Furniture").getChildByName("furniture_box").active = true;
        } else if (GameData.userData.guidanceId == 20) {
            this.node.parent.getChildByName("Furniture").getChildByName("furniture_box").active = false;
        } else if (GameData.userData.guidanceId == 21) {
            // this.node.parent.getChildByName("staff_view").active = true;
            // this.node.parent.getChildByName("staff_view").getComponent(staffController).init(false);
            this.node.parent.getChildByName("equip_view").active = true;
            this.node.parent.getChildByName("equip_view").getComponent(equipController).init();
        } else if (GameData.userData.guidanceId == 23) {
            this.node.parent.getChildByName("equip_view").active = false;
        } else if (GameData.userData.guidanceId == 24) {
            this.node.parent.getChildByName("staff_view").active = false;
        } else if (GameData.userData.guidanceId == 25) {
            this.node.parent.getComponent(MainUIControllers).open_invite_box();
        } else if (GameData.userData.guidanceId == 27) {
            this.node.parent.getChildByName("Invite").getChildByName("invite_box").destroy();
        } else if (GameData.userData.guidanceId == 28) {
            this.node.parent.getChildByName("equip_view").active = true;
            this.node.parent.getChildByName("equip_view").getComponent(equipController).init();
        } else if (GameData.userData.guidanceId == 30) {
            this.node.parent.getChildByName("equip_view").active = false;
            GameData.userData.guidanceId = -2;
            GameData.userData.isBattleSuspend = false;
        }
        GameData.userData.guidanceId++;
        this.updateGuidance();
    }

    changeText() {
        if (GameData.userData.guidanceId == 0 || GameData.userData.guidanceId == 16 || GameData.userData.guidanceId == 19 || GameData.userData.guidanceId == 22 || GameData.userData.guidanceId == 24 || GameData.userData.guidanceId == 26 || GameData.userData.guidanceId == 29) {
            GameData.userData.guidanceId++;
            this.updateGuidance();
        }
    }
}
