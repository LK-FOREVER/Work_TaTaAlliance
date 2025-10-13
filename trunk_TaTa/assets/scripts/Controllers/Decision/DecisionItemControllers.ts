import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame } from 'cc';
import { DecisionMainControllers } from './DecisionMainControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

@ccclass('DecisionItemControllers')
export class DecisionItemControllers extends Component {
    is_select:boolean;
    data: any;
    decisionDataList: any;

    start() {





    }
    setTouch(is_replace:boolean){
        if (is_replace) {
            this.node.resumeSystemEvents(true);

        } else{
            this.node.pauseSystemEvents(true);
        }

    }
    init(data,id){
        this.data = data;
        let content_txt = this.node.getChildByName('content_txt');
        let bg_sp = this.node.getComponent(Sprite);
        let content_str = content_txt.getComponent(Label);
        content_str.string = this.data.content;
        let item_id = this.node.getChildByName('item_id');
        let item_id_str = item_id.getComponent(Label);
        item_id_str.string = this.data.sort_id+'';
        this.is_select = this.data.is_select;
        if (this.data.is_select) {
            resources.load("textures/decision/decision_select_bg/spriteFrame",SpriteFrame,(err,spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                bg_sp.spriteFrame = spriteFrame;
            })

        }else{//取消选中
            resources.load("textures/decision/decision_no_select_bg/spriteFrame",SpriteFrame,(err,spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                bg_sp.spriteFrame = spriteFrame;
            })
        } 
        this.node.on(Node.EventType.TOUCH_END,this.selectItem,this);
        this.node.pauseSystemEvents(true);
    }
    selectItem(Event:Touch){

        if (this.is_select) {
            this.is_select = false;
        }else {
            this.is_select = true;
        }
        this.data.is_select = this.is_select;

      //  console.log("选中",this.node);
        let bg_sp = this.node.getComponent(Sprite);
        //选中
        if (this.is_select) {
            DecisionMainControllers.Instance.showTips(true);
            let number = GameData.userData.decisionList.length;
            console.log(number);
            if (number >= 15) {
                this.data.is_select = this.is_select = false;
                return        
            }

            resources.load("textures/decision/decision_select_bg/spriteFrame",SpriteFrame,(err,spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                bg_sp.spriteFrame = spriteFrame;
            })


        }else{//取消选中
            resources.load("textures/decision/decision_no_select_bg/spriteFrame",SpriteFrame,(err,spriteFrame) => {
                if (err) {
                    console.log(err);
                    return
                }
                bg_sp.spriteFrame = spriteFrame;
            })
        } 
        this.setdecisionDataList();
        let number = DecisionMainControllers.Instance.decisionDataList.length;
        DecisionMainControllers.Instance.select_num.getComponent(Label).string = number+"/15";
    }

    //保存选中的决策数据
    setdecisionDataList(){
        DecisionMainControllers.Instance.decisionDataList = GameData.userData.decisionList;
        if (this.is_select) {
            DecisionMainControllers.Instance.decisionDataList.push(this.data);      
        }else {
            for (let index = 0; index < DecisionMainControllers.Instance.decisionDataList.length; index++) {
                const element = DecisionMainControllers.Instance.decisionDataList[index];
                if (element.list_id == this.data.list_id) {
                    DecisionMainControllers.Instance.decisionDataList.splice(index,1);
                }
            }

        }         

    //    console.log('选中的决策列表',DecisionMainControllers.Instance.decisionDataList);  
    //    console.log('GameData的决策列表',GameData.userData.decisionList); 

    }

    update(deltaTime: number) {
        
    }
}


