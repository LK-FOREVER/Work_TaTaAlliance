import { _decorator, Color, Component, Label, Node, tween, UIOpacity, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FontVFXController')
export class FontVFXController extends Component {
    init(str: string, color: string = "#ffffff") {
        const label = this.node.getComponent(Label);
        label.string = str
        label.color = new Color(color)
        tween(this.node)
            .to(0.4, { position: v3(this.node.position.x, this.node.position.y + 30, 0) }, { easing: 'fade' })
            .call(() => tween(this.node.getComponent(UIOpacity)).to(0.4, { opacity: 0 })
            .call(() => this.node.destroy())
            .start())
            .start();
    }
}
