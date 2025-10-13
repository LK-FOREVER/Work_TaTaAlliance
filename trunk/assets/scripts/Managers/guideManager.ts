import { _decorator, Component, Node, resources, error, JsonAsset, Label, instantiate, Prefab, v3, Button, Size, find, director, RichText, Sprite, Animation } from 'cc';
import { GameData } from '../Common/GameData';
import { BattleManager } from "./BattleManager"
import { guideLineController } from "../Controllers/Guide/guideLineController"
import { guideNormalController } from "../Controllers/Guide/guideNormalController"
import { FurnitureManager } from "./FurnitureManager"
import { PromotionManager } from "./PromotionManager"
import { GameApp } from '../GameApp';
const { ccclass, property } = _decorator;

@ccclass('guideManager')
export class guideManager extends Component {
    @property(guideLineController)
    guideline: guideLineController = null;

    @property(Node)
    btn_right: Node = null;

    @property(Node)
    btn_left: Node = null;

    @property(Node)
    btn_furniture: Node = null;

    @property(Node)
    btn_task: Node = null;

    @property(Node)
    btn_invite_box: Node = null;

    @property(Node)
    btn_staff_box: Node = null;

    @property(Node)
    btn_reward_box: Node = null;

    @property(Node)
    btn_avatar: Node = null;

    @property(Node)
    btn_decision: Node = null;

    @property(Node)
    btn_decision_view: Node = null;

    @property(Node)
    FurnitureList: Node = null;

    @property(Prefab)
    guide_normal: Prefab = null

    // 全部引导列表
    guideList = null
    // 当前引导步骤的所有引导
    nowGuideList = []
    nowGuide = null

    towersWaitList = []
    // 战斗暂停
    isBattleSuspend = false
    start() {
        let guide_list_p = new Promise((resolve, reject) => {
            resources.load('data/guide__get_guide', (err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return;
                }
                // 获取到 Json 数据
                const jsonData = res.json!;
                resolve(jsonData);
            })
        })

