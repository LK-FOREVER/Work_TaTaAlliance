import { _decorator, color, Component, error, find, instantiate, JsonAsset, Label,  Prefab, resources, tween, v3 } from 'cc';
import { GameData } from './GameData';
import { BattleManager } from '../Managers/BattleManager';
import { ShowGoods } from './ShowGoods';
import { GameApp } from '../GameApp';
const { ccclass, property } = _decorator;

@ccclass('AddControllers')
export class AddControllers extends Component {
    //type--加成类型，attribute--加成属性，number--加成数值
    public static add(type: string, attribute: string, number: number) {
      //  console.log(type);

        //AddControllers.showTips(type, attribute, number);
        switch (type) {
            //员工属性相关
            case "tower_add":
          //      console.log("员工属性相关", attribute, number);
                AddControllers.towerAdd(attribute, number);
                break;
            //敌人属性相关
            case "enemy_add":
          //      console.log("敌人属性相关", attribute, number);
                AddControllers.enemyAdd(attribute, number);
                break;
            //获取员工
            case "get_tower":
          //      console.log("获取员工", attribute, number);
                AddControllers.getTower(attribute, number);
                break;
            //资产相关
            case "asset_add":
          //      console.log("资产相关", attribute, number);
                AddControllers.assetAdd(attribute, number);
                break;
            //营收能力
            case "drop_add":
           //     console.log("营收能力", attribute, number);
                AddControllers.dropAdd(attribute, number);
                break;
            //业绩值相关
            case "performance_add":
            //    console.log("业绩值相关", attribute, number);
                AddControllers.performanceAdd(attribute, number);
                break;
        }


    }

    //员工属性相关
    public static towerAdd(attribute: string, number: number) {

        let battlectrl = BattleManager.Instance;
        let waittowerlist = battlectrl.waittowerlist;
        let Objtowerlist = battlectrl.Objtowerlist;
        //待选择列表加成
        for (let index = 0; index < waittowerlist.length; index++) {
            let towerdata = waittowerlist[index];
            for (const key in towerdata) {
                if (key == attribute) {
                    towerdata[key] = towerdata[key] + number;
                }
            }
        }
        //已上阵列表加成
        for (let index = 0; index < Objtowerlist.length; index++) {
            let towerdata = Objtowerlist[index];
            for (const key in towerdata) {
                if (key == attribute) {
                    towerdata[key] = towerdata[key] + number;
                }
            }
        }
    }
    //敌人属性相关
    public static enemyAdd(attribute: string, number: number) {
        let battlectrl = BattleManager.Instance;
        let enemy_list = battlectrl.enemy_list;
        for (let index = 0; index < enemy_list.length; index++) {
            const enemydata = enemy_list[index];
            for (const key in enemydata) {
                if (key == attribute) {
                    enemydata[key] = enemydata[key] + number;
                }
            }

        }
    //    console.log("enemy_list", enemy_list);
    }
    //获取员工
    public static getTower(attribute: string, number: number) {

        // 通过权重大小随机获取
        function getRandomItem(obj: object) {
            // console.log('obj', obj)
            // 计算总权重
            let totalWeight: number = 0
            for (const key in obj) {
                totalWeight += Number(obj[key].radio)
            }
            // 生成一个随机数，表示选择的概率
            const randomValue = Math.random() * totalWeight;

            // 根据随机数选择对应的标识
            let cumulativeWeight = 0;
            for (const key in obj) {
                cumulativeWeight += Number(obj[key].radio)
                if (randomValue <= cumulativeWeight) {
                    return obj[key]
                }
            }
            // 如果由于浮点数运算精度问题未选择到任何标识，返回最后一个标识
            return obj[Object.keys(obj).length - 1]
        }
        let getTowerData = null
        let rewardlist = [];
        if (attribute == "orange") {
            new Promise((resolve, reject) => {
                // 动态加载json文件
                resources.load('data/goods__get_random_orange', (err: any, res: JsonAsset) => {
                    if (err) {
                        error(err.message || err);
                        return;
                    }
                    // 获取到 Json 数据
                    const jsonData: object = res.json!;
                    resolve(jsonData);
                })

            }).then((jsonData: object) => {
                getTowerData = jsonData;
                //根据数量获取随机员工
                for (let index = 0; index < number; index++) {

                    let rand_tower = getRandomItem(getTowerData);
                    console.log("rand_tower", rand_tower);
                    rewardlist.push({
                        reward: rand_tower.id,
                        number: 1,
                    });
                }
                console.log("获得橙色员工", rewardlist);
                ShowGoods.init(rewardlist);
            })

        } else if (attribute == "purple") {
            new Promise((resolve, reject) => {
                // 动态加载json文件
                resources.load('data/goods__get_random_purple', (err: any, res: JsonAsset) => {
                    if (err) {
                        error(err.message || err);
                        return;
                    }
                    // 获取到 Json 数据
                    const jsonData: object = res.json!;
                    resolve(jsonData);
                })
            }).then((jsonData: object) => {
                getTowerData = jsonData;
                //根据数量获取随机员工
                for (let index = 0; index < number; index++) {
                    let rand_tower = getRandomItem(getTowerData);
                    console.log("rand_tower", rand_tower);

                    rewardlist.push({
                        reward: rand_tower.id,
                        number: 1,
                    });
                }
                console.log("获得紫色员工", rewardlist);

                ShowGoods.init(rewardlist);

            })
        }
    }
    //资产相关
    public static assetAdd(attribute: string, number: number) {
        if (attribute == "money") {
            GameData.userData.hasGoodsList[1] += number;
            //引导任务
            //GameData.taskData.taskMoneyNum += number
            let MainTop = find("Canvas").getChildByName("MainTop");
            MainTop.getComponent(GameApp).updateplayerinfo();

            GameData.setUserData()
        }
    }
    //营收能力
    public static dropAdd(attribute: string, number: number) {
        if (attribute == "money") {
            GameData.userData.decision_re_capability = GameData.userData.decision_re_capability + number;
            GameData.setUserData()
            let MainTop = find("Canvas").getChildByName("MainTop");
            MainTop.getComponent(GameApp).updateplayerinfo();
        }
    }
    //业绩值相关
    public static performanceAdd(attribute: string, number: number) {
        if (attribute == "performance") {
            GameData.userData.performance_value = GameData.userData.performance_value + number;
            GameData.setUserData()
            let MainTop = find("Canvas").getChildByName("MainTop");
            MainTop.getComponent(GameApp).updateplayerinfo();
            //GameData.taskData.taskPerformanceAddNum += number
        }
    }

