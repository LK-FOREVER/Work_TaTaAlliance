import { _decorator, Component, Node, Prefab, Button, Toggle, Label, Color, instantiate, Sprite, resources, SpriteFrame, find } from 'cc';
import { TextUtils } from '../../Common/TextUtils';
import { EndlessRankItemController } from './EndlessRankItemController';
import { GameData } from '../../Common/GameData';
import { EndlessRewardItemController } from './EndlessRewardItemController';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { EndlessChooseItemController } from './EndlessChooseItemController';

const { ccclass, property } = _decorator;

@ccclass('EndlessController')
export class EndlessController extends Component {
    @property(Prefab)
    endless_choose_item: Prefab = null;
    @property(Prefab)
    endless_rank_item: Prefab = null;
    @property(Prefab)
    endless_reward_item: Prefab = null;

    endless_close_btn: Node = null;
    page_container: Node = null;
    ranking_list_page: Node = null;
    endless_challenge_page: Node = null;
    reward_page: Node = null;
    rank_content: Node = null;
    reward_content: Node = null;
    rank_player_item: Node = null;
    endless_title: Node = null;
    player_icon: Node = null;
    player_name: Node = null;
    player_career: Node = null;
    player_score: Node = null;
    player_rank_num: Node = null;
    like_btn: Node = null;
    not_on_list: Node = null;
    reward_player_score: Node = null;
    endless_reward_red_dot: Node = null;
    score: Node = null;
    score_num: Node = null;
    survive: Node = null;
    survive_num: Node = null;
    challenge_btn: Node = null;
    choose_btn: Node = null;
    choose_num: Node = null;
    choose_page: Node = null;
    choose_content: Node = null;

    // 是否在回调中，避免循环调用
    is_call_back: boolean = true;

    endless__get_rank_info: Array<any> = null!;
    endless__get_reward_info: Array<any> = null!;
    promotionInfoList: any[] = null;

