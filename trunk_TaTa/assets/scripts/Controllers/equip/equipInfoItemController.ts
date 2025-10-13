import { _decorator, Component, error, JsonAsset, Label, Node, resources, Sprite } from 'cc';
import { LoadUtils } from '../../Common/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('equipInfoItemController')
export class equipInfoItemController extends Component {
    equipData: any = null!;
    equip_info_list: any = null!;
    equip_info: any = null!;
    equip_info_top_bg: Node = null!;
    equip_name: Node = null!;
    equip_type: Node = null!;
    equip_goods: Node = null!;
    equip_effect: Node = null!;
    equip_effect_text_name: Node = null!;
    equip_effect_text_value: Node = null!;
    equip_arrow: Node = null!;
    /**
     *
     * @param {*} equipData 装备数据
     * @memberof equipInfoItemController
     */
    init(equipData, effectStatus = 0) {
        this.equipData = equipData
        this.equip_info_top_bg = this.node.getChildByName("equip_info_top_bg");
        this.equip_name = this.equip_info_top_bg.getChildByName("equip_name");
        this.equip_type = this.equip_info_top_bg.getChildByName("equip_type");
        this.equip_goods = this.node.getChildByName("equip_goods");
        this.equip_effect = this.node.getChildByName("equip_effect");
        this.equip_effect_text_name = this.equip_effect.getChildByName("equip_effect_text_name");
        this.equip_effect_text_value = this.equip_effect.getChildByName("equip_effect_text_value");
        this.equip_arrow = this.equip_effect_text_value.getChildByName("equip_arrow");
        resources.load("data/goods__get_equip_info", JsonAsset, (err, res: JsonAsset) => {
            if (err) {
                error(err);
            } else {
                this.equip_info_list = res.json!;
                // 拿到与装备信息的Icon相同的装备列表
                const equip_list = this.equip_info_list.filter(item => item.icon === equipData.equip_id)
                // 根据稀有度获取装备信息
                this.equip_info = equip_list.find(item => item.quality === equipData.equip_quality)
                this.updateUI();
            }
        });
        if (effectStatus === 0) {
            this.equip_arrow.active = false;
        } else {
            console.log('effectStatus', effectStatus)
            this.equip_arrow.active = true;
            this.equip_arrow.getComponent(Sprite).spriteFrame = LoadUtils.Instance.equip.find((item) => item.name === `equip_arrow_${effectStatus}`)
        }
    }
    updateUI() {
        this.equip_name.getComponent(Label).string = this.equip_info.name;
        let equip_type_name = "";
        switch (this.equip_info.equip_type_id) {
            case 0:
                equip_type_name = "单体型"
                break;
            case 1:
                equip_type_name = "群体型"
                break;
            case 2:
                equip_type_name = "控制型"
                break;
            case 3:
                equip_type_name = "持续型"
                break;
            default:
                break;
        }
        console.log('this.equipData.effect_value', this.equipData.effect_value)
        this.equip_type.getComponent(Label).string = equip_type_name;
        let effectValue = ""
        if (this.equip_info.growth_type === 2) {
            if (this.equip_info.is_percentage === 1) {
                effectValue = `${(this.equipData.effect_value * 100).toFixed(2)}%`
            } else {
                if(equip_type_name = "持续型")
                {
                     effectValue = this.equipData.effect_value.toFixed(2)
                }
                else
                {
                     effectValue = this.equipData.effect_value.toFixed(0)
                }
               
            }
        } else {
            effectValue = `${this.equipData.effect_value.toFixed(0)}`
        }

        this.equip_effect_text_name.getComponent(Label).string = `${this.equipData.effect_name}`;
        this.equip_effect_text_value.getChildByName("text_value").getComponent(Label).string = `+${effectValue}`;
        this.equip_goods.getChildByName("equip_icon").getComponent(Sprite).spriteFrame = LoadUtils.Instance.goods_list.find((item) => Number(item.name) === this.equipData.equip_id);
        this.equip_goods.getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.find((item) => item.name === `common_goods_${this.equipData.equip_quality}_new`);
        this.equip_goods.getChildByName("equip_lv").getChildByName("lv").getComponent(Label).string = this.equipData.equip_lv.toString();
    }
}


