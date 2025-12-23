import { _decorator, Asset, Component, Node, resources } from 'cc';
import EventManager from './EventManager';
import { EventConst } from './EventConst';
const { ccclass, property } = _decorator;

@ccclass('TextUtils')
export class TextUtils extends Component {
    private static _instance: TextUtils = null;
    static get Instance() {
        if (this._instance === null) {
            this._instance = new TextUtils();
        }
        return this._instance;
    }
    // 需要加载的配置表数量
    LOAD_FINISH_NUM = 62;
    // 已加载的配置表数量
    loadCount: number = 0;

    public readonly furniture__get_furniture_info: Map<string, any> = new Map();
    public readonly furniture_unlock__get_furniture_unlock_info: Array<any> = new Array();
    public readonly promotion__get_promotion_info: Array<any> = new Array();
    public readonly task__get_task: Array<any> = new Array();
    public readonly task__get_continuous_task: Array<any> = new Array();
    public readonly task__get_daily_task: Array<any> = new Array();
    public readonly guide__get_guide: Array<any> = new Array();
    public readonly guide__get_guidance: Array<any> = new Array();
    public readonly bonus__get_bonus: Array<any> = new Array();
    public readonly chapter__get_enemy_info: Map<number, any> = new Map();
    public readonly chapter__get_chapter_info: Array<any> = new Array();
    public readonly chapter__get_chapter_enemy_data: Array<any> = new Array();
    public readonly chapter__get_enemy_money: Array<any> = new Array();
    public readonly chapter__get_base_reward: Array<any> = new Array();
    public readonly chapter__get_build: Map<number, any> = new Map();
    public readonly chapter__get_radio_reward: Array<any> = new Array();
    public readonly chapter__get_map_info: Array<any> = new Array();
    public readonly goods__get_goods_info: Array<any> = new Array();
    public readonly goods__get_equip_info: Array<any> = new Array();
    public readonly tower__get_tower_info: Map<number, any> = new Map();
    public readonly tower__get_uplv_cost: Array<any> = new Array();
    public readonly tower__get_lv_add: Map<number, any> = new Map();
    public readonly player__get_player_career: Array<any> = new Array();
    public readonly player__get_promotion_need: Array<any> = new Array();
    public readonly player__get_promotion_reward: Array<any> = new Array();
    public readonly decision__get_decision: Array<any> = new Array();
    public readonly decision__get_decision_result: Array<any> = new Array();
    public readonly staff__get_info: Map<number, any> = new Map();
    public readonly player__random_name: Map<number, any> = new Map();
    public readonly staff__get_upgrade_cost: Array<any> = new Array();
    public readonly staff__get_lv_add: Array<any> = new Array();
    public readonly staff__all_infos: Array<any> = new Array();
    public readonly staff__get_red_staff_effect: Array<any> = new Array();
    public readonly staff_up__get_info: Array<any> = new Array();
    public readonly seven_sign__get_info: Array<any> = new Array();
    public readonly hangup__get_promotion_info: Array<any> = new Array();
    public readonly hangup__get_reward_info: Array<any> = new Array();
    public readonly recruit__get_recruit_type_info: Array<any> = new Array();
    public readonly recruit__get_recruit_ratio_info_1: Array<any> = new Array();
    public readonly recruit__get_recruit_ratio_info_2: Array<any> = new Array();
    public readonly recruit__get_recruit_ratio_show: Array<any> = new Array();
    public readonly recruit__get_recruit_ratio_show_info: Array<any> = new Array();
    public readonly equip__get_doll_machine_upgrade_info: Array<any> = new Array();
    public readonly equip__get_doll_machine_ratio_info: Array<any> = new Array();
    public readonly equip__get_equip_ratio_info_1: Array<any> = new Array();
    public readonly equip__get_equip_ratio_info_2: Array<any> = new Array();
    public readonly equip__get_equip_position_info: Array<any> = new Array();
    public readonly shop__get_recharge_info: Array<any> = new Array();
    public readonly shop__get_ad_good_info: Array<any> = new Array();
    public readonly shop__get_gold_good_info: Array<any> = new Array();
    public readonly shop__get_gift_info: Map<number, any> = new Map();
    public readonly goods__get_random_orange: Array<any> = new Array();
    public readonly goods__get_random_purple: Array<any> = new Array();
    public readonly invite_best_probability: Array<any> = new Array();
    public readonly invite_guide_probability: Array<any> = new Array();
    public readonly invite_probability: Array<any> = new Array();
    public readonly position_ask: Array<any> = new Array();
    public readonly promotion_reward: Array<any> = new Array();
    public readonly staff_position: Array<any> = new Array();
    public readonly endless__get_rank_info: Array<any> = new Array();
    public readonly endless__get_reward_info: Array<any> = new Array();
    public readonly friend__get_const: Map<string, any> = new Map();
    public readonly rank__get_rank_conf: Map<number, any> = new Map();
    public readonly player__get_rank_conf: Map<number, any> = new Map();
    load() {
        let self = this;
        const infos = resources.getDirWithPath("data", Asset);
        let urls = infos.map(function (info) {
            return info.path;
        });
        resources.loadDir("data", function (err, obj) {
            if (err) {
                return;
            }
            self.LOAD_FINISH_NUM = urls.length;
            for (let i = 0; i < urls.length; i++) {
                let json_data = obj[i];
                let name = json_data.name;
                console.log("解析--" + name);
                self.json_decode(json_data, self[name]);
                self.loadSuccess();
            }
            console.log("========= text load success");
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
        this.loadCount++;
        if (this.loadCount >= this.LOAD_FINISH_NUM) {
            console.log("=========配置表加载完成");
            EventManager.Instance.emit(EventConst.LOAD_RES_SUCCESS);
        }
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
}
