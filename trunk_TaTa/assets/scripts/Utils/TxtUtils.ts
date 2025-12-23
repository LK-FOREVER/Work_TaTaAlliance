// //工具表类，读表还有获取各种config信息

import { _decorator, Asset, Component } from "cc";
const { ccclass, property } = _decorator;

import EventManager from "../Common/EventManager";
import EventConst from "./EventConst";
// import _ from "lodash";
import LoadUtils from "./LoadUtils";

@ccclass("TxtUtils")
export default class TxtUtils extends Component {
    private static _instance: TxtUtils = null;
    static get Instance() {
        if (this._instance === null) {
            this._instance = new TxtUtils();
        }
        return this._instance;
    }
    LOAD_FINISH_NUM = 4;
    loadConut: number = 0;
    player__get_lv_up_conf: Array<any> = new Array();
    player__get_rank_conf: Map<number, any> = new Map();
    friend__get_const: Map<string, any> = new Map();
    rank__get_rank_conf: Map<number, any> = new Map();
    chat__get_chat_conf: Map<number, any> = new Map();
    chat__get_red_pack_conf: Array<any> = new Array();
    load() {
        const infos = LoadUtils.Instance.resBundle.getDirWithPath("data", Asset);
        let urls = infos.map(function (info) {
            return info.path;
        });
        LoadUtils.Instance.resBundle.loadDir("data", (err, obj) => {
            if (err) {
                return;
            }
            this.LOAD_FINISH_NUM = urls.length;
            for (let i = 0; i < urls.length; i++) {
                let json_data = obj[i];
                let name = json_data.name;
                this.json_decode(json_data, this[name]);
                this.loadSuccess();
                // //console.log("--config load success--\n config--\t",self[name]);
            }
            // //console.log("========= txt load success");
        });
    }
    json_decode(value: any, revicer) {
        const jsonData: any = value.json!;
        for (const key1 in jsonData) {
            if (revicer instanceof Array) {
                //纯数组
                revicer.push(jsonData[key1]);
            } //id value
            else {
                for (const id in jsonData[key1]) {
                    if ((!Number.isNaN(Number(id))) && Number(id) >= 0) {
                        revicer.set(Number(id), jsonData[key1][id]);
                    } else {
                        revicer.set(String(id), jsonData[key1][id]);
                    }

                }
            }
        }
    }

    loadSuccess() {
        this.loadConut++;
        if (this.loadConut >= this.LOAD_FINISH_NUM) {
            // EventManager.Instance.emit(EventConst.LOAD_RES_SUCCESS);
        }
    }
    // 获取好友常量
    getFriendConst(label: string) {
        return this.friend__get_const.get(label);
    }
    getHeroExpCost(id, level): number[] {
        return [0, 0];
    }
    getSoldierExpCost(id, level): number[] {
        return [0, 0];
    }
    getHeroFragCost(id, star): number {
        return 0;
    }
    getSoldierFragCost(id, star): number {
        return 0;
    }
    getSkillFragCost(id, star): number {
        return 0;
    }
    getHeroGoldCost(id, star): number {
        return 0;
    }
    getSoldierGoldCost(id, star): number {
        return 0;
    }
    getSkillGoldCost(id, star): number {
        return 0;
    }
    getPlayerLvUpConf(index: number): any {
        return this.player__get_lv_up_conf[index - 1];
    }
    getPlayerRankConf(grade: number): any {
        let temp = 0;
        for (let [key, value] of this.player__get_rank_conf) {
            if (grade < key) {
                return [
                    this.player__get_rank_conf.get(temp).rank_grade,
                    this.player__get_rank_conf.get(temp).rank_id,
                    this.player__get_rank_conf.get(temp).rank_grade_icon,
                    this.player__get_rank_conf.get(temp).rank_name_icon,
                    this.player__get_rank_conf.get(temp).required_score,
                    false,
                ];
            }
            temp = key;
        }

        const lastValue = Array.from(this.player__get_rank_conf.values()).pop();
        return [
            lastValue.rank_grade,
            lastValue.rank_id,
            lastValue.rank_grade_icon,
            lastValue.rank_name_icon,
            lastValue.required_score,
            true,
        ];
    }

    getPlayerNextRankConf(grade: number): any {
        let temp = 0;
        for (let [key, value] of this.player__get_rank_conf) {
            if (grade < key) {
                return [
                    this.player__get_rank_conf.get(temp).rank_grade,
                    this.player__get_rank_conf.get(temp).rank_id,
                    this.player__get_rank_conf.get(temp).rank_grade_icon,
                    this.player__get_rank_conf.get(temp).rank_name_icon,
                    this.player__get_rank_conf.get(key).required_score,
                    false,
                ];
            }
            temp = key;
        }
        return [
            this.player__get_rank_conf.get(2800).rank_grade,
            this.player__get_rank_conf.get(2800).rank_id,
            this.player__get_rank_conf.get(2800).rank_grade_icon,
            this.player__get_rank_conf.get(2800).rank_name_icon,
            this.player__get_rank_conf.get(2800).required_score,
            true,
        ];
    }

    getPlayerRankConfByRankId(rankId: number) {
        const values = [...this.player__get_rank_conf.values()];
		let data = values[0];
		for(let i = 0; i < values.length; i+= 1) {
			if(values[i].rank_id === rankId) {
				data = values[i];
				break;
			}
		}
        return data;
    }
    getPlayerRankConfByScore(score: number) {
		let key = 0;
        const keys = [...this.player__get_rank_conf.keys()];
		for(let i = keys.length - 1; i >= 0; i -= 1) {
			if(keys[i] <= score) {
				key = keys[i];
				break;
			}
		}
        return this.player__get_rank_conf.get(key);

    }
    
    
    public getRankConf() {
        return this.rank__get_rank_conf;
    }

    public getRankConfById(id) {
        const conf = this.rank__get_rank_conf.get(id);
        if (!conf) {
            //console.log("getRankConfById error-->" + id);
            return null;
        }
        return conf;
    }

    public getChatConfByMsgId(msgId) {
        const conf = this.chat__get_chat_conf.get(msgId);
        if (!conf) {
            //console.log("chat__get_chat_conf error-->" + msgId);
            return null;
        }
        return conf;
    }
}
