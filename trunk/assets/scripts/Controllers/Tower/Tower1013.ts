import { _decorator, Component, Node } from 'cc';
import { TowerControllers } from '../Battle/TowerControllers';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { EnemyControllers } from '../Battle/EnemyControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('Tower1013')
export class Tower1013 extends TowerControllers {
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
            this.tower_data.atk_spd *= (1 - 0.05)
        } else if (lv >= 75){
            this.tower_data.atk_spd *= (1 - 0.04)
        } else if (lv >= 50){
            this.tower_data.atk_spd *= (1 - 0.03)
        } else if (lv >= 25){
            this.tower_data.atk_spd *= (1 - 0.02)
        } else {
            this.tower_data.atk_spd *= (1 - 0.01)
        }
    }
}
