import { _decorator, Button, Color, Component, instantiate, Label, Node, Prefab, RichText, sp, Sprite, v3, find, NodeEventType, color } from 'cc';
import { GameData } from '../../Common/GameData';
import { LoadUtils } from '../../Common/LoadUtils';
import { Utils } from '../../Common/Utils';
import { TextUtils } from '../../Common/TextUtils';
import { GameApp } from '../../GameApp';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { furnitureItemController } from './furnitureItemController';
const { ccclass, property } = _decorator;

@ccclass('buildUpgradeController')
export class buildUpgradeController extends Component {
    buildUpgradleInfo = null
    buildStatus = null;
    build_upgrade_close: Node = null;
    build_name: Node = null;
    build_upgrade_build_item: Node = null;
    lv_box: Node = null;
    current_lv: Node = null;
    staff_info_arrow: Node = null;
    next_lv: Node = null;
    content: Node = null;
    build_lv_item_1: Node = null;
    build_lv_item_2: Node = null;
    build_lv_item_3: Node = null;
    build_lv_item_4: Node = null;
    build_upgrade: Node = null;
    upgrade_btn: Node = null;
    upgrade_cost_1: Node = null;
    upgrade_cost_2: Node = null;
    tip_box: Node = null;
    tip_label: Node = null;
    tip_confirm_btn: Node = null;

    init(buildUpgradleInfo: any, buildStatus: any) {
        this.buildUpgradleInfo = buildUpgradleInfo;
        this.buildStatus = buildStatus;
        this.build_upgrade_build_item = this.node.getChildByName("build_upgrade_bg").getChildByName("build_upgrade_build_item");
        this.build_name = this.node.getChildByName("build_upgrade_title").getChildByName("build_name");
        this.lv_box = this.node.getChildByName("build_upgrade_lv_attr").getChildByName("lv_box");
        this.current_lv = this.lv_box.getChildByName("current_lv");
        this.next_lv = this.lv_box.getChildByName("next_lv");
        this.staff_info_arrow = this.lv_box.getChildByName("staff_info_arrow");
        this.content = this.node.getChildByName("build_upgrade_lv_attr").getChildByName("view").getChildByName("content");
        this.build_lv_item_1 = this.content.getChildByName("build_lv_item_1");
        this.build_lv_item_2 = this.content.getChildByName("build_lv_item_2");
        this.build_lv_item_3 = this.content.getChildByName("build_lv_item_3");
        this.build_lv_item_4 = this.content.getChildByName("build_lv_item_4");
        this.build_upgrade = this.node.getChildByName("build_upgrade");
        this.upgrade_btn = this.build_upgrade.getChildByName("upgrade_btn");
        this.upgrade_cost_1 = this.build_upgrade.getChildByName("upgrade_cost_1");
        this.upgrade_cost_2 = this.build_upgrade.getChildByName("upgrade_cost_2");
        this.tip_box = this.node.getChildByName("tip_box");
        this.tip_label = this.tip_box.getChildByName("container").getChildByName("Label");
        this.tip_confirm_btn = this.tip_box.getChildByName("container").getChildByName("confirm");
        this.tip_confirm_btn.on(NodeEventType.TOUCH_END, () => {
            this.tip_box.active = false;
        })
        this.build_upgrade_close = this.node.getChildByName("close_btn");
        this.build_upgrade_close.on(NodeEventType.TOUCH_END, () => {
            this.node.active = false;
        })
        this.upgrade_btn.on(Button.EventType.CLICK, this.upgrade_handler, this)
        this.updateUI();
    }

    updateUI() {
        this.update_build_name();
        this.update_build_item();
        this.update_build_lv_attr_content();
        this.update_build_upgrade();
    }

