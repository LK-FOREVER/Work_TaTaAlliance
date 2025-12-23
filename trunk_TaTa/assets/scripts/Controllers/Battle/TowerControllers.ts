import { _decorator, BoxCollider2D, CircleCollider2D, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, Prefab, resources, sp, UITransform, v3, Vec3, Animation, log, Vec2, misc, Label, UIOpacity, Tween, tween, Game } from 'cc';
import { AnimAction } from '../../Action/AnimAction';
import { AttackAction } from '../../Action/AttackAction';
import { BattleManager } from '../../Managers/BattleManager';
import { GameData } from '../../Common/GameData';
import { EnemyControllers } from './EnemyControllers';
import { BulletControllers } from './BulletControllers';
import { AudioManager } from '../../Managers/AudioManager';
import { LoadUtils } from '../../Common/LoadUtils';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { FontVFXController } from '../VFX/FontVFXController';
const { ccclass, property } = _decorator;
//防御塔控制
@ccclass('TowerControllers')
export class TowerControllers extends Component {
    public static Instance: TowerControllers = null!;
    audioMgr: AudioManager;

    tower_data: any;
    map_id: number;
    build_id: number;
    befor_build_id: number;

    tower: Node;
    bullet_node: Node;
    tower_sk: sp.Skeleton;
    range: Node;
    upgradation: Node;
    attack_tw: Tween<unknown>;

    tips: Node;
    targetIndex: number;

    atkSpeed: number = 1;
    fire_t: number = 0;

    isTarget: boolean = false;
    is_move: boolean = false;
    is_left: boolean = false;

    //目标敌人组
    targets: Array<Node> = [];
    //目标敌人
    targetEnemy: Node = null;

    att_return_num: number = 0;

    onLoad(): void {
        TowerControllers.Instance = this;
        this.audioMgr = AudioManager.ins;
        EventManager.Instance.on(EventConst.UPGRADE, this.upgrade, this)
    }

    onDestroy(): void {
        EventManager.Instance.off(EventConst.UPGRADE, this.upgrade, this)
    }

    //初始化属性,数据params从表格读取
    init(towerinfo: any, build_id: number, map_id: number): void {
        this.tower_data = towerinfo;
        this.map_id = map_id;
        this.build_id = build_id
        this.tower = this.node.getChildByName("tower");
        this.bullet_node = this.tower.getChildByName("bullet_node");
        this.upgradation = this.node.getChildByName("upgradation")
        this.upgradation.active = false
        this.tips = this.node.getChildByName("tips");
        this.tips.active = true;
        const lv: number = GameData.userData.towerLv[towerinfo.icon_id];
        this.tips.getComponent(Label).string = "等级：" + lv;

        //攻击速度
        this.atkSpeed = towerinfo.atk_spd;

        //动态更换骨骼资源
        this.tower_sk = this.tower.getComponent(sp.Skeleton);
        LoadUtils.Instance.changeTowerBones(towerinfo.icon_id, this.tower);

        this.tower.on(Node.EventType.TOUCH_START, this._touchstart, this);
        this.tower.on(Node.EventType.TOUCH_MOVE, this._touchmove, this);
        this.tower.on(Node.EventType.TOUCH_END, this._touchend, this);
        this.tower.on(Node.EventType.TOUCH_CANCEL, this._touchend, this);
        //实例化攻击范围预制体
        resources.load("prefabs/battle/range", Prefab, (err, prefab) => {
            this.range = instantiate(prefab);
            this.node.addChild(this.range);
            this.range.setPosition(v3(0, 0, 100));
            this.range.active = false;
            this.range.getComponent(UITransform).width = towerinfo.range * 2;
            this.range.getComponent(UITransform).height = towerinfo.range * 2;
        });

        //交换防御塔位置
        let ctorcollider = this.tower.getComponent(BoxCollider2D);

        if (ctorcollider) {
            ctorcollider.on(Contact2DType.BEGIN_CONTACT, this.onctorBeginContact, this);
            ctorcollider.on(Contact2DType.END_CONTACT, this.onctorEndContact, this);
        }
        ctorcollider.tag = build_id;

        //检测敌人
        let attackcollider = this.tower.getComponent(CircleCollider2D);
        attackcollider.radius = this.tower_data.range;

        if (attackcollider) {
            attackcollider.on(Contact2DType.BEGIN_CONTACT, this.onattackBeginContact, this);
            attackcollider.on(Contact2DType.END_CONTACT, this.onattackEndContact, this);
        }
        // 获取当前节点的当前层级索引
        this.targetIndex = this.node.getSiblingIndex();
    }

