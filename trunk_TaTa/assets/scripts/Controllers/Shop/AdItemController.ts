import { _decorator, Button, Color, Component, find, Label, Material, native, Node, resources, Sprite, SpriteFrame, sys } from 'cc';
import { GameData } from '../../Common/GameData';
import { TextUtils } from '../../Common/TextUtils';
import { ShowGoods } from '../../Common/ShowGoods';
import { GameApp } from '../../GameApp';
import { MainUIControllers } from '../MainUI/MainUIControllers';
import { EventConst } from '../../Common/EventConst';
import EventManager from '../../Common/EventManager';
const { ccclass, property } = _decorator;

@ccclass('AdItemController')
export class AdItemController extends Component {
    info:any

    onLoad(): void {
        EventManager.Instance.on(EventConst.PLAY_AD,this.play_ad,this)
    }

    onDestroy(): void {
        EventManager.Instance.off(EventConst.PLAY_AD,this.play_ad,this)
    }

    init(info:any) {
        this.info = info;
        const bg = this.node.getChildByName("icon").getChildByName("bg").getComponent(Sprite);
        const quality = TextUtils.Instance.goods__get_goods_info.find(item => item.id == info.good_id).quality
        resources.load("textures/common/common_goods_" + quality + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return;
            }
            bg.spriteFrame = spriteFrame;
        })
        const icon = this.node.getChildByName("icon").getChildByName("icon").getComponent(Sprite);
        resources.load("images/goods/" + info.good_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err);
                return
            }
            icon.spriteFrame = spriteFrame;
        })
        this.node.getChildByName("name").getComponent(Label).string = TextUtils.Instance.goods__get_goods_info.find(item => item.id == info.good_id).english_name;
        this.node.getChildByName("icon").getChildByName("number").getComponent(Label).string = info.num.toString();
        const label = this.node.getChildByName("bottom").getChildByName("Label")
        const ad_icon = this.node.getChildByName("bottom").getChildByName("ad_icon")
        const red_dot = this.node.getChildByName("common_red_dot");
        const item_bg = this.node.getChildByName("bg").getComponent(Sprite);
        const bottom = this.node.getChildByName("bottom").getComponent(Sprite);
        if(GameData.userData.ad_item_times[this.info.id] > 0) {
            item_bg.grayscale = false;
            bottom.grayscale = false;
            bg.grayscale = false;
            icon.grayscale = false;
            red_dot.active = true;
            ad_icon.active = true;
            label.getComponent(Label).string = `Free(${GameData.userData.ad_item_times[info.id]}/${info.times})`;
            label.getComponent(Label).color = new Color("#3C2D19")
            label.setPosition(36,0)
        } else {
            item_bg.grayscale = true;
            bottom.grayscale = true;
            bg.grayscale = true;
            icon.grayscale = true;
            red_dot.active = false;
            ad_icon.active = false;
            label.getComponent(Label).string = `Sold Out`;
            label.getComponent(Label).color = new Color("#d04c42")
            label.setPosition(0,0)
        }
        this.node.on(Button.EventType.CLICK,this.buy,this);
    }

    buy() {
        if(GameData.userData.ad_item_times[this.info.id] <= 0) return;

        if(sys.os === sys.OS.ANDROID || sys.isNative) {
            if(!GameData.userData.has_monthly_plan_2) {
                //native.bridge.sendToNative('play_ad',`${this.info.id}`);
                this.get_reward();
            } else {
                this.get_reward();
            }
        } else {
            this.get_reward();
        }
    }

    play_ad(id:string) {
        console.log("Good",id,this.info.id)

        if (id != `${this.info.id}`) return;
        console.log("curGood",id,this.info.id)
        this.get_reward();
    }

    async get_reward() {
        let id = GameData.taskData.continuousTaskId%TextUtils.Instance.task__get_continuous_task.length
        if(id == 2) {
            GameData.taskData.continueTaskContentNumList[id]++;
            EventManager.Instance.emit(EventConst.UPDATE_CONTINUOUS_TASK)
        }
        GameData.taskData.dailyTaskContentNumList[1]++;

        GameData.userData.ad_item_times[this.info.id]--;

        const reward = [
            {
                reward:this.info.good_id,
                number:this.info.num 
            }
        ]
        await ShowGoods.init(reward);
        //GameData.Instance.sendDataRequest();
        this.init(this.info);
        find("Canvas").getComponent(MainUIControllers).updateRedDot();
        find("Canvas").getChildByName("MainTop").getComponent(GameApp).updateplayerinfo();
    }
}
