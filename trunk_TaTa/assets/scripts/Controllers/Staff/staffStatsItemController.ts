import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { staffAttrSourceItemController } from './staffAttrSourceItemController';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('staffStatsItemController')
export class staffStatsItemController extends Component {
    @property(Prefab)
    staff_attr_source_item: Prefab = null!;

    staff_info: any = null!;
    attr: Node = null!;
    number: Node = null!;

    list: Node = null!;equip_list: any[] = []

    attr_name: string = null!;
    attr_names: string[] = ["Attack", "Attack Growth", "Attack Speed", "Attack Range", "Damage Range", "Critical Chance", "Critical Damage",
        "Continuous Attack", "Continuous Attack Duration", "Continuous Attack Growth",
        "Slowdown Effect", "Slowdown Duration"];

    init(staff_info: any, attr_name: string) {
        this.staff_info = staff_info;
        this.attr_name = attr_name;

        this.attr = this.node.getChildByName("staff_info_attr_title").getChildByName("attr");
        this.number = this.node.getChildByName("staff_info_attr_title").getChildByName("number");
        this.list = this.node.getChildByName("source_list");

        this.equip_list = GameData.userData.hasEquipList[this.staff_info.staff_type_id];

        this.updateUI();
    }

    updateUI() {
        this.attr.getComponent(Label).string = this.attr_name;
        let number = this.number.getComponent(Label);
        
        if(this.attr_name === this.attr_names[0]) {
            this.create_item("Basic Attack", this.attr_name) //员工基础攻击
            this.create_item("Extra Level Bonus", this.attr_name) //等级额外加成
            this.create_item("Total Enhancement Bonus", this.attr_name) //累积强化加成
            this.create_item("Office Artifact Bonus", this.attr_name) //办公神器加成
            this.create_item("Furniture Bonus", this.attr_name) //家具加成
            let num = 0
            for(let i = 0; i < this.list.children.length; i++) {
                num += this.list.children[i].getComponent(staffAttrSourceItemController).num
            }
            number.string = num.toFixed(0);
        } else if (this.attr_name === this.attr_names[1]) {
            number.string = `${this.staff_info.atk_grow}`
        } else if (this.attr_name === this.attr_names[2]) {
            number.string = `${(1/this.staff_info.atk_spd).toFixed()}` //攻击间隔时间转化为每秒攻击次数
        } else if (this.attr_name === this.attr_names[3]) {
            number.string = `${this.staff_info.range}`
        } else if (this.attr_name === this.attr_names[4]) {
            number.string = `${this.staff_info.radius}`
        } else if (this.attr_name === this.attr_names[5]) {
            this.create_item("Basic Critical Chance", this.attr_name) //基础暴击率
            this.create_item("Extra Level Bonus", this.attr_name) //等级额外加成
            this.create_item("Office Artifact Bonus", this.attr_name) //办公神器加成
            let num = 0
            for(let i = 0; i < this.list.children.length; i++) {
                num += this.list.children[i].getComponent(staffAttrSourceItemController).num
            }
            number.string = `${num.toFixed(2)}%`;
        } else if (this.attr_name === this.attr_names[6]) {
            this.create_item("Basic Critical Damage", this.attr_name) //基础暴击伤害
            this.create_item("Extra Level Bonus", this.attr_name) //等级额外加成
            this.create_item("Office Artifact Bonus", this.attr_name) //办公神器加成
            let num = 0
            for(let i = 0; i < this.list.children.length; i++) {
                num += this.list.children[i].getComponent(staffAttrSourceItemController).num
            }
            number.string = `${num.toFixed(2)}%`;
        } else if (this.attr_name === this.attr_names[7]) {
            this.create_item("Basic Continuous Attack", this.attr_name) //基础持续攻击
            this.create_item("Extra Level Bonus", this.attr_name) //等级额外加成
            this.create_item("Office Artifact Bonus", this.attr_name) //办公神器加成
            let num = 0
            for(let i = 0; i < this.list.children.length; i++) {
                num += this.list.children[i].getComponent(staffAttrSourceItemController).num
            }
            number.string = num.toString();
        } else if (this.attr_name === this.attr_names[8]) {
            this.create_item("Basic Continuous Duration", this.attr_name) //基础持续时间
            this.create_item("Office Artifact Bonus", this.attr_name) //办公神器加成
            let num = 0
            for(let i = 0; i < this.list.children.length; i++) {
                num += this.list.children[i].getComponent(staffAttrSourceItemController).num
            }
            number.string = num.toString();
        } else if (this.attr_name === this.attr_names[9]) {
            number.string = `${this.staff_info.poi_grow}`
        } else if (this.attr_name === this.attr_names[10]) {
            this.create_item("Basic Slowdown Effect", this.attr_name) //基础减速效果
            this.create_item("Extra Level Bonus", this.attr_name) //等级额外加成
            this.create_item("Office Artifact Bonus", this.attr_name) //办公神器加成
            let num = 0
            for(let i = 0; i < this.list.children.length; i++) {
                num += this.list.children[i].getComponent(staffAttrSourceItemController).num
            }
            number.string = `${num.toFixed(2)}%`;
        }else if (this.attr_name === this.attr_names[11]) {
            this.create_item("Basic Slowdown Duration", this.attr_name) //基础减速时间
            this.create_item("Extra Level Bonus", this.attr_name) //等级额外加成
            this.create_item("Office Artifact Bonus", this.attr_name) //办公神器加成
            let num = 0
            for(let i = 0; i < this.list.children.length; i++) {
                num += this.list.children[i].getComponent(staffAttrSourceItemController).num
            }
            number.string = num.toString();
        }
    }

    create_item(attr_name:string, type:string) {
        const item = instantiate(this.staff_attr_source_item);
        item.getComponent(staffAttrSourceItemController).init(this.staff_info, attr_name, type);
        item.setParent(this.list);
    }
}
