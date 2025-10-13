import { _decorator, Component, Node, resources, Label, SpriteFrame, Sprite, Color, Button, find} from 'cc';
const { ccclass, property } = _decorator;
import { GameData } from '../../Common/GameData';
import { ShowGoods } from '../../Common/ShowGoods';
import { TextUtils } from '../../Common/TextUtils';
import { GameApp } from '../../GameApp';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { equipController } from '../equip/equipController';
import { staffController } from '../Staff/staffController';

@ccclass('taskController')
export class taskController extends Component {
    main_task_bg: Node = null
    task_title: Node = null
    task_content: Node = null
    task_reward_icon: Node = null
    taskInfo = null
    isFinish: boolean = false

    onLoad() {
        let id = GameData.taskData.continuousTaskId%TextUtils.Instance.task__get_continuous_task.length
        this.taskInfo = TextUtils.Instance.task__get_continuous_task[id]
        EventManager.Instance.on(EventConst.UPDATE_CONTINUOUS_TASK,this.updateUI,this);
        this.initUI()
    }

    onDestroy(): void {
        EventManager.Instance.off(EventConst.UPDATE_CONTINUOUS_TASK,this.updateUI,this);
    }
    initUI() {
        this.main_task_bg = this.node.getChildByName("main_task_bg")
        this.task_title = this.node.getChildByName("task_title")
        this.task_content = this.node.getChildByName("task_content")
        this.task_reward_icon = this.node.getChildByName("task_reward_icon")
        this.node.on(Button.EventType.CLICK, this.settle_task,this);
        this.updateUI()
    }

    settle_task() {
        let id = GameData.taskData.continuousTaskId%TextUtils.Instance.task__get_continuous_task.length
        if (GameData.taskData.continueTaskContentNumList[id] < this.taskInfo.task_content_num) {
            if(id == 0 || id == 4) {
                this.node.parent.getComponent(MainUIControllers).goBattle();
            } else if (id == 1) {
                this.node.parent.getComponent(MainUIControllers).open_invite_box();
            } else if (id == 2) {
                this.node.parent.getChildByName("pub_view").active = true;
                this.node.parent.getChildByName("pub_view").getComponent(staffController).init(true);
            } else if (id == 3) {
                this.node.parent.getChildByName("equip_view").active = true;
                this.node.parent.getChildByName("equip_view").getComponent(equipController).init();
            }
            return
        }

        const task_reward = [{
            reward:this.taskInfo.task_reward,
            number:this.taskInfo.task_reward_num
        }]

        ShowGoods.init(task_reward)

        if (task_reward[0].reward === 1 || task_reward[0].reward === 4) {
            let MainTop = find("Canvas").getChildByName("MainTop");
            MainTop.getComponent(GameApp).updateplayerinfo()
        }

        GameData.taskData.continueTaskContentNumList[id] = 0;
        GameData.taskData.continuousTaskId++;
        this.updateUI()
    }

    updateUI() {
        let id = GameData.taskData.continuousTaskId%TextUtils.Instance.task__get_continuous_task.length
        this.taskInfo = TextUtils.Instance.task__get_continuous_task[id]

        // 加载任务背景
        resources.load(`textures/main/${this.isFinish ? "main_task_btn1" : "main_task_btn"}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.main_task_bg.getComponent(Sprite).spriteFrame = spriteFrame;
        })
        // 判断当前任务是否完成
        if (GameData.taskData.continueTaskContentNumList[id] >= this.taskInfo.task_content_num) {
            this.node.getChildByName("common_red_dot").active = true
            this.task_content.getComponent(Label).color = new Color("#288600")
        } else {
            this.node.getChildByName("common_red_dot").active = false
            this.task_content.getComponent(Label).color = new Color("#b25436")
        }

        if (this.node.getChildByName("common_red_dot").active == true) {
            resources.load(`textures/main/${"main_task_btn1" }/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.main_task_bg.getComponent(Sprite).spriteFrame = spriteFrame;
            })
        }

        this.task_content.getComponent(Label).string = `${GameData.taskData.continueTaskContentNumList[id]}/${this.taskInfo.task_content_num}`

        this.task_title.getComponent(Label).string = this.taskInfo.task_content_name

        // 动态加载奖励图标
        resources.load(`images/goods/${this.taskInfo.task_reward}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            this.task_reward_icon.getComponent(Sprite).spriteFrame = spriteFrame;
        })
        // 奖励数量
        this.task_reward_icon.getChildByName("reward_num").getComponent(Label).string = this.taskInfo.task_reward_num
    }
}
