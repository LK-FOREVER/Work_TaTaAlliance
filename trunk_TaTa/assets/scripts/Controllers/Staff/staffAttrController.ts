import { _decorator, Button, Component, instantiate, Node, Prefab } from 'cc';
import { staffStatsItemController } from './staffStatsItemController';
const { ccclass, property } = _decorator;

@ccclass('staffAttrController')
export class staffAttrController extends Component {
    @property(Prefab)
    staff_stats_preview_item: Prefab = null!;
    
    staff_info: any = null!;
    mask_bg: Node = null!;
    title: Node = null!;
    content: Node = null!;

    attr_names: string[] = ["Attack", "Attack Growth", "Attack Speed", "Attack Range", "Damage Range", "Critical Chance", "Critical Damage",
                            "Continuous Attack", "Continuous Attack Duration", "Continuous Attack Growth",
                            "Slowdown Effect", "Slowdown Duration"];

    init(staff_info) {
        this.staff_info = staff_info

        this.mask_bg = this.node.getChildByName("mask_bg");
        this.title = this.node.getChildByName("attr_title").getChildByName("title");
        this.content = this.node.getChildByName("attr_list_scroll").getChildByName("view").getChildByName("content");

        this.mask_bg.on(Button.EventType.CLICK, () => {
            this.node.active = false
        })
        
        this.updateUI();
    }

    updateUI() {
        this.content.removeAllChildren();
        //攻击力
        this.create_item(this.attr_names[0]);

        //攻击成长
        this.create_item(this.attr_names[1]);

        //攻速
        this.create_item(this.attr_names[2]);

        //射程
        this.create_item(this.attr_names[3]);

        //伤害范围 群体型员工显示
        if(this.staff_info.staff_type_id === 1) {
            this.create_item(this.attr_names[4]);
        }

        //暴击率
        this.create_item(this.attr_names[5]);

        //暴击伤害
        this.create_item(this.attr_names[6]);

        //持续型员工显示
        if(this.staff_info.staff_type_id === 3) {
            //持续攻击
            this.create_item(this.attr_names[7]);

            //持续攻击时间
            this.create_item(this.attr_names[8]);

            //持续攻击成长
            this.create_item(this.attr_names[9]);
        }

        //控制型员工显示
        if(this.staff_info.staff_type_id === 2)
        {
            //移速降低
            this.create_item(this.attr_names[10]);

            //移速降低时间
            this.create_item(this.attr_names[11]);
        }
    }

    create_item(attr_name:string) {
        const item = instantiate(this.staff_stats_preview_item);
        item.getComponent(staffStatsItemController).init(this.staff_info, attr_name);
        item.setParent(this.content);
    }
}


