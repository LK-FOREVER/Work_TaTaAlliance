import { _decorator, Component, director, Animation, find, instantiate, Label, math, Node, Prefab, resources, sp, Sprite, SpriteFrame, v3, Vec2, Vec3, Button, view, sys, Event, ProgressBar, AudioSource, Toggle, Game, UITransform, native, } from "cc";
import { EnemyControllers } from "../Controllers/Battle/EnemyControllers";
import { GameData } from "../Common/GameData";
import { TowerControllers } from "../Controllers/Battle/TowerControllers";
import { TouchCtorControllers } from "../Controllers/Battle/TouchCtorControllers";
import { Buildcontrollers } from "../Controllers/Battle/Buildcontrollers";
import { TouchMainUIControllers } from "../Controllers/Battle/TouchMainUIControllers";
import { BattleResultControllers } from "../Controllers/Battle/BattleResultControllers";
import { BoxRewardControllers } from "../Controllers/Battle/BoxRewardControllers";
import { guideManager } from "./guideManager";
import { GameApp } from "../GameApp";
import { AudioManager } from "./AudioManager";
import { DecisionController } from "../Controllers/Decision/DecisionController";
import { EnemyDescControllers } from "../Controllers/Battle/EnemyDescControllers";
import { DecisionBuffController } from "../Controllers/Decision/DecisionBuffController";
import { BattleLockBuildControllers } from "../Controllers/Battle/BattleLockBuildControllers";
import { TapSDKManager } from "../LeChen/TapSDKManager";
import { ToastControllers } from "../Common/ToastControllers";
import { LoadUtils } from "../Common/LoadUtils";
import { MoYangManagers } from "../MoYang/MoYangManagers";
import { SDKManagers } from "../Common/SDKManagers";
import { LeChenManager } from "../LeChen/LeChenManager";
import { BattlePowerSupply } from "../Controllers/Battle/BattlePowerSupply";
import { TextUtils } from "../Common/TextUtils";
import { Tower1007 } from "../Controllers/Tower/Tower1007";
import { Tower1006 } from "../Controllers/Tower/Tower1006";
import { Tower1008 } from "../Controllers/Tower/Tower1008";
import { Tower1010 } from "../Controllers/Tower/Tower1010";
import { Tower1011 } from "../Controllers/Tower/Tower1011";
import { Tower1013 } from "../Controllers/Tower/Tower1013";
import { Tower1015 } from "../Controllers/Tower/Tower1015";
import { Tower1016 } from "../Controllers/Tower/Tower1016";
import EventManager from "../Common/EventManager";
import { EventConst } from "../Common/EventConst";
import { FontVFXController } from "../Controllers/VFX/FontVFXController";
import { BattleGuidanceController } from "../Controllers/Guide/BattleGuidanceController";
import { MainUIControllers } from "../Controllers/MainUI/MainUIControllers";
const { ccclass, property } = _decorator;
//建造点位置和建造点上已生成的防御塔
interface POSINFO {
    pos: Vec3;
    tower: Node;
}
//战斗管理类
@ccclass("BattleManager")
export class BattleManager extends Component {
    @property(Node)
    power_supply: Node | null;
    @property(Node)
    map_root: Node | null;
    @property({ type: Prefab })
    private tower_icon: Prefab = null;
    @property(Node)
    chapter_bar: Node | null;
    @property(Node)
    tower_root: Node | null;
    @property(Node)
    enemy_root: Node | null;
    @property(Node)
    bullet_root: Node | null;
    //防御塔待选列表
    @property([Node])
    towersWaitList: Node[] = [];
    @property(Prefab)
    bonus_box: Prefab | null;

    private _singleTouchCtr: TouchMainUIControllers;
    start_pos: math.Vec2;
    move_pos: math.Vec2;
    end_pos: math.Vec2;

    public static Instance: BattleManager = null!;

    //关卡基础数据
    chapterData: any[] = null;
    towerData: Map<number, any> = null;
    buildData: Map<number, any> = null;
    enemyBaseData: Map<number, any> = null;
    enemyRewardData: any[] = null;
    chapterEnemyData: any[] = null;

    battle_check_box: Node = null
    battle_bottom_container: Node = null
    total_enhancement: Node = null
    btn_box: Node = null
    enhance_btn: Node = null
    battery_progress_bar: Node = null
    selected_check_box_idx: number = 0

    endless_record: Node = null; //无尽模式战斗记录
    kill_enemy_num: Node = null; //消灭敌人数量
    get_score_num: Node = null; //获取的积分
    survive_num: Node = null; //存活波数
    endless_stop_btn: Node = null; //无尽模式暂停按钮
    endless_stop_view: Node = null; //无尽模式暂停弹窗
    stop_view_close_btn: Node = null; //暂停弹窗关闭按钮
    endless_pause: Boolean = false; //无尽模式暂停状态
    stop_view_again_btn: Node = null; //暂停弹窗重试按钮
    stop_view_exit_btn: Node = null; //暂停弹窗退出按钮
    left_survive_num: Node = null; //存活波数
    right_kill_enemy_num: Node = null; //消灭敌人数量
    middle_score_num: Node = null; //获取的积分
    new_record: Node = null; //新记录
    current_survive_num: number = 0; //当前存活波数
    current_score_num: number = 0; //当前获取的积分
    current_kill_enemy_num: number = 0; //当前消灭敌人数量

    save: Node = null
    battle_failed: Node = null

    isfirstAllStop: boolean = true; //全体禁锢
    isfirstAllHurt: boolean = true; //全体伤害

    chapter_id: number = 1;       //当前关卡id
    map_id: number = -1;         //当前地图id

    enemy_list: Array<any> = []; //当前关卡敌人数据信息
    public enemys: Array<Node> = new Array<Node>(); //生成的敌人列表

    map: Node = null; //地图
    //建造点列表,包含位置和已建造塔节点
    //建造和交换时修改该表数据
    //判断该表具体项有无节点值来进行建造或交换
    bulidpoints: Array<POSINFO> = new Array<POSINFO>();

    Objtowerlist: any[];     //已上阵防御塔
    waittowerlist: any[];    //待选择防御塔

    chapter_list: Array<Node> = new Array<Node>();     //关卡进度图标列表
    spot_list: Array<Node> = new Array<Node>();    //关卡进度白点列表

    speedMultiply: number = 1; //攻击速度倍率

    data_index: number = -1;
    //关卡开始
    is_start: boolean = true;
    //关卡结束
    is_end: boolean = false;
    //敌人全部死亡
    is_All_dead: boolean = false;
    hint: Node;

    //是否刷新关卡
    is_refresh: boolean = false;
    //一个关卡中消灭的敌人数
    enemy_deads: number = 0;
    enemy_deads_for_power: number = 0;

    equip_list: any[] = []
    staff_lv_add_attr_list: string[] = [];
    attrName = {
        "攻击": "攻击",
        "暴击率": "暴击率",
        "暴击伤害": "暴击伤害",
        "持续伤害": "持续伤害",
        "减速效果": "减速效果",
        "减速时间": "减速时间",
    }

    officeArtifactBonusNum: Record<string, number> = {
        atk: 0,
        crit: 0,
        crit_hurt: 0,
        poison: 0,
        duration: 0,
        slow: 0,
        slow_time: 0,
    };

    officeArtifactBonusStr: Record<string, string> = {
        atk: "0",
        crit: "0",
        crit_hurt: "0",
        poison: "0",
        duration: "0",
        slow: "0",
        slow_time: "0",
    };

    isReview: boolean = false;

    hasInited = false
    audioMgr: AudioManager;
    enemystips: Node;       //新的敌人简介弹窗

    reward_view: Node; //领取奖励页面
    Box: Node; //宝箱按钮
    rewardData: any;
    box_reward: any[];

    decision_start_view: any;
    decision_view: any;
    decision_removebuff_view: any;

    onLoad(): void {
        BattleManager.Instance = this;
        // 音频
        this.audioMgr = AudioManager.ins;
        this.audioMgr.playMusic("battle_bg", true);

        this.initData();
        this.initTowerView();

        this.ctorMap();
        this.ctorTowerList();
        this.initBoxView();
        if (GameData.userData.isEndlessBattleScene) {
            this.initEndlessRecord();
            this.initEndlessPauseView();
            this.initEndlessStopBtn();
            this.Box.active = false;
            this.node.getChildByName("btn_go_MainUI").active = false;
        }
        this.listen();
        if (GameData.userData.guidanceId !== -1) {
            GameData.userData.isBattleSuspend = true;
            const node = this.node.getChildByName('guidance_box')
            node.active = true
            node.getComponent(BattleGuidanceController).init()
        } else {
            GameData.userData.isBattleSuspend = false;
        }

        EventManager.Instance.on(EventConst.SAVE_SUCCESS, this.playSaveAnim, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.SAVE_SUCCESS, this.playSaveAnim, this)
    }

