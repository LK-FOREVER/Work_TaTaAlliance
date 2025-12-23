import { _decorator, Button, Component, error, find, instantiate, JsonAsset, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;
import { AnyPos } from '../../Common/AnyPos';
import { GameData } from '../../Common/GameData';
import { BoxRewardControllers } from './BoxRewardControllers';
import { TextUtils } from '../../Common/TextUtils';
import { BattleManager } from '../../Managers/BattleManager';
import { GameApp } from "../../GameApp";

@ccclass('BattleResultControllers')
export class BattleResultControllers extends Component {
    mask_bg: Node;

    baserewardData: any[];
    radiorewardData: any[];
    radio_data: any[] = [];
    desc_time: Node;
    second: number = 4;
    start() {
        this.mask_bg = this.node.getChildByName("mask_bg")//.getComponent(AnyPos)
        this.mask_bg.on(Button.EventType.CLICK, this.close, this);
        this.getChapterBaseRewardInfo();
        if (!GameData.userData.isEndlessBattleScene) {
            this.getChapterRadioRewardInfo();
        }
        this.desc_time = this.node.getChildByName("time");
        this.schedule(function () {
            this.countdown();
        }, 1);
    }

    close() {
        find("Canvas").getComponent(BattleManager).toNextChapter();
        this.node.active = false;
        this.node.destroy();
    }
    //倒计时
    countdown() {
        if (this.second === 0) {
            this.close();
        } else {
            this.second--
            this.desc_time.getComponent(Label).string = this.second + ''
        }

    }

    // 关卡胜利奖励
    getChapterBaseRewardInfo() {
        this.baserewardData = TextUtils.Instance.chapter__get_base_reward;
        if (!GameData.userData.isEndlessBattleScene) {
            this.setBaseReward();
        }
        // else
        // {
        //     this.setBaseReward();
        // }
        
    }
    // 关卡宝箱奖励
    getChapterRadioRewardInfo() {
        this.radiorewardData = TextUtils.Instance.chapter__get_radio_reward;
        this.setRadioReward();
    }
    //基础奖励
    setBaseReward() {
        const base_data = this.baserewardData[GameData.userData.chapter - 2][GameData.userData.chapter - 1]
        this.initBaseRewards(base_data);
    }
    
    setEndlessAward()
    {
        const base_data = this.baserewardData[GameData.userData.endlessChapter - 2][GameData.userData.endlessChapter - 1]
        this.initBaseRewards(base_data);
    }

    //随机奖励
    setRadioReward() {
        let chapter = GameData.userData.chapter - 1;

        for (const key in this.radiorewardData) {
            const radio_data = this.radiorewardData[key][chapter];
            if (radio_data) {
                if (radio_data.chapter == chapter) {
                    this.radio_data.push(radio_data);
                }
            }
        }
        // 通过权重大小随机获取
        function getRandomItem(obj: object) {
            // 计算总权重
            let totalWeight: number = 0
            for (const key in obj) {
                totalWeight += obj[key].radio
            }

            // 生成一个随机数，表示选择的概率
            const randomValue = Math.random() * totalWeight;

            // 根据随机数选择对应的标识
            let cumulativeWeight = 0;
            for (const key in obj) {
                cumulativeWeight += obj[key].radio
                if (randomValue <= cumulativeWeight) {
                    return obj[key]
                }
            }

            // 如果由于浮点数运算精度问题未选择到任何标识，返回最后一个标识
            return obj[Object.keys(obj).length - 1]
        }
        const randomItem: object = getRandomItem(this.radio_data);
        // console.log("this.radio_data",this.radio_data);

        this.initReward(randomItem);
        // console.log('随机奖励',randomItem);
    }

    initBaseRewards(data) {
        this.initBaseReward(1, data.gold_coin_num)
        this.initBaseReward(11, data.crystal_num)
        this.initBaseReward(2, data.performance_num)
    }

    initBaseReward(id: number, num: number) {
        resources.load("prefabs/battle/BaseIcon", Prefab, (err, prefab) => {
            let reward_icon = instantiate(prefab);
            this.node.getChildByName('reward_bg').addChild(reward_icon);
            let bg = reward_icon.getChildByName('bg').getComponent(Sprite);
            // let quality = TextUtils.Instance.goods__get_goods_info.find(item=>item.id == id).quality
            resources.load("textures/common/common_avatar_bg_new/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                bg.spriteFrame = spriteFrame;
            })
            let icon = reward_icon.getChildByName('icon').getComponent(Sprite);
            resources.load("images/goods/" + id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                icon.spriteFrame = spriteFrame;
            })
            let reward_num = reward_icon.getChildByName('number').getComponent(Label);
            reward_num.string = num.toString();
        });
        GameData.userData.hasGoodsList[id] += num;
        let MainTop = find("Canvas").getChildByName("MainTop");
        MainTop.getComponent(GameApp).updateplayerinfo();
    }

    initReward(data) {
        if (data.reward == 0 || data.number == 0) return

        //实例化奖励预制体
        resources.load("prefabs/battle/BaseIcon", Prefab, (err, prefab) => {
            let reward_icon = instantiate(prefab);
            this.node.getChildByName('reward_bg').addChild(reward_icon);
            let bg = reward_icon.getChildByName('bg').getComponent(Sprite);
            let quality = TextUtils.Instance.goods__get_goods_info.find(item => item.id == data.reward).quality
            resources.load("textures/common/common_avatar_bg_new/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                bg.spriteFrame = spriteFrame;
            })
            let icon = reward_icon.getChildByName('icon').getComponent(Sprite);
            resources.load("images/goods/" + data.reward + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                icon.spriteFrame = spriteFrame;

            })
            let reward_num = reward_icon.getChildByName('number').getComponent(Label);
            reward_num.string = data.number;
        });
        //存到宝箱
        GameData.setBoxReward(data);
        // console.log('宝箱存储奖励',GameData.battleData.BoxRewardList);
    }
}
