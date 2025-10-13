import { _decorator, Component,  SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;
//动画播放组件,添加到对应包含动画预制体上，比如员工防御塔，怪物

@ccclass('AnimAction')
export class AnimAction extends Component {

    public anim: SkeletalAnimation = null!;

    public state:number = 0;
    //使用时在代码中根据实际动画片段编写数据，并在编辑器中设置对应clips
    public static animNames = [];

    public static AnimState = {
        Invalid: -1, //无效
        Idle: 0, //静态闲置状态
        Walk: 1, //行走
        Skill: 2, //技能
        Attack: 3, //攻击
        Die: 4, //死亡
    };

    public init():void {
        this.anim = this.node.getComponentInChildren(SkeletalAnimation);
        this.state = AnimAction.AnimState.Invalid;
        this.setState(AnimAction.AnimState.Idle);
    }
    
    public setState(state:number) {
        //判断状态是否相同
        if (this.state === state) {
            return;
        }
        this.state = state;
        //切换动画状态
        this.anim.crossFade(AnimAction.animNames[this.state]);

    }



}


