import { _decorator, Component, Node, Button, Event, Prefab, resources, SpriteFrame, Sprite, Label, RichText, find, JsonAsset, instantiate, Layout, sys, native } from "cc";
import { GameData } from "../../Common/GameData";
import { AudioManager } from "../../Managers/AudioManager";
import { inviteProbabilityDetailsController } from "./inviteProbabilityDetailsController";
import { Utils } from "../../Common/Utils";
import { TextUtils } from "../../Common/TextUtils";
import EventManager from "../../Common/EventManager";
import { EventConst } from "../../Common/EventConst";
import { GameApp } from '../../GameApp';
import { MainUIControllers } from "../MainUI/MainUIControllers";
import { ToastControllers } from "../../Common/ToastControllers";
const { ccclass, property } = _decorator;

@ccclass("InviteController")
export class InviteController extends Component {
    invite_filter_btn_bg: Node = null;
    invite_bg: Node = null;
    invite_title: Node = null;
    last_text: Node = null;
    invite_close: Node = null;
    invite_top_left_text: Node = null;
    invite_btn_box: Node = null;
    invite_btn_ad: Node = null;
    invite_btn_1: Node = null;
    invite_btn_5: Node = null;
    common_red_dot_1: Node = null;
    common_red_dot_5: Node = null;
    goods_has_num_1: Node = null;
    goods_has_num_2: Node = null;
    invite_details_btn: Node = null;
    invite_details_content: Node = null;
    details_close_btn: Node = null;
    invite_filter_1: SpriteFrame = null;
    invite_filter_2: SpriteFrame = null;
    invite_bg_normal: SpriteFrame = null;
    invite_bg_special: SpriteFrame = null;
    goods_5: SpriteFrame = null;
    goods_6: SpriteFrame = null;
    recruit_ratio_info_1: any = null;
    recruit_ratio_info_2: any = null;
    recruit_ratio_show: any = null;
    recruit_type_info: any = null;
    recruit_type_show_info: any = null;
    get_tower_info: any = null;
    selected_recruit_type_info: any = null;
    audio_manager: any = null;
    selected_type: number = 0;
    invite_num: number = 0;
    isGuaranteedReward: boolean = false;
    today_free: Node = null;
    btn_txt: Node = null;
    invite_limite: Node = null;
    @property(Prefab)
    invite_reward_box: Prefab = null;
    @property(Prefab)
    invite_probability_details: Prefab = null;
    @property(Prefab)
    invite_tip_view: Prefab = null;
    public static Instance: InviteController = null!;
    rewardItemList: any[] = [];

