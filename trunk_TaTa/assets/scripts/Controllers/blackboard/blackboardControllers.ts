import { _decorator, Component, Node, resources, JsonAsset, error, Label, RichText, NodeEventType, Prefab, find, instantiate } from 'cc';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('blackboardControllers')
export class blackboardControllers extends Component {
    career_text: Node = null
    lv_text: Node = null
    performance_text: Node = null
    blackboard_outline: Node = null
    promotionInfoList = null
    isClick: boolean = false
    @property(Prefab)
    promotion: Prefab = null
    public static Instance: blackboardControllers = null!;
    start() {
        blackboardControllers.Instance = this;
        this.career_text = this.node.getChildByName("blackboard").getChildByName("career_text")
        this.lv_text = this.node.getChildByName("blackboard").getChildByName("lv_text")
        this.performance_text = this.node.getChildByName("blackboard").getChildByName("performance_text")
        this.blackboard_outline = this.node.getChildByName("blackboard_outline")
        //职位信息
        resources.load('data/promotion__get_promotion_info', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            const jsonData = res.json!;
            this.promotionInfoList = jsonData
            this.updateUI()

        })
        // 前往晋升
        this.node.on(NodeEventType.TOUCH_END, () => {
            const Canvas = find("Canvas")
            if (this.isClick) {
                let promotion = instantiate(this.promotion)
                promotion.setParent(Canvas.getChildByName("promotionBox"))
                promotion.setPosition(0, 0)
            }
        })
    }

    updateUI() {
        this.promotionInfoList.forEach(item => {
            // 拿到下个职位所对应的信息
            if (item.id === GameData.userData.career + 1) {
                this.career_text.getComponent(Label).string = item.position_lv_name
                let gapLv = item.level_progress - (GameData.userData.max_chapter - 1)
                let gapPerformance = item.performance - GameData.userData.performance_value
                if (gapLv > 0) {
                    this.lv_text.getComponent(RichText).string =
                        `<outline color=#19293c width=2>还需要通过<outline color=#75270c width=2><size=30>${gapLv}</size></outline>关</outline>`;
                } else {
                    this.lv_text.getComponent(RichText).string =
                        `<outline color=#19293c width=2>关卡数已满足要求</outline>`;
                }
                if (gapPerformance > 0) {
                    this.performance_text.getComponent(RichText).string =
                        `<outline color=#19293c width=2>还需要获取<outline color=#75270c width=2><size=30>${gapPerformance}</size></outline>点业绩</outline>`;
                } else {
                    this.performance_text.getComponent(RichText).string =
                        `<outline color=#19293c width=2>业绩值已满足要求</outline>`;
                }
                // 判断是否能够晋升
                if (gapLv <= 0 && gapPerformance <= 0) { this.isClick = true }
                else { this.isClick = false }
                // 显示出外边框
                if (this.isClick) this.blackboard_outline.active = true;
                else this.blackboard_outline.active = false
            }
        });
        if (this.isClick) this.blackboard_outline.active = true;
        else this.blackboard_outline.active = false
    }
}


