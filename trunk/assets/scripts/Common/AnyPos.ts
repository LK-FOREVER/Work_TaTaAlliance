import { _decorator, Component, Node, NodeEventType } from 'cc';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('AnyPos')
export class AnyPos extends Component {
    clickNodeList: Node[] = []
    // 1为销毁，0为隐藏
    closeStatus: number = 0
    start() {
        // setTimeout(() => {
        this.node.on(NodeEventType.TOUCH_END, (event) => {
            if (this.node.parent.active) {
                if (GameData.userData.guideSuspend){
                    this.node.parent.active = false
                }
            }
            if (this.node.parent.active) {
                if (GameData.userData.guideSuspend) {
                    this.node.parent.active = false
                }
                if (this.node.parent.name === "battle_win" ||
                    this.node.parent.name === "battle_lose"
                ) {
                    this.node.parent.active = false
                }
            }
            // if (this.clickNodeList.length > 0) {
            //     let endNode = this.clickNodeList.pop()
            //     console.log('endNode', endNode)
            //     // console.log(this.clickNodeList)
            //     if (this.closeStatus === 1) endNode.destroy()
            //     if (this.closeStatus === 0) endNode.active = false
            // }
        })
        // }, 1000);
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


