import { _decorator, Component, error, find, instantiate, JsonAsset, Label, Prefab, resources, Sprite, SpriteFrame,sp } from 'cc';
import { GameData } from './GameData';
import { GameApp } from '../GameApp';
import { TextUtils } from './TextUtils';
import EventManager from './EventManager';
import { EventConst } from './EventConst';
import { Console } from 'console';
import { AudioManager } from "../Managers/AudioManager";

const { ccclass, property } = _decorator;

interface RewardData {
    reward: number;
    number: number;
}
@ccclass('ShowGoods')
export class ShowGoods extends Component {
    audio_manager: any = null;

    // 定义奖励数据类型
    public static rewardList: RewardData[] = [];
    static audio_manager: AudioManager;

    static deduplicatedRewards: RewardData[] = []; // 用于存储去重后的奖励

    // 初始化奖励数据的方法（异步）
    public static async init(rewardDataList: RewardData[]) {
        const self = this;
        this.audio_manager = AudioManager.ins;

        // 异步处理并初始化奖励数据列表
        await self.processRewards(rewardDataList);

        // 输出处理后的奖励列表
        // console.log('self.rewardList', self.rewardList);

        // 加载预制体资源
        this.loadResourcePrefab()

        //播放音效
        if (this.audio_manager) {
            this.audio_manager.playSound("get_goods", false);
        }

        this.deduplicatedRewards.forEach(async rewardData => {
            //金币
            if (rewardData.reward == 1) {
                GameData.userData.hasGoodsList[1] += rewardData.number;
                //引导任务
                //GameData.taskData.taskMoneyNum += rewardData.number;
            } else if (rewardData.reward > 1 && rewardData.reward <= 12) {
                GameData.userData.hasGoodsList[rewardData.reward] += rewardData.number;
            } else if (rewardData.reward > 2000 && rewardData.reward < 3000) {
                GameData.userData.towerDebris[rewardData.reward] += rewardData.number;
            }
            //图案是素材18（暂时），加的是精钢数量
            else if (rewardData.reward == 18){
                GameData.userData.hasGoodsList[8] += rewardData.number;
            }
            // 更新显示
            let MainTop = find("Canvas").getChildByName("MainTop");
            MainTop.getComponent(GameApp).updateplayerinfo()
            // 清空rewardList
            self.rewardList = []
        });
    }

    // 处理传入的奖励数据列表（异步）
    private static async processRewards(rewardDataList: RewardData[]) {
        for (const data of rewardDataList) {
            // 根据不同条件处理奖励
            if (data.reward >= 1000 && data.reward < 2000) {
                // 获取指定员工信息并更新奖励池和用户数据
                await this.getAppointTower(data);
            } else if (data.reward === 9) {
                // 获取随机橙色员工碎片
                for (let i = 0; i < data.number; i++) {
                    await this.getRandomTower("orange");
                }
            } else if (data.reward === 8) {
                // 获取随机紫色员工碎片
                for (let i = 0; i < data.number; i++) {
                    await this.getRandomTower("purple");
                }
            } else if (data.reward > 2000 && data.reward < 3000) {//碎片
                // // 加载员工信息资源文件
                // const towerInfoJson = await this.loadResourceJSON('data/tower__get_tower_info');
                // // 遍历员工信息查找指定ID的员工
                // for (const key1 in towerInfoJson) {
                //     for (const key in towerInfoJson[key1]) {
                //         const towerInfo = towerInfoJson[key1][key].find(ti => ti.piece_goods_id === data.reward);

                //         // 如果找到员工且为橙色，增加任务完成计数
                //         //if (towerInfo && towerInfo.rarity === '橙色') GameData.taskData.taskGetOrangeStaff += 1;

                //         // 遍历rewardData.number次this.handleUserTowerData(towerInfo, GameData.userData);
                //         for (let i = 0; i < data.number; i++) {
                //             // 更新用户数据并判断是否将该员工添加至奖励列表
                //             this.handleUserTowerData(towerInfo, GameData.userData);
                //         }
                //         const obj = {
                //             reward: data.reward,
                //             number: data.number
                //         }
                //         if (towerInfo) this.rewardList.push(obj);
                //     }
                // }
                this.rewardList.push(data);

            } else {
                // 其他情况直接添加到奖励列表中
                this.rewardList.push(data);
            }
        }
    }

