import { _decorator, Component, native, Node, Sprite, SpriteFrame, sys } from 'cc';
import { BattleManager } from '../../Managers/BattleManager';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('ReviewController')
export class ReviewController extends Component {

    @property(SpriteFrame)
    star_1:SpriteFrame = null

    @property(SpriteFrame)
    star_2:SpriteFrame = null

    star_num:number = 0;

    close(){
        this.node.parent.getComponent(BattleManager).toNextChapter();
        this.node.active = false;
    }

    submit() {
        if(this.star_num >= 4) {
            if(sys.os === sys.OS.ANDROID || sys.isNative) {
                native.bridge.sendToNative('review');
                this.node.active = false;
            } else {
                this.close();
            }
        } else {
            this.close();
        }
    }

    review(event,index:number) {
        this.star_num = index + 1;
        const container = this.node.getChildByName("star_container");
        for(let i = 0; i < container.children.length; i++) {
            if(i <= index ) {
                container.children[i].getComponent(Sprite).spriteFrame = this.star_1
            } else {
                container.children[i].getComponent(Sprite).spriteFrame = this.star_2
            }
        }
    }
} 
