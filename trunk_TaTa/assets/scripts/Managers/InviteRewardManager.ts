import { _decorator, Component, Node, resources, SpriteFrame, Prefab, instantiate, Sprite, Label } from 'cc';
import { GameData } from '../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('InviteRewardController')
export class InviteRewardController extends Component {
    @property(Prefab)
    employee_icon: Prefab = null
    employee_prefab_list = []

    // 招聘人员的列表
    randomItemList: object[] = []

    onEnable() {
        this.node.removeAllChildren()
        this.randomItemList = GameData.userData.randomItemList
        this.loadEmployeeIcon()
        // console.log(this.node.children)
    }

    loadEmployeeIcon() {
        // 不重复员工的数据
        // let uniqueArray = [...new Set(this.randomItemList)];
        let uniqueArray = this.randomItemList.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });
        uniqueArray.map((value: any, index) => {
            // 实例化预制体 instantiate
            let employee_icon = instantiate(this.employee_icon)
            let employee = employee_icon.getChildByName("employee")
            let employee_bg = employee_icon.getChildByName("employee_bg")
            employee_icon.getChildByName("employee_name_bg").getChildByName("employee_name_text").getComponent(Label).string = value.name
            let employee_tower = employee_icon.getChildByName("employee_tower")
            // 设置其父节点
            employee_icon.setParent(this.node)
            employee_icon.name = value.name

            let rarity = ""
            if (value.rarity === "橙") rarity = "common_staff_bg_orange"
            else if (value.rarity === "紫") rarity = "common_staff_bg_purple"
            // 设置头像背景
            resources.load(`textures/common/${rarity}/spriteFrame`, SpriteFrame, (err, sp) => {
                if (err) {
                    console.log('err', err)
                    return
                }
                employee_bg.getComponent(Sprite).spriteFrame = sp
            })

            // 设置头像
            resources.load(`images/goods/${value.id}/spriteFrame`, SpriteFrame, (err, sp) => {
                if (err) {
                    console.log('err', err)
                    return
                }
                employee.getComponent(Sprite).spriteFrame = sp
            })

            let attribute_name = ""
            if (value.hurttype === "单体型") attribute_name = "common_tower_dan"
            else if (value.hurttype === "群体型") attribute_name = "common_tower_qun"
            else if (value.hurttype === "效果型") attribute_name = "common_tower_xiao"
            // 设置攻击类型
            resources.load(`textures/common/${attribute_name}/spriteFrame`, SpriteFrame, (err, sp) => {
                employee_tower.getComponent(Sprite).spriteFrame = sp
            })

        })
        // 重复员工的数据
        let duplicates = this.randomItemList.reduce(function (accumulator, item: any) {
            if (accumulator[item.name]) {
                accumulator[item.name]++; // 如果该项已经存在于accumulator中，则增加其计数器
            } else {
                accumulator[item.name] = 1; // 如果该项不存在于accumulator中，则将其添加到accumulator中并设置计数器为1
            }
            return accumulator;
        }, {}); // 初始值为空对象

        // 将计算结果转换为数组形式，以便更容易处理
        let duplicateData = Object.keys(duplicates).map(function (key) {
            return { name: key, count: duplicates[key] };
        })
        // 输出结果
        // console.log(duplicateData);

        // 显示获得员工的数量
        duplicateData.forEach((item) => {
            this.node.children.forEach((nodeItem) => {
                if (item.name === nodeItem.name) {
                    if (item.count > 1) {
                        nodeItem.getChildByName("employee_name_bg").getChildByName("employee_num").getComponent(Label).string = item.count
                    }
                }
            })
        })
    }
}


