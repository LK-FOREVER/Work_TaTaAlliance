import { _decorator, BoxCollider2D, Collider2D, Animation, Component, Contact2DType, IPhysics2DContact, Label, Node, ProgressBar, tween, UIOpacity, v3, find, director, Director, Vec2, Vec3, Tween, sp, Skeleton, color, Color, Sprite, resources, Prefab, instantiate } from 'cc';
import { AttackAction } from '../../Action/AttackAction';
import { AnimAction } from '../../Action/AnimAction';
import { BattleManager } from '../../Managers/BattleManager';
import { GameData } from '../../Common/GameData';
import { GameApp } from '../../GameApp';
import { TextUtils } from '../../Common/TextUtils';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { FontVFXController } from '../VFX/FontVFXController';
import { AudioManager } from '../../Managers/AudioManager';
const { ccclass, property } = _decorator;
//敌人控制
@ccclass('EnemyControllers')
export class EnemyControllers extends Component {
    data: any;
    reward: any;
    map_id: number;
    audioMgr: AudioManager;

    index: number = 0;

    tower: Node;
    tower_info: any;

    path: Vec3[];
    cur_pos_index: number;
    coordinate_num: number;
    target_pos: Vec3;

    HP: number = 0;
    Full_HP: number = 0;
    speed: number = 0;
    init_speed: number = 0;

    blood: Node;
    money_drop: Node;

    poisonstatus: Node;
    slowstatus: Node;
    qunstatus: Node;

    is_moving: boolean = false;
    isdie: boolean = false;
    is_crit: boolean = false;
    is_poison: boolean = false;
    is_slow: boolean;

    onLoad() {
        (<any>this.node).die = 1;
        this.audioMgr = AudioManager.ins;
        EventManager.Instance.on(EventConst.EXPLOSION, this.onExplosion, this)
    }
    onDestroy(): void {
        EventManager.Instance.off(EventConst.EXPLOSION, this.onExplosion, this)
    }
    //初始化属性,数据params从表格读取
    public init(params: any, reward: any | null, index: number, map_id: number): void {
        this.data = params;
        this.reward = reward;
        this.map_id = map_id;
        this.index = index;
        this.node.name = "enemy" + index;

        const path_x = TextUtils.Instance.chapter__get_map_info[this.map_id - 1].path_x;
        const path_y = TextUtils.Instance.chapter__get_map_info[this.map_id - 1].path_y;
        this.coordinate_num = TextUtils.Instance.chapter__get_map_info[this.map_id - 1].coordinate_num;
        this.path = [];
        this.cur_pos_index = 0;
        for (let index = 0; index < this.coordinate_num; index++) {
            this.path.push(new Vec3(path_x[index], path_y[index], 0))
        }
        this.node.setPosition(this.path[0].clone())
        this.target_pos = this.path[0].clone()

        this.HP = params.hp;
        this.Full_HP = params.hp;
        this.speed = params.speed
        this.init_speed = params.speed

        this.poisonstatus = this.node.getChildByName('enemy').getChildByName('poison_status');
        this.slowstatus = this.node.getChildByName('enemy').getChildByName('slow_status');
        this.qunstatus = this.node.getChildByName('enemy').getChildByName('qun_status');

        this.poisonstatus.active = false;
        this.slowstatus.active = false;
        this.qunstatus.active = false;

        let collider = this.node.getComponent(BoxCollider2D);
        collider.tag = index;
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        this.blood = this.node.getChildByName('blood');

        (<any>this.node).die = 1;
        this.isdie = false;
        this.money_drop = this.node.getChildByName('money_drop');
        this.money_drop.active = false;

        if (this.data.enemy_id == 103) {
            this.node.getChildByName("enemy").setScale(0.6, 0.6)
        }


        this.is_moving = true;
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    }

    //死亡资金掉落奖励飘字
    diedReward() {
        let revenue_capability = GameData.userData.furniture_add.revenue_capability;
        //this.money_drop.active = true;
        let reward_num: number = 0;
        let str: string
        //boss掉落奖励
        if (this.data.is_boss) {
            reward_num = this.reward.boss_reward + this.reward.normal_reward + revenue_capability;
            str = '加' + reward_num;
        } else {//普通奖励
            reward_num = this.reward.normal_reward + revenue_capability;
            str = '加' + reward_num;
        }
        //   console.log("死亡掉落资金",reward_num);

        this.money_drop.getComponent(Label).string = str;
        // let opacity = this.money_drop.getComponent(UIOpacity).opacity;

        // tween(this.money_drop)
        //     .to(0.4, { position: v3(this.money_drop.position.x, this.money_drop.position.y + 50, 0), opacity: 50 }, { easing: 'fade' })
        //     .start();

        // this.scheduleOnce(() => {
        //     this.money_drop.active = false;
        // }, 0.4)

        GameData.userData.hasGoodsList[1] += reward_num;
        //引导任务
        //GameData.taskData.taskMoneyNum += reward_num
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();
    }