    protected onLoad(): void {
        EventManager.Instance.on(EventConst.PLAYER_ICON_CHANGE, this.changeHeadIcon, this);
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PLAYER_ICON_CHANGE, this.changeHeadIcon, this);
    }

    init() {
        this.endless_close_btn = this.node.getChildByName("endless_close_btn");
        this.endless_close_btn.on(Button.EventType.CLICK, this.close_handler, this);

        this.endless_title = this.node.getChildByName("endless_title");
        this.page_container = this.node.getChildByName("page_container");
        this.ranking_list_page = this.page_container.getChildByName("ranking_list_page");
        this.rank_player_item = this.ranking_list_page.getChildByName("rank_player_item");
        this.endless_challenge_page = this.page_container.getChildByName("endless_challenge_page");
        this.reward_page = this.page_container.getChildByName("reward_page");
        this.rank_content = this.ranking_list_page.getChildByName("rank_list").getChildByName("rank_view").getChildByName("rank_content");
        this.reward_content = this.reward_page.getChildByName("reward_list").getChildByName("reward_view").getChildByName("reward_content");
        this.player_icon = this.rank_player_item.getChildByName("head_frame").getChildByName("player_icon");
        this.player_name = this.rank_player_item.getChildByName("player_name");
        this.player_career = this.rank_player_item.getChildByName("player_career");
        this.player_score = this.rank_player_item.getChildByName("player_score");
        this.player_rank_num = this.rank_player_item.getChildByName("ranking").getChildByName("player_rank_num");
        this.like_btn = this.rank_player_item.getChildByName("like_btn");
        this.not_on_list = this.rank_player_item.getChildByName("not_on_list");
        this.reward_player_score = this.reward_page.getChildByName("top").getChildByName("score").getChildByName("num");
        this.endless_reward_red_dot = this.node.getChildByName("toggle_container").getChildByName("reward_toggle").getChildByName("endless_reward_red_dot");
        this.score = this.endless_challenge_page.getChildByName("content").getChildByName("score");
        this.score_num = this.score.getChildByName("score_num");
        this.survive = this.endless_challenge_page.getChildByName("content").getChildByName("survive");
        this.survive_num = this.survive.getChildByName("survive_num");
        this.challenge_btn = this.endless_challenge_page.getChildByName("challenge_btn");
        this.challenge_btn.on(Button.EventType.CLICK, this.onChallengeBtn, this);

        this.choose_btn = this.endless_challenge_page.getChildByName("choose_level").getChildByName("choose").getChildByName("choose_btn");
        this.choose_btn.on(Button.EventType.CLICK, this.onChooseBtn, this);
        this.choose_num = this.endless_challenge_page.getChildByName("choose_level").getChildByName("choose").getChildByName("choose_num");
        this.choose_page = this.endless_challenge_page.getChildByName("choose_page");
        this.choose_content = this.choose_page.getChildByName("choose_list").getChildByName("choose_view").getChildByName("choose_content");

        this.ranking_list_page.active = false;
        this.endless_challenge_page.active = true;
        this.reward_page.active = false;
        this.node.getChildByName("toggle_container").getChildByName("endlsee_challenge_toggle").getComponent(Toggle).isChecked = true;

        this.endless__get_rank_info = TextUtils.Instance.endless__get_rank_info;
        this.endless__get_reward_info = TextUtils.Instance.endless__get_reward_info;
        this.promotionInfoList = TextUtils.Instance.promotion__get_promotion_info;

        this.updateUI();
    }

    // 点击开始挑战按钮
    onChallengeBtn() {
        GameData.userData.isEndlessBattleScene = true;
        GameData.battleData.TowerObj.length = 0; //清空上阵员工
        find("Canvas").getComponent(MainUIControllers).goBattle();
    }
    // 点击选择关卡按钮
    onChooseBtn() {
        this.choose_page.active = !this.choose_page.active;
    }
    updateUI() {
        this.initRankingListPage();
        this.initEndlessChallengePage();
        this.initRewardPage();
        this.updateRewardToggleRedDot();
    }

    changeHeadIcon() {
        this.initRankingListPage();
    }

    //初始化排行榜界面
    initRankingListPage() {
        // 初始底部化玩家排名信息
        resources.load("images/goods/" + GameData.userData.head_icon + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            this.player_icon.getComponent(Sprite).spriteFrame = spriteFrame
        })
        this.player_name.getComponent(Label).string = GameData.userData.nickName_InGame;
        let nowPromotionInfo = this.promotionInfoList.find(item => item.id == GameData.userData.career)
        this.player_career.getComponent(Label).string = nowPromotionInfo.position_lv_name;
        this.player_score.getComponent(Label).string = GameData.userData.endlessChallengeMaxScore.toString() + "积分";
        // 玩家排名
        let play_rank_num = 0;
        // 先清除本玩家信息
        if (this.endless__get_rank_info.some(item => item.player_id === 0)) {
            // 先将 所要删除玩家 位置之后的 其他玩家id减1
            for (let i = this.endless__get_rank_info.findIndex(item => item.player_id === 0); i < this.endless__get_rank_info.length; i++) {
                this.endless__get_rank_info[i].id -= 1;
            }
            // 删除该玩家信息
            this.endless__get_rank_info = this.endless__get_rank_info.filter(item => item.player_id !== 0);
        }

        for (const [index, item] of this.endless__get_rank_info.entries()) {
            if (GameData.userData.endlessChallengeMaxScore >= item.score) {
                // 更新玩家排名
                play_rank_num = index + 1;
                break;
            }
        }
        // this.like_btn.active = play_rank_num == 0 ? false : true;
        this.not_on_list.active = play_rank_num == 0 ? true : false;

        // 玩家排名数字
        if (play_rank_num > 0) {
            this.player_rank_num.getComponent(Label).string = play_rank_num.toString();
        } else {
            this.player_rank_num.active = false;
        }

        if (play_rank_num > 0) {
            //玩家在排行榜上，将其信息添加到endless__get_rank_info中
            let player_info = {
                "id": play_rank_num - 1,
                "player_id": 0,
                "icon": GameData.userData.head_icon,
                "name": GameData.userData.nickName_InGame,
                "career": nowPromotionInfo.position_lv_name,
                "score": GameData.userData.endlessChallengeMaxScore,
                "is_player": true
            }

            // 插入新的玩家信息
            this.endless__get_rank_info.splice(play_rank_num - 1, 0, player_info);
            // 将插入位置之后的其他玩家的id加1
            for (let i = play_rank_num; i < this.endless__get_rank_info.length; i++) {
                this.endless__get_rank_info[i].id += 1;
            }
        }
        // 初始化排行榜信息
        this.rank_content.removeAllChildren();
        //只展示前20名玩家信息
        if (this.endless__get_rank_info.length > 20) {
            this.endless__get_rank_info = this.endless__get_rank_info.slice(0, 20);
        }

        this.endless__get_rank_info.forEach(rank_info => {
            // 创建排行榜项
            let rank_item = instantiate(this.endless_rank_item);
            rank_item.getComponent(EndlessRankItemController).init(rank_info);
            this.rank_content.addChild(rank_item);
        });
    }

    //初始化无尽挑战界面
    initEndlessChallengePage() {
        this.choose_page.active = false;
        this.score_num.getComponent(Label).string = GameData.userData.endlessChallengeMaxScore.toString();
        this.survive_num.getComponent(Label).string = GameData.userData.endlessChallengeMaxSurvive.toString();
        this.choose_num.getComponent(Label).string = "1";
        GameData.userData.endlessChooseSurvive = 1;
        // 每20关设置一个关卡选择,只显示1,21,41,61...
        const survive = Math.max(1, GameData.userData.endlessChallengeMaxSurvive);
        const choose_level_num = Math.floor((survive - 1) / 20) + 1;
        this.choose_content.removeAllChildren();
        for(let i = 1;i <= choose_level_num;i++){
            let choose_item = instantiate(this.endless_choose_item);
            choose_item.getComponent(EndlessChooseItemController).init(i, this.choose_num);
            this.choose_content.addChild(choose_item);
        }
    }

    //初始化奖励界面
    initRewardPage() {
        this.reward_player_score.getComponent(Label).string = GameData.userData.endlessChallengeMaxScore.toString();
        this.reward_content.removeAllChildren();
        this.endless__get_reward_info.forEach(reward_info => {
            let reward_item = instantiate(this.endless_reward_item);
            reward_item.getComponent(EndlessRewardItemController).init(reward_info);
            this.reward_content.addChild(reward_item);
        });
    }

    // 红点
    updateRewardToggleRedDot() {
        let is_show_reward_red_dot: boolean = false;
        for (let i = 0; i < GameData.userData.endlessRewardStatus.length; i++) {
            if (GameData.userData.endlessRewardStatus[i] == 0 && GameData.userData.endlessChallengeMaxScore >= this.endless__get_reward_info[i].score) {
                // 如果有未领取的奖励且积分满足条件，则显示红点
                is_show_reward_red_dot = true
                break
            }
        }
        this.endless_reward_red_dot.active = is_show_reward_red_dot;
    }

    //在编辑器中调用
    public onToggleValueChanged(toggle: Toggle, Index: number) {
        if (!this.is_call_back) return;
        this.checkPagecheckPageByIndex(Index);
    }

    checkPagecheckPageByIndex(Index: number, is_call_back: boolean = true) {
        this.is_call_back = is_call_back;
        if (!this.is_call_back) {
            this.node.getChildByName("toggle_container").children.forEach(element => {
                element.getComponent(Toggle).isChecked = element.getSiblingIndex() == Index;
                element.getComponent(Toggle).isChecked ? element.getChildByName("text").getComponent(Label).color = new Color(255, 255, 255, 255) : element.getChildByName("text").getComponent(Label).color = new Color(251, 233, 183, 255);
            })
        }
        this.page_container.children.forEach(element => {
            element.active = element.getSiblingIndex() == Index;
        })

        // 更新Toggle文字颜色
        this.node.getChildByName("toggle_container").children.forEach(element => {
            element.getComponent(Toggle).isChecked ? element.getChildByName("text").getComponent(Label).color = new Color(255, 255, 255, 255) : element.getChildByName("text").getComponent(Label).color = new Color(251, 233, 183, 255);
        })

        // 更新标题
        // if (Index == 0) {
        //     this.endless_title.getChildByName("text").getComponent(Label).string = "排行榜";
        // } else if (Index == 1) {
        //     this.endless_title.getChildByName("text").getComponent(Label).string = "无尽挑战";
        // } else if (Index == 2) {
        //     this.endless_title.getChildByName("text").getComponent(Label).string = "积分奖励";
        // }
        this.is_call_back = true;
    }

    // 更新排行榜信息
    updateRankingList() {

    }
    close_handler() {
        this.node.active = false;
    }
}


