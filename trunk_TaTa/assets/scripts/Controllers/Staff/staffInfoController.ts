import { _decorator, Button, Color, Component, instantiate, Label, Node, Prefab, RichText, sp, Sprite, v3, find } from 'cc';
import { GameData } from '../../Common/GameData';
import { LoadUtils } from '../../Common/LoadUtils';
import { Utils } from '../../Common/Utils';
import { staffController } from './staffController';
import { TextUtils } from '../../Common/TextUtils';
import { staffAttrController } from './staffAttrController';
import { GameApp } from '../../GameApp';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { AudioManager } from "../../Managers/AudioManager";
import EventManager from "../../Common/EventManager";
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('staffInfoController')
export class staffInfoController extends Component {
    @property(Prefab)
    staff_lv_item: Prefab = null!;

    staff_name: Node = null!;
    close_btn: Node = null!;
    staff_info_container: Node = null!;
    staff_introduce: Node = null!;
    exclusive_effect: Node = null!;
    staff_lv_attr_content: Node = null!;
    staff_upgrade: Node = null!;
    upgrade_btn: Node = null!;
    staff_attr_view: Node = null!;
    audio_manager: any = null;

    staff_info: any = null!;
    isIllustration: boolean = null!;//是否从图鉴界面打开英雄信息界面
    unlock: boolean = null!;//是否解锁该英雄
    staff__get_lv_add: Array<any> = null!;
    staff__get_red_staff_effect: Array<any> = null!;
    staff__get_upgrade_cost: Array<any> = null!;

    upgrade_cost: any = null!;
    isMax: boolean = null!;
    is_upgrade: boolean = false!;
    staff_lv_add_attr_list: string[] = []!;
    attrName = {
        "Attack": "atk",
        "Slowdown Effect": "slow",
        "Critical Chance": "crit",
        "Continuous Attack": "poison",
        "Critical Damage": "crit_hurt",
        "Slowdown Duration": "slow_time",
    }

    protected onLoad(): void {
        // EventManager.Instance.on(EventConst.UPDATE_STAFF_INFO, this.updateUI, this);
    }

    protected onDestroy(): void {
        // EventManager.Instance.off(EventConst.UPDATE_STAFF_INFO, this.updateUI, this);
    }
    // cumulativeAttrBonus: Record<string, number> = {
    //     atk: 0,
    //     slow: 0,
    //     crit: 0,
    //     poison: 0,
    //     crit_hurt: 0,
    //     slow_time: 0,
    // };
    init(staff_info, isIllustration, unlock) {
        this.audio_manager = AudioManager.ins;
        this.staff_info = staff_info
        this.isIllustration = isIllustration
        this.unlock = unlock;
        this.staff_name = this.node.getChildByName("staff_title").getChildByName("staff_name")
        this.close_btn = this.node.getChildByName("close_btn")
        this.staff_info_container = this.node.getChildByName("staff_info_container")
        this.staff_introduce = this.node.getChildByName("staff_introduce")
        this.exclusive_effect = this.node.getChildByName("exclusive_effect")
        this.staff_lv_attr_content = this.node.getChildByName("staff_lv_attr").getChildByName("view").getChildByName("content")
        this.staff_upgrade = this.node.getChildByName("staff_upgrade")
        this.upgrade_btn = this.node.getChildByName("upgrade_btn")
        this.staff_attr_view = this.node.getChildByName("staff_attr_view")

        // this.staff_info_container.on(Button.EventType.CLICK, ()=>{
        //     this.staff_attr_view.active = true;
        //     this.staff_attr_view.getComponent(staffAttrController).init(this.staff_info);
        // })

        this.close_btn.on(Button.EventType.CLICK, this.close_handler, this)
        this.upgrade_btn.on(Button.EventType.CLICK, this.upgrade_handler, this)

        // 等级额外加成
        this.staff__get_lv_add = TextUtils.Instance.staff__get_lv_add;
        // 红色员工专属效果
        this.staff__get_red_staff_effect = TextUtils.Instance.staff__get_red_staff_effect;
        // 升级消耗
        this.staff__get_upgrade_cost = TextUtils.Instance.staff__get_upgrade_cost;

        this.updateUI();

        this.is_upgrade = false
    }

