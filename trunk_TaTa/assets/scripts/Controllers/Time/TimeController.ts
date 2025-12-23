import {
    _decorator,
    Component,
    director,
    Label,
} from "cc";
import { GameData } from "../../Common/GameData";
import { LoginController } from "../login/LoginController";
const { ccclass, property } = _decorator;

@ccclass('TimeController')
export class TimeController extends Component {

    protected onLoad(): void {
        director.addPersistRootNode(this.node);
    }

    //开始计时的回调函数
    startTimer() {
        this.schedule(this.updateTime, 1); // 每秒更新一次
    }

    // 检查是否需要重置累计在线时间（跨天判断）
    public checkDateReset() {
        if (GameData.userData.lastUpdateTime === null) {
            GameData.userData.lastUpdateTime = Date.now();
        }
        const lastDate = new Date(GameData.userData.lastUpdateTime);
        const now = new Date();

        if (
            lastDate.getUTCFullYear() !== now.getUTCFullYear() ||
            lastDate.getUTCMonth() !== now.getUTCMonth() ||
            lastDate.getUTCDate() !== now.getUTCDate()
        ) {
            GameData.userData.dailyAccumulatedTime = 0;
            GameData.userData.lastUpdateTime = Date.now();
            // GameData.saveData();
        }
    }

    // 每秒更新时间
    private updateTime() {
        const scene = director.getScene();
        const canvas = scene ? scene.getChildByName("Canvas") : null;
        const limitNode = canvas ? canvas.getChildByName("limit_play_time") : null;

        const now = Date.now();
        const elapsedMinutes = (now - GameData.userData.lastUpdateTime) / 1000 / 60; // 转换为分钟

        this.checkDateReset(); // 每次更新都检查跨天

        if (LoginController.instance.start_game) {
            GameData.userData.dailyAccumulatedTime += elapsedMinutes;
            GameData.userData.lastUpdateTime = now;
            GameData.userData.updateTimes++;

            // 如果当前时间为21点且未成年游玩时间已到
            const currentHour = new Date().getHours();
            // console.log("currentHour："+ currentHour);
            if (currentHour >= 21 && GameData.userData.age == "2") {
                if (limitNode.active) {
                    return;
                }
                console.log("未成年21点游玩时间已到");
                if (limitNode) limitNode.active = true;
            }

            // if (GameData.userData.dailyAccumulatedTime > 1 && GameData.userData.age == "2") {
            //     console.log("未成年游玩时间已到");
            //     director.getScene().getChildByName("Canvas").getChildByName("limit_play_time").active = true;
            // }
            if (GameData.userData.updateTimes === 60) {
                GameData.userData.updateTimes = 0;
                GameData.taskData.dailyTaskContentNumList[9]++;
            }
            // console.log("累计在线时间", GameData.userData.dailyAccumulatedTime);
            // GameData.saveData();
        }
        else {
            GameData.userData.lastUpdateTime = now;
        }
    }
}


