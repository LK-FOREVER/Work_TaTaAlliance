import { _decorator, Button, Color, Component, find, Label, Node, Sprite } from 'cc';
import { GameData } from '../../Common/GameData';
import { equipController } from './equipController';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { AudioManager } from "../../Managers/AudioManager";
const { ccclass, property } = _decorator;

@ccclass('equipUpgradeController')
export class equipUpgradeController extends Component {
    doll_machine_upgrade_info: any = null!;
    doll_machine_upgrade_info_current: any = null!;
    doll_machine_upgrade_info_next: any = null!;
    doll_machine_ratio_info: any = null!;
    isUpgradable: boolean = null!;
    isMax: boolean = null!;
    invite_close: Node = null!;
    upgrade_container: Node = null!;
    top_text: Node = null!;
    current_level: Node = null!;
    next_level: Node = null!;
    ratio_list_container: Node = null!;
    upgrade_assets: Node = null!;
    upgrade_btn: Node = null!;
    audioMgr :any = null!;
    /**
     * @param {*} doll_machine_upgrade_info 娃娃机升级表
     * @param {*} doll_machine_ratio_info 稀有度概率表
     * @memberof equipUpgradeController
     */
    init(doll_machine_upgrade_info: any, doll_machine_ratio_info: any) {
        this.doll_machine_upgrade_info = doll_machine_upgrade_info
        this.doll_machine_ratio_info = doll_machine_ratio_info
        this.invite_close = this.node.getChildByName("invite_close")
        this.upgrade_container = this.node.getChildByName("upgrade_container")
        this.top_text = this.upgrade_container.getChildByName("top_text")
        this.current_level = this.top_text.getChildByName("current_level")
        this.next_level = this.top_text.getChildByName("next_level")
        this.ratio_list_container = this.upgrade_container.getChildByName("ratio_list_container")
        this.upgrade_assets = this.upgrade_container.getChildByName("upgrade_assets")
        this.upgrade_btn = this.upgrade_container.getChildByName("upgrade_btn")

        this.invite_close.on(Button.EventType.CLICK, () => { this.node.destroy() })
        this.upgrade_btn.on(Button.EventType.CLICK, this.upgrade_handler, this)

        this.audioMgr = AudioManager.ins;

        this.updateUI()
    }
    updateUI() {
        this.isMax = GameData.userData.doll_machine_lv >= this.doll_machine_ratio_info.length
        // 当前娃娃机升级信息
        this.doll_machine_upgrade_info_current = this.doll_machine_upgrade_info.find(item => item.lv === GameData.userData.doll_machine_lv)
        // 下级娃娃机升级信息
        this.doll_machine_upgrade_info_next = this.doll_machine_upgrade_info.find(item => item.lv === GameData.userData.doll_machine_lv + 1)
        // 在《稀有度概率表》中找到相对应的等级
        const ratio_info_current = this.doll_machine_ratio_info.find(item => item.lv === GameData.userData.doll_machine_lv)
        const ratio_info_next = this.doll_machine_ratio_info.find(item => item.lv === GameData.userData.doll_machine_lv + 1)

        const calculateRatiosAsPercentages = (ratioString: string): string[] => {
            // 将字符串转换为数字数组
            const ratios = ratioString.split(',').map(Number);

            // 计算总和
            const total = ratios.reduce((acc, curr) => acc + curr, 0);

            // 计算每个数据的百分比
            const percentages = ratios.map(ratio =>
                (ratio / total * 100).toFixed(2) // 乘以100并保留两位小数
            );

            // 转换为数字以便后续计算
            const percentagesAsNumbers = percentages.map(p => parseFloat(p));

            // 计算百分比总和
            const totalPercentage = percentagesAsNumbers.reduce((acc, curr) => acc + curr, 0);

            // 调整百分比，确保总和为100%
            let adjustedPercentages = [];
            if (totalPercentage < 100) {
                // 分配剩余的百分比
                const remaining = 100 - totalPercentage;
                const increment = remaining / percentages.length;
                adjustedPercentages = percentagesAsNumbers.map(p => (p + increment).toFixed(2));
            } else if (totalPercentage > 100) {
                // 减去多余的百分比
                const excess = totalPercentage - 100;
                const decrement = excess / percentages.length;
                adjustedPercentages = percentagesAsNumbers.map(p => (p - decrement).toFixed(2));
            } else {
                adjustedPercentages = percentagesAsNumbers;
            }

            // 添加百分号
            const percentagesWithSign = adjustedPercentages.map(percentage => `${percentage}%`);

            return percentagesWithSign;
        }

        const percentages_current = calculateRatiosAsPercentages(ratio_info_current.ratio_list);
        console.log(percentages_current);
        const percentages_next = ratio_info_next ? calculateRatiosAsPercentages(ratio_info_next.ratio_list) : ["", "", "", "", "", "",];
        console.log(percentages_next);

        this.ratio_list_container.children.forEach((item, index) => {
            item.getChildByName("now_probability").getChildByName("probability_text").getComponent(Label).string = percentages_current[index]
            item.getChildByName("next_probability").getChildByName("probability_text").getComponent(Label).string = percentages_next[index]
        })

        if (this.isMax) {
            this.isUpgradable = false;
            this.next_level.getComponent(Label).string = "满级"
            this.upgrade_assets.getChildByName("num").getComponent(Label).string = "满级"
        } else {
            // 是否可以进行升级
            this.isUpgradable =
                GameData.userData.hasGoodsList[10] >= Number(this.doll_machine_upgrade_info_current.exp) &&
                GameData.userData.doll_machine_lv < this.doll_machine_ratio_info.length;
            this.next_level.getComponent(Label).string = (GameData.userData.doll_machine_lv + 1).toString()
            this.upgrade_assets.getChildByName("num").getComponent(Label).string = this.doll_machine_upgrade_info_current.exp
        }
        this.upgrade_btn.getComponent(Button).interactable = this.isUpgradable
        this.upgrade_btn.getComponent(Sprite).grayscale = !this.isUpgradable
        this.upgrade_btn.getChildByName("common_red_dot").active = this.isUpgradable
        this.current_level.getComponent(Label).string = GameData.userData.doll_machine_lv.toString()
        this.upgrade_assets.getChildByName("num").getComponent(Label).color = this.isUpgradable ? new Color("#84C03F") : new Color("#d04c42")
    }
    upgrade_handler() {
        this.audioMgr.playSound("equip_up_lv", false);
        GameData.userData.doll_machine_lv += 1
        GameData.userData.hasGoodsList[10] -= Number(this.doll_machine_upgrade_info_current.exp)
        this.updateUI()
        this.node.parent.getComponent(equipController).updateUI()
        find("Canvas").getComponent(MainUIControllers).updateRedDot()
        GameData.saveData(false);
    }
}
