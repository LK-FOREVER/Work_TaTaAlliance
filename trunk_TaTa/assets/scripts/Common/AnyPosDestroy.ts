import { _decorator, Component, Node, NodeEventType } from 'cc';
import { GameData } from './GameData';
import { PromotionManager } from '../Managers/PromotionManager';
const { ccclass, property } = _decorator;

@ccclass('AnyPos')
export class AnyPos extends Component {
    clickNodeList: Node[] = []
    // 1为销毁，0为隐藏
    closeStatus: number = 0
    start() {
        // console.log('this.node.parent.name',this.node.parent.name)
        this.node.on(NodeEventType.TOUCH_END, (event) => {

            if (this.node.parent.active) {
                if (this.node.parent.name === "promotion") {
                    PromotionManager.Instance.saveAudiodata();
                }
                if (GameData.userData.guideSuspend) {
                    this.node.parent.destroy()
                }
                if (this.node.parent.name === "guide_normal" ||
                    this.node.parent.name === "resource_box" ||
                    this.node.parent.name === "goods_view" ||
                    this.node.parent.name === "promotion" ||
                    this.node.parent.name === "invite_reward_box"
                ) {
                    this.node.parent.destroy()
                }
            }

            // if (this.node.parent.active) this.node.parent.destroy()
            // if (this.clickNodeList.length > 0) {
            //     let endNode = this.clickNodeList.pop()
            //     console.log('endNode', endNode)
            //     // console.log(this.clickNodeList)
            //     if (this.closeStatus === 1) endNode.destroy()
            //     if (this.closeStatus === 0) endNode.active = false
            // }
        })
    }

    // setActiveNode(ActiveNode: Node, closeStatus: number = 0) {
    //     console.log('ActiveNode', ActiveNode)
    //     this.clickNodeList.push(ActiveNode)
    //     this.closeStatus = closeStatus
    //     // console.log('setActiveNode', this.clickNodeList)
    // }

    // deleteActiveNode(ActiveNode: Node, closeStatus: number = 0) {
    //     this.clickNodeList = this.clickNodeList.filter(value => value.name !== ActiveNode.name)
    //     console.log('deleteActiveNode', this.clickNodeList)
    // }

    update(deltaTime: number) {

    }
}


