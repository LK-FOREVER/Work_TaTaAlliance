import { _decorator, Component, find, instantiate, Node, Prefab, resources } from 'cc';
import { common_goto_shop_tips } from './common_goto_shop_tips';
import { ShowMessage } from './ShowMessage';
const { ccclass, property } = _decorator;

@ccclass('Utils')
export class Utils extends Component {

    /**
     * 创建前往商店提示
     *
     * @static
     * @param {string} goods_name
     * @memberof Utils
     */
    public static create_goto_shop_tips(goods_name: string) {
        resources.load("prefabs/common/common_goto_shop_tips", Prefab, (_err, prefab) => {
            const common_goto_shop_tips_prefab = instantiate(prefab);
            common_goto_shop_tips_prefab.getComponent(common_goto_shop_tips).initUI(goods_name);
            common_goto_shop_tips_prefab.setParent(find("Canvas"));
        });
    }
    public static create_message(message: string) {
        resources.load("prefabs/common/message", Prefab, (_err, prefab) => {
            const message_prefab = instantiate(prefab);
            message_prefab.getComponent(ShowMessage).init(message);
            message_prefab.setParent(find("Canvas"));
        });
    }
    // 通过权重大小随机获取组id
    public static getRandomGroupIdByWeight(weightedGroups: Array<{ k: string | number; v: number }>): string | number | undefined {
        let totalWeight = 0;
        let groupKeys: (string | number)[] = [];

        // 计算总权重并收集组ID
        for (let group of weightedGroups) {
            totalWeight += group.v;
            groupKeys.push(group.k);
        }

        if (totalWeight === 0) {
            console.warn('Total weight is zero, cannot select a group.');
            return undefined;
        }

        let randomNum = Math.random() * totalWeight;
        let currentWeight = 0;

        // 根据权重选择组ID
        for (let i = 0; i < weightedGroups.length; i++) {
            currentWeight += weightedGroups[i].v;
            if (randomNum <= currentWeight) {
                return groupKeys[i];
            }
        }

        console.error('Unexpected error in weight selection logic.');
        return undefined;
    }
    // 通过权重大小随机获取组id
    public static getRandomItemByWeight(items: Array<{ ratio: number }>): any {
        let totalWeight = items.reduce((sum, item) => sum + item.ratio, 0);
        let randomNum = Math.random() * totalWeight;
        for (let item of items) {
            randomNum -= item.ratio;
            if (randomNum <= 0) {
                return item;
            }
        }
        // 如果因为浮点数运算误差导致未找到匹配项，返回最后一个（理论上不会发生）
        return items[items.length - 1];
    }
    // 格式化数字
    public static formatNumber(num: number): string {
        if (num >= 1e9) { // 如果数字大于等于十亿
            return Math.trunc(num / 1e9).toString() + 'B';
        } else if (num >= 1e6) { // 如果数字大于等于一千万
            return Math.trunc(num / 1e6).toString() + 'M';
        } else if (num >= 1e4) { // 如果数字大于等于一万
            return Math.trunc(num / 1e3).toString() + 'K';
        } else {
            return num.toString(); // 否则，直接返回数字的字符串形式
        }
    }

    static isSameWeek(d1, d2) {
        const difftime = Math.abs(d2 - d1)
        // 时间差大于等于7天
        if (difftime >= 1000 * 60 * 60 * 24 * 7) {
            return false
        }
        // 前者存放小日期的星期，后者存放大日期的星期
        let smallDay, bigDay
        if (d1 > d2) {
            // 周日返回的是0，给它转为7
            bigDay = d1.getDay() || 7
            smallDay = d2.getDay() || 7
        } else {
            smallDay = d1.getDay() || 7
            bigDay = d2.getDay() || 7
        }
        // 大日期的星期 < 小日期的星期
        if (bigDay < smallDay) {
            return false
        }
        // 大日期的星期 == 小日期的星期，且时间差 >1 天
        if (bigDay === smallDay && difftime > 1000 * 60 * 60 * 24) {
            return false
        }

        return true
    }

    static isSameMonth(dateStr1, dateStr2) {
        let date1 = new Date(dateStr1);
        let date2 = new Date(dateStr2);
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
    }

    static daysBetween(date1: Date, date2: Date): number {
        const oneDay = 24 * 60 * 60 * 1000; // 每天的毫秒数
        const firstTime = date1.getTime(); // 第一个时间的毫秒表示
        const secondTime = date2.getTime(); // 第二个时间的毫秒表示
     
        return Math.floor((firstTime - secondTime) / oneDay);
    }
}


