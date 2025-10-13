import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bonusItemController')
export class bonusItemController extends Component {
    rewardData = null
    bonus_reward_icon: Node = null
    bonus_reward_num: Node = null
    start() {
        this.bonus_reward_icon = this.node.getChildByName("bonus_reward_icon")
        this.bonus_reward_num = this.node.getChildByName("bonus_reward_num")
        console.log('rewardData', this.rewardData)
        resources.load(`images/goods/${this.rewardData.k}/spriteFrame`, SpriteFrame, (err, sp) => {
            this.bonus_reward_icon.getComponent(Sprite).spriteFrame = sp
        })
        this.bonus_reward_num.getComponent(Label).string = this.rewardData.v
    }

    update(deltaTime: number) {

    }
}


