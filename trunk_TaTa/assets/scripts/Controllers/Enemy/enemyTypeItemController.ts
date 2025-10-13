import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import { enemyItemController } from './enemyItemController';
import { LoadUtils } from '../../Common/LoadUtils';
const { ccclass, property } = _decorator;

@ccclass('enemyTypeItemController')
export class enemyTypeItemController extends Component {  @property(Prefab)
    enemy_item: Prefab = null!;

    title_bg: Node = null!;
    enemy_list: Node = null!;
    enemy_type_list: any = null!;
    enemyf_type_id: number = null!;

    init(enemy_type_list, enemyf_type_id){
        this.enemy_type_list = enemy_type_list;
        this.enemyf_type_id = enemyf_type_id;
        // this.title_bg = this.node.getChildByName("title_bg");
        this.enemy_list = this.node.getChildByName("enemy_list");

        this.enemy_type_list.forEach(enemy_info => {
            const enemy_item = instantiate(this.enemy_item);
            enemy_item.getComponent(enemyItemController).init(enemy_info)
            enemy_item.setParent(this.enemy_list)
        });
    }
}