    //伤害飘字显示
    hurtShow(lost: any, color: string = "#ffffff") {
        // 暴击伤害
        if (this.is_crit) {
            const str = 'Crit' + Math.round(lost).toString();
            resources.load("prefabs/font/crit_hurt", Prefab, (err, prefab) => {
                const label = instantiate(prefab);
                label.setParent(this.node)
                label.getComponent(FontVFXController).init(str);
            })
        } else { // 普通伤害
            const str = lost === 0 ? 'Miss' : Math.round(lost).toString();
            resources.load("prefabs/font/hurt", Prefab, (err, prefab) => {
                const label = instantiate(prefab);
                label.setParent(this.node)
                label.getComponent(FontVFXController).init(str, color);
            })
        }
    }

    onAttacked(tower: Node, tower_info) {
        this.tower = tower;
        this.tower_info = tower_info

        EventManager.Instance.emit(EventConst.ATTACKED_START, this.node)

        if (this.tower_info.is_return != 0) {
            this.back();
        }

        if (this.tower_info.radius != 0) {
            this.qunstatus.active = true
            const sk = this.qunstatus.getComponent(sp.Skeleton);
            sk.setAnimation(0, 'baozha', false)
            EventManager.Instance.emit(EventConst.EXPLOSION, this.tower_info, this.node)
        }

        if (this.tower_info.poison != 0) {
            this.onPoison(this.tower_info);
        }

        if (this.tower_info.slow != 0) {
            this.onSlow(this.tower_info);
        }

        this.onHurt(this.tower_info);
    }

    onHurt(tower_info) {
        if (this.isdie || !tower_info || tower_info.atk <= 0) return;
        const batteryLv = GameData.userData[`batteryStrengthenLv${tower_info.staff_type_id}`] || 0;
        let attack = tower_info.atk + 1 * batteryLv;

        this.is_crit = false;
        if (tower_info.crit != 0) {
            attack = this.onCrit(tower_info);
        }

        let rand = Math.floor(Math.random() * 100 + 1);

        if (rand <= this.data.dodge * 100) {
            attack = 0
            this.hurtShow(0);
            return
        }

        let color = "#ffffff"
        switch (tower_info.staff_type_id) {
            case 0: color = "#fc5143"
                break
            case 1: color = "#b845e9"
                break
            case 2: color = "#2dd9df"
                break
            case 3: color = "#77e236"
                break
            default: break
        }
        this.hurtShow(attack, color);
        this.HP -= attack;
        EventManager.Instance.emit(EventConst.ATTACKED_END, this.node);
        this.change_blood()
        if (this.HP <= 0) {
            this.onDead();
        }
    }

    onDead() {
        if (this.audioMgr) {
            this.audioMgr.playSound("enemy_die", false);
        }
        this.isdie = true;
        (<any>this.node).die = 0;
        EventManager.Instance.emit(EventConst.DEAD, this.node);
        this.diedReward();
        //播放死亡动画
        tween(this.node.getComponent(UIOpacity))
            .to(0.3, { opacity: 50 }, { easing: 'fade' })
            .call(() => {
                director.once(Director.EVENT_AFTER_PHYSICS, () => {
                    this.node.active = false;
                    BattleManager.Instance.destroyEnemy(this.node);
                })
            })
            .start();

        // 无尽模式积分增加
        if (GameData.userData.isEndlessBattleScene) {
            if (this.data.is_boss) {
                BattleManager.Instance.endlessAddScore(50);
            } else if (this.data.enemy_id == 101 ||
                this.data.enemy_id == 104 ||
                this.data.enemy_id == 107 ||
                this.data.enemy_id == 110 ||
                this.data.enemy_id == 113 ||
                this.data.enemy_id == 116 ||
                this.data.enemy_id == 119) {
                BattleManager.Instance.endlessAddScore(1);
            } else if (this.data.enemy_id == 102
                || this.data.enemy_id == 105
                || this.data.enemy_id == 108
                || this.data.enemy_id == 111
                || this.data.enemy_id == 114
                || this.data.enemy_id == 117) {
                BattleManager.Instance.endlessAddScore(3);
            } else if (this.data.enemy_id == 103 ||
                this.data.enemy_id == 106 ||
                this.data.enemy_id == 109 ||
                this.data.enemy_id == 112 ||
                this.data.enemy_id == 115 ||
                this.data.enemy_id == 118) {
                BattleManager.Instance.endlessAddScore(5);
            }
        }
    }

    //暴击伤害
    onCrit(tower_info) {
        const batteryLv = GameData.userData[`batteryStrengthenLv${tower_info.staff_type_id}`] || 0;
        let rand = Math.floor(Math.random() * 100 + 1);
        if (rand <= tower_info.crit * 100) {
            this.is_crit = true;
            let crit_hurt =  Math.floor((tower_info.atk + 1 * batteryLv) * tower_info.crit_hurt);
            if(crit_hurt <=  Math.floor((tower_info.atk + 1 * batteryLv))) 
                crit_hurt += 1; // 保证暴击伤害至少比普通伤害高1点
            return crit_hurt;
        }
        return tower_info.atk + 1 * batteryLv;
    }

