import { _decorator, Button, Component, instantiate, Toggle, Node, Prefab, Layout } from 'cc';
import { staffTypeItemController } from './staffTypeItemController';
import { TextUtils } from '../../Common/TextUtils';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { enemyTypeItemController } from '../Enemy/enemyTypeItemController';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('staffController')
export class staffController extends Component {
    @property(Prefab)
    staff_type_item: Prefab = null!;
    @property(Prefab)
    enemy_type_item: Prefab = null!;

    staff_bottom: Node = null!;
    staff_list_scroll_container_1: Node = null!;
    staff_list_scroll_container_2: Node = null!;
    desc_btn: Node = null!;
    close_btn: Node = null!;
    page_1:Node = null;
    page_2:Node = null;
    staff__get_info: Map<number, any> = null!;
    chapter__get_enemy_info: Map<number, any> = null!;
    staff__get_lv_add: any = null!;
    staff__get_red_staff_effect: any = null!;
    staff__get_upgrade_cost: any = null!;

    cur_idx:number = 0
    is_call_back:boolean = true;
    is_pub:boolean = false;//是否是酒馆打开的

    init(is_pub:any) {
        this.is_pub = is_pub;
        this.staff_bottom = this.node.getChildByName("staff_bottom");
        this.staff_list_scroll_container_1 = this.node.getChildByName("page_container").getChildByName("page_1").getChildByName("staff_list_scroll").getChildByName("view").getChildByName("content");
        this.staff_list_scroll_container_2 = this.node.getChildByName("page_container").getChildByName("page_2").getChildByName("staff_list_scroll").getChildByName("view").getChildByName("content");

        this.desc_btn = this.node.getChildByName("desc_btn");
        this.close_btn = this.staff_bottom.getChildByName("close_btn");
        const page_container = this.node.getChildByName("page_container");
        this.page_1 = page_container.getChildByName("page_1");
        this.page_2 = page_container.getChildByName("page_2");
        this.page_2.active = false;
        this.node.getChildByName("toggle_container").getChildByName("toggle_1").getComponent(Toggle).isChecked = true;

        this.close_btn.on(Button.EventType.CLICK, this.close_handler, this)
        // this.desc_btn.on(Button.EventType.CLICK, this.desc_handler, this)

        this.staff__get_info = TextUtils.Instance.staff__get_info;
        this.chapter__get_enemy_info = TextUtils.Instance.chapter__get_enemy_info;
        this.updateUI(this.is_pub);
    }

    updateUI(is_pub:any) {
        this.is_pub = is_pub;
        if(this.is_pub){
            this.initPage1();
            this.node.getChildByName("toggle_container").getChildByName("toggle_1").active = false;
            this.node.getChildByName("toggle_container").getChildByName("toggle_2").active = false;
        }else{
            this.initPage1();
            this.initPage2();
        }
    }

    initPage1(){
        // console.log("staff_list_scroll_container_1:" + this.staff_list_scroll_container_1);
        // if(this.staff_list_scroll_container_1 == null)
        // {
        //     this.staff_list_scroll_container_1 = this.node.getChildByName("page_container").getChildByName("page_1").getChildByName("staff_list_scroll").getChildByName("view").getChildByName("content");
        // }
        this.staff_list_scroll_container_1.removeAllChildren()
        const staff_type_item = instantiate(this.staff_type_item);
        this.staff__get_info.forEach((value, key) => {
            staff_type_item.getComponent(staffTypeItemController).init(value, key, this.is_pub)
            staff_type_item.setParent(this.staff_list_scroll_container_1)
        });

        //调整staff_type_item的位置
        if(!this.is_pub){
            staff_type_item.getChildByName("staff_list").getComponent(Layout).spacingX = 82;
        }
    }

    initPage2(){
        this.staff_list_scroll_container_2.removeAllChildren()
        const enemy_type_item = instantiate(this.enemy_type_item);
        this.chapter__get_enemy_info.forEach((value, key) => {
            enemy_type_item.getComponent(enemyTypeItemController).init(value, key)
            enemy_type_item.setParent(this.staff_list_scroll_container_2)
        });
    }

    public onToggleValueChanged(toggle,idx:number) {
        if(!this.is_call_back) return
        this.checkPageByIdx(idx);
    }
    
    checkPageByIdx(idx:number,is_call_back:boolean = true) {
        this.is_call_back = is_call_back;
        this.cur_idx = idx;
        if(!this.is_call_back){
            this.node.getChildByName("toggle_container").children.forEach(element=>{
                element.getComponent(Toggle).isChecked = element.getSiblingIndex() == idx
            });
        }
        this.node.getChildByName("page_container").children.forEach(element => {
            const child_index = element.getSiblingIndex()
            element.active = child_index == idx
        });
        this.is_call_back = true;
    }


    // desc_handler() {
    //     this.desc_btn.getChildByName("desc_box").active = !this.desc_btn.getChildByName("desc_box").active;
    // }

    close_handler() {
        this.node.parent.getChildByName("MainTop").getChildByName("main_top").active = true;
        this.node.parent.getComponent(MainUIControllers).updateRedDot();
        this.node.active = false;
    }
}