    update_build_name() {
        this.build_name.getComponent(Label).string = this.buildUpgradleInfo.build_name;
    }
    update_build_item() {
        this.build_upgrade_build_item.getComponent(Sprite).spriteFrame = LoadUtils.Instance.main_build.find((item) => item.name === this.buildUpgradleInfo.build_id + "0" + this.buildUpgradleInfo.build_lv);
        if (this.buildUpgradleInfo.build_id == "4" || this.buildUpgradleInfo.build_id == "4" || this.buildUpgradleInfo.build_id == "4" || this.buildUpgradleInfo.build_id == "4") {
            this.build_upgrade_build_item.setScale(1, 1)
        } else {
            this.build_upgrade_build_item.setScale(1, 1)
        }
    }
    update_build_lv_attr_content() {
        if (this.buildUpgradleInfo.build_lv == 1) {
            this.current_lv.getComponent(Label).string = "等级：" + this.buildUpgradleInfo.build_lv;
            this.next_lv.active = false;
            this.staff_info_arrow.active = false;
        } else {
            this.next_lv.active = true;
            this.staff_info_arrow.active = true;
            this.current_lv.getComponent(Label).string = "等级：" + (this.buildUpgradleInfo.build_lv - 1);
            this.next_lv.getComponent(Label).string = "等级：" + this.buildUpgradleInfo.build_lv; 
        }

        const build_info = TextUtils.Instance.furniture__get_furniture_info
        for (let [_, value] of build_info) {
            for (const index in value) {
                const build = value[index]
                if (build.build_id == this.buildUpgradleInfo.build_id) {
                    if (build.build_lv == 1) {
                        this.build_lv_item_1.getChildByName("build_lv_text1").getComponent(Label).string = "1级：" + build.build_effect;
                    }
                    if (build.build_lv == 2) {
                        this.build_lv_item_2.getChildByName("build_lv_text2").getComponent(Label).string = "2级：" + build.build_effect;
                    }
                    if (build.build_lv == 3) {
                        this.build_lv_item_3.getChildByName("build_lv_text3").getComponent(Label).string = "3级：" + build.build_effect;
                    }
                    if (build.build_lv == 4) {
                        this.build_lv_item_4.getChildByName("build_lv_text4").getComponent(Label).string = "4级：" + build.build_effect;
                    }
                }
            }
        }

        this.build_lv_item_1.getChildByName("build_lv_text1").getComponent(Label).color =
            this.buildUpgradleInfo.build_lv == 1 ? new Color().fromHEX("#398A16") : new Color().fromHEX("#49281D");
        this.build_lv_item_2.getChildByName("build_lv_text2").getComponent(Label).color =
            this.buildUpgradleInfo.build_lv == 2 ? new Color().fromHEX("#398A16") : new Color().fromHEX("#49281D");
        this.build_lv_item_3.getChildByName("build_lv_text3").getComponent(Label).color =
            this.buildUpgradleInfo.build_lv == 3 ? new Color().fromHEX("#398A16") : new Color().fromHEX("#49281D");
        this.build_lv_item_4.getChildByName("build_lv_text4").getComponent(Label).color =
            this.buildUpgradleInfo.build_lv == 4 ? new Color().fromHEX("#398A16") : new Color().fromHEX("#49281D");
    }
    update_build_upgrade() {
        this.build_upgrade.active = this.buildUpgradleInfo.build_lv !== 1;
        if (this.buildUpgradleInfo.build_lv == 1) {
            return;
        }

        let index = this.buildUpgradleInfo.build_id - 1;
        if (this.buildUpgradleInfo.build_lv == GameData.userData.buildList[index].build_lv) {
            this.build_upgrade.active = false;
            return;
        }
        this.upgrade_cost_1.getChildByName("num").getComponent(RichText).string = `<color=#49281D width=2>${this.buildUpgradleInfo.upgrade_cost_1}`;
        this.upgrade_cost_2.getChildByName("num").getComponent(RichText).string = `<color=#49281D width=2>${this.buildUpgradleInfo.upgrade_cost_2}`;
        if (this.buildStatus == 0) {
            if (GameData.userData.career >= this.buildUpgradleInfo.condition_career && GameData.userData.hasGoodsList[1] >= this.buildUpgradleInfo.upgrade_cost_1 && GameData.userData.hasGoodsList[2] >= this.buildUpgradleInfo.upgrade_cost_2) {
                //满足升级条件
                this.upgrade_btn.getComponent(Button).interactable = true
                this.upgrade_btn.getComponent(Sprite).grayscale = false
                this.upgrade_btn.getChildByName("common_red_dot").active = true
            }
            else {
                //金币或功勋不满足升级条件
                this.upgrade_btn.getComponent(Button).interactable = true
                this.upgrade_btn.getComponent(Sprite).grayscale = true
                this.upgrade_btn.getChildByName("common_red_dot").active = false
            }
        } else {
            console.log("buildStatus:", this.buildStatus)
            this.build_upgrade.active = false;
        }

    }

