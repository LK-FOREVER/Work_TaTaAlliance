import { _decorator, Component, Node, Label, NodeEventType} from 'cc';
const { ccclass, property } = _decorator;
import { GameData } from '../../Common/GameData';

@ccclass('EndlessChooseItemController')
export class EndlessChooseItemController extends Component {
    choose_level_num: number = 0; // 可选择的关卡数量
    num: Node = null!; // item关卡数显示
    chooseLevelNumNode: Node = null!; // 外部的选择的关卡数显示

    init(choose_level_num: number, chooseLevelNumNode: Node) {
        this.choose_level_num = choose_level_num;
        this.chooseLevelNumNode = chooseLevelNumNode; 
        this.num = this.node.getChildByName("bg").getChildByName("num");
        this.node.on(NodeEventType.TOUCH_END, (event) => {
            this.chooseLevel();
        });
        this.updateUI();
    }

    updateUI() {
        // 更新关卡数显示，只显示1,21,41,61,81,101...关
        if (this.choose_level_num == 1) {
            this.num.getComponent(Label).string = "1";
        } else {
            this.num.getComponent(Label).string = (2 * (this.choose_level_num - 1) * 10 + 1).toString();
        }
    }

    chooseLevel() { // 选择关卡
        // 选择该关卡,转换为数字，并保存到GameData中
        GameData.userData.endlessChooseSurvive = Number(this.num.getComponent(Label).string);
        // 更新外部的选择的关卡数显示
        this.chooseLevelNumNode.getComponent(Label).string = this.num.getComponent(Label).string;
    }
}


