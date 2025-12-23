import { _decorator, Button, Component, Node , Label, v3, resources, Prefab, instantiate} from 'cc';
import { GameData } from '../../Common/GameData';
import { PromotionManager } from '../../Managers/PromotionManager';
import { BattleManager } from '../../Managers/BattleManager';
import { Buildcontrollers } from './Buildcontrollers';
const { ccclass, property } = _decorator;
//const eventTarget = new EventTarget();

@ccclass('MapControllers')
export class MapControllers extends Component {
    public static instance:MapControllers = null;
    unlock_builds:any[] = [];

    start() {
        MapControllers.instance = this;
        for (let index = 1; index < 7; index++) {
            let unlock_build = this.node.getChildByName('unlock_build' + index);
            this.unlock_builds.push(unlock_build); 
            unlock_build.getChildByName('btn_unlock').on(Button.EventType.CLICK,this.unlockBuild,this);
        }
         
        globalThis.tar.on('SHOWUNLOCK', this.showunlock, this);
    }
    //显示可解锁
    showunlock(){
      //  console.log("显示可解锁");
        for (let index = 0; index < this.unlock_builds.length; index++) {
            const node = this.unlock_builds[index];
            if (node.active) {
                node.getChildByName('tips').active = false;
                node.getChildByName('btn_unlock').active = true;
            }
        }  
    }
    //解锁站位
    unlockBuild(event:Event){
        const btn = event.target as unknown as Node;
        btn.active = false;
        let unlocknode = btn.parent;
        let battlemgr = BattleManager.Instance;
        let builds = battlemgr.buildData.get(battlemgr.map_id);
        let builds_lock = GameData.userData.builds;
        for (let index = 0; index < this.unlock_builds.length; index++) {
            const node = this.unlock_builds[index];
            if (unlocknode.name == node.name) {
                this.unlock_builds[index].active = false;
                GameData.userData.builds[index].lock = true;
                const build_vo = builds[index];
                let pos_x = build_vo.x;
                let pos_y = build_vo.y;

                battlemgr.bulidpoints[index] = {
                    pos: v3(pos_x, pos_y, 0), 
                    tower: null
                }
              
                resources.load("prefabs/battle/build", Prefab, (err, prefab) => {
                    let point = instantiate(prefab);
                    point.name = 'point' + index;
                    let point_ctr = point.addComponent(Buildcontrollers);
                    point_ctr.init(index);
                    battlemgr.map_root.addChild(point);
                    point.setPosition(pos_x,pos_y);
                });
            }   
        }

        let lv = GameData.userData.career;
        let tips_str = '正式员工Ⅰ解锁'
        if (lv >= 4 && lv <= 10) {
            tips_str = '部门经理Ⅰ解锁'
        }else if (lv > 10){
            tips_str = '副总经理Ⅰ解锁'
        }

        GameData.userData.unlockNum = GameData.userData.unlockNum - 1;
        // GameData.saveData()

        //解锁完后
        if (GameData.userData.unlockNum == 0) {
            for (let index = 0; index < this.unlock_builds.length; index++) {
                const node = this.unlock_builds[index];
                if (node.active) {
                    node.getChildByName('tips').active = true;
                    node.getChildByName('btn_unlock').active = false;
                    node.getChildByName('tips').getComponent(Label).string = tips_str;
                }
            }
        }  
    }
}
