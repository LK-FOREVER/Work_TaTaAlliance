import { _decorator, Vec2, director, Component, instantiate, Node, Prefab, Animation, EventTarget, NodeEventType, find, view, assetManager, ImageAsset, SpriteFrame, Texture2D, Sprite, sys, Button, resources, JsonAsset, error, Label, Game, native, } from "cc";
import { TouchBatlleControllers } from "./TouchBatlleControllers";
import { GameData } from "../../Common/GameData";
import { DecisionMainControllers } from "../Decision/DecisionMainControllers";
import { AudioManager } from "../../Managers/AudioManager";
import { LeChenManager } from "../../LeChen/LeChenManager";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { LoadUtils } from "../../Common/LoadUtils";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { EnterManagers } from "../../MoYang/EnterManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { equipController } from "../equip/equipController";
import { staffController } from "../Staff/staffController";
import { DailyQuestController } from "../DailyQuest/DailyQuestController";
import { InitialChargeController } from "../InitialCharge/InitialChargeController";
import { MainUIGuidanceController } from "../Guide/MainUIGuidanceController";
import { TextUtils } from "../../Common/TextUtils";
import { ShowGoods } from "../../Common/ShowGoods";
import EventManager from "../../Common/EventManager";
import { EventConst } from "../../Common/EventConst";
import { FriendManager } from "../../Managers/FriendManager";
import { EndlessController } from "../Endless/EndlessController";
const { ccclass, property } = _decorator;
declare var tt: any;
@ccclass("MainUIControllers")
export class MainUIControllers extends Component {
    public static instance: MainUIControllers = null!;

    // @property(Prefab)
    // Staff: Prefab = null;

    @property(Prefab)
    equip_view: Prefab = null; //装备窗口

    @property(Prefab)
    invite_box: Prefab = null; //招聘弹窗

    @property(Prefab)
    bonus_box: Prefab = null; //奖金弹窗

    @property(Prefab)
    staff_up: Prefab = null; //升职弹窗

    @property(Prefab)
    seven_sign: Prefab = null; //七日签到弹窗

    @property(Prefab)
    hangup: Prefab = null; //挂机奖励弹窗

    @property(SpriteFrame)
    comicList: Array<any> = new Array(); //漫画列表

    @property(Node)
    fade: Node = null; //漫画播放前的淡入

    @property(Node)
    comic: Node = null; //漫画

    @property(Node)
    create_account_box: Node = null;//创建昵称

    staff_view: Node = null; //员工窗口

    initial_charge_box: Node = null; //首充礼包弹窗

    Furniture: Node = null; //家具节点
    furniture_box: Node = null; //家具窗口

    daily_quest_box: Node = null; //每日任务窗口

    Invite: Node = null; //招聘节点

    decision_main_view: Node = null; //决策窗口

    open_invite_box_btn: Node = null; //招聘按键

    open_kefu_btn: Node = null; //联系客服按键
    open_recordScreen_btn: Node = null; //录制游戏按键
    open_share_record_btn: Node = null; //分享录屏按键
    btn_share: Node = null; //分享有礼按键
    open_seven_sign_btn: Node = null; //七日签到按键
    open_initial_charge_btn: Node = null;//首充礼包按键

    open_hangup_btn: Node = null; //挂机收益按键
    open_enter_btn: Node = null; //入口奖励按键
    open_bonus_btn: Node = null; //季度奖金按键
    open_decision_btn: Node = null; //决策按键
    open_illustration_btn: Node = null; //图鉴按键
    open_equip_btn: Node = null; //装备按键
    open_shop_btn: Node = null; //商城按键
    open_set_btn: Node = null;//设置按键
    open_pub_btn: Node = null;//酒馆按键
    open_friend_btn: Node = null;//好友按键
    open_endless_btn: Node = null; //无尽模式按键

    open_up_btn: Node = null; //角色直升按键
    open_build_btn: Node = null; //家具按键
    open_daily_quest_btn: Node = null; //每日任务按键
    main_invite_icon: Node = null; //招募icon
    pub_icon: Node = null; //酒馆icon
    shop_icon: Node = null; //商城icon
    daily_quest_icon: Node = null; //每日任务icon
    illustration_icon: Node = null; //图鉴icon
    shop_text_reddot: Node = null; //商城名字和红点的父物体
    illustration_text_reddot: Node = null; //图鉴名字和红点的父物体
    daily_quest_text_reddot: Node = null; //每日任务名字和红点的父物体
    pub_text_reddot: Node = null; //酒馆名字和红点的父物体

