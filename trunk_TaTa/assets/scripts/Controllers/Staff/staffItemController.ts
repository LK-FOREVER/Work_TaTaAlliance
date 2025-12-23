import { _decorator, Component, Label, Node, SpriteFrame, Sprite, find, RichText, Button } from 'cc';
import { GameData } from '../../Common/GameData';
import { LoadUtils } from '../../Common/LoadUtils';
import { staffInfoController } from './staffInfoController';
import { TextUtils } from '../../Common/TextUtils';
import EventManager from "../../Common/EventManager";
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('staffItemController')
export class staffItemController extends Component {
    staff_info: any = null!
    staff_icon: Node = null!
    staff_item_info: Node = null!
    staff_name: Node = null!
    staff_lv: Node = null!
    staff_item_mask: Node = null!
    red_dot: Node = null!;//红点
    is_pub: boolean = null!;//是否是酒馆打开的
    staff__get_upgrade_cost: Array<any> = null!;

    protected onLoad(): void {
        EventManager.Instance.on(EventConst.REFRESH_STAFF_INFO, this.RefreshInfo, this);
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventConst.REFRESH_STAFF_INFO, this.RefreshInfo, this);
    }

    init(staff_info, is_pub) {
        this.staff_info = staff_info
        this.is_pub = is_pub;
        this.staff_icon = this.node.getChildByName("mask").getChildByName("staff_icon")
        this.staff_item_info = this.node.getChildByName("staff_item_info")
        this.staff_lv = this.staff_item_info.getChildByName("staff_lv")
        this.staff_name = this.staff_item_info.getChildByName("staff_name")
        this.staff_item_mask = this.node.getChildByName("staff_item_mask")
        this.red_dot = this.node.getChildByName("red_dot")
        if (!this.is_pub) {
            this.node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.staff.find(item => item.name == `staff_icon_bg_new_${this.staff_info.quality}`);
            if (GameData.userData.towerLv[this.staff_info.id] <= 0) {
                // 未解锁
                LoadUtils.Instance.atlasBundle.load(`staff/staff_1000/spriteFrame`, SpriteFrame, (err, sp) => {
                    this.staff_icon.getComponent(Sprite).spriteFrame = sp
                })
            } else {
                LoadUtils.Instance.atlasBundle.load(`staff/staff_${this.staff_info.id}/spriteFrame`, SpriteFrame, (err, sp) => {
                    this.staff_icon.getComponent(Sprite).spriteFrame = sp
                })
            }

            this.staff_item_mask.getChildByName("staff_unlock_btn").active = false
            this.staff_item_mask.getChildByName("piece_num").active = false
        } else {
            if (GameData.userData.towerLv[this.staff_info.id] <= 0) {
                // 未解锁
                LoadUtils.Instance.atlasBundle.load(`staff/staff_5000/spriteFrame`, SpriteFrame, (err, sp) => {
                    this.staff_icon.getComponent(Sprite).spriteFrame = sp
                })
                //将图片的scale设置为0.5*0.6
                this.staff_icon.setScale(0.5, 0.6)
            } else {
                LoadUtils.Instance.atlasBundle.load(`staff/staff_${this.staff_info.pub_id}/spriteFrame`, SpriteFrame, (err, sp) => {
                    this.staff_icon.getComponent(Sprite).spriteFrame = sp
                })
                this.staff_icon.setScale(0.7, 0.7)
            }

            // this.staff_item_mask.getChildByName("staff_unlock_btn").active = true
            // this.staff_item_mask.getChildByName("piece_num").active = true
            // this.staff_item_mask.getChildByName("unlock_text").active = true
            this.staff_item_mask.getChildByName("staff_unlock_btn").on(Button.EventType.CLICK, () => {
                // 减去5个碎片
                GameData.userData.towerDebris[this.staff_info.piece_goods_id] -= 5
                // 设置英雄等级为1级
                GameData.userData.towerLv[this.staff_info.id] = 1
                // 添加到拥有员工列表
                let data = JSON.parse(JSON.stringify(this.staff_info))
                data.introduce = ""
                GameData.userData.towerlist.push(data)
                this.RefreshInfo(this.staff_info.id);
                this.updateUI()
            })
        }

        this.staff_icon.on(Node.EventType.TOUCH_END, () => {
            const canvas = find('Canvas')
            const staff_info = GameData.userData.towerlist.find(item => item.id == this.staff_info.id)
            if (this.is_pub) {
                const pub_staff_info_view = canvas.getChildByName("pub_staff_info_view")
                pub_staff_info_view.getComponent(staffInfoController).init(staff_info, !this.is_pub, true)
                pub_staff_info_view.active = true
            } else {
                const staff_info_view = canvas.getChildByName("staff_info_view")
                staff_info_view.getComponent(staffInfoController).init(staff_info, !this.is_pub, true)
                staff_info_view.active = true
            }
        })

        this.staff_item_mask.on(Node.EventType.TOUCH_END, () => {
            if (GameData.userData.towerLv[this.staff_info.id] <= 0) return;
            const canvas = find('Canvas')
            const staff_info = TextUtils.Instance.staff__get_info.get(this.staff_info.staff_type_id).find(item => item.id == this.staff_info.id);
            if (this.is_pub) {
                const pub_staff_info_view = canvas.getChildByName("pub_staff_info_view")
                pub_staff_info_view.getComponent(staffInfoController).init(staff_info, !this.is_pub, false)
                pub_staff_info_view.active = true
            } else {
                const staff_info_view = canvas.getChildByName("staff_info_view")
                staff_info_view.getComponent(staffInfoController).init(staff_info, !this.is_pub, false)
                staff_info_view.active = true
            }
        })

        this.updateUI()
    }
    updateUI() {
        if (this.is_pub) {
            this.staff_lv.active = true
            this.staff_lv.getComponent(Label).string = `等级：${GameData.userData.towerLv[this.staff_info.id]}`
        }
        else {
            this.staff_lv.active = false
        }

        // 通过英雄等级 判断是否解锁
        this.staff_item_mask.active = GameData.userData.towerLv[this.staff_info.id] <= 0

        if (GameData.userData.towerLv[this.staff_info.id] <= 0) {
            this.staff_name.getComponent(Label).string = `???`
        } else {
            this.staff_name.getComponent(Label).string = this.staff_info.name
        }

        // 当解锁状态发生变化时，刷新头像与缩放
        if (GameData.userData.towerLv[this.staff_info.id] > 0) {
            // 已解锁：加载正式资源
            if (this.is_pub) {
                LoadUtils.Instance.atlasBundle.load(`staff/staff_${this.staff_info.pub_id}/spriteFrame`, SpriteFrame, (err, sp) => {
                    if (!err && sp) {
                        this.staff_icon.getComponent(Sprite).spriteFrame = sp
                        this.staff_icon.setScale(0.7, 0.7)
                    }
                })
            } else {
                LoadUtils.Instance.atlasBundle.load(`staff/staff_${this.staff_info.id}/spriteFrame`, SpriteFrame, (err, sp) => {
                    if (!err && sp) {
                        this.staff_icon.getComponent(Sprite).spriteFrame = sp
                        this.staff_icon.setScale(1, 1)
                    }
                })
            }
        } 

        if (this.is_pub) {
            const pieceNum = GameData.userData.towerDebris[this.staff_info.piece_goods_id]
            if (this.staff_item_mask.active) {
                this.staff_item_mask.getChildByName("piece_num").active = true
                // 获取拥有碎片数量
                this.staff_item_mask.getChildByName("piece_num").getComponent(RichText).string =
                    `<outline color=#131c26 width=2><color=${pieceNum < 5 ? "#d04c42" : "#84c03f"}>${pieceNum}</color>/5</outline>`
                // 如果碎片数量大于5 显示解锁按钮
                this.staff_item_mask.getChildByName("staff_unlock_btn").active = pieceNum >= 5
                // 显示按钮红点
                this.staff_item_mask.getChildByName("staff_unlock_btn").getChildByName("common_red_dot").active = pieceNum >= 5
                // 隐藏未解锁文字
                this.staff_item_mask.getChildByName("unlock_text").active = pieceNum < 5
                // 隐藏等级文字
                this.staff_lv.active = false
            }
            else {
                this.RefreshInfo(this.staff_info.id);
            }

            // const staff_upgrade_info = TextUtils.Instance.staff__get_upgrade_cost

            // if (GameData.userData.towerLv[this.staff_info.id] > 0 && GameData.userData.towerLv[this.staff_info.id] < staff_upgrade_info.length
            //     && GameData.userData.hasGoodsList[7] >= staff_upgrade_info.find(item => item.lv == GameData.userData.towerLv[this.staff_info.id] + 1).cost_1
            //     && GameData.userData.towerDebris[this.staff_info.piece_goods_id] >= staff_upgrade_info.find(item => item.lv == GameData.userData.towerLv[this.staff_info.id] + 1).cost_2) {
            //     this.node.getChildByName("common_red_dot").active = true
            // } else {
            //     this.node.getChildByName("common_red_dot").active = false
            // }
        }
    }




    RefreshInfo(staff_id: any) {
        if (this.is_pub) {
            // 升级消耗
            this.staff__get_upgrade_cost = TextUtils.Instance.staff__get_upgrade_cost;
            // 是否满级
            let isMax = GameData.userData.towerLv[this.staff_info.id] >= this.staff__get_upgrade_cost.length
            const staff_lv_next = GameData.userData.towerLv[this.staff_info.id] + 1
            let upgrade_cost = this.staff__get_upgrade_cost.find(item => item.lv === staff_lv_next)
            if (!isMax && !this.staff_item_mask.active) {
                if (GameData.userData.hasGoodsList[1] < upgrade_cost.cost_1 || GameData.userData.towerDebris[this.staff_info.piece_goods_id] < upgrade_cost.cost_2) {
                    this.red_dot.active = false;
                }
                else {
                    this.red_dot.active = true;
                }
            }
            else {
                this.red_dot.active = false;
            }
            this.staff_lv.getComponent(Label).string = `等级：${GameData.userData.towerLv[this.staff_info.id]}`
        }
    }
}
