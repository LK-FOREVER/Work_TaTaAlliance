import { _decorator, Component, Node, Mask, v3, UITransform, Vec3, Size, Label, instantiate, Prefab, find, RichText } from 'cc';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('guideLineController')
export class guideLineController extends Component {
    @property(Mask)
    mask: Mask = null;

    @property(Node)
    background: Node = null;

    @property(Node)
    finger: Node = null;

    @property(Prefab)
    guide_line_top: Prefab = null

    start() {
        this.hide();
        this.textHide();
    }

    // 展示遮罩
    public show(target: Node, additionalY?: number, newContentSize?: Size) {
        if (!GameData.userData.guideSwitch) return
        if (GameData.userData.guideSuspend) return
        if (!additionalY) additionalY = 0
        const targetPos: Vec3 = v3();
        target.getWorldPosition(targetPos);
        this.mask.getComponent(Mask).inverted = true
        console.log('targetPos', targetPos)
        const targetPos1 = new Vec3(targetPos.x, targetPos.y + additionalY, 0)
        console.log('targetPos1', targetPos1)
        this.mask.node.setWorldPosition(targetPos1);

        const maskTransform: UITransform = this.mask.node.getComponent(UITransform);
        console.log('newContentSize', newContentSize)
        if (!newContentSize) {
            maskTransform.setContentSize(target.getComponent(UITransform).contentSize);
        } else {
            maskTransform.setContentSize(newContentSize);
        }
        this.mask.node.active = true;

        this.background.setPosition(maskTransform.convertToNodeSpaceAR(this.node.worldPosition));
        // this.finger.setWorldPosition(v3(targetPos.x, targetPos.y - this.finger.getComponent(UITransform).height * 0.6, 0));
        this.finger.setWorldPosition(v3(targetPos.x, targetPos.y + additionalY, 0));
        this.finger.active = true;
        if (GameData.userData.guideListId === 67) {
            this.finger.getChildByName("guide_circle").active = false
            this.finger.setWorldPosition(v3(targetPos.x, targetPos.y - 70, 0));
        } else {
            this.finger.getChildByName("guide_circle").active = true
        }
    }

    // 隐藏
    public hide() {
        this.mask.node.active = false;
        this.finger.active = false;
    }

    // 展示文字
    public textShow(value) {
        if (GameData.userData.guideSuspend) return
        this.node.getChildByName("guide_text").active = true
        this.node.getChildByName("guide_text").getChildByName("Label").getComponent(RichText).string = value
    }

    // 隐藏文字
    public textHide() {
        this.node.getChildByName("guide_text").active = false
    }

    public show_Finger(position: Vec3) {
        console.log('position', position)
        // const targetPos: Vec3 = v3();
        // target.getWorldPosition(targetPos);
        this.mask.getComponent(Mask).inverted = true
        // console.log('targetPos', targetPos)
        // const targetPos1 = new Vec3(targetPos.x, targetPos.y + additionalY, 0)
        // console.log('targetPos1', targetPos1)
        this.mask.node.setWorldPosition(v3(0, 0, 0));

        const maskTransform: UITransform = this.mask.node.getComponent(UITransform);
        // console.log('newContentSize', newContentSize)
        // if (!newContentSize) {
        //     maskTransform.setContentSize(target.getComponent(UITransform).contentSize);
        // } else {
        //     maskTransform.setContentSize(newContentSize);
        // }
        this.mask.node.active = true;

        this.background.setPosition(maskTransform.convertToNodeSpaceAR(this.node.worldPosition));
        // this.finger.setWorldPosition(v3(targetPos.x, targetPos.y - this.finger.getComponent(UITransform).height * 0.6, 0));
        this.finger.setWorldPosition(position);
        this.finger.active = true;
    }
}