    //初始位置
    _touchstart() {
        this.tips.active = false;
        this.range.active = true;
        // 获取当前节点的当前层级索引
        const targetIndex = this.node.getSiblingIndex();

        // 将要移动的节点层级增加 移动过程中在最上层
        this.node.setSiblingIndex(targetIndex + 10);
        this.InitTowerInfo();
    }
    //移动过程
    _touchmove(touchEvent) {
        this.is_move = true;
        let location = touchEvent.getUILocation();
        let pos = v3(location.x, location.y, 0)

        this.node.position = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos);

        this.range.active = true;
        console.log("this.build_id", this.build_id);
        // console.log('点击测试移动');
    }

    _touchend(touchEvent) {
        this.is_move = false;
        this.range.active = false;
        let location = touchEvent.getUILocation();//触摸结束后的位置
        let pos = v3(location.x, location.y, 0)
        // 防护：parent 可能为 null 或没有 UITransform，避免直接调用导致异常
        const parent = this.node.parent;
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                this.node.position = parentUI.convertToNodeSpaceAR(pos);
            } else {
                //返回原来的位置
                this.node.position = BattleManager.Instance.bulidpoints[this.tower_data.build_id].pos;
            }
        } else {
            this.node.position = BattleManager.Instance.bulidpoints[this.tower_data.build_id].pos;
        }
        // 将要移动的节点层级变为原层级
        if (this.node && this.node.isValid && this.node.parent) {
            const parent = this.node.parent;
            if (parent && parent.isValid) {
                this.node.setSiblingIndex(this.targetIndex);
            }
        }

        this.tips.active = true;
        //碰撞成功，此时松开手指
        if (this.isTarget) {
            // 检查节点有效性
            if (!this.node || !this.node.isValid ) {
                this.node.position = BattleManager.Instance.bulidpoints[this.tower_data.build_id].pos;
                return;
            }
            //已建造战斗体中包含此数据,并且不是该战斗体，进行交换
            if (GameData.battleData.TowerObj[this.build_id] != null && GameData.battleData.TowerObj[this.build_id].name != this.tower_data.name) {
                // 检查目标节点有效性
                const targetTower = GameData.battleData.TowerObj[this.build_id];
                if (!targetTower || !targetTower.name) {
                    this.node.position = BattleManager.Instance.bulidpoints[this.tower_data.build_id].pos;
                    return;
                }
                //交换对象
                let other_tower = GameData.battleData.TowerObj[this.build_id]

                //改变缓存数据
                //拥有员工列表更新build_id
                other_tower.build_id = this.tower_data.build_id
                GameData.battleData.TowerObj[other_tower.build_id] = other_tower

                this.tower_data.build_id = this.build_id
                GameData.battleData.TowerObj[this.tower_data.build_id] = this.tower_data;

                GameData.userData.towerlist.find(item => item.id == other_tower.id).build_id = other_tower.build_id;
                GameData.userData.towerlist.find(item => item.id == this.tower_data.id).build_id = this.tower_data.build_id;

                //战斗站位员工列表交换员工  

                //删除双方防御塔战斗体
                BattleManager.Instance.tower_root.getChildByName('tower' + this.build_id).destroy();
                BattleManager.Instance.tower_root.getChildByName('tower' + other_tower.build_id).destroy();

                BattleManager.Instance.bulidpoints[this.build_id].tower = null;
                BattleManager.Instance.bulidpoints[other_tower.build_id].tower = null;

                BattleManager.Instance.ctorTowerPrefab(GameData.battleData.TowerObj[this.build_id]);
                BattleManager.Instance.ctorTowerPrefab(GameData.battleData.TowerObj[other_tower.build_id]);

                if (GameData.userData.guidanceId != -1) return
            } else {
                //建造
                if (this.build_id == this.tower_data.build_id || GameData.battleData.TowerObj[this.build_id]) {
                    this.node.position = BattleManager.Instance.bulidpoints[this.tower_data.build_id].pos;
                    //  console.log("返回初始位置", this.tower_data.build_id);
                    return
                }

                //删除原来位置的预制体数据
                BattleManager.Instance.tower_root.getChildByName('tower' + this.tower_data.build_id).destroy();

                //删除原有数据
                GameData.battleData.TowerObj[this.tower_data.build_id] = null;
                this.tower_data.build_id = this.build_id;
                //战斗站位员工列表更新数据
                GameData.battleData.TowerObj[this.build_id] = this.tower_data;
                GameData.userData.towerlist.find(item => item.id == this.tower_data.id).build_id = this.build_id
                //创建防御塔战斗体
                BattleManager.Instance.ctorTowerPrefab(GameData.battleData.TowerObj[this.build_id]);

                if (GameData.userData.guidanceId != -1) return
            }
        } else {//没有检测到与建造点发生碰撞就返回到初始位置
            this.node.position = BattleManager.Instance.bulidpoints[this.tower_data.build_id].pos;
            // console.log("返回初始位置", this.tower_data.build_id);
        }
    }

    onctorBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        //碰撞到目标
        this.isTarget = true;
        //这里可能需要保存一下原来的build_id，用于碰撞结束后恢复
        // this.befor_build_id = this.build_id;

        //建造点id
        this.build_id = otherCollider.tag;
    }
    onctorEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.build_id == otherCollider.tag) {
            this.isTarget = false;
            //恢复原来的build_id   
            // this.build_id = this.befor_build_id;  
        }
    }

    onattackBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        //  console.log('碰撞到敌人');

        let enemy: EnemyControllers = otherCollider.node.getComponent(EnemyControllers);
        this.targets.push(otherCollider.node);

    }
    onattackEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let name = otherCollider.node.name;

        for (let i = 0; i < this.targets.length; i++) {
            if (this.targets[i].name == name) {
                // console.log('消失',this.targets[i].name);

                this.targets.splice(i, 1);
                break;
            }
        }
        if (this.targetEnemy && this.targetEnemy.name == name) this.targetEnemy = null;
    }
    //攻击
    fire() {
        if (this.is_move) return;
        if (this.fire_t > 0) return;
        if (!this.targetEnemy) return;
        if (!this.targetEnemy.parent) return;

        this.fire_t = this.atkSpeed / BattleManager.Instance.speedMultiply;

        this.tower_sk.setAnimation(1, "attack_" + this.tower_data.icon_id, false);
        this.tower_sk.addAnimation(1, "idle_" + this.tower_data.icon_id, true, 0.2);

        // let attack_audio = '';
        // switch (this.tower_data.icon_id) {
        //     case 1001:
        //         attack_audio = 'attack3';
        //         break
        //     case 1003:
        //         attack_audio = 'attack2';
        //         break
        //     case 1008:
        //         attack_audio = 'attack2';
        //         break
        //     case 1010:
        //         attack_audio = 'attack2';
        //         break
        //     default:
        //         attack_audio = 'attack1';

        // }
        if (this.audioMgr) {
            this.audioMgr.playSound("attack", false);
        }

        this.createBullet();
    }
    //创建子弹
    createBullet() {
        if (this.targetEnemy && this.targetEnemy.parent && this.tower_data) {
            let target = this.targetEnemy
            let tower_data = this.tower_data

            //实例化预制体
            resources.load("prefabs/bullet/bullet_" + this.tower_data.icon_id, Prefab, (err, prefab) => {
                if (err) {
                    console.log(err);
                    return
                }
                let bullet = instantiate(prefab);

                if (bullet) {
                    try {
                        bullet.setParent(BattleManager.Instance.bullet_root);
                        let pos = new Vec3(this.node.position.x + this.bullet_node.position.x, this.node.position.y + this.bullet_node.position.y, 0);
                        bullet.setPosition(pos);

                        if (!target) {
                            bullet.destroy();
                            return;
                        }

                        const side = Math.sqrt((target.position.x - bullet.position.x) ** 2 + (target.position.y + 80 - bullet.position.y) ** 2);
                        const rad = Math.asin((target.position.y + 80 - bullet.position.y) / side);
                        const degree = target.position.x - bullet.position.x > 0 ? (rad / Math.PI) * 180 : -(rad / Math.PI) * 180 + 180;

                        bullet.setRotationFromEuler(new Vec3(0, 0, degree));
                    } catch (e) {
                        bullet.destroy();
                        return;
                    }

                    let bulletctrl = bullet.addComponent(BulletControllers);
                    bulletctrl.init(tower_data, target, this.node);
                }
            });
        }
    }

    //朝向敌人及选取目标敌人
    turnToTarget() {
        if (this.targets.length == 0) return;
        this.targetEnemy = null;

        let cur_pos_index: number = -1;
        let target_pos: Vec3 = null;
        for (let index = 0; index < this.targets.length; index++) {
            if (this.targets[index] && this.targets[index].name != '') {
                const controller = this.targets[index].getComponent(EnemyControllers);
                if (controller.cur_pos_index >= cur_pos_index || !this.targetEnemy) {
                    cur_pos_index = controller.cur_pos_index
                    target_pos = controller.path[cur_pos_index + 1];
                    this.targetEnemy = this.targets[index]
                } else if (controller.cur_pos_index == cur_pos_index && this.targetEnemy) {
                    if (Vec3.distance(target_pos, this.targets[index].position) < Vec3.distance(target_pos, this.targetEnemy.position)) {
                        this.targetEnemy = this.targets[index]
                    }
                }
            }
        }
        // console.log("this.targetEnemy.",this.targetEnemy);

        if (this.targetEnemy == null || this.targetEnemy.parent == null) return

        //在左侧
        if (this.node.position.x > this.targetEnemy.position.x) {
            //    console.log("在左侧",this.targetEnemy.position,this.node.position);
            this.is_left = true;
            if (this.tower_data.id == 1003) {
                this.node.getChildByName("tower").setScale(0.6, 0.6);
            } else {
                this.node.getChildByName("tower").setScale(-0.6, 0.6);
            }
            this.bullet_node.setPosition(-70, this.bullet_node.position.y);
        } else { //在右侧
            //   console.log("在右侧",this.targetEnemy.position,this.node.position);
            this.is_left = false;
            if (this.tower_data.id == 1003) {
                this.node.getChildByName("tower").setScale(-0.6, 0.6);
            }
            else {
                this.node.getChildByName("tower").setScale(0.6, 0.6);
            }
            this.bullet_node.setPosition(70, this.bullet_node.position.y);
        }

        this.fire();
    }

    upgrade(index: number, num: number) {
        if (index != this.tower_data.staff_type_id) return;

        this.attack_tw?.stop();
        // this.tower_data.atk += num;
        //如果该角色没有在站位中，就不播放升级动画
        const battleTower = BattleManager.Instance.tower_root.getChildByName('tower' + this.tower_data.build_id);
        if (!battleTower) return;

        // 检查 upgradation 节点是否有效
        if (!this.upgradation || !this.upgradation.isValid) {
            console.error("upgradation node is invalid!");
            return;
        }

        // 激活节点（确保节点可见）
        this.upgradation.active = true;

        // 获取 sp.Skeleton 组件并检查有效性
        const sk = this.upgradation.getComponent(sp.Skeleton);
        if (!sk) {
            console.error("sp.Skeleton component not found on upgradation node!");
            return;
        }

        // 检查 skeletonData 是否已加载
        if (!sk.skeletonData) {
            console.error("skeletonData is not loaded!");
            return;
        }

        // 在播放动画前，先清空当前动画并重置动作
        sk.clearTracks();
        sk.setToSetupPose();

        // 延迟一帧确保Spine初始化完成
        this.scheduleOnce(() => {
            try {
                sk.setAnimation(0, 'shengji', false);
            } catch (e) {
                console.error("播放动画失败:", e);
            }
        });

        // 加载并显示攻击力提升文本
        const str = `攻击力 +${num}`;
        resources.load("prefabs/font/attack", Prefab, (err, prefab) => {
            if (err) {
                console.error("Failed to load attack prefab:", err);
                return;
            }
            const label = instantiate(prefab);
            label.setParent(this.node);
            const fontCtrl = label.getComponent(FontVFXController);
            if (fontCtrl) {
                fontCtrl.init(str, "#E6EE30");
            } else {
                console.error("FontVFXController component not found!");
            }
        });
    }

    InitTowerInfo() {
        if (!this.node || !this.node.isValid) return;
        if (this.node) {
            const infoPanel = this.node.getChildByName("info_panel");
            if (!infoPanel) return;
            if (infoPanel) {
                if(infoPanel.active) {
                    infoPanel.active = false;
                    return;
                }
                // 先强制关闭面板
                infoPanel.active = false;

                // 等待一帧后再重新激活
                this.scheduleOnce(() => {
                    if (!this.node || !this.node.isValid) return;
                    infoPanel.active = true;

                    // 基本安全赋值（先判断路径与数据存在）
                    const bg = infoPanel.getChildByName("bg");
                    if (bg) {
                        const nameLabel = bg.getChildByName("Name")?.getComponent(Label);
                        if (nameLabel) nameLabel.string = this.tower_data?.name ?? "";

                        const levelLabel = bg.getChildByName("LevelNum")?.getComponent(Label);
                        if (levelLabel) {
                            const lvMap = GameData?.userData?.towerLv;
                            levelLabel.string = (lvMap && typeof lvMap[this.tower_data?.id] !== 'undefined') ? String(lvMap[this.tower_data.id]) : "0";
                        }
                    }

                    // 遍历已保存的 TowerObj，跳过 null/undefined 条目
                    const towerObjs = GameData?.battleData?.TowerObj || [];
                    for (let index = 0; index < towerObjs.length; index++) {
                        const tower_data = this.tower_data;
                        if (!tower_data) continue;
                        if (tower_data.id === this.tower_data?.id) {
                            // 赋值时均做存在性检查
                            const atkLabel = bg?.getChildByName("AtkNum")?.getComponent(Label);
                            const contAtkLabel = bg?.getChildByName("ContinueAtkNum")?.getComponent(Label);
                            const heavyLabel = bg?.getChildByName("HeavyAtkNum")?.getComponent(Label);
                            const heavyProbLabel = bg?.getChildByName("HeavyAtkProbabilityNum")?.getComponent(Label);
                            const intensifyLabel = bg?.getChildByName("IntensifyNum")?.getComponent(Label);

                            const batteryLv = GameData?.userData?.[`batteryStrengthenLv${this.tower_data?.staff_type_id}`] ?? 0;

                            if (atkLabel) atkLabel.string = String((tower_data.atk ?? 0) + 1 * batteryLv);
                            if (contAtkLabel) contAtkLabel.string = String((tower_data.poison ?? 0) + (tower_data.poi_grow ?? 0) * batteryLv);
                            if (heavyLabel) heavyLabel.string = (typeof tower_data.crit_hurt === 'number') ? tower_data.crit_hurt.toFixed(2) : "0.00";
                            if (heavyProbLabel) heavyProbLabel.string = (typeof tower_data.crit === 'number') ? (tower_data.crit * 100).toFixed(0) + "%" : "0%";
                            if (intensifyLabel) intensifyLabel.string = String(batteryLv);
                            break;
                        }
                    }

                    // 根据防御塔位置调整信息面板位置，避免超出屏幕
                    if (this.node.position.x > 100) {
                        infoPanel.setPosition(new Vec3(-300, infoPanel.position.y, 0));
                    } else {
                        infoPanel.setPosition(new Vec3(infoPanel.position.x, infoPanel.position.y, 0));
                    }
                }, 0);
            }
        }
    }

    update(deltaTime: number) {
        this.turnToTarget();
        if (this.fire_t > 0) {
            this.fire_t -= deltaTime
        }
    }
}
