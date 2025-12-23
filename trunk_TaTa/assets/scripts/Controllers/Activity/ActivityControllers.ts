import { _decorator, Component, Node } from 'cc';
import { DuiHuanView } from '../../Views/Activity/DuiHuanView';
import { AttentionView } from '../../Views/Activity/AttentionView';
const { ccclass, property } = _decorator;

@ccclass('ActivityControllers')
export class ActivityControllers extends Component {
    public static instance: ActivityControllers = null!;
    duihuan_view: Node;
    attention_view: Node;


    onLoad(): void {
        ActivityControllers.instance = this;


    }


    start() {
        this.duihuan_view = this.node.getChildByName('duihuan_view');
        this.attention_view = this.node.getChildByName('attention_view');
        this.duihuan_view.addComponent(DuiHuanView);
        this.attention_view.addComponent(AttentionView);
        this.attention_view.active = false;
        this.duihuan_view.active = false;



    }
    showDuihuanView(){
        if (this.duihuan_view.active) {
            this.duihuan_view.active = false;
        }else {
            this.duihuan_view.active = true;
        }

    }
    showAttentionView(){
        if (this.attention_view.active) {
            this.attention_view.active = false;
        }else {
            this.attention_view.active = true;
        }
        
    }


    update(deltaTime: number) {
        
    }
}


