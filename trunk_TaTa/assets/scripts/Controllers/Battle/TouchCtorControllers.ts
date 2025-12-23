import { _decorator, Component, Node, v3, Vec3, UITransform, find, Collider2D, Contact2DType, BoxCollider2D, IPhysics2DContact, resources, Prefab, instantiate, SpriteFrame, Sprite, macro, Label } from "cc";
import { BattleManager } from "../../Managers/BattleManager";
import { GameData } from "../../Common/GameData";
import { LoadUtils } from "../../Common/LoadUtils";
import { BattleGuidanceController } from "../Guide/BattleGuidanceController";
const { ccclass, property } = _decorator;
//拖动生成
@ccclass("TouchCtorControllers")
export class TouchCtorControllers extends Component {
    range: Node;
    collider: BoxCollider2D;

    //是否是目标建造点
    private isTarget: boolean = false;

    //建造点id
    build_id: number;

    //员工列表id
    item_id: number;

    //battlemgr中传过来的员工数据
    tower_data: any;

    onLoad() {
        // 关闭多点触摸
        macro.ENABLE_MULTI_TOUCH = false;
    }

    init(index, data) {
        this.node.on(Node.EventType.TOUCH_START, this._touchstart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this._touchmove, this);
        this.node.on(Node.EventType.TOUCH_END, this._touchend, this);
        // 注册单个碰撞体的回调函数
        this.collider = this.node.getComponent(BoxCollider2D);
        //    console.log(this.collider.size);

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.collider.tag = index;
        this.tower_data = data;
        this.item_id = this.collider.tag;
        //实例化攻击范围预制体
        resources.load("prefabs/battle/range", Prefab, (err, prefab) => {
            this.range = instantiate(prefab);
            this.node.addChild(this.range);
            this.range.setPosition(v3(0, 0, 0));
            this.range.active = false;
            this.range.getComponent(UITransform).width = this.tower_data.range * 2;
            this.range.getComponent(UITransform).height = this.tower_data.range * 2;
        });
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (GameData.userData.guidanceId != -1 && this.item_id != 0) return
        if (GameData.userData.guidanceId == 5 && otherCollider.tag != 0) return
        if (GameData.userData.guidanceId == 6 && otherCollider.tag != 1) return
        if (GameData.userData.guidanceId == 7 && otherCollider.tag != 2) return
        if (GameData.userData.guidanceId == 8 && otherCollider.tag != 3) return

        //碰撞到目标
        this.isTarget = true;
        //建造点id
        this.build_id = otherCollider.tag;
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (GameData.userData.guidanceId != -1 && this.item_id != 0) return
        if (this.build_id == otherCollider.tag) {
            this.isTarget = false;
        }
    }

