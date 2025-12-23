import { _decorator, Color, Component, JsonAsset, Label, Node, resources, find,Sprite, SpriteFrame } from 'cc';
import { LoadUtils } from '../../../Common/LoadUtils';
import { GameData } from '../../../Common/GameData';
import { GameApp } from '../../../GameApp';
import { TextUtils } from '../../../Common/TextUtils';
const { ccclass, property } = _decorator;

// Utility function to wait for a given number of seconds
function waitForSeconds(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

@ccclass('inviteIconController')
export class inviteIconController extends Component {
    icon: Node = null
    name_text: Node = null
    num_text: Node = null
    goods_bg: Node = null
    towerDebris_text: Node = null
    goods_list: SpriteFrame[] = []
    common: SpriteFrame[] = []
    goods_info_list: any = null
    goods_id: number = null
    goods_num: number = null
    stuff_id: number = null
    stuff_info: any = null
    staff_type_id: number = null
    towerDebris_icon: Node = null
    light: Node = null
    Red_Ani:Node = null;
    Orange_Ani:Node = null;
    Purple_Ani:Node = null;

    Hero_Node:Node = null;
    /**
     *
     * 初始化icon
     * @param {*} goods_id
     * @param {*} num
     * @memberof inviteIconController
     */
    init(goods_id: number, goods_num: number, stuff_id: number, staff_type_id: number) {
        this.Hero_Node = this.node.getChildByName("Hero_Node");
        this.icon = this.Hero_Node.getChildByName("icon")
        this.name_text = this.Hero_Node.getChildByName("name_bg").getChildByName("name_text")
        this.num_text = this.Hero_Node.getChildByName("name_bg").getChildByName("num_text")
        this.Purple_Ani = this.node.getChildByName("Spine_Anis").getChildByName("Purple_Ani");
        this.Orange_Ani = this.node.getChildByName("Spine_Anis").getChildByName("Orange_Ani");
        this.Red_Ani = this.node.getChildByName("Spine_Anis").getChildByName("Red_Ani");
        this.goods_bg = this.node.getChildByName("goods_bg")
        this.towerDebris_text = this.Hero_Node.getChildByName("towerDebris_text")
        this.towerDebris_text.active = false;
        this.towerDebris_icon = this.Hero_Node.getChildByName("towerDebris_icon")
        this.towerDebris_icon.active = false;
        this.goods_id = goods_id
        this.goods_num = goods_num
        this.stuff_id = stuff_id
        this.staff_type_id = staff_type_id
        this.goods_list = LoadUtils.Instance.goods_list
        this.common = LoadUtils.Instance.common
        Promise.all([
            this.loadJsonAsset("data/goods__get_goods_info", JsonAsset)
        ]).then(([goods_info_list]: [JsonAsset]) => {
            this.goods_info_list = goods_info_list.json!
            this.updateUI()
        });
    }

    async Ani_Coroutine() {
        this.Red_Ani.active = false;
        this.Orange_Ani.active = false;
        this.Purple_Ani.active = false;
        this.Hero_Node.active = false;
        await waitForSeconds(0.5); // 等待1秒
        const goods_info = this.goods_info_list.find(item => item.id === this.goods_id)
        this.goods_bg.active = false;
        switch(goods_info.quality)
        {
            case 4:
                this.Purple_Ani.active = true;
                break;
            case 5:
                this.Orange_Ani.active = true;
                break;
            case 6:
                this.Red_Ani.active = true;
                break;
        }
        this.Hero_Node.active = true;
    }

    updateUI() {
        const goods_info = this.goods_info_list.find(item => item.id === this.goods_id)
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
                name_color = "#CCFF00"
                break;
            default:
                name_color = "#ffffff"
                break;
        }
        this.icon.getComponent(Sprite).spriteFrame = this.goods_list.find(item => Number(item.name) === goods_info.invite_icon)
        this.name_text.getComponent(Label).string = goods_info.name
        this.name_text.getComponent(Label).color = new Color(name_color)
        this.num_text.getComponent(Label).string = String(this.goods_num)
        this.goods_bg.getComponent(Sprite).spriteFrame = this.common.find(item => item.name === `common_goods_${goods_info.quality}`)
        this.Ani_Coroutine();

        if (this.goods_id < 2000) {
            GameData.userData.hasGoodsList[this.goods_id] += this.goods_num
        }else if (this.goods_id <= 2012 && this.goods_id >= 2001){
            //碎片
            GameData.userData.towerDebris[this.goods_id] += this.goods_num
            this.towerDebris_icon.active = true;
            resources.load("images/goods/" + (goods_info.quality + 4) + "/spriteFrame", SpriteFrame, (err, spriteFrame) =>  {
                        if (err) {
                            console.log(err);
                            return;
                        }
                       this.towerDebris_icon.getComponent(Sprite).spriteFrame =spriteFrame 
                    })
        }else {
            //完整英雄
            //不展示数量
            this.num_text.active = false
            //判断有没有该英雄，没有就添加该英雄并更新图鉴，有就转换成碎片
            let isAdd = true;
            GameData.userData.towerlist.forEach(value => {
                if (value.id === this.stuff_id) {
                    GameData.userData.towerDebris[value.piece_goods_id] += 30;
                    this.towerDebris_text.active = true;
                    isAdd = false;
                }
            });

            // 若未拥有该英雄，则添加至用户数据和奖励列表
            if (isAdd) {
                this.stuff_info = TextUtils.Instance.staff__get_info.get(this.staff_type_id).find(item=>item.id == this.stuff_id);
                GameData.userData.towerlist.push(this.stuff_info);
                GameData.userData.towerLv[this.stuff_id] = 1;
            }
        }
        find("Canvas").getChildByName("MainTop").getComponent(GameApp).updateplayerinfo();
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
    // 加载所有SpriteFrame并返回 Promise 的函数
    loadDirSpriteFrameAsset(path: string, type: any) {
        return new Promise((resolve, reject) => {
            resources.loadDir(path, type, (err, assets) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(assets);
                }
            });
        });
    };
}


