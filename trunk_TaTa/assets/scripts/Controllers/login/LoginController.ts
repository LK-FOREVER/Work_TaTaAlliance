import { _decorator, Component, director, EditBox, Node, resources, ProgressBar, sys, Button, Label, v3, JsonAsset, error, Size, SpriteFrame, native, Toggle, game, random, view, Vec2, Vec3, UITransform } from "cc";
import { Http } from "../../Common/Http";
import { GameData } from "../../Common/GameData";
import { AudioManager } from "../../Managers/AudioManager";
import { SDKManagers } from "../../Common/SDKManagers";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { Utils } from "../../Common/Utils";
import { TimeController } from "../Time/TimeController";
import TrieFilter from "../../NameSensitive/TrieFilter";
import login_module from "../../module/login_module";
import { Const } from "../../const/consts";
import netManager from "../../Network/netManager";
import { ToastControllers } from "../../Common/ToastControllers";
import EventManager from "../../Common/EventManager";
import EventConst from "../../Utils/EventConst";
const { ccclass, property } = _decorator;
declare var tt: any;
//登录界面控制
@ccclass("LoginController")
export class LoginController extends Component {
    //是否联网
    public static isHttp: boolean = false;

    public http: Http;
    //实例化脚本，全局变量
    public static instance: LoginController = null;
    @property(Node)
    btn_login: Node;
    @property(EditBox)
    password: EditBox;
    @property(EditBox)
    account: EditBox;
    @property(Node)
    btn_shiling: Node;
    //适龄提示
    @property(Node)
    shiling_view: Node;
    //游戏更新
    @property(Node)
    updateGame_view: Node;

    audioMgr: AudioManager;
    timeController: TimeController;
    logindata: any;

    _account: string;
    _nickname: string = "user";
    _use_id: string;

    isForeground: boolean = true;   // 是否在前台
    backgroundStartTime: number = 0; // 进入后台的时间戳

    manager_toggle: Node = null;

    start_game: boolean = false; // 是否开始游戏