    listen() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            native.bridge.onNative = (arg0: string, arg1: string): void => {
                if (arg0 === "play_ad") {
                    EventManager.Instance.emit(EventConst.PLAY_AD, arg1);
                } else if (arg0 === "review_finish") {
                    this.toNextChapter();
                }
            }
        }
    }

    playSaveAnim() {
        this.save.active = true
        this.scheduleOnce(() => {
            this.save.active = false
        }, 2)
    }

    initData() {
        this.chapterData = TextUtils.Instance.chapter__get_chapter_info;
        this.towerData = TextUtils.Instance.tower__get_tower_info;
        this.buildData = TextUtils.Instance.chapter__get_build;
        this.enemyBaseData = TextUtils.Instance.chapter__get_enemy_info;
        this.enemyRewardData = TextUtils.Instance.chapter__get_enemy_money;
        this.chapterEnemyData = TextUtils.Instance.chapter__get_chapter_enemy_data;

        if (GameData.userData.isEndlessBattleScene) {
            this.chapter_id = GameData.userData.endlessChooseSurvive > 200 ? GameData.userData.endlessChooseSurvive % 200 : GameData.userData.endlessChooseSurvive; //无尽挑战所选择的关卡
            GameData.userData.endlessChapter = this.chapter_id;
        } else {
            this.chapter_id = GameData.userData.max_chapter; //当前关卡
            // 每次进入普通挑战时，清空上阵数组，保证所有角色处于待选状态（不会在地图站位）
            try {
                if (GameData.battleData && Array.isArray(GameData.battleData.TowerObj)) {
                    GameData.battleData.TowerObj.length = 0;
                } else {
                    GameData.battleData = GameData.battleData;
                    GameData.battleData.TowerObj = [];
                }
                GameData.setBattleData();
            } catch (e) {
                console.warn("clear TowerObj on enter normal mode failed:", e);
            }
        }
    }

    //设置当前关卡敌人信息
    setEnemyData() {
        console.log("isEndlessBattleScene:=======>", GameData.userData.isEndlessBattleScene);
        console.log("chapter_id:=======>", this.chapter_id);

        if (GameData.userData.isEndlessBattleScene && this.chapter_id > 200) {
            this.chapter_id = this.chapter_id % 200;
        }
        const chapterInfo = this.chapterData[this.chapter_id - 1][this.chapter_id - 1]
        if (GameData.userData.isEndlessBattleScene) {
            this.current_survive_num = GameData.userData.endlessChooseSurvive - 1; //当前存活波数

        }
        console.log("chapterInfo======》", chapterInfo);
        //当前关卡敌人数值
        this.enemy_list = [];

        //插入敌人id enemys -> k:敌人id, v:敌人数量
        for (const key in chapterInfo.enemy_list) {
            const enemys = chapterInfo.enemy_list[key];
            for (let index = 0; index < enemys.v; index++) {
                this.enemy_list.push({ enemy_id: enemys.k });
            }
        }
        console.log("this.enemy_list======》", this.enemy_list);
        for (let index = 0; index < this.enemy_list.length; index++) {
            const enemy = this.enemy_list[index];

            //关卡敌人数值
            for (const key in this.chapterEnemyData) {
                const data = this.chapterEnemyData[key][this.chapter_id];
                if (data) {
                    if (data.enemy_id == enemy.enemy_id) {
                        enemy.is_boss = data.is_boss;
                        // 无尽模式的敌人基础生命与普通模式的敌人基础生命不同，既当前波次的敌人生命是上一波次敌人生命的二倍，其他属性保持不变
                        if (GameData.userData.isEndlessBattleScene) {
                            if (enemy.enemy_id == 101) {
                                data.hp = 6;
                                data.speed = 200;
                            } else if (enemy.enemy_id == 102) {
                                data.hp = 20;
                                data.speed = 110;
                            } else if (enemy.enemy_id == 103) {
                                data.hp = 10;
                                data.speed = 150;
                            } else if (enemy.enemy_id == 104) {
                                data.hp = 6;
                                data.speed = 200;
                            } else if (enemy.enemy_id == 105) {
                                data.hp = 20;
                                data.speed = 110;
                            } else if (enemy.enemy_id == 106) {
                                data.hp = 10;
                                data.speed = 150;
                            } else if (enemy.enemy_id == 107) {
                                data.hp = 50;
                                data.speed = 200;
                            } else if (enemy.enemy_id == 108) {
                                data.hp = 150;
                                data.speed = 110;
                            } else if (enemy.enemy_id == 109) {
                                data.hp = 75;
                                data.speed = 150;
                            } else if (enemy.enemy_id == 110) {
                                data.hp = 75;
                                data.speed = 200;
                            } else if (enemy.enemy_id == 111) {
                                data.hp = 200;
                                data.speed = 110;
                            } else if (enemy.enemy_id == 112) {
                                data.hp = 100;
                                data.speed = 150;
                            } else if (enemy.enemy_id == 113) {
                                data.hp = 400;
                                data.speed = 200;
                            } else if (enemy.enemy_id == 114) {
                                data.hp = 800;
                                data.speed = 110;
                            } else if (enemy.enemy_id == 115) {
                                data.hp = 600;
                                data.speed = 150;
                            } else if (enemy.enemy_id == 116) {
                                data.hp = 500;
                                data.speed = 200;
                            } else if (enemy.enemy_id == 117) {
                                data.hp = 1000;
                                data.speed = 110;
                            } else if (enemy.enemy_id == 118) {
                                data.hp = 700;
                                data.speed = 150;
                            } else if (enemy.enemy_id == 119) {
                                data.hp = 600;
                                data.speed = 200;
                            }
                            enemy.hp = data.hp * (this.current_survive_num + 1);
                            enemy.speed = data.speed;
                        } else {
                            enemy.hp = data.hp;
                            enemy.speed = data.speed;
                        }
                        enemy.dodge = data.dodge;
                    }
                }
            }

            //敌人基础信息
            for (const [key, value] of this.enemyBaseData) {
                const base_data = value;
                if (key == enemy.enemy_id) {
                    enemy.name = base_data[0].name;
                    enemy.spine_id = base_data[0].spine_id;
                    enemy.voice_id = base_data[0].voice_id;
                    enemy.desc = base_data[0].desc;
                }
            }
        }
    }

    //生成地图
    ctorMap() {
        // 生效
        // this.updateBatteryStrengthen();
        this.setEnemyData();
        this.ctorChapterBar();         //创建并更新关卡进度
        //this.initDescView();           //初始化敌人信息弹窗

        this.is_refresh = false;
        const chapterInfo = this.chapterData[this.chapter_id - 1][this.chapter_id - 1]

        this.map_id = chapterInfo.map;

        this.map = null;
        this.map_root.removeAllChildren();
        this.tower_root.removeAllChildren();

        //实例化地图预制体
        resources.load("prefabs/maps/map" + this.map_id, Prefab, (err, prefab) => {
            this.map = instantiate(prefab);
            this.map_root.addChild(this.map);
            this.map.setPosition(v3(0, 0, 0));
            this.ctorBuildPoints();
            //展示新手引导中的敌人行进方向
            if (GameData.userData.guidanceId !== -1 && this.map_id == 1) {
                const enemy_arrow1 = this.map.getChildByName("enemy_arrow1");
                enemy_arrow1.active = true;
                const enemy_arrow2 = this.map.getChildByName("enemy_arrow2");
                enemy_arrow2.active = true;
            }
        });
        this.hasInited = true;
    }

    //创建关卡显示进度
    ctorChapterBar() {
        if (GameData.userData.isEndlessBattleScene) {
            this.chapter_bar.active = false;
            return;
        }
        this.chapter_list = [];
        this.spot_list = [];
        let content = this.chapter_bar.getChildByName("content");
        for (let index = 1; index < 6; index++) {
            let item = content.getChildByName("item" + index);
            item.active = true;
            this.chapter_list.push(item);
        }
        for (let index = 1; index < 5; index++) {
            let spot = content.getChildByName("spot" + index);
            spot.active = true;
            this.spot_list.push(spot);
        }

        //特殊情况，第一关和第二关时进度不完整
        if (this.chapter_id === 1) {
            this.chapter_list[0].active = false;
            this.chapter_list[1].active = false;
            this.spot_list[0].active = false;
            this.spot_list[1].active = false;
        } else if (this.chapter_id === 2) {
            this.chapter_list[0].active = false;
            this.spot_list[0].active = false;
        } else if (this.chapter_id === 200) {
            this.chapter_list[3].active = false;
            this.spot_list[2].active = false;
            this.chapter_list[4].active = false;
            this.spot_list[3].active = false;
        }
        this.updateChapterBar();
    }
    //更新关卡进度
    updateChapterBar() {
        let chapter_txt = this.chapter_bar.getChildByName("chapter_txt");
        chapter_txt.getComponent(Label).string = "Stage " + this.chapter_id;
        let index = 0;
        if (this.chapter_id === 1) {
            index = 2;
        } else if (this.chapter_id === 2) {
            index = 1;
        }

        for (index; index < this.chapter_list.length; index++) {
            const item = this.chapter_list[index];
            let number = item.getChildByName("number");

            let chapter_num = this.chapter_id + index - 2;
            number.getComponent(Label).string = chapter_num + "";

            let icon_url = "";
            //boss关
            if (chapter_num % 10 == 0) {
                // icon_url = chapter_num == this.chapter_id ? "chapter_bar_icon_boss_now" : "chapter_bar_icon_boss"
                icon_url = chapter_num == this.chapter_id ? "chapter_bar_icon_boss_now_new" : "chapter_bar_icon_new"

            } else {
                // icon_url = chapter_num == this.chapter_id ? "chapter_bar_icon" : "chapter_bar_icon_now"
                icon_url = chapter_num == this.chapter_id ? "chapter_bar_icon_now" : "chapter_bar_icon_new"
            }

            resources.load("textures/battle/" + icon_url + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return;
                }
                item.getComponent(Sprite).spriteFrame = spriteFrame;
            });
            if (chapter_num !== this.chapter_id) {
                item.setScale(0.8, 0.8);
            }
        }
    }

    //新的敌人简介弹窗
    initDescView() {
        // if (GameData.userData.guideSwitch) return
        // if (!GameData.userData.guideSuspend) return
        this.enemystips = this.node.getChildByName("enemystips");
        this.enemystips.active = false;
        const chapterInfo = this.chapterData[this.chapter_id - 1][this.chapter_id - 1]
        //新小怪或boss
        if (chapterInfo.is_new != 0) {
            this.enemystips.active = true;
            let tipsctor = this.enemystips.getComponent(EnemyDescControllers);
            tipsctor.init(this.enemyBaseData, chapterInfo.is_new);
        }
    }

    //创建敌人实体
    public ctorEnemyObj() {
        this.enemys = [];

        //if (GameData.userData.isBattleSuspend == true) return;
        if (this.is_start == false) return;
        if (this.enemystips && this.enemystips.active) return;

        //获取当前关卡击败敌人奖励数据
        let reward = this.enemyRewardData[this.chapter_id - 1][this.chapter_id]

        for (let index = 0; index < this.enemy_list.length; index++) {
            let element = this.enemy_list[index];
            this.delayCtorEnemy(element, index, reward);
        }
    }
    //延时生成敌人预制体 每隔0.5秒生成1个敌人
    delayCtorEnemy(data, index, reward) {
        this.scheduleOnce(() => {
            this.ctorEnemyPrefab(data, reward, index);
        }, 0.5 * index);
    }
    //创建敌人预制体,敌人数据
    public ctorEnemyPrefab(data: any | null, reward: any | null, index) {
        //实例化预制体
        resources.load("prefabs/battle/enemys", Prefab, (err, prefab) => {
            if (err) {
                console.log(err);
                return;
            }
            let enemys = instantiate(prefab);
            //boss 放大
            if (data.is_boss) {
                enemys.setScale(1.8, 1.8);
            }

            let enemy = enemys.getChildByName("enemy");
            let enemyctrl = enemys.addComponent(EnemyControllers);
            enemyctrl.init(data, reward, index, this.map_id);
            LoadUtils.Instance.changeEnemysBones(data.enemy_id, enemy, "walk");
            if (enemys && this.enemy_root) {
                this.enemy_root.addChild(enemys);
                enemys.setSiblingIndex(0);
                this.enemys.push(enemys);
                for (let i = 0; i < this.enemys.length; i++) {
                    this.enemys[i].setSiblingIndex(this.enemys.length - 1 - i)
                }
            }
        });
    }

    //生成员工建造点
    ctorBuildPoints() {
        this.bulidpoints = [];
        this.hidebuilds();
        let buildInfo = this.buildData.get(this.map_id);
        let builds_lock = GameData.userData.builds;
        for (let index = 0; index < builds_lock.length; index++) {
            if (builds_lock[index].lock) {
                const build_vo = buildInfo[index];
                let pos_x = build_vo.x;
                let pos_y = build_vo.y;
                this.bulidpoints[index] = {
                    pos: v3(pos_x, pos_y, 0),
                    tower: null,
                };

                resources.load("prefabs/battle/build", Prefab, (err, prefab) => {
                    let point = instantiate(prefab);
                    point.name = "point" + index;
                    let point_ctr = point.addComponent(Buildcontrollers);
                    point_ctr.init(index);
                    this.map_root.addChild(point);
                    point.setPosition(this.bulidpoints[index].pos);
                });
            }
        }

        this.ctorTowerObj();
        //正常开始战斗
        if (!GameData.userData.isBattleSuspend) {
            // console.log("未开启战斗暂停");
            this.ctorEnemyObj();
        }
    }
    //建造点解锁隐藏禁止牌
    hidebuilds() {
        for (let index = 0; index < GameData.userData.builds.length; index++) {
            const unlock_build = this.map.getChildByName("unlock_build" + (index + 1));
            if (GameData.userData.builds[index].lock) {
                unlock_build.getChildByName("sign").active = false;
                unlock_build.getChildByName("tips").active = false;
            } else {
                unlock_build.getChildByName("sign").active = true;
                unlock_build.getChildByName("tips").active = true;
                unlock_build.getChildByName("tips").getComponent(Label).string = `${this.buildData.get(this.map_id)[index].tip}\n解锁`
            }
        }
    }

    //缓存战位生成防御塔战斗体
    ctorTowerObj() {
        let ObjList = GameData.battleData.TowerObj;  //已上阵员工
        // if (GameData.userData.isEndlessBattleScene && GameData.userData.endlessChapter == 1) { //无尽模式
        //     ObjList.length = 0;
        // }
        let tower_list = GameData.userData.towerlist;

        for (let index = 0; index < ObjList.length; index++) {
            if (ObjList[index]) {
                ObjList[index] = tower_list.find(item => item.id == ObjList[index].id);  //重置员工数据
            }
        }
        this.Objtowerlist = JSON.parse(JSON.stringify(ObjList));

        //上阵员工 计算加成
        // this.setFurnitureAdd(this.Objtowerlist);
        // this.calculate_lv_add(this.Objtowerlist);
        // this.calculate_total_enhancement_bonus(this.Objtowerlist);
        // this.calculate_office_artifact_bonus(this.Objtowerlist);

        //创建防御塔实体
        for (let index = 0; index < this.Objtowerlist.length; index++) {
            if (this.Objtowerlist[index]) {
                this.ctorTowerPrefab(this.Objtowerlist[index]);
            }
        }
    }
    //建筑属性加成
    setFurnitureAdd(towerlist) {
        for (let index = 0; index < towerlist.length; index++) {
            if (towerlist[index]) {
                towerlist[index].atk += towerlist[index].atk * GameData.userData.furniture_add.atk;
                towerlist[index].atk_spd += towerlist[index].atk_spd * GameData.userData.furniture_add.atk_spd;
            }
        }
    }

    calculate_lv_grow_add(towerlist) {
        console.log("calculate_lv_grow_add==>", towerlist);
        for (let i = 0; i < towerlist.length; i++) {
            if (!towerlist[i]) continue;
            console.log("towerlist[i]====>",towerlist[i]);
            if(!towerlist[i].staff_type_id) towerlist[i].staff_type_id = 0;
            const tower_info = TextUtils.Instance.staff__get_info.get(towerlist[i].staff_type_id).find(item => item.id == towerlist[i].id);
            const base_atk = tower_info.atk_base + ((GameData.userData.towerLv[towerlist[i].id] - 1) * tower_info.atk_grow) + (0.5 * (GameData.userData.towerLv[towerlist[i].id] - 1) * (GameData.userData.towerLv[towerlist[i].id] - 2) * tower_info.atk_grow);
            const continue_atk = tower_info.poison_base + ((GameData.userData.towerLv[towerlist[i].id] - 1) * tower_info.poi_grow) + (0.5 * (GameData.userData.towerLv[towerlist[i].id] - 1) * (GameData.userData.towerLv[towerlist[i].id] - 2) * tower_info.poi_grow)
            towerlist[i].atk += base_atk;
            towerlist[i].poison += continue_atk;
        }
    }

    calculate_lv_extra_add(towerlist) {
        for (let i = 0; i < towerlist.length; i++) {
            if (!towerlist[i]) continue;
            const staff_lv_add = TextUtils.Instance.staff__get_lv_add.find(item => item.id == towerlist[i].id);
            this.staff_lv_add_attr_list = [staff_lv_add["10"], staff_lv_add["20"], staff_lv_add["30"], staff_lv_add["40"], staff_lv_add["50"], staff_lv_add["60"], staff_lv_add["70"], staff_lv_add["80"], staff_lv_add["90"], staff_lv_add["100"]]
            this.staff_lv_add_attr_list.forEach((item, index) => {
                const staff_attr_name = this.attrName[item.split("+")[0]];
                const staff_attr_val = item.split("+")[1];

                // 根据等级计算额外属性加成 10级index为0 20级index为1
                if (index <= Math.floor((GameData.userData.towerLv[towerlist[i].id] - 10) / 10)) {
                    // 应用额外属性加成
                    switch (staff_attr_name) {
                        case "攻击":
                            towerlist[i].atk += Number(staff_attr_val);
                            break;
                        case "持续攻击":
                            towerlist[i].poison += Number(staff_attr_val);
                            break;
                        case "减速效果":
                            towerlist[i].slow += (parseFloat(staff_attr_val.replace('%', '')) / 100);
                            break;
                        case "暴击率":
                            towerlist[i].crit += (parseFloat(staff_attr_val.replace('%', '')) / 100);
                            break;
                        case "暴击伤害":
                            towerlist[i].crit_hurt += (parseFloat(staff_attr_val.replace('%', '')) / 100);
                            break;
                        case "减速时间":
                            towerlist[i].slow_time += parseFloat(staff_attr_val.replace('s', ''));
                            break;
                        default:
                            console.warn(`Unknown attribute name: ${staff_attr_name}`);
                            break;
                    }
                }
            })
        }
    }

    calculate_total_enhancement_bonus(towerlist) {
        for (let index = 0; index < towerlist.length; index++) {
            if (towerlist[index]) {
                switch (towerlist[index].staff_type_id) {
                    case 0: towerlist[index].atk += GameData.userData.batteryStrengthenLv0
                        break
                    case 1: towerlist[index].atk += GameData.userData.batteryStrengthenLv1
                        break
                    case 2: towerlist[index].atk += GameData.userData.batteryStrengthenLv2
                        break
                    case 3: towerlist[index].atk += GameData.userData.batteryStrengthenLv3
                        break
                    default:
                        break
                }
            }
        }
    }

    calculate_office_artifact_bonus(towerlist) {
        for (let i = 0; i < towerlist.length; i++) {
            if (!towerlist[i]) continue;
            this.equip_list = GameData.userData.hasEquipList[towerlist[i].staff_type_id];
            this.officeArtifactBonusNum = {
                atk: 0,
                crit: 0,
                crit_hurt: 0,
                poison: 0,
                duration: 0,
                slow: 0,
                slow_time: 0,
            };
            this.equip_list.forEach(item => {
                const equip_info = TextUtils.Instance.goods__get_equip_info.find(equip => equip.icon == item.equip_id)
                if (equip_info !== undefined) {
                    let effectValue = item.effect_value
                    if (equip_info.growth_type === 2) {
                        if (equip_info.is_percentage === 1) {
                            effectValue = item.effect_value
                        } else {
                            effectValue = item.effect_value
                        }
                    } else {
                        effectValue = item.effect_value
                    }
                    switch (item.effect_name) {
                        case '攻击':
                            this.officeArtifactBonusStr.atk = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, effectValue)
                            towerlist[i].atk += Number(this.officeArtifactBonusStr.atk)
                            break;
                        case '暴击率':
                            this.officeArtifactBonusStr.crit = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, effectValue)
                            towerlist[i].crit += Number(this.officeArtifactBonusStr.crit) / 100
                            break;
                        case '暴击伤害':
                            this.officeArtifactBonusStr.crit_hurt = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, effectValue)
                            towerlist[i].crit_hurt += Number(this.officeArtifactBonusStr.crit_hurt) / 100
                            break;
                        case '持续攻击':
                            this.officeArtifactBonusStr.poison = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, effectValue)
                            towerlist[i].poison += Number(this.officeArtifactBonusStr.poison)
                            break;
                        case '持续时间':
                            this.officeArtifactBonusStr.duration = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, effectValue)
                            towerlist[i].duration += Number(this.officeArtifactBonusStr.duration)
                            break;
                        case '减速效果':
                            this.officeArtifactBonusStr.slow = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, effectValue)
                            towerlist[i].slow += Number(this.officeArtifactBonusStr.slow) / 100
                            break;
                        case '减速时间':
                            this.officeArtifactBonusStr.slow_time = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, effectValue)
                            towerlist[i].slow_time += Number(this.officeArtifactBonusStr.slow_time)
                            break;
                        default:
                            break;
                    }
                }
            })
        }
    }

    office_artifact_bonus_to_str(growth_type: number, is_percentage: number, effect_value: number) {
        let effectValue = ""
        if (growth_type === 2) {
            if (is_percentage === 1) {
                effectValue = `${(effect_value * 100).toFixed(0)}`
            } else {
                effectValue = effect_value.toFixed(0)
            }
        } else {
            effectValue = `${effect_value.toFixed(0)}`
        }
        return effectValue
    }

    //创建防御塔预制体,防御塔数据
    public ctorTowerPrefab(data) {
        let build_id = data.build_id;

        //上阵员工 计算加成
        data = JSON.parse(JSON.stringify(GameData.userData.towerlist.find(item => item.id == data.id)))
        this.calculate_lv_grow_add([data]);
        this.calculate_lv_extra_add([data]);
        this.setFurnitureAdd([data]);
        // this.calculate_total_enhancement_bonus([data]);
        this.calculate_office_artifact_bonus([data]);
        console.log("上阵防御塔数据 -->", JSON.stringify(data));

        resources.load("prefabs/towers/towers", Prefab, (err, prefab) => {
            if (this.audioMgr) {
                this.audioMgr.playSound("tower_build", false);
            }
            let towers = instantiate(prefab);

            this.tower_root.addChild(towers);
            towers.name = "tower" + build_id;
            towers.setPosition(this.bulidpoints[build_id].pos);
            this.bulidpoints[build_id].tower = towers;
            //   let tower = towers.getChildByName("tower");
            if (data.id == 1006) {
                let towerctrl = towers.addComponent(Tower1006);
                towerctrl.init(data, build_id, this.map_id);
            } else if (data.id == 1007) {
                let towerctrl = towers.addComponent(Tower1007);
                towerctrl.init(data, build_id, this.map_id);
            } else if (data.id == 1008) {
                let towerctrl = towers.addComponent(Tower1008);
                towerctrl.init(data, build_id, this.map_id);
            } else if (data.id == 1010) {
                let towerctrl = towers.addComponent(Tower1010);
                towerctrl.init(data, build_id, this.map_id);
            } else if (data.id == 1011) {
                let towerctrl = towers.addComponent(Tower1011);
                towerctrl.init(data, build_id, this.map_id);
            } else if (data.id == 1013) {
                let towerctrl = towers.addComponent(Tower1013);
                towerctrl.init(data, build_id, this.map_id);
            } else if (data.id == 1015) {
                let towerctrl = towers.addComponent(Tower1015);
                towerctrl.init(data, build_id, this.map_id);
            } else if (data.id == 1016) {
                let towerctrl = towers.addComponent(Tower1016);
                towerctrl.init(data, build_id, this.map_id);
            } else {
                let towerctrl = towers.addComponent(TowerControllers);
                towerctrl.init(data, build_id, this.map_id);
            }
        });
    }

    //生成待选择防御塔列表
    ctorTowerList() {
        for (let i = 0; i < this.towersWaitList.length; i++) {
            this.towersWaitList[i].destroyAllChildren();
        }
        //获取已有防御塔数据
        let BattleTowerList = GameData.battleData.TowerObj;

        //所有已拥有员工
        GameData.battleData.WaitTowerList = JSON.parse(JSON.stringify(GameData.userData.towerlist));

        //  let WaitTowerList = JSON.parse(JSON.stringify(GameData.battleData.WaitTowerList));
        this.waittowerlist = GameData.battleData.WaitTowerList;
        //未上阵员工 从所有员工中剔除上阵员工
        for (let index = 0; index < this.waittowerlist.length; index++) {
            const wait_tower = this.waittowerlist[index];
            //  console.log('待选择',wait_tower);
            for (let j = 0; j < BattleTowerList.length; j++) {
                if (BattleTowerList[j] && wait_tower.id == BattleTowerList[j].id) {
                    this.waittowerlist.splice(index, 1);
                    //  console.log('删除',wait_tower.id);
                    index--;
                    //  console.log(index);
                }
            }
        }

        // 未上阵员工 计算加成
        this.calculate_lv_extra_add(this.waittowerlist);
        this.calculate_lv_grow_add(this.waittowerlist);
        this.setFurnitureAdd(this.waittowerlist);
        // this.calculate_total_enhancement_bonus(this.waittowerlist);
        this.calculate_office_artifact_bonus(this.waittowerlist);

        this.waittowerlist = this.sortWaittowerList(this.waittowerlist);

        GameData.battleData.WaitTowerList = this.waittowerlist;

        for (let index = 0; index < this.waittowerlist.length; index++) {
            let tower_data = this.waittowerlist[index];
            console.log("tower_data -->", JSON.stringify(tower_data));
            //创建防御塔属性
            this.TowerIcon(tower_data, index);
        }

        if (GameData.userData.guidanceId != -1) return

        // GameData.saveData()

        GameData.setBattleData()
    }
    //待选择列表排序,按照品质和等级排序
    sortWaittowerList(array) {
        //插入等级和品质
        let lvlist = GameData.userData.towerLv;
        for (let index = 0; index < array.length; index++) {
            const tower = array[index];
            if (tower.rarity == "紫色") {
                tower.rarity_type = 1;
            } else if (tower.rarity == "橙色") {
                tower.rarity_type = 2;
            }
            for (const key in lvlist) {
                if (key == tower.id) {
                    tower.lv = lvlist[key];
                }
            }
        }
        //    console.log("插入等级和品质", array);

        //插入排序
        function insertionSort(arr: any[]): any[] {
            // 对于数组的每一个元素，从它开始到0位置，比较该元素和前一个元素的大小
            for (let i = 1; i < arr.length; i++) {
                let current = arr[i];
                let j = i - 1;
                // 如果该元素大于前一个元素，那么前一个元素向后移动，并继续向前比较
                while (j >= 0 && current.rarity_type > arr[j].rarity_type) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                while (
                    j >= 0 &&
                    current.rarity_type == arr[j].rarity_type &&
                    current.lv > arr[j].lv
                ) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                // 如果该元素小于前一个元素，那么它将放到合适的位置
                arr[j + 1] = current;
            }
            return arr;
        }
        let waitlist = insertionSort(array);
        //    console.log("排序后", waitlist);
        return waitlist;
    }
    //生成防御塔icon
    public TowerIcon(data: any, index) {
        //实例化预制体
        let tower = instantiate(this.tower_icon);

        //图标
        let tower_sp = tower.getChildByName("icon").getComponent(Sprite);
        let icon_id = data.icon_id;
        resources.load("images/goods/" + data.icon_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            tower_sp.spriteFrame = spriteFrame;
        });

        //右上角标签
        let type_sp = tower.getChildByName("type").getComponent(Sprite);
        resources.load("textures/common/common_staff_type_" + data.staff_type_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            type_sp.spriteFrame = spriteFrame;
        });
        type_sp.node.active = false;

        //等级文本
        let name_bg = tower.getChildByName("name_bg");
        let lv_txt = name_bg.getChildByName("lv").getComponent(Label);
        let lv: number = GameData.userData.towerLv[icon_id];
        lv_txt.string = "LV." + lv;
        lv_txt.node.active = false;

        //名称文本
        let name_txt = name_bg.getChildByName("name").getComponent(Label);
        let name = data.name;
        name_txt.string = name;

        // 背景
        let bg = tower.getChildByName("bg").getComponent(Sprite);
        resources.load("textures/common/common_goods_" + data.quality + "_new" + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            bg.spriteFrame = spriteFrame;
        });

        this.towersWaitList[index].addChild(tower);
        tower.position = v3(0, 0, 0);
        let tower_info_panel = tower.getChildByName("info_panel");
        tower_info_panel.active = false;

        let tower_ctr = tower.getChildByName("icon").addComponent(TouchCtorControllers);
        tower_ctr.init(index, data);
    }

    initTowerView() {
        this.save = this.node.getChildByName("save")
        this.save.active = false;

        this.battle_failed = this.node.getChildByName("battle_failed")
        this.battle_failed.active = false

        this.battle_check_box = this.node.getChildByName("tower_list").getChildByName("tower_view").getChildByName("battle_check_box")
        this.battle_bottom_container = this.node.getChildByName("tower_list").getChildByName("tower_view").getChildByName("battle_bottom_container")
        this.total_enhancement = this.battle_bottom_container.getChildByName("total_enhancement")
        let staff_into_battle = this.battle_bottom_container.getChildByName("staff_into_battle");
        // 缩放 staff_into_battle 以适应当前屏幕宽度
        const staffIntoBattleUITransform = staff_into_battle.getComponent(UITransform);
        if (staffIntoBattleUITransform) {
            const originalWidth = staffIntoBattleUITransform.contentSize.width;
            const screenWidth = view.getVisibleSize().width;
            const scale = screenWidth / originalWidth;
            if (scale < 1) {
                staff_into_battle.scale = new Vec3(scale, scale, 1);
                this.total_enhancement.scale = new Vec3(scale * 0.9, scale * 0.9, 1);
            }
            else {
                this.total_enhancement.scale = new Vec3(0.9, 0.9, 1);
            }
        }

        this.btn_box = this.total_enhancement.getChildByName("btn_box")
        this.enhance_btn = this.total_enhancement.getChildByName("enhance_btn")
        this.battery_progress_bar = this.total_enhancement.getChildByName("battery_progress_bar")

        this.total_enhancement.getChildByName(`enhance_light_0`).active = false
        this.total_enhancement.getChildByName(`enhance_light_1`).active = false
        this.total_enhancement.getChildByName(`enhance_light_2`).active = false
        this.total_enhancement.getChildByName(`enhance_light_3`).active = false

        this.battle_check_box.children.forEach(child => {
            child.on(Toggle.EventType.CLICK, this.checkTowerView, this)
        })

        // 初始化强化按钮
        // this.btn_box.children.forEach(child => {
        //     child.on(Button.EventType.CLICK, this.batteryStrengthenLvBtnHandler, this)
        // })
        this.enhance_btn.on(Button.EventType.CLICK, this.batteryStrengthenBtnHandler, this)
        this.battery_progress_bar.on(Node.EventType.TOUCH_END, () => {
            this.power_supply.active = true
            this.power_supply.getComponent(BattlePowerSupply).init()
        })
        this.updateBatteryStrengthen()
    }
    //切换界面
    checkTowerView(event: Event) {
        if (GameData.userData.guidanceId != -1) return;
        const target: Node = event.target;
        this.checkTowerViewByIdx(target.getSiblingIndex());
    }

    checkTowerViewByIdx(idx: number) {
        this.selected_check_box_idx = idx;
        this.battle_check_box.children.forEach(child => {
            const child_index = child.getSiblingIndex()
            child.getChildByName("selected_box").active = child_index !== this.selected_check_box_idx
        })
        console.log("this.battle_bottom_container.children:" + this.battle_bottom_container.children)

        this.battle_bottom_container.children.forEach(child => {
            const child_index = child.getSiblingIndex()
            child.active = child_index === this.selected_check_box_idx
        })
    }
    //电量强化升级的四个按钮回调
    batteryStrengthenLvBtnHandler(event: Event) {
        const target: Node = event.target
        const target_index = target.getSiblingIndex()
        GameData.userData[`batteryStrengthenValue${target_index}`] -= 3
        // GameData.userData[`batteryStrengthenLv${target_index}`] += this.chapterData[this.chapter_id - 1][this.chapter_id - 1].atk_add
        GameData.userData[`batteryStrengthenLv${target_index}`] += 1


        EventManager.Instance.emit(EventConst.UPGRADE, target_index, this.chapterData[this.chapter_id - 1][this.chapter_id - 1].atk_add);

        // 音效播放
        const audioSource = target.getComponent(AudioSource).clip
        target.getComponent(AudioSource).playOneShot(audioSource)

        this.updateBatteryStrengthen()

        // GameData.saveData()
    }

    //强化按钮回调
    batteryStrengthenBtnHandler() {
        if (GameData.userData.hasGoodsList[12] <= 0) {
            this.power_supply.active = true
            this.power_supply.getComponent(BattlePowerSupply).init()
            // ToastControllers.Instance.showToast("电量不足")
            return
        }

        let id = GameData.taskData.continuousTaskId % TextUtils.Instance.task__get_continuous_task.length
        if (id == 4) {
            GameData.taskData.continueTaskContentNumList[id]++;
        }
        // GameData.taskData.dailyTaskContentNumList[5]++;

        const randomIndex = Math.floor(Math.random() * 4)
        GameData.userData[`batteryStrengthenValue${randomIndex}`] += 1
        GameData.userData.hasGoodsList[12] -= 1

        const enhance_light = this.total_enhancement.getChildByName(`enhance_light_${randomIndex}`)
        enhance_light.active = true
        switch (randomIndex) {
            case 0:
                enhance_light.getComponent(sp.Skeleton).setAnimation(0, "red", false)
                break;
            case 1:
                enhance_light.getComponent(sp.Skeleton).setAnimation(0, "purple", false)
                break;
            case 2:
                enhance_light.getComponent(sp.Skeleton).setAnimation(0, "qingse", false)
                break;
            case 3:
                enhance_light.getComponent(sp.Skeleton).setAnimation(0, "green", false)
                break;
            default:
                break;
        }
        // 音效
        // const audioSource = enhance_light.getComponent(AudioSource).clip
        // enhance_light.getComponent(AudioSource).playOneShot(audioSource)
        if (this.audioMgr) {
            this.audioMgr.playSound("battle_bottom_shot", false);
        }
        // 动画播放完成回调
        enhance_light.getComponent(sp.Skeleton).setCompleteListener(() => {
            this.updateBatteryStrengthen()
        })
        if (GameData.userData[`batteryStrengthenValue${randomIndex}`] >= 3) {
            GameData.userData[`batteryStrengthenValue${randomIndex}`] -= 3
            // GameData.userData[`batteryStrengthenLv${randomIndex}`] += this.chapterData[this.chapter_id - 1][this.chapter_id - 1].atk_add
            GameData.userData[`batteryStrengthenLv${randomIndex}`] += 1


            EventManager.Instance.emit(EventConst.UPGRADE, randomIndex, this.chapterData[this.chapter_id - 1][this.chapter_id - 1].atk_add);

            this.updateBatteryStrengthen()

        }
        // GameData.saveData()
    }
    updateBatteryStrengthen() {
        // 更新强化按钮
        this.btn_box.children.forEach(child => {
            const child_index = child.getSiblingIndex()
            const strengthenValue = GameData.userData[`batteryStrengthenValue${child_index}`]
            const strengthenLevel = GameData.userData[`batteryStrengthenLv${child_index}`]
            // 默认四个按钮都为禁用状态 只有强化值大于等于三才能点击
            child.getComponent(Button).interactable = strengthenValue >= 3
            child.getChildByName("tip_light").active = strengthenValue >= 3
            child.getChildByName("value").getComponent(Label).string = `${strengthenValue}/3`
            //child.getChildByName("level").getComponent(Label).string = `L v . ${strengthenLevel}`
        })
        this.enhance_btn.getChildByName("common_red_dot").active = GameData.userData.hasGoodsList[12] > 0
        // 更新电量图标
        this.battery_progress_bar.getComponent(ProgressBar).progress = GameData.userData.hasGoodsList[12] / GameData.userData.batteryNumberLimit
        this.battery_progress_bar.getChildByName("value").getComponent(Label).string = `${GameData.userData.hasGoodsList[12]}/${GameData.userData.batteryNumberLimit}`
    }

    //初始化无尽挑战模式战斗记录
    initEndlessRecord() {
        this.endless_record = this.node.getChildByName("endless_record");
        this.endless_record.active = true;
        this.kill_enemy_num = this.endless_record.getChildByName("kill_enemy").getChildByName("num");
        this.get_score_num = this.endless_record.getChildByName("get_score").getChildByName("num");
        this.survive_num = this.endless_record.getChildByName("survive_num").getChildByName("num");
        this.kill_enemy_num.getComponent(Label).string = "0";
        this.get_score_num.getComponent(Label).string = "0";
        this.survive_num.getComponent(Label).string = (GameData.userData.endlessChooseSurvive - 1).toString(); // 无尽模式初始存活波次
    }
    // 无尽模式暂停按钮
    initEndlessStopBtn() {
        this.endless_stop_btn = this.node.getChildByName("endless_stop_btn");
        this.endless_stop_btn.active = true;
        this.endless_stop_btn.on(Button.EventType.CLICK, () => {
            this.endless_stop_view.active = true;
            director.pause();
        }, this);
    }
    //初始化无尽挑战模式暂停弹窗
    initEndlessPauseView() {
        this.endless_stop_view = this.node.getChildByName("endless_stop_view");
        this.endless_stop_view.active = false;
        this.left_survive_num = this.endless_stop_view.getChildByName("content").getChildByName("left").getChildByName("left_survive_num");
        this.left_survive_num.getComponent(Label).string = "0";
        this.right_kill_enemy_num = this.endless_stop_view.getChildByName("content").getChildByName("right").getChildByName("right_kill_enemy_num");
        this.right_kill_enemy_num.getComponent(Label).string = "0";
        this.middle_score_num = this.endless_stop_view.getChildByName("content").getChildByName("middle").getChildByName("middle_score_num");
        this.middle_score_num.getComponent(Label).string = "0";
        this.new_record = this.endless_stop_view.getChildByName("content").getChildByName("middle").getChildByName("new_record");
        this.new_record.active = false;

        //关闭
        this.stop_view_close_btn = this.endless_stop_view.getChildByName("close_btn");
        this.stop_view_close_btn.on(Button.EventType.CLICK, () => {
            director.resume();
            this.endless_stop_view.active = false;
            this.new_record.active = false;
        }, this)
        // 重试
        this.stop_view_again_btn = this.endless_stop_view.getChildByName("again_btn");
        this.stop_view_again_btn.on(Button.EventType.CLICK, () => {
            director.resume();
            this.endless_stop_view.active = false;
            this.new_record.active = false;
            this.is_end = true;
            GameData.userData.isEndlessBattleScene = true;

            director.preloadScene("Battle",
                (completedCount: number, totalCount: number, item: any) => { },
                () => {
                    console.log("重新加载无尽模式战斗场景！");
                    if (!this.audioMgr) {
                        this.audioMgr = AudioManager.ins;
                    }
                    this.audioMgr.stopMusic();
                    this.audioMgr.stopAllSound();
                    director.loadScene("Battle");
                });
        }, this)
        // 退出
        this.stop_view_exit_btn = this.endless_stop_view.getChildByName("exit_btn");
        this.stop_view_exit_btn.on(Button.EventType.CLICK, () => {
            director.resume();
            this.endless_stop_view.active = false;
            this.new_record.active = false;
            this.endless_stop_btn.active = false;
            this.endless_record.active = false;
            this.goMainUI();
        }, this)
    }

    // 无尽模式下敌人死亡后积分增加
    endlessAddScore(score: number) {
        this.current_score_num += score;
        this.get_score_num.getComponent(Label).string = `${this.current_score_num}`;
        this.middle_score_num.getComponent(Label).string = `${this.current_score_num}`;
        if (GameData.userData.endlessChallengeMaxScore < this.current_score_num) {
            GameData.userData.endlessChallengeMaxScore = this.current_score_num;
            this.new_record.active = true;
            // GameData.saveData();
        }
    }

    //敌人死亡消失
    destroyEnemy(node: Node) {
        this.enemy_deads++;
        if (GameData.userData.isEndlessBattleScene) {
            this.current_kill_enemy_num++;
            this.kill_enemy_num.getComponent(Label).string = `${this.current_kill_enemy_num}`;
            this.right_kill_enemy_num.getComponent(Label).string = `${this.current_kill_enemy_num}`;
        }

        this.enemy_deads_for_power++;
        if (this.enemy_deads_for_power > 5) this.enemy_deads_for_power = 1;
        if (this.enemy_deads_for_power == 5 && GameData.userData.hasGoodsList[12] < GameData.userData.batteryNumberLimit) {
            GameData.userData.hasGoodsList[12]++;
            let str = "+1"
            resources.load("prefabs/font/power", Prefab, (err, prefab) => {
                const label = instantiate(prefab);
                label.setParent(this.battery_progress_bar);
                label.getComponent(FontVFXController).init(str, "#77E236");
            });
            this.updateBatteryStrengthen();
        }

        let id = GameData.taskData.continuousTaskId % TextUtils.Instance.task__get_continuous_task.length
        if (id == 0) {
            GameData.taskData.continueTaskContentNumList[id]++;
        }
        GameData.taskData.dailyTaskContentNumList[5]++;

        for (let index = 0; index < this.enemys.length; index++) {
            //消除敌人物体
            if (node == this.enemys[index]) {
                if (this.enemys[index]) {
                    this.enemys[index].destroy();
                }
                this.enemys.splice(index, 1);
            }
        }
        //敌人全部死亡，战斗结束
        if (this.enemys.length === 0 && this.enemy_deads >= this.enemy_list.length) {
            this.is_All_dead = true;
            this.is_end = true;
            this.endOfBattle();
        }
        // console.log("this.enemys",this.enemys);
        // console.log("this.enemy_deads",this.enemy_deads);
    }
    //战斗结束
    endOfBattle() {
        //console.log("战斗结束", this.is_All_dead, this.is_end);
        if (!this.is_end) return;
        this.is_refresh = true;
        this.enemy_deads = 0;
        this.bullet_root.destroyAllChildren();

        //敌人全部死亡,通关
        if (this.is_All_dead) {
            this.enemys = [];

            //关卡进度加一
            this.chapter_id++
            //无尽模式，通关一章节，存活波数加1
            if (GameData.userData.isEndlessBattleScene) {
                this.current_survive_num++;
                GameData.userData.endlessChooseSurvive++;
                GameData.userData.endlessChapter++;
                this.survive_num.getComponent(Label).string = `${this.current_survive_num}`;
                console.log("this.current_survive_num", this.current_survive_num);
                console.log("this.endlessChooseSurvive", GameData.userData.endlessChooseSurvive);

                this.left_survive_num.getComponent(Label).string = `${this.current_survive_num}`;
                if (GameData.userData.endlessChallengeMaxSurvive <= this.current_survive_num) {
                    GameData.userData.endlessChallengeMaxSurvive = this.current_survive_num;
                }
                this.endlessAddScore(20);
            }
            //是否通关最大关卡
            if (GameData.userData.isEndlessBattleScene) {
                this.chapter_id = this.chapter_id >= 200 ? 1 : this.chapter_id;
            } else {
                if(!GameData.userData.chapter) GameData.userData.chapter = GameData.userData.max_chapter;
                GameData.userData.chapter = this.chapter_id >= 200 ? 200 : this.chapter_id;
                this.chapter_id = GameData.userData.chapter

                //通关新关卡
                if (this.chapter_id > GameData.userData.max_chapter) {
                    GameData.userData.max_chapter = GameData.userData.chapter;
                }
            }
            GameData.taskData.dailyTaskContentNumList[7]++;

            // console.log('GameData.userData.guideListId', GameData.userData.guideListId)
            // console.log('GameData.userData.max_chapter', GameData.userData.max_chapter)
            //新手引导 不生效
            if (GameData.userData.guideListId <= 100) {
                if (GameData.userData.guideListId === 59) {
                    // 判断是否通过了第3关
                    if (GameData.userData.max_chapter > 3) {
                        GameData.userData.guideSuspend = false;
                        this.node.getComponent(guideManager).guideNext();
                    }
                } else if (GameData.userData.guideListId === 64) {
                    // 判断是否通过了第4关
                    if (GameData.userData.max_chapter > 4) {
                        GameData.userData.guideSuspend = false;
                        this.node.getComponent(guideManager).guideNext();
                    }
                } else if (GameData.userData.guideListId === 66) {
                    // 判断是否通过了第5关
                    if (GameData.userData.max_chapter > 5) {
                        GameData.userData.guideSuspend = false;
                        this.node.getComponent(guideManager).guideNext();
                    }
                } else if (GameData.userData.guideListId === 73) {
                    // 判断是否通过了第9关
                    if (GameData.userData.max_chapter > 9) {
                        GameData.userData.guideSuspend = false;
                        this.node.getComponent(guideManager).guideNext();
                    }
                } else {
                    GameData.userData.guideSuspend = false;
                    this.node.getComponent(guideManager).guideNext();
                }
            }

            if (!GameData.userData.isEndlessBattleScene) {
                //实例化预制体
                resources.load("prefabs/battle/battle_win", Prefab, (err, prefab) => {
                    if (this.audioMgr) {
                        this.audioMgr.playSound("battle_win", false);
                    }
                    this.hint = instantiate(prefab);
                    this.hint.addComponent(BattleResultControllers);

                    // this.hint.getComponent(BattleResultControllers).setReward();
                    this.node.addChild(this.hint);
                    this.hint.position = v3(0, 0, 0);
                    //播放音效
                    if (this.audioMgr) {
                        this.audioMgr.playSound("get_goods", false);
                    }
                    // this.scheduleOnce(() => {
                    //     this.toNextChapter();
                    // }, 5);
                });
            }
            else {
                this.toNextChapter();
            }
        } else {//敌人还有存活并且到达终点，失败
            //销毁剩余敌人
            for (let index = 0; index < this.enemys.length; index++) {
                this.enemys[index].destroy();
            }
            this.enemys = [];
            this.battle_failed.active = true;
            this.battle_failed.getComponent(Animation).play("battle_failed")
            if (this.audioMgr) {
                this.audioMgr.playSound("battle_lose", false);
            }
            if (GameData.userData.isEndlessBattleScene) {
                this.scheduleOnce(() => {
                    this.battle_failed.active = false;
                    this.endless_stop_view.active = true;
                    this.stop_view_close_btn.active = false;
                    director.pause();
                }, 3);
            } else {
                this.scheduleOnce(() => {
                    this.battle_failed.active = false;
                    this.returnChapter();
                }, 3);
            }

            // resources.load("prefabs/battle/battle_lose", Prefab, (err, prefab) => {
            //     this.audioMgr.playSound("battle_lose", false);
            //     let hint = instantiate(prefab);
            //     this.hint = hint;
            //     this.node.addChild(this.hint);
            //     this.hint.position = v3(0, 0, 0);
            //     this.scheduleOnce(() => {
            //         hint.destroy();
            //     }, 1);
            //     if (GameData.userData.bonusADLastNum < GameData.userData.bonusADTodayNum) {
            //         this.showBonusBoxTime();
            //     } else {
            //         // console.log('不展示季度奖金');
            //         this.scheduleOnce(() => {
            //             this.returnChapter();
            //         }, 3);
            //     }
            // });
        }
        GameData.taskData.dailyTaskContentNumList[1]++;

        this.is_All_dead = false;
        this.is_end = false;

        if (GameData.userData.guidanceId != -1) return

        // GameData.saveData()
        // GameData.setBattleData()
    }
    showBonusBoxTime() {
        let bonus_box = instantiate(this.bonus_box);
        bonus_box.setParent(this.node);
        bonus_box.setPosition(0, 0);
    }

    //成功，刷新地图
    toNextChapter() {
        if (GameData.userData.guidanceId == 13) {
            this.node.getChildByName('guidance_box').getComponent(BattleGuidanceController).updateGuidance();
            return;
        }

        if (this.chapter_id == 3 && !this.isReview) {
            this.isReview = true
            // this.node.getChildByName("review_box").active = true;
            // return;
        }

        this.ctorMap();

        // GameData.saveData()
        GameData.setBattleData()
    }

    //失败，重新开始本关
    returnChapter() {
        if (!GameData.userData.isEndlessBattleScene) {
            GameData.userData.chapter = this.chapter_id <= 0 ? 1 : this.chapter_id;
            this.chapter_id = GameData.userData.chapter;
            GameData.userData.lose_chapter = this.chapter_id;
        }

        // if(GameData.userData.hasGoodsList[12] < GameData.userData.batteryNumberLimit) {
        //     if(GameData.userData.hasGoodsList[12] + 6 <= GameData.userData.batteryNumberLimit) {
        //         GameData.userData.hasGoodsList[12] += 6;
        //         let str = "Power +6";
        //         resources.load("prefabs/font/power",Prefab,(err,prefab)=>{
        //             const label = instantiate(prefab);
        //             label.setParent(this.battery_progress_bar);
        //             label.getComponent(FontVFXController).init(str,"#77E236");
        //         });
        //     } else {
        //         let str = `Power +${GameData.userData.batteryNumberLimit-GameData.userData.hasGoodsList[12]}`;
        //         resources.load("prefabs/font/power",Prefab,(err,prefab)=>{
        //             const label = instantiate(prefab);
        //             label.setParent(this.battery_progress_bar);
        //             label.getComponent(FontVFXController).init(str,"#77E236");
        //         });
        //         GameData.userData.hasGoodsList[12] = GameData.userData.batteryNumberLimit;
        //     }
        //     this.updateBatteryStrengthen();
        // }

        this.ctorMap();

        if (GameData.userData.guidanceId != -1) return

        // GameData.saveData()
        GameData.setBattleData()
    }

    //进入主界面 存储数据
    goMainUI() {
        GameData.userData.isEndlessBattleScene = false;
        // if (GameData.userData.guidanceId == -1) {
        //     GameData.userData.guidanceId = 0;
        // }
        console.log("进入主界面的新手引导编号：" + GameData.userData.guidanceId)
        GameData.saveData(false);
        this.audioMgr.stopMusic();
        this.audioMgr.stopAllSound();
        director.loadScene("Main UI");
    }

    //以下代码不再生效
    start(): void {
        if (GameData.userData.guideListId === 29) {
            this.node.getChildByName("btn_go_MainUI").getComponent(Button).interactable = false;
        }
        //解锁站位 观看广告
        let lock_build_view = this.node.getChildByName("lock_build_view");
        lock_build_view.active = false;
        this.node.getChildByName("btn_lock_build").on(Node.EventType.TOUCH_END, () => {
            lock_build_view.active = true; let ctrl = lock_build_view.getComponent(BattleLockBuildControllers);
            ctrl.init();
        }, this);
        this.changeLockBuild();

        //全体禁锢
        this.node.getChildByName("btn_all_stop").on(Node.EventType.TOUCH_END, () => {
            // if (sys.isNative) {
            //     console.log("观看广告");
            //     TapSDKManager.onPullAD("8");
            // } else {
            //直接获得效果
            //     this.onAdAllStop();
            // }
            if (!SDKManagers.SdkOn) {
                this.onAdAllStop();
                return;
            }
            if (sys.isNative) {
                if (SDKManagers.SDKType === 1) {
                    LeChenManager.onAdClick(SDKManagers.Positions.ONE, "8");
                }
                return;
            }
            MoYangManagers.AD_id = "8";
            MoYangManagers.playAd();
        }, this);
        //全体伤害
        this.node.getChildByName("btn_all_atk").on(Node.EventType.TOUCH_END, () => {
            // if (sys.isNative) {
            //     console.log("观看广告");
            //     TapSDKManager.onPullAD("9");
            // } else {
            //直接获得效果
            //       this.onAdAllHurt();
            //    }
            if (!SDKManagers.SdkOn) {
                this.onAdAllHurt();
                return;
            }
            if (sys.isNative) {
                if (SDKManagers.SDKType === 1) {
                    LeChenManager.onAdClick(SDKManagers.Positions.ONE, "9");
                }
                return;
            }
            MoYangManagers.AD_id = "9";
            MoYangManagers.playAd();
        }, this);
        //技能冷却提示
        this.node.getChildByName("btn_all_stop").getChildByName("mask").on(Node.EventType.TOUCH_END, () => {
            ToastControllers.Instance.showToast("技能冷却中,每关可使用1次");
        }, this);
        this.node.getChildByName("btn_all_atk").getChildByName("mask").on(Node.EventType.TOUCH_END, () => {
            ToastControllers.Instance.showToast("技能冷却中,每关可使用1次");
        }, this);
    }

    //增加业绩
    public addPerformanceValue(num: number) {
        // GameData.userData.performance_value += num;
        //   GameData.saveData();
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();
        //引导任务
        //GameData.taskData.taskPerformanceAddNum += num;
    }

    //关闭解锁站位按键
    changeLockBuild() {
        if(!GameData.userData.chapter) GameData.userData.chapter = GameData.userData.max_chapter;
        if (GameData.userData.chapter < 10) {
            this.node.getChildByName("btn_lock_build").active = false;
        }
        // if (GameData.userData.lockBuildNeedAdNum >= 5) {
        //     this.node.getChildByName("btn_lock_build").active = false;
        // }
    }

    //注册宝箱点击事件
    initBoxView() {
        this.reward_view = this.node.getChildByName("Reward_view");
        this.reward_view.active = false;
        this.Box = this.node.getChildByName("Box");
        this.Box.on(Button.EventType.CLICK, this.boxCallBack, this);
        //注册关闭事件
        this.node.on(Node.EventType.TOUCH_END, this.clickOther, this);

        //宝箱中储存的奖励
        this.box_reward = GameData.battleData.BoxRewardList;
        for (let index = 0; index < this.box_reward.length; index++) {
            const element = this.box_reward[index];
            //初始化奖励
            this.initReward(this.box_reward);
        }
    }
    //显示奖励页面
    boxCallBack() {
        this.reward_view.active = true;
        //暂停box上的所有事件
        this.Box.pauseSystemEvents(true);
        //  console.log('点击宝箱');
        BoxRewardControllers.Instance.setboxReward();
        if (GameData.userData.guideListId === 60) {
            this.node.getComponent(guideManager).guideNext();
        }
    }

    initReward(data) {
        if (data.reward === undefined) return;
        //实例化奖励预制体
        resources.load("prefabs/battle/BaseIcon", Prefab, (err, prefab) => {
            let reward_icon = instantiate(prefab);
            let bg = this.reward_view.getChildByName("bg");
            let view = bg.getChildByName("view");
            let content = view.getChildByName("content");
            content.addChild(reward_icon);
            let icon = reward_icon.getChildByName("icon").getComponent(Sprite);
            resources.load(
                "images/goods/" + data.reward + "/spriteFrame",
                SpriteFrame,
                (err, spriteFrame) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    icon.spriteFrame = spriteFrame;
                }
            );
            let reward_num = reward_icon
                .getChildByName("number")
                .getComponent(Label);
            // reward_num.string = data.number;
        });
    }
    //点击其他地方关闭页面
    clickOther() {
        if (this.reward_view.active) {
            this.reward_view.active = false;
            //恢复box上的所有事件
            this.Box.resumeSystemEvents(true);
            //console.log('关闭宝箱');
        }
    }

    //全体禁锢
    onAdAllStop() {
        let allstop = () => {

            for (let index = 0; index < this.enemys.length; index++) {
                const enemy = this.enemys[index];
                let ctrl = enemy.getComponent(EnemyControllers);
                //ctrl.onAdSkillStop();
            }
        };
        if (this.isfirstAllStop) {
            this.scheduleOnce(() => {
                allstop();
            }, 0.5);
            this.isfirstAllStop = false;
        }
    }

    //全体伤害
    onAdAllHurt() {
        let allhurt = () => {
            for (let index = 0; index < this.enemys.length; index++) {
                const enemy = this.enemys[index];
                let ctrl = enemy.getComponent(EnemyControllers);
                //ctrl.onAdSkillHurt();
            }
        };
        if (this.isfirstAllHurt) {
            this.scheduleOnce(() => {
                allhurt();
            }, 0.5);
            this.isfirstAllHurt = false;
        }
    }


    //右滑进入主界面，注册滑动接收监听
    onTouchMainUI() {
        this._singleTouchCtr = this.node.addComponent(TouchMainUIControllers);
        this._singleTouchCtr.node.on(TouchMainUIControllers.SingleTouchDownEvent, this.onTouchDown);
        this._singleTouchCtr.node.on(TouchMainUIControllers.SingleTouchMoveEvent, this.onTouchMove);
        this._singleTouchCtr.node.on(TouchMainUIControllers.SingleTouchUpEvent, this.onTouchUp);
    }
    onTouchDown(pos: Vec2) {
        BattleManager.Instance.start_pos = pos;
    }
    onTouchMove(pos: Vec2) {
        BattleManager.Instance.move_pos = pos;
    }
    onTouchUp(pos: Vec2) {
        BattleManager.Instance.end_pos = pos;
        let view_size = view.getCanvasSize();
        //console.log(view_size);
        if (BattleManager.Instance.end_pos.x > BattleManager.Instance.start_pos.x + view_size.width * 0.6) {
            BattleManager.Instance.goMainUI();
        }
    }
}
