import { _decorator, Component, director, error, Game, JsonAsset, resources, sys } from "cc";
import { MD5 } from "./MD5";
import { LoginController } from "../Controllers/login/LoginController";
import EventManager from "./EventManager";
import { EventConst } from "./EventConst";

import netManager from "../Network/netManager";
import { util } from "protobufjs";
import { TextUtils } from "./TextUtils";
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
    static client_data: any;//客户端请求服务器的数据

    scheduleID = null;

    static taskData = {
        continuousTaskId: 0,
        continueTaskContentNumList: [0, 0, 0, 0, 0],
        dailyTaskContentNumStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dailyTaskContentNumList: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    };

    static openFurniture = false;

    static loginData = null;

    static userData = {
        nickName_InGame: "user", //游戏内创建的昵称nickname
        nickName: "user", //SDK登录账号sdkname
        use_id: "null", //用户ID 
        player_id: 1,
        head_icon: 6001, //头像id head_id
        head_border: 1,//头像框id
        srvno: "node_1",//服务器编号
        version: 0,//客户端版本号
        age: "0", //年龄
        create_nickname: false, //是否创建过昵称
        online_flag: true, //是否在线
        last_logout_time: null, //上次下线时间
        play_comic: false, //是否播放过漫画
        play_comic_num: 0, //播放第几张漫画
        resetTime: null, //玩家上次登录的时间,秒
        career: 1, //职位
        chapter: 1, //章节
        max_chapter: 1, //通关最大章节
        lose_chapter: 0, //失败最大章节
        inviteNum: 1, //招募员工数量
        randomItemList: [], //招聘员工的列表
        inviteTodayAdNum: 1, //原来为当日广告招募员工总次数，现在改为 每日免费招募员工总次数
        inviteTodayAdLastNum: 1, //原来是当日剩余广告招募员工次数，现在改为 每日免费招募员工剩余次数
        inviteNumTotalOrange: 50, //距离必得橙色员工的次数
        inviteNumTotalRed: 10, //距离必得红色员工的次数
        inviteNumDefaultTotal: 50, //默认必得保底员工的次数
        inviteLimiteDailyTotalNum: 30, //每日最多可招募次数
        inviteLimiteDailyNum: 0, //当日已招募次数
        orangeStaff: 0, //橙色员工概率
        guideSwitch: false, //引导开关
        guideSuspend: true, //引导暂停 true为暂停
        guideId: 1, //引导编号
        guideListId: 1, //引导列表编号
        guidanceId: 0, //新手引导编号
        isBattleSuspend: false, //是否开启战斗暂停
        isFirstStartBattle: true, // 是否为第一次开启战斗
        audioMusic: 1, //音乐音量大小
        audioSound: 1, //音效音量大小
        unlockNum: 4, //可解锁建造点次数
        isInitialCharge: false, //是否首充
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
        isFirstEnterReward: true, //是否第一次领取入口奖励
        batteryNumberLimit: 120, //电量上限
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
        random_equip_type: null,//随机装备类型string
        random_equip_position: null,//随机装备位置int
        //商品数据
        money_item_status: [false, false, false, false, false, false], // 充值商品是否首充
        ad_item_times: [5, 1, 1, 1, 1], // 广告商品限购次数
        daily_item_times: [1, 10, 1, 5, 1], // 日礼包限购次数
        weekly_item_times: [10, 10, 5, 5], // 周礼包限购次数
        monthly_item_times: [999, 999, 999, 999, 999], // 原来是月礼包限购次数，现在改为水晶礼包限购次数，999表示无限
        has_monthly_plan_1: false, //是否拥有财富月卡,不再使用
        monthly_plan_1_date: null, //财富月卡购买日期，不再使用
        monthly_plan_1_day: 0, //财富月卡生效天数，不再使用
        has_monthly_plan_1_reward: false, //是否已领取当日财富月卡奖励，不再使用
        has_monthly_plan_2: false, //是否拥有特权月卡，目前不再使用该功能，在ShopController中注释掉了，所以has_monthly_plan_2永远为false，不再使用
        monthly_plan_2_date: null, //财富月卡购买日期，不再使用
        monthly_plan_2_day: 0, //特权月卡生效天数，不再使用
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
        // decisionList: [],

        //无尽挑战点赞记录
        endlessLikedPlayers: {},

        //好友赠送金币列表
        friend_gift_list: {},
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
    //保存数据到服务器
    static saveData(isLogin: boolean) {
        GameData.initData(isLogin);
        EventManager.Instance.emit(EventConst.QUERY_266, this.client_data);
    }
    static initData(isLogin: boolean) {
        if (this.client_data == null) {
            return;
        }
        let data = this.client_data.client_data;
        console.log("isNew:", this.client_data.client_data.is_new)
        if (isLogin && this.client_data.client_data.is_new == 1) {
            //新号并且是登录，就进行初始化
            data.is_new = 0, //标记为旧号
                data.user_data.nickname = GameData.userData.nickName_InGame,
                data.user_data.sdkname = GameData.userData.nickName,
                data.user_data.head_id = GameData.userData.head_icon, //头像id
                data.user_data.age = GameData.userData.age, //年龄
                data.user_data.head_border = GameData.userData.head_border,//头像框id
                data.user_data.create_nickname = GameData.userData.create_nickname, //是否创建过昵称
                data.user_data.play_comic = GameData.userData.play_comic, //是否播放过漫画
                data.user_data.play_comic_num = GameData.userData.play_comic_num, //播放第几张漫画
                data.user_data.online_flag = GameData.userData.online_flag, //是否在线
                data.user_data.last_logout_time = GameData.userData.last_logout_time, //上次下线时间
                data.user_data.resetTime = GameData.userData.resetTime, //玩家上次登录的时间
                data.user_data.career = GameData.userData.career, //职位
                // data.user_data.chapter = GameData.userData.chapter, //章节
                data.user_data.max_chapter = GameData.userData.max_chapter, //通关最大章节
                data.user_data.lose_chapter = GameData.userData.lose_chapter, //失败最大章节
                data.user_data.inviteNum = GameData.userData.inviteNum, //招募员工数量
                // data.user_data.randomItemList = GameData.userData.randomItemList, //招聘员工的列表
                data.user_data.inviteTodayAdNum = GameData.userData.inviteTodayAdNum, //原来为当日广告招募员工总次数，现在改为 每日免费招募员工总次数
                data.user_data.inviteTodayAdLastNum = GameData.userData.inviteTodayAdLastNum, //原来是当日剩余广告招募员工次数，现在改为 每日免费招募员工剩余次数
                data.user_data.inviteNumTotalOrange = GameData.userData.inviteNumTotalOrange, //距离必得橙色员工的次数
                data.user_data.inviteNumTotalRed = GameData.userData.inviteNumTotalRed, //距离必得红色员工的次数
                data.user_data.inviteNumDefaultTotal = GameData.userData.inviteNumDefaultTotal, //默认必得保底员工的次数
                data.user_data.inviteLimiteDailyTotalNum = GameData.userData.inviteLimiteDailyTotalNum, //每日最多可招募次数
                data.user_data.inviteLimiteDailyNum = GameData.userData.inviteLimiteDailyNum, //当日已招募次数
                data.user_data.orangeStaff = GameData.userData.orangeStaff, //橙色员工概率
                data.user_data.guideSwitch = GameData.userData.guideSwitch, //引导开关
                data.user_data.guideSuspend = GameData.userData.guideSuspend, //引导暂停 true为暂停
                data.user_data.guideId = GameData.userData.guideId, //引导编号
                data.user_data.guideListId = GameData.userData.guideListId, //引导列表编号
                data.user_data.guidanceId = GameData.userData.guidanceId, //新手引导编号
                data.user_data.isBattleSuspend = GameData.userData.isBattleSuspend, //是否开启战斗暂停
                data.user_data.isFirstStartBattle = GameData.userData.isFirstStartBattle, // 是否为第一次开启战斗
                data.user_data.audioMusic = GameData.userData.audioMusic, //音乐音量大小
                data.user_data.audioSound = GameData.userData.audioSound, //音效音量大小
                data.user_data.unlockNum = GameData.userData.unlockNum, //可解锁建造点次数
                data.user_data.isInitialCharge = GameData.userData.isInitialCharge, //是否首充
                data.user_data.sevenSignIsOpen = GameData.userData.sevenSignIsOpen, //当天是否打开过，打开后变为true并隐藏红色感叹号，每天0点刷新（领完7日奖励（包含广告）隐藏入口图标 不用对它单独判断）
                data.user_data.sevenSignIsReceive = GameData.userData.sevenSignIsReceive, //是否领取了当天的奖励
                data.user_data.sevenSignDay = GameData.userData.sevenSignDay, //当前7日登录的天数，每天0点如果领取了当天的奖励跳转下一天
                data.user_data.sevenSignIsADReceive = GameData.userData.sevenSignIsADReceive, //是否领取了当天广告的奖励
                data.user_data.hangupStartTime = GameData.userData.hangupStartTime, //挂机开始时间
                data.user_data.hangupAlreadyTime = GameData.userData.hangupAlreadyTime, //已经挂机时间
                data.user_data.basicHangupTime = GameData.userData.basicHangupTime, //基础挂机时间（分钟） 时间戳：30 * 60 * 1000
                data.user_data.addHangupTime = GameData.userData.addHangupTime, //增加的挂机时间（分钟）
                data.user_data.hangupPromotionId = GameData.userData.hangupPromotionId, //挂机奖励职位表id 每增加一次挂机时间id+1
                data.user_data.dailyAccumulatedTime = GameData.userData.dailyAccumulatedTime, // 累计在线分钟数（精确到毫秒）
                data.user_data.lastUpdateTime = GameData.userData.lastUpdateTime, // 最后更新在线时长的 时间戳
                data.user_data.updateTimes = GameData.userData.updateTimes, // 在线时间的累计更新次数（每过一秒就更新一次在线时间，更新60次即过了一分钟之后，每日任务中的在线时长就+1）
                data.user_data.isFirstEnterReward = GameData.userData.isFirstEnterReward, //是否第一次领取入口奖励
                data.user_data.batteryNumberLimit = GameData.userData.batteryNumberLimit, //电量上限
                data.user_data.batteryBullionBuyLastNumber = GameData.userData.batteryBullionBuyLastNumber, //上次购买电量的数量
                data.user_data.batteryBullionBuyLastNumber = GameData.userData.batteryBullionBuyLastNumber, //水晶购买电量的剩余次数，原来是金条购买电量的剩余次数
                data.user_data.batteryBullionBuyNumber = GameData.userData.batteryBullionBuyNumber, //水晶购买电量的总次数，原来是金条购买电量的总次数
                data.user_data.batteryBullionCost = GameData.userData.batteryBullionCost, //购买电量的消耗水晶数，原来是购买电量的消耗金条数= GameData.userData.batteryBullionCost, //购买电量的消耗水晶数，原来是购买电量的消耗金条数
                data.user_data.isEndlessBattleScene = GameData.userData.isEndlessBattleScene, //标记是否是无尽挑战模式下的战斗场景
                data.user_data.endlessChallengeMaxScore = GameData.userData.endlessChallengeMaxScore, //无尽挑战最高积分
                data.user_data.endlessChallengeMaxSurvive = GameData.userData.endlessChallengeMaxSurvive, //无尽挑战最高存活波数
                data.user_data.endlessLikeCount = GameData.userData.endlessLikeCount, //无尽挑战每天的点赞次数
                data.user_data.endlessChapter = GameData.userData.endlessChapter, //无尽挑战关卡数
                data.user_data.endlessChooseSurvive = GameData.userData.endlessChooseSurvive, //无尽挑战所选择的波数
                // 无尽挑战，奖励状态    0：未领取  1：已领取
                // data.user_data.endlessRewardStatus_list = GameData.userData.endlessRewardStatus, //无尽挑战奖励状态列表
                data.user_data.endlessRewardStatus_list = [
                    { status: GameData.userData.endlessRewardStatus[0] },
                    { status: GameData.userData.endlessRewardStatus[1] },
                    { status: GameData.userData.endlessRewardStatus[2] },
                    { status: GameData.userData.endlessRewardStatus[3] },
                    { status: GameData.userData.endlessRewardStatus[4] },
                    { status: GameData.userData.endlessRewardStatus[5] },
                    { status: GameData.userData.endlessRewardStatus[6] },
                    { status: GameData.userData.endlessRewardStatus[7] },
                    { status: GameData.userData.endlessRewardStatus[8] },
                    { status: GameData.userData.endlessRewardStatus[9] },
                    { status: GameData.userData.endlessRewardStatus[10] },
                    { status: GameData.userData.endlessRewardStatus[11] },
                    { status: GameData.userData.endlessRewardStatus[12] },
                    { status: GameData.userData.endlessRewardStatus[13] },
                    { status: GameData.userData.endlessRewardStatus[14] },
                ]
            // console.log('data.user_data.endlessRewardStatus_list', data.user_data.endlessRewardStatus_list)

            // 电量强化值
            data.user_data.batteryStrengthenValue0 = GameData.userData.batteryStrengthenValue0,//单体型强化值
                data.user_data.batteryStrengthenValue1 = GameData.userData.batteryStrengthenValue1,//群体型强化值
                data.user_data.batteryStrengthenValue2 = GameData.userData.batteryStrengthenValue2,//控制型强化值
                data.user_data.batteryStrengthenValue3 = GameData.userData.batteryStrengthenValue3,//持续型强化值 
                // 电量强化等级
                data.user_data.batteryStrengthenLv0 = GameData.userData.batteryStrengthenLv0,//单体型等级
                data.user_data.batteryStrengthenLv1 = GameData.userData.batteryStrengthenLv1,//群体型等级
                data.user_data.batteryStrengthenLv2 = GameData.userData.batteryStrengthenLv2,//控制型等级
                data.user_data.batteryStrengthenLv3 = GameData.userData.batteryStrengthenLv3,//持续型等级
                // 娃娃机等级
                data.user_data.doll_machine_lv = GameData.userData.doll_machine_lv,//娃娃机等级
                data.user_data.cost_money_month = GameData.userData.cost_money_month, //累积消费额度
                //已拥有的装备列表
                data.user_data.hasEquip_list = [
                    { equipId: GameData.userData.hasEquipList[0][0].equip_id, effect_name: GameData.userData.hasEquipList[0][0].effect_name, effect_value: GameData.userData.hasEquipList[0][0].effect_value, equip_quality: GameData.userData.hasEquipList[0][0].equip_quality, equip_lv: GameData.userData.hasEquipList[0][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[0][1].equip_id, effect_name: GameData.userData.hasEquipList[0][1].effect_name, effect_value: GameData.userData.hasEquipList[0][1].effect_value, equip_quality: GameData.userData.hasEquipList[0][1].equip_quality, equip_lv: GameData.userData.hasEquipList[0][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[0][2].equip_id, effect_name: GameData.userData.hasEquipList[0][2].effect_name, effect_value: GameData.userData.hasEquipList[0][2].effect_value, equip_quality: GameData.userData.hasEquipList[0][2].equip_quality, equip_lv: GameData.userData.hasEquipList[0][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[0][3].equip_id, effect_name: GameData.userData.hasEquipList[0][3].effect_name, effect_value: GameData.userData.hasEquipList[0][3].effect_value, equip_quality: GameData.userData.hasEquipList[0][3].equip_quality, equip_lv: GameData.userData.hasEquipList[0][3].equip_lv },

                    { equipId: GameData.userData.hasEquipList[1][0].equip_id, effect_name: GameData.userData.hasEquipList[1][0].effect_name, effect_value: GameData.userData.hasEquipList[1][0].effect_value, equip_quality: GameData.userData.hasEquipList[1][0].equip_quality, equip_lv: GameData.userData.hasEquipList[1][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[1][1].equip_id, effect_name: GameData.userData.hasEquipList[1][1].effect_name, effect_value: GameData.userData.hasEquipList[1][1].effect_value, equip_quality: GameData.userData.hasEquipList[1][1].equip_quality, equip_lv: GameData.userData.hasEquipList[1][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[1][2].equip_id, effect_name: GameData.userData.hasEquipList[1][2].effect_name, effect_value: GameData.userData.hasEquipList[1][2].effect_value, equip_quality: GameData.userData.hasEquipList[1][2].equip_quality, equip_lv: GameData.userData.hasEquipList[1][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[1][3].equip_id, effect_name: GameData.userData.hasEquipList[1][3].effect_name, effect_value: GameData.userData.hasEquipList[1][3].effect_value, equip_quality: GameData.userData.hasEquipList[1][3].equip_quality, equip_lv: GameData.userData.hasEquipList[1][3].equip_lv },

                    { equipId: GameData.userData.hasEquipList[2][0].equip_id, effect_name: GameData.userData.hasEquipList[2][0].effect_name, effect_value: GameData.userData.hasEquipList[2][0].effect_value, equip_quality: GameData.userData.hasEquipList[2][0].equip_quality, equip_lv: GameData.userData.hasEquipList[2][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[2][1].equip_id, effect_name: GameData.userData.hasEquipList[2][1].effect_name, effect_value: GameData.userData.hasEquipList[2][1].effect_value, equip_quality: GameData.userData.hasEquipList[2][1].equip_quality, equip_lv: GameData.userData.hasEquipList[2][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[2][2].equip_id, effect_name: GameData.userData.hasEquipList[2][2].effect_name, effect_value: GameData.userData.hasEquipList[2][2].effect_value, equip_quality: GameData.userData.hasEquipList[2][2].equip_quality, equip_lv: GameData.userData.hasEquipList[2][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[2][3].equip_id, effect_name: GameData.userData.hasEquipList[2][3].effect_name, effect_value: GameData.userData.hasEquipList[2][3].effect_value, equip_quality: GameData.userData.hasEquipList[2][3].equip_quality, equip_lv: GameData.userData.hasEquipList[2][3].equip_lv },

                    { equipId: GameData.userData.hasEquipList[3][0].equip_id, effect_name: GameData.userData.hasEquipList[3][0].effect_name, effect_value: GameData.userData.hasEquipList[3][0].effect_value, equip_quality: GameData.userData.hasEquipList[3][0].equip_quality, equip_lv: GameData.userData.hasEquipList[3][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[3][1].equip_id, effect_name: GameData.userData.hasEquipList[3][1].effect_name, effect_value: GameData.userData.hasEquipList[3][1].effect_value, equip_quality: GameData.userData.hasEquipList[3][1].equip_quality, equip_lv: GameData.userData.hasEquipList[3][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[3][2].equip_id, effect_name: GameData.userData.hasEquipList[3][2].effect_name, effect_value: GameData.userData.hasEquipList[3][2].effect_value, equip_quality: GameData.userData.hasEquipList[3][2].equip_quality, equip_lv: GameData.userData.hasEquipList[3][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[3][3].equip_id, effect_name: GameData.userData.hasEquipList[3][3].effect_name, effect_value: GameData.userData.hasEquipList[3][3].effect_value, equip_quality: GameData.userData.hasEquipList[3][3].equip_quality, equip_lv: GameData.userData.hasEquipList[3][3].equip_lv },
                ],

                //临时装备数据
                data.user_data.temporaryEquipData_list = [
                    { equipId: GameData.userData.temporaryEquipData.equip_id, effect_name: GameData.userData.temporaryEquipData.effect_name, effect_value: GameData.userData.temporaryEquipData.effect_value, equip_quality: GameData.userData.temporaryEquipData.equip_quality, equip_lv: GameData.userData.temporaryEquipData.equip_lv },
                ]
            data.user_data.random_equip_type = GameData.userData.random_equip_type,
                data.user_data.random_equip_position = GameData.userData.random_equip_position,
                //商品数据
                data.user_data.money_item_status_list = [
                    { status: GameData.userData.money_item_status[0] },
                    { status: GameData.userData.money_item_status[1] },
                    { status: GameData.userData.money_item_status[2] },
                    { status: GameData.userData.money_item_status[3] },
                    { status: GameData.userData.money_item_status[4] },
                    { status: GameData.userData.money_item_status[5] },
                ]
            // console.log('data.user_data.money_item_status_list', data.user_data.money_item_status_list)
            data.user_data.daily_item_times_list = [
                { status: GameData.userData.daily_item_times[0] }, // 每日礼包限购次数
                { status: GameData.userData.daily_item_times[1] },
                { status: GameData.userData.daily_item_times[2] },
                { status: GameData.userData.daily_item_times[3] },
                { status: GameData.userData.daily_item_times[4] },
            ]

            data.user_data.weekly_item_times_list = [
                { status: GameData.userData.weekly_item_times[0] }, // 周礼包限购次数
                { status: GameData.userData.weekly_item_times[1] },
                { status: GameData.userData.weekly_item_times[2] },
                { status: GameData.userData.weekly_item_times[3] },
            ]
            data.user_data.monthly_item_times_list = [
                { times: GameData.userData.monthly_item_times[0] }, // 月礼包限购次数
                { times: GameData.userData.monthly_item_times[1] },
                { times: GameData.userData.monthly_item_times[2] },
                { times: GameData.userData.monthly_item_times[3] },
                { times: GameData.userData.monthly_item_times[4] },
            ]
            //拥有的道具列表
            data.user_data.hasGoods_list = [
                { goods_id: 1, number: GameData.userData.hasGoodsList[1] },    // 金币
                { goods_id: 2, number: GameData.userData.hasGoodsList[2] },    // 功勋
                { goods_id: 3, number: GameData.userData.hasGoodsList[3] },    // 事件值
                { goods_id: 4, number: GameData.userData.hasGoodsList[4] },    // 金条
                { goods_id: 5, number: GameData.userData.hasGoodsList[5] },    // 招募令
                { goods_id: 6, number: GameData.userData.hasGoodsList[6] },    // 人才简历
                { goods_id: 7, number: GameData.userData.hasGoodsList[7] },    // 工牌
                { goods_id: 8, number: GameData.userData.hasGoodsList[8] },    // 精钢
                { goods_id: 9, number: GameData.userData.hasGoodsList[9] },    // 加速器
                { goods_id: 10, number: GameData.userData.hasGoodsList[10] },   // 经验值
                { goods_id: 11, number: GameData.userData.hasGoodsList[11] },   // 体力
                { goods_id: 12, number: GameData.userData.hasGoodsList[12] }, // 电量
            ];
            // console.log('data.user_data.hasGoods_list', data.user_data.hasGoods_list)

            // 建筑获得的加成
            data.user_data.furniture_add_list = [
                { furniture_name: "atk", number: GameData.userData.furniture_add.atk },
                { furniture_name: "inviteTodayAdLastNum", number: GameData.userData.furniture_add.inviteTodayAdLastNum },
                { furniture_name: "battle_Idle_Reward", number: GameData.userData.furniture_add.battle_Idle_Reward },
                { furniture_name: "atk_spd", number: GameData.userData.furniture_add.atk_spd },
                { furniture_name: "task_coin_reward", number: GameData.userData.furniture_add.task_coin_reward },
                { furniture_name: "revenue_capability", number: GameData.userData.furniture_add.revenue_capability },
                { furniture_name: "inviteNum", number: GameData.userData.furniture_add.inviteNum },
                { furniture_name: "orangeStaff", number: GameData.userData.furniture_add.orangeStaff },
            ]
            //已解锁建造点
            data.user_data.builds_list = [
                { lock: GameData.userData.builds[0].lock },
                { lock: GameData.userData.builds[1].lock },
                { lock: GameData.userData.builds[2].lock },
                { lock: GameData.userData.builds[3].lock },
                { lock: GameData.userData.builds[4].lock },
                { lock: GameData.userData.builds[5].lock },
                { lock: GameData.userData.builds[6].lock },
                { lock: GameData.userData.builds[7].lock },
            ]
            // 拥有员工碎片数量
            data.user_data.towerDebris_list = [
                { debris_id: 2001, count: GameData.userData.towerDebris[2001] },
                { debris_id: 2002, count: GameData.userData.towerDebris[2002] },
                { debris_id: 2003, count: GameData.userData.towerDebris[2003] },
                { debris_id: 2004, count: GameData.userData.towerDebris[2004] },
                { debris_id: 2005, count: GameData.userData.towerDebris[2005] },
                { debris_id: 2006, count: GameData.userData.towerDebris[2006] },
                { debris_id: 2007, count: GameData.userData.towerDebris[2007] },
                { debris_id: 2008, count: GameData.userData.towerDebris[2008] },
                { debris_id: 2009, count: GameData.userData.towerDebris[2009] },
                { debris_id: 2010, count: GameData.userData.towerDebris[2010] },
                { debris_id: 2011, count: GameData.userData.towerDebris[2011] },
                { debris_id: 2012, count: GameData.userData.towerDebris[2012] },
                { debris_id: 2013, count: GameData.userData.towerDebris[2013] },
                { debris_id: 2014, count: GameData.userData.towerDebris[2014] },
                { debris_id: 2015, count: GameData.userData.towerDebris[2015] },
                { debris_id: 2016, count: GameData.userData.towerDebris[2016] },
                { debris_id: 11001, count: GameData.userData.towerDebris[11001] },
                { debris_id: 11002, count: GameData.userData.towerDebris[11002] }
            ]
            // 拥有员工的等级
            data.user_data.towerLv_list = [
                { tower_id: 1001, lv: GameData.userData.towerLv[1001] },
                { tower_id: 1002, lv: GameData.userData.towerLv[1002] },
                { tower_id: 1003, lv: GameData.userData.towerLv[1003] },
                { tower_id: 1004, lv: GameData.userData.towerLv[1004] },
                { tower_id: 1005, lv: GameData.userData.towerLv[1005] },
                { tower_id: 1006, lv: GameData.userData.towerLv[1006] },
                { tower_id: 1007, lv: GameData.userData.towerLv[1007] },
                { tower_id: 1008, lv: GameData.userData.towerLv[1008] },
                { tower_id: 1009, lv: GameData.userData.towerLv[1009] },
                { tower_id: 1010, lv: GameData.userData.towerLv[1010] },
                { tower_id: 1011, lv: GameData.userData.towerLv[1011] },
                { tower_id: 1012, lv: GameData.userData.towerLv[1012] },
                { tower_id: 1013, lv: GameData.userData.towerLv[1013] },
                { tower_id: 1014, lv: GameData.userData.towerLv[1014] },
                { tower_id: 1015, lv: GameData.userData.towerLv[1015] },
                { tower_id: 1016, lv: GameData.userData.towerLv[1016] },
            ]
            // console.log('data.user_data.towerLv_list', data.user_data.towerLv_list)
            //拥有员工列表
            data.user_data.tower_list = GameData.userData.towerlist,
                console.log("data.user_data.tower_list0000:" + data.user_data.tower_list);
            console.log("tower_list11110000:" + GameData.userData.towerlist);
            // 使用中的建筑的列表
            data.user_data.build_list = [
                { build_id: GameData.userData.buildList[0].buildId, build_lv: GameData.userData.buildList[0].build_lv },
                { build_id: GameData.userData.buildList[1].buildId, build_lv: GameData.userData.buildList[1].build_lv },
                { build_id: GameData.userData.buildList[2].buildId, build_lv: GameData.userData.buildList[2].build_lv },
                { build_id: GameData.userData.buildList[3].buildId, build_lv: GameData.userData.buildList[3].build_lv },
                { build_id: GameData.userData.buildList[4].buildId, build_lv: GameData.userData.buildList[4].build_lv },
            ]

            // 拥有建筑的等级[1, 2, 3, 4]
            data.user_data.build_Lv_list = [
                { building_id: 1, level_list: GameData.userData.buildLvList[1] },
                { building_id: 2, level_list: GameData.userData.buildLvList[2] },
                { building_id: 3, level_list: GameData.userData.buildLvList[3] },
                { building_id: 4, level_list: GameData.userData.buildLvList[4] },
                { building_id: 5, level_list: GameData.userData.buildLvList[5] },
            ]
            //无尽挑战点赞记录
            data.user_data.rankLikedPlayer_list = GameData.userData.endlessLikedPlayers,
                //好友赠送金币列表
                data.user_data.friend_gift_list = GameData.userData.friend_gift_list,

                data.task_data.continuousTaskId = GameData.taskData.continuousTaskId, //持续任务id
                data.task_data.continueTaskTimes_list = GameData.taskData.continueTaskContentNumList, //连续任务内容数量列表
                data.task_data.dailyTaskStatus_list = GameData.taskData.dailyTaskContentNumStatus, //每日任务内容状态列表
                data.task_data.dailyTaskTimes_list = GameData.taskData.dailyTaskContentNumList, //每日任务内容数量列表

                data.battle_data.towerObj_list = [],
                data.battle_data.waitTower_list = [],
                data.battle_data.boxReward_list = GameData.battleData.BoxRewardList
        }
        else if (isLogin && this.client_data.client_data.is_new == 0) {
            //旧账号，登录
            GameData.userData.nickName_InGame = data.user_data.nickname,
                GameData.userData.nickName = data.user_data.sdkname,
                GameData.userData.head_icon = data.user_data.head_id, //头像id
                GameData.userData.age = data.user_data.age, //年龄
                GameData.userData.head_border = data.user_data.head_border,//头像框id
                GameData.userData.create_nickname = data.user_data.create_nickname, //是否创建过昵称
                GameData.userData.play_comic = data.user_data.play_comic, //是否播放过漫画
                GameData.userData.play_comic_num = data.user_data.play_comic_num, //播放第几张漫画
                GameData.userData.online_flag = data.user_data.online_flag, //是否在线
                GameData.userData.last_logout_time = data.user_data.last_logout_time, //上次下线时间
                GameData.userData.resetTime = data.user_data.resetTime, //玩家上次登录的时间
                console.log("resetTime1111======>:", data.user_data.resetTime)
                GameData.userData.career = data.user_data.career, //职位
                // GameData.userData.chapter = data.user_data.chapter, //章节
                GameData.userData.max_chapter = data.user_data.max_chapter, //通关最大章节
                GameData.userData.lose_chapter = data.user_data.lose_chapter, //失败最大章节
                GameData.userData.inviteNum = data.user_data.inviteNum, //招募员工数量
                // GameData.userData.randomItemList = data.user_data.randomItemList, //招聘员工的列表
                GameData.userData.inviteTodayAdNum = data.user_data.inviteTodayAdNum, //原来为当日广告招募员工总次数，现在改为 每日免费招募员工总次数
                GameData.userData.inviteTodayAdLastNum = data.user_data.inviteTodayAdLastNum, //原来是当日剩余广告招募员工次数，现在改为 每日免费招募员工剩余次数
                GameData.userData.inviteNumTotalOrange = data.user_data.inviteNumTotalOrange, //距离必得橙色员工的次数
                GameData.userData.inviteNumTotalRed = data.user_data.inviteNumTotalRed, //距离必得红色员工的次数
                GameData.userData.inviteNumDefaultTotal = data.user_data.inviteNumDefaultTotal, //默认必得保底员工的次数
                GameData.userData.inviteLimiteDailyTotalNum = data.user_data.inviteLimiteDailyTotalNum, //每日最多可招募次数
                GameData.userData.inviteLimiteDailyNum = data.user_data.inviteLimiteDailyNum, //当日已招募次数
                GameData.userData.orangeStaff = data.user_data.orangeStaff, //橙色员工概率
                GameData.userData.guideSwitch = data.user_data.guideSwitch, //引导开关
                GameData.userData.guideSuspend = data.user_data.guideSuspend, //引导暂停 true为暂停
                GameData.userData.guideId = data.user_data.guideId, //引导编号
                GameData.userData.guideListId = data.user_data.guideListId; //引导列表编号
                //新手引导编号
                GameData.userData.guidanceId = data.user_data.guidanceId > 30 ? GameData.userData.guidanceId = -1 : data.user_data.guidanceId,
                GameData.userData.isBattleSuspend = false, //是否开启战斗暂停
                GameData.userData.isFirstStartBattle = data.user_data.isFirstStartBattle, // 是否为第一次开启战斗
                GameData.userData.audioMusic = data.user_data.audioMusic ? data.user_data.audioMusic : 0, //音乐音量大小
                GameData.userData.audioSound = data.user_data.audioSound ? data.user_data.audioSound : 0, //音效音量大小
                GameData.userData.unlockNum = data.user_data.unlockNum, //可解锁建造点次数
                GameData.userData.isInitialCharge = data.user_data.isInitialCharge, //是否首充
                GameData.userData.sevenSignIsOpen = data.user_data.sevenSignIsOpen, //当天是否打开过，打开后变为true并隐藏红色感叹号，每天0点刷新（领完7日奖励（包含广告）隐藏入口图标 不用对它单独判断）
                console.log("gameData:sevenSignIsReceive1111:=======>>", data.user_data.sevenSignIsReceive)
                GameData.userData.sevenSignIsReceive = data.user_data.sevenSignIsReceive, //是否领取了当天的奖励
                console.log("gameData:sevenSignIsReceive2222:=======>>", GameData.userData.sevenSignIsReceive)
                GameData.userData.sevenSignDay = data.user_data.sevenSignDay, //当前7日登录的天数，每天0点如果领取了当天的奖励跳转下一天
                GameData.userData.sevenSignIsADReceive = data.user_data.sevenSignIsADReceive, //是否领取了当天广告的奖励
                GameData.userData.hangupStartTime = data.user_data.hangupStartTime, //挂机开始时间
                GameData.userData.hangupAlreadyTime = data.user_data.hangupAlreadyTime, //已经挂机时间
                GameData.userData.basicHangupTime = data.user_data.basicHangupTime, //基础挂机时间（分钟） 时间戳：30 * 60 * 1000
                GameData.userData.addHangupTime = data.user_data.addHangupTime, //增加的挂机时间（分钟）
                GameData.userData.hangupPromotionId = data.user_data.hangupPromotionId, //挂机奖励职位表id 每增加一次挂机时间id+1
                GameData.userData.dailyAccumulatedTime = data.user_data.dailyAccumulatedTime, // 累计在线分钟数（精确到毫秒）
                GameData.userData.lastUpdateTime = data.user_data.lastUpdateTime, // 最后更新在线时长的 时间戳
                GameData.userData.updateTimes = data.user_data.updateTimes, // 在线时间的累计更新次数（每过一秒就更新一次在线时间，更新60次即过了一分钟之后，每日任务中的在线时长就+1）
                GameData.userData.isFirstEnterReward = data.user_data.isFirstEnterReward, //是否第一次领取入口奖励
                GameData.userData.batteryNumberLimit = data.user_data.batteryNumberLimit, //电量上限
                GameData.userData.batteryBullionBuyLastNumber = data.user_data.batteryBullionBuyLastNumber, //上次购买电量的数量
                GameData.userData.batteryBullionBuyLastNumber = data.user_data.batteryBullionBuyLastNumber, //水晶购买电量的剩余次数，原来是金条购买电量的剩余次数
                GameData.userData.batteryBullionBuyNumber = data.user_data.batteryBullionBuyNumber, //水晶购买电量的总次数，原来是金条购买电量的总次数
                GameData.userData.batteryBullionCost = data.user_data.batteryBullionCost, //购买电量的消耗水晶数，原来是购买电量的消耗金条数= GameData.userData.batteryBullionCost, //购买电量的消耗水晶数，原来是购买电量的消耗金条数
                GameData.userData.isEndlessBattleScene = data.user_data.isEndlessBattleScene, //标记是否是无尽挑战模式下的战斗场景
                GameData.userData.endlessChallengeMaxScore = data.user_data.endlessChallengeMaxScore, //无尽挑战最高积分
                GameData.userData.endlessChallengeMaxSurvive = data.user_data.endlessChallengeMaxSurvive, //无尽挑战最高存活波数
                GameData.userData.endlessLikeCount = data.user_data.endlessLikeCount, //无尽挑战每天的点赞次数
                GameData.userData.endlessChapter = data.user_data.endlessChapter, //无尽挑战关卡数
                GameData.userData.endlessChooseSurvive = data.user_data.endlessChooseSurvive, //无尽挑战所选择的波数
                // 无尽挑战，奖励状态    0：未领取  1：已领取
                // GameData.userData.endlessRewardStatus = data.user_data.endlessRewardStatus_list,
                GameData.userData.endlessRewardStatus[0] = data.user_data.endlessRewardStatus_list[0].status,
                GameData.userData.endlessRewardStatus[1] = data.user_data.endlessRewardStatus_list[1].status,
                GameData.userData.endlessRewardStatus[2] = data.user_data.endlessRewardStatus_list[2].status,
                GameData.userData.endlessRewardStatus[3] = data.user_data.endlessRewardStatus_list[3].status,
                GameData.userData.endlessRewardStatus[4] = data.user_data.endlessRewardStatus_list[4].status,
                GameData.userData.endlessRewardStatus[5] = data.user_data.endlessRewardStatus_list[5].status,
                GameData.userData.endlessRewardStatus[6] = data.user_data.endlessRewardStatus_list[6].status,
                GameData.userData.endlessRewardStatus[7] = data.user_data.endlessRewardStatus_list[7].status,
                GameData.userData.endlessRewardStatus[8] = data.user_data.endlessRewardStatus_list[8].status,
                GameData.userData.endlessRewardStatus[9] = data.user_data.endlessRewardStatus_list[9].status,
                GameData.userData.endlessRewardStatus[10] = data.user_data.endlessRewardStatus_list[10].status,
                GameData.userData.endlessRewardStatus[11] = data.user_data.endlessRewardStatus_list[11].status,
                GameData.userData.endlessRewardStatus[12] = data.user_data.endlessRewardStatus_list[12].status,
                GameData.userData.endlessRewardStatus[13] = data.user_data.endlessRewardStatus_list[13].status,
                GameData.userData.endlessRewardStatus[14] = data.user_data.endlessRewardStatus_list[14].status,

                GameData.userData.batteryStrengthenValue0 = data.user_data.batteryStrengthenValue0,//单体型强化值
                GameData.userData.batteryStrengthenValue1 = data.user_data.batteryStrengthenValue1,//群体型强化值
                GameData.userData.batteryStrengthenValue2 = data.user_data.batteryStrengthenValue2,//控制型强化值
                GameData.userData.batteryStrengthenValue3 = data.user_data.batteryStrengthenValue3,//持续型强化值 
                GameData.userData.batteryStrengthenLv0 = data.user_data.batteryStrengthenLv0,//单体型等级
                GameData.userData.batteryStrengthenLv1 = data.user_data.batteryStrengthenLv1,//群体型等级
                GameData.userData.batteryStrengthenLv2 = data.user_data.batteryStrengthenLv2,//控制型等级
                GameData.userData.batteryStrengthenLv3 = data.user_data.batteryStrengthenLv3,//持续型等级
                GameData.userData.doll_machine_lv = data.user_data.doll_machine_lv,//娃娃机等级
                GameData.userData.cost_money_month = data.user_data.cost_money_month, //累积消费额度
                // GameData.userData.hasEquipList = data.user_data.hasEquip_list, //已拥有的装备列表
                GameData.userData.hasEquipList[0][0] = data.user_data.hasEquip_list[0],
                GameData.userData.hasEquipList[0][1] = data.user_data.hasEquip_list[1],
                GameData.userData.hasEquipList[0][2] = data.user_data.hasEquip_list[2],
                GameData.userData.hasEquipList[0][3] = data.user_data.hasEquip_list[3],

                GameData.userData.hasEquipList[1][0] = data.user_data.hasEquip_list[4],
                GameData.userData.hasEquipList[1][1] = data.user_data.hasEquip_list[5],
                GameData.userData.hasEquipList[1][2] = data.user_data.hasEquip_list[6],
                GameData.userData.hasEquipList[1][3] = data.user_data.hasEquip_list[7],

                GameData.userData.hasEquipList[2][0] = data.user_data.hasEquip_list[8],
                GameData.userData.hasEquipList[2][1] = data.user_data.hasEquip_list[9],
                GameData.userData.hasEquipList[2][2] = data.user_data.hasEquip_list[10],
                GameData.userData.hasEquipList[2][3] = data.user_data.hasEquip_list[11],

                GameData.userData.hasEquipList[3][0] = data.user_data.hasEquip_list[12],
                GameData.userData.hasEquipList[3][1] = data.user_data.hasEquip_list[13],
                GameData.userData.hasEquipList[3][2] = data.user_data.hasEquip_list[14],
                GameData.userData.hasEquipList[3][3] = data.user_data.hasEquip_list[15],

                GameData.userData.temporaryEquipData = data.user_data.temporaryEquipData_list[0], //临时装备数据

                GameData.userData.random_equip_type = data.user_data.random_equip_type,
                GameData.userData.random_equip_position = data.user_data.random_equip_position,
                // GameData.userData.money_item_status = data.user_data.money_item_status_list, // 充值商品是否首充
                GameData.userData.money_item_status[0] = data.user_data.money_item_status_list[0].status,
                GameData.userData.money_item_status[1] = data.user_data.money_item_status_list[1].status,
                GameData.userData.money_item_status[2] = data.user_data.money_item_status_list[2].status,
                GameData.userData.money_item_status[3] = data.user_data.money_item_status_list[3].status,
                GameData.userData.money_item_status[4] = data.user_data.money_item_status_list[4].status,
                GameData.userData.money_item_status[5] = data.user_data.money_item_status_list[5].status,

                GameData.userData.daily_item_times[0] = data.user_data.daily_item_times_list[0].status, // 日礼包限购次数
                GameData.userData.daily_item_times[1] = data.user_data.daily_item_times_list[1].status, // 日礼包限购次数
                GameData.userData.daily_item_times[2] = data.user_data.daily_item_times_list[2].status, // 日礼包限购次数
                GameData.userData.daily_item_times[3] = data.user_data.daily_item_times_list[3].status, // 日礼包限购次数
                GameData.userData.daily_item_times[4] = data.user_data.daily_item_times_list[4].status, // 日礼包限购次数

                GameData.userData.weekly_item_times[0] = data.user_data.weekly_item_times_list[0].status, // 周礼包限购次数
                GameData.userData.weekly_item_times[1] = data.user_data.weekly_item_times_list[1].status, // 周礼包限购次数
                GameData.userData.weekly_item_times[2] = data.user_data.weekly_item_times_list[2].status, // 周礼包限购次数
                GameData.userData.weekly_item_times[3] = data.user_data.weekly_item_times_list[3].status, // 周礼包限购次数

                GameData.userData.monthly_item_times[0] = data.user_data.monthly_item_times_list[0].times, // 月礼包限购次数
                GameData.userData.monthly_item_times[1] = data.user_data.monthly_item_times_list[1].times, // 月礼包限购次数
                GameData.userData.monthly_item_times[2] = data.user_data.monthly_item_times_list[2].times, // 月礼包限购次数
                GameData.userData.monthly_item_times[3] = data.user_data.monthly_item_times_list[3].times, // 月礼包限购次数
                GameData.userData.monthly_item_times[4] = data.user_data.monthly_item_times_list[4].times, // 月礼包限购次数
                // console.log('data.user_data.hasGoods_list', data.user_data.hasGoods_list)
                // GameData.userData.hasGoodsList = data.user_data.hasGoods_list, //已拥有的道具列表
                GameData.userData.hasGoodsList[1] = data.user_data.hasGoods_list[0].number,
                GameData.userData.hasGoodsList[2] = data.user_data.hasGoods_list[1].number,
                GameData.userData.hasGoodsList[3] = data.user_data.hasGoods_list[2].number,
                GameData.userData.hasGoodsList[4] = data.user_data.hasGoods_list[3].number,
                GameData.userData.hasGoodsList[5] = data.user_data.hasGoods_list[4].number,
                GameData.userData.hasGoodsList[6] = data.user_data.hasGoods_list[5].number,
                GameData.userData.hasGoodsList[7] = data.user_data.hasGoods_list[6].number,
                GameData.userData.hasGoodsList[8] = data.user_data.hasGoods_list[7].number,
                GameData.userData.hasGoodsList[9] = data.user_data.hasGoods_list[8].number,
                GameData.userData.hasGoodsList[10] = data.user_data.hasGoods_list[9].number,
                GameData.userData.hasGoodsList[11] = data.user_data.hasGoods_list[10].number,
                GameData.userData.hasGoodsList[12] = data.user_data.hasGoods_list[11].number,

                GameData.userData.furniture_add.atk = data.user_data.furniture_add_list[0].number,
                GameData.userData.furniture_add.inviteTodayAdLastNum = data.user_data.furniture_add_list[1].number,
                GameData.userData.furniture_add.battle_Idle_Reward = data.user_data.furniture_add_list[2].number,
                GameData.userData.furniture_add.atk_spd = data.user_data.furniture_add_list[3].number,
                GameData.userData.furniture_add.task_coin_reward = data.user_data.furniture_add_list[4].number,
                GameData.userData.furniture_add.revenue_capability = data.user_data.furniture_add_list[5].number,
                GameData.userData.furniture_add.inviteNum = data.user_data.furniture_add_list[6].number,
                GameData.userData.furniture_add.orangeStaff = data.user_data.furniture_add_list[7].number,
                // console.log('data.user_data.builds_list', data.user_data.builds_list)
                GameData.userData.builds[0].lock = data.user_data.builds_list[0].lock,
                GameData.userData.builds[1].lock = data.user_data.builds_list[1].lock,
                GameData.userData.builds[2].lock = data.user_data.builds_list[2].lock,
                GameData.userData.builds[3].lock = data.user_data.builds_list[3].lock,
                GameData.userData.builds[4].lock = data.user_data.builds_list[4].lock,
                GameData.userData.builds[5].lock = data.user_data.builds_list[5].lock,
                GameData.userData.builds[6].lock = data.user_data.builds_list[6].lock,
                GameData.userData.builds[7].lock = data.user_data.builds_list[7].lock,
                // 拥有员工碎片数量
                GameData.userData.towerDebris[2001] = data.user_data.towerDebris_list[0].count,
                GameData.userData.towerDebris[2002] = data.user_data.towerDebris_list[1].count,
                GameData.userData.towerDebris[2003] = data.user_data.towerDebris_list[2].count,
                GameData.userData.towerDebris[2004] = data.user_data.towerDebris_list[3].count,
                GameData.userData.towerDebris[2005] = data.user_data.towerDebris_list[4].count,
                GameData.userData.towerDebris[2006] = data.user_data.towerDebris_list[5].count,
                GameData.userData.towerDebris[2007] = data.user_data.towerDebris_list[6].count,
                GameData.userData.towerDebris[2008] = data.user_data.towerDebris_list[7].count,
                GameData.userData.towerDebris[2009] = data.user_data.towerDebris_list[8].count,
                GameData.userData.towerDebris[2010] = data.user_data.towerDebris_list[9].count,
                GameData.userData.towerDebris[2011] = data.user_data.towerDebris_list[10].count,
                GameData.userData.towerDebris[2012] = data.user_data.towerDebris_list[11].count,
                GameData.userData.towerDebris[2013] = data.user_data.towerDebris_list[12].count,
                GameData.userData.towerDebris[2014] = data.user_data.towerDebris_list[13].count,
                GameData.userData.towerDebris[2015] = data.user_data.towerDebris_list[14].count,
                GameData.userData.towerDebris[2016] = data.user_data.towerDebris_list[15].count,
                GameData.userData.towerDebris[11001] = data.user_data.towerDebris_list[16].count,
                GameData.userData.towerDebris[11002] = data.user_data.towerDebris_list[17].count,
                // console.log('data.user_data.towerDebris_list', data.user_data.towerDebris_list)

                // 拥有员工的等级
                GameData.userData.towerLv[1001] = data.user_data.towerLv_list[0].lv,
                GameData.userData.towerLv[1002] = data.user_data.towerLv_list[1].lv,
                GameData.userData.towerLv[1003] = data.user_data.towerLv_list[2].lv,
                GameData.userData.towerLv[1004] = data.user_data.towerLv_list[3].lv,
                GameData.userData.towerLv[1005] = data.user_data.towerLv_list[4].lv,
                GameData.userData.towerLv[1006] = data.user_data.towerLv_list[5].lv,
                GameData.userData.towerLv[1007] = data.user_data.towerLv_list[6].lv,
                GameData.userData.towerLv[1008] = data.user_data.towerLv_list[7].lv,
                GameData.userData.towerLv[1009] = data.user_data.towerLv_list[8].lv,
                GameData.userData.towerLv[1010] = data.user_data.towerLv_list[9].lv,
                GameData.userData.towerLv[1011] = data.user_data.towerLv_list[10].lv,
                GameData.userData.towerLv[1012] = data.user_data.towerLv_list[11].lv,
                GameData.userData.towerLv[1013] = data.user_data.towerLv_list[12].lv,
                GameData.userData.towerLv[1014] = data.user_data.towerLv_list[13].lv,
                GameData.userData.towerLv[1015] = data.user_data.towerLv_list[14].lv,
                GameData.userData.towerLv[1016] = data.user_data.towerLv_list[15].lv;
            // console.log('data.user_data.towerLv_list', data.user_data.towerLv_list)

            // GameData.userData.towerlist = data.user_data.tower_list;
            GameData.userData.towerlist.length = 0;
            for (let i = 0; i < data.user_data.tower_list.length; i++) {
                let stuff_info = TextUtils.Instance.staff__get_info.get(0).find(item => item.id == data.user_data.tower_list[i].id);
                if (!stuff_info) stuff_info = TextUtils.Instance.staff__get_info.get(1).find(item => item.id == data.user_data.tower_list[i].id);
                if (!stuff_info) stuff_info = TextUtils.Instance.staff__get_info.get(2).find(item => item.id == data.user_data.tower_list[i].id);
                if (!stuff_info) stuff_info = TextUtils.Instance.staff__get_info.get(3).find(item => item.id == data.user_data.tower_list[i].id);
                if (stuff_info) GameData.userData.towerlist.push(stuff_info);
            }
            console.log("data.user_data.tower_list1111:" + data.user_data.tower_list);
            console.log("tower_list1111:" + GameData.userData.towerlist);

            GameData.userData.buildList[0].buildId = data.user_data.build_list[0].build_id,
                GameData.userData.buildList[1].buildId = data.user_data.build_list[1].build_id,
                GameData.userData.buildList[2].buildId = data.user_data.build_list[2].build_id,
                GameData.userData.buildList[3].buildId = data.user_data.build_list[3].build_id,
                GameData.userData.buildList[4].buildId = data.user_data.build_list[4].build_id,
                GameData.userData.buildList[0].build_lv = data.user_data.build_list[0].build_lv,
                GameData.userData.buildList[1].build_lv = data.user_data.build_list[1].build_lv,
                GameData.userData.buildList[2].build_lv = data.user_data.build_list[2].build_lv,
                GameData.userData.buildList[3].build_lv = data.user_data.build_list[3].build_lv,
                GameData.userData.buildList[4].build_lv = data.user_data.build_list[4].build_lv,
                // console.log('data.user_data.build_list', data.user_data.build_list)
                GameData.userData.buildLvList[1] = data.user_data.build_Lv_list[0].level_list,
                GameData.userData.buildLvList[2] = data.user_data.build_Lv_list[1].level_list,
                GameData.userData.buildLvList[3] = data.user_data.build_Lv_list[2].level_list,
                GameData.userData.buildLvList[4] = data.user_data.build_Lv_list[3].level_list,
                GameData.userData.buildLvList[5] = data.user_data.build_Lv_list[4].level_list,
                GameData.userData.buildLvList[5] = data.user_data.build_Lv_list[4].level_list,
                // console.log('data.user_data.buildLv_list', data.user_data.build_Lv_list)

                GameData.userData.endlessLikedPlayers = data.user_data.rankLikedPlayer_list,
                GameData.userData.friend_gift_list = data.user_data.friend_gift_list,

                GameData.taskData.continuousTaskId = data.task_data.continuousTaskId, //持续任务id
                GameData.taskData.continueTaskContentNumList = data.task_data.continueTaskTimes_list, //连续任务内容数量列表
                GameData.taskData.dailyTaskContentNumStatus = data.task_data.dailyTaskStatus_list, //每日任务内容状态列表
                GameData.taskData.dailyTaskContentNumList = data.task_data.dailyTaskTimes_list, //每日任务内容数量列表

                GameData.battleData.TowerObj = [],
                GameData.battleData.WaitTowerList = [],
                GameData.battleData.BoxRewardList = data.battle_data.boxReward_list
            // console.log('data.user_data.BoxRewardList', data.battle_data.boxReward_list)
        }
        else if (!isLogin) {
            data.user_data.nickname = GameData.userData.nickName_InGame,
                data.user_data.sdkname = GameData.userData.nickName,
                data.user_data.head_id = GameData.userData.head_icon, //头像id
                data.user_data.age = GameData.userData.age, //年龄
                data.user_data.head_border = GameData.userData.head_border,//头像框id
                data.user_data.create_nickname = GameData.userData.create_nickname, //是否创建过昵称
                data.user_data.play_comic = GameData.userData.play_comic, //是否播放过漫画
                data.user_data.play_comic_num = GameData.userData.play_comic_num, //播放第几张漫画
                data.user_data.online_flag = GameData.userData.online_flag, //是否在线
                data.user_data.last_logout_time = GameData.userData.last_logout_time, //上次下线时间
                //获取当前的时间戳
                GameData.userData.resetTime = new Date().getTime()/1000;
                data.user_data.resetTime = GameData.userData.resetTime, //玩家上次登录的时间
                data.user_data.career = GameData.userData.career, //职位
                // data.user_data.chapter = GameData.userData.chapter, //章节
                data.user_data.max_chapter = GameData.userData.max_chapter, //通关最大章节
                data.user_data.lose_chapter = GameData.userData.lose_chapter, //失败最大章节
                data.user_data.inviteNum = GameData.userData.inviteNum, //招募员工数量
                // data.user_data.randomItemList = GameData.userData.randomItemList, //招聘员工的列表
                data.user_data.inviteTodayAdNum = GameData.userData.inviteTodayAdNum, //原来为当日广告招募员工总次数，现在改为 每日免费招募员工总次数
                data.user_data.inviteTodayAdLastNum = GameData.userData.inviteTodayAdLastNum, //原来是当日剩余广告招募员工次数，现在改为 每日免费招募员工剩余次数
                data.user_data.inviteNumTotalOrange = GameData.userData.inviteNumTotalOrange, //距离必得橙色员工的次数
                data.user_data.inviteNumTotalRed = GameData.userData.inviteNumTotalRed, //距离必得红色员工的次数
                data.user_data.inviteNumDefaultTotal = GameData.userData.inviteNumDefaultTotal, //默认必得保底员工的次数
                data.user_data.inviteLimiteDailyTotalNum = GameData.userData.inviteLimiteDailyTotalNum, //每日最多可招募次数
                data.user_data.inviteLimiteDailyNum = GameData.userData.inviteLimiteDailyNum, //当日已招募次数
                data.user_data.orangeStaff = GameData.userData.orangeStaff, //橙色员工概率
                data.user_data.guideSwitch = GameData.userData.guideSwitch, //引导开关
                data.user_data.guideSuspend = GameData.userData.guideSuspend, //引导暂停 true为暂停
                data.user_data.guideId = GameData.userData.guideId, //引导编号
                data.user_data.guideListId = GameData.userData.guideListId, //引导列表编号
                data.user_data.guidanceId = GameData.userData.guidanceId, //新手引导编号
                data.user_data.isBattleSuspend = GameData.userData.isBattleSuspend, //是否开启战斗暂停
                data.user_data.isFirstStartBattle = GameData.userData.isFirstStartBattle, // 是否为第一次开启战斗
                data.user_data.audioMusic = GameData.userData.audioMusic, //音乐音量大小
                data.user_data.audioSound = GameData.userData.audioSound, //音效音量大小
                data.user_data.unlockNum = GameData.userData.unlockNum, //可解锁建造点次数
                data.user_data.isInitialCharge = GameData.userData.isInitialCharge, //是否首充
                data.user_data.sevenSignIsOpen = GameData.userData.sevenSignIsOpen, //当天是否打开过，打开后变为true并隐藏红色感叹号，每天0点刷新（领完7日奖励（包含广告）隐藏入口图标 不用对它单独判断）
                data.user_data.sevenSignIsReceive = GameData.userData.sevenSignIsReceive, //是否领取了当天的奖励
                data.user_data.sevenSignDay = GameData.userData.sevenSignDay, //当前7日登录的天数，每天0点如果领取了当天的奖励跳转下一天
                data.user_data.sevenSignIsADReceive = GameData.userData.sevenSignIsADReceive, //是否领取了当天广告的奖励
                data.user_data.hangupStartTime = GameData.userData.hangupStartTime, //挂机开始时间
                data.user_data.hangupAlreadyTime = GameData.userData.hangupAlreadyTime, //已经挂机时间
                data.user_data.basicHangupTime = GameData.userData.basicHangupTime, //基础挂机时间（分钟） 时间戳：30 * 60 * 1000
                data.user_data.addHangupTime = GameData.userData.addHangupTime, //增加的挂机时间（分钟）
                data.user_data.hangupPromotionId = GameData.userData.hangupPromotionId, //挂机奖励职位表id 每增加一次挂机时间id+1
                data.user_data.dailyAccumulatedTime = GameData.userData.dailyAccumulatedTime, // 累计在线分钟数（精确到毫秒）
                data.user_data.lastUpdateTime = GameData.userData.lastUpdateTime, // 最后更新在线时长的 时间戳
                data.user_data.updateTimes = GameData.userData.updateTimes, // 在线时间的累计更新次数（每过一秒就更新一次在线时间，更新60次即过了一分钟之后，每日任务中的在线时长就+1）
                data.user_data.isFirstEnterReward = GameData.userData.isFirstEnterReward, //是否第一次领取入口奖励
                data.user_data.batteryNumberLimit = GameData.userData.batteryNumberLimit, //电量上限
                data.user_data.batteryBullionBuyLastNumber = GameData.userData.batteryBullionBuyLastNumber, //上次购买电量的数量
                data.user_data.batteryBullionBuyLastNumber = GameData.userData.batteryBullionBuyLastNumber, //水晶购买电量的剩余次数，原来是金条购买电量的剩余次数
                data.user_data.batteryBullionBuyNumber = GameData.userData.batteryBullionBuyNumber, //水晶购买电量的总次数，原来是金条购买电量的总次数
                data.user_data.batteryBullionCost = GameData.userData.batteryBullionCost, //购买电量的消耗水晶数，原来是购买电量的消耗金条数= GameData.userData.batteryBullionCost, //购买电量的消耗水晶数，原来是购买电量的消耗金条数
                data.user_data.isEndlessBattleScene = GameData.userData.isEndlessBattleScene, //标记是否是无尽挑战模式下的战斗场景
                data.user_data.endlessChallengeMaxScore = GameData.userData.endlessChallengeMaxScore, //无尽挑战最高积分
                data.user_data.endlessChallengeMaxSurvive = GameData.userData.endlessChallengeMaxSurvive, //无尽挑战最高存活波数
                data.user_data.endlessLikeCount = GameData.userData.endlessLikeCount, //无尽挑战每天的点赞次数
                data.user_data.endlessChapter = GameData.userData.endlessChapter, //无尽挑战关卡数
                data.user_data.endlessChooseSurvive = GameData.userData.endlessChooseSurvive, //无尽挑战所选择的波数
                // 无尽挑战，奖励状态    0：未领取  1：已领取
                // data.user_data.endlessRewardStatus_list = GameData.userData.endlessRewardStatus,
                data.user_data.endlessRewardStatus_list = [
                    { status: GameData.userData.endlessRewardStatus[0] },
                    { status: GameData.userData.endlessRewardStatus[1] },
                    { status: GameData.userData.endlessRewardStatus[2] },
                    { status: GameData.userData.endlessRewardStatus[3] },
                    { status: GameData.userData.endlessRewardStatus[4] },
                    { status: GameData.userData.endlessRewardStatus[5] },
                    { status: GameData.userData.endlessRewardStatus[6] },
                    { status: GameData.userData.endlessRewardStatus[7] },
                    { status: GameData.userData.endlessRewardStatus[8] },
                    { status: GameData.userData.endlessRewardStatus[9] },
                    { status: GameData.userData.endlessRewardStatus[10] },
                    { status: GameData.userData.endlessRewardStatus[11] },
                    { status: GameData.userData.endlessRewardStatus[12] },
                    { status: GameData.userData.endlessRewardStatus[13] },
                    { status: GameData.userData.endlessRewardStatus[14] },
                ]

            // 电量强化值
            data.user_data.batteryStrengthenValue0 = GameData.userData.batteryStrengthenValue0,//单体型强化值
                data.user_data.batteryStrengthenValue1 = GameData.userData.batteryStrengthenValue1,//群体型强化值
                data.user_data.batteryStrengthenValue2 = GameData.userData.batteryStrengthenValue2,//控制型强化值
                data.user_data.batteryStrengthenValue3 = GameData.userData.batteryStrengthenValue3,//持续型强化值 
                // 电量强化等级
                data.user_data.batteryStrengthenLv0 = GameData.userData.batteryStrengthenLv0,//单体型等级
                data.user_data.batteryStrengthenLv1 = GameData.userData.batteryStrengthenLv1,//群体型等级
                data.user_data.batteryStrengthenLv2 = GameData.userData.batteryStrengthenLv2,//控制型等级
                data.user_data.batteryStrengthenLv3 = GameData.userData.batteryStrengthenLv3,//持续型等级
                // 娃娃机等级
                data.user_data.doll_machine_lv = GameData.userData.doll_machine_lv,//娃娃机等级
                data.user_data.cost_money_month = GameData.userData.cost_money_month, //累积消费额度
                // data.user_data.hasEquip_list = GameData.userData.hasEquipList, //已拥有的装备列表
                data.user_data.hasEquip_list = [
                    { equipId: GameData.userData.hasEquipList[0][0].equip_id, effect_name: GameData.userData.hasEquipList[0][0].effect_name, effect_value: GameData.userData.hasEquipList[0][0].effect_value, equip_quality: GameData.userData.hasEquipList[0][0].equip_quality, equip_lv: GameData.userData.hasEquipList[0][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[0][1].equip_id, effect_name: GameData.userData.hasEquipList[0][1].effect_name, effect_value: GameData.userData.hasEquipList[0][1].effect_value, equip_quality: GameData.userData.hasEquipList[0][1].equip_quality, equip_lv: GameData.userData.hasEquipList[0][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[0][2].equip_id, effect_name: GameData.userData.hasEquipList[0][2].effect_name, effect_value: GameData.userData.hasEquipList[0][2].effect_value, equip_quality: GameData.userData.hasEquipList[0][2].equip_quality, equip_lv: GameData.userData.hasEquipList[0][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[0][3].equip_id, effect_name: GameData.userData.hasEquipList[0][3].effect_name, effect_value: GameData.userData.hasEquipList[0][3].effect_value, equip_quality: GameData.userData.hasEquipList[0][3].equip_quality, equip_lv: GameData.userData.hasEquipList[0][3].equip_lv },

                    { equipId: GameData.userData.hasEquipList[1][0].equip_id, effect_name: GameData.userData.hasEquipList[1][0].effect_name, effect_value: GameData.userData.hasEquipList[1][0].effect_value, equip_quality: GameData.userData.hasEquipList[1][0].equip_quality, equip_lv: GameData.userData.hasEquipList[1][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[1][1].equip_id, effect_name: GameData.userData.hasEquipList[1][1].effect_name, effect_value: GameData.userData.hasEquipList[1][1].effect_value, equip_quality: GameData.userData.hasEquipList[1][1].equip_quality, equip_lv: GameData.userData.hasEquipList[1][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[1][2].equip_id, effect_name: GameData.userData.hasEquipList[1][2].effect_name, effect_value: GameData.userData.hasEquipList[1][2].effect_value, equip_quality: GameData.userData.hasEquipList[1][2].equip_quality, equip_lv: GameData.userData.hasEquipList[1][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[1][3].equip_id, effect_name: GameData.userData.hasEquipList[1][3].effect_name, effect_value: GameData.userData.hasEquipList[1][3].effect_value, equip_quality: GameData.userData.hasEquipList[1][3].equip_quality, equip_lv: GameData.userData.hasEquipList[1][3].equip_lv },

                    { equipId: GameData.userData.hasEquipList[2][0].equip_id, effect_name: GameData.userData.hasEquipList[2][0].effect_name, effect_value: GameData.userData.hasEquipList[2][0].effect_value, equip_quality: GameData.userData.hasEquipList[2][0].equip_quality, equip_lv: GameData.userData.hasEquipList[2][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[2][1].equip_id, effect_name: GameData.userData.hasEquipList[2][1].effect_name, effect_value: GameData.userData.hasEquipList[2][1].effect_value, equip_quality: GameData.userData.hasEquipList[2][1].equip_quality, equip_lv: GameData.userData.hasEquipList[2][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[2][2].equip_id, effect_name: GameData.userData.hasEquipList[2][2].effect_name, effect_value: GameData.userData.hasEquipList[2][2].effect_value, equip_quality: GameData.userData.hasEquipList[2][2].equip_quality, equip_lv: GameData.userData.hasEquipList[2][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[2][3].equip_id, effect_name: GameData.userData.hasEquipList[2][3].effect_name, effect_value: GameData.userData.hasEquipList[2][3].effect_value, equip_quality: GameData.userData.hasEquipList[2][3].equip_quality, equip_lv: GameData.userData.hasEquipList[2][3].equip_lv },

                    { equipId: GameData.userData.hasEquipList[3][0].equip_id, effect_name: GameData.userData.hasEquipList[3][0].effect_name, effect_value: GameData.userData.hasEquipList[3][0].effect_value, equip_quality: GameData.userData.hasEquipList[3][0].equip_quality, equip_lv: GameData.userData.hasEquipList[3][0].equip_lv },
                    { equipId: GameData.userData.hasEquipList[3][1].equip_id, effect_name: GameData.userData.hasEquipList[3][1].effect_name, effect_value: GameData.userData.hasEquipList[3][1].effect_value, equip_quality: GameData.userData.hasEquipList[3][1].equip_quality, equip_lv: GameData.userData.hasEquipList[3][1].equip_lv },
                    { equipId: GameData.userData.hasEquipList[3][2].equip_id, effect_name: GameData.userData.hasEquipList[3][2].effect_name, effect_value: GameData.userData.hasEquipList[3][2].effect_value, equip_quality: GameData.userData.hasEquipList[3][2].equip_quality, equip_lv: GameData.userData.hasEquipList[3][2].equip_lv },
                    { equipId: GameData.userData.hasEquipList[3][3].equip_id, effect_name: GameData.userData.hasEquipList[3][3].effect_name, effect_value: GameData.userData.hasEquipList[3][3].effect_value, equip_quality: GameData.userData.hasEquipList[3][3].equip_quality, equip_lv: GameData.userData.hasEquipList[3][3].equip_lv },
                ],
                // data.user_data.temporaryEquipData_list = GameData.userData.temporaryEquipData, //临时装备数据
                //临时装备数据
                data.user_data.temporaryEquipData_list = [
                    { equipId: GameData.userData.temporaryEquipData.equip_id, effect_name: GameData.userData.temporaryEquipData.effect_name, effect_value: GameData.userData.temporaryEquipData.effect_value, equip_quality: GameData.userData.temporaryEquipData.equip_quality, equip_lv: GameData.userData.temporaryEquipData.equip_lv },
                ]
            data.user_data.random_equip_type = GameData.userData.random_equip_type,
                data.user_data.random_equip_position = GameData.userData.random_equip_position,
                //商品数据
                data.user_data.money_item_status_list = [
                    { status: GameData.userData.money_item_status[0] },
                    { status: GameData.userData.money_item_status[1] },
                    { status: GameData.userData.money_item_status[2] },
                    { status: GameData.userData.money_item_status[3] },
                    { status: GameData.userData.money_item_status[4] },
                    { status: GameData.userData.money_item_status[5] },
                ]
            data.user_data.daily_item_times_list = [
                { status: GameData.userData.daily_item_times[0] }, // 每日礼包限购次数
                { status: GameData.userData.daily_item_times[1] },
                { status: GameData.userData.daily_item_times[2] },
                { status: GameData.userData.daily_item_times[3] },
                { status: GameData.userData.daily_item_times[4] },
            ]

            data.user_data.weekly_item_times_list = [
                { status: GameData.userData.weekly_item_times[0] }, // 周礼包限购次数
                { status: GameData.userData.weekly_item_times[1] },
                { status: GameData.userData.weekly_item_times[2] },
                { status: GameData.userData.weekly_item_times[3] },
            ]
            data.user_data.monthly_item_times_list = [
                { times: GameData.userData.monthly_item_times[0] }, // 月礼包限购次数
                { times: GameData.userData.monthly_item_times[1] },
                { times: GameData.userData.monthly_item_times[2] },
                { times: GameData.userData.monthly_item_times[3] },
                { times: GameData.userData.monthly_item_times[4] },
            ]
            //拥有的道具列表
            // data.user_data.hasGoods_list = GameData.userData.hasGoodsList, //已拥有的道具列表

            data.user_data.hasGoods_list = [
                { goods_id: 1, number: GameData.userData.hasGoodsList[1] },    // 金币
                { goods_id: 2, number: GameData.userData.hasGoodsList[2] },    // 功勋
                { goods_id: 3, number: GameData.userData.hasGoodsList[3] },    // 事件值
                { goods_id: 4, number: GameData.userData.hasGoodsList[4] },    // 金条
                { goods_id: 5, number: GameData.userData.hasGoodsList[5] },    // 招募令
                { goods_id: 6, number: GameData.userData.hasGoodsList[6] },    // 人才简历
                { goods_id: 7, number: GameData.userData.hasGoodsList[7] },    // 工牌
                { goods_id: 8, number: GameData.userData.hasGoodsList[8] },    // 精钢
                { goods_id: 9, number: GameData.userData.hasGoodsList[9] },    // 加速器
                { goods_id: 10, number: GameData.userData.hasGoodsList[10] },   // 经验值
                { goods_id: 11, number: GameData.userData.hasGoodsList[11] },   // 体力
                { goods_id: 12, number: GameData.userData.hasGoodsList[12] }, // 电量
            ];


            // 建筑获得的加成
            data.user_data.furniture_add_list = [
                { furniture_name: "atk", number: GameData.userData.furniture_add.atk },
                { furniture_name: "inviteTodayAdLastNum", number: GameData.userData.furniture_add.inviteTodayAdLastNum },
                { furniture_name: "battle_Idle_Reward", number: GameData.userData.furniture_add.battle_Idle_Reward },
                { furniture_name: "atk_spd", number: GameData.userData.furniture_add.atk_spd },
                { furniture_name: "task_coin_reward", number: GameData.userData.furniture_add.task_coin_reward },
                { furniture_name: "revenue_capability", number: GameData.userData.furniture_add.revenue_capability },
                { furniture_name: "inviteNum", number: GameData.userData.furniture_add.inviteNum },
                { furniture_name: "orangeStaff", number: GameData.userData.furniture_add.orangeStaff },
            ]
            //已解锁建造点
            data.user_data.builds_list = [
                { lock: GameData.userData.builds[0].lock },
                { lock: GameData.userData.builds[1].lock },
                { lock: GameData.userData.builds[2].lock },
                { lock: GameData.userData.builds[3].lock },
                { lock: GameData.userData.builds[4].lock },
                { lock: GameData.userData.builds[5].lock },
                { lock: GameData.userData.builds[6].lock },
                { lock: GameData.userData.builds[7].lock },
            ]
            // 拥有员工碎片数量
            data.user_data.towerDebris_list = [
                { debris_id: 2001, count: GameData.userData.towerDebris[2001] },
                { debris_id: 2002, count: GameData.userData.towerDebris[2002] },
                { debris_id: 2003, count: GameData.userData.towerDebris[2003] },
                { debris_id: 2004, count: GameData.userData.towerDebris[2004] },
                { debris_id: 2005, count: GameData.userData.towerDebris[2005] },
                { debris_id: 2006, count: GameData.userData.towerDebris[2006] },
                { debris_id: 2007, count: GameData.userData.towerDebris[2007] },
                { debris_id: 2008, count: GameData.userData.towerDebris[2008] },
                { debris_id: 2009, count: GameData.userData.towerDebris[2009] },
                { debris_id: 2010, count: GameData.userData.towerDebris[2010] },
                { debris_id: 2011, count: GameData.userData.towerDebris[2011] },
                { debris_id: 2012, count: GameData.userData.towerDebris[2012] },
                { debris_id: 2013, count: GameData.userData.towerDebris[2013] },
                { debris_id: 2014, count: GameData.userData.towerDebris[2014] },
                { debris_id: 2015, count: GameData.userData.towerDebris[2015] },
                { debris_id: 2016, count: GameData.userData.towerDebris[2016] },
                { debris_id: 11001, count: GameData.userData.towerDebris[11001] },
                { debris_id: 11002, count: GameData.userData.towerDebris[11002] }
            ]
            // 拥有员工的等级
            data.user_data.towerLv_list = [
                { tower_id: 1001, lv: GameData.userData.towerLv[1001] },
                { tower_id: 1002, lv: GameData.userData.towerLv[1002] },
                { tower_id: 1003, lv: GameData.userData.towerLv[1003] },
                { tower_id: 1004, lv: GameData.userData.towerLv[1004] },
                { tower_id: 1005, lv: GameData.userData.towerLv[1005] },
                { tower_id: 1006, lv: GameData.userData.towerLv[1006] },
                { tower_id: 1007, lv: GameData.userData.towerLv[1007] },
                { tower_id: 1008, lv: GameData.userData.towerLv[1008] },
                { tower_id: 1009, lv: GameData.userData.towerLv[1009] },
                { tower_id: 1010, lv: GameData.userData.towerLv[1010] },
                { tower_id: 1011, lv: GameData.userData.towerLv[1011] },
                { tower_id: 1012, lv: GameData.userData.towerLv[1012] },
                { tower_id: 1013, lv: GameData.userData.towerLv[1013] },
                { tower_id: 1014, lv: GameData.userData.towerLv[1014] },
                { tower_id: 1015, lv: GameData.userData.towerLv[1015] },
                { tower_id: 1016, lv: GameData.userData.towerLv[1016] },
            ]
            //拥有员工列表
            data.user_data.tower_list = GameData.userData.towerlist,
                console.log("data.user_data.tower_list2222:" + data.user_data.tower_list);
            console.log("tower_list2222:" + GameData.userData.towerlist);
            // 使用中的建筑的列表
            data.user_data.build_list = [
                { build_id: GameData.userData.buildList[0].buildId, build_lv: GameData.userData.buildList[0].build_lv },
                { build_id: GameData.userData.buildList[1].buildId, build_lv: GameData.userData.buildList[1].build_lv },
                { build_id: GameData.userData.buildList[2].buildId, build_lv: GameData.userData.buildList[2].build_lv },
                { build_id: GameData.userData.buildList[3].buildId, build_lv: GameData.userData.buildList[3].build_lv },
                { build_id: GameData.userData.buildList[4].buildId, build_lv: GameData.userData.buildList[4].build_lv },
            ]
            // 拥有建筑的等级[1, 2, 3, 4]
            data.user_data.build_Lv_list = [
                { building_id: 1, level_list: GameData.userData.buildLvList[1] },
                { building_id: 2, level_list: GameData.userData.buildLvList[2] },
                { building_id: 3, level_list: GameData.userData.buildLvList[3] },
                { building_id: 4, level_list: GameData.userData.buildLvList[4] },
                { building_id: 5, level_list: GameData.userData.buildLvList[5] },
            ]
            //无尽挑战点赞记录
            data.user_data.rankLikedPlayer_list = GameData.userData.endlessLikedPlayers,
                //好友赠送金币列表
                data.user_data.friend_gift_list = GameData.userData.friend_gift_list,

                data.task_data.continuousTaskId = GameData.taskData.continuousTaskId, //持续任务id
                data.task_data.continueTaskTimes_list = GameData.taskData.continueTaskContentNumList, //连续任务内容数量列表
                data.task_data.dailyTaskStatus_list = GameData.taskData.dailyTaskContentNumStatus, //每日任务内容状态列表
                data.task_data.dailyTaskTimes_list = GameData.taskData.dailyTaskContentNumList, //每日任务内容数量列表

                data.battle_data.towerObj_list = [],
                data.battle_data.waitTower_list = [],
                data.battle_data.boxReward_list = GameData.battleData.BoxRewardList
        }
        console.log("进入主界面的数据client_data:", this.client_data);
        console.log("进入主界面的数据user_data:", this.client_data.client_data.user_data);
        console.log("进入主界面的数据tower_list:", this.client_data.client_data.user_data.tower_list);
        console.log("进入主界面的数据GameData.userData.sevenSignIsReceive:", GameData.userData.sevenSignIsReceive);
        console.log("进入主界面的数据GameData.userData.max_chapter:" + GameData.userData.max_chapter)

    }
}