    protected onLoad(): void {
        LoginController.instance = this;
        //音频
        // 重置 AudioManager 实例
        this.audioMgr = null;
        this.audioMgr = AudioManager.ins;
        this.start_game = false;
        this.timeController = null;
        this.timeController = LoginController.instance.node.parent.getChildByName("timer_controller").getComponent(TimeController);
        EventManager.Instance.on(EventConst.NETWORK_CONNECT_SUCCESS, this.onNetworkConnectSuccess, this);
        //清除缓存
        // sys.localStorage.clear();

        // if (sys.platform === sys.WECHAT_GAME) {
        //     LoginController.isHttp = false;
        // } else if (sys.isNative) {
        //     LoginController.isHttp = false;
        // } else if (sys.isBrowser) {
        //     LoginController.isHttp = false;
        // } else if (sys.isMobile) {
        //     LoginController.isHttp = false;
        // } else if (sys.isLittleEndian) {
        //     LoginController.isHttp = false;
        // }
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            this.listen();
        }
    }

    start() {
        if (!SDKManagers.SdkOn) {
            // this.btn_login.active = false;
            this.btn_login.active = true;
        } else {
            this.btn_login.active = false;
        }
        this.btn_login.getComponent(Button).interactable = false;
        let layout_top = LoginController.instance.node.getChildByName("layout_top");
        let load_pro = layout_top.getChildByName("load_pro");
        let login_bg = layout_top.getChildByName("login_bg");
        let progressBar = load_pro.getChildByName("ProgressBar").getComponent(ProgressBar);
        // 获取屏幕尺寸
        const screenSize = view.getVisibleSize();
        // 首先计算Bar(进度条图片的偏移量)
        const offset = progressBar.node.getComponent(UITransform).contentSize.x - (screenSize.width * 0.8);
        //设置进度条的长度，为当前屏幕占比的80%减去进度条背景和进度条的宽度差
        progressBar.node.getComponent(ProgressBar).totalLength = screenSize.width * 0.8 - (progressBar.node.getComponent(UITransform).contentSize.x - progressBar.node.getChildByName("Bar").getComponent(UITransform).contentSize.x);
        // 设置进度条背景的宽度为当前屏幕占比的80%
        progressBar.node.getComponent(UITransform).contentSize = new Size(screenSize.width * 0.8, progressBar.node.getComponent(UITransform).contentSize.y);
        //重新调整Bar的位置
        progressBar.node.getChildByName("Bar").position = v3(progressBar.node.getChildByName("Bar").position.x + offset / 2, progressBar.node.getChildByName("Bar").position.y, 0);

        let sp = load_pro.getChildByName("ProgressBar").getChildByName("Bar").getChildByName("Sprite");
        let loading = layout_top.getChildByName("loading");
        let load_cpt = layout_top.getChildByName("load_cpt");
        let manager_btn = this.node.getChildByName("manager_btn");
        this.manager_toggle = manager_btn.getChildByName("Toggle");
        let adult_notice = this.node.getChildByName("adult_notice");
        let notice_popup = this.node.getChildByName("notice_popup");
        let Close_Btn = notice_popup.getChildByName("Close_Btn");
        loading.active = false;
        //加载完成文字
        load_cpt.active = false;
        progressBar.progress = 0;
        load_pro.active = false;
        TrieFilter.getInstance().init(); // 初始化敏感词库
        // this.btn_login.getComponent(Button).interactable = true;
        //十秒后允许点击登录按钮
        setTimeout(() => {
            this.btn_login.getComponent(Button).interactable = true;
            adult_notice.on(Node.EventType.TOUCH_END, () => {
                notice_popup.active = true;
            }, this);
        }, 10000);



        // this.http = this.node.addComponent(Http);
        // if (SDKManagers.SdkOn && sys.isNative) {
        //     login_bg.active = false;
        // } else {
        //     login_bg.active = false;
        // }

        this.btn_shiling.on(Button.EventType.CLICK, this.showShiling, this);
        let btn_shiling_confirm = this.shiling_view.getChildByName("btn_confirm");
        btn_shiling_confirm.on(Button.EventType.CLICK, this.showShiling, this);
        Close_Btn.on(Node.EventType.TOUCH_END, () => {
            notice_popup.active = false;
        }, this);
        this.shiling_view.active = false;
        // MoYangManagers.getUserInfo();
        //原生平台SDK
        // if (SDKManagers.SdkOn && sys.isNative) {
        //     TapSDKManager.native_call();
        //     TapSDKManager.setLoadLogin();
        // }
        this.login();
    }

    onlogin(userdata) {
        let parts = userdata.split("|");
        this._account = parts[1];
        this._nickname = parts[1];
        this._use_id = parts[2];

        // if (LoginController.isHttp) {
        //     console.log("请求网络");
        //     LoginController.instance.http.request(this._account);
        //     LoginController.instance.http.node.on(Http.LOGINSUCCESS,LoginController.instance.loginCallback);
        //     LoginController.instance.http.node.on(Http.REGISTERSUCCESS,LoginController.instance.registerCallback);
        // } else {}


        GameData.userData.nickName = this._nickname;



        // let strValue = sys.localStorage.getItem(GameData.userData.nickName + "userData");
        // if (strValue != "undefined" && strValue != null) {
        //     //本地如果有该账号的数据
        //     this.useLocalData();
        // } else {
        //本地没有该账号的数据
        const AdvancedAccounts = ["e74972433", "n74972441", "l74972445", "h74977707", "w74977831", "w74977866", "h74977895", "t74977848", "j74977880", "r74977906"]
        const IntermediateAccounts = ["u74977719", "o74977727", "f74977731", "i74977734", "s74977835", "w74977870", "m74977900", "u74977852", "i74977888", "h74977909"]
        const JuniorAccounts = ["m74977764", "v74977768", "t74977775", "g74977778", "z74977841", "q74977874", "w74977903", "u74977723", "e74977891", "k74977912"]
        // this.onTestLogin();
        // this.onAdvancedAccountsLogin();
        if (AdvancedAccounts.indexOf(GameData.userData.nickName) !== -1) {
            this.onAdvancedAccountsLogin();
        }
        else if (IntermediateAccounts.indexOf(GameData.userData.nickName) !== -1) {
            this.onIntermediateLogin();
        }
        else if (JuniorAccounts.indexOf(GameData.userData.nickName) !== -1) {
            this.onJuniorLogin();
        }
        this.useLocalData();
        // }
    }
    // 检查是否已过零点
    checkIfTimeHasPassed() {
                console.log("resetTime3333======>:", GameData.userData.resetTime)
        if (GameData.userData.resetTime !== null) {
            // 创建当天0点的Date对象
            let midnight = new Date(GameData.userData.resetTime*1000);
            midnight.setHours(0, 0, 0, 0);

            let midnightTime = midnight.getTime() + 86400000;

            console.log("GameData.userData.loginTime", new Date(GameData.userData.resetTime));
            console.log("midnightTime", new Date(midnightTime));

            let curTime = new Date();
            curTime.setHours(0, 0, 0, 0);
            console.log("当前时间", new Date())
            if (!Utils.isSameWeek(curTime, midnight)) {
                console.log("刷新周礼包")
                GameData.userData.weekly_item_times = [10, 10, 5, 5];
            }
            if (!Utils.isSameMonth(curTime, midnight)) {
                GameData.userData.cost_money_month = 0;
                // console.log("刷新月礼包")
                // GameData.userData.monthly_item_times = [2,2,2,2,2];
            }

            if (GameData.userData.has_monthly_plan_1) {
                if (Utils.daysBetween(new Date(), new Date(GameData.userData.monthly_plan_1_date)) > 30) {
                    GameData.userData.has_monthly_plan_1 = false
                    GameData.userData.monthly_plan_1_day = 0
                } else {
                    GameData.userData.monthly_plan_1_day = Utils.daysBetween(new Date(), new Date(GameData.userData.monthly_plan_1_date))
                }
            }

            if (GameData.userData.has_monthly_plan_2) {
                if (Utils.daysBetween(new Date(), new Date(GameData.userData.monthly_plan_2_date)) > 30) {
                    GameData.userData.has_monthly_plan_2 = false
                    GameData.userData.monthly_plan_2_day = 0
                } else {
                    GameData.userData.monthly_plan_2_day = Utils.daysBetween(new Date(), new Date(GameData.userData.monthly_plan_2_date))
                }
            }

            // 判断现在时间是否超过了保存时间第二天的12点
            if (new Date().getTime() >= midnightTime) {
                console.log("已过零点");
                // GameData.userData.inviteTodayLastNum = GameData.userData.inviteTodayNum;
                GameData.taskData.dailyTaskContentNumStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                GameData.taskData.dailyTaskContentNumList = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                GameData.userData.ad_item_times = [5, 1, 1, 1, 1];
                GameData.userData.daily_item_times = [1, 10, 1, 5, 1];
                GameData.userData.has_monthly_plan_1_reward = false;
                GameData.userData.inviteTodayAdLastNum = GameData.userData.inviteTodayAdNum;
                GameData.userData.resetTime = new Date().getTime() / 1000;
                // GameData.userData.isSidebarEnter = false;
                GameData.userData.isFirstEnterReward = true;
                GameData.userData.endlessLikeCount = 3;
                GameData.userData.endlessLikedPlayers = {};
                GameData.userData.inviteLimiteDailyNum = 0;
                // 将所有好友的 sendmoney 和 getmoney 设为 false
                if (Array.isArray(GameData.userData.friendlist)) {
                    GameData.userData.friendlist.forEach(friend => {
                        friend.SendMoney = false;
                        friend.GetMoney = false;
                    });
                }
                // GameData.userData.hasGoodsList[11] = GameData.userData.hasGoodsList[11] >= 120 ? GameData.userData.hasGoodsList[11] : 120;
                // 七日登录
                GameData.userData.sevenSignIsOpen = false;
                //七日登录信息
                resources.load("data/seven_sign__get_info", (err: any, res: JsonAsset) => {
                    if (err) {
                        error(err.message || err);
                        return;
                    }
                    const jsonData = res.json!;
                    // 判断是否全部领完
                    if (GameData.userData.sevenSignDay >= jsonData.length) {
                        GameData.userData.sevenSignIsReceive = true;
                        // 判断是否领取了当天广告的奖励
                        // if (GameData.userData.sevenSignIsADReceive) {
                        //     GameData.userData.sevenSignIsReceive = true;
                        //     GameData.userData.sevenSignIsADReceive = true;
                        // }
                    } else {
                        if (GameData.userData.sevenSignIsReceive) {
                            GameData.userData.sevenSignDay += 1;
                            GameData.userData.sevenSignIsReceive = false;
                            //GameData.userData.sevenSignIsADReceive = false;
                        }
                    }
                });
            }
        }
    }
    //登录按钮
    login() {
        this.btn_login.on(Button.EventType.CLICK, () => {
            if (sys.os === sys.OS.ANDROID || sys.isNative) {
                native.bridge.sendToNative('login', 'test');
            } else {
                this.onlogin(7 + "|" + "user1" + "|" + 7);//修改"user7"来切换不同账号，在编辑器中测试
            }
            // this.onlogin(7 + "|" + "user" + "|" + 7);
            //抖音
            //MoYangManagers.getUserInfo();
            // DouYinManagers.douyinLogin();

            // if (!SDKManagers.SdkOn) {
            //     //获取输入框文字;
            //     let account_txt = this.account.string;
            //     let password_txt = this.password.string;
            //     if (account_txt == "") return;
            //     this.onlogin(account_txt + "|" + "user" + "|" + account_txt);

            //     if(sys.os === sys.OS.ANDROID || sys.isNative) {
            //         console.log("点击登录")
            //         native.bridge.sendToNative('login');
            //     } else {
            // this.onlogin(7 + "|" + "user" + "|" + 7);
            //     }
            // }

            //原生平台
            // if (sys.isNative) {
            //     TapSDKManager.setTapLogin();
            // }
        });
    }

    listen() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            native.bridge.onNative = (arg0: string, arg1: string): void => {
                if (arg0 === "login") {
                    console.log("Account", arg1)
                    const data = JSON.parse(arg1)
                    GameData.userData.use_id = data.user_id as string
                    GameData.userData.age = data.adult_level as string
                    GameData.userData.nickName = data.nickname as string

                    if (GameData.userData.age === "3" || GameData.userData.age === "2") {

                    }
                    else if (GameData.userData.age === "1" || GameData.userData.age === "0") {
                        this.exit();
                    }

                    LoginController.instance._account = GameData.userData.nickName;
                    LoginController.instance.onlogin(arg1 + "|" + GameData.userData.nickName + "|" + arg1);
                }
            }
        }
    }

    exit() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            native.bridge.sendToNative('exit', 'test');
        }
    }

    pay() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            native.bridge.sendToNative('pay', 'test');
        }
    }

    getPayResult() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            native.bridge.sendToNative('getPayResult', GameData.userData.use_id);
        }
    }

    setPayment() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            native.bridge.sendToNative('setPayment', GameData.userData.use_id);
        }
    }

    useLocalData() {
        //账号和本地缓存相同
        // if (GameData.getUserData() && LoginController.instance._account == GameData.getUserData().nickName) {
        // if (GameData.getUserData()) {

        // let userData = GameData.getUserData();
        // let battleData = GameData.getBattleData();
        // let taskData = GameData.getTaskData();

        // if (userData != null && battleData != null && taskData != null) {
        //     GameData.userData = userData;
        //     GameData.battleData = battleData;
        //     GameData.taskData = taskData;
        //     GameData.replaceData();
            // this.checkIfTimeHasPassed();
        // } else {
        //     GameData.userData = GameData.defaultUserData;
        //     GameData.battleData = GameData.defaultBattleData;
        //     GameData.taskData = GameData.defaultTaskData;
        //     GameData.replaceData();
        //     this.checkIfTimeHasPassed();
        // }


        //拿到sdk给到的账号，连接服务器
        let account = GameData.userData.nickName;
        if (!account || account == "") {
            ToastControllers.Instance.showToast("无效的帐号");
            return;
        }
        if (!login_module.Instance.loginBtnCanClick) {
            return;
        }
        login_module.Instance.loginBtnCanClick = false;
        Const.account = account;
        sys.localStorage.setItem("account", account);
        netManager.Instance.is_reconnect = true;
        netManager.Instance.init(Const.default_ip, Const.default_port);
    }

    onNetworkConnectSuccess() {
        this.checkIfTimeHasPassed();

        if (!this.timeController) {
            this.timeController = LoginController.instance.node.parent.getChildByName("timer_controller").getComponent(TimeController);
        }
        this.timeController.checkDateReset();
        if (GameData.userData.lastUpdateTime === null || (Date.now() - GameData.userData.lastUpdateTime > 1000)) {
            GameData.userData.lastUpdateTime = Date.now();
        }

        console.log("设置用户信息-->", this._use_id);
        //tt时用的
        //EnterManagers.onEnter();
        GameData.userData.use_id = this._use_id;
        GameData.userData.nickName = this._nickname;
        GameData.userData.isEndlessBattleScene = false;
        // GameData.userData.nickName = this._nickname;
        if (GameData.userData.resetTime === null) {
            console.log("首次登录")
            GameData.userData.resetTime = new Date().getTime()/1000;
            // 首次登录保存挂机时间
            if (!GameData.userData.hangupStartTime) {
                GameData.userData.hangupStartTime = Date.now();
                GameData.userData.hangupAlreadyTime = GameData.userData.hangupStartTime;
            }
        }
        console.log("this.audioMgr:======>", this.audioMgr);
        if (!this.audioMgr) {
            this.audioMgr = AudioManager.ins;
        }
        this.audioMgr.init();
        // this.audioMgr.playMusic("mainui_bg", true);
        AudioManager.SetButtonSound();
        this.timeController.startTimer();
        LoginController.instance.loadscene();
    }


    // loginCallback() {
    //     GameData.replaceData();
    //     LoginController.instance.checkIfTimeHasPassed();
    //     LoginController.instance.loadscene();
    // }

    // registerCallback() {
    //     GameData.userData.use_id = LoginController.instance._use_id;
    //     GameData.userData.nickName_InGame = LoginController.instance._nickname;
    //     if (GameData.userData.resetTime === null) {
    //         console.log("首次登录")
    //         GameData.userData.resetTime = new Date().getTime();
    //         // 首次登录保存挂机时间
    //         if (!GameData.userData.hangupStartTime) {
    //             GameData.userData.hangupStartTime = Date.now();
    //             GameData.userData.hangupAlreadyTime = GameData.userData.hangupStartTime;
    //         }
    //     }
    //     LoginController.instance.loadscene();
    // }

    //加载场景
    loadscene() {
        // GameData.userData.age = "2";
        let layout_top = LoginController.instance.node.getChildByName("layout_top");
        let load_pro = layout_top.getChildByName("load_pro");
        let progressBar = load_pro.getChildByName("ProgressBar").getComponent(ProgressBar);
        let loading = layout_top.getChildByName("loading");
        let load_cpt = layout_top.getChildByName("load_cpt");
        //LoginController.instance.btn_login.active = false;
        load_pro.active = true;
        loading.active = false;
        //加载完成文字
        load_cpt.active = false;

        //大场景加载会卡顿，使用preLoadScene方法进行预加载,加载完成后再手动进行切换
        //场景名,加载进度回调使用函数方式,回调函数
        director.preloadScene(
            "Main UI",
            (completedCount: number, totalCount: number, item: any) => {
                let progress = completedCount / totalCount;

                progressBar.progress = progress;
                //显示
                loading.active = true;
            }, () => {
                loading.active = false;
                load_cpt.active = true;
                console.log("主界面预加载完成");
                LoginController.instance.audioMgr.stopMusic();
                LoginController.instance.audioMgr.stopAllSound();
                this.start_game = true;
                director.loadScene("Main UI");
                login_module.Instance.loginBtnCanClick = true;
            });
    }

    //适龄提示页面
    showShiling() {
        if (this.shiling_view.active) {
            this.shiling_view.active = false;
        } else {
            this.shiling_view.active = true;
        }
    }

    // callLechenLogin(data, arg1) {
    //     this.logindata = data.data;
    //     GameData.loginData = data.data;
    //     console.log("GameData.loginData-->", GameData.loginData);
    //     this.showUpdateGameView(arg1);

    //     // if (this.logindata.need_activity == 1) {
    //     //     LeChenManager.onShowActivityFace();
    //     // }
    // }
    // showUpdateGameView(arg1) {
    //     let content = this.updateGame_view.getChildByName("content_bg").getChildByName("content");
    //     if (this.logindata.update_msg) {
    //         content.getComponent(Label).string = this.logindata.update_msg;
    //     }
    //     let btn_cancel = this.updateGame_view.getChildByName("btn_cancel");
    //     let btn_confirm = this.updateGame_view.getChildByName("btn_confirm");

    //     btn_cancel.on(Button.EventType.CLICK, () => {
    //         this.updateGame_view.active = false;
    //         let parts = arg1.split("|");
    //         let account = parts[1];
    //         let nickname = parts[1];
    //         let userdata = account + "|" + nickname + "|" + this.logindata.user_id;
    //         LoginController.instance.onlogin(userdata);
    //     }, this);
    //     btn_confirm.on(Button.EventType.CLICK, () => {
    //         this.updateGame_view.active = false;
    //         TapSDKManager.onUpdate();
    //     }, this);
    //     //建议更新
    //     if (this.logindata.update_type == 1) {
    //         this.updateGame_view.active = true;
    //         //强制更新
    //     } else if (this.logindata.update_type == 2) {
    //         this.updateGame_view.active = true;
    //         btn_cancel.active = false;
    //         btn_confirm.position = v3(0, -180, 0);

    //         //不需要更新
    //     } else {
    //         this.updateGame_view.active = false;
    //         let parts = arg1.split("|");
    //         let account = parts[0];
    //         let nickname = parts[1];
    //         let userdata = account + "|" + nickname + "|" + this.logindata.user_id;
    //         LoginController.instance.onlogin(userdata);
    //     }
    // }

    onAdvancedAccountsLogin() {
        console.log("高级账号登录");
        GameData.userData.guidanceId = 25
        GameData.userData.max_chapter = 180;
        GameData.userData.chapter = 180;
        // GameData.userData.endlessChallengeMaxSurvive = 199;
        GameData.userData.doll_machine_lv = 50;
        GameData.userData.hasGoodsList[1] = 10000000;
        GameData.userData.hasGoodsList[2] = 10000000;
        GameData.userData.hasGoodsList[5] = 1000;
        GameData.userData.hasGoodsList[8] = 1000;
        GameData.userData.hasGoodsList[11] = 100000;
        GameData.userData.hasGoodsList[12] = 10000;
        GameData.userData.isEndlessBattleScene = false;
        GameData.userData.nickName_InGame = "高级账号";
        GameData.userData.play_comic = true;
        GameData.userData.create_nickname = true;
        for (let i = 1001; i < 1013; i++) {
            GameData.userData.towerLv[i] = 100;
        }

        ////已解锁建造点
        for (const unlockBuild of GameData.userData.builds) {
            unlockBuild.lock = true;
        }

        const towerlist = [
            { "id": 1001, "name": "埃里克", "english_name": "Poseidon", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2001, "icon_id": 1001, "draw_id": 3001, "voice_id": 4001, "pub_id": 5001, "spine_id": "spine_1001", "idle_id": "idle_1001", "attack_id": "attack_1001", "atk": 5, "atk_base": 5, "atk_grow": 10, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.05, "crit_hurt": 1.05, "poison": 4, "poison_base": 4, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1002, "name": "艾莉安娜", "english_name": "Black Impermanence", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2002, "icon_id": 1002, "draw_id": 3002, "voice_id": 4002, "pub_id": 5002, "spine_id": "spine_1002", "idle_id": "idle_1002", "attack_id": "attack_1002", "atk": 10, "atk_base": 10, "atk_grow": 20, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1003, "name": "艾文", "english_name": "Zhong Kui", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2003, "icon_id": 1003, "draw_id": 3003, "voice_id": 4003, "pub_id": 5003, "spine_id": "spine_1003", "idle_id": "idle_1003", "attack_id": "attack_1003", "atk": 25, "atk_base": 25, "atk_grow": 50, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 8, "poison_base": 8, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1004, "name": "菲欧娜", "english_name": "Judge of Righteousness", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2004, "icon_id": 1004, "draw_id": 3004, "voice_id": 4004, "pub_id": 5004, "spine_id": "spine_1004", "idle_id": "idle_1004", "attack_id": "attack_1004", "atk": 25, "atk_base": 25, "atk_grow": 50, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1005, "name": "蕾欧娜", "english_name": "White Impermanence", "hurttype": "群体型", "staff_type_id": 1, "quality": 5, "max_lv": 100, "piece_goods_id": 2005, "icon_id": 1005, "draw_id": 3005, "voice_id": 4005, "pub_id": 5005, "spine_id": "spine_1005", "idle_id": "idle_1005", "attack_id": "attack_1005", "atk": 3, "atk_base": 3, "atk_grow": 6, "bullet_spd": 1250, "atk_spd": 1, "range": 300, "radius": 100, "crit": 0.05, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1006, "name": "罗兰", "english_name": "Horse-Face", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2006, "icon_id": 1006, "draw_id": 3006, "voice_id": 4006, "pub_id": 5006, "spine_id": "spine_1006", "idle_id": "idle_1006", "attack_id": "attack_1006", "atk": 6, "atk_base": 6, "atk_grow": 12, "bullet_spd": 1250, "atk_spd": 1, "range": 300, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1007, "name": "瑟琳娜", "english_name": "Judge of Reward", "hurttype": "群体型", "staff_type_id": 1, "quality": 5, "max_lv": 100, "piece_goods_id": 2007, "icon_id": 1007, "draw_id": 3007, "voice_id": 4007, "pub_id": 5007, "spine_id": "spine_1007", "idle_id": "idle_1007", "attack_id": "attack_1007", "atk": 15, "atk_base": 15, "atk_grow": 30, "bullet_spd": 1250, "atk_spd": 1, "range": 300, "radius": 150, "crit": 0.15, "crit_hurt": 1.2, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1008, "name": "石心", "english_name": "Inferno Judge", "hurttype": "控制型", "staff_type_id": 2, "quality": 5, "max_lv": 100, "piece_goods_id": 2008, "icon_id": 1008, "draw_id": 3008, "voice_id": 4008, "pub_id": 5008, "spine_id": "spine_1008", "idle_id": "idle_1008", "attack_id": "attack_1008", "atk": 4, "atk_base": 4, "atk_grow": 8, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0.15, "slow_time": 2, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1009, "name": "索菲亚", "english_name": "Yama", "hurttype": "控制型", "staff_type_id": 2, "quality": 5, "max_lv": 100, "piece_goods_id": 2009, "icon_id": 1009, "draw_id": 3009, "voice_id": 4009, "pub_id": 5009, "spine_id": "spine_1009", "idle_id": "idle_1009", "attack_id": "attack_1009", "atk": 10, "atk_base": 10, "atk_grow": 20, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0.2, "slow_time": 2, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1010, "name": "铁锤", "english_name": "Meng Po", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2010, "icon_id": 1010, "draw_id": 3010, "voice_id": 4010, "pub_id": 5010, "spine_id": "spine_1010", "idle_id": "idle_1010", "attack_id": "attack_1010", "atk": 5, "atk_base": 5, "atk_grow": 5, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.05, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1011, "name": "亚历克斯", "english_name": "Ox-Head", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2011, "icon_id": 1011, "draw_id": 3011, "voice_id": 4011, "pub_id": 5011, "spine_id": "spine_1011", "idle_id": "idle_1011", "attack_id": "attack_1011", "atk": 4, "atk_base": 4, "atk_grow": 8, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 4, "poison_base": 4, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1012, "name": "岩啸", "english_name": "Chakravartin", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2012, "icon_id": 1012, "draw_id": 3012, "voice_id": 4012, "pub_id": 5012, "spine_id": "spine_1012", "idle_id": "idle_1012", "attack_id": "attack_1012", "atk": 8, "atk_base": 8, "atk_grow": 16, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 8, "poison_base": 8, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
        ];
        GameData.userData.towerlist = towerlist
        const bestEquipList = {
            0:
                [{ equip_id: 3001, effect_name: "攻击", effect_value: 61423.94, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3002, effect_name: "攻击", effect_value: 61423.94, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3003, effect_name: "暴击率", effect_value: 10 / 100, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3004, effect_name: "暴击伤害", effect_value: 60 / 100, equip_quality: 6, equip_lv: 50 }],
            1:
                [{ equip_id: 3005, effect_name: "攻击", effect_value: 26940.32, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3006, effect_name: "攻击", effect_value: 26940.32, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3007, effect_name: "暴击率", effect_value: 10 / 100, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3008, effect_name: "暴击伤害", effect_value: 60 / 100, equip_quality: 6, equip_lv: 50 }],
            2:
                [{ equip_id: 3009, effect_name: "攻击", effect_value: 24569.57, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3010, effect_name: "攻击", effect_value: 24569.57, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3011, effect_name: "减速效果", effect_value: 30 / 100, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3012, effect_name: "减速时间", effect_value: 3, equip_quality: 6, equip_lv: 50 }],
            3:
                [{ equip_id: 3013, effect_name: "攻击", effect_value: 12284.78, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3014, effect_name: "攻击", effect_value: 12284.78, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3015, effect_name: "持续攻击", effect_value: 12284.78, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3016, effect_name: "持续时间", effect_value: 3, equip_quality: 6, equip_lv: 50 }]
        }

        GameData.userData.hasEquipList = bestEquipList;
        GameData.userData.career = 22;
        // 拥有建筑的等级
        const highbuildLvList = {
            1: [1, 2, 3, 4],
            2: [1, 2, 3, 4],
            3: [1, 2, 3, 4],
            4: [1, 2, 3, 4],
            5: [1, 2, 3, 4],
        }
        GameData.userData.buildLvList = highbuildLvList;
        // 使用中的建筑的列表
        for (const build of GameData.userData.buildList) {
            build.build_lv = 4;
        }
    }

    onIntermediateLogin() {
        console.log("中级账号登录");
        GameData.userData.guidanceId = 25
        GameData.userData.max_chapter = 100;
        GameData.userData.chapter = 100;
        GameData.userData.doll_machine_lv = 25;
        GameData.userData.hasGoodsList[1] = 500000;
        GameData.userData.hasGoodsList[2] = 500000;
        GameData.userData.hasGoodsList[5] = 500;
        GameData.userData.hasGoodsList[8] = 500;
        GameData.userData.hasGoodsList[11] = 5000;
        GameData.userData.hasGoodsList[12] = 10000;
        GameData.userData.isEndlessBattleScene = false;
        GameData.userData.nickName_InGame = "中级账号";
        GameData.userData.play_comic = true;
        GameData.userData.create_nickname = true;
        for (let i = 1001; i < 1013; i++) {
            GameData.userData.towerLv[i] = 50;
        }

        ////已解锁建造点
        for (const unlockBuild of GameData.userData.builds) {
            unlockBuild.lock = true;
        }

        const towerlist = [
            { "id": 1001, "name": "埃里克", "english_name": "Poseidon", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2001, "icon_id": 1001, "draw_id": 3001, "voice_id": 4001, "pub_id": 5001, "spine_id": "spine_1001", "idle_id": "idle_1001", "attack_id": "attack_1001", "atk": 5, "atk_base": 5, "atk_grow": 10, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.05, "crit_hurt": 1.05, "poison": 4, "poison_base": 4, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1002, "name": "艾莉安娜", "english_name": "Black Impermanence", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2002, "icon_id": 1002, "draw_id": 3002, "voice_id": 4002, "pub_id": 5002, "spine_id": "spine_1002", "idle_id": "idle_1002", "attack_id": "attack_1002", "atk": 10, "atk_base": 10, "atk_grow": 20, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1003, "name": "艾文", "english_name": "Zhong Kui", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2003, "icon_id": 1003, "draw_id": 3003, "voice_id": 4003, "pub_id": 5003, "spine_id": "spine_1003", "idle_id": "idle_1003", "attack_id": "attack_1003", "atk": 25, "atk_base": 25, "atk_grow": 50, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 8, "poison_base": 8, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1004, "name": "菲欧娜", "english_name": "Judge of Righteousness", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2004, "icon_id": 1004, "draw_id": 3004, "voice_id": 4004, "pub_id": 5004, "spine_id": "spine_1004", "idle_id": "idle_1004", "attack_id": "attack_1004", "atk": 25, "atk_base": 25, "atk_grow": 50, "bullet_spd": 1250, "atk_spd": 0.5, "range": 400, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1005, "name": "蕾欧娜", "english_name": "White Impermanence", "hurttype": "群体型", "staff_type_id": 1, "quality": 5, "max_lv": 100, "piece_goods_id": 2005, "icon_id": 1005, "draw_id": 3005, "voice_id": 4005, "pub_id": 5005, "spine_id": "spine_1005", "idle_id": "idle_1005", "attack_id": "attack_1005", "atk": 3, "atk_base": 3, "atk_grow": 6, "bullet_spd": 1250, "atk_spd": 1, "range": 300, "radius": 100, "crit": 0.05, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1006, "name": "罗兰", "english_name": "Horse-Face", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2006, "icon_id": 1006, "draw_id": 3006, "voice_id": 4006, "pub_id": 5006, "spine_id": "spine_1006", "idle_id": "idle_1006", "attack_id": "attack_1006", "atk": 6, "atk_base": 6, "atk_grow": 12, "bullet_spd": 1250, "atk_spd": 1, "range": 300, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1007, "name": "瑟琳娜", "english_name": "Judge of Reward", "hurttype": "群体型", "staff_type_id": 1, "quality": 5, "max_lv": 100, "piece_goods_id": 2007, "icon_id": 1007, "draw_id": 3007, "voice_id": 4007, "pub_id": 5007, "spine_id": "spine_1007", "idle_id": "idle_1007", "attack_id": "attack_1007", "atk": 15, "atk_base": 15, "atk_grow": 30, "bullet_spd": 1250, "atk_spd": 1, "range": 300, "radius": 150, "crit": 0.15, "crit_hurt": 1.2, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1008, "name": "石心", "english_name": "Inferno Judge", "hurttype": "控制型", "staff_type_id": 2, "quality": 5, "max_lv": 100, "piece_goods_id": 2008, "icon_id": 1008, "draw_id": 3008, "voice_id": 4008, "pub_id": 5008, "spine_id": "spine_1008", "idle_id": "idle_1008", "attack_id": "attack_1008", "atk": 4, "atk_base": 4, "atk_grow": 8, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0.15, "slow_time": 2, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1009, "name": "索菲亚", "english_name": "Yama", "hurttype": "控制型", "staff_type_id": 2, "quality": 5, "max_lv": 100, "piece_goods_id": 2009, "icon_id": 1009, "draw_id": 3009, "voice_id": 4009, "pub_id": 5009, "spine_id": "spine_1009", "idle_id": "idle_1009", "attack_id": "attack_1009", "atk": 10, "atk_base": 10, "atk_grow": 20, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0.2, "slow_time": 2, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1010, "name": "铁锤", "english_name": "Meng Po", "hurttype": "单体型", "staff_type_id": 0, "quality": 4, "max_lv": 100, "piece_goods_id": 2010, "icon_id": 1010, "draw_id": 3010, "voice_id": 4010, "pub_id": 5010, "spine_id": "spine_1010", "idle_id": "idle_1010", "attack_id": "attack_1010", "atk": 5, "atk_base": 5, "atk_grow": 5, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.05, "crit_hurt": 1.05, "poison": 0, "poison_base": 0, "poi_grow": 0, "duration": 0, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1011, "name": "亚历克斯", "english_name": "Ox-Head", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2011, "icon_id": 1011, "draw_id": 3011, "voice_id": 4011, "pub_id": 5011, "spine_id": "spine_1011", "idle_id": "idle_1011", "attack_id": "attack_1011", "atk": 4, "atk_base": 4, "atk_grow": 8, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.1, "crit_hurt": 1.05, "poison": 4, "poison_base": 4, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
            { "id": 1012, "name": "岩啸", "english_name": "Chakravartin", "hurttype": "持续型", "staff_type_id": 3, "quality": 6, "max_lv": 100, "piece_goods_id": 2012, "icon_id": 1012, "draw_id": 3012, "voice_id": 4012, "pub_id": 5012, "spine_id": "spine_1012", "idle_id": "idle_1012", "attack_id": "attack_1012", "atk": 8, "atk_base": 8, "atk_grow": 16, "bullet_spd": 1250, "atk_spd": 0.5, "range": 350, "radius": 0, "crit": 0.15, "crit_hurt": 1.2, "poison": 8, "poison_base": 8, "poi_grow": 1, "duration": 2, "slow": 0, "slow_time": 0, "is_return": 0, "build_id": 0, "introduce": "" },
        ];
        GameData.userData.towerlist = towerlist
        const bestEquipList = {
            0:
                [{ equip_id: 3001, effect_name: "攻击", effect_value: 15482.26, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3002, effect_name: "攻击", effect_value: 15482.26, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3003, effect_name: "暴击率", effect_value: 5 / 100, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3004, effect_name: "暴击伤害", effect_value: 30 / 100, equip_quality: 4, equip_lv: 50 }],
            1:
                [{ equip_id: 3005, effect_name: "攻击", effect_value: 6171.18, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3006, effect_name: "攻击", effect_value: 6171.18, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3007, effect_name: "暴击率", effect_value: 5 / 100, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3008, effect_name: "暴击伤害", effect_value: 30 / 100, equip_quality: 4, equip_lv: 50 }],
            2:
                [{ equip_id: 3009, effect_name: "攻击", effect_value: 5160.75, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3010, effect_name: "攻击", effect_value: 5160.75, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3011, effect_name: "减速效果", effect_value: 10 / 100, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3012, effect_name: "减速时间", effect_value: 2, equip_quality: 4, equip_lv: 50 }],
            3:
                [{ equip_id: 3013, effect_name: "攻击", effect_value: 2580.37, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3014, effect_name: "攻击", effect_value: 2580.37, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3015, effect_name: "持续攻击", effect_value: 2580.37, equip_quality: 4, equip_lv: 50 },
                { equip_id: 3016, effect_name: "持续时间", effect_value: 2, equip_quality: 4, equip_lv: 50 }]
        }

        GameData.userData.hasEquipList = bestEquipList;
        GameData.userData.career = 11;
        // 拥有建筑的等级
        const highbuildLvList = {
            1: [1, 2],
            2: [1, 2],
            3: [1, 2],
            4: [1, 2],
            5: [1, 2],
        }
        GameData.userData.buildLvList = highbuildLvList;
        // 使用中的建筑的列表
        for (const build of GameData.userData.buildList) {
            build.build_lv = 2;
        }
    }

    onJuniorLogin() {
        console.log("初级账号登录");
        GameData.userData.guidanceId = 25
        GameData.userData.isEndlessBattleScene = false;
        GameData.userData.nickName_InGame = "初级账号";
        GameData.userData.play_comic = true;
        GameData.userData.create_nickname = true;
    }

    onTestLogin() {
        console.log("测试账号登录");
        GameData.userData.guidanceId = 25
        GameData.userData.career = 1;
        GameData.userData.isEndlessBattleScene = false;
        GameData.userData.nickName_InGame = "测试账号";
        GameData.userData.play_comic = true;
        GameData.userData.create_nickname = true;
        GameData.userData.max_chapter = 168;
        GameData.userData.chapter = 168;
        const bestEquipList = {
            0:
                [{ equip_id: 3001, effect_name: "攻击", effect_value: 61423.94, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3002, effect_name: "攻击", effect_value: 61423.94, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3003, effect_name: "暴击率", effect_value: 10 / 100, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3004, effect_name: "暴击伤害", effect_value: 60 / 100, equip_quality: 6, equip_lv: 50 }],
            1:
                [{ equip_id: 3005, effect_name: "攻击", effect_value: 26940.32, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3006, effect_name: "攻击", effect_value: 26940.32, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3007, effect_name: "暴击率", effect_value: 10 / 100, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3008, effect_name: "暴击伤害", effect_value: 60 / 100, equip_quality: 6, equip_lv: 50 }],
            2:
                [{ equip_id: 3009, effect_name: "攻击", effect_value: 24569.57, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3010, effect_name: "攻击", effect_value: 24569.57, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3011, effect_name: "减速效果", effect_value: 30 / 100, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3012, effect_name: "减速时间", effect_value: 3, equip_quality: 6, equip_lv: 50 }],
            3:
                [{ equip_id: 3013, effect_name: "攻击", effect_value: 12284.78, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3014, effect_name: "攻击", effect_value: 12284.78, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3015, effect_name: "持续攻击", effect_value: 12284.78, equip_quality: 6, equip_lv: 50 },
                { equip_id: 3016, effect_name: "持续时间", effect_value: 3, equip_quality: 6, equip_lv: 50 }]
        }

        GameData.userData.hasEquipList = bestEquipList;
    }


    // // 检查是否需要重置累计在线时间（跨天判断）
    // private checkDateReset() {
    //     if(GameData.userData.lastUpdateTime === null)
    //     {
    //         GameData.userData.lastUpdateTime = Date.now(); 
    //     }
    //     const lastDate = new Date(GameData.userData.lastUpdateTime);
    //     const now = new Date();

    //     if (
    //         lastDate.getUTCFullYear() !== now.getUTCFullYear() ||
    //         lastDate.getUTCMonth() !== now.getUTCMonth() ||
    //         lastDate.getUTCDate() !== now.getUTCDate()
    //     ) {
    //         GameData.userData.dailyAccumulatedTime = 0;
    //         GameData.userData.lastUpdateTime = Date.now();
    //     }
    // }


    // // 每秒更新时间
    // private updateTime() {
    //     const now = Date.now();
    //     const elapsedMinutes = (now - GameData.userData.lastUpdateTime) / 1000 / 60; // 转换为分钟

    //     this.checkDateReset(); // 每次更新都检查跨天

    //     GameData.userData.dailyAccumulatedTime += elapsedMinutes;
    //     GameData.userData.lastUpdateTime = now;
    //     GameData.userData.updateTimes++;
    //     if(GameData.userData.updateTimes === 60)
    //     {
    //         GameData.userData.updateTimes = 0;
    //         GameData.taskData.dailyTaskContentNumList[9]++;
    //     }
    //     console.log("累计在线时间", GameData.userData.dailyAccumulatedTime);
    // }
}
