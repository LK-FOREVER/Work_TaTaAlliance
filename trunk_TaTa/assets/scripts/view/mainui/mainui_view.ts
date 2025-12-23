import { _decorator, Component, find, Node, Label, Sprite, ProgressBar, EditBox, sp, Prefab, instantiate, v3, UITransform, Vec3, tween, Mask, Layout, RichText, ScrollView } from "cc";
const { ccclass, property } = _decorator;

import EventManager from "../../Common/EventManager";
import player_base_module from "../../module/player_base_module";
import EventConst from "../../Utils/EventConst";
import TxtUtils from "../../Utils/TxtUtils";
import Utils from "../../Utils/Utils";
import chat_module from "../../module/chat_module";
import _ from "lodash";
import netManager from "../../Network/netManager";
import { GameData } from "../../Common/GameData";

const moveTime = 0.1;

@ccclass("mainui_view")
export default class mainui_view extends Component {
	@property(Prefab)
	chat_item: Prefab = null;
	@property(Node)
	chat_list: Node = null;
	// 0是系统聊天 1是世界聊天
	private chat_type = 1;

	onLoad() {
		// EventManager.Instance.on(EventConst.PLAYER_BASE_CHANGE,this.player_base_change,this);
		EventManager.Instance.on(EventConst.UPDATE_MAIN_CHAT_LIST, this.update_main_chat_list, this);
		this.initUI();
	}

	protected onDestroy(): void {
		// EventManager.Instance.off(EventConst.PLAYER_BASE_CHANGE,this.player_base_change,this);
		EventManager.Instance.off(EventConst.UPDATE_MAIN_CHAT_LIST, this.update_main_chat_list, this);
		this.unscheduleAllCallbacks();
	}
	close() {
		this.node.active = false;
	}
	update_main_chat_list() {
		this.chat_list.removeAllChildren();
		const show_chat_list: any[] = [];
		if (this.chat_type === 1) {
			// 世界聊天
			const history_chat_list_2: any[] = JSON.parse(JSON.stringify(chat_module.Instance.get_model().history_chat_list_2))
			console.log("世界聊天记录：", history_chat_list_2);
			history_chat_list_2.some((item) => {
				// 筛选出普通消息
				if (item.type === 1 || item.type === 4) {
					if (item.type === 4) {
						// item.content = "对战连胜红包"
						// show_chat_list.push(item);
					} else {
						show_chat_list.push(item);
					}
				}
				return show_chat_list.length >= 4;
			});
		}
		// else{
		// 	// 系统
		// 	const history_chat_list_6: any[] = JSON.parse(JSON.stringify(chat_module.Instance.get_model().history_chat_list_6))
		// 	history_chat_list_6.some((item) => {
		// 		item.player.nickname = "系统"
		// 		const msgId = item.msg_id;
		// 		const chatConf = TxtUtils.Instance.getChatConfByMsgId(msgId);
		// 		const msg = chatConf.msg;
		// 		const color = chatConf.color.split("|");
		// 		const contents = item.msg_arg_list;
		// 		const rarityName = ["全部", "完整", "精良", "稀有", "史诗", "传说", "绝世",];
		// 		if (msgId >= 16 && msgId <= 19) {
		// 			const userName = contents[0].arg_content_list[0].content; //主公
		// 			const id = Number(contents[1].arg_content_list[0].content);  //id
		// 			const rarity = 1; //绝世
		// 			const type = Utils.getTypeById(id).zh;//英雄
		// 			const thing = "英雄名";//英雄名
		// 			const replacements = [color[0], userName, color[1], rarityName[rarity], color[2], type, color[3], thing];
		// 			const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
		// 			item.content = formattedStr;
		// 		} else if (msgId === 20 || msgId === 21) {
		// 			const userName = contents[0].arg_content_list[0].content;
		// 			const thing = contents[1].arg_content_list[0].content;
		// 			const replacements = [color[0], userName, color[1], thing];
		// 			const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
		// 			item.content = formattedStr;
		// 		} else if (msgId >= 22 && msgId <= 24) {
		// 			const userName = contents[0].arg_content_list[0].content; //主公
		// 			const id = Number(contents[2].arg_content_list[0].content);  //id

		// 			const rarity = 1; //绝世
		// 			const type = Utils.getTypeById(id).zh;//英雄
		// 			const thing = "英雄名";//英雄名
		// 			if (msgId === 22) {
		// 				const levelName = contents[1].arg_content_list[0].content + "级"; //50
		// 				const replacements = [color[0], userName, color[1], rarityName[rarity], color[2], type, color[3], thing, color[4], levelName];
		// 				const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
		// 				item.content = formattedStr;
		// 			} else if (msgId === 23) {
		// 				const levelName = contents[1].arg_content_list[0].content + "级"; //50
		// 				color[1] = "#ff4233";
		// 				const replacements = [color[0], userName, color[1], rarityName[rarity], color[2], type, color[3], thing, color[4], levelName];
		// 				const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
		// 				item.content = formattedStr;
		// 			} else if (msgId === 24) {
		// 				const levelName = contents[1].arg_content_list[0].content + "星"; //50
		// 				color[1] = "#ff4233";
		// 				const replacements = [color[0], userName, color[1], rarityName[rarity], color[2], type, color[3], thing, color[4], levelName];
		// 				const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
		// 				item.content = formattedStr;
		// 			}
		// 		}
		// 		show_chat_list.push(item);
		// 		return show_chat_list.length >= 4;
		// 	});
		// }
		show_chat_list.reverse();
		show_chat_list.forEach(chat_info => {
			const chat_node = instantiate(this.chat_item);
			chat_node.setParent(this.chat_list);

			chat_node.getComponent(RichText).string = `<color=#F3D9A4>${chat_info.player.nickname}：</color>${chat_info.content}`
		})
		this.chat_list.parent.parent.getComponent(ScrollView).scrollToBottom(0.1);
	}
	private initUI() {
		// const btn_chat_system = find("btn_chat_system", this.node);
		const btn_chat_world = find("btn_chat_world", this.node);
		const btn_bg_dialog = find("bg_dialog", this.node);
		const chat_box = find("chat_box", this.node);
		// const btn_bg = find("bg", this.node);

		// const profile_frame = find("player_info/profile_frame", this.node);

		// btn_bg.on(Node.EventType.TOUCH_END, this.btn_handler, this);
		// btn_chat_system.on(Node.EventType.TOUCH_END, this.btn_handler, this);
		btn_chat_world.on(Node.EventType.TOUCH_END, this.btn_handler, this);
		btn_bg_dialog.on(Node.EventType.TOUCH_END, this.btn_handler, this);
		// profile_frame.on(Node.EventType.TOUCH_END, this.btn_handler, this);
		chat_box.on(Node.EventType.TOUCH_END, this.btn_handler, this);

		this.updateUI(true);
		// 加载聊天记录
		this.update_main_chat_list();
	}

