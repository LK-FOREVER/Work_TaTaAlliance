import { _decorator, Button, Component, Event, instantiate, Node, Prefab } from 'cc';
import { equipInfoItemController } from './equipInfoItemController';
import { GameData } from '../../Common/GameData';
import { equipController } from './equipController';
const { ccclass, property } = _decorator;

@ccclass('equipInfoController')
export class equipInfoController extends Component {
    @property(Prefab)
    equip_info_item: Prefab = null;
    equip_info_container: Node = null;
    equip_info_list: Node = null;
    equip_info_btns: Node = null;
    equip_has_info: any = null;
    /**
     *
     * 初始化装备信息
     * @param {*} equip_has_info 拥有的装备信息
     * @param {*} temporaryEquipData 获得的装备临时数据 如果传入undefined 就只显示一个装备详情
     * @memberof equipInfoController
     */
    init(equip_has_info: any, temporaryEquipData?: any) {
        this.equip_has_info = equip_has_info
        this.equip_info_container = this.node.getChildByName('equip_info_container');
        this.equip_info_list = this.equip_info_container.getChildByName('equip_info_list');
        this.equip_info_btns = this.equip_info_container.getChildByName('equip_info_btns');
        this.equip_info_btns.getChildByName("btn_type_1").getChildByName("gear_btn").on(Button.EventType.CLICK, this.gear_equip_handler, this)
        this.equip_info_btns.getChildByName("btn_type_2").getChildByName("drop_btn").on(Button.EventType.CLICK, this.gear_equip_handler, this)
        this.equip_info_btns.getChildByName("btn_type_2").getChildByName("replace_btn").on(Button.EventType.CLICK, this.gear_equip_handler, this)

        this.equip_info_btns.getChildByName("btn_type_1").active = equip_has_info.equip_id === 0;
        this.equip_info_btns.getChildByName("btn_type_2").active = !this.equip_info_btns.getChildByName("btn_type_1").active;
        if (temporaryEquipData) {
            if (equip_has_info.equip_id === 0) {
                const equip_info_item = instantiate(this.equip_info_item);
                equip_info_item.getComponent(equipInfoItemController).init(temporaryEquipData)
                equip_info_item.setParent(this.equip_info_list)
            } else {
                // 两个装备的装备属性状态，0为属性无变化，1为变化上升，2为下降
                let effectStatus: number = 0
                // 如果拥有的装备效果值小于临时装备效果值
                if (equip_has_info.effect_value < temporaryEquipData.effect_value) {
                    effectStatus = 1
                } else if (equip_has_info.effect_value > temporaryEquipData.effect_value) {
                    effectStatus = 2
                } else {
                    effectStatus = 0
                }
                console.log('equip_has_info.effect_value.toFixed(2)', equip_has_info.effect_value)
                console.log('temporaryEquipData.effect_value.toFixed(2)', temporaryEquipData.effect_value)
                console.log('effectStatus', effectStatus)
                const equip_info_item1 = instantiate(this.equip_info_item);
                equip_info_item1.getComponent(equipInfoItemController).init(equip_has_info)
                equip_info_item1.setParent(this.equip_info_list)
                const equip_info_item2 = instantiate(this.equip_info_item);
                equip_info_item2.getComponent(equipInfoItemController).init(temporaryEquipData, effectStatus)
                equip_info_item2.setParent(this.equip_info_list)
            }
        } else {
            const equip_info_item = instantiate(this.equip_info_item);
            equip_info_item.getComponent(equipInfoItemController).init(equip_has_info)
            equip_info_item.setParent(this.equip_info_list)
            this.equip_info_btns.active = false
            const mask_destroy_bg = this.node.getChildByName("mask_destroy_bg")
            mask_destroy_bg.on(Node.EventType.TOUCH_END, () => {
                this.node.destroy()
            })
        }
    }
    gear_equip_handler(event: Event) {
        const target: Node = event.target
        const name = target.name
        if (name === "gear_btn" || name === "replace_btn") {
            this.node.parent.getComponent(equipController).replaceEquip()
            // 清空临时数据
            GameData.userData.temporaryEquipData = { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 }
            this.node.parent.getComponent(equipController).updateUI()
            this.node.destroy()
        } else if (name === "drop_btn") {
            // 清空临时数据
            GameData.userData.temporaryEquipData = { equip_id: 0, effect_name: "", effect_value: 0, equip_quality: 0, equip_lv: 0 }
            this.node.parent.getComponent(equipController).updateUI()
            this.node.destroy()
        }
        GameData.saveData(false);
    }
}