    updateUI() {
        this.update_staff_name();
        this.update_staff_info_container();
        this.update_staff_introduce();
        // this.update_exclusive_effect();
        this.update_staff_lv_attr_content();
        this.update_staff_upgrade();
    }

    update_staff_name() {
        this.staff_name.getComponent(Label).string = this.staff_info.name;
    }

    update_staff_info_container() {
        let type_name = ""
        switch (this.staff_info.staff_type_id) {
            case 0: type_name = "单体型"
                break;
            case 1: type_name = "群体型"
                break;
            case 2: type_name = "控制型"
                break;
            case 3: type_name = "持续型"
                break;
        }
        this.staff_info_container.getChildByName("staff_type").getComponent(Label).string = type_name
        if (this.isIllustration) {
            this.staff_info_container.getChildByName("staff_lv").getComponent(Label).string = `100`;
        } else {
            this.staff_info_container.getChildByName("staff_lv").getComponent(Label).string = `${GameData.userData.towerLv[this.staff_info.id]}`;
        }
        // this.staff_info_container.getComponent(Sprite).spriteFrame = LoadUtils.Instance.staff.find(item => item.name === `staff_info_bg_${this.staff_info.quality}`)
        const staff = this.staff_info_container.getChildByName("staff");
        LoadUtils.Instance.changeTowerBones(this.staff_info.id, staff);
    }

