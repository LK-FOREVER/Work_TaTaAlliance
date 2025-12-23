import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import { staffItemController } from './staffItemController';
import { LoadUtils } from '../../Common/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('staffTypeItemController')
export class staffTypeItemController extends Component {
    @property(Prefab)
    staff_item: Prefab = null!;
    @property(Prefab)
    staff_item_pub: Prefab = null!;

    title_bg: Node = null!;
    staff_list: Node = null!;
    staff_type_list: any = null!;
    staff_type_id: number = null!;
    is_pub: boolean = null!;//是否是酒馆打开的

    init(staff_type_list, staff_type_id, is_pub) {
        this.staff_type_list = staff_type_list;
        this.staff_type_id = staff_type_id;
        this.is_pub = is_pub;
        // this.title_bg = this.node.getChildByName("title_bg");
        this.staff_list = this.node.getChildByName("staff_list");
        // let type_name = ""
        // switch (this.staff_type_id) {
        //     case 0:
        //         type_name = "Single"
        //         break;
        //     case 1:
        //         type_name = "Crowd"
        //         break;
        //     case 2:
        //         type_name = "Control"
        //         break;
        //     case 3:
        //         type_name = "DPS"
        //         break;
        //     default:
        //         break;
        // }
        // this.title_bg.getChildByName("title_name").getComponent(Label).string = type_name;
        // this.title_bg.getComponent(Sprite).spriteFrame = LoadUtils.Instance.staff.find(item => item.name == `staff_type_title_bg_${this.staff_type_id}`);

        // console.log(type_name," ",this.staff_type_list)

        if (this.is_pub) {
            this.staff_type_list.forEach(staff_info => {
                const staff_item_pub = instantiate(this.staff_item_pub);
                staff_item_pub.getComponent(staffItemController).init(staff_info, this.is_pub)
                staff_item_pub.setParent(this.staff_list)
            });
        } else {
            this.staff_type_list.forEach(staff_info => {
                const staff_item = instantiate(this.staff_item);
                staff_item.getComponent(staffItemController).init(staff_info, this.is_pub)
                staff_item.setParent(this.staff_list)
            });
        }
    }
}
