import { _decorator, Component, Label, Node } from 'cc';
import { TextUtils } from '../../Common/TextUtils';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('staffAttrSourceItemController')
export class staffAttrSourceItemController extends Component {
    staff_info: any = null!;
    attr_name: string = null!;
    type: string = null!;

    attr: Node = null!;
    number: Node = null!;
    num:number = 0;

    staff_lv_add_attr_list: string[] = []!;
    attrName = {
        "Attack": "atk",
        "Critical Chance": "crit",
        "Critical Damage": "crit_hurt",
        "Continuous Attack": "poison",
        "Slowdown Effect": "slow",
        "Slowdown Duration": "slow_time",
    }
    cumulativeAttrBonus: Record<string, number> = {
        atk: 0,
        crit: 0,
        crit_hurt: 0,
        poison: 0,
        slow: 0,
        slow_time: 0,
    };

    equip_list: any[] = []!;
    
    officeArtifactBonusNum: Record<string, number> = {
        atk: 0,
        crit: 0,
        crit_hurt: 0,
        poison: 0,
        duration: 0,
        slow: 0,
        slow_time: 0,
    };

    officeArtifactBonusStr: Record<string, string> = {
        atk: "0",
        crit: "0",
        crit_hurt: "0",
        poison: "0",
        duration: "0",
        slow: "0",
        slow_time: "0",
    };

    init(staff_info: any, attr_name: string, type: string) {
        this.staff_info = staff_info;
        this.attr_name = attr_name;
        this.type = type;

        this.attr = this.node.getChildByName("attr");
        this.number = this.node.getChildByName("number");

        const staff_lv_add = TextUtils.Instance.staff__get_lv_add.find(item => item.id == this.staff_info.id);
        this.staff_lv_add_attr_list = [staff_lv_add["10"], staff_lv_add["20"], staff_lv_add["30"], staff_lv_add["40"], staff_lv_add["50"], staff_lv_add["60"], staff_lv_add["70"], staff_lv_add["80"], staff_lv_add["90"], staff_lv_add["100"]]
        this.calculate_lv_add();

        this.equip_list = GameData.userData.hasEquipList[this.staff_info.staff_type_id];
        this.calculate_office_artifact_bonus();

        this.updateUI();
    }

