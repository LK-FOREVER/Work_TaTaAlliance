import {_decorator,Component,Node,resources,JsonAsset,error,Label,RichText,ProgressBar,NodeEventType,find,Sprite,Button,Slider,instantiate,Prefab,v3,director, Vec3, Color} from 'cc';
const { ccclass, property } = _decorator;
import { GameData } from '../Common/GameData';
import { MessageManager } from './MessageManager';
import { GameApp } from '../GameApp';
import { ShowGoods } from '../Common/ShowGoods';
import { AddControllers } from '../Common/AddControllers';
import { AudioManager } from './AudioManager';
import { guideManager } from './guideManager';
import { blackboardControllers } from '../Controllers/blackboard/blackboardControllers';
import { TextUtils } from '../Common/TextUtils';
import { MainTopController } from '../Controllers/MainTop/MainTopController';
import { Utils } from '../Common/Utils';
import EventManager from '../Common/EventManager';
import { EventConst } from '../Common/EventConst';
import { MainUIControllers } from '../Controllers/MainUI/MainUIControllers';

@ccclass('PromotionManager')
export class PromotionManager extends Component {
    public static Instance: PromotionManager = null!;
    promotion_change_btn: Node;
    promotion_panel: Node = null
    promotion_box_left: Node = null
    now_career: Node = null
    next_career: Node = null
    promotion_box_right: Node = null
    reward_text0: Node = null
    reward_text1: Node = null
    LevelProgressBar: Node = null
    PerformanceProgressBar: Node = null
    FundProgressBar: Node = null
    promotion_btn: Node = null
    promotion_close: Node = null

    promotionInfoList: any[] = null
    nowPromotionInfo = null     // 当前职位对应的信息
    nextPromotionInfo = null    // 下个职位对应的信息

    isMax: boolean = false
    gold_num:number = 0

    setting_change_btn: Node;
    setting_panel: Node = null;
    music: Node = null;
    sound: Node = null;
    music_slider: Node = null;
    music_slider_com: Slider;
    music_progress: ProgressBar;
    sound_slider: Node = null;
    sound_slider_com: Slider;
    sound_progress: ProgressBar;
    audioMgr: AudioManager;

    @property(Prefab)
    promotion_free: Prefab = null
    @property(Prefab)
    promotion_success: Prefab = null

