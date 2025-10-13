import { _decorator, Component, Node } from 'cc';
import { TowerControllers } from '../Battle/TowerControllers';
import EventManager from '../../Common/EventManager';
import { EventConst } from '../../Common/EventConst';
import { EnemyControllers } from '../Battle/EnemyControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('Tower1008')
export class Tower1008 extends TowerControllers {
    atk_add_num:number = 0
    init_atk:number = 0
    enemy:Node = null
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
        if(controller.tower != this.node) return;

        if(!this.enemy) this.enemy = enemy;
        if(this.enemy == enemy) {
            this.atk_add_num++
        } else {
            this.enemy = enemy
            this.atk_add_num = 0
        }

        const lv: number = GameData.userData.towerLv[this.tower_data.icon_id];
        
        let limit:number = 0
        let extra_atk:number = 0

        if(lv >= 100){
            limit = 0.3
            extra_atk = 0.03
        } else if (lv >= 75){
            limit = 0.25
            extra_atk = 0.02
        } else if (lv >= 50){
            limit = 0.2
            extra_atk = 0.02
        } else if (lv >= 25){
            limit = 0.15
            extra_atk = 0.01
        } else {
            limit = 0.1
            extra_atk = 0.01
        }

        let all_extra_atk = extra_atk * this.atk_add_num;

        if (all_extra_atk > limit) {
            all_extra_atk = limit
        }

        this.tower_data.atk = this.init_atk * (1 + all_extra_atk)
    }

    attackEnd(enemy:Node) {
        const controller = enemy.getComponent(EnemyControllers);
        if(controller.tower != this.node) return;

        this.tower_data.atk = this.init_atk;
    }
}
