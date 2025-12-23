import { _decorator, Button, Color, Component, instantiate, JsonAsset, Label, Node, Prefab, resources, sp, Sprite, tween, Vec3 } from 'cc';
import { GameData } from '../../Common/GameData';
import { LoadUtils } from '../../Common/LoadUtils';
import { Utils } from '../../Common/Utils';
import { equipInfoController } from './equipInfoController';
import { equipUpgradeController } from './equipUpgradeController';
import { TextUtils } from '../../Common/TextUtils';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { AudioManager } from "../../Managers/AudioManager";
const { ccclass, property } = _decorator;

interface IEquipment {
    equip_id: number;
    equip_quality: number;
    equip_lv: number;
}

@ccclass('equipControllers')
export class equipController extends Component {
    equip_top: Node = null;
    assets_list: Node = null;
    equip_list_container: Node = null;
    doll_machine: Node = null;
    doll_machine_lv: Node = null;
    upgrade_arrow: Node = null;
    equip_claw: Node = null;
    doll_equip: Node = null;
    click_box: Node = null;
    click_box_lv: Node = null;
    tips_text: Node = null;
    equip_bottom: Node = null;
    close_btn: Node = null;
    animationInProgress: boolean = false; // 动画是否正在进行
    isMax: boolean = false; // 是否满级
    doll_machine_upgrade_info: any = null;
    doll_machine_ratio_info: any = null;
    equip_ratio_info_1: any = null;
    equip_ratio_info_2: any = null;
    equip_position_info: any = null;
    equip_info: any = null;
    @property(Prefab)
    equip_info_view: Prefab = null;
    @property(Prefab)
    equip_upgrade_view: Prefab = null;
    equip_has_info = null;
    random_equip_type = null;
    random_equip_position = null;
    dwarf: Node = null;
    audioMgr: any; //音效
    init() {
        this.audioMgr = AudioManager.ins;
        this.equip_top = this.node.getChildByName("equip_top");
        this.assets_list = this.equip_top.getChildByName("assets_list");
        this.equip_list_container = this.node.getChildByName("equip_list_container");
        this.doll_machine = this.node.getChildByName("doll_machine");
        this.doll_machine_lv = this.doll_machine.getChildByName("doll_machine_lv");
        this.upgrade_arrow = this.doll_machine.getChildByName("upgrade_arrow");
        // this.equip_claw = this.doll_machine.getChildByName("equip_claw");
        this.doll_equip = this.doll_machine.getChildByName("doll_equip");
        this.click_box = this.doll_machine.getChildByName("click_box");
        this.click_box_lv = this.doll_machine.getChildByName("click_box_lv");
        this.tips_text = this.doll_machine.getChildByName("tips_text");
        this.equip_bottom = this.node.getChildByName("equip_bottom");
        this.close_btn = this.equip_bottom.getChildByName("close_btn");
        this.dwarf = this.doll_machine.getChildByName("dwarf");

        this.close_btn.on(Button.EventType.CLICK, this.close_handler, this)
        this.click_box.on(Node.EventType.TOUCH_END, this.falling_claw_handler, this)
        this.click_box_lv.on(Node.EventType.TOUCH_END, this.open_upgrade_handler, this)

        // 使用 Promise.all 确保资源都加载完毕后在进行后续操作
        Promise.all([
            this.loadJsonAsset("data/equip__get_doll_machine_upgrade_info", JsonAsset),
            this.loadJsonAsset("data/equip__get_doll_machine_ratio_info", JsonAsset),
            this.loadJsonAsset("data/equip__get_equip_ratio_info_1", JsonAsset),
            this.loadJsonAsset("data/equip__get_equip_ratio_info_2", JsonAsset),
            this.loadJsonAsset("data/equip__get_equip_position_info", JsonAsset),
            this.loadJsonAsset("data/goods__get_equip_info", JsonAsset),
        ]).then(([
            doll_machine_upgrade_info,
            doll_machine_ratio_info,
            equip_ratio_info_1,
            equip_ratio_info_2,
            equip_position_info,
            equip_info,
        ]: [JsonAsset, JsonAsset, JsonAsset, JsonAsset, JsonAsset, JsonAsset]
        ) => {
            // 娃娃机升级表
            this.doll_machine_upgrade_info = doll_machine_upgrade_info.json!;
            // 娃娃机稀有度概率表
            this.doll_machine_ratio_info = doll_machine_ratio_info.json!;
            // 装备第一层概率
            this.equip_ratio_info_1 = equip_ratio_info_1.json!;
            // 装备第二层概率
            this.equip_ratio_info_2 = equip_ratio_info_2.json!;
            // 装备位置表
            this.equip_position_info = equip_position_info.json!;
            // 装备表
            this.equip_info = equip_info.json!;

            // 在这里添加后续操作
            this.updateUI()
        }).catch((error) => {
            console.error('error', error);
        });
    }
    // 加载json并返回 Promise 的函数
    loadJsonAsset(path: string, type: any) {
        return new Promise((resolve, reject) => {
            resources.load(path, type, (err, res: JsonAsset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    };
    open_upgrade_handler() {
        // 创建娃娃机升级界面
        let view = this.node.getChildByName("equip_upgrade_view");
        if(view) {
            view.destroy();
        }
        const equip_upgrade_view = instantiate(this.equip_upgrade_view)
        equip_upgrade_view.getComponent(equipUpgradeController).init(this.doll_machine_upgrade_info, this.doll_machine_ratio_info)
        equip_upgrade_view.name = "equip_upgrade_view"
        equip_upgrade_view.parent = this.node
    }
    updateUI() {
        this.node.parent.getComponent(MainUIControllers).updateRedDot();
        // 是否满级
        this.isMax = GameData.userData.doll_machine_lv >= this.doll_machine_ratio_info.length
        if (this.isMax) {
            this.upgrade_arrow.active = false;
        } else {
            // 当前娃娃机升级信息
            const doll_machine_upgrade_info_current = this.doll_machine_upgrade_info.find(item => item.lv === GameData.userData.doll_machine_lv)
            // 是否可以进行升级
            const isUpgradable =
                GameData.userData.hasGoodsList[10] >= Number(doll_machine_upgrade_info_current.exp) &&
                GameData.userData.doll_machine_lv < this.doll_machine_ratio_info.length;
            console.log('isUpgradable', isUpgradable)
            isUpgradable ? this.upgrade_arrow.active = true : this.upgrade_arrow.active = false
        }


        console.log('GameData.userData.temporaryEquipData', GameData.userData.temporaryEquipData)
        console.log('this.equip_has_info', this.equip_has_info)
        if (!this.node.getChildByName("equip_info_view") && GameData.userData.temporaryEquipData.equip_id !== 0) {
            // 创建装备信息界面
            const equip_info_view = instantiate(this.equip_info_view)
            equip_info_view.getComponent(equipInfoController).init(GameData.userData.hasEquipList[GameData.userData.random_equip_type][GameData.userData.random_equip_position], GameData.userData.temporaryEquipData)
            equip_info_view.name = "equip_info_view"
            equip_info_view.parent = this.node
        }
        this.unscheduleAllCallbacks()
        // 装备列表
        this.equip_list_container.children.forEach((child) => {
            // 根据子节点的索引找到拥有装备列表的装备，子节点的索引为装备的类型
            const equip_info_list: IEquipment[] = GameData.userData.hasEquipList[child.getSiblingIndex()]
            equip_info_list.forEach((equip_info, index) => {
                const equip_item = child.getChildByName(`equip_${index + 1}`);
                if (equip_info.equip_id !== 0) {
                    equip_item.targetOff(Node.EventType.TOUCH_END);
                    equip_item.active = true;
                    // 设置装备背景、装备图标、装备等级
                    equip_item.getComponent(Sprite).spriteFrame =
                        LoadUtils.Instance.equip.find((item) => item.name === `equip_has_bg_${equip_info.equip_quality}`);
                    equip_item.getChildByName("equip_icon").getComponent(Sprite).spriteFrame =
                        LoadUtils.Instance.goods_list.find((item) => Number(item.name) === equip_info.equip_id);
                    equip_item.getChildByName("equip_lv").getChildByName("lv").getComponent(Label).string = equip_info.equip_lv.toString();
                    equip_item.on(Node.EventType.TOUCH_END, () => {
                        // 创建装备信息界面
                        const equip_info_view = instantiate(this.equip_info_view)
                        equip_info_view.getComponent(equipInfoController).init(equip_info)
                        equip_info_view.name = "equip_info_view"
                        equip_info_view.parent = this.node
                    })
                } else {
                    equip_item.active = false;
                }
            })
        })
        // 资产数量
        this.assets_list.children.forEach((child) => {
            const assets_id: string = child.name.split("_")[1];
            // 拿到资产数量
            const assets_num: number = GameData.userData.hasGoodsList[assets_id];
            child.getChildByName("num").getComponent(Label).string = assets_num.toString();
        })
        // 娃娃机等级
        this.doll_machine_lv.getComponent(Label).string = `等级${GameData.userData.doll_machine_lv}`
        // 娃娃机提示
        // const coins_num: number = GameData.userData.hasGoodsList[8];
        // if (coins_num > 0) {
        //     const color_1 = "#c3fffa"
        //     const color_2 = "#45ffc4"
        //     this.tips_text.active = true;
        //     this.schedule(() => {
        //         let tips_color = this.tips_text.getComponent(Label).color
        //         this.tips_text.getComponent(Label).color = tips_color.toCSS("#rrggbb") === color_1 ? new Color(color_2) : new Color(color_1);
        //     }, 0.5);
        // } else {
        //     this.tips_text.active = false;
        // }
        // this.doll_equip.setPosition(new Vec3(0, -430));
    }

    falling_claw_handler() {
        // 如果动画正在进行就退出
        if (this.animationInProgress) {
            return;
        }
        const coins_num: number = GameData.userData.hasGoodsList[8];
        if (coins_num <= 0) {
            Utils.create_goto_shop_tips("精钢")
            return
        }

        let id = GameData.taskData.continuousTaskId%TextUtils.Instance.task__get_continuous_task.length
        if(id == 3) {
            GameData.taskData.continueTaskContentNumList[id]++;
            EventManager.Instance.emit(EventConst.UPDATE_CONTINUOUS_TASK)
        }
        GameData.taskData.dailyTaskContentNumList[0]++;
        
        GameData.userData.hasGoodsList[8] -= 1
        GameData.userData.hasGoodsList[10] += 1
        this.generateRandomEquipment()
        this.unscheduleAllCallbacks()
        // this.tips_text.active = false;
        this.animationInProgress = true;

        // this.equip_claw.getComponent(sp.Skeleton).setAnimation(0, "grab_1", false);
        // this.equip_claw.getComponent(sp.Skeleton).setCompleteListener(() => {
          
        // });

        //锻造动画插入
        this.dwarf.getComponent(sp.Skeleton).setAnimation(0, "hit", false);
        this.audioMgr.playSound("equip_get", false);
        this.dwarf.getComponent(sp.Skeleton).setCompleteListener(() => {
            //**锻造动画回调事件
            this.animationInProgress = false;
            this.doll_equip.setPosition(new Vec3(0, -430));
            // 创建装备信息界面
            const equip_info_view = instantiate(this.equip_info_view)
            equip_info_view.getComponent(equipInfoController).init(this.equip_has_info, GameData.userData.temporaryEquipData)
            equip_info_view.parent = this.node
            this.updateUI()
            //*锻造动画回调事件**
        });

        // // 道具上升动画
        // this.scheduleOnce(() => {
        //     let tweenDuration: number = 0.30;
        //     tween(this.doll_equip).to(
        //         tweenDuration,
        //         { position: new Vec3(0, -120) }
        //     ).start();
        // }, 1.5);
        // //GameData.Instance.sendDataRequest();
        GameData.saveData(false);
    }
    // 随机装备
    generateRandomEquipment() {
        // 通过娃娃机等级计算出抓取的装备等级
        const maxLv = GameData.userData.doll_machine_lv
        const minLv = maxLv - 2 > 0 ? maxLv - 2 : 1
        // 装备等级
        const equip_lv = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
        // 在《稀有度概率表》中找到相对应的等级
        const ratio_info = this.doll_machine_ratio_info.find(item => item.lv === GameData.userData.doll_machine_lv)
        // 根据稀有度权重随机一个稀有度
        const ratio_list_str = ratio_info.ratio_list.split(",")
        const ratio_list = ratio_list_str.map(Number)
        function getRandomIndexByValueAsWeights() {
            // 计算总权重
            const totalWeight = ratio_list.reduce((acc, val) => acc + val, 0);
            // 生成一个介于 0 和 总权重之间的随机数
            const randomWeight = Math.random() * totalWeight;
            // 累积权重
            let cumulativeWeight = 0;
            // 遍历数组，找到随机数落在哪个累积权重区间内
            for (let i = 0; i < ratio_list.length; i++) {
                cumulativeWeight += ratio_list[i];
                if (randomWeight <= cumulativeWeight) {
                    return i + 1; // 返回找到的下标
                }
            }
        }
        // 随机一个品质
        const equip_quality = getRandomIndexByValueAsWeights()
        // 根据权重获取第一层概率随机的group_id
        const random_ratio_info_1_group_id = Utils.getRandomItemByWeight(this.equip_ratio_info_1).group_id
        // 根据group_id获取第二层概率对应的数据组列表
        const random_group_reward_list = this.equip_ratio_info_2.filter(item => item.group_id === random_ratio_info_1_group_id)
        // 将筛选出的组列表根据权重获取随机奖励
        const random_reward_data = Utils.getRandomItemByWeight(random_group_reward_list)
        // 拿到装备id
        const random_equip_id = random_reward_data.equip_id
        // 拿到与装备信息的Icon相同的装备列表
        const equip_list = this.equip_info.filter(item => item.icon === random_equip_id)
        // 根据稀有度获取装备信息
        const equip_info = equip_list.find(item => item.quality === equip_quality)
        // 根据装备等级计算加成效果
        let effect_num = 0
        if (equip_info.growth_type === 1) {
            effect_num = equip_info.effect_lv1_val * Math.pow(equip_info.growth_num, equip_lv - 1)
        } else if (equip_info.growth_type === 2) {
            effect_num = equip_info.effect_lv1_val + (equip_info.growth_num * (equip_lv - 1))
        }
        console.log('effect_num', effect_num)
        this.doll_equip.getComponent(Sprite).spriteFrame = LoadUtils.Instance.goods_list.find(item => Number(item.name) === equip_info.icon)
        // 拥有的装备
        this.equip_has_info = GameData.userData.hasEquipList[equip_info.equip_type_id][equip_info.equip_position - 1]
        this.random_equip_type = equip_info.equip_type_id;
        this.random_equip_position = equip_info.equip_position - 1;
        // 先保存到临时数据
        GameData.userData.temporaryEquipData.equip_id = equip_info.icon
        GameData.userData.temporaryEquipData.equip_quality = equip_quality
        GameData.userData.temporaryEquipData.equip_lv = equip_lv
        GameData.userData.temporaryEquipData.effect_name = equip_info.effect_name
        GameData.userData.temporaryEquipData.effect_value = effect_num
        // 将拥有的装备也保存到临时数据
        // GameData.userData.temporaryHasEquipData = this.equip_has_info
        GameData.userData.random_equip_type = this.random_equip_type
        GameData.userData.random_equip_position = this.random_equip_position
    }
    replaceEquip() {
        // 将临时装备替换到对应位置
        GameData.userData.hasEquipList[GameData.userData.random_equip_type][GameData.userData.random_equip_position] =
            JSON.parse(JSON.stringify(GameData.userData.temporaryEquipData))
    }

    close_handler() {
        this.node.active = false;
    }

    add_goods_8(a) {
        console.log('a', a)
        console.log('num', Number(a.string))
        if (!Number.isNaN(Number(a.string))) {
            GameData.userData.hasGoodsList[8] += Number(a.string)
            this.updateUI()
        }
    }
    add_goods_10(a) {
        console.log('a', a)
        console.log('num', Number(a.string))
        if (!Number.isNaN(Number(a.string))) {
            GameData.userData.hasGoodsList[10] += Number(a.string)
            this.updateUI()
        }
    }
}