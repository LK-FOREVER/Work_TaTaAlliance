import { _decorator, CircleCollider2D, Collider2D, Component, Contact2DType, Director, director, IPhysics2DContact, Node,  tween, UITransform,  v3,  Vec3 } from 'cc';
import { EnemyControllers } from './EnemyControllers';
const { ccclass, property } = _decorator;

@ccclass('BulletControllers')
export class BulletControllers extends Component {
    collider: CircleCollider2D;

    data: any;
    tower:Node;
    target:Node;
    target_pos: Vec3 = v3(0,0,0);    //目标敌人位置

    //是否初始化
    isinit: boolean = false;
    
    maxTime: number;     //最大接触时间

    init(data: any,target:Node,tower:Node) {
        //添加属性
        this.data = data;
        this.target = target;
        this.tower = tower;

        if (this.target) {
            this.target_pos = new Vec3(this.target.position.x, this.target.position.y +80, 0);
        }else{
            this.node.destroy();
        }

        this.collider = this.node.getComponent(CircleCollider2D);
        this.collider.radius = this.node.getComponent(UITransform).width/2

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        this.isinit = true;

        this.maxTime = this.target_pos.clone().subtract(this.node.position).length()/(this.data.bullet_spd-500);

        this.moveToTarge();
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.isinit && (<any>otherCollider.node).die == 1){
            //console.log('子弹攻击',otherCollider.node.name);
            let enemy: EnemyControllers = otherCollider.node.getComponent(EnemyControllers);
            enemy.onAttacked(this.tower,this.data);
            this.isinit = false;

            //销毁自身
            director.once(Director.EVENT_AFTER_PHYSICS, ()=>{
                selfCollider.node.destroy();
            })
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    }

    moveToTarge() {
        tween(this.node)
            .to(this.maxTime, { position: this.target_pos })         
            .start();
    }

    //移动
    update(dt: number) {
       if (this.isinit) {

            this.maxTime -= dt;

            if(this.maxTime<0){ 
                this.node.active = false;
                this.node.destroy();
                return;
            }
       }
    }
}
