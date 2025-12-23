import { _decorator, Component, find, Label, Sprite, ProgressBar, Node, Button, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

import EventConst from "../../Utils/EventConst";
import LoadUtils from "../../Utils/LoadUtils";
import TxtUtils from "../../Utils/TxtUtils";
import EventManager from "../../Common/EventManager";
import player_base_module from "../../module/player_base_module";
import Utils from '../../Utils/Utils';
import Decimal from 'decimal.js';
import { common_user_head } from '../../Common/common_user_head';
import { StorageManager } from '../../Managers/StorageManager';
import { Const } from '../../const/consts';
import rank_module from '../../module/rank_module';
import { ToastControllers } from '../../Common/ToastControllers';

@ccclass('player_info_view')
export default class player_info_view extends Component {
	@property(Label)
	titleLabel: Label = null;
	@property(Node)
	historyViewNode: Node = null;
	@property(Node)
	currentLevelNode: Node = null;
	@property(Node)
	maxLevelNode: Node = null;
	@property(Node)
	areaNode: Node = null;

    scrollViewContent: Node = null!;
	player_info: any = null!;
   // friend_info: any = null!;
    //player_base_info: any = null!;
    bg_title: Node = null!;
    player_other_info_btns: Node = null!;
    btn_type_0: Node = null;
    btn_type_1: Node = null;
    btn_type_2: Node = null;
	btn_type_3: Node = null;
    player_info_right: Node = null!;
    level_text: Node = null!;
    exp_progressbar: Node = null!;
    label_progress: Node = null!;
    btn_lock: Node = null!;
    area_text: Node = null!;
    user_head: Node = null!;
    change_name_btn: Node = null!;
    player_info_data: Node = null!;
    label_name: Node = null!;
    label_id: Node = null!;
    player_power: Node = null!;
	sex: Node = null!;


	private _friendStatus = 0;
	private _playerRank = 0;
	private _is_me = true;

    protected onLoad(): void {
		EventManager.Instance.on(EventConst.PLAYER_BASE_CHANGE, this.updateUI, this);
        this.initUI();
    }
    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PLAYER_BASE_CHANGE, this.updateUI, this);
    }
	updateUI() {
		if(!this._is_me) return;
		this.player_info = player_base_module.Instance.get_model().base_info;
		this.updateMyInfoUI();
		this.updateCommonUI();
	}
    private initUI() {
        const mask = find("mask", this.node)
        const btn_close = find("btn_close", this.node)

        this.bg_title = this.node.getChildByName("bg_title")
        this.player_other_info_btns = this.node.getChildByName("player_other_info_btns");
        this.btn_type_0 = this.player_other_info_btns.getChildByName("btn_type_0");
        this.btn_type_1 = this.player_other_info_btns.getChildByName("btn_type_1");
        this.btn_type_2 = this.player_other_info_btns.getChildByName("btn_type_2");
		this.btn_type_3 = this.player_other_info_btns.getChildByName("btn_type_3");
        this.player_info_right = this.node.getChildByName("player_info_right");
        this.level_text = this.player_info_right.getChildByName("level_text");
        this.exp_progressbar = this.player_info_right.getChildByName("exp_progressbar");
        this.label_progress = this.player_info_right.getChildByName("label_progress");
        this.btn_lock = this.player_info_right.getChildByName("btn_lock");
        this.area_text = this.player_info_right.getChildByName("area_text");
        this.user_head = this.node.getChildByName("user_head");
        this.change_name_btn = this.node.getChildByName("change_name_btn");
        this.player_info_data = this.node.getChildByName("player_info_data");
        this.label_name = this.node.getChildByName("label_name");
        this.label_id = this.node.getChildByName("label_id");
		this.sex = this.node.getChildByName("sex");
        this.player_power = this.node.getChildByName("player_power");
        this.scrollViewContent = this.node.getChildByName("player_info_data").getComponent(ScrollView).content;

        mask.on(Node.EventType.TOUCH_END, this.btn_handler, this)
        btn_close.on(Node.EventType.TOUCH_END, this.btn_handler, this)
        this.change_name_btn.on(Node.EventType.TOUCH_END, this.btn_handler, this)
        this.btn_lock.on(Node.EventType.TOUCH_END, this.btn_handler, this)

		this.scrollViewContent.children.forEach((funNode, index) => {
			funNode.on(Button.EventType.CLICK, this.btn_scrollView_content_handler, this);
		});

    }
    private btn_handler(evt) {
        let target_name = evt.target.name;
        if (target_name == "mask") {
            EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
        } else if (target_name == "btn_close") {
            EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
        } else if (target_name == "btn_lock") {
            let player_base_info: any = player_base_module.Instance.get_model().base_info;
            let status = player_base_info.fame_lock_status == 1 ? 0 : 1;
            player_base_info.fame_lock_status = status;
            EventManager.Instance.emit(EventConst.QUERY_228, status);
            this.btn_lock.getChildByName("btn_lock_icon").getComponent(Sprite).spriteFrame = this.player_info.fame_lock_status == 1 ? LoadUtils.Instance.common.getSpriteFrame(`common_lock`) :
				LoadUtils.Instance.common.getSpriteFrame(`common_unlock`);
            ToastControllers.Instance.showToast(status == 1 ? "已锁定" : "已解锁")
        }
    }


	init(is_me, playerInfo) {
		this._is_me = is_me;
		if(is_me) {
			this.node.getChildByName("change_name_btn").active = true;
			this.player_info_right.active = true;
			this.player_other_info_btns.active = false;
			//
			this.player_info = player_base_module.Instance.get_model().base_info;
			this.updateCommonUI();
			this.updateMyInfoUI();
		} else {
			this.node.getChildByName("change_name_btn").active = false;
			this.player_info_right.active = false;
			this.player_info = playerInfo;
			if(playerInfo.player_id >= 10000001) { //机器人
				this.player_other_info_btns.active = false;
				this.updateRebotCommonUI(playerInfo);
			} else {
				this.player_other_info_btns.active = true;
				const full_id = {
					player_id: playerInfo.player_id,
					srvno: playerInfo.srvno,
				}
				EventManager.Instance.emit(EventConst.QUERY_320, full_id);
			}
			this.scrollViewContent.getChildByName("data_item_otherplayer").active = playerInfo.lv >= 5;
		}
	}

	public updateByFriendStatus(playerInfo, friend_status, playerRank) {
		this.player_info = playerInfo;
		this._friendStatus = friend_status;
		this._playerRank = playerRank;
		this.updateCommonUI();
		//1表示被对方拉黑，2表示已把对方拉黑，3表示好友，4表示非好友
		this.btn_type_3.active = friend_status === 1;
		this.btn_type_2.active = friend_status === 2;
		this.btn_type_0.active = friend_status === 3;
		this.btn_type_1.active = friend_status === 4;

		this.player_other_info_btns.children.forEach((funNode, index) => {
            funNode.children.forEach(btnNode => {
                btnNode.on(Button.EventType.CLICK, this.btn_player_other_handler, this);
            });
        });
	}

	private updateMyInfoUI() {
		const playerLvUpConf = TxtUtils.Instance.getPlayerLvUpConf(this.player_info.lv);
		this.label_progress.getComponent(Label).string = `${this.player_info.exp - playerLvUpConf.exp_all}/${playerLvUpConf.exp}`;
        this.exp_progressbar.getComponent(ProgressBar).progress = (this.player_info.exp - playerLvUpConf.exp_all) / playerLvUpConf.exp;
		this.level_text.getComponent(Label).string = `等级：${this.player_info.lv}`;
		this.area_text.getComponent(Label).string = `区服：${this.player_info.srvno.split("_")[1]}`;
		this.btn_lock.getChildByName("btn_lock_icon").getComponent(Sprite).spriteFrame = this.player_info.fame_lock_status == 1 ? 
			LoadUtils.Instance.common.getSpriteFrame(`common_lock`) :
			LoadUtils.Instance.common.getSpriteFrame(`common_unlock`);	
	}

	private updateCommonUI() {
		this.label_name.getComponent(Label).string = this.player_info.nickname;
		this.label_id.getComponent(Label).string = `ID：${this.player_info.player_id}`;
        this.player_power.getChildByName("power_num").getComponent(Label).string = "战"+this.player_info.power;
		this.user_head.getComponent(common_user_head).init(this.player_info);
		if(this.player_info.sex === 0 || this.player_info.sex === 1) {
			this.sex.active = true;
			this.sex.getComponent(Sprite).spriteFrame = LoadUtils.Instance.player_info.getSpriteFrame("player_info_sex_" + this.player_info.sex);
		} else {
			this.sex.active = false;
		}
		//对战信息
		this.historyViewNode.getChildByName("label_wins").getComponent(Label).string = this.player_info.total_victory_num;
		this.historyViewNode.getChildByName("label_draws").getComponent(Label).string = this.player_info.total_draw_num;
		this.historyViewNode.getChildByName("label_losses").getComponent(Label).string = this.player_info.total_defeated_num;

		const sum = this.player_info.total_victory_num + this.player_info.total_draw_num + this.player_info.total_defeated_num;
		if(sum === 0) {
			this.historyViewNode.getChildByName("label_wp").getComponent(Label).string = "0.00%";
		} else {
            let d_vic_num = new Decimal(this.player_info.total_victory_num);
            
            let d_ratio = d_vic_num.div(d_vic_num.plus(this.player_info.total_draw_num).plus(this.player_info.total_defeated_num));
			if(d_ratio.toNumber() === 1) {
				this.historyViewNode.getChildByName("label_wp").getComponent(Label).string = "100%";
			} else {
				this.historyViewNode.getChildByName("label_wp").getComponent(Label).string = (d_ratio.toNumber() * 100).toFixed(2) + "%";
			}
		}
		//竞技场
		let rank;
		if(!this.player_info.arena_ranking) {
			rank = this._playerRank;
		} else {
			rank = this.player_info.arena_ranking;
		}
		this.areaNode.getChildByName("label_rank").getComponent(Label).string = rank;
	}
	updateRebotCommonUI(playerInfo) {
		//console.log('%c [ playerInfo ]-225', 'font-size:13px; background:pink; color:#bf2c9f;', playerInfo)
		this.label_name.getComponent(Label).string = playerInfo.nickname;
		this.label_id.getComponent(Label).string = `ID：${playerInfo.player_id}`;
		this.user_head.getComponent(common_user_head).init(playerInfo);
		if(playerInfo.sex === 0 || playerInfo.sex === 1) {
			this.sex.active = true;
			this.sex.getComponent(Sprite).spriteFrame = LoadUtils.Instance.player_info.getSpriteFrame("player_info_sex_" + playerInfo.sex);
		} else {
			this.sex.active = false;
		}
		//当前段位
		const curGrade = playerInfo.cur_grade;
		const playerRankConf = TxtUtils.Instance.getPlayerRankConf(curGrade);
		this.currentLevelNode.getChildByName("level_name").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
		this.currentLevelNode.getChildByName("label_score").getComponent(Label).string = curGrade;
		this.currentLevelNode.getChildByName("level_icon").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[2]);
		//历史最高
		const maxGrade = playerInfo.cur_grade;
		const playerRankConf2 = TxtUtils.Instance.getPlayerRankConf(maxGrade);
		this.maxLevelNode.getChildByName("level_name").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf2[3]);
		this.maxLevelNode.getChildByName("label_score").getComponent(Label).string = maxGrade;
		this.maxLevelNode.getChildByName("level_icon").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf2[2]);
	}
    btn_player_other_handler(evt) {
        let target_name = evt.target.name;
		const skipTipInfo = StorageManager.Instance.getLocalStorageJson(Const.account + "skiptip");
        if (target_name == "battle") {
            // 切磋
            ToastControllers.Instance.showToast("功能暂未开放")
        } else if (target_name == "message") {
            // 聊天
			const full_id = {
				player_id: this.player_info.player_id,
				srvno: this.player_info.srvno,
			}
            EventManager.Instance.emit(EventConst.QUERY_409, full_id, 1);
            EventManager.Instance.emit(EventConst.OPEN_CHAT_VIEW, true, 1);
            EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false)
        } else if (target_name == "add") {
            // 添加
			const full_id = {
				player_id: this.player_info.player_id,
				srvno: this.player_info.srvno,
			}
			if(skipTipInfo.isSkip === 0) {
				Utils.create_tips_view(`确定添加<color=#9d331e>${this.player_info.nickname}</color>为好友？`, "提示", 1, () => {
					EventManager.Instance.emit(EventConst.QUERY_306, full_id);
					EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
				})
			} else {
				EventManager.Instance.emit(EventConst.QUERY_306, full_id);
				EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
			}
            
        } else if (target_name == "reject") {
            // 拒绝
			const full_id = {
				player_id: this.player_info.player_id,
				srvno: this.player_info.srvno,
			}
            EventManager.Instance.emit(EventConst.QUERY_314, [full_id]);
        } else if (target_name == "agree") {
            // 同意
			const full_id = {
				player_id: this.player_info.player_id,
				srvno: this.player_info.srvno,
			}
            EventManager.Instance.emit(EventConst.QUERY_311, full_id);
        } else if (target_name == "block") {
			const full_id = {
				player_id: this.player_info.player_id,
				srvno: this.player_info.srvno,
			}
            // 拉黑
            const msg = `确定将<color=#9d331e>${this.player_info.nickname}</color>移至黑名单？
<color=#71665c>您将无法与该玩家进行互动</color>`;
			
			if(skipTipInfo.isSkip === 0) {
				Utils.create_tips_view(msg, "提示", 1, () => {
					EventManager.Instance.emit(EventConst.QUERY_316, [full_id]);
					EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
				});
			} else {
				EventManager.Instance.emit(EventConst.QUERY_316, [full_id]);
				EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
			}

            
        } else if (target_name == "delete") {
            // 删除
			const full_id = {
				player_id: this.player_info.player_id,
				srvno: this.player_info.srvno,
			}
            const msg = `确定将<color=#9d331e>${this.player_info.nickname}</color>从您的好友列表中删除？
您的信息也将从对方的好友列表中删除。`
			if(skipTipInfo.isSkip === 0) {
				Utils.create_tips_view(msg, "提示", 1, () => {
					EventManager.Instance.emit(EventConst.QUERY_304, full_id);
					EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
				});
			} else {
				EventManager.Instance.emit(EventConst.QUERY_304, full_id);
				EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false);
			}
            
        } else if (target_name == "remove") {
            // 移除黑名单
			const full_id = {
				player_id: this.player_info.player_id,
				srvno: this.player_info.srvno,
			}
			if(skipTipInfo.isSkip === 0) {
				Utils.create_tips_view(`确定将<color=#9d331e>${this.player_info.nickname}</color>移除黑名单？`, "提示", 1, () => {
					EventManager.Instance.emit(EventConst.QUERY_317, [full_id]);
					EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false)
				});
			} else {
				EventManager.Instance.emit(EventConst.QUERY_317, [full_id]);
				EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, false)
			}
           
        }
    }
    btn_scrollView_content_handler(evt) {
        
    }

	openMessagePopup() {
		EventManager.Instance.emit(EventConst.OPEN_MESSAGE_VIEW, true, this.player_info);
	}
}
