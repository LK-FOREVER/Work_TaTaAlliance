import { _decorator, Component, director, error, Game, JsonAsset, resources, sys } from "cc";
import { MD5 } from "./MD5";
import { LoginController } from "../Controllers/login/LoginController";
import EventManager from "./EventManager";
import { EventConst } from "./EventConst";
const { ccclass, property } = _decorator;

type GameStruct = {
    TowerObj: any[];
    WaitTowerList: any[];
    BoxRewardList: any[];
}

@ccclass("GameData")
export class GameData extends Component {
    static _Instance = null;

    static get Instance() {
        if (this._Instance === null) {
            this._Instance = new GameData()
        }
        return this._Instance
    }

    scheduleID = null;

    static taskData = {
        continuousTaskId: 0,
        continueTaskContentNumList: [0, 0, 0, 0, 0],
        dailyTaskContentNumStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dailyTaskContentNumList: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    };

    static openFurniture = false;

    //taptap登录data
    static loginData = null;

    static userData = {
        nickName_InGame: "user", //真昵称
        nickName: "user", //SDK把nickname里面装账号信息，这才是真登录账号
        account: "null", //账户
        use_id: "null", //用户ID
        player_id: "", //用户id
        head_icon: "6001", //头像id
        age: "0", //年龄
        create_nickname: false, //是否创建过昵称
        play_comic: false, //是否播放过漫画
        play_comic_num: 0, //播放第几张漫画
        resetTime: null, //玩家上次登录的时间
        career: 1, //职位
        chapter: 1, //章节
        max_chapter: 1, //通关最大章节
        lose_chapter: 0, //失败最大章节
        revenue_capability: 1000000, //营收能力
        decision_re_capability: 0, //决策加成营收能力
        performance_value: 1000, //业绩值
        head: "1", //之前的头像id,现在未使用
        decision_card: 5, //决策抽取数量
        inviteNum: 1, //招募员工数量
        randomItemList: [], //招聘员工的列表
        // inviteTodayNum: 5, //当日招募员工总次数
        // inviteTodayLastNum: 5, //当日剩余招募员工次数
        inviteTodayAdNum: 1, //原来为当日广告招募员工总次数，现在改为 每日免费招募员工总次数
        inviteTodayAdLastNum: 1, //原来是当日剩余广告招募员工次数，现在改为 每日免费招募员工剩余次数
        inviteTodayAdNum1: 1, //当日广告招募员工总次数(精英)
        inviteTodayAdLastNum1: 1, //当日剩余广告招募员工次数(精英)
        inviteNumTotalOrange: 50, //距离必得橙色员工的次数
        inviteNumTotalRed: 10, //距离必得红色员工的次数
        inviteNumDefaultTotal: 50, //默认必得保底员工的次数
        inviteNormalDisableTime: null, //普通招聘禁用剩余时间
        inviteSpecialDisableTime: null, //特殊招聘禁用剩余时间
        inviteLimiteDailyTotalNum: 30, //每日最多可招募次数
        inviteLimiteDailyNum: 0, //当日已招募次数
        basicInviteTime: 2, //基础禁用时间（分钟） 时间戳：30 * 60 * 1000
        orangeStaff: 0, //橙色员工概率
        guideSwitch: false, //引导开关
        guideSuspend: true, //引导暂停 true为暂停
        guideFreeInviteNum: 0, //引导免费招聘次数
        guideId: 1, //引导编号
        guideListId: 1, //引导列表编号
        guidanceId: 0, //新手引导编号
        isBattleSuspend: false, //是否开启战斗暂停
        isFirstStartBattle: true, // 是否为第一次开启战斗
        audioMusic: 1, //音乐音量大小
        audioSound: 1, //音效音量大小
        unlockNum: 4, //可解锁建造点次数
        threeMinutesLater: null, //三分钟后的时间戳
        isInitialCharge: false, //是否首充
        isShare: false, //是否分享过游戏
        bonusADTodayNum: 30, //季度奖金每天观看广告次数
        bonusADLastNum: 0, //季度奖金今日观看次数
        staffUpId: 0, //角色直升已领取的奖励id
        staffUpLastNeedAdNum: 0, //角色直升需要观看广告的数量
        lockBuildNeedAdNum: 0, //解锁站位观看广告的数量
        sevenSignIsOpen: false, //当天是否打开过，打开后变为true并隐藏红色感叹号，每天0点刷新（领完7日奖励（包含广告）隐藏入口图标 不用对它单独判断）
        sevenSignIsReceive: false, //是否领取了当天的奖励
        sevenSignDay: 1, //当前7日登录的天数，每天0点如果领取了当天的奖励跳转下一天
        sevenSignIsADReceive: false, //是否领取了当天广告的奖励
        hangupStartTime: null, //挂机开始时间
        hangupAlreadyTime: 0, //已经挂机时间
        basicHangupTime: 30, //基础挂机时间（分钟） 时间戳：30 * 60 * 1000
        addHangupTime: 0, //增加的挂机时间（分钟）
        hangupPromotionId: 1, //挂机奖励职位表id 每增加一次挂机时间id+1
        dailyAccumulatedTime: 0, // 累计在线分钟数（精确到毫秒）
        lastUpdateTime: null, // 最后更新在线时长的 时间戳
        updateTimes: 0, // 在线时间的累计更新次数（每过一秒就更新一次在线时间，更新60次即过了一分钟之后，每日任务中的在线时长就+1）
        isSidebarEnter: false, //是否从侧边栏进入
        isFirstEnterReward: true, //是否第一次领取入口奖励
        batteryNumberLimit: 120, //电量上限
        batteryAdBuyLastNumber: 1, //广告购买电量的剩余次数
        batteryAdBuyNumber: 1, //广告购买电量的总次数
        batteryBullionBuyLastNumber: 2, //水晶购买电量的剩余次数，原来是金条购买电量的剩余次数
        batteryBullionBuyNumber: 2, //水晶购买电量的总次数，原来是金条购买电量的总次数
        batteryBullionCost: 60, //购买电量的消耗水晶数，原来是购买电量的消耗金条数
        isEndlessBattleScene: false, //标记是否是无尽挑战模式下的战斗场景
        endlessChallengeMaxScore: 0, //无尽挑战最高积分
        endlessChallengeMaxSurvive: 0, //无尽挑战最高存活波数
        endlessLikeCount: 3, //无尽挑战每天的点赞次数
        endlessChapter: 1,//无尽挑战关卡数
        endlessChooseSurvive: 1,//无尽挑战所选择的波数
        endlessRewardStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 无尽挑战，奖励状态    0：未领取  1：已领取
        // 电量强化值
        batteryStrengthenValue0: 0,//单体型强化值
        batteryStrengthenValue1: 0,//群体型强化值
        batteryStrengthenValue2: 0,//控制型强化值
        batteryStrengthenValue3: 0,//持续型强化值 
        // 电量强化等级
        batteryStrengthenLv0: 0,//单体型等级
        batteryStrengthenLv1: 0,//群体型等级
        batteryStrengthenLv2: 0,//控制型等级
        batteryStrengthenLv3: 0,//持续型等级
        // 娃娃机等级
        doll_machine_lv: 1,//娃娃机等级
        friend_added_num: 0,//加过几个好友（添加每个好友id的唯一性）
        cost_money_month: 0, //累积消费额度
        // 拥有的装备列表
        // 通过装备类型分组，每个装备类型存的值为装备的信息
        // 0: 单体型，1：群体型，2：控制型，3：持续型
        // 数组的下标+1就是装备放置的位置
        hasEquipList: {
            0:
                [{ equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 }],
            1:
                [{ equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 }],
            2:
                [{ equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 }],
            3:
                [{ equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
                { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 }]
        },
        // 临时装备数据
        temporaryEquipData: { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 },
        // 拥有的临时装备数据
        // temporaryHasEquipData: null,
        random_equip_type: null,
        random_equip_position: null,
        //商品数据
        money_item_status: [false, false, false, false, false, false], // 充值商品是否首充
        ad_item_times: [5, 1, 1, 1, 1], // 广告商品限购次数
        daily_item_times: [1, 10, 1, 5, 1], // 日礼包限购次数{}
        weekly_item_times: [10, 10, 5, 5], // 周礼包限购次数
        monthly_item_times: [999, 999, 999, 999, 999], // 原来是月礼包限购次数，现在改为水晶礼包限购次数，999表示无限
        has_monthly_plan_1: false, //是否拥有财富月卡
        monthly_plan_1_date: null, //财富月卡购买日期
        monthly_plan_1_day: 0, //财富月卡生效天数
        has_monthly_plan_1_reward: false, //是否已领取当日财富月卡奖励
        has_monthly_plan_2: false, //是否拥有特权月卡，目前不再使用该功能，在ShopController中注释掉了，所以has_monthly_plan_2永远为false
        monthly_plan_2_date: null, //财富月卡购买日期
        monthly_plan_2_day: 0, //特权月卡生效天数
        random_friend_add_num: 3,//每天随机添加好友的数量
        //拥有的道具列表
        hasGoodsList: {
            1: 0, //原来是现金，现在修改为了金币
            2: 0, //原来业绩值，现在修改为了功勋
            3: 0, //事件值
            4: 0, //金条
            5: 0, //原来是普通简历，现在修改为了招募令
            6: 0, //人才简历
            7: 0, //工牌
            8: 0, //原来是游戏币，现在修改为了精钢
            9: 0, //加速器
            10: 0, //经验值
            11: 0, //原来是电量，现在修改为水晶
            12: 120, //电量
        },
        // 建筑获得的加成
        furniture_add: {
            // 攻击
            atk: 0,
            // 每日免费招聘次数
            inviteTodayAdLastNum: 2,
            //战斗挂机奖励
            battle_Idle_Reward: 0,
            //英雄攻击速度
            atk_spd: 0,
            //任务金币奖励
            task_coin_reward: 0,
            // 营收能力
            revenue_capability: 0,
            // 招聘员工数
            inviteNum: 0,
            // 橙色员工概率
            orangeStaff: 0,
        },
        //已解锁建造点
        builds: [
            {
                lock: true,
            },
            {
                lock: true,
            },
            {
                lock: true,
            },
            {
                lock: true,
            },
            {
                lock: false,
            },
            {
                lock: false,
            },
            {
                lock: false,
            },
            {
                lock: false,
            },
        ],
        // 拥有员工碎片数量
        towerDebris: {
            2001: 0,
            2002: 0,
            2003: 0,
            2004: 0,
            2005: 0,
            2006: 0,
            2007: 0,
            2008: 0,
            2009: 0,
            2010: 0,
            2011: 0,
            2012: 0,
            2013: 0,
            2014: 0,
            2015: 0,
            2016: 0,
            11001: 0,
            11002: 0,
        },
        // 拥有员工的等级
        towerLv: {
            1001: 1,
            1002: 1,
            1003: 0,
            1004: 0,
            1005: 1,
            1006: 0,
            1007: 0,
            1008: 1,
            1009: 0,
            1010: 0,
            1011: 0,
            1012: 0,
            1013: 0,
            1014: 0,
            1015: 0,
            1016: 0,
        },
        // 拥有员工的额外加成属性
        towerAddAttribute: {
            1001: [],
            1002: [],
            1003: [],
            1004: [],
            1005: [],
            1006: [],
            1007: [],
            1008: [],
            1009: [],
            1010: [],
            1011: [],
            1012: [],
            1013: [],
            1014: [],
            1015: [],
            1016: [],
        },
        //拥有员工列表
        towerlist: [
            { "id": 1001, "name": "埃里克", "english_name": "Poseidon", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2001, "icon_id": 1001, "draw_id": 3001, "voice_id": 4001, "pub_id": 5001, "spine_id": "spine_1001", "idle_id": "idle_1001", "attack_id": "attack_1001", "atk": 5, "atk_base": 5, "atk_grow": 10, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.05, "crit_hurt": 1.05, "poison": 4, "poison_base": 4, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1002, "name": "艾莉安娜", "english_name": "White Impermanence", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2002, "icon_id": 1002, "draw_id": 3002, "voice_id": 4002, "pub_id": 5002, "spine_id": "spine_1002", "idle_id": "idle_1002", "attack_id": "attack_1002", "atk": 10, "atk_base": 10, "atk_grow": 20, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1005, "name": "雷欧娜", "english_name": "Athena", "hurttype": "群体型", "staff_type_id": 1, "quality": 5, "max_lv": 100, "piece_goods_id": 2005, "icon_id": 1005, "draw_id": 3005, "voice_id": 4005, "pub_id": 5005, "spine_id": "spine_1005", "idle_id": "idle_1005", "attack_id": "attack_1005", "atk": 3, "atk_base": 3, "atk_grow": 6, "bullet_spd": 1250, "atk_spd": 1, "range": 300, "radius": 100, "crit": 0.05, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1008, "name": "石心", "english_name": "Inferno Judge", "hurttype": "控制型", "staff_type_id": 2, "quality": 5, "max_lv": 100, "piece_goods_id": 2008, "icon_id": 1008, "draw_id": 3008, "voice_id": 4008, "pub_id": 5008, "spine_id": "spine_1008", "idle_id": "idle_1008", "attack_id": "attack_1008", "atk": 4, "atk_base": 4, "atk_grow": 8, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0.15, "slow_time": 2, "is_return": 0, "build_id": 0, "introduce": "" },
        ],

        friendlist:
            [

            ],
        // 使用中的建筑的列表
        buildList: [
            {
                buildId: 1,
                build_lv: 1,
            },
            {
                buildId: 2,
                build_lv: 1,
            },
            {
                buildId: 3,
                build_lv: 1,
            },
            {
                buildId: 4,
                build_lv: 1,
            },
            {
                buildId: 5,
                build_lv: 1,
            },
        ],
        // 拥有建筑的等级[1, 2, 3, 4]
        buildLvList: {
            1: [1],
            2: [1],
            3: [1],
            4: [1],
            5: [1],
        },
        //已选择的决策，必须是15个
        decisionList: [],

        //无尽挑战点赞记录
        endlessLikedPlayers: {

        }
    };

    //战斗数据
    static battleData: GameStruct = {
        //战斗中已站位员工
        TowerObj: [],
        //待选择员工列表
        WaitTowerList: [],
        //宝箱存储奖励
        BoxRewardList: [],
    };

    // 默认数据
    static defaultTaskData = JSON.parse(JSON.stringify(GameData.taskData));
    static defaultBattleData = JSON.parse(JSON.stringify(GameData.battleData));
    static defaultUserData = JSON.parse(JSON.stringify(GameData.userData));

    // 属性
    static attributeType = {
        atk: "攻击",
        crit: "暴击率",
        crit_hurt: "暴击伤害",
        poison: "毒伤",
        duration: "毒伤持续时间",
        slow: "减速效果",
        slow_time: "减速持续时间",
        is_return: "攻击次数",
    };

    // 替换数据
    static replaceData() {
        if (!GameData.userData.guideSwitch) return;
        if (GameData.userData.guideSuspend) return;
        // 引导小于前三关恢复默认数据
        // if (GameData.userData.guideListId <= 58) {
        //     GameData.taskData = GameData.defaultTaskData;
        //     GameData.userData = GameData.defaultUserData;
        //     GameData.battleData = GameData.defaultBattleData;
        // }
    }

    // 节流函数
    static throttle(func, delay) {
        let lastCall = 0;
        return (...args) => {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func.apply(this, args);
        };
    }

    //转换number
    static num2cn(num) {
        if (num < 100000) {
            return num;
        }
        if (num < 1000000) {
            return Math.floor(num / 10000) + "万";
        }
        if (num < 10000000) {
            return Math.floor(num / 1000000) + "百万";
        }
        if (num < 100000000) {
            return Math.floor(num / 10000000) + "千万";
        }
        return Math.floor(num / 100000000) + "亿";
    }

    //存储宝箱数据
    static setBoxReward(data) {
        let reward_list = GameData.battleData.BoxRewardList;
        let existingReward = reward_list.find(item => item.reward === data.reward);

        if (existingReward) {
            // 存在相同类型，累加数量
            if (data.reward === 1) {
                existingReward.number = Math.min(existingReward.number + data.number, 50000);
            } else {
                existingReward.number = Math.min(existingReward.number + data.number, 50);
            }
        } else {
            // 不存在相同类型，新增
            if (data.reward === 1) {
                data.number = Math.min(data.number, 50000);
            } else {
                data.number = Math.min(data.number, 50);
            }
            reward_list.push(data);
        }
        GameData.setBattleData();
    }


    //初始15个已选择状态
    static setDefaultDecision() {
        //获得决策数据
        let decisionData = null;
        new Promise((resolve, reject) => {
            // 动态加载json文件
            resources.load(
                "data/decision__get_decision",
                (err: any, res: JsonAsset) => {
                    if (err) {
                        error(err.message || err);
                        return;
                    }
                    // 获取到 Json 数据
                    const jsonData: object = res.json!;
                    resolve(jsonData);
                }
            );
        }).then((jsonData: object) => {
            decisionData = jsonData;
            //已选择的决策列表
            let defaultdecisionData = GameData.userData.decisionList;
            if (defaultdecisionData.length < 15) {
                let player_lv = GameData.userData.career;
                for (const key in decisionData) {
                    const element = decisionData[key][key];
                    //等级为1时
                    if (player_lv == 1 && player_lv >= element.lv) {
                        element.is_select = true;
                        defaultdecisionData.push(element);
                    }
                }
            } else {
                return;
            }
        });
    }

    // static setDefaultDecision() {
    //     var decisionData = null;

    //     // Simulate the Promise-based resource loading with a callback-based approach
    //     resources.load('data/decision__get_decision', function(err, res:any) {
    //         if (err) {
    //             // Handle the error in an ES5-compatible way
    //             console.error(err.message || err);
    //             return;
    //         }

    //         // Get the JSON data
    //         var jsonData = res.json;
    //         decisionData = jsonData;

    //         // Selected decision list
    //         var defaultDecisionData = GameData.userData.decisionList;

    //         if (defaultDecisionData.length < 15) {
    //             var player_lv = GameData.userData.career;

    //             // Iterate over the decisionData object
    //             for (var key in decisionData) {
    //                 if (decisionData.hasOwnProperty(key)) {
    //                     var element = decisionData[key][key];

    //                     // Level is 1
    //                     if (player_lv === 1 && player_lv >= element.lv) {
    //                         element.is_select = true;
    //                         defaultDecisionData.push(element);
    //                     }
    //                 }
    //             }
    //         } else {
    //             // Do nothing if the list already has 15 or more items
    //         }
    //     });
    // }

    //存储战斗数据
    static setBattleData() {
        let battleStr = JSON.stringify(GameData.battleData);
        //添加一个存储，key，value
        sys.localStorage.setItem(GameData.userData.nickName + "battleData", battleStr);
    }

    //存储玩家数据
    static setUserData() {
        let userStr = JSON.stringify(GameData.userData);
        //添加一个存储，key，value
        sys.localStorage.setItem(GameData.userData.nickName + "userData", userStr);
        GameData.setTaskData();
        GameData.setBattleData();
        EventManager.Instance.emit(EventConst.UPDATE_SHOP)
    }
    //存储任务数据
    static setTaskData() {
        let taskStr = JSON.stringify(GameData.taskData);
        //添加一个存储，key，value
        sys.localStorage.setItem(GameData.userData.nickName + "taskData", taskStr);
        // if (LoginController.isHttp) {
        //     GameData.sendDataRequest();
        // }
    }

    //获取玩家数据
    static getUserData() {
        //获取一个key
        let strValue = sys.localStorage.getItem(GameData.userData.nickName + "userData");
        if (strValue != "undefined" && strValue != null) {
            try {
                const data = JSON.parse(strValue);
                return data;
                // 处理解析后的数据
            } catch (error) {
                console.error("解析 JSON 失败:", error);
                // 在这里处理错误，比如提供一个默认值或者抛出错误
            }
            // let data = JSON.parse(strValue);
            // console.log(data);

            // return data
        } else {
            return null;
        }
    }
    //获取战斗数据
    static getBattleData() {
        //获取一个key
        let strValue = sys.localStorage.getItem(GameData.userData.nickName + "battleData");
        if (strValue != "undefined") {
            let data = JSON.parse(strValue);
            return data;
        } else {
            return null;
        }
    }

    //获取任务数据
    static getTaskData() {
        //获取一个key
        let strValue = sys.localStorage.getItem(GameData.userData.nickName + "taskData");
        if (strValue != "undefined") {
            let data = JSON.parse(strValue);
            return data;
        } else {
            return null;
        }
    }
    //保存数据请求
    sendDataRequest() {
        // const url = `http://game3-haiwai.julelekeji.cn/login/login_api.php`;
        // const Key = "0Ee2lkMDT@O$ildv8GGuIxNRP02RW3ww";
        // enum DATA_TYPE {
        //     SAVE = 4,
        // }

        // let data = {
        //     account: "null",
        //     player_id: "",
        //     time: 0,
        //     sign: "",
        //     data1: null,
        //     data2: null,
        //     data3: null,
        //     type: 4,
        // };

        // //当前时间
        // let date = new Date();
        // data.time = date.getTime()/1000;
        // data.account = GameData.userData.account;
        // data.player_id = GameData.userData.player_id;
        // data.sign = MD5.instance.hex_md5(data.account + data.player_id + data.time + Key);
        // //换大写
        // data.sign = data.sign.toUpperCase();
        // data.type = DATA_TYPE.SAVE;
        // let userdata = GameData.userData;
        // let taskdata = GameData.taskData;
        // let battledata = GameData.battleData;

        // // 转换为JSON字符串
        // let userstring = JSON.stringify(userdata);
        // let taskstring = JSON.stringify(taskdata);
        // let battlestring = JSON.stringify(battledata);
        // data.data1 = userstring;
        // data.data2 = taskstring;
        // data.data3 = battlestring;

        // var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
        // httpRequest.open("POST", url, true); //第二步：打开连接

        // /**
        //  *发送json格式文件必须设置请求头 ；如下 -
        //  */
        // httpRequest.setRequestHeader(
        //     "Content-type",
        //     "application/x-www-form-urlencoded; charset=UTF-8"
        // ); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        // let urldata = JSON.stringify(data);
        // httpRequest.send(urldata); //发送请求 将json写入send中
        // /**
        //  * 获取数据后的处理程序
        //  */
        // httpRequest.onreadystatechange = () => {
        //     if (navigator.onLine) {
        //         //请求后的回调接口，可将请求成功后要执行的程序写在其中
        //         if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        //             //验证请求是否发送成功
        //             var json = httpRequest.responseText; //获取到服务端返回的数据
        //             console.log("保存数据", json);
        //             let response = JSON.parse(json);
        //             if (response.success === true) {
        //                 EventManager.Instance.emit(EventConst.SAVE_SUCCESS);
        //             } else {
        //                 director.loadScene("Login")
        //             }
        //         } else if (httpRequest.readyState == 4 && httpRequest.status != 200) {
        //             director.loadScene("Login")
        //         }
        //     } else {
        //         director.loadScene("Login")
        //     }
        // };
    }

    saveData() {
        // if(this.scheduleID) {
        //     this.unschedule(this.scheduleID);
        //     this.scheduleID = null;
        // } 
        // this.scheduleID = ()=>this.sendDataRequest()
        // this.schedule(this.scheduleID,2*60)
    }

    static updateTime() {

    }
}
