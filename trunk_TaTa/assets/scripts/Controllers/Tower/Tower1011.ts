import { _decorator, Component, Node } from 'cc';
import { TowerControllers } from '../Battle/TowerControllers';
import EventManager from '../../Common/EventManager';
import { EnemyControllers } from '../Battle/EnemyControllers';
import { GameData } from '../../Common/GameData';
import { EventConst } from '../../Common/EventConst';
const { ccclass, property } = _decorator;

@ccclass('Tower1011')
export class Tower1011 extends TowerControllers {
    init_atk:number = 0
    init_poison:number = 0
    onLoad(): void {
        super.onLoad();
        EventManager.Instance.on(EventConst.ATTACKED_START,this.attackStart,this)
    }

    onDestroy(): void {
        super.onDestroy();
        EventManager.Instance.off(EventConst.ATTACKED_START,this.attackStart,this)
    }

    init(towerinfo: any, build_id:number, map_id: number) {
        super.init(towerinfo, build_id, map_id)
        this.init_atk = this.tower_data.atk
        this.init_poison = this.tower_data.poison
    }

    attackStart(enemy:Node) {
        const controller = enemy.getComponent(EnemyControllers);
        if(controller.tower != this.node) return;
        const lv: number = GameData.userData.towerLv[this.tower_data.icon_id];

        let extra_atk:number = 0

        if(lv >= 100){
            extra_atk = 0.3
        } else if (lv >= 75){
            extra_atk = 0.25
        } else if (lv >= 50){
            extra_atk = 0.2
        } else if (lv >= 25){
            extra_atk = 0.15
        } else {
            extra_atk = 0.1
        }

        if(controller.data.is_boss) {
            this.tower_data.atk = this.init_atk * (1 + extra_atk);
            this.tower_data.poison = this.init_poison * (1 + extra_atk);
        } else {
            this.tower_data.atk = this.init_atk;
            this.tower_data.poison = this.init_poison;
        }
    }
}