    //中毒
    onPoison(tower_info) {
        this.is_poison = true;

        this.poisonstatus.active = true;

        //伤害次数
        let num = Math.floor(tower_info.duration / tower_info.atk_spd);
        this.schedule(() => {
            const batteryLv = GameData.userData[`batteryStrengthenLv${tower_info.staff_type_id}`] || 0;
            const poison_hurt = tower_info.poison + tower_info.poi_grow * batteryLv;
            this.onPoisonHurt(poison_hurt);
        }, tower_info.atk_spd, num);

        this.scheduleOnce(() => {
            this.poisonstatus.active = false;
            this.is_poison = false;
        }, tower_info.duration)
    }
    onPoisonHurt(attack: number) {
        if (this.isdie || attack <= 0) return;
        const str = Math.round(attack).toString();
        resources.load("prefabs/font/poison_hurt", Prefab, (err, prefab) => {
            const label = instantiate(prefab);
            label.setParent(this.node)
            label.getComponent(FontVFXController).init(str);
        })

        this.HP -= attack;
        this.change_blood();
        if (this.HP <= 0) {
            this.onDead();
        }
    }

    //减速
    onSlow(tower_info) {
        if (this.is_slow && tower_info.slow !== 1) return;
        this.is_slow = true;

        this.slowstatus.active = true;

        this.speed = this.init_speed
        this.speed *= (1 - tower_info.slow);

        this.scheduleOnce(() => {
            this.speed = this.init_speed;
            this.slowstatus.active = false;
            this.is_slow = false;
        }, tower_info.slow_time)
    }

    onExplosion(tower_info: any, enemy: Node) {
        if (enemy == this.node) return;
        if (Math.sqrt((this.node.position.x - enemy.position.x) ** 2 + (this.node.position.y - enemy.position.y) ** 2) <= tower_info.radius) {
            this.onHurt(tower_info);
        }
    }

    back() {
        if (this.data.is_boss) return
        this.is_moving = false
        this.cur_pos_index = 0
        this.target_pos = this.path[0].clone();
        this.node.setPosition(this.path[0].clone())
        this.is_moving = true
    }

    protected update(dt: number): void {
        if (!this.is_moving) return;
        if (this.isdie) return;
        if (this.cur_pos_index >= this.coordinate_num - 1) return;

        if (this.path[this.cur_pos_index + 1].x < this.node.position.x && Math.abs(this.path[this.cur_pos_index + 1].y - this.node.position.y) < 1) {
            if (this.data.enemy_id == 101) {
                this.node.getChildByName("enemy").setScale(-0.3, 0.3)
            } else if (this.data.enemy_id == 103) {
                this.node.getChildByName("enemy").setScale(-0.6, 0.6)
            } else if (this.data.enemy_id == 104) {
                this.node.getChildByName("enemy").setScale(-1, 1)
            } else {
                this.node.getChildByName("enemy").setScale(1, 1)
            }
        } else if (this.path[this.cur_pos_index + 1].x > this.node.position.x && Math.abs(this.path[this.cur_pos_index + 1].y - this.node.position.y) < 1) {
            if (this.data.enemy_id == 101) {
                this.node.getChildByName("enemy").setScale(0.3, 0.3)
            } else if (this.data.enemy_id == 103) {
                this.node.getChildByName("enemy").setScale(0.6, 0.6)
            } else if (this.data.enemy_id == 104) {
                this.node.getChildByName("enemy").setScale(1, 1)
            } else {
                this.node.getChildByName("enemy").setScale(-1, 1)
            }
        }
        if (this.map_id == 3 || this.map_id == 11) {
            if (this.data.enemy_id == 101) {
                this.node.getChildByName("enemy").setScale(-0.3, 0.3)
            }
        }

        this.node.setPosition(this.target_pos);

        if (this.path[this.cur_pos_index + 1].x < this.target_pos.x) {
            this.target_pos.x -= this.speed * dt / 2
        } else if (this.path[this.cur_pos_index + 1].x > this.target_pos.x) {
            this.target_pos.x += this.speed * dt / 2
        }

        if (this.path[this.cur_pos_index + 1].y < this.target_pos.y) {
            this.target_pos.y -= this.speed * dt / 2
        } else if (this.path[this.cur_pos_index + 1].y > this.target_pos.y) {
            this.target_pos.y += this.speed * dt / 2
        }

        if (Math.abs(this.path[this.cur_pos_index + 1].x - this.target_pos.x) < 1 && Math.abs(this.path[this.cur_pos_index + 1].y - this.target_pos.y) < 1) {
            this.cur_pos_index++;
            this.target_pos = this.path[this.cur_pos_index].clone();
            //到达终点
            if (this.cur_pos_index >= this.coordinate_num - 1) {
                BattleManager.Instance.is_end = true;
                BattleManager.Instance.endOfBattle();
            }
        }
    }

    change_blood() {
        let progress = this.HP / this.Full_HP;
        let hint_bar = this.blood.getComponent(ProgressBar);
        hint_bar.progress = progress;
    }
}
