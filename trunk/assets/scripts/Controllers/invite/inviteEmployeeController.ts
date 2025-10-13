import { _decorator, Component, Node, UITransform, Prefab, instantiate, Layout } from 'cc';
import { GameData } from '../../Common/GameData';
import { InviteController } from './InviteController';
import { inviteIconController } from './item/inviteIconController';
const { ccclass, property } = _decorator;

@ccclass('inviteEmployeeController')
export class inviteEmployeeController extends Component {
    invite_reward_bg: Node = null
    inviteRewardContainer: Node = null
    rewardItemList: any[] = [];
    @property(Prefab)
    employee_icon: Prefab = null
    start() {
        this.invite_reward_bg = this.node.getChildByName("invite_reward_bg");
        this.inviteRewardContainer = this.invite_reward_bg.getChildByName("inviteRewardContainer");
        this.rewardItemList = GameData.userData.randomItemList

        let rewardCount = 0;
        const layout = this.inviteRewardContainer.getComponent(Layout);
        layout.paddingLeft = this.rewardItemList.length == 1 ? 240: -200;

        this.rewardItemList.forEach((reward_item)=>{
            rewardCount++
            const employee_icon = instantiate(this.employee_icon)
            if (rewardCount%2 ==0) {
                employee_icon.setPosition(employee_icon.position.x, -100)
            }
            else {
                employee_icon.setPosition(employee_icon.position.x, 0)
            }
            employee_icon.getComponent(inviteIconController).init(reward_item.reward.k, reward_item.reward.v, reward_item.reward.stuff_id, reward_item.reward.staff_type_id)
            employee_icon.setParent(this.inviteRewardContainer)
        })
    }

    onDestroy(): void {
        // this.node.parent.getChildByName("invite_box").getComponent(InviteController).updateUI()
    }
}


