import { _decorator, Component, Node } from 'cc';
import { TowerControllers } from '../Battle/TowerControllers';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { EnemyControllers } from '../Battle/EnemyControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('Tower1016')
export class Tower1016 extends TowerControllers {
    onLoad(): void {
        super.onLoad();
        EventManager.Instance.on(EventConst.DEAD,this.killEnemy,this)
    }

    onDestroy(): void {
        super.onDestroy();
        EventManager.Instance.off(EventConst.DEAD,this.killEnemy,this)
    }

    killEnemy(enemy:Node) {
        const controller = enemy.getComponent(EnemyControllers);
        if(controller.tower != this.node) return;

        const lv: number = GameData.userData.towerLv[this.tower_data.icon_id];
        if(lv >= 100){
            controller.reward.normal_reward += 600
        } else if (lv >= 75){
            controller.reward.normal_reward += 450
        } else if (lv >= 50){
            controller.reward.normal_reward += 300
        } else if (lv >= 25){
            controller.reward.normal_reward += 200
        } else {
            controller.reward.normal_reward += 100
        }
    }
}