    btn_duihuan: Node = null; //兑换码按键
    btn_attention: Node = null; //关注有礼按键
    activity_icon: Node = null; //活动按键

    txt_record: Node = null; //录制游戏按键label

    save: Node = null;

    //活动相关
    activity_face_view: any;
    // need_activity: number = 0;
    static activity_urldata: any;
    acticity_enter_view: Node;

    private _singleTouchCtr: TouchBatlleControllers = null;
    start_pos: Vec2;
    move_pos: Vec2;
    end_pos: Vec2;

    audioMgr: any; //音效

    onLoad() {
        MainUIControllers.instance = this;
        this.listen();
    }

    start() {
        const eventTarget = new EventTarget();
        globalThis.tar = eventTarget;
        // let mapctrl = MapControllers.instance;
        // mapctrl.init();
        //音频
        this.audioMgr = AudioManager.ins;
        this.audioMgr.playMusic("mainui_bg", true);
        this.initUI();
        // 点击漫画
        this.comic.on(NodeEventType.TOUCH_END, this.comicClick, this);
        // 打开招聘窗口
        this.open_invite_box_btn.on(NodeEventType.TOUCH_END, this.open_invite_box, this);
        // 打开家具窗口
        this.open_build_btn.on(NodeEventType.TOUCH_END, (event) => (this.furniture_box.active = true));
        // 打开每日任务
        this.open_daily_quest_btn.on(NodeEventType.TOUCH_END, (event) => {
            this.daily_quest_box.active = true;
            this.daily_quest_box.getComponent(DailyQuestController).init();
        })
        // 打开装备
        this.open_equip_btn.on(Button.EventType.CLICK, (event) => {
            this.node.getChildByName("equip_view").active = true;
            this.node.getChildByName("equip_view").getComponent(equipController).init();
        });
        // 打开员工
        this.open_illustration_btn.on(Button.EventType.CLICK, (event) => {
            this.node.getChildByName("MainTop").getChildByName("main_top").active = false;
            this.node.getChildByName("staff_view").active = true;
            this.node.getChildByName("staff_view").getComponent(staffController).init(false);
        });
        // 打开酒馆
        this.open_pub_btn.on(Button.EventType.CLICK, (event) => {
            this.node.getChildByName("MainTop").getChildByName("main_top").active = false;
            this.node.getChildByName("pub_view").active = true;
            this.node.getChildByName("pub_view").getComponent(staffController).init(true);
        })
        // 打开商城
        this.open_shop_btn.on(Button.EventType.CLICK, (event) => {
            this.node.getChildByName("shop_view").active = true;
        });
        // 打开设置
        this.open_set_btn.on(Button.EventType.CLICK, (event) => {
            this.node.getChildByName("set_view").active = true;
        });
        // 打开决策窗口
        this.open_decision_btn.on(NodeEventType.TOUCH_END, (event) => {
            this.decision_main_view.active = true;
            let decisionctrl = this.decision_main_view.getComponent(DecisionMainControllers);
            decisionctrl.init();
        });

        this.open_friend_btn.on(NodeEventType.TOUCH_END, (event) => {
            this.node.getChildByName("Friend_View").active = true;
            this.node.getChildByName("Friend_View").getComponent(FriendManager).Init_UI();
        })
        // 打开无尽挑战窗口
        this.open_endless_btn.on(NodeEventType.TOUCH_END, (event) => {
            this.node.getChildByName("endless_view").active = true;
            this.node.getChildByName("endless_view").getComponent(EndlessController).init();
        })

        // 打开季度奖金窗口
        // this.open_bonus_btn.on(NodeEventType.TOUCH_END, (event) => {
        //     // 实例化预制体 instantiate
        //     let bonus_box = instantiate(this.bonus_box)
        //     bonus_box.setParent(this.node)
        //     bonus_box.setPosition(0, 0)
        // })
        // 打开直升十级窗口
        this.open_up_btn.on(NodeEventType.TOUCH_END, (event) => {
            // 实例化预制体 instantiate
            let staff_up = instantiate(this.staff_up);
            staff_up.setParent(this.node);
            staff_up.setPosition(0, 0);
        });
        // 打开七日签到
        this.open_seven_sign_btn.on(NodeEventType.TOUCH_END, (event) => {
            // 实例化预制体 instantiate
            let seven_sign = instantiate(this.seven_sign);
            seven_sign.setParent(this.node);
            seven_sign.setPosition(0, 0);
        });
        // 打开首充礼包 
        this.open_initial_charge_btn.on(NodeEventType.TOUCH_END, (event) => {
            this.initial_charge_box.active = true;
            this.initial_charge_box.getComponent(InitialChargeController).init();
        });
        // 打开挂机收益
        this.open_hangup_btn.on(NodeEventType.TOUCH_END, (event) => {
            // 实例化预制体 instantiate
            let hangup = instantiate(this.hangup);
            hangup.setParent(this.node);
            hangup.setPosition(0, 0);
        });
        // // 打开兑换码窗口
        // this.btn_duihuan.on(NodeEventType.TOUCH_END, (event) => {
        //     ActivityControllers.instance.showDuihuanView();
        // })
        // // 打开关注有礼窗口
        // this.btn_attention.on(NodeEventType.TOUCH_END, (event) => {
        //     ActivityControllers.instance.showAttentionView();
        // })
        // 打开分享有礼窗口
        this.btn_share.on(NodeEventType.TOUCH_END, (event) => {
            //复制文案并跳转到对应链接
            TapSDKManager.onShare();
        });
        // this.showActivityFaceView();
        // 联系客服
        this.open_kefu_btn.on(NodeEventType.TOUCH_END, (event) => {
            tt.openCustomerServiceConversation({
                type: 1, // 小6 客服
                success(res) {
                    console.log(res);
                },
                fail(res) {
                    console.log(res);
                },
            });
        });
        // 录制屏幕
        this.open_recordScreen_btn.on(NodeEventType.TOUCH_END, (event) => {
            MoYangManagers.recordScreen();
        });
        // 分享录屏
        this.open_share_record_btn.on(NodeEventType.TOUCH_END, (event) => {
            MoYangManagers.sharerecord();
        });
        // 入口奖励
        this.open_enter_btn.on(NodeEventType.TOUCH_END, (event) => {
            this.acticity_enter_view.active = true;
            this.acticity_enter_view.getComponent(EnterManagers).changeBtn();
        });
        // 更新图标
        this.updataBtnSprite();
        // 倒计时
        this.hangupUpdataTime();

        // 判断是否从晋升成功过来的
        if (GameData.openFurniture) {
            console.log("GameData.openFurniture", GameData.openFurniture);
            // console.log('this.node.getChildByName("Furniture").getChildByName("furniture_box")', this.node.getChildByName("Furniture").getChildByName("furniture_box"))
            setTimeout(() => {
                this.furniture_box.active = true;
            }, 200);
            GameData.openFurniture = false;
        } else {
            this.furniture_box.active = false;
        }
        if (SDKManagers.SdkOn && sys.isNative) {
            console.log("need_activity-->" + GameData.loginData);
            if (GameData.loginData.need_activity == 1) {
                LeChenManager.onShowActivityFace();
            }
        }

        this.updateRedDot();

        if (GameData.userData.has_monthly_plan_1 && !GameData.userData.has_monthly_plan_1_reward) {
            const reward = [{
                reward: 4,
                number: 400
            }]
            GameData.userData.has_monthly_plan_1_reward = true
            ShowGoods.init(reward)
        }

        if (GameData.userData.guidanceId !== -1) {
            const node = this.node.getChildByName('guidance_box')
            node.active = true
            node.getComponent(MainUIGuidanceController).init()
        }

        EventManager.Instance.on(EventConst.SAVE_SUCCESS, this.playSaveAnim, this)

        if (!GameData.userData.create_nickname) {
            if (this.create_account_box) {
                this.create_account_box.active = true;
            }
            const node = this.node.getChildByName('guidance_box').getChildByName('finger');
            if (node) {
                node.active = false
            }
        }

        // 初始化建筑
        this.updateBuild();
    }

