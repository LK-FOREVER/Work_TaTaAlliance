import { _decorator, Component, Node } from 'cc';
import { TowerControllers } from '../Battle/TowerControllers';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { EnemyControllers } from '../Battle/EnemyControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('Tower1006')
export class Tower1006 extends TowerControllers {
    init_atk:number = 0
    onLoad(): void {
        super.onLoad();
        EventManager.Instance.on(EventConst.ATTACKED_START,this.attackStart,this)
        EventManager.Instance.on(EventConst.ATTACKED_END,this.attackEnd,this)

    }

    onDestroy(): void {
        super.onDestroy();
        EventManager.Instance.off(EventConst.ATTACKED_START,this.attackStart,this)
        EventManager.Instance.off(EventConst.ATTACKED_END,this.attackEnd,this)
    }

    init(towerinfo: any, build_id:number, map_id: number) {
        super.init(towerinfo, build_id, map_id)
        this.init_atk = this.tower_data.atk
    }

    attackStart(enemy:Node) {
        const controller = enemy.getComponent(EnemyControllers);
        if(controller.tower != this.node || controller.data.is_boss) return;
        const lv: number = GameData.userData.towerLv[this.tower_data.icon_id];
        
        let probability:number = 0
        let extra_atk:number = 0

        if(lv >= 100){
            probability = 10
            extra_atk = 0.2
        } else if (lv >= 75){
            probability = 7
            extra_atk = 0.2
        } else if (lv >= 50){
            probability = 7
            extra_atk = 0.15
        } else if (lv >= 25){
            probability = 5
            extra_atk = 0.15
        } else {
            probability = 3
            extra_atk = 0.1
        }

        let rand = Math.floor(Math.random() * 100 + 1);

        if (rand <= probability) {
            controller.tower_info.atk = this.init_atk;
            controller.tower_info.atk += controller.HP * extra_atk;
        }
    }

    attackEnd(enemy: Node) {
        const controller = enemy.getComponent(EnemyControllers);
        if (controller.tower != this.node || controller.data.is_boss) return;

        this.tower_data.atk = this.init_atk;
    }
}
