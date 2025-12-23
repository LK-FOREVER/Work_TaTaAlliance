//工具类，一些基础功能调用

import { _decorator, color, Vec3, instantiate, find, Prefab, v3, Node, tween, resources } from "cc";
import common_top from "../Common/common_top";
import netManager from "../Network/netManager";
import dayjs from "dayjs";
import LoadUtils from "./LoadUtils";
// import { LOG } from "cc/userland/macro";
import { common_tips_view } from "../Common/common_tips_view";
import { ViewsManager } from "../Managers/ViewsManager";
export default class Utils {

    public static getTypeById(id: number) {
        if (id >= 201001 && id <= 207003) {
            return { en: "hero", zh: "英雄" };
        } else if (id >= 301001 && id <= 306008) {
            return { en: "soldier", zh: "士兵" };
        } else if (id >= 100001 && id <= 100019) {
            return { en: "build", zh: "建筑" };
        } else if ((id >= 400001 && id <= 400006) ||
            (id >= 500001 && id <= 500007) ||
            (id >= 600001 && id <= 600020) ||
            (id >= 700001 && id <= 700007)) {
            return { en: "special", zh: "特殊" };
        } else if (id >= 10001 && id <= 17102) {
            return { en: "equip", zh: "装备" };
        } else if (id >= 2201001 && id <= 2207003) {
            return { en: "piece", zh: "英雄碎片" };
        } else if (id >= 2301001 && id <= 2306008) {
            return { en: "piece", zh: "士兵碎片" };
        } else if (id >= 2600001 && id <= 2600016) {
            return { en: "piece", zh: "特殊技碎片" };
        } else if (id >= 2100001 && id <= 2100005) {
            return { en: "piece", zh: "万能碎片" };
        } else if ((id >= 21000001 && id <= 21000004) || (id >= 21010023 && id <= 21017102)) {
            return { en: "piece", zh: "装备碎片" };
        } else if (id >= 1800001 && id <= 1800060) {
            return { en: "skillBook", zh: "技能书" };
        }
        return null;
    }
    /**
     * 弹窗动画
     * @param view_node 显示的界面节点
     */
    public static getPopCommonEffect(node: Node) {
        // 节点添加动画
        node.setScale(0.9, 0.9, 0.9);
        tween(node)
            .to(0.1, { scale: new Vec3(1.05, 1.05, 1.05) })
            .to(0.05, { scale: new Vec3(1, 1, 1) })
            .start();
    }

    //处理小数点
    public static dealFloat(num: number, digit: number = 2): number {
        if (num == 0) {
            return 0;
        }
        if (digit == 0) {
            return Math.round(num);
        }
        var Num: number = 0;
        var mult = 10 * digit;
        Num = Math.round(num * mult) / mult;
        return Num;
    }