    public static showTips(type, attribute: string, number: number,result_buff:number,result_show:string) {
     //   console.log("飘字提示");

        let parent = find("Canvas");
        //实例化奖励预制体
        resources.load("prefabs/battle/decision_add", Prefab, (err, prefab) => {
            let tips = instantiate(prefab);
            parent.addChild(tips);
            tips.position = v3(0, 300, 0);
            let tips_add = tips.getChildByName("add_txt").getComponent(Label);
       //     console.log("result_buff",result_buff);
            
            //正面效果绿色
            if (result_buff > 0) {
                tips_add.color = color(132,192,63,255)
            }else {//负面效果红色
                tips_add.color = color(208,76,66,255)

            }
            switch (type) {
                //员工属性相关
                case "tower_add":
                    switch (attribute) {
                        case "atk":
                            tips_add.string = "本关攻击" + result_show
                        //    console.log("本关攻击");

                            break
                        case "atk_spd":
                            tips_add.string = "本关攻击速度" + result_show
                     //       console.log("本关攻击速度");
                            break
                        case "crit":
                            tips_add.string = "本关暴击率" + result_show
                     //       console.log("本关暴击率");
                            break
                        case "crit_hurt":
                            tips_add.string = "本关暴击伤害" + result_show
                       //     console.log("本关暴击伤害");
                            break
                    }

                    break;
                //敌人属性相关
                case "enemy_add":
                    tips_add.string = "本关敌人移速" + result_show
                //    console.log("本关敌人移速");
                    break;
                //资产相关
                case "asset_add":
                    tips_add.string = "本关资产" + result_show
               //     console.log("本关资产");
                    break;
                //营收能力
                case "drop_add":
                    tips_add.string = "本关营收能力" + result_show
                //    console.log("本关营收能力");
                    break;
                //业绩值相关
                case "performance_add":
                    tips_add.string = "本关业绩值" + result_show
                //    console.log("本关业绩值");
                    break;
            }


            let pos_x = tips.position.x;
            let pos_y = tips.position.y;
         //   console.log("提示上升");

            tween(tips)
                .to(1, { position: v3(pos_x, pos_y + 50, 0), opacity: 50 }, { easing: 'fade' })
                .start();

            //毫秒为单位
            setTimeout(() => {
                tips.destroy();
            }, 1000)

        });
    }
}