    updateUI() {
        this.attr.getComponent(Label).string = this.attr_name;
        let number = this.number.getComponent(Label);

        if(this.type == "Attack"){
            if(this.attr_name == "Basic Attack") {
                this.num = this.staff_info.atk;
                number.string = `${this.num}`
            } else if (this.attr_name == "Extra Level Bonus") {
                this.num = this.cumulativeAttrBonus.atk
                number.string = `${this.num}`
            } else if (this.attr_name == "Total Enhancement Bonus") {
                this.num = this.calculate_total_enhancement_bonus()
                number.string = `${this.num}`
            } else if (this.attr_name == "Office Artifact Bonus") {
                this.num = Number(this.officeArtifactBonusStr.atk)
                number.string = this.officeArtifactBonusStr.atk
            } else if (this.attr_name == "Furniture Bonus") {
                this.num = GameData.userData.furniture_add.atk
                number.string = `${GameData.userData.furniture_add.atk.toFixed(0)}`
            }
        } else if (this.type == "Critical Chance") {
            if(this.attr_name == "Basic Critical Chance") {
                this.num = Number((TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).crit * 100).toFixed())
                number.string = `${(TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).crit * 100).toFixed()}%`
            } else if (this.attr_name == "Extra Level Bonus") {
                this.num = Number((this.cumulativeAttrBonus.crit * 100).toFixed())
                number.string = `${(this.cumulativeAttrBonus.crit * 100).toFixed()}%`
            } else if (this.attr_name == "Office Artifact Bonus") {
                this.num = Number(this.officeArtifactBonusStr.crit)
                number.string = `${this.officeArtifactBonusStr.crit}%`
            }
        } else if (this.type == "Critical Damage") {
            if(this.attr_name == "Basic Critical Damage") {
                this.num = Number((TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).crit_hurt * 100).toFixed());
                number.string = `${(TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).crit_hurt * 100).toFixed()}%`
            } else if (this.attr_name == "Extra Level Bonus") {
                this.num = Number((this.cumulativeAttrBonus.crit_hurt * 100).toFixed());
                number.string = `${(this.cumulativeAttrBonus.crit_hurt * 100).toFixed()}%`
            } else if (this.attr_name == "Office Artifact Bonus") {
                this.num = Number(this.officeArtifactBonusStr.crit_hurt)
                number.string = `${this.officeArtifactBonusStr.crit_hurt}%`
            }
        } else if (this.type == "Continuous Attack") {
            if(this.attr_name == "Basic Continuous Attack") {
                this.num = this.staff_info.poison
                number.string = `${this.staff_info.poison}`
            } else if (this.attr_name == "Extra Level Bonus") {
                this.num = this.cumulativeAttrBonus.poison
                number.string = `${this.cumulativeAttrBonus.poison}`
            } else if (this.attr_name == "Office Artifact Bonus") {
                this.num = Number(this.officeArtifactBonusStr.poison)
                number.string = this.officeArtifactBonusStr.poison
            }
        } else if (this.type == "Continuous Attack Duration") {
            if(this.attr_name == "Basic Continuous Duration") {
                this.num = TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).duration
                number.string = `${TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).duration}`
            } else if (this.attr_name == "Office Artifact Bonus") {
                this.num = Number(this.officeArtifactBonusStr.duration)
                number.string = this.officeArtifactBonusStr.duration
            }
        } else if (this.type == "Slowdown Effect") {
            if(this.attr_name == "Basic Slowdown Effect") {
                this.num = Number((TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).slow * 100).toFixed());
                number.string = `${(TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).slow * 100).toFixed()}%`
            } else if (this.attr_name == "Extra Level Bonus") {
                this.num = Number((this.cumulativeAttrBonus.slow * 100).toFixed())
                number.string = `${(this.cumulativeAttrBonus.slow * 100).toFixed()}%`
            } else if (this.attr_name == "Office Artifact Bonus") {
                this.num = Number(this.officeArtifactBonusStr.slow)
                number.string = `${this.officeArtifactBonusStr.slow}%`
            }
        } else if (this.type == "Slowdown Duration") {
            if(this.attr_name == "Basic Slowdown Duration") {
                this.num = TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).slow_time
                number.string = `${TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item=>item.id == this.staff_info.id).slow_time}`
            } else if (this.attr_name == "Extra Level Bonus") {
                this.num = this.cumulativeAttrBonus.slow_time
                number.string = `${this.cumulativeAttrBonus.slow_time}`
            } else if (this.attr_name == "Office Artifact Bonus") {
                this.num = Number(this.officeArtifactBonusStr.slow_time)
                number.string = this.officeArtifactBonusStr.slow_time
            }
        }
    }

    calculate_total_enhancement_bonus() {
        let atk:number = 0
        switch (this.staff_info.staff_type_id) {
            case 0: atk = GameData.userData.batteryStrengthenLv0
                break
            case 1: atk = GameData.userData.batteryStrengthenLv1
                break
            case 2: atk = GameData.userData.batteryStrengthenLv2
                break
            case 3: atk = GameData.userData.batteryStrengthenLv3
                break
            default: atk = 0
                break
        }
        return atk
    }

    calculate_lv_add() {
        this.staff_lv_add_attr_list.forEach((item, index) => {
            const staff_attr_name = this.attrName[item.split("+")[0]];
            const staff_attr_val = item.split("+")[1];

            // 根据等级计算额外属性加成 10级index为0 20级index为1
            if (index <= Math.floor((GameData.userData.towerLv[this.staff_info.id] - 10) / 10)) {
                // 应用额外属性加成
                switch (staff_attr_name) {
                    case "atk":
                        this.cumulativeAttrBonus.atk += Number(staff_attr_val);
                        break;
                    case "poison":
                        this.cumulativeAttrBonus.poison += Number(staff_attr_val);
                        break;
                    case "slow":
                        this.cumulativeAttrBonus.slow += (parseFloat(staff_attr_val.replace('%', '')) / 100);
                        break;
                    case "crit":
                        this.cumulativeAttrBonus.crit += (parseFloat(staff_attr_val.replace('%', '')) / 100);
                        break;
                    case "crit_hurt":
                        this.cumulativeAttrBonus.crit_hurt += (parseFloat(staff_attr_val.replace('%', '')) / 100);
                        break;
                    case "slow_time":
                        this.cumulativeAttrBonus.slow_time += parseFloat(staff_attr_val.replace('s', ''));
                        break;
                    default:
                        console.warn(`Unknown attribute name: ${staff_attr_name}`);
                        break;
                }
            }
        })
    }

    calculate_office_artifact_bonus() {
        this.equip_list.forEach(item => {
            const equip_info = TextUtils.Instance.goods__get_equip_info.find(equip => equip.icon == item.equip_id)
            if(equip_info !== undefined){
                let effectValue = item.effect_value
                if (equip_info.growth_type === 2) {
                    if (equip_info.is_percentage === 1) {
                        effectValue = item.effect_value
                    } else {
                        effectValue = item.effect_value
                    }
                } else {
                    effectValue = item.effect_value
                }
                switch (item.effect_name) {
                    case "Attack":
                        this.officeArtifactBonusNum.atk += effectValue
                        this.officeArtifactBonusStr.atk = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, this.officeArtifactBonusNum.atk)
                        break;
                    case "Critical Chance":
                        this.officeArtifactBonusNum.crit += effectValue
                        this.officeArtifactBonusStr.crit = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, this.officeArtifactBonusNum.crit)
                        break;
                    case "Critical Damage":
                        this.officeArtifactBonusNum.crit_hurt += effectValue
                        this.officeArtifactBonusStr.crit_hurt = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, this.officeArtifactBonusNum.crit_hurt)
                        break;
                    case "Continuous Attack":
                        this.officeArtifactBonusNum.poison += effectValue
                        this.officeArtifactBonusStr.poison = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, this.officeArtifactBonusNum.poison)
                        break;
                    case "Continuous Duration":
                        this.officeArtifactBonusNum.duration += effectValue
                        this.officeArtifactBonusStr.duration = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, this.officeArtifactBonusNum.duration)
                        break;  
                    case "Slowdown Effect":
                        this.officeArtifactBonusNum.slow += effectValue
                        this.officeArtifactBonusStr.slow = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, this.officeArtifactBonusNum.slow)
                        break;
                    case "Slowdown Duration":
                        this.officeArtifactBonusNum.slow_time += effectValue
                        this.officeArtifactBonusStr.slow_time = this.office_artifact_bonus_to_str(equip_info.growth_type, equip_info.is_percentage, this.officeArtifactBonusNum.slow_time)
                        break;
                    default:
                        break;
                } 
            }
        })
    }

    office_artifact_bonus_to_str(growth_type:number, is_percentage:number, effect_value:number){
        let effectValue = ""
        if (growth_type === 2) {
            if (is_percentage === 1) {
                effectValue = `${(effect_value * 100).toFixed(0)}`
            } else {
                effectValue = effect_value.toFixed(0)
            }
        } else {
            effectValue = `${effect_value.toFixed(0)}`
        }
        return effectValue
    }

    calculate_furniture() {
        let atk = 0
        GameData.userData.buildList.forEach(item => {
            let furniture_info = undefined;
            TextUtils.Instance.furniture__get_furniture_info.forEach(value => {
                furniture_info = value.find(obj => obj.build_id == item.buildId && obj.build_lv == item.build_lv)
                if(furniture_info !== undefined && furniture_info.effect_data[0].k == "atk") {
                    atk += furniture_info.effect_data[0].v
                }
            })
        })
        return atk
    }
}
