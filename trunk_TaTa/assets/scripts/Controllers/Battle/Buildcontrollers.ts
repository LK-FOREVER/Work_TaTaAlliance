import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;
//建造点控制
@ccclass('Buildcontrollers')
export class Buildcontrollers extends Component {
    public static Instance:Buildcontrollers = null;
    protected onLoad(): void {
        Buildcontrollers.Instance = this;
    }

    init(index:number){
        let collider = this.node.getComponent(BoxCollider2D);         
        collider.tag = index;       
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
    }
}