	private updateUI(isInit) {
		//console.log('%c [ isInit ]-378', 'font-size:13px; background:pink; color:#bf2c9f;', isInit)
		// const player_base_info = player_base_module.Instance.get_model().base_info;
		// const playerLvUpConf = TxtUtils.Instance.getPlayerLvUpConf(player_base_info.lv);
		// if(player_base_info.lv <3)
		// {

		//     this.scheduleOnce(()=>
		//     {
		//         find("mask",this.node).active = false;
		//     },0.5)
		// }
		// else
		// {
		//     find("mask",this.node).active = false;
		// }
		// find("player_info/label_name", this.node).getComponent(Label).string = player_base_info.nickname;
		// find("player_info/label_level", this.node).getComponent(Label).string = `${player_base_info.lv}`;
		// find("player_info/vip/vip_text", this.node).getComponent(Label).string = player_base_info.vip;
		// find("player_info/exp_progressbar", this.node).getComponent(ProgressBar).progress =(player_base_info.exp - playerLvUpConf.exp_all) / playerLvUpConf.exp;
		// find("player_info/label_power", this.node).getComponent(Label).string = "战"+Utils.changeNumber(player_base_info.power, 1);
	}

	private btn_handler(evt, param) {
		const target_name = evt.target.name;
		if (target_name == "btn_chat_world") {
			if (this.chat_type === 1) return
			this.chat_type = 1;
			this.update_main_chat_list();
		} else if (target_name == "btn_chat_system") {
			if (this.chat_type === 0) return
			this.chat_type = 0;
			this.update_main_chat_list();
		} else if (target_name == "bg_dialog" || target_name == "main_chat_item" || target_name == "chat_box") {
			if (this.chat_type === 1) {
				console.log("chat_type:", this.chat_type)
				EventManager.Instance.emit(EventConst.OPEN_CHAT_VIEW, true, 0, 1);
			} else if (this.chat_type === 0) {
				EventManager.Instance.emit(EventConst.OPEN_CHAT_VIEW, true, 0, 0);
			}
		} else if (param == "friend") {
			EventManager.Instance.emit(EventConst.OPEN_FRIEND_VIEW, true);
		}
		else if (param == "mail") {
			EventManager.Instance.emit(EventConst.OPEN_MAIL_VIEW, true);
		}
		else if (param == "rank") {
			EventManager.Instance.emit(EventConst.OPEN_RANK_VIEW, true);
		}
		else if (param == "playerinfo") {
			// EventManager.Instance.emit(EventConst.OPEN_PLAYER_INFO_VIEW, true, true);
		}
	}

	private player_base_change() {
		this.updateUI(false);
	}
}