    update() {
        if (GameData.taskData.dailyTaskContentNumStatus[9] == 0) {
            this.updateRedDot();
        }
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.SAVE_SUCCESS, this.playSaveAnim, this)
    }

    playSaveAnim() {
        this.save.active = true
        this.scheduleOnce(() => {
            this.save.active = false
        }, 2)
    }

    comicClick() {
        GameData.userData.play_comic_num++;
        if (GameData.userData.play_comic_num < this.comicList.length) {
            this.comic.getComponent(Sprite).spriteFrame = this.comicList[GameData.userData.play_comic_num];
        }
        else {
            GameData.userData.play_comic = true;
            this.comic.active = false;
            this.fade.active = false;
        }
    }

    open_invite_box() {
        let invite_box = instantiate(this.invite_box);
        invite_box.setParent(this.Invite);
        invite_box.setPosition(0, 0);
    }

    updataBtnSprite() {
        //直升信息
        // resources.load(
        //     "data/staff_up__get_info",
        //     (err: any, res: JsonAsset) => {
        //         if (err) {
        //             error(err.message || err);
        //             return;
        //         }
        //         const jsonData = res.json!;
        //         // 判断是否全部领完
        //         if (GameData.userData.staffUpId >= jsonData.length) {
        //             this.node.getChildByName("open_up_btn").active = false;
        //         } else {
        //             jsonData.forEach((item) => {
        //                 // 已领取的奖励id+1为下一个奖励   例：未领取奖励时id为0,0+1=1，下一个要领取的奖励为1
        //                 if (item.id === GameData.userData.staffUpId + 1) {
        //                     // 更新主场景图标
        //                     // resources.load(`textures/staff_up/staff_up_btn_${item.staff_id < 10 ? "0" + item.staff_id : item.staff_id}/spriteFrame`, SpriteFrame, (err, sp) => {
        //                     //     this.node.getChildByName("open_up_btn").getComponent(Sprite).spriteFrame = sp
        //                     // })
        //                     let sp2 = LoadUtils.Instance.staff_up.getSpriteFrame(`staff_up_btn_${item.staff_id < 10
        //                         ? "0" + item.staff_id
        //                         : item.staff_id
        //                         }`);
        //                     this.node.getChildByName("open_up_btn").getComponent(Sprite).spriteFrame = sp2;
        //                 }
        //             });
        //         }
        //     }
        // );
        //七日登录信息
        resources.load("data/seven_sign__get_info", (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            const jsonData = res.json!;
            // 判断是否全部领完
            if (GameData.userData.sevenSignDay >= jsonData.length) {
                // 判断是否领取了当天广告的奖励
                if (GameData.userData.sevenSignIsADReceive) {
                    // 隐藏主场景图标
                    const Canvas = find("Canvas");
                    Canvas.getChildByName("open_seven_sign_btn").active = false;
                }
            }
        }
        );
        //分享有礼
        //this.node.getChildByName("open_share_btn").getChildByName("reddot").active = !GameData.userData.sevenSignIsOpen;
    }

    hangupUpdataTime(isTopLimit = false) {
        this.unscheduleAllCallbacks();
        // 现在时间
        const nowTime = Date.now();
        // 基础挂机时间戳
        let basicHangupTime = GameData.userData.basicHangupTime * 60 * 1000;
        // 加成挂机时间戳
        let addHangupTime = GameData.userData.addHangupTime * 60 * 1000;
        // 当前时间戳减开始时间戳 用这个值判断是否超过挂机上限
        let timeDifference = nowTime - GameData.userData.hangupStartTime;

        // 用当前时间-开始时间，如果小于挂机上限，已经挂机时间变为开始时间+未超过挂机上限的值
        if (basicHangupTime + addHangupTime > timeDifference) {
            if (!isTopLimit)
                GameData.userData.hangupAlreadyTime =
                    GameData.userData.hangupStartTime + timeDifference;
            // 每秒钟刷新时间
            this.schedule(() => {
                // 已挂机时间超过了可以挂机的时间
                if (GameData.userData.hangupAlreadyTime >= GameData.userData.hangupStartTime + basicHangupTime + addHangupTime) {
                    console.log("时间已到");
                    this.unscheduleAllCallbacks();
                } else {
                    // 每秒钟将已经挂机时间加1000毫秒
                    GameData.userData.hangupAlreadyTime += 1000;
                }
                // 已挂机时间减开始时间为已挂机时间
                let hangupTime = GameData.userData.hangupAlreadyTime - GameData.userData.hangupStartTime;
                // 将hangupTime时间戳转换成00:00:00格式
                this.open_hangup_btn.getChildByName("time").getComponent(Label).string = this.convertTime(hangupTime);
            }, 1);
        } else {
            // 已经到达上限，将已经挂机时间 = 开始挂机时间 + 挂机上限的时间
            GameData.userData.hangupAlreadyTime = GameData.userData.hangupStartTime + basicHangupTime + addHangupTime;
            // 已挂机时间减开始时间为已挂机时间
            let hangupTime = GameData.userData.hangupAlreadyTime - GameData.userData.hangupStartTime;
            // 将hangupTime时间戳转换成00:00:00格式
            this.open_hangup_btn.getChildByName("time").getComponent(Label).string = this.convertTime(hangupTime);
        }
    }
    // 转换时间戳的函数
    convertTime(time: number) {
        // 将毫秒转换为秒
        let seconds = Math.floor(time / 1000);
        // 将秒转换为小时、分钟和秒
        let hours = Math.floor(seconds / 3600); // 每小时3600秒
        let minutes = Math.floor((seconds % 3600) / 60); // 每分钟60秒
        let remainingSeconds = seconds % 60; // 剩余的秒数
        let timeString = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
            }:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
        return timeString;
    }

    public setActivitydata(data) {
        MainUIControllers.activity_urldata = data.data;
        this.showActivityFaceView();
    }
    showActivityFaceView() {
        let btn_activity = this.activity_face_view.getChildByName("activity_url_image");
        let btn_close = this.activity_face_view.getChildByName("btn_close");
        let img_url;
        let jump_url;
        if (MainUIControllers.activity_urldata) {
            // 弹出
            this.activity_face_view.active = true;
            console.log(MainUIControllers.activity_urldata);
            for (let index = 0; index < MainUIControllers.activity_urldata.length; index++) {
                const element = MainUIControllers.activity_urldata[index];
                img_url = element.img_url;
                jump_url = element.jump_url;
                assetManager.loadRemote<ImageAsset>(img_url, function (err, imageAsset) {
                    const spriteFrame = new SpriteFrame();
                    const texture = new Texture2D();
                    texture.image = imageAsset;
                    spriteFrame.texture = texture;
                    btn_activity.getComponent(Sprite).spriteFrame = spriteFrame;
                });
            }
        } else {
            //不弹出
            this.activity_face_view.active = false;
        }

        // 打开活动拍脸图链接
        console.log("jump_url", jump_url);
        btn_activity.on(NodeEventType.TOUCH_END, (event) => {
            sys.openURL(jump_url);
        });
        btn_close.on(Button.EventType.CLICK, (event) => {
            this.activity_face_view.destroy();
            MainUIControllers.activity_urldata = null;
        });
    }

    initUI() {
        //获取组件
        this.save = this.node.getChildByName("save");
        // 招聘
        this.open_invite_box_btn = this.node.getChildByName("open_invite_box_btn");
        this.open_friend_btn = this.node.getChildByName("open_friend_btn");
        this.open_endless_btn = this.node.getChildByName("open_endless_btn");
        this.Invite = this.node.getChildByName("Invite");
        this.main_invite_icon = this.open_invite_box_btn.getChildByName("main_invite_icon");
        this.pub_icon = this.node.getChildByName("open_pub_btn").getChildByName("pub_icon");
        this.shop_icon = this.node.getChildByName("open_shop_btn").getChildByName("shop_icon");
        this.daily_quest_icon = this.node.getChildByName("open_daily_quest_btn").getChildByName("daily_quest_icon");
        this.illustration_icon = this.node.getChildByName("open_illustration_btn").getChildByName("illustration_icon");

        this.shop_text_reddot = this.node.getChildByName("open_shop_btn").getChildByName("shop");
        this.illustration_text_reddot = this.node.getChildByName("open_illustration_btn").getChildByName("illustration");
        this.daily_quest_text_reddot = this.node.getChildByName("open_daily_quest_btn").getChildByName("daily");
        this.pub_text_reddot = this.node.getChildByName("open_pub_btn").getChildByName("pub");

        // 联系客服
        this.open_kefu_btn = this.node.getChildByName("kefu_btn");
        // 录制游戏
        this.open_recordScreen_btn = this.node.getChildByName("open_recordScreen_btn");
        this.txt_record = this.open_recordScreen_btn.getChildByName("txt_record");
        if (MoYangManagers.is_record) {
            this.txt_record.getComponent(Label).string = "录制中";
        }
        // 分享录屏
        this.open_share_record_btn = this.node.getChildByName("open_share_record_btn");
        //分享有礼
        // this.btn_share = this.activity_icon.getChildByName("btn_share");
        // if (GameData.userData.isShare) {
        //     this.btn_share.getChildByName("reddot").active = false;
        // }
        this.btn_share = this.node.getChildByName("open_share_btn");
        // 七日签到
        this.open_seven_sign_btn = this.node.getChildByName("open_seven_sign_btn");
        // 首充礼包
        this.open_initial_charge_btn = this.node.getChildByName("open_initial_charge_btn");
        this.initial_charge_box = this.node.getChildByName("initial_charge_box");
        this.open_initial_charge_btn.active = !GameData.userData.isInitialCharge;
        // 挂机收益
        this.open_hangup_btn = this.node.getChildByName("open_hangup_btn");
        // 入口奖励
        this.open_enter_btn = this.node.getChildByName("open_enter_btn");
        EnterManagers.onShowEnterBtn();
        this.acticity_enter_view = this.node.getChildByName("acticity_enter_view");
        this.acticity_enter_view.active = false;
        // 季度奖金
        this.open_bonus_btn = this.node.getChildByName("open_bonus_btn");
        //决策
        this.open_decision_btn = this.node.getChildByName("open_decision_btn");
        this.decision_main_view = this.node.getChildByName("decision_main_view");
        this.decision_main_view.active = false;
        // 员工
        this.open_illustration_btn = this.node.getChildByName("open_illustration_btn");
        // 酒馆
        this.open_pub_btn = this.node.getChildByName("open_pub_btn");
        // 装备
        this.open_equip_btn = this.node.getChildByName("open_equip_btn");
        // 商城
        this.open_shop_btn = this.node.getChildByName("open_shop_btn");
        // 设置
        this.open_set_btn = this.node.getChildByName("open_set_btn");

        // 直升十级
        this.open_up_btn = this.node.getChildByName("open_up_btn");
        // 建筑
        this.open_build_btn = this.node.getChildByName("open_build_btn");
        this.Furniture = this.node.getChildByName("Furniture");
        this.furniture_box = this.Furniture.getChildByName("furniture_box");
        // this.furniture_box.active = false
        // 每日任务
        this.open_daily_quest_btn = this.node.getChildByName("open_daily_quest_btn");
        this.daily_quest_box = this.node.getChildByName("daily_quest_box");

        // // 活动icon列表
        // this.activity_icon = this.node.getChildByName("activity_icon");
        // // 兑换码
        // this.btn_duihuan = this.activity_icon.getChildByName("btn_duihuan");

        //关注有礼
        // this.btn_attention = this.activity_icon.getChildByName("btn_attention");
        //活动列表大图
        this.activity_face_view = this.node.getChildByName("activity_face_view");
        this.activity_face_view.active = false;
        // this.btn_share.active = false;
        // this.btn_attention.active = false;
        // this.btn_duihuan.active = false;
        // if (sys.isNative) {
        //     this.btn_share.active = true;
        //     this.btn_duihuan.active = true;
        // }

        //初始化决策
        // GameData.setDefaultDecision();
    }

    updateRedDot() {
        //主界面 七日签到红点
        this.node.getChildByName("open_seven_sign_btn").getChildByName("reddot").active = !GameData.userData.sevenSignIsReceive;

        //主界面 招募按钮红点
        this.open_invite_box_btn.getChildByName("common_red_dot").active = GameData.userData.hasGoodsList[5] > 0 || GameData.userData.inviteTodayAdLastNum > 0

        // this.open_equip_btn.getChildByName("common_red_dot").active = GameData.userData.hasGoodsList[8] > 0
        // const equip_upgrade_info = TextUtils.Instance.equip__get_doll_machine_upgrade_info
        // if (GameData.userData.doll_machine_lv < equip_upgrade_info.length && GameData.userData.hasGoodsList[10] >= Number(equip_upgrade_info[GameData.userData.doll_machine_lv - 1].exp)) {
        //     this.open_equip_btn.getChildByName("common_red_dot").active = true
        // }

        // let is_show_shop_red_dot: boolean = false;
        // for (let i = 0; i < GameData.userData.ad_item_times.length; i++) {
        //     if (GameData.userData.ad_item_times[i] > 0) {
        //         is_show_shop_red_dot = true
        //         break
        //     }
        // }
        // this.open_shop_btn.getChildByName("common_red_dot").active = is_show_shop_red_dot;

        //主界面 每日任务红点
        const daily_task_info = TextUtils.Instance.task__get_daily_task;
        let is_show_daily_task_red_dot: boolean = false;
        for (let i = 0; i < GameData.taskData.dailyTaskContentNumStatus.length; i++) {
            if (GameData.taskData.dailyTaskContentNumList[i] >= daily_task_info[i].task_content_num) {
                if (!GameData.userData.has_monthly_plan_2 && GameData.taskData.dailyTaskContentNumStatus[i] < 1) {
                    is_show_daily_task_red_dot = true
                    break
                }
                // else if (GameData.userData.has_monthly_plan_2 && GameData.taskData.dailyTaskContentNumStatus[i] < 2) {
                //     is_show_daily_task_red_dot = true
                //     break
                // }
            }
        }
        this.open_daily_quest_btn.getChildByName("daily").getChildByName("common_red_dot").active = is_show_daily_task_red_dot
        this.daily_quest_box.getChildByName("claim_btn").getChildByName("common_red_dot").active = is_show_daily_task_red_dot

        //主界面 建筑按钮红点
        const build_info = TextUtils.Instance.furniture__get_furniture_info
        let is_show_furniture_red_dot: boolean = false;
        for (let [_, value] of build_info) {
            for (const index in value) {
                const build = value[index]
                if (!GameData.userData.buildLvList[build.build_id][index] && GameData.userData.career >= build.condition_career && GameData.userData.hasGoodsList[1] >= Number(build.upgrade_cost_1) && GameData.userData.hasGoodsList[2] >= Number(build.upgrade_cost_2)) {
                    is_show_furniture_red_dot = true
                }
            }
        }
        this.open_build_btn.getChildByName("common_red_dot").active = is_show_furniture_red_dot

        //主界面 酒馆按钮红点
        const staff_info = TextUtils.Instance.staff__get_info
        const staff_upgrade_info = TextUtils.Instance.staff__get_upgrade_cost
        let is_show_staff_red_dot: boolean = false;
        for (let [_, value] of staff_info) {
            for (const index in value) {
                const staff = value[index]
                if (GameData.userData.towerLv[staff.id] == 0) {
                    if (GameData.userData.towerDebris[staff.piece_goods_id] >= 5) {
                        is_show_staff_red_dot = true
                    }
                } else if (GameData.userData.towerLv[staff.id] < staff_upgrade_info.length && GameData.userData.hasGoodsList[1] >= staff_upgrade_info.find(item => item.lv == GameData.userData.towerLv[staff.id] + 1).cost_1
                    && GameData.userData.towerDebris[staff.piece_goods_id] >= staff_upgrade_info.find(item => item.lv == GameData.userData.towerLv[staff.id] + 1).cost_2
                ) {
                    is_show_staff_red_dot = true
                }
            }
        }

        // this.open_illustration_btn.getChildByName("common_red_dot").active = is_show_staff_red_dot
        this.open_illustration_btn.getChildByName("illustration").getChildByName("common_red_dot").active = false;//因为英雄升级界面改到了酒馆，所以此处的红点去掉
        this.open_pub_btn.getChildByName("pub").getChildByName("common_red_dot").active = is_show_staff_red_dot;//酒馆红点

        //主界面 无尽挑战按钮红点
        const endless__get_reward_info =TextUtils.Instance.endless__get_reward_info;
        let is_show_reward_red_dot: boolean = false;
        for (let i = 0; i < GameData.userData.endlessRewardStatus.length; i++) {
            if (GameData.userData.endlessRewardStatus[i] == 0 && GameData.userData.endlessChallengeMaxScore >= endless__get_reward_info[i].score) {
                is_show_reward_red_dot = true
                break
            }
        }
        this.open_endless_btn.getChildByName("common_red_dot").active = is_show_reward_red_dot;
    }

    listen() {
        if (sys.os === sys.OS.ANDROID || sys.isNative) {
            native.bridge.onNative = (arg0: string, arg1: string): void => {
                console.log("MainUI", arg0, arg1);
                if (arg0 === "play_ad") {
                    EventManager.Instance.emit(EventConst.PLAY_AD, arg1);
                } else if (arg0 === "purchase_success") {
                    // EventManager.Instance.emit(EventConst.PURCHASE, arg1);
                }
            }
        }
    }

    //注册滑动接收监听
    onTouchBattle() {
        // this._singleTouchCtr = this.node.addComponent(TouchBatlleControllers);
        let layout_bg = find("Canvas/layout_bg");
        this._singleTouchCtr = layout_bg.getComponent(TouchBatlleControllers);
        // console.log(this._singleTouchCtr)
        this._singleTouchCtr.node.on(TouchBatlleControllers.SingleTouchDownEvent, this.onTouchDown);
        this._singleTouchCtr.node.on(TouchBatlleControllers.SingleTouchMoveEvent, this.onTouchMove);
        this._singleTouchCtr.node.on(TouchBatlleControllers.SingleTouchUpEvent, this.onTouchUp);
    }
    onTouchDown(pos: Vec2) {
        MainUIControllers.instance.start_pos = pos;
        // console.log("按下"+MainUIControllers.instance.start_pos);
    }
    onTouchMove(pos: Vec2) {
        MainUIControllers.instance.move_pos = pos;
        //console.log("移动"+MainUIControllers.instance.move_pos);
    }
    onTouchUp(pos: Vec2) {
        MainUIControllers.instance.end_pos = pos;
        // console.log("抬起"+MainUIControllers.instance.end_pos);
        let view_size = view.getCanvasSize();
        if (MainUIControllers.instance.end_pos.x < MainUIControllers.instance.start_pos.x - view_size.width * 0.6) {
            // console.log("进入战斗界面");
            MainUIControllers.instance.goBattle();
        }
    }
    goBattle() {
        director.preloadScene("Battle",
            (completedCount: number, totalCount: number, item: any) => { },
            () => {
                console.log("进入战斗界面");
                if (!this.audioMgr) {
                    this.audioMgr = AudioManager.ins;
                }
                this.audioMgr.stopMusic();
                this.audioMgr.stopAllSound();
                director.loadScene("Battle");
            });
    }

    //更新建筑
    updateBuild() {
        GameData.userData.buildList.forEach((item) => {
            let buildName = item.buildId + "0" + item.build_lv;
            if (item.buildId == 1) {
                this.main_invite_icon.getComponent(Sprite).spriteFrame = LoadUtils.Instance.main_build.find((item) => item.name === buildName);
            }
            else if (item.buildId == 2) {
                this.pub_icon.getComponent(Sprite).spriteFrame = LoadUtils.Instance.main_build.find((item) => item.name === buildName);
            }
            else if (item.buildId == 3) {
                this.shop_icon.getComponent(Sprite).spriteFrame = LoadUtils.Instance.main_build.find((item) => item.name === buildName);
                if (item.build_lv == 1 || item.build_lv == 2) {
                    this.shop_icon.setScale(1.8, 1.8)
                }
                else {
                    this.shop_icon.setScale(1.7, 1.7)
                }
            }
            else if (item.buildId == 4) {
                this.illustration_icon.getComponent(Sprite).spriteFrame = LoadUtils.Instance.main_build.find((item) => item.name === buildName);
            }
            else if (item.buildId == 5) {
                this.daily_quest_icon.getComponent(Sprite).spriteFrame = LoadUtils.Instance.main_build.find((item) => item.name === buildName);
                if (item.build_lv == 1) {
                    this.daily_quest_icon.setScale(1, 1)
                }
                else {
                    this.daily_quest_icon.setScale(0.8, 0.8)
                }
            }
        })
    }
}