    update_staff_introduce() {
        this.staff_introduce.getChildByName("text").getComponent(Label).string = TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item => item.id == this.staff_info.id).introduce;
    }

    update_exclusive_effect() {
        const red_effect = this.exclusive_effect.getChildByName("red_effect")
        const disable_icon = this.exclusive_effect.getChildByName("disable_icon")
        red_effect.active = this.staff_info.quality === 6
        disable_icon.active = !red_effect.active

        if (!red_effect.active) return;

        red_effect.getChildByName("effect_name").getComponent(Label).string = `${this.staff_info.english_name} Exclusive Effect`

        const current_effect = red_effect.getChildByName("current_effect")
        const next_effect = red_effect.getChildByName("next_effect")
        const red_staff_effect_list = this.staff__get_red_staff_effect.filter(item => item.staff_id === this.staff_info.id)

        let red_staff_effect_current = null;
        let red_staff_effect_index = null;
        red_staff_effect_list.forEach((staff_effect_info, index) => {
            if (GameData.userData.towerLv[this.staff_info.id] >= staff_effect_info.lv) {
                red_staff_effect_current = staff_effect_info
                red_staff_effect_index = index
            }
        });
        const red_staff_effect_next = red_staff_effect_list[red_staff_effect_index + 1];

        current_effect.getChildByName("effect").getComponent(RichText).string = red_staff_effect_current.passive_effect_english

        if (!red_staff_effect_next) {
            next_effect.active = false
        } else {
            next_effect.active = true
            next_effect.getChildByName("effect").getComponent(RichText).string = red_staff_effect_next.passive_effect_english
            next_effect.getChildByName("title").getChildByName("unlock_text").getComponent(Label).string = `(Unlocks at Lv. ${red_staff_effect_next.lv})`
        }
    }

    update_staff_lv_attr_content() {
        this.staff_lv_attr_content.removeAllChildren();
        const staff_lv_add = this.staff__get_lv_add.find(item => item.id === this.staff_info.id);
        this.staff_lv_add_attr_list = [staff_lv_add["10"], staff_lv_add["20"], staff_lv_add["30"], staff_lv_add["40"], staff_lv_add["50"], staff_lv_add["60"], staff_lv_add["70"], staff_lv_add["80"], staff_lv_add["90"], staff_lv_add["100"]]
        this.staff_lv_add_attr_list.forEach((staff_lv_add_attr, index) => {
            const staff_lv_item = instantiate(this.staff_lv_item)
            staff_lv_item.getChildByName("staff_lv").getComponent(Label).string = `${(index + 1) * 10}级:`
            staff_lv_item.getChildByName("staff_lv_effect").getComponent(Label).string = staff_lv_add_attr
            staff_lv_item.setParent(this.staff_lv_attr_content)
            staff_lv_item.getChildByName("staff_lv").getComponent(Label).color = new Color("#49281d")
            staff_lv_item.getChildByName("staff_lv_effect").getComponent(Label).color = new Color("#49281d")
            // 用当前英雄等级/10
            if (index <= Math.floor((GameData.userData.towerLv[this.staff_info.id] / 10) - 1)) {
                staff_lv_item.getChildByName("staff_lv").getComponent(Label).color = new Color("#288600")
                staff_lv_item.getChildByName("staff_lv_effect").getComponent(Label).color = new Color("#288600")
            }
        })
    }

    update_staff_upgrade() {
        const staff_lv_current = GameData.userData.towerLv[this.staff_info.id]
        const staff_lv_next = GameData.userData.towerLv[this.staff_info.id] + 1

        const lv_box = this.staff_upgrade.getChildByName("lv_box")
        lv_box.getChildByName("current_lv").getComponent(Label).string = `当前等级：${staff_lv_current}`
        lv_box.getChildByName("next_lv").getComponent(Label).string = `下一等级：${staff_lv_next}`

        const attr_attack = this.staff_upgrade.getChildByName("attr_attack")
        const attr_continuous_attack = this.staff_upgrade.getChildByName("attr_continuous_attack")
        const attr_crit = this.staff_upgrade.getChildByName("attr_crit")
        const attr_crit_hurt = this.staff_upgrade.getChildByName("attr_crit_hurt")
        const upgrade_cost_1 = this.node.getChildByName("upgrade_cost_1")
        const upgrade_cost_2 = this.node.getChildByName("upgrade_cost_2")

        // 是否满级
        this.isMax = GameData.userData.towerLv[this.staff_info.id] >= this.staff__get_upgrade_cost.length

        //图鉴界面不显示升级按钮，只在酒馆界面显示
        if (this.isIllustration) {
            this.upgrade_btn.active = false;
        } else {
            this.upgrade_btn.active = true;
        }

        if (this.isMax) {
            // lv_box.children.forEach(item => {
            // if (item.name !== "current_lv") {
            // item.active = false
            // } else {
            //     item.getComponent(Label).fontSize = 56
            // }
            // })
            // lv_box.active = false;
            lv_box.getChildByName("next_lv").active = false
            lv_box.getChildByName("staff_info_arrow").active = false
            upgrade_cost_1.active = false
            upgrade_cost_2.active = false
            // 禁用升级按钮
            this.upgrade_btn.getComponent(Button).interactable = false
            this.upgrade_btn.getComponent(Sprite).grayscale = true
            this.upgrade_btn.getChildByName("Label").getComponent(Label).string = "已满级"
            this.upgrade_btn.getChildByName("common_red_dot").active = false
            // 基础攻击和持续攻击
            attr_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.count_base_attack(staff_lv_current)}`
            attr_attack.getChildByName("attr").getChildByName("next_attr").active = false
            attr_attack.getChildByName("attr").getChildByName("staff_info_arrow").active = false
            // attr_continuous_attack.active = this.staff_info.poison_base !== 0
            attr_continuous_attack.getChildByName("attr").getChildByName("next_attr").active = false
            attr_continuous_attack.getChildByName("attr").getChildByName("staff_info_arrow").active = false
            if (this.staff_info.poison_base !== 0) {
                attr_continuous_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.count_base_continuous_attack(staff_lv_current)}`
            } else {
                attr_continuous_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${0}`
            }

            attr_crit.getChildByName("attr").getChildByName("next_attr").active = false
            attr_crit.getChildByName("attr").getChildByName("staff_info_arrow").active = false
            attr_crit.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${GameData.userData.towerlist.find(item => item.id === this.staff_info.id).crit * 100}%`
            attr_crit_hurt.getChildByName("attr").getChildByName("next_attr").active = false
            attr_crit_hurt.getChildByName("attr").getChildByName("staff_info_arrow").active = false
            attr_crit_hurt.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${GameData.userData.towerlist.find(item => item.id === this.staff_info.id).crit_hurt * 100}%`
        } else {
            if (this.isIllustration) {
                lv_box.active = false;
            } else {
                lv_box.active = true;
                // lv_box.getChildByName("current_lv").getComponent(Label).fontSize = 40
            }
            // lv_box.children.forEach(item => {
            //     item.active = true
            // })
            // lv_box.getChildByName("current_lv").getComponent(Label).fontSize = 40

            // 启用升级按钮
            if (!this.unlock) {// 如果未解锁，则禁用升级按钮
                this.upgrade_btn.getComponent(Button).interactable = false
                this.upgrade_btn.getComponent(Sprite).grayscale = true
                this.upgrade_btn.getChildByName("Label").getComponent(Label).string = "未解锁"
                this.upgrade_btn.getChildByName("common_red_dot").active = false
            } else {
                this.upgrade_btn.getComponent(Button).interactable = true
                this.upgrade_btn.getComponent(Sprite).grayscale = false
                this.upgrade_btn.getChildByName("Label").getComponent(Label).string = "升级"
            }

            // 基础攻击和持续攻击
            if (this.isIllustration) {
                attr_attack.getChildByName("attr").getChildByName("next_attr").active = false
                attr_attack.getChildByName("attr").getChildByName("staff_info_arrow").active = false
                upgrade_cost_1.active = false
                upgrade_cost_2.active = false
                attr_continuous_attack.getChildByName("attr").getChildByName("next_attr").active = false
                attr_continuous_attack.getChildByName("attr").getChildByName("staff_info_arrow").active = false
                attr_crit.getChildByName("attr").getChildByName("next_attr").active = false
                attr_crit.getChildByName("attr").getChildByName("staff_info_arrow").active = false
                attr_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.count_base_attack(100)}`
                if (this.staff_info.poison_base !== 0) {
                    attr_continuous_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.count_base_continuous_attack(100)}`
                } else {
                    attr_continuous_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${0}`
                }
            }
            else {
                attr_attack.getChildByName("attr").getChildByName("next_attr").active = true
                attr_attack.getChildByName("attr").getChildByName("staff_info_arrow").active = true
                attr_attack.getChildByName("attr").getChildByName("next_attr").getComponent(Label).string = `${this.count_base_attack(staff_lv_next)}`
                attr_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.count_base_attack(staff_lv_current)}`

                // if(!this.unlock){
                //     upgrade_cost_1.active = false
                //     upgrade_cost_2.active = false
                // }else{
                upgrade_cost_1.active = true
                upgrade_cost_2.active = true
                // }
                attr_continuous_attack.getChildByName("attr").getChildByName("next_attr").active = true
                attr_continuous_attack.getChildByName("attr").getChildByName("staff_info_arrow").active = true
                attr_continuous_attack.getChildByName("attr").getChildByName("next_attr").getComponent(Label).string = `${this.count_base_continuous_attack(staff_lv_next)}`
                if (this.staff_info.poison_base !== 0) {
                    attr_continuous_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.count_base_continuous_attack(staff_lv_current)}`
                } else {
                    attr_continuous_attack.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${0}`
                }

                // attr_crit.getChildByName("attr").getChildByName("next_attr").active = true
                // attr_crit.getChildByName("attr").getChildByName("staff_info_arrow").active = true
                // attr_crit.getChildByName("attr").getChildByName("next_attr").getComponent(Label).string = `${GameData.userData.towerlist.find(item => item.id === this.staff_info.id).crit*100}%`
            }
            // attr_continuous_attack.active = this.staff_info.poison_base !== 0

            if (this.unlock) {
                attr_crit.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${GameData.userData.towerlist.find(item => item.id === this.staff_info.id).crit * 100}%`
                attr_crit_hurt.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${GameData.userData.towerlist.find(item => item.id === this.staff_info.id).crit_hurt * 100}%`
            }
            else {
                attr_crit.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.staff_info.crit * 100}%`
                attr_crit_hurt.getChildByName("attr").getChildByName("current_attr").getComponent(Label).string = `${this.staff_info.crit_hurt * 100}%`
            }
            // 下一等级的升级消耗
            if (!this.unlock) {
                this.upgrade_cost = this.staff__get_upgrade_cost.find(item => item.lv === staff_lv_next + 1);
            } else {
                this.upgrade_cost = this.staff__get_upgrade_cost.find(item => item.lv === staff_lv_next);
            }
            const piece_num = GameData.userData.towerDebris[this.staff_info.piece_goods_id]
            const piece_num_format = Utils.formatNumber(piece_num)
            const goods_num = GameData.userData.hasGoodsList[1]
            const goods_num_format = GameData.num2cn(goods_num);
            const cost_1_format = GameData.num2cn(this.upgrade_cost.cost_1);
            upgrade_cost_1.getChildByName("num").getComponent(Label).color = goods_num < this.upgrade_cost.cost_1 ? new Color(208, 76, 66) : new Color(255, 255, 255);
            upgrade_cost_1.getChildByName("num").getComponent(Label).string = goods_num_format;
            upgrade_cost_1.getChildByName("cost").getComponent(Label).string = cost_1_format;
            upgrade_cost_2.getChildByName("goods_icon").getComponent(Sprite).spriteFrame = LoadUtils.Instance.goods_list.find(item => item.name == this.staff_info.piece_goods_id)
            upgrade_cost_2.getChildByName("num").getComponent(RichText).string = `<color=${piece_num < this.upgrade_cost.cost_2 ? "#d04c42" : "ffffff"}><outline color=#000000 width=2>${piece_num_format}</outline></color><outline color=#000000 width=2>/${this.upgrade_cost.cost_2}</outline>`
            // 通过资源数量判断升级按钮是否可用
            if (GameData.userData.hasGoodsList[1] < this.upgrade_cost.cost_1
                || GameData.userData.towerDebris[this.staff_info.piece_goods_id] < this.upgrade_cost.cost_2) {
                // 禁用升级按钮
                this.upgrade_btn.getComponent(Button).interactable = false
                this.upgrade_btn.getComponent(Sprite).grayscale = true
                this.upgrade_btn.getChildByName("common_red_dot").active = false
            } else {
                // 启用升级按钮
                this.upgrade_btn.getComponent(Button).interactable = true
                this.upgrade_btn.getComponent(Sprite).grayscale = false
                this.upgrade_btn.getChildByName("common_red_dot").active = true
                //刷新主界面红点
                find("Canvas").getComponent(MainUIControllers).updateRedDot();
            }
            EventManager.Instance.emit(EventConst.REFRESH_STAFF_INFO, this.staff_info.id);
        }
    }

    // 计算基础攻击和基础持续攻击
    count_base_attack(staff_lv) {
        return this.staff_info.atk_base + ((staff_lv - 1) * this.staff_info.atk_grow) + (0.5 * (staff_lv - 1) * (staff_lv - 2) * this.staff_info.atk_grow)
    }
    count_base_continuous_attack(staff_lv) {
        return this.staff_info.poison_base + ((staff_lv - 1) * this.staff_info.poi_grow) + (0.5 * (staff_lv - 1) * (staff_lv - 2) * this.staff_info.poi_grow)
    }

    close_handler() {
        this.node.active = false;
        GameData.saveData(false);
        // if (this.is_upgrade) this.node.parent.getChildByName("staff_view").getComponent(staffController).updateUI(true);
    }

    upgrade_handler() {
        // for (const key in this.cumulativeAttrBonus) {
        //     this.cumulativeAttrBonus[key] = 0;
        // }
        if (GameData.userData.hasGoodsList[1] < this.upgrade_cost.cost_1 ||
            GameData.userData.towerDebris[this.staff_info.piece_goods_id] < this.upgrade_cost.cost_2) {
            return
        }

        // 减少资源
        GameData.userData.hasGoodsList[1] -= this.upgrade_cost.cost_1
        GameData.taskData.dailyTaskContentNumList[6] += this.upgrade_cost.cost_1;
        GameData.userData.towerDebris[this.staff_info.piece_goods_id] -= this.upgrade_cost.cost_2

        if (this.audio_manager) {
            this.audio_manager.playSound("tower_lv_up", false);
        }

        // 更新等级
        GameData.userData.towerLv[this.staff_info.id] += 1
        //跟新每日任务
        GameData.taskData.dailyTaskContentNumList[2]++;
        //更新循环任务
        let id = GameData.taskData.continuousTaskId % TextUtils.Instance.task__get_continuous_task.length
        if (id == 2) {
            GameData.taskData.continueTaskContentNumList[id]++;
            EventManager.Instance.emit(EventConst.UPDATE_CONTINUOUS_TASK)
        }
        // 更新基础属性
        const tower_info = GameData.userData.towerlist.find(item => item.id === this.staff_info.id)
        tower_info.atk = this.count_base_attack(GameData.userData.towerLv[this.staff_info.id])
        tower_info.poison = this.count_base_continuous_attack(GameData.userData.towerLv[this.staff_info.id])

        // this.staff_lv_add_attr_list.forEach((item, index) => {
        //     const staff_attr_name = this.attrName[item.split("+")[0]];
        //     const staff_attr_val = item.split("+")[1];

        //     // 根据等级计算额外属性加成 10级index为0 20级index为1
        //     if (index <= Math.floor((GameData.userData.towerLv[this.staff_info.id] - 10) / 10)) {
        //         // 应用额外属性加成
        //         switch (staff_attr_name) {
        //             case "攻击":
        //                 this.cumulativeAttrBonus.atk += Number(staff_attr_val);
        //                 break;
        //             case "poison":
        //                 this.cumulativeAttrBonus.poison += Number(staff_attr_val);
        //                 break;
        //             case "slow":
        //                 tower_info.slow += (parseFloat(staff_attr_val.replace('%', '')) / 100);
        //                 break;
        //             case "crit":
        //                 tower_info.crit += (parseFloat(staff_attr_val.replace('%', '')) / 100);
        //                 break;
        //             case "crit_hurt":
        //                 tower_info.crit_hurt += (parseFloat(staff_attr_val.replace('%', '')) / 100);
        //                 break;
        //             case "slow_time":
        //                 tower_info.slow_time += parseFloat(staff_attr_val.replace('s', ''));
        //                 break;
        //             default:
        //                 console.warn(`Unknown attribute name: ${staff_attr_name}`);
        //         }
        //     }
        // })

        // tower_info.atk += this.cumulativeAttrBonus.atk
        // tower_info.poison += this.cumulativeAttrBonus.poison

        this.staff_info = tower_info

        GameData.userData.towerlist[GameData.userData.towerlist.findIndex(item => item.id === this.staff_info.id)] = tower_info

        // 更新 UI
        this.updateUI()
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();

        // 标记已经进行了升级
        this.is_upgrade = true
        GameData.saveData(false);
    }
}