    // 获取指定员工信息并将其加入奖励池与更新用户数据
    private static async getAppointTower(data: RewardData) {
        if (data.reward === 0 || data.number === 0) return;

        // 加载员工信息资源文件
        const towerInfoJson = await this.loadResourceJSON('data/tower__get_tower_info');

        // 遍历员工信息查找指定ID的员工
        for (const key1 in towerInfoJson) {
            for (const key in towerInfoJson[key1]) {
                const towerInfo = towerInfoJson[key1][key].find(ti => ti.id === data.reward);

                // 如果找到员工且为橙色，增加任务完成计数
                //if (towerInfo && towerInfo.rarity === '橙色') GameData.taskData.taskGetOrangeStaff += 1;

                for (let i = 0; i < data.number; i++) {
                    // 更新用户数据并判断是否将该员工添加至奖励列表
                    this.handleUserTowerData(towerInfo, GameData.userData);
                }
                const obj = {
                    reward: data.reward,
                    number: data.number
                }
                if (towerInfo) this.rewardList.push(obj);
            }
        }
    }

    // 更新用户拥有的员工碎片和列表信息
    private static handleUserTowerData(towerInfo: any, userData): boolean {
        let isAdd = true;
        if (towerInfo) {
            userData.towerlist.forEach(value => {
                if (value.id === towerInfo.id) {
                    userData.towerDebris[value.piece_goods_id] += 1;
                    isAdd = false;
                }
            });

            // 若未拥有该员工，则添加至用户数据和奖励列表
            if (isAdd) {
                userData.towerlist.push(towerInfo);
                userData.towerLv[towerInfo.id] = 1;
            }
        }
        return isAdd;
    }

    // 获取随机碎片（根据稀有度）
    private static async getRandomTower(rarity: string) {
        // 加载随机获取员工的概率资源文件
        const inviteProbabilityJson = await this.loadResourceJSON(`data/goods__get_random_${rarity}`);

        // 根据概率获取一个随机员工项
        if (inviteProbabilityJson) {
            const randomItem = this.getRandomItem(inviteProbabilityJson);

            // 如果是橙色员工，增加任务完成计数
            //if (randomItem && rarity === "orange") GameData.taskData.taskGetOrangeStaff += 1;

            // 加载员工信息资源文件并查找对应员工详情
            const towerInfoJson = await this.loadResourceJSON('data/tower__get_tower_info');
            const towerInfo = this.findTowerInfoById(randomItem.id, towerInfoJson);

            // 更新用户数据并将员工添加至奖励列表
            // this.handleUserTowerData(towerInfo, GameData.userData);
            const obj = {
                reward: towerInfo.piece_goods_id,
                number: 1
            }
            if (towerInfo) this.rewardList.push(obj);
        }
    }

