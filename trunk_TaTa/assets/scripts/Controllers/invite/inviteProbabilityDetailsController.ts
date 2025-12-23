import { _decorator, Button, Color, Component, instantiate, JsonAsset, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { LoadUtils } from '../../Common/LoadUtils';
const { ccclass, property } = _decorator;

interface details_info {
    goods_info: any;
    goods_num: number;
}
@ccclass('inviteProbabilityDetailsController')
export class inviteProbabilityDetailsController extends Component {
    recruit_type_show_info: any = null
    goods_info_list: any = null
    recruit_ratio_show: any = null
    @property(Prefab)
    invite_probability_item: Prefab = null
    @property(Prefab)
    invite_probability_staff_item: Prefab = null
    probability_scroll_content: Node = null
    invite_close: Node = null
    goods_list: SpriteFrame[] = []
    common: SpriteFrame[] = []
    details_type = {
        1: [],
        2: [],
        3: [],
    }
    initUI(recruit_type_show_info, recruit_ratio_show) {
        this.goods_list = LoadUtils.Instance.goods_list
        this.common = LoadUtils.Instance.common
        this.probability_scroll_content = this.node.getChildByName("bg").getChildByName("probability_scroll").getChildByName("view").getChildByName("content");
        this.invite_close = this.node.getChildByName("bg").getChildByName("invite_close")
        this.recruit_type_show_info = recruit_type_show_info;
        this.recruit_ratio_show = recruit_ratio_show;

        this.invite_close.on(Button.EventType.CLICK, () => {
            this.node.destroy()
        })

        resources.load("data/goods__get_goods_info", JsonAsset, (err, res: JsonAsset) => {
            this.goods_info_list = res.json!
            this.updateUI();
        });
    }
    updateUI() {
        this.recruit_type_show_info.forEach((recruit_type) => {
            if (recruit_type.group_id === 1) {
                this.details_type[1].push(recruit_type)
            } else if (recruit_type.group_id === 2) {
                this.details_type[2].push(recruit_type)
            } else if (recruit_type.group_id === 3) {
                this.details_type[3].push(recruit_type)
            }
        })
        for (const key in this.details_type) {
            const invite_probability_item = instantiate(this.invite_probability_item);
            invite_probability_item.setParent(this.probability_scroll_content)
            console.log('details_type[key]', this.details_type[key])
            const invite_details_title = invite_probability_item.getChildByName("invite_details_title")
            const title = invite_probability_item.getChildByName("invite_details_title").getChildByName("title")
            const probability = invite_probability_item.getChildByName("invite_details_title").getChildByName("probability")
            title.getComponent(Label).string = this.recruit_ratio_show[Number(key) - 1].english_name
            probability.getComponent(Label).string = this.recruit_ratio_show[Number(key) - 1].ratio_str
            let title_sprite_name = "invite_details_title_orange"
            switch (this.recruit_ratio_show[Number(key) - 1].english_name) {
                case "Other":
                    title_sprite_name = "invite_details_title_purple"
                    break;
                case "Purple Staff":
                    title_sprite_name = "invite_details_title_purple"
                    break;
                case "Orange Staff":
                    title_sprite_name = "invite_details_title_orange"
                    break;
                case "Red Staff":
                    title_sprite_name = "invite_details_title_red"
                    break;
                default:
                    break;
            }

            resources.load(`textures/invite/${title_sprite_name}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                invite_details_title.getComponent(Sprite).spriteFrame = spriteFrame
            });
            this.details_type[key].forEach(details_info => {
                const invite_probability_staff_item = instantiate(this.invite_probability_staff_item);
                invite_probability_staff_item.setParent(invite_probability_item.getChildByName("invite_probability_staff_list"))

                const goods_info = this.goods_info_list.find(item => item.id == details_info.goods_id)
                let name_color: string = "";
                switch (goods_info.quality) {
                    case 3:
                        name_color = "#7fb8ff"
                        break;
                    case 4:
                        name_color = "#bf7fff"
                        break;
                    case 5:
                        name_color = "#f2b230"
                        break;
                    case 6:
                        name_color = "#f23030"
                        break;
                    default:
                        name_color = "#ffffff"
                        break;
                }
                invite_probability_staff_item.getChildByName("employee").getComponent(Sprite).spriteFrame = this.goods_list.find(item => Number(item.name) === goods_info.icon)
                invite_probability_staff_item.getChildByName("employee_name_text").getComponent(Label).string = goods_info.english_name
                invite_probability_staff_item.getChildByName("employee_name_text").getComponent(Label).color = new Color(name_color)
                invite_probability_staff_item.getChildByName("num_text").getComponent(Label).string = String(details_info.number)
                invite_probability_staff_item.getChildByName("employee_bg").getComponent(Sprite).spriteFrame = this.common.find(item => item.name === `common_goods_${goods_info.quality}`)
            });
        }
    }
}


