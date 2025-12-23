import { _decorator, Button, Canvas, Component, error, find, instantiate, JsonAsset, Label, Node, Prefab, resources, Sprite,  tween, UIOpacity, UITransform, v3 } from 'cc';
import { GameData } from '../../Common/GameData';
import { DecisionItemControllers } from './DecisionItemControllers';
import { guideManager } from '../../Managers/guideManager';
const { ccclass, property } = _decorator;

@ccclass('DecisionMainControllers')
export class DecisionMainControllers extends Component {
    public static Instance: DecisionMainControllers = null!;
    btn_close: Node;
    decisionData: any;
    decisionResultData: any;
    btn_replace: Node;
    btn_confirm: Node;
    select_txt: Node;
    select_num: Node;
    decisionItemList: Node[] = [];
    decisionDataList:any;
    tips: Node;
    is_replace: boolean;

    start() {

        
        

    }
    init(){
        DecisionMainControllers.Instance = this;
        this.btn_close = this.node.getChildByName('btn_close');
        this.btn_close.on(Button.EventType.CLICK,this.closeBySelf,this);
        this.btn_replace = this.node.getChildByName('btn_replace');
        this.btn_replace.on(Button.EventType.CLICK,this.replaceDecision,this);
        this.btn_confirm = this.node.getChildByName('btn_confirm');
        this.btn_confirm.on(Button.EventType.CLICK,this.confirmDecision,this);
        this.select_txt = this.node.getChildByName('select_txt');
        this.select_num = this.node.getChildByName('select_num');
        this.tips = this.node.getChildByName('tips');
        this.btn_confirm.active = false;
        this.select_txt.active = false;
        this.select_num.active = false;
        this.btn_replace.active = true;
        this.tips.active = false;
        this.is_replace = false;
        //清空数据
        if (this.decisionItemList.length > 0) {   
            for (let index = 0; index < this.decisionItemList.length; index++) {
                this.decisionItemList[index].destroy(); 
            }
            this.decisionItemList.length = 0;
            
        }
        
        this.getDecisionInfo();

    }
    //获得决策数据
    getDecisionInfo() {
        this.decisionData = null
        new Promise((resolve, reject) => {
            // 动态加载json文件
            resources.load('data/decision__get_decision', (err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return;
                }
                // 获取到 Json 数据
                const jsonData: object = res.json!;
                resolve(jsonData);
            })

        }).then((jsonData: object) => {
            this.decisionData = jsonData;

            this.setDefaultDecision();
            

        })
    }

    //初始15个已选择状态
    setDefaultDecision(){
        //已选择的决策列表
        let defaultdecisionData = GameData.userData.decisionList;
        if (defaultdecisionData.length < 15) {
            console.log("决策小于15");
            
            let player_lv = GameData.userData.career;
            for (const key in this.decisionData) {
                const element = this.decisionData[key][key];   
                //等级为1时     
                if (player_lv == 1 && player_lv >= element.lv) {
                    element.is_select = true;
                    let index = (key as unknown as number) + 1;
                    this.ctorItemPrefab(element,index);  
                    defaultdecisionData.push(element);
                }
            } 
        }else {
            console.log("决策大于15");
            this.ctorDecisionItem();

        }
        //console.log("defaultdecisionData",defaultdecisionData);

    }
    //创建决策item
    ctorDecisionItem(){
        //已选择的决策列表
        let defaultdecisionData = GameData.userData.decisionList;
        //玩家等级
        let player_lv = GameData.userData.career;
     //   console.log("已选择的决策列表",defaultdecisionData);
      //已解锁的决策列表
        let unlock_decisions = [];
        //所有决策列表
        for (const key in this.decisionData) {
            const element = this.decisionData[key][key];      
            if (player_lv >= element.lv) {
                //已解锁的决策
                unlock_decisions.push(element);
            }
  
        }
        for (let index = 0; index < unlock_decisions.length; index++) {
            const element = unlock_decisions[index];
            element.is_select = false; 
            element.select = 0;
            for (let index = 0; index < defaultdecisionData.length; index++) {
                const data = defaultdecisionData[index];
                //已选中的决策
                if (element.list_id == data.list_id) {
                    element.is_select = true;
                    element.select = 1;
                }     
            }
            
        }
            //插入排序
            function insertionSort(arr: any[]): any[] {
                // 对于数组的每一个元素，从它开始到0位置，比较该元素和前一个元素的大小
                for (let i = 1; i < arr.length; i++) {
                    let current = arr[i];
                    let j = i - 1;
                    // 如果该元素大于前一个元素，那么前一个元素向后移动，并继续向前比较
                    while (j >= 0 && current.select > arr[j].select) {
                        arr[j + 1] = arr[j];
                        j--;
                    }
                    // 如果该元素小于前一个元素，那么它将放到合适的位置
                    arr[j + 1] = current;
                }
                return arr;
            }
            
        let sortlist = insertionSort(unlock_decisions);
        for (let index = 0; index < sortlist.length; index++) {
            const element = sortlist[index];
            this.ctorItemPrefab(element,index + 1);
            
        }

    }
    //生成预制体
    ctorItemPrefab(data,index){
        let item_data = data;
        //实例化奖励预制体
        resources.load("prefabs/decision/decision_item", Prefab, (err, prefab) => {
            let decision_item = instantiate(prefab);
            decision_item.name = "item_"+data.list_id;
            let ScrollView = this.node.getChildByName('ScrollView');
            let content_bg = ScrollView.getChildByName('view').getChildByName('content')
            content_bg.addChild(decision_item);
            let itemctrl = decision_item.addComponent(DecisionItemControllers);
            itemctrl.init(data,index);
            this.decisionItemList.push(decision_item);

            let content_tran = content_bg.getComponent(UITransform)
            let content_width = content_tran.contentSize.width;
            content_tran.setContentSize(content_width,this.decisionItemList.length / 2 *  300 + 300)
          //  console.log(this.decisionItemList.length,content_tran.contentSize);
        });

    }
    //替换界面
    replaceDecision(){
        // 获取节点下的Sprite组件，将其设置置灰
        this.btn_close.getComponent(Sprite).grayscale = true;
        // 获取节点下的Button组件，将其设置为禁用
        this.btn_close.getComponent(Button).interactable = false;

        this.is_replace = true;
        this.btn_confirm.active = true;
        this.select_txt.active = true;
        this.select_num.active = true;
        this.btn_replace.active = false;
        for (let index = 0; index < this.decisionItemList.length; index++) {
            const element = this.decisionItemList[index];
            let Itemctrl = element.getComponent(DecisionItemControllers);
            Itemctrl.setTouch(true);
        }
        this.select_num.getComponent(Label).string = GameData.userData.decisionList.length+"/15";

        

    }
    //确认界面
    confirmDecision(){
        if (GameData.userData.decisionList.length < 15 || GameData.userData.decisionList.length > 15 ) {
            this.showTips(false);
            return       
        }
        // 获取节点下的Sprite组件，将其设置置灰
        this.btn_close.getComponent(Sprite).grayscale = false;
        // 获取节点下的Button组件，将其设置为禁用
        this.btn_close.getComponent(Button).interactable = true;
        this.is_replace = false;
        this.btn_confirm.active = false;
        this.select_txt.active = false;
        this.select_num.active = false;
        this.btn_replace.active = true;
        for (let index = 0; index < this.decisionItemList.length; index++) {
            const element = this.decisionItemList[index];
            let Itemctrl = element.getComponent(DecisionItemControllers);
            Itemctrl.setTouch(false);
        }

    }
    //决策数量不够或超过时，提示信息
    showTips(is_item:boolean){

        if (is_item) {
            let label = this.tips.getComponent(Label);
            console.log(GameData.userData.decisionList.length );
            
            if(GameData.userData.decisionList.length >= 15){
                label.string = "已达到选择上限"
            } else{
                return
            }    
        }

        this.tips.active = true;
        let opacity = this.tips.getComponent(UIOpacity).opacity;
        let pos_x = this.tips.position.x;
        let pos_y = this.tips.position.y;

        tween(this.tips)
        .to(1, { position:v3(pos_x,pos_y + 50,0),opacity :50 },{easing : 'fade'})
        .start();
        this.scheduleOnce(()=>{
            this.tips.active = false;
        },1)


    }

    closeBySelf(){
        if (this.is_replace) {
            this.confirmDecision();
            return
            
        }
        console.log(this.is_replace);
        
        if (this.node.active) {      
            this.node.active = false;
        }
        if (GameData.userData.guideListId === 80){
            const Canvas = find("Canvas")
            Canvas.getComponent(guideManager).guideNext()
        }
    }

    update(deltaTime: number) {
        
    }
}