    // 加载JSON资源的方法
    private static async loadResourceJSON(resourceName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resources.load(resourceName, (err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return reject(err);
                }
                resolve(res.json!);
            });
        });
    }

    // 加载预制体资源的方法
    private static loadResourcePrefab() {
        // 定义一个新的数组，合并重复的reward并累加number
        this.deduplicatedRewards = this.rewardList.reduce((accumulator, current) => {
            const existingReward = accumulator.find(item => item.reward === current.reward);

            if (existingReward) {
                existingReward.number += current.number; // 如果找到相同的奖励，则累加数量
            } else {
                accumulator.push(current); // 否则添加新的奖励项
            }

            return accumulator;
        }, [] as RewardData[]);

        const Canvas = find("Canvas")
        let goods_view = null;

        // 实例化奖励弹窗
        resources.load("prefabs/common/goods_view", Prefab, (err, prefab) => {
            goods_view = instantiate(prefab)
            goods_view.setParent(Canvas)
            goods_view.setPosition(0, 0)
            // 遍历deduplicatedRewards创建预制体
            this.deduplicatedRewards.forEach((item) => {
                // console.log(item)
                if ((item.reward >= 1 && item.reward <= 12) || (item.reward > 1000 && item.reward < 2000) || (item.reward > 2000 && item.reward < 3000)
                ||(item.reward == 18)) {
                    // 加载基础icon预制体
                    resources.load("prefabs/battle/BaseIcon", Prefab, (err, prefab) => {
                        let reward_icon = instantiate(prefab);
                        reward_icon.setParent(goods_view.getChildByName('reward_list_scroll').getChildByName('view').getChildByName('content'))
                        reward_icon.setPosition(0, 0)
                        let bg = reward_icon.getChildByName('bg').getComponent(Sprite);
                        // let quality = TextUtils.Instance.goods__get_goods_info.find(good => good.id == item.reward).quality
                        // resources.load("textures/common/common_goods_" + quality + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                        //     if (err) {
                        //         console.log(err);
                        //         return
                        //     }
                        //     bg.spriteFrame = spriteFrame;
                        // })
                        resources.load("textures/common/common_avatar_bg_new/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                            if (err) {
                                console.log(err);
                                return
                            }
                            bg.spriteFrame = spriteFrame;
                        })
                        let icon = reward_icon.getChildByName('icon').getComponent(Sprite);
                        let reward_num = reward_icon.getChildByName('number').getComponent(Label);
                        resources.load("images/goods/" + item.reward + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                            if (err) {
                                console.log(err);
                                return
                            }
                            icon.spriteFrame = spriteFrame;

                        })
                        reward_num.string = item.number.toString();
                        if(item.reward > 1000 && item.reward < 2000){
                            reward_num.node.active = false;
                        }else{
                            reward_num.node.active = true;
                        }
                    });
                }
                //  else {
                //     //实例化预制体
                //     resources.load("prefabs/invite/employee_icon", Prefab, async (err, prefab) => {
                //         let employee_icon = instantiate(prefab);
                //         employee_icon.setParent(goods_view.getChildByName('reward_list_scroll').getChildByName('view').getChildByName('content'))
                //         let employee = employee_icon.getChildByName("employee")
                //         let employee_bg = employee_icon.getChildByName("employee_bg")
                //         let employee_name_text = employee_icon.getChildByName("employee_name_bg").getChildByName("employee_name_text")
                //         let employee_tower = employee_icon.getChildByName("employee_tower")
                //         let employee_num = employee_icon.getChildByName("employee_name_bg").getChildByName("employee_num")

                //         employee_num.getComponent(Label).string = item.number.toString()

                //         // 加载员工信息资源文件并查找对应员工详情
                //         const towerInfoJson = await this.loadResourceJSON('data/tower__get_tower_info');
                //         const towerInfo = this.findTowerInfoById(item.reward, towerInfoJson);
                //         // console.log('towerInfo', towerInfo)

                //         employee_name_text.getComponent(Label).string = towerInfo.name

                //         let rarity = ""
                //         if (towerInfo.rarity === "橙色") rarity = "common_staff_bg_orange_new"
                //         else if (towerInfo.rarity === "紫色") rarity = "common_staff_bg_purple_new"
                //         // 设置头像背景
                //         resources.load("textures/common/" + rarity + "/spriteFrame", SpriteFrame, (err, sp) => {
                //             if (err) {
                //                 console.log('err', err)
                //                 return
                //             }
                //             employee_bg.getComponent(Sprite).spriteFrame = sp
                //         })

                //         // 设置头像                                                                                                                                                                                                                                                                                                                                             
                //         resources.load(`images/goods/${towerInfo.id}/spriteFrame`, SpriteFrame, (err, sp) => {
                //             if (err) {
                //                 console.log('err', err)
                //                 return
                //             }
                //             employee.getComponent(Sprite).spriteFrame = sp
                //         })

                //         let attribute_name = ""
                //         if (towerInfo.hurttype === "单体型") attribute_name = "common_tower_dan"
                //         else if (towerInfo.hurttype === "群体型") attribute_name = "common_tower_qun"
                //         else if (towerInfo.hurttype === "效果型") attribute_name = "common_tower_xiao"
                //         // 设置攻击类型
                //         resources.load(`textures/common/${attribute_name}/spriteFrame`, SpriteFrame, (err, sp) => {
                //             employee_tower.getComponent(Sprite).spriteFrame = sp
                //         })
                //     })
                // }
            })
        })
    }

    // 根据id在员工信息中查找特定员工
    private static findTowerInfoById(id: number, towerInfoJson: object): any {
        for (const key1 in towerInfoJson) {
            for (const key in towerInfoJson[key1]) {
                const towerInfo = towerInfoJson[key1][key].find(ti => ti.id === id);
                if (towerInfo) return towerInfo;
            }
        }
        return null;
    }

    // 根据权重获取随机对象项
    private static getRandomItem(obj: Record<string, { radio: number }>): any {
        let totalWeight = 0;
        for (const key in obj) {
            totalWeight += Number(obj[key].radio);
        }
        const randomValue = Math.random() * totalWeight;

        let cumulativeWeight = 0;
        for (const key in obj) {
            cumulativeWeight += Number(obj[key].radio);
            if (randomValue <= cumulativeWeight) return obj[key];
        }

        // 当随机值大于总权重时返回最后一个对象项
        return obj[Object.keys(obj).length - 1];
    }
}


