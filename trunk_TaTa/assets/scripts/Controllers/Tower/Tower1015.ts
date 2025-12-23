import { _decorator, Component, Node } from 'cc';
import { TowerControllers } from '../Battle/TowerControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('Tower1015')
export class Tower1015 extends TowerControllers {
    atk_num:number = 0

    init(towerinfo: any, build_id:number, map_id: number) {
        super.init(towerinfo, build_id, map_id)
    }

    createBullet(): void {
        super.createBullet();
        const lv: number = GameData.userData.towerLv[this.tower_data.icon_id];

        let max_num:number = 0
        if(lv >= 100){
            max_num = 8
        } else if (lv >= 75){
            max_num = 9
        } else if (lv >= 50){
            max_num = 10
        } else if (lv >= 25){
            max_num = 12
        } else {
            max_num = 15
        }

        this.atk_num++;
        if(this.atk_num >= max_num) {
            this.tower_data.is_return = 1
            this.atk_num = 0
        } else {
            this.tower_data.is_return = 0
        }
    }
}