    upgrade_handler() {
        if (GameData.userData.career < this.buildUpgradleInfo.condition_career && (GameData.userData.hasGoodsList[1] < this.buildUpgradleInfo.upgrade_cost_1 || GameData.userData.hasGoodsList[2] < this.buildUpgradleInfo.upgrade_cost_2)) {
            this.tip_box.active = true;
            this.tip_label.getComponent(Label).string = "资源不足且职位未达到升级条件！"
            return;
        } else if (GameData.userData.hasGoodsList[1] < this.buildUpgradleInfo.upgrade_cost_1 || GameData.userData.hasGoodsList[2] < this.buildUpgradleInfo.upgrade_cost_2) {
            this.tip_box.active = true;
            this.tip_label.getComponent(Label).string = "资源不足！"
            return;
        } else if (GameData.userData.career < this.buildUpgradleInfo.condition_career) {
            this.tip_box.active = true;
            this.tip_label.getComponent(Label).string = "职位未达到升级条件！"
            return;
        }
        // 减少资源
        GameData.userData.hasGoodsList[1] -= this.buildUpgradleInfo.upgrade_cost_1
        GameData.userData.hasGoodsList[2] -= this.buildUpgradleInfo.upgrade_cost_2

        // 家具的加成
        this.buildUpgradleInfo.effect_data.forEach(item => {
            if (this.buildUpgradleInfo.build_lv !== 1) {
                for (const key in GameData.userData.furniture_add) {
                    if (key === item.k) GameData.userData.furniture_add[key] += item.v
                }
            }
        });
        if (this.buildUpgradleInfo.build_id == 1) {
            GameData.userData.inviteTodayAdNum += 1
            GameData.userData.inviteTodayAdLastNum += 1
        }

        // 添加建筑
        for (const key in GameData.userData.buildLvList) {
            if (key == this.buildUpgradleInfo.build_id) {
                GameData.userData.buildLvList[key].push(Number(this.buildUpgradleInfo.build_lv))
            }
        }

        // 升级后立即使用该建筑
        GameData.userData.buildList.forEach((item) => {
            if (item.buildId == this.buildUpgradleInfo.build_id) {
                item.build_lv = this.buildUpgradleInfo.build_lv
            }
        })

        // 更新建筑列表
        let buildTypeBoxList = this.node.parent.getChildByName("Furniture").getChildByName("furniture_box").getChildByName("view").getChildByName("content").children
        buildTypeBoxList.forEach((typeBoxItem) => {
            let typeBoxList = typeBoxItem.getChildByName("furniture_type_scroll").getChildByName("view").getChildByName("content").children
            typeBoxList.forEach((item) => {
                if (item) item.getComponent(furnitureItemController).updateUI()
            })
        })

        // 更新主界面建筑
        let Canvas = find("Canvas")
        Canvas.getComponent(MainUIControllers).updateBuild()
        Canvas.getComponent(MainUIControllers).updateRedDot()

        // 更新资源UI
        this.updateUI()
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();

        GameData.saveData(false);
    }
}


