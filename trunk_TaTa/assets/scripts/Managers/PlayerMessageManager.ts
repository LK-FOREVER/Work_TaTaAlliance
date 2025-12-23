import { _decorator, Component, Node, NodeEventType, director, find, resources, JsonAsset, error, Label, Prefab, instantiate, Button, Sprite } from 'cc';
import EventManager from '../Common/EventManager';
import { EventConst } from '../Common/EventConst';
import { TextUtils } from '../Common/TextUtils';
import { player_icon } from "../Controllers/promotion/player_icon";
import { GameData } from '../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('PlayerMessageManager')
export class PlayerMessageManager extends Component {

    @property(Prefab)
    player_icon_prefab: Prefab = null;

    icon_container: Node = null;

    using_button: Node = null;

    head_icon: Node = null;

    change_name: Node = null;

    head_icon_name: string = null;

    protected onLoad(): void {
        EventManager.Instance.on(EventConst.PLAYER_ICON_SELECT, this.reset_icons, this);
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.PLAYER_ICON_SELECT, this.reset_icons, this);
    }

    start() {

        this.icon_container = this.node.getChildByName("choose_view").getChildByName("mask").getChildByName("content");
        this.using_button = this.node.getChildByName("using_button");
        this.change_name = this.node.getChildByName("change_name");
        this.change_name.on(NodeEventType.TOUCH_END, () => {
            find("Canvas").getChildByName("change_name_box").active = true;
        });
        this.using_button.on(Button.EventType.CLICK, () => {
            this.set_player_icon();
        });
        this.head_icon = this.node.getChildByName("head_icon");
        this.head_icon.getComponent(player_icon).setIconContent(GameData.userData.head_icon + "");
        this.clear_icons();
        this.instantiate_icons();
        this.set_user_name();
        this.set_user_promotion();
    }

    // 设置玩家头像
    set_player_icon() {
        GameData.userData.head_icon = parseInt(this.head_icon_name);
        this.head_icon = this.node.getChildByName("head_icon");
        this.head_icon.getComponent(player_icon).setIconContent(GameData.userData.head_icon + "");
        this.set_using_button_interactable(false);
        EventManager.Instance.emit(EventConst.PLAYER_ICON_CHANGE);
        GameData.saveData(false);
    }

    set_user_promotion() {
        const user_name = GameData.userData.career;
        resources.load('data/promotion__get_promotion_info', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            const jsonData = res.json!;
            jsonData.forEach(item => {
                // 拿到当前职位所对应的信息
                if (item.id === GameData.userData.career) {
                    this.node.getChildByName("user_promotion_lv").getComponent(Label).string = item.position_lv_name
                }
            });
        })
    }

    set_user_name() {
        const user_name = GameData.userData.nickName_InGame;
        const user_name_label = this.node.getChildByName("user_name").getComponent(Label);
        user_name_label.string = user_name;
    }

    clear_icons() {
        // 清空icon_container中的所有子节点
        this.icon_container = this.node.getChildByName("choose_view").getChildByName("mask").getChildByName("content");
        if (this.icon_container.children.length > 0) {
            this.icon_container.removeAllChildren();
        }
    }

    instantiate_icons() {
        const staff_list = TextUtils.Instance.staff__all_infos;
        const towerlist = GameData.userData.towerlist;
        const tower_ids = towerlist.map((item: any) => item.id);
        // 先生成towerlist中有的
        for (const staff of staff_list) {
            if (tower_ids.indexOf(staff.id) !== -1) {
                const icon = instantiate(this.player_icon_prefab);
                icon.name = staff.id.toString();
                const newId = '6' + staff.id.toString().slice(1);
                icon.getComponent(player_icon).setIconContent(newId);
                icon.getComponent(player_icon).setlocked(false);
                this.icon_container.addChild(icon);
            }
        }

        // 再生成剩下的
        staff_list
            .filter((staff: any) => tower_ids.indexOf(staff.id) === -1)
            .forEach((staff: any) => {
                const icon = instantiate(this.player_icon_prefab);
                icon.name = staff.id.toString();
                const newId = '6' + staff.id.toString().slice(1);
                icon.getComponent(player_icon).setIconContent(newId);
                icon.getComponent(player_icon).setlocked(true);
                this.icon_container.addChild(icon);
            });
    }

    reset_icons(current_icon: any) {
        // 隐藏所有icon的icon_choose
        this.icon_container.children.forEach(child => {
            const iconComp = child.getComponent(player_icon);
            if (iconComp) {
                iconComp.icon_choose.active = false;
            }
        });
        const newId = '6' + current_icon.toString().slice(1);
        this.head_icon_name = newId;
        this.icon_container.getChildByName(current_icon).getComponent(player_icon).icon_choose.active = true;

        if (GameData.userData.head_icon == parseInt(newId)) {
            this.set_using_button_interactable(false);
        }
        else {
            this.set_using_button_interactable(true);
        }
    }

    set_using_button_interactable(interactable: boolean) {
        this.using_button.getComponent(Button).interactable = interactable;
        this.using_button.getComponent(Sprite).grayscale = !interactable;
        this.using_button.getChildByName("Label").getComponent(Label).string = interactable ? "使用" : "使用中";
    }
}