        guide_list_p.then((jsonData) => {
            this.guideList = jsonData
            this.getGuideTypeList()
            // this.guideHandle()
        })
    }

    // 获取当前引导步骤的所有引导
    getGuideTypeList() {
        if (!GameData.userData.guideSwitch) return
        console.log("GameData.userData.guideId:" + GameData.userData.guideId)
        // 遍历出当前引导id对应的引导项
        this.guideList.forEach(item => {
            if (item.guide_id === GameData.userData.guideId) {
                this.nowGuideList.push(item)
            }
        });
        this.guideHandle()
    }

    guideHandle() {
        if (!GameData.userData.guideSwitch) return
        let BattleMgr = BattleManager.Instance;
        // console.log(GameData.userData.builds);
        // console.log('this.nowGuideList', this.nowGuideList)
        this.nowGuideList.map((GuideInfo) => {
           console.log('GameData.userData.guideListId', GameData.userData.guideListId)
            // 判断当前场景
            if (director.getScene().name !== GuideInfo.guide_scene) return
            // console.log('director.getScene().name', director.getScene().name)
            if (GuideInfo.id === GameData.userData.guideListId) {
                // 判断是否为引导项中的最后一条
                if (GuideInfo.isLast === 1) {
                    GameData.userData.guideId += 1
                }
                // 普通引导
                if (GuideInfo.guide_action === "") {
                    // 实例化预制体 instantiate
                    let guide_normal = instantiate(this.guide_normal)
                    // 设置其父节点
                    guide_normal.setParent(this.node)
                    guide_normal.setPosition(0, 0)
                    guide_normal.getChildByName("Finger").active = false
                    guide_normal.getChildByName("guide_text").getChildByName("Label").getComponent(RichText).string = GuideInfo.guide_text
                    // 赠送2000资金
                    if (GameData.userData.guideListId === 70) {
                        GameData.userData.hasGoodsList[1] += 2000
                        // 更新显示
                        let MainTop = find("Canvas").getChildByName("MainTop");
                        MainTop.getComponent(GameApp).updateplayerinfo()
                        let Canvas = find("Canvas")
                        Canvas.getChildByName("promotionBox").getChildByName("promotion").getComponent(PromotionManager).updateUI()
                    }
                    // guide_normal.getComponent(guideNormalController).isLast = GuideInfo.isLast
                    this.nowGuide = GuideInfo
                } else {
                    const actionList = GuideInfo.guide_action_name.split(",")
                    actionList.forEach(action_name => {
                        // 点击引导
                        if (action_name.includes("btn")) {
                            GuideInfo.guide_text !== "" ?
                                this.guideline.textShow(GuideInfo.guide_text) : this.guideline.textHide()
                            // 关闭页面
                            if (action_name === "btn_close_all") {
                                this.node.children.map((item) => {
                                    // 关闭家具
                                    if (item.name === "Furniture") {
                                        this.guideline.show(item.getChildByName("furniture_box").getChildByName("furniture_close"))
                                        return
                                    }
                                    // 员工窗口
                                    if (item.name === "staffBox") {
                                        if (item.getChildByName("Staff") !== null) {
                                            this.guideline.show(item.getChildByName("Staff").getChildByName("staff_box").getChildByName("staff_close"))
                                        }
                                        return
                                    }
                                    // 关闭决策
                                    if (item.name === "decision_main_view") {
                                        if (item.active === true) {
                                            this.guideline.show(item.getChildByName("btn_close"))
                                        }
                                        return
                                    }
                                })
                            }
                            // 右箭头进入战斗
                            if (action_name === "btn_right") {
                                // this.node.getChildByName("btn_go_MainUI").getComponent(Button).interactable = false
                                GameData.userData.isBattleSuspend = false
                                this.guideline.show(this.btn_right)
                            };
                            // 左箭头进入办公室
                            if (action_name === "btn_left") {
                                // 启用跳转按钮
                                this.node.getChildByName("btn_go_MainUI").getComponent(Button).interactable = true
                                this.guideline.show(this.btn_left)
                            };
                            // 任务
                            if (action_name === "btn_task") this.guideline.show(this.btn_task);
                            // 家具
                            if (action_name === "btn_furniture") this.guideline.show(this.btn_furniture);
                            if (action_name === "btn_furniture_item") {
                                this.node.getChildByName("Furniture").getComponent(FurnitureManager).scrollFurniture(GuideInfo.furniture_position_y)
                                const furniture_type_name = this.FurnitureList.children.find(item => item.name === GuideInfo.furniture_type_name)
                                const furniture_list = furniture_type_name.getChildByName("furniture_type_scroll").getChildByName("view").getChildByName("content").children
                                const furniture_item = furniture_list.find(item => item.name === GuideInfo.build_name)
                                let position_y
                                if (GuideInfo.furniture_type_name === "1号工位") {
                                    position_y = GuideInfo.furniture_position_y
                                } else if (GuideInfo.furniture_type_name === "2号工位") {
                                    position_y = GuideInfo.furniture_position_y - 500
                                } else if (GuideInfo.furniture_type_name === "3号工位") {
                                    position_y = GuideInfo.furniture_position_y - 965
                                } else if (GuideInfo.furniture_type_name === "前台") {
                                    position_y = GuideInfo.furniture_position_y
                                }
                                setTimeout(() => {
                                    // this.guideline.show(furniture_item, position_y)
                                    this.guideline.show(furniture_item)
                                }, 200)
                            }
                            // 家具购买
                            if (action_name === "btn_furniture_buy") {
                                this.guideline.show(this.node.getChildByName("Furniture").getChildByName("furniture_buy").getChildByName("furniture_buy_btn"))
                            }
                            // 招聘
                            if (action_name === "btn_invite_box") {
                                this.guideline.show(this.btn_invite_box, null, new Size(450, 230));
                            }
                            if (action_name === "btn_invite") {
                      //          console.log('this.node.getChildByName("invite").getChildByName("invite_box")', this.node.getChildByName("Invite").getChildByName("invite_box"))
                                this.guideline.show(this.node.getChildByName("Invite").getChildByName("invite_box").getChildByName("invite_btn"));
                            };
                            if (action_name === "btn_staff_box") this.guideline.show(this.btn_staff_box);
                            if (action_name === "btn_staff_meng") {
                        //        console.log(this.node.getChildByName("staffBox"))
                                const staffList = this.node.getChildByName("staffBox").getChildByName("Staff").getChildByName("staff_box").getChildByName("view").getChildByName("content").children
                                let thisStaff = staffList.find(item => item.name === "孟婆")
                                setTimeout(() => {
                                    this.guideline.show(thisStaff)
                                }, 100)
                            }
                            if (action_name === "btn_staff_hei") {
                                const staffList = this.node.getChildByName("staffBox").getChildByName("Staff").getChildByName("staff_box").getChildByName("view").getChildByName("content").children
                                let thisStaff = staffList.find(item => item.name === "黑无常")
                                setTimeout(() => {
                                    this.guideline.show(thisStaff)
                                }, 100)
                            }
                            if (action_name === "btn_staff_bai") {
                                const staffList = this.node.getChildByName("staffBox").getChildByName("Staff").getChildByName("staff_box").getChildByName("view").getChildByName("content").children
                                let thisStaff = staffList.find(item => item.name === "白无常")
                                setTimeout(() => {
                                    this.guideline.show(thisStaff)
                                }, 100)
                            }
                            // 员工升级
                            if (action_name === "btn_staff_up") {
                                const staff_up_btn = this.node.getChildByName("staffBox").getChildByName("staff_info").getChildByName("staff_up_btn")
                                this.guideline.show(staff_up_btn)
                            }
                            // 关闭员工信息
                            if (action_name === "btn_close_staff_info") {
                                const staff_info_close = this.node.getChildByName("staffBox").getChildByName("staff_info").getChildByName("staff_info_close")
                                this.guideline.show(staff_info_close)
                            }
                            // 点击引导宝箱
                            if (action_name === "btn_reward_box") this.guideline.show(this.btn_reward_box);
                            // 宝箱奖励
                            if (action_name === "btn_reward_receive") {
                                const btn_get = this.node.getChildByName("Reward_view").getChildByName("btn_get")
                                this.guideline.show(btn_get)
                            }
                            // 点击头像
                            if (action_name === "btn_avatar") {
                                const MainTop = find("MainTop")
                                const head_icon = MainTop.getChildByName("main_top").getChildByName("head_icon")
                                this.guideline.show(head_icon)
                            }
                            // 点击晋升按钮
                            if (action_name === "btn_promotion") {
                                const promotion_btn = this.node.getChildByName("promotionBox").getChildByName("promotion").getChildByName("promotion_panel").getChildByName("promotion_btn")
                                this.guideline.show(promotion_btn)
                            }
                            // 打开决策
                            if (action_name === "btn_decision") this.guideline.show(this.btn_decision);
                            // 开始决策
                            if (action_name === "btn_decision_start") {
                                const start = this.node.getChildByName("decision_start_view").getChildByName("start")
                                this.guideline.show(start)
                            }
                            // 决策界面
                            if (action_name === "btn_decision_view") {
                                // const start = this.node.getChildByName("decision_start_view").getChildByName("start")
                                this.guideline.show(this.btn_decision_view)
                            }
                            this.nowGuide = GuideInfo
                        }
                        // 暂停引导
                        if (action_name === "stop_guide") {
                            GameData.userData.guideSuspend = true
                            // GameData.userData.guideSwitch = false
                        }
                        // 战斗暂停
                        if (action_name === "battle_suspend") GameData.userData.isBattleSuspend = true
                        // 取消战斗暂停
                        if (action_name === "battle_suspend_cancel") GameData.userData.isBattleSuspend = false
                        // 战斗开始
                        if (action_name === "start_battle") {
                            GameData.userData.isBattleSuspend = false
                            // 禁用跳转按钮
                            if (this.node.getChildByName("btn_go_MainUI")) {
                                this.node.getChildByName("btn_go_MainUI").getComponent(Button).interactable = false
                                if (GameData.userData.max_chapter < 6) BattleMgr.initDescView()
                                else {
                       //             console.log('GameData.userData.isFirstStartBattle', GameData.userData.isFirstStartBattle)
                                    if (GameData.userData.isFirstStartBattle) {
                                        BattleMgr.ctorEnemyObj()
                                        GameData.userData.isFirstStartBattle = false
                                    }
                                }
                            }
                        }
                        // 启用跳转
                        if (action_name === "enable_jump") {
                            // 禁用跳转按钮
                            if (this.node.getChildByName("btn_go_MainUI")) {
                                this.node.getChildByName("btn_go_MainUI").getComponent(Button).interactable = true
                            }
                        }
                        // 战斗指向
                        if (action_name === "pointToStart" || action_name === "pointToEnd") {
                            // 实例化预制体 instantiate
                            let guide_normal = instantiate(this.guide_normal)
                            // 设置其父节点
                            guide_normal.setParent(this.node)
                            guide_normal.setPosition(0, 0)
                            guide_normal.getChildByName("Finger").active = true
                            // let fingerPosition = v3(-500, 820, 0)
                            // action_name === "pointToStart" ? fingerPosition = v3(-500, 820, 0) : fingerPosition = v3(500, -250, 0)
                            // guide_normal.getChildByName("Finger").setPosition(fingerPosition)
                            // 将小手设置在中间
                            guide_normal.getChildByName("Finger").setPosition(v3(0, 0, 0))
                            // 设置箭头位置
                            // guide_normal.getChildByName("Arrow").active = true
                            let arrowPosition
                            if (action_name === "pointToStart") {
                                // arrowPosition = v3(-700, 820, 0)
                                guide_normal.getChildByName("Arrow").getComponent(Animation).play("arrow_left")
                            } else {
                                // arrowPosition = v3(900, -250, 0)
                                guide_normal.getChildByName("Arrow").getComponent(Animation).play("arrow_right")
                            }
                            // action_name === "pointToStart" ? arrowPosition = v3(-500, 820, 0) : arrowPosition = v3(500, -250, 0)
                            // guide_normal.getChildByName("Arrow").setPosition(arrowPosition)
                            // 设置文字
                            guide_normal.getChildByName("guide_text").getChildByName("Label").getComponent(RichText).string = GuideInfo.guide_text
                            this.nowGuide = GuideInfo
                        }
                        // 拖动引导
                        if (action_name.includes("drag")) {
                            this.towersWaitList = this.node.getChildByName("tower_list").getChildByName("tower_view").getChildByName("view").getChildByName("content").children
                     //       console.log('this.towersWaitList', this.towersWaitList)
                            // 孟婆的拖动
                            if (action_name === "drag_meng") {
                                this.guideline.show(this.towersWaitList[2]);
                            }
                            // 白无常的拖动
                            if (action_name === "drag_bai") {
                                this.guideline.show(this.towersWaitList[1]);
                            }
                            // 黑无常的拖动
                            if (action_name === "drag_hei") {
                                this.guideline.show(this.towersWaitList[0]);
                            }
                        }
                        // 等待关闭招聘框
                        if (action_name === "wait_invite_reward") {
                      //      console.log("等待关闭招聘框")
                        }

                    })
                }
                return
            }
        })
    }
    // 移动时的提示
    dragTowers(target: Node) {
        if (!GameData.userData.guideSwitch) return
        if (GameData.userData.guideSuspend) return
        this.guideline.hide();
        this.guideline.textHide()
        let fingerPosition = v3(0, 0, 0)
        let BattleMgr = BattleManager.Instance;

        if (target.name === "item3") {
            fingerPosition = v3(-180, 620, 0)
            GameData.userData.builds[0].lock = true
            BattleMgr.ctorBuildPoints()
        } else if (target.name === "item2") {
            fingerPosition = v3(-30, 425, 0)
            GameData.userData.builds[1].lock = true
            BattleMgr.ctorBuildPoints()
        } else if (target.name === "item1") {
            fingerPosition = v3(20, -120, 0)
            GameData.userData.builds[2].lock = true
            BattleMgr.ctorBuildPoints()
        }
        // 实例化预制体 instantiate
        let guide_normal = instantiate(this.guide_normal)
        // 设置其父节点
        guide_normal.setParent(this.node)
        guide_normal.setPosition(0, 0)
        guide_normal.getChildByName("mask_destroy_bg").active = false
        guide_normal.getChildByName("guide_text").active = false
        guide_normal.getChildByName("Finger").active = true
        guide_normal.getChildByName("Finger").setPosition(fingerPosition)
    }
    dragTowersDestory() {
        if (!GameData.userData.guideSwitch) return
        if (GameData.userData.guideSuspend) return
        if (this.node.getChildByName("guide_normal")) {
            this.node.getChildByName("guide_normal").getComponent(guideNormalController).isNext = false
            this.node.getChildByName("guide_normal").destroy()
        }
    }
    guideNext(event?, isLast?) {
      //  console.log("isNext")
        if (GameData.userData.guideListId === 86) {
            GameData.userData.guideSwitch = false
            GameData.userData.guideSuspend = true
        }
        if (!GameData.userData.guideSwitch) return
        if (GameData.userData.guideSuspend) return
        this.guideline.hide();
        this.guideline.textHide()
        setTimeout(() => {
            GameData.userData.guideListId += 1
        //    console.log("isAdd")
            this.guideHandle()
        }, 50)
        // console.log('GameData.userData.guideId', GameData.userData.guideId)
        // console.log('GameData.userData.guideListId', GameData.userData.guideListId)
    }
}