    /**
     * 计算离线时间距离当前时间过了多久 返回时间字符串
     * @param timestamp 离线时间戳
     */
    public static getTimeElapsedSince(timestamp: number): string {
        const now = new Date();
        const targetDate = new Date(timestamp * 1000); // Convert timestamp to milliseconds

        const totalMilliseconds = Math.abs(
            now.getTime() - targetDate.getTime()
        );
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        let result: string;

        if (totalSeconds <= 60) {
            result = "刚刚在线";
        } else if (totalDays >= 30) {
            result = "30天以上";
        } else if (totalDays > 0) {
            result = `${totalDays}天前在线`;
        } else if (totalHours > 0) {
            const remainingMinutes = totalMinutes % 60;
            result = `${totalHours}小时${remainingMinutes}分钟前在线`;
        } else {
            result = `${totalMinutes}分钟前在线`;
        }

        return result;
    }
    /**
     * 计算邮件时间距离当前时间过了多久 返回时间字符串
     * @param timestamp 离线时间戳
     */
    public static getMailTimeElapsedSince(sendTimestamp: number): object {
        const dateStart = dayjs(sendTimestamp * 1000);
        const totalMilliseconds = Math.abs(dateStart.diff()); //毫秒
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        let result = "";
        let inThreeDays = true;
        if (totalSeconds <= 60) {
            result = "刚刚";
        } else if (totalMinutes <= 60) {
            result = `${totalMinutes}分钟前`;
        } else if (totalHours >= 1 && totalDays <= 1) {
            result = `${totalHours}小时前`;
        } else if (totalDays > 1 && totalDays <= 30) {
            if (totalDays > 3) {
                inThreeDays = false;
            }
            result = `${totalDays}天前`;
        } else {
            inThreeDays = false;
            result = `30天前`;
        }
        return { result1: result, result2: inThreeDays };
    }
    public static getMailExpireTime(sendTimestamp: number, expireTimestamp: number): string {
        const dateEnd = dayjs(expireTimestamp * 1000);
        const dateNow = dayjs(sendTimestamp * 1000);
        const diffInMilliseconds = dateEnd.diff(dateNow); //毫秒
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (diffInDays > 0) {
            return diffInDays + "天" + diffInHours + "小时";
        } else {
            return diffInHours + "小时";
        }
    }
    //将秒换成02:00的形式
    public static getTime(time: number) {
        var str: string = "00:00";
        var m = Math.floor(time / 60);
        var s = time - m * 60;

        var mStr = "00";
        if (m >= 10) {
            mStr = m + "";
        } else {
            mStr = "0" + m;
        }

        var sStr = "00";
        if (s >= 10) {
            sStr = s + "";
        } else {
            sStr = "0" + s;
        }

        str = mStr + ":" + sStr;
        return str;
    }
    /**
     * 将阿拉伯数字转换为汉字数字
     * @param {Number} digit 要转换的数字
     */
    public static digitToChinese(digit: number): string {
        const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const chineseDigits = ['', '十', '百', '千', '万', '十', '百', '千', '亿'];

        function convertUnit(num: number, unitIndex: number): string {
            let result = '';
            num = Math.floor(num);
            while (num > 0) {
                const unit = chineseNums[num % 10];
                if (unit !== '零' || result !== '') {
                    result = chineseNums[num % 10] + (result ? chineseDigits[unitIndex] : '') + result;
                }
                num = Math.floor(num / 10);
                unitIndex++;
            }
            return result;
        }

        if (digit < 10) {
            return digit === 1 ? '一' : chineseNums[digit]; // 特殊处理1的情况
        } else if (digit < 100) {
            return convertUnit(digit / 10, 1) + '十' + convertUnit(digit % 10, 0);
        } else if (digit < 1000) {
            return convertUnit(digit / 100, 2) + '百' + convertUnit(digit % 100, 0);
        } else if (digit < 10000) {
            return convertUnit(digit / 1000, 3) + '千' + convertUnit(digit % 1000, 0);
        } else if (digit < 1000000000) {
            return convertUnit(digit / 10000, 4) + '万' + convertUnit(digit % 10000, 0);
        } else if (digit < 1000000000000) {
            return convertUnit(digit / 100000000, 8) + '亿' + convertUnit(digit % 100000000, 0);
        } else {
            throw new Error('超出支持的最大数字范围');
        }
    }

    /**
     * 将数值转换为万、亿等字符串
     * @param num 数量
     * @param type 类型 1:属性 战力 图鉴  2:伤害  资源 道具
     */
    ////优化也省不了几行，没啥意思
    public static changeNumber(num: number, type: number = 1) {
        const numArray = num.toString().split(".");
        const integerPartStr = numArray[0];
        if (type === 1) {       ///属性 战力 图鉴显示规则
            if (integerPartStr.length < 7) { // 123456 --直接显示
                return num.toFixed(0);
            } else if (integerPartStr.length < 11) { //7--10位 1236597890 --> 123659.7万
                let result = num / 10000;
                result = Math.floor(result * 10) / 10;
                return result + "万";
            } else if (integerPartStr.length < 15) {   //11位--14位及以上 12894567890-->128.9亿
                let result = num / 100000000;
                result = Math.floor(result * 10) / 10;
                return result + "亿";
            } else {                                 //15位及以上用兆
                let result = num / 1000000000000;
                result = Math.floor(result * 10) / 10;
                return result + "兆";
            }
        } else if (type === 2) {  //伤害  资源 道具
            if (integerPartStr.length < 6) {         //5位  直接显示
                return num.toFixed(0);
            } else if (integerPartStr.length < 10) { //6--9位 123456789 -->12345.6万
                let result = num / 10000;
                result = Math.floor(result * 10) / 10;
                return result + "万";
            } else if (integerPartStr.length < 15) {   //10位及以上 1289467890-->12.8亿
                let result = num / 100000000;
                result = Math.floor(result * 10) / 10;
                return result + "亿";
            } else {                                  //14位及以上用兆
                let result = num / 1000000000000;
                result = Math.floor(result * 10) / 10;
                return result + "兆";
            }
        }
        //console.log("changeNumber error-->", num);
        return num + "";
    }

