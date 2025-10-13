import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;
//攻击组件
//播放一个攻击或技能动画，市场，计算伤害的时间点，控制什么时候计算伤害，提供一个机制给用户做伤害计算，什么时候结束，提供一个机制给用户去重置状态
@ccclass('AttackAction')
export class AttackAction extends Component {
    //是否在攻击中
    private isAttack:boolean = false;
    private hurtTime:number = 0;
    private endTime:number = 0;
    private onHuntFunc:Function = null!;
    private onEndFunc:Function = null!;
    private nowTime:number = 0; //现在的时间

    public init(): void {
        this.isAttack = false;
        this.hurtTime = 0;
        this.endTime = 0;
        this.onHuntFunc = null;
        this.onEndFunc = null;
        this.nowTime = 0;
    }
    //释放技能
    //hurtTime：计算伤害的时间，endTime：结束时间，onHuntFunc：计算伤害的回调函数，onEndFunc:技能攻击结束后重置状态
    public doAttack(hurtTime: number,
                    endTime: number,
                    onHuntFunc:Function,onEndFunc:Function):boolean {
        if (this.isAttack === true) {
            return false; 
        }  
        this.isAttack = true;
        this.hurtTime = hurtTime;
        this.endTime = endTime;
        this.onHuntFunc = onHuntFunc;
        this.onEndFunc = onEndFunc;

        return true;
        

    }

    update(dt: number): void {
        if (this.isAttack === true) {
            return; 
        }  
        this.nowTime += dt;
        //当前时间大于技能释放完的时间，应当计算伤害
        //可用监听事件代替
        if (this.nowTime >= this.hurtTime)  { //计算伤害
            if (this.onHuntFunc) {
                this.onHuntFunc();
                this.onHuntFunc = null!; //只计算一次
            }
        }

        if (this.nowTime >= this.endTime) {
            if (this.onEndFunc) {
                this.onEndFunc();
                this.onEndFunc = null!;

            }
            this.isAttack = false;
        }


        
    }
}


