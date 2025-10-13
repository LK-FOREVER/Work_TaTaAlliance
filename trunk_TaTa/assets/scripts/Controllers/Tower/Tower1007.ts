import { _decorator, Component, Node } from 'cc';
import { TowerControllers } from '../Battle/TowerControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('Tower1007')
export class Tower1007 extends TowerControllers {
    init_crit:number = 0
    atk_num:number = 0

    init(towerinfo: any, build_id:number, map_id: number) {
        super.init(towerinfo, build_id, map_id)
        this.init_crit = this.tower_data.crit
    }

    createBullet(): void {
        super.createBullet();
        const lv: number = GameData.userData.towerLv[this.tower_data.icon_id];

        let max_num:number = 0
        if(lv >= 100){
            max_num = 3
        } else if (lv >= 75){
            max_num = 5
        } else if (lv >= 50){
            max_num = 7
        } else if (lv >= 25){
            max_num = 9
        } else {
            max_num = 10
        }

        this.atk_num++;
        if(this.atk_num >= max_num) {
            this.tower_data.crit = 1
            this.atk_num = 0
        } else {
            this.tower_data.crit = this.init_crit
        }
    }
}