    protected onLoad(): void {
        InviteController.Instance = this;
        EventManager.Instance.on(EventConst.PLAY_AD, this.play_ad, this)
        EventManager.Instance.on(EventConst.CLOSE_SHOP, this.updateUI, this)
    }
    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PLAY_AD, this.play_ad, this)
        EventManager.Instance.off(EventConst.CLOSE_SHOP, this.updateUI, this)
    }
    start() {
        this.audio_manager = AudioManager.ins;
        // //招募结果音频
        // this.audio_manager.playSound("tower_invite", false);
        //获取组件
        this.invite_filter_btn_bg = this.node.getChildByName("invite_filter_btn_bg");
        this.invite_bg = this.node.getChildByName("invite_bg");
        this.invite_title = this.node.getChildByName("invite_title");
        this.last_text = this.node.getChildByName("invite_last_text").getChildByName("last_text");
        this.invite_close = this.node.getChildByName("bottom_bg").getChildByName("invite_close");
        this.invite_top_left_text = this.node.getChildByName("invite_top_left_text");
        this.invite_btn_box = this.node.getChildByName("invite_btn_box");
        this.invite_btn_ad = this.invite_btn_box.getChildByName("invite_btn_ad");
        this.invite_btn_1 = this.invite_btn_box.getChildByName("invite_btn_1");
        this.invite_btn_5 = this.invite_btn_box.getChildByName("invite_btn_5");
        this.common_red_dot_1 = this.invite_btn_1.getChildByName("common_red_dot_1");
        this.common_red_dot_1.active = false;
        this.common_red_dot_5 = this.invite_btn_5.getChildByName("common_red_dot_5");
        this.common_red_dot_5.active = false;
        this.goods_has_num_1 = this.node.getChildByName("goods_has_num_1");
        this.goods_has_num_2 = this.node.getChildByName("goods_has_num_2");
        this.invite_details_btn = this.node.getChildByName("invite_details_btn");
        this.invite_details_content = this.node.getChildByName("invite_details_content");
        this.details_close_btn = this.invite_details_content.getChildByName("details_close_btn");
        this.today_free = this.invite_btn_1.getChildByName("today_free");
        this.btn_txt = this.invite_btn_1.getChildByName("btn_txt");
        this.invite_limite = this.node.getChildByName("invite_limite_bg").getChildByName("invite_limite");
        // 使用 Promise.all 确保资源都加载完毕后在进行后续操作
        Promise.all([
            this.loadResource("textures/invite/invite_filter_1/spriteFrame", SpriteFrame),
            this.loadResource("textures/invite/invite_filter_2/spriteFrame", SpriteFrame),
            this.loadResource("textures/invite/invite_bg_normal/spriteFrame", SpriteFrame),
            this.loadResource("textures/invite/invite_bg_special/spriteFrame", SpriteFrame),
            this.loadResource("images/goods/5/spriteFrame", SpriteFrame),
            this.loadResource("images/goods/6/spriteFrame", SpriteFrame),
            this.loadJsonAsset("data/recruit__get_recruit_ratio_info_1", JsonAsset),
            this.loadJsonAsset("data/recruit__get_recruit_ratio_info_2", JsonAsset),
            this.loadJsonAsset("data/recruit__get_recruit_ratio_show", JsonAsset),
            this.loadJsonAsset("data/recruit__get_recruit_type_info", JsonAsset),
            this.loadJsonAsset("data/recruit__get_recruit_ratio_show_info", JsonAsset),
            this.loadJsonAsset("data/tower__get_tower_info", JsonAsset),
        ]).then(([
            invite_filter_1,
            invite_filter_2,
            invite_bg_normal,
            invite_bg_special,
            goods_5,
            goods_6,
            recruit_ratio_info_1,
            recruit_ratio_info_2,
            recruit_ratio_show,
            recruit_type_info,
            recruit_type_show_info,
            get_tower_info,
        ]: [SpriteFrame, SpriteFrame, SpriteFrame, SpriteFrame, SpriteFrame, SpriteFrame, JsonAsset, JsonAsset, JsonAsset, JsonAsset, JsonAsset, JsonAsset]
        ) => {
            this.invite_filter_1 = invite_filter_1;
            this.invite_filter_2 = invite_filter_2;
            this.invite_bg_normal = invite_bg_normal;
            this.invite_bg_special = invite_bg_special;
            this.goods_5 = goods_5;
            this.goods_6 = goods_6;
            this.recruit_ratio_info_1 = recruit_ratio_info_1.json!;
            this.recruit_ratio_info_2 = recruit_ratio_info_2.json!;
            this.recruit_ratio_show = recruit_ratio_show.json!;
            this.recruit_type_info = recruit_type_info.json!;
            this.recruit_type_show_info = recruit_type_show_info.json!;
            this.get_tower_info = get_tower_info.json!;

            // 在这里添加后续操作
            this.initUI();
        }).catch((error) => {
            console.error('error', error);
        });

    }
    initUI() {
        this.invite_filter_btn_bg.children.forEach((invite_filter_btn) => {
            this.selected_type === invite_filter_btn.getSiblingIndex() ?
                invite_filter_btn.getComponent(Sprite).spriteFrame = this.invite_filter_2 :
                invite_filter_btn.getComponent(Sprite).spriteFrame = this.invite_filter_1;
            invite_filter_btn.on(Button.EventType.CLICK, this.invite_filter_handler, this)
        })
        this.invite_btn_ad.on(Button.EventType.CLICK, this.invite_btn_handler, this)
        this.invite_btn_1.on(Button.EventType.CLICK, this.invite_btn_handler, this)
        this.invite_btn_5.on(Button.EventType.CLICK, this.invite_btn_handler, this)
        this.invite_top_left_text.on(Button.EventType.CLICK, this.invite_btn_handler, this)
        this.invite_close.on(Button.EventType.CLICK, this.close_handler, this)
        this.invite_details_btn.on(Button.EventType.CLICK, this.show_details, this)
        this.details_close_btn.on(Button.EventType.CLICK, this.close_details, this)
        this.updateUI();
    }
    // 加载资源并返回 Promise 的函数
    loadResource(path: string, type: any) {
        return new Promise((resolve, reject) => {
            resources.load(path, type, (err, spriteFrame) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(spriteFrame);
                }
            });
        });
    };
    // 加载json并返回 Promise 的函数
    loadJsonAsset(path: string, type: any) {
        return new Promise((resolve, reject) => {
            resources.load(path, type, (err, res: JsonAsset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    };
    play_ad(id: string) {
        if (id !== `invite`) return
        this.inviteStaff(true);
    }
    invite_btn_handler(event: Event) {
        const target: Node = event.target;
        const Canvas = find("Canvas");
        if (target.name === "invite_btn_ad") {
            if (this.selected_type === 0) {
                // 普通招聘
                // 判断当日剩余看广告招募员工次数
                if (GameData.userData.inviteTodayAdLastNum > 0) {
                    if (sys.os === sys.OS.ANDROID || sys.isNative) {
                        if (!GameData.userData.has_monthly_plan_2) {
                            //native.bridge.sendToNative('play_ad',`invite`);
                            this.inviteStaff(true);
                        } else {
                            this.inviteStaff(true);
                        }
                    } else {
                        this.inviteStaff(true);
                    }
                }
            } else {
                // 精英招聘
                // 判断当日剩余看广告招募员工次数
                // if (GameData.userData.inviteTodayAdLastNum1 > 0) {
                //     if (sys.os === sys.OS.ANDROID || sys.isNative) {
                //         if (!GameData.userData.has_monthly_plan_2) {
                //             //native.bridge.sendToNative('play_ad',`invite`);
                //             this.inviteStaff(true);
                //         } else {
                //             this.inviteStaff(true);
                //         }
                //     } else {
                //         this.inviteStaff(true);
                //     }
                // }
            }
        } else if (target.name === "invite_btn_1") {
            if (this.selected_type === 0) {
                // 普通招聘
                // 先判断当日免费招募员工次数
                if (GameData.userData.inviteTodayAdLastNum > 0) {
                    this.inviteStaff(true, 1);
                }
                // 判断招募券的数量
                else if (GameData.userData.hasGoodsList[5] > 0) {
                    this.inviteStaff(false, 1);
                } else {
                    Utils.create_goto_shop_tips("招募令")
                }
            } else {
                // 精英招聘
                // 判断人才简历的数量
                if (GameData.userData.hasGoodsList[6] > 0) {
                    this.inviteStaff(false, 1);
                } else {
                    Utils.create_goto_shop_tips("招募令")
                }
            }

        } else if (target.name === "invite_btn_5") {
            if (this.selected_type === 0) {
                // 普通招聘
                // 判断招募券的数量
                if (GameData.userData.hasGoodsList[5] >= 5) {
                    this.inviteStaff(false, 5);
                } else {
                    Utils.create_goto_shop_tips("招募令")
                }
            } else {
                // 精英招聘
                // 判断人才简历的数量
                if (GameData.userData.hasGoodsList[6] >= 5) {
                    this.inviteStaff(false, 5);
                } else {
                    Utils.create_goto_shop_tips("招募令")
                }
            }

        } else if (target.name === "invite_top_left_text") {
            const recruit_type_info = this.recruit_type_show_info.filter(item => item.type_id === this.selected_type + 1)
            const recruit_ratio_show = this.recruit_ratio_show.filter(item => item.type_id === this.selected_type + 1)
            const invite_probability_details = instantiate(this.invite_probability_details)
            invite_probability_details.getComponent(inviteProbabilityDetailsController).initUI(recruit_type_info, recruit_ratio_show)
            invite_probability_details.setParent(this.node);
        }
        this.updateUI();
        GameData.saveData(false);
    }
    // 招聘员工
    inviteStaff(isAD: boolean = false, invite_num: number = 1) {
        this.invite_num = invite_num;
        if (GameData.userData.inviteLimiteDailyNum + this.invite_num > GameData.userData.inviteLimiteDailyTotalNum) {
            ToastControllers.Instance.showToast("今日剩余招募次数不足！");
            return;
        }
        GameData.userData.inviteLimiteDailyNum += this.invite_num;
        let id = GameData.taskData.continuousTaskId % TextUtils.Instance.task__get_continuous_task.length
        if (id == 1) {
            GameData.taskData.continueTaskContentNumList[id]++;
            EventManager.Instance.emit(EventConst.UPDATE_CONTINUOUS_TASK)
        }
        GameData.taskData.dailyTaskContentNumList[0]++;

        // if(isAD) {
        //     if(id == 2) {
        //         GameData.taskData.continueTaskContentNumList[id]++;
        //         EventManager.Instance.emit(EventConst.UPDATE_CONTINUOUS_TASK)
        //     }
        //     // GameData.taskData.dailyTaskContentNumList[1]++;
        // }

        const randomItemList: object[] = [];
        // 招聘次数
        let inviteStaffNum = invite_num * GameData.userData.inviteNum
        for (let index = 0; index < inviteStaffNum; index++) {
            // 减掉招聘次数
            if (this.selected_type === 0) {
                if (isAD) {
                    GameData.userData.inviteTodayAdLastNum -= 1;
                } else {
                    GameData.userData.hasGoodsList[5] -= 1;
                }
                GameData.userData.inviteNumTotalOrange -= 1;
                this.isGuaranteedReward = GameData.userData.inviteNumTotalOrange <= 0
                if (this.isGuaranteedReward) {
                    GameData.userData.inviteNumTotalOrange = GameData.userData.inviteNumDefaultTotal;
                }
            } else {
                // if (isAD) {
                //     GameData.userData.inviteTodayAdLastNum1 -= 1;
                // } else {
                //     // 人才简历消耗
                //     GameData.userData.hasGoodsList[6] -= 1;
                // }
                // GameData.userData.inviteNumTotalRed -= 1;
                // this.isGuaranteedReward = GameData.userData.inviteNumTotalRed <= 0
                // if (this.isGuaranteedReward) {
                //     GameData.userData.inviteNumTotalRed = GameData.userData.inviteNumDefaultTotal;
                // }
            }
            // 表中招聘数据
            this.selected_recruit_type_info = this.recruit_type_info.find(type_info => type_info.id === this.selected_type + 1)
            const randomItem: object = this.isGuaranteedReward ? this.getMinimumGuaranteedReward() : this.getRandomReward();
            randomItemList.push(randomItem);
        }
        GameData.userData.randomItemList = randomItemList;

        //五连抽，必得完整英雄
        if (this.invite_num === 5) {
            let haveCompleteStuff = false;
            this.rewardItemList = GameData.userData.randomItemList
            this.rewardItemList.forEach((reward_item) => {
                if (reward_item.group_id === 2 || reward_item.group_id === 3) {
                    haveCompleteStuff = true;
                }
            })
            if (!haveCompleteStuff) {
                // 生成一个随机索引
                const randomIndex = Math.floor(Math.random() * randomItemList.length);

                // 使用 splice 方法移除随机索引处的元素
                randomItemList.splice(randomIndex, 1);

                // 随机获取一个完整英雄
                const randomItem: object = this.getCompleteStuffReward();
                randomItemList.push(randomItem);
                GameData.userData.randomItemList = randomItemList;
            }
        }
        // 打开招聘结果
        const Invite = find("Canvas/Invite");
        const invite_reward_box = instantiate(this.invite_reward_box);
        invite_reward_box.setParent(Invite);
        invite_reward_box.setPosition(0, 0);
        //音频
        if (this.audio_manager) {
            this.audio_manager.playSound("tower_invite", false);
        }

        // //GameData.Instance.sendDataRequest();
    }
    // 随机奖励
    getRandomReward() {
        // 从第一层概率中找到对应抽卡类型的数据列表
        const ratio_info_1_list = this.recruit_ratio_info_1.filter(item => item.type_id === this.selected_recruit_type_info.id)
        // 根据权重获取随机的group_id
        const random_ratio_info_1_group_id = this.getRandomItemByWeight(ratio_info_1_list).group_id
        // 从第二层概率中找到对应抽卡类型的数据列表
        const ratio_info_2_list = this.recruit_ratio_info_2.filter(item => item.type_id === this.selected_recruit_type_info.id)
        // 根据group_id获取第二层概率对应的数据组列表
        const random_group_reward_list = ratio_info_2_list.filter(item => item.group_id === random_ratio_info_1_group_id)
        // 将筛选出的组列表根据权重获取随机奖励
        const random_reward_data = this.getRandomItemByWeight(random_group_reward_list)
        // console.log('random_reward_data', random_reward_data)
        // if(random_reward_data.type_id == 1 && random_reward_data.group_id == 2) GameData.userData.inviteNumTotalOrange = 50;
        // if(random_reward_data.type_id == 2 && random_reward_data.group_id == 3) GameData.userData.inviteNumTotalRed = 10;
        return random_reward_data
    }

    // 50次招募保底奖励
    getMinimumGuaranteedReward() {
        const selectedGroupId = this.getRandomGroupIdByWeight(this.selected_recruit_type_info.reward);//2
        const selected_reward_type_list = this.recruit_ratio_info_2.filter(item => item.type_id === this.selected_recruit_type_info.id)
        const random_group_reward_list = selected_reward_type_list.filter(item => item.group_id === selectedGroupId)
        const random_reward_data = this.getRandomItemByWeight(random_group_reward_list)
        return random_reward_data
    }

    //获取一个完整的英雄
    getCompleteStuffReward() {
        const selectedGroupId = 3
        const selected_reward_type_list = this.recruit_ratio_info_2.filter(item => item.type_id === this.selected_recruit_type_info.id)
        const random_group_reward_list = selected_reward_type_list.filter(item => item.group_id === selectedGroupId)
        const random_reward_data = this.getRandomItemByWeight(random_group_reward_list)
        return random_reward_data
    }
    invite_filter_handler(event: Event) {
        const target: Node = event.target;
        if (target.getSiblingIndex() === this.selected_type) {
            return;
        }
        this.invite_filter_btn_bg.children.forEach((invite_filter_btn) => {
            invite_filter_btn.getComponent(Sprite).spriteFrame = this.invite_filter_1
        })
        this.selected_type = target.getSiblingIndex()
        target.getComponent(Sprite).spriteFrame = this.invite_filter_2
        this.invite_title.getComponent(Label).string = target.getChildByName("text").getComponent(Label).string
        this.updateUI()
    }
    updateUI() {
        this.invite_limite.getComponent(Label).string = `每日最多招募次数：${GameData.userData.inviteLimiteDailyNum}/${GameData.userData.inviteLimiteDailyTotalNum}`;
        this.node.parent.parent.getComponent(MainUIControllers).updateRedDot();
        this.common_red_dot_1.active = (GameData.userData.hasGoodsList[5] > 0 || GameData.userData.inviteTodayAdLastNum > 0) && GameData.userData.inviteLimiteDailyNum < GameData.userData.inviteLimiteDailyTotalNum;
        this.common_red_dot_5.active = GameData.userData.hasGoodsList[5] >= 5 && GameData.userData.inviteLimiteDailyNum <= GameData.userData.inviteLimiteDailyTotalNum - 5;
        // this.invite_btn_1.getComponent(Button).interactable = GameData.userData.inviteLimiteDailyNum < GameData.userData.inviteLimiteDailyTotalNum;
        // this.invite_btn_1.getComponent(Sprite).grayscale = GameData.userData.inviteLimiteDailyNum >= GameData.userData.inviteLimiteDailyTotalNum;
        // this.invite_btn_5.getComponent(Button).interactable = GameData.userData.inviteLimiteDailyNum < GameData.userData.inviteLimiteDailyTotalNum;
        // this.invite_btn_5.getComponent(Sprite).grayscale = GameData.userData.inviteLimiteDailyNum >= GameData.userData.inviteLimiteDailyTotalNum;
        // this.node.getChildByName("invite_filter_btn_bg").getChildByName("invite_filter_1").getChildByName("common_red_dot").active = GameData.userData.inviteTodayAdLastNum > 0;
        // 广告招募按钮
        const ad_last_num = this.invite_btn_ad.getChildByName("btn_bottom").getChildByName("last_num")

        if (this.selected_type === 0) {
            //每日首次招募免费
            this.today_free.active = GameData.userData.inviteTodayAdLastNum > 0;
            this.btn_txt.active = !this.today_free.active;
            // 隐藏广告招募
            this.invite_btn_ad.active = false;
            // this.invite_btn_box.getComponent(Layout).spacingX = 200;
            // this.invite_btn_ad.getChildByName("common_red_dot").active = GameData.userData.inviteTodayAdLastNum > 0;
            // 调整拥有道具数量的位置
            // this.goods_has_num_1.setPosition(-385.313, -822.133);
            // this.goods_has_num_2.setPosition(379.758, -822.133);

            // ad_last_num.getComponent(RichText).string =
            //     `<color=${GameData.userData.inviteTodayAdLastNum > 0 ? '#ffffff' : '#e65348'}>${GameData.userData.inviteTodayAdLastNum}</color>/${GameData.userData.inviteTodayAdNum}`
            this.last_text.getComponent(RichText).string =
                `<outline color=#131c26 width=2>累计<color=#E2D785>${GameData.userData.inviteNumTotalOrange}</color>次招募必出<color=#F3C259>橙色英雄</color></outline>`
            this.invite_bg.getComponent(Sprite).spriteFrame = this.invite_bg_normal
            this.invite_btn_1.getChildByName("assets_bg").getChildByName("icon").getComponent(Sprite).spriteFrame = this.goods_5
            this.invite_btn_5.getChildByName("assets_bg").getChildByName("icon").getComponent(Sprite).spriteFrame = this.goods_5
            this.invite_btn_1.getChildByName("assets_bg").getChildByName("num").getComponent(Label).string = "×1"
            this.invite_btn_5.getChildByName("assets_bg").getChildByName("num").getComponent(Label).string = "×5"
            this.goods_has_num_1.getComponent(Label).string = `拥有:${GameData.userData.hasGoodsList[5]}`
            this.goods_has_num_2.getComponent(Label).string = `拥有:${GameData.userData.hasGoodsList[5]}`

            // 没有招募次数时禁用招募按钮
            this.invite_btn_ad.getComponent(Button).interactable = GameData.userData.inviteTodayAdLastNum > 0;
            this.invite_btn_ad.getComponent(Sprite).grayscale = !(GameData.userData.inviteTodayAdLastNum > 0);
        } else {
            // 隐藏广告招募
            this.invite_btn_ad.active = false;
            this.invite_btn_box.getComponent(Layout).spacingX = 100;
            // 调整拥有道具数量的位置
            this.goods_has_num_1.setPosition(-185, -271.064);
            this.goods_has_num_2.setPosition(190, -271.064);

            // ad_last_num.getComponent(RichText).string =
            //     `<color=${GameData.userData.inviteTodayAdLastNum1 > 0 ? '#ffffff' : '#e65348'}>${GameData.userData.inviteTodayAdLastNum1}</color>/${GameData.userData.inviteTodayAdNum1}`
            this.last_text.getComponent(RichText).string =
                `<outline color=#131c26 width=2>Secured <color=#f85e5e>Red Staff Shard</color>  in <color=#f85e5e><size=60>${GameData.userData.inviteNumTotalRed}</size></color> attempts</outline>`
            this.invite_bg.getComponent(Sprite).spriteFrame = this.invite_bg_special
            this.invite_btn_1.getChildByName("assets_bg").getChildByName("icon").getComponent(Sprite).spriteFrame = this.goods_6
            this.invite_btn_5.getChildByName("assets_bg").getChildByName("icon").getComponent(Sprite).spriteFrame = this.goods_6
            this.invite_btn_1.getChildByName("assets_bg").getChildByName("num").getComponent(Label).string = "×1"
            this.invite_btn_5.getChildByName("assets_bg").getChildByName("num").getComponent(Label).string = "×5"
            this.goods_has_num_1.getComponent(Label).string = `拥有:${GameData.userData.hasGoodsList[5]}`
            this.goods_has_num_2.getComponent(Label).string = `拥有:${GameData.userData.hasGoodsList[5]}`
        }
        // 表中招聘数据
        this.selected_recruit_type_info = this.recruit_type_info.find(type_info => type_info.id === this.selected_type + 1)
    }

    // 通过权重大小随机获取组id
    getRandomGroupIdByWeight(weightedGroups: Array<{ k: string | number; v: number }>): string | number | undefined {
        let totalWeight = 0;
        let groupKeys: (string | number)[] = [];

        // 计算总权重并收集组ID
        for (let group of weightedGroups) {
            totalWeight += group.v;
            groupKeys.push(group.k);
        }

        if (totalWeight === 0) {
            console.warn('Total weight is zero, cannot select a group.');
            return undefined;
        }

        let randomNum = Math.random() * totalWeight;
        let currentWeight = 0;

        // 根据权重选择组ID
        for (let i = 0; i < weightedGroups.length; i++) {
            currentWeight += weightedGroups[i].v;
            if (randomNum <= currentWeight) {
                return groupKeys[i];
            }
        }

        console.error('Unexpected error in weight selection logic.');
        return undefined;
    }
    // 通过权重大小随机获取组id
    getRandomItemByWeight(items: Array<{ ratio: number }>): any {
        let totalWeight = items.reduce((sum, item) => sum + item.ratio, 0);
        let randomNum = Math.random() * totalWeight;
        for (let item of items) {
            randomNum -= item.ratio;
            if (randomNum <= 0) {
                return item;
            }
        }
        // 如果因为浮点数运算误差导致未找到匹配项，返回最后一个（理论上不会发生）
        return items[items.length - 1];
    }
    close_handler() {
        this.node.destroy();
        GameData.saveData(false);
    }

    show_details() {
        this.invite_details_content.active = true;
    }
    close_details() {
        this.invite_details_content.active = false;
    }
}