    //初始位置
    _touchstart(event) {
        //展示角色信息面板
        this.InitTowerInfo();
        if (GameData.userData.guidanceId != -1 && this.item_id != 0) return
        // if (this.node.parent.name === "tower_icon") {
        //     this.Canvas.getComponent(guideManager).dragTowers(this.node.parent.parent);
        // } else {
        //     this.Canvas.getComponent(guideManager).dragTowers(this.node.parent);
        // }
        // console.log(this.node.parent)
        let node_size = this.node.getComponent(UITransform);
        node_size.setContentSize(215 / 1.5, 257 / 1.5);

        let sp = LoadUtils.Instance.towers_new.getSpriteFrame(this.tower_data.id + "");
        this.node.getComponent(Sprite).spriteFrame = sp;

        //获取当前世界坐标
        let worldpos = this.node.getComponent(UITransform).convertToWorldSpaceAR(this.node.position);

        this.node.setParent(BattleManager.Instance.node);
        //将世界坐标转化为相对于父节点的坐标
        this.node.position = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldpos);
        this.range.active = true;
    }

    InitTowerInfo() {
        if (this.node && this.node.parent) {
            const infoPanel = this.node.parent.getChildByName("info_panel");
            if (infoPanel) {
                // 先保存当前父节点信息
                const isItem1 = this.node.parent.parent && this.node.parent.parent.name === "item1";
                const isItem7 = this.node.parent.parent && this.node.parent.parent.name === "item7";

                // 先强制关闭面板
                infoPanel.active = false;

                // 等待一帧后再重新激活
                this.scheduleOnce(() => {
                    infoPanel.active = true;

                    // 设置信息
                    infoPanel.getChildByName("bg").getChildByName("Name").getComponent(Label).string = this.tower_data.name;
                    infoPanel.getChildByName("bg").getChildByName("LevelNum").getComponent(Label).string = GameData.userData.towerLv[this.tower_data.id].toString();

                    for (let index = 0; index < GameData.battleData.WaitTowerList.length; index++) {
                        let tower_data = GameData.battleData.WaitTowerList[index];
                        if (tower_data.id == this.tower_data.id) {
                            infoPanel.getChildByName("bg").getChildByName("AtkNum").getComponent(Label).string =
                                (tower_data.atk + 1 * GameData.userData[`batteryStrengthenLv${this.tower_data.staff_type_id}`]).toString();
                            infoPanel.getChildByName("bg").getChildByName("ContinueAtkNum").getComponent(Label).string =
                                (tower_data.poison + tower_data.poi_grow * GameData.userData[`batteryStrengthenLv${this.tower_data.staff_type_id}`]).toString();
                            infoPanel.getChildByName("bg").getChildByName("HeavyAtkNum").getComponent(Label).string =
                                tower_data.crit_hurt.toFixed(2);
                            infoPanel.getChildByName("bg").getChildByName("HeavyAtkProbabilityNum").getComponent(Label).string =
                                (tower_data.crit * 100).toFixed(0) + "%";
                            infoPanel.getChildByName("bg").getChildByName("IntensifyNum").getComponent(Label).string =
                                GameData.userData[`batteryStrengthenLv${this.tower_data.staff_type_id}`].toString();
                            break;
                        }
                    }

                    // 使用保存的状态设置位置
                    if (isItem1 || isItem7) {
                        infoPanel.setPosition(new Vec3(200, 346, 0));
                    } else {
                        infoPanel.setPosition(new Vec3(0, 346, 0));
                    }
                }, 0);
            }
        }
    }

    //移动过程
    _touchmove(touchEvent) {
        if (GameData.userData.guidanceId != -1 && this.item_id != 0) return
        let location = touchEvent.getUILocation();
        let pos = v3(location.x, location.y, 0);
        this.node.position = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos);
        this.range.active = true;
    }

    _touchend(touchEvent) {
        if (GameData.userData.guidanceId != -1 && this.item_id != 0) return
        this.range.active = false;
        let location = touchEvent.getUILocation();
        let pos = v3(location.x, location.y, 0);
        this.node.position = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos);
        this.node.setParent(BattleManager.Instance.towersWaitList[this.item_id]);

        //碰撞成功，此时松开手指
        if (this.isTarget) {
            //非引导阶段
            if (GameData.userData.isBattleSuspend == false) {
                //已建造战斗体中包含此数据
                if (GameData.battleData.TowerObj[this.build_id] != null) {
                    //替换
                    this.replace_tower();
                } else {
                    //建造
                    this.build_tower();
                }
            } else {
                if (GameData.userData.guidanceId != -1) {
                    GameData.userData.guidanceId++
                    find("Canvas").getChildByName("guidance_box").getComponent(BattleGuidanceController).updateGuidance()
                }
                if (GameData.battleData.TowerObj[this.build_id] == null) {
                    //建造
                    this.build_tower();
                } else {
                    this.back_list();
                }
            }
            // GameData.setBattleData();
        } else { //没有检测到与建造点发生碰撞就返回到初始位置
            this.back_list()
        }
    }

    //替换员工
    replace_tower() {
        this.tower_data.build_id = this.build_id;

        //需下阵的员工数据
        let other_tower = GameData.battleData.TowerObj[this.build_id];
        other_tower.build_id = null;

        GameData.userData.towerlist.find(item => item.id == other_tower.id).build_id = null;
        GameData.userData.towerlist.find(item => item.id == this.tower_data.id).build_id = this.build_id;

        //替换
        BattleManager.Instance.waittowerlist.push(other_tower);
        BattleManager.Instance.waittowerlist.splice(BattleManager.Instance.waittowerlist.findIndex(item => item.id == this.tower_data.id), 1);

        GameData.battleData.WaitTowerList.push(other_tower);
        GameData.battleData.WaitTowerList.splice(GameData.battleData.WaitTowerList.findIndex(item => item.id == this.tower_data.id), 1);

        GameData.battleData.TowerObj[this.build_id] = this.tower_data;

        //删除战斗位下阵防御塔战斗体
        let other_obj = BattleManager.Instance.tower_root.getChildByName("tower" + this.build_id);
        if (other_obj) {
            other_obj.destroy();
        }

        //创建上阵防御塔战斗体
        BattleManager.Instance.ctorTowerPrefab(GameData.battleData.TowerObj[this.build_id]);
        //销毁此节点,从员工列表中去除
        BattleManager.Instance.towersWaitList[this.item_id].destroyAllChildren();
        //创建交换下来的待上阵员工icon
        BattleManager.Instance.ctorTowerList();
        //BattleManager.Instance.TowerIcon(other_tower, this.item_id);

        if (GameData.userData.guidanceId != -1) return

        // GameData.setBattleData()
    }

    //建造员工
    build_tower() {
        this.tower_data.build_id = this.build_id;

        //改变缓存数据
        //拥有员工列表更新build_id
        BattleManager.Instance.waittowerlist.splice(BattleManager.Instance.waittowerlist.findIndex(item => item.id == this.tower_data.id), 1);
        GameData.userData.towerlist.find(item => item.id == this.tower_data.id).build_id = this.build_id

        //创建防御塔战斗体
        BattleManager.Instance.ctorTowerPrefab(this.tower_data);
        // console.log("this.tower_data:" + JSON.stringify(this.tower_data));

        //销毁此节点,从员工列表中去除
        BattleManager.Instance.towersWaitList[this.item_id].destroyAllChildren();

        //待上阵员工列表删除该员工
        GameData.battleData.WaitTowerList.splice(GameData.battleData.WaitTowerList.findIndex(item => item.id == this.tower_data.id), 1);
        //战斗站位员工表添加数据
        GameData.battleData.TowerObj[this.build_id] = this.tower_data;

        BattleManager.Instance.ctorTowerList();

        if (GameData.userData.guidanceId != -1) return

        // GameData.setBattleData()
        // 清除移动引导
        //this.Canvas.getComponent(guideManager).dragTowersDestory();
        // 引导下一个员工
        //this.Canvas.getComponent(guideManager).guideNext();
    }

    //返回到初始位置
    back_list() {
        // 隐藏信息面板（先判断）
        // const parent = this.node.parent;
        // const info = parent ? parent.getChildByName("info_panel") : null;
        // if (info) info.active = false;

        // 之后再调用可能会修改父节点或销毁节点的函数
        BattleManager.Instance.TowerIcon(this.tower_data, this.collider.tag);
        if (this.node.parent && this.node.parent.children.length > 0) {
            const firstChild = this.node.parent.children[0];
            firstChild.destroy();
        }
        if (this.node)
            this.node.destroy();

        // this.node.parent.destroy();
        // let node_size = this.node.getComponent(UITransform);
        // node_size.setContentSize(170, 170);

        // let tower_sp = this.node.getComponent(Sprite);
        // resources.load("images/goods/" + this.tower_data.icon_id + "/spriteFrame",SpriteFrame,(err, spriteFrame) => {
        //         if (err) {
        //             console.log(err);
        //             return;
        //         }
        //         tower_sp.spriteFrame = spriteFrame;
        //         this.collider.size.width = 200;
        //         this.collider.size.height = 200;
        //         this.collider.offset.y = 0;
        //     }
        // );
        // this.node.setParent(BattleManager.Instance.towersWaitList[this.item_id])
        // this.node.position = v3(0, 0, 0);
        // console.log("返回初始位置: ",this.item_id);

        // 清除移动引导
        //this.Canvas.getComponent(guideManager).dragTowersDestory();
        //this.Canvas.getComponent(guideManager).guideline.show(this.node.parent);
    }
}