    /**
     * 创建一级弹窗通用顶部 返回按钮+资源模块
     * @param view_evt
     * @param title_name
     * @param top_parent
     */
    public static create_common_top(
        view_evt: string,
        title_name: string,
        good_list: any,
        top_parent: Node,
        desc_id: number = 0,
        sub_desc_id: number = 0
    ) {
        // LoadUtils.Instance.resBundle.load("prefab/common/common_top", Prefab, (_err, prefab)=> {
        if (top_parent === null || !top_parent.isValid) {
            return;
        }
        const common = top_parent.getChildByName("common_top");
        common && common.destroy();
        const commonTop = instantiate(find("views").getComponent(ViewsManager).getPrefab(10006));
        commonTop.getComponent(common_top).init(view_evt, title_name, desc_id, sub_desc_id);
        commonTop.name = "common_top";
        commonTop.setParent(top_parent);
        // });
    }
    public static toast(msg: string) {
        if (msg == null || msg == "") {
            return;
        }
        LoadUtils.Instance.resBundle.load("prefab/common/common_toast", Prefab, (_err, prefab) => {
            const common_toast: any = instantiate(prefab);
            common_toast.setPosition(v3(0, 300, 0));
            common_toast.setParent(find("MainCanvas/tip_layer"));
            common_toast.getComponent("common_toast").init(msg);
        });
    }
    /**
     * 将时间戳转换为倒计时格式
     * @param timestamp 时间戳
     * @returns 倒计时格式的字符串，例如"01:02:03"
     */
    public static convertToCountdown(timestamp: number): string {
        // 获取当前时间的时间戳
        const now = Utils.now() / 1000; // JavaScript时间戳是毫秒，需要转换为秒
        // 计算时间差（秒）
        const diff = timestamp - now;
        if (diff <= 0) {
            return "计时结束";
        }

        // 将时间差转换为小时、分钟和秒
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = Math.floor(diff % 60);

        // 格式化输出
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    // 辅助函数，用于补零操作，例如将1变为01
    public static pad(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }
    /**
     * 创建提示弹窗
     * @param msg 提示弹窗的内容
     * @param title 提示弹窗的标题
     * @param type 类型，需传入数字，1为确认和取消，2为确认
     * @param yes_cb 确认时的回调
     */
    public static create_tips_view(msg: string, title: string, type: 1 | 2, yes_cb: Function, no_cb: Function = undefined, default_yes: boolean = false, enable_toggle: boolean = true) {
        resources.load("prefabs/common/common_tips_view", Prefab, (_err, prefab) => {
            const common_tips = instantiate(prefab);
            common_tips.getComponent(common_tips_view).init(msg, title, type, yes_cb, no_cb, default_yes, enable_toggle);
            common_tips.setPosition(v3(0, 0));
            common_tips.setParent(find("Canvas/ui_layer"));
            common_tips.active = true;
            Utils.getPopCommonEffect(common_tips)
        })
        // LoadUtils.Instance.resBundle.load("prefab/common/common_tips_view", Prefab, (_err, prefab) => {
        //     const common_tips = instantiate(prefab);
        //     common_tips.getComponent(common_tips_view).init(msg, title, type, yes_cb, no_cb, default_yes, enable_toggle);
        //     common_tips.setPosition(v3(0, 0));
        //     common_tips.setParent(find("MainCanvas/ui_layer"));
        //     common_tips.active = true;
        //     Utils.getPopCommonEffect(common_tips)
        // }
        // );
    }

    public static hex2color(hex) {
        var r = parseInt(hex.substring(1, 3), 16);
        var g = parseInt(hex.substring(3, 5), 16);
        var b = parseInt(hex.substring(5, 7), 16);

        return color(r, g, b);
    }

    //获取当前时间的时间戳(秒级)
    public static getTodayTimestamp() {
        return dayjs().unix();
    }

    //获取当前时间的时间戳(毫秒级)
    public static getTodayTimestamp2() {
        return dayjs().valueOf();
    }
    //获取今天是几号
    public static getToady() {
        return dayjs().date();
    }
    // 今天周几
    public static getDayOfWeek() {
        let day = dayjs().day();
        if (day == 0) {
            return 7;
        }
        return day;
    }

    // 获取那年那月有多少天
    public static getMonthsDay() {
        const year = dayjs().year();
        const month = dayjs().month();
        const firstDayOfMonth = dayjs(`${year}-${month + 1}-01`);
        const endOfMonth = firstDayOfMonth.endOf('month');
        const numberOfDays = endOfMonth.date();
        return numberOfDays;
    }
    //获取每个月的1号是周几
    public static getMonthFirst() {
        const year = dayjs().year();
        const month = dayjs().month();
        const firstDayOfMonth = dayjs(`${year}-${month + 1}-01`);
        return firstDayOfMonth.day();
    }

    public static isSameDay(timestamp1, timestamp2, timestamp3?) {
        const date1 = dayjs(timestamp1 * 1000).format('YYYY-MM-DD');
        const date2 = dayjs(timestamp2 * 1000).format('YYYY-MM-DD');
        let date3;
        if (timestamp3) {
            date3 = dayjs(timestamp3).format('YYYY-MM-DD');
            return date1 === date2 && date2 === date3;
        }
        return date1 === date2;
    }
    //获取当前年月
    public static getCurrentYearMonth() {
        const day = dayjs();
        const year = day.year();
        const month = day.month();
        return year + "年" + (month + 1) + "月";
    }
    //时间戳转年月日
    public static getYearMonthDayByTimestamp(timestamp?) {
        let day = null;
        if (timestamp) {
            timestamp *= 1000;
            day = dayjs(timestamp);
        } else {
            day = dayjs();
        }
        const year = day.year();
        const month = day.month() + 1;
        const date = day.date();
        return { year, month, date };
    }
    //获取当前时间，精确到毫秒   YYYY-MM-DD HH:mm:ss 为精确到秒
    public static getCurrentTime() {
        return dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
    }
    //获取当前时间往后24小时的时间戳(秒)
    public static getNowTo24Hour() {
        const now = dayjs();
        const later = now.add(24, 'hour');
        const timestampLater = later.toDate().getTime() / 1000;
        return timestampLater;
    }


    public static convertTimeStampToDay(timestamp: number, beginTime: number) {
        // 将时间戳转换为秒
        const totalSeconds = timestamp - beginTime;
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        let result = '';
        if (days > 0) {
            result += `${days}天`;
        }
        result += `${hours}时${minutes}分${seconds}秒`;

        return result;
    }

    //时间戳转日期
    public static convertTimestampToDateTime(timestamp: number): string {
        return dayjs(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
    }

    // showSecond是否显示秒
    public static convertSecondsToTime(seconds, showSecond = true) {
        const days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        const hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        let result = ""
        if (days > 0) {
            result += `${days}天`;
        }
        if (hours > 0) {
            result += `${hours}小时`;
        }
        if (minutes > 0) {
            result += `${minutes}分`;
        }
        if (days > 0 && showSecond) {
            result += `${seconds}秒`;
        }
        return result;
    }


    //是否有有效数字(需配合editbox中设置只能输入number)
    public static isValidNumber(num: string) {
        if ((/^0$|^[1-9]\d*$/).test(num)) {
            return true;
        }
        return false;
    }


    public static time_diff(timestamp: number) {
        return timestamp - netManager.Instance.get_time();
    }
    /**
     * 
     * @returns 毫秒时间戳
     */
    public static now() {
        return netManager.Instance.get_time();
    }


    /**
     * 
     * @param param1 
     * @param param2 
     */
    public static log(param1: any, param2: any = null) {
        // if (LOG) {
        //     if (param2) {
        //         //console.log(param1,param2);
        //         return
        //     }
        //     //console.log(param1);
        // }

    }

    //精确输出当前值的类型
    // 字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol。
    //和引用（复杂）类型如：对象(Object)、数组(Array)、函数(Function)，以及两个特殊的对象：正则（RegExp）和日期（Date）。
    public static getValueType(value) {
        return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();
    }

    public static i18n(str: string): string {
        return str;
    }

}