    start() {
        PromotionManager.Instance = this;
        this.audioMgr = AudioManager.ins;
        // this.promotion_change_btn = this.node.getChildByName("promotion_change_btn")
        // this.setting_change_btn = this.node.getChildByName("setting_change_btn")
        // this.promotion_change_btn.on(Button.EventType.CLICK, this.changeToPromotion, this);
        // this.setting_change_btn.on(Button.EventType.CLICK, this.changeToSetting, this);
        // this.promotion_change_btn.getComponent(Button).interactable = false;
        // this.setting_change_btn.getComponent(Button).interactable = true;
        this.initUI()
        // this.setting_panel.active = false;
        this.promotion_panel.active = true; 
        EventManager.Instance.on(EventConst.CLOSE_SHOP,this.updateUI,this)  
    }
    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.CLOSE_SHOP,this.updateUI,this)  
    }
    initUI() {
        this.promotion_panel = this.node.getChildByName("promotion_panel")
        this.promotion_box_left = this.promotion_panel.getChildByName("promotion_box_left")
        this.now_career = this.promotion_box_left.getChildByName("now_career")
        this.next_career = this.promotion_box_left.getChildByName("next_career")
        this.promotion_box_right = this.promotion_panel.getChildByName("promotion_box_right")
        this.reward_text0 = this.promotion_box_right.getChildByName("reward_text0")
        this.reward_text1 = this.promotion_box_right.getChildByName("reward_text1")
        this.LevelProgressBar = this.promotion_panel.getChildByName("LevelProgressBar")
        this.PerformanceProgressBar = this.promotion_panel.getChildByName("PerformanceProgressBar")
        this.FundProgressBar = this.promotion_panel.getChildByName("FundProgressBar")
        this.promotion_btn = this.promotion_panel.getChildByName("promotion_btn")
        //职位信息
        this.promotionInfoList = TextUtils.Instance.promotion__get_promotion_info;

        this.updateUI();
        // 点击晋升
        this.promotion_btn.on(NodeEventType.TOUCH_END, () => {
            const Canvas = find("Canvas")
            if (this.isMax) {
                //Canvas.getComponent(MessageManager).openMessage("已满级")
            } else if (GameData.userData.max_chapter >= this.nextPromotionInfo.level_progress && GameData.userData.hasGoodsList[1] >= this.nextPromotionInfo.position_fund && GameData.userData.hasGoodsList[2] >= this.nextPromotionInfo.performance) {
                GameData.userData.hasGoodsList[1] -= this.nextPromotionInfo.position_fund
                GameData.taskData.dailyTaskContentNumList[6]+=this.nextPromotionInfo.position_fund;
                GameData.userData.hasGoodsList[2] -= this.nextPromotionInfo.performance
                this.promotionFn()
            } 
            // else if (GameData.userData.max_chapter > this.nextPromotionInfo.level_progress && GameData.userData.hasGoodsList[1] < this.nextPromotionInfo.position_fund && GameData.userData.hasGoodsList[4] >= this.gold_num){
            //     GameData.userData.hasGoodsList[1] = 0
            //     GameData.userData.hasGoodsList[4] -= this.gold_num
            //     this.promotionFn()
            // } else if (GameData.userData.max_chapter > this.nextPromotionInfo.level_progress) {
            //     Utils.create_goto_shop_tips("currency")
            //     //Canvas.getComponent(MessageManager).openMessage("资源不足")
            // }
        })
    }
    // 晋升
    promotionFn() {
        const MainTop = find("Canvas").getChildByName("MainTop");
        GameData.userData.career++
        // 晋升奖励
        if (this.nextPromotionInfo.reward_content_1 > 0 && this.nextPromotionInfo.reward_content_2 < 0) {
            const reward = [{
                reward: this.nextPromotionInfo.reward_content_1,
                number: this.nextPromotionInfo.reward_num_1,
            }];
            ShowGoods.init(reward)
            this.updateUI()
        } else if (this.nextPromotionInfo.reward_content_1 > 0 && this.nextPromotionInfo.reward_content_2 > 0) {
            const reward = [{
                reward: this.nextPromotionInfo.reward_content_1,
                number: this.nextPromotionInfo.reward_num_1,
            },
            {
                reward: this.nextPromotionInfo.reward_content_2,
                number: this.nextPromotionInfo.reward_num_2,
            }];
            ShowGoods.init(reward)
            this.updateUI()
        } else if (this.nextPromotionInfo.reward_content_1 === -1) {
            GameData.userData.unlockNum++;
            for (let index = 0; index < GameData.userData.builds.length; index++) {
                if (index < GameData.userData.unlockNum) {
                    GameData.userData.builds[index].lock = true
                }
            }
        }else if(this.nextPromotionInfo.reward_content_2 === -2 
            || this.nextPromotionInfo.reward_content_2 === -3 
            || this.nextPromotionInfo.reward_content_2 === -4
            || this.nextPromotionInfo.reward_content_2 === -5
            || this.nextPromotionInfo.reward_content_2 === -6
            || this.nextPromotionInfo.reward_content_2 === -7
            || this.nextPromotionInfo.reward_content_2 === -8
            || this.nextPromotionInfo.reward_content_2 === -9
            || this.nextPromotionInfo.reward_content_2 === -10
            || this.nextPromotionInfo.reward_content_2 === -11
            || this.nextPromotionInfo.reward_content_2 === -12
            || this.nextPromotionInfo.reward_content_2 === -13
            || this.nextPromotionInfo.reward_content_2 === -14
            || this.nextPromotionInfo.reward_content_2 === -15
            || this.nextPromotionInfo.reward_content_2 === -16){
            find("Canvas").getComponent(MainUIControllers).updateRedDot()
        }
        // 拿到主页面顶部 刷新数据
        MainTop.getComponent(GameApp).updateplayerinfo()
        
        // if (this.nextPromotionInfo.id > 1) {
        //     const Canvas = find("Canvas")
        //     const promotion_success = instantiate(this.promotion_success)
        //     promotion_success.setParent(Canvas.getChildByName("promotionBox"))
        //     promotion_success.setPosition(0, 0)
        // }
        this.updateUI()
        // if (director.getScene().name === "Main UI") {
        //     blackboardControllers.Instance.updateUI()
        // }

        GameData.saveData(false);
    }

    updateUI() {
        this.nowPromotionInfo = this.promotionInfoList.find(item=>item.id == GameData.userData.career)
        this.nextPromotionInfo = this.promotionInfoList.find(item=>item.id == GameData.userData.career + 1)

        this.promotion_btn.getChildByName("common_red_dot").active = false;
        // this.promotion_change_btn.getChildByName("common_red_dot").active = false;

        find("Canvas").getChildByName("MainTop").getChildByName("main_top").getComponent(MainTopController).updateRedDot();
                // 判断是否满级
        if (GameData.userData.career === this.promotionInfoList.length) {
            this.LevelProgressBar.getComponent(ProgressBar).progress = 1
            this.PerformanceProgressBar.getComponent(ProgressBar).progress = 1
            this.FundProgressBar.getComponent(ProgressBar).progress = 1
            // 关卡
            this.LevelProgressBar.getChildByName("progress_bar_value").getComponent(RichText).string =
            `<outline color=#000000 width=2>已满级</outline>`
            // 功勋
            this.PerformanceProgressBar.getChildByName("progress_bar_value").getComponent(RichText).string = 
            `<outline color=#000000 width=2>已满级</outline>`
            // 资金
            this.FundProgressBar.getChildByName("progress_bar_value").getComponent(RichText).string = 
            `<outline color=#000000 width=2>已满级</outline>`
            this.now_career.getChildByName("Label").getComponent(Label).string = this.nowPromotionInfo.position_lv_name
            this.now_career.getChildByName("Label").setPosition(new Vec3(0, 0, 0))
            this.next_career.active = false
            this.reward_text0.getChildByName("Label").getComponent(Label).string = "已领取全部奖励"
            this.reward_text1.getChildByName("Label").getComponent(Label).string = "已领取全部奖励"
            //设置成白色
            this.reward_text0.getChildByName("Label").getComponent(Label).color = new Color(255, 255, 255, 255)
            this.reward_text1.getChildByName("Label").getComponent(Label).color = new Color(255, 255, 255, 255)
            this.promotion_btn.getComponent(Sprite).grayscale = true
            this.promotion_btn.getComponent(Button).interactable = false
            this.promotion_btn.getChildByName("Label").getComponent(Label).string = "已满级"
            this.isMax = true
            return
        }

        if (GameData.userData.max_chapter >= this.nextPromotionInfo.level_progress && GameData.userData.hasGoodsList[1] >= this.nextPromotionInfo.position_fund && GameData.userData.hasGoodsList[2] >= this.nextPromotionInfo.performance) {
            this.promotion_btn.getChildByName("common_red_dot").active = true;
            this.promotion_btn.getComponent(Sprite).grayscale = false
            this.promotion_btn.getComponent(Button).interactable = true
            // this.promotion_change_btn.getChildByName("common_red_dot").active = true;
        }else{
            this.promotion_btn.getChildByName("common_red_dot").active = false;
            this.promotion_btn.getComponent(Sprite).grayscale = true
            this.promotion_btn.getComponent(Button).interactable = false
        }

        //如果关卡和业绩满足，资金不足时按钮加上广告图标(改为金条)
        // if (GameData.userData.max_chapter > this.nextPromotionInfo.level_progress && GameData.userData.hasGoodsList[1] < this.nextPromotionInfo.position_fund) {
        //     this.promotion_btn.getChildByName("AD_ICON").active = true
        //     this.promotion_btn.getChildByName("Label").getComponent(Label).fontSize = 50
        //     this.promotion_btn.getChildByName("Label").setPosition(v3(40, 0, 0))
        //     this.calculate_gold_num()
        //     this.promotion_btn.getChildByName("Label").getComponent(Label).string = this.gold_num.toString()
        // } else {
            this.promotion_btn.getChildByName("AD_ICON").active = false
            this.promotion_btn.getChildByName("Label").getComponent(Label).fontSize = 50
            this.promotion_btn.getChildByName("Label").setPosition(v3(0, 0, 0))
            this.promotion_btn.getChildByName("Label").getComponent(Label).string = '晋升'
        // }
        
        this.next_career.active = true
        this.now_career.getChildByName("Label").getComponent(Label).string = this.nowPromotionInfo.position_lv_name
        this.next_career.getChildByName("Label").getComponent(Label).string = this.nextPromotionInfo.position_lv_name
        let rewardList = this.nextPromotionInfo.reward.split(",")
        this.reward_text0.getChildByName("Label").getComponent(Label).string = rewardList[0]
        this.reward_text1.getChildByName("Label").getComponent(Label).string = rewardList[1]
        // 关卡
        this.LevelProgressBar.getComponent(ProgressBar).progress = (GameData.userData.max_chapter) / this.nextPromotionInfo.level_progress
        this.LevelProgressBar.getChildByName("progress_bar_value").getComponent(RichText).string =
            `<outline color=#000000 width=2><color=${(GameData.userData.max_chapter) >= this.nextPromotionInfo.level_progress ? "#ffffff" : "#ff5b4c"}>${GameData.userData.max_chapter}</color><color=#ffffff>/${this.nextPromotionInfo.level_progress}</color></outline>`
        // 功勋
        this.PerformanceProgressBar.getComponent(ProgressBar).progress = GameData.userData.hasGoodsList[2] / this.nextPromotionInfo.performance
        this.PerformanceProgressBar.getChildByName("progress_bar_value").getComponent(RichText).string =
            `<outline color=#000000 width=2><color=${(GameData.userData.hasGoodsList[2]) >= this.nextPromotionInfo.performance ? "#ffffff" : "#ff5b4c"}>${GameData.userData.hasGoodsList[2]}</color><color=#ffffff>/${this.nextPromotionInfo.performance}</color></outline>`    
        // 金币
        this.FundProgressBar.getComponent(ProgressBar).progress = GameData.userData.hasGoodsList[1] / this.nextPromotionInfo.position_fund
        this.FundProgressBar.getChildByName("progress_bar_value").getComponent(RichText).string =
            `<outline color=#000000 width=2><color=${GameData.userData.hasGoodsList[1] >= this.nextPromotionInfo.position_fund ? "#ffffff" : "#ff5b4c"}>${GameData.userData.hasGoodsList[1]}</color><color=#ffffff>/${this.nextPromotionInfo.position_fund}</color></outline>`
    }

    // calculate_gold_num() {
    //     this.gold_num = Math.ceil(Math.ceil((this.nextPromotionInfo.position_fund - GameData.userData.hasGoodsList[1]) / this.nextPromotionInfo.position_fund * 100) / 100 * 2 * this.nextPromotionInfo.ratio)
    // }

    //切换到晋升页面
    // changeToPromotion() {
    //     if (!this.promotion_panel.active) {
    //         // this.setting_panel.active = false;
    //         this.promotion_panel.active = true;
    //         this.promotion_change_btn.getComponent(Button).interactable = false;
    //         // this.setting_change_btn.getComponent(Button).interactable = true;
    //     }
    // }
    //切换到设置页面
    // changeToSetting() {
    //     if (!this.setting_panel.active) {
    //         this.promotion_panel.active = false;
    //         this.setting_panel.active = true;
    //         this.promotion_change_btn.getComponent(Button).interactable = true;
    //         this.setting_change_btn.getComponent(Button).interactable = false;
    //     }
    // }

    // settingAudioinit() {
    //     this.setting_panel = this.node.getChildByName("setting_panel")
    //     this.music = this.setting_panel.getChildByName('music');
    //     this.sound = this.setting_panel.getChildByName('sound');

    //     this.music_slider = this.music.getChildByName('Slider');
    //     this.music_slider_com = this.music_slider.getComponent(Slider);
    //     this.music_progress = this.music_slider.getComponent(ProgressBar);

    //     this.sound_slider = this.sound.getChildByName('Slider');
    //     this.sound_slider_com = this.sound_slider.getComponent(Slider);
    //     this.sound_progress = this.sound_slider.getComponent(ProgressBar);

    //     this.music_progress.progress = GameData.userData.audioMusic;
    //     this.sound_progress.progress = GameData.userData.audioSound;
    //     this.music_slider_com.progress = GameData.userData.audioMusic;
    //     this.sound_slider_com.progress = GameData.userData.audioSound;

    //     this.music_slider_com!.node.on('slide', this.musicCall, this);
    //     this.sound_slider_com!.node.on('slide', this.soundCall, this);

    // }
    // musicCall(slider: Slider) {
    //     let pro = slider.progress;
    //     this.music_slider.getComponent(ProgressBar).progress = pro;
    //     this.audioMgr.setMusicVolume(pro);
    //     this.saveAudiodata()
    // }
    // soundCall(slider: Slider) {
    //     let pro = slider.progress;
    //     this.sound_slider.getComponent(ProgressBar).progress = pro;
    //     this.audioMgr.setSoundVolume(pro);
    //     this.saveAudiodata();
    // }
    // //保存音量
    // saveAudiodata() {
    //     GameData.userData.audioMusic = this.music_slider_com.progress;
    //     GameData.userData.audioSound = this.sound_slider_com.progress;
    // }
}
