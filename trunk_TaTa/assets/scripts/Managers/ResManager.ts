import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;
//资源管理类
@ccclass('ResManager')
export class ResManager extends Component {
    public static Instance:ResManager = null!;
    Prefab: any;

    onLoad(): void {
        if(ResManager.Instance === null) {
            ResManager.Instance = this;
        }else {
            this.destroy();
            return;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


