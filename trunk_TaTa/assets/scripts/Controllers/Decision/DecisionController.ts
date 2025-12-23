import { _decorator, Component,  find, Node,  Vec2 ,Animation, resources, Prefab, instantiate, v3, Label, error, JsonAsset} from 'cc';
import { TouchChoiceController } from './TouchChoiceController';
import { BattleManager } from '../../Managers/BattleManager';
import { GameData } from '../../Common/GameData';
import { AddControllers } from '../../Common/AddControllers';
import { guideManager } from '../../Managers/guideManager';
import { DecisionBuffController } from './DecisionBuffController';
const { ccclass, property } = _decorator;

@ccclass('DecisionController')
export class DecisionController extends Component {
    public static instance:DecisionController = null;
    // add_bg:Node;
    // add:Node;
    private _singleTouchCtr: TouchChoiceController = null;
    start_pos: Vec2;
    move_pos: Vec2;
    end_pos: Vec2;
    is_left: boolean;
    anim: Animation;
    //决策界面列表
    DecisionList:Node[] = [];
    decision_infolist:any[] = [];
    //决策数量
    decision_num:number;
    decisionResultData: any = null;
    //是否可滑动
    isTouch:boolean = true;
    //决策负面结果列表
    negativeResult: any[] = [];

    


    start() {
        DecisionController.instance = this;

    }
    init() {
        this.decision_infolist = [];
        if (this.decisionResultData) {
            this.onTouchDecision();
            this.getDecisionData();   
        }else {
            this.getDecisionResultInfo();
        }
           
    }

    //获得决策结果池数据
    getDecisionResultInfo() {
        this.decisionResultData = null
        new Promise((resolve, reject) => {
            // 动态加载json文件
            resources.load('data/decision__get_decision_result', (err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return;
                }
                // 获取到 Json 数据
                const jsonData: object = res.json!;
                resolve(jsonData);
            })

        }).then((jsonData: object) => {
            this.decisionResultData = jsonData;
            this.onTouchDecision();
            this.getDecisionData();
            
            

        })
    }
    
 
    //随机抽取一定数量的决策牌
    getDecisionData(){
        //可抽取数量
        let decisino_card_num = GameData.userData.decision_card;
        //产生随机数
        function getRandomNumbers(min, max, count) {
            var numbers = new Set(); // 存放生成的随机数
            
            while (numbers.size < count) {
                var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                numbers.add(randomNum);
            }
            
            return Array.from(numbers); // 将Set对象转换为数组
        }
        let random_list = getRandomNumbers(0, 14, decisino_card_num);
        console.log(random_list);

        let decision_Data = GameData.userData.decisionList;
     //   console.log("选中的15个决策牌",decision_Data);
        for (let index = 0; index < decision_Data.length; index++) {
            const decision_data = decision_Data[index];
       //     console.log("选中的15个决策牌之一",decision_data);
            for (let j = 0; j < random_list.length; j++) {
                const random = random_list[j];
                if (index == random) {
                    this.decision_infolist.push(decision_data);
        
                }
            }

        }

        this.ctorDecisionView(this.decision_infolist);


    }
    //根据数据生成决策界面
    ctorDecisionView(decision_Data){

        for (let index = 0; index < decision_Data.length; index++) {
            const element = decision_Data[index];
            if (element) {
              //  console.log('根据数据生成决策界面',element);
                this.ctorDecisionPrefab(element);
            }      
        }
      //  this.getResultAdd();
   
    }
    //生成决策预制体
    ctorDecisionPrefab(data:any){

        
        //实例化预制体
        resources.load("prefabs/battle/decision", Prefab, (err, prefab) => {

            let decision = instantiate(prefab);
            this.node.addChild(decision);
            decision.position = v3(0,0,0);
         //   console.log('生成决策预制体',decision);

           this.DecisionList.push(decision);
           let content = decision.getChildByName('content').getComponent(Label);
           content.string = data.content;
           let left = decision.getChildByName('left').getComponent(Label);
           left.string = data.left;
           let right = decision.getChildByName('right').getComponent(Label);
           right.string = data.right;
           this.decision_num = this.DecisionList.length;
        });

    }

    //注册滑动接收监听
    onTouchDecision(){

        let mask = find("Canvas/decision_view/mask")
        this._singleTouchCtr = mask.getComponent(TouchChoiceController);


        this._singleTouchCtr.node.on(TouchChoiceController.SingleTouchDownEvent, this.onTouchDown);
        this._singleTouchCtr.node.on(TouchChoiceController.SingleTouchMoveEvent, this.onTouchMove);
        this._singleTouchCtr.node.on(TouchChoiceController.SingleTouchUpEvent, this.onTouchUp);
    }
    onTouchDown(pos:Vec2){    
        // if (!this.isTouch) {
        //     return
        // }
        // this.isTouch = false;

        DecisionController.instance.start_pos = pos;


    }
    onTouchMove(pos:Vec2){
        DecisionController.instance.move_pos = pos;

    }
    onTouchUp(pos:Vec2){
        let Decctrl = DecisionController.instance;
        if (!Decctrl.isTouch) return
        
        
        Decctrl.end_pos = pos;
        

        if (Decctrl.end_pos.x > (Decctrl.start_pos.x+150)) {
            Decctrl.isTouch = false;
            //选择右侧决策
            Decctrl.is_left = false;
            console.log('选择右侧决策');
            Decctrl.getResultAdd(Decctrl.decision_infolist[Decctrl.decision_num-1].result_id,Decctrl.is_left);

            Decctrl.DecisionList[Decctrl.decision_num-1].getComponent(Animation).play('right');
            Decctrl.DecisionList[Decctrl.decision_num-1].getComponent(Animation).on(Animation.EventType.FINISHED, Decctrl.destroyDecision, this);

        }else if(Decctrl.end_pos.x < (Decctrl.start_pos.x-150)){
            Decctrl.isTouch = false;
            //选择左侧决策
            Decctrl.is_left = true;
            console.log('选择左侧决策');
            Decctrl.getResultAdd(Decctrl.decision_infolist[Decctrl.decision_num-1].result_id,Decctrl.is_left);
           Decctrl.DecisionList[Decctrl.decision_num-1].getComponent(Animation).play('left');
            Decctrl.DecisionList[Decctrl.decision_num-1].getComponent(Animation).on(Animation.EventType.FINISHED, Decctrl.destroyDecision, this);

        }

    }
    //根据list_id和选项从结果池中抽取结果
    getResultAdd(result_id:number,is_left:boolean){
     //   console.log("result_id",result_id);
        
        let result_list = [];
        for (const key in this.decisionResultData) {
            const resultdata = this.decisionResultData[key];
          //  console.log("resultdata",resultdata,key);
            //如果有值，说明是该结果池
            if (resultdata[result_id]) {
                result_list.push(resultdata[result_id]);    
            }
        }
        console.log("result_list",result_list);


        
        // 通过权重大小随机获取
        function getRandomItem(obj: object,is_left:boolean) {
            // 计算总权重
            let totalWeight: number = 0
            if (is_left) {
                for (const key in obj) {
                    totalWeight += obj[key].left_radio
                } 
                // 生成一个随机数，表示选择的概率
                const randomValue = Math.random() * totalWeight;
                // 根据随机数选择对应的标识
                let cumulativeWeight = 0;
                for (const key in obj) {
                    cumulativeWeight += obj[key].left_radio
                    if (randomValue <= cumulativeWeight) {
                        return obj[key]
                    }
                }
            }else {
                for (const key in obj) {
                    totalWeight += obj[key].right_radio
                }
                // 生成一个随机数，表示选择的概率
                const randomValue = Math.random() * totalWeight;

                // 根据随机数选择对应的标识
                let cumulativeWeight = 0;
                for (const key in obj) {
                    cumulativeWeight += obj[key].right_radio
                    if (randomValue <= cumulativeWeight) {

                        return obj[key]
                    }
                }

            }
            // 如果由于浮点数运算精度问题未选择到任何标识，返回最后一个标识
            return obj[Object.keys(obj).length - 1]
        }
        //加成类型
        let result_type:string = "";
        let result_add:string = "";
        let result_num:number = 0;
        let result_buff:number = 0;
        let result_show:string = "";
        let resultdata = getRandomItem(result_list,is_left);
        console.log("resultdata",resultdata);
        if (is_left) {
            result_type = resultdata.left_result_type;
            result_add = resultdata.left_result;
            result_num = resultdata.left_result_add;
            result_num = resultdata.left_result_add;
            result_buff = resultdata.left_result_buff;
            result_show = resultdata.left_show;
            
        }else {
            result_type = resultdata.right_result_type;
            result_add = resultdata.right_result;
            result_num = resultdata.right_result_add;
            result_buff = resultdata.right_result_buff;
            result_show = resultdata.right_show;

        }
        //飘字显示
     AddControllers.showTips(result_type, result_add, result_num,result_buff,result_show);
     let Decctrl = DecisionController.instance;
     //负面效果
     if (result_buff == 0) {
        Decctrl.negativeResult.push(
            {
                type : result_type,
                add : result_add,
                num : result_num,
            }
         ); 
     }else {
        AddControllers.add(result_type,result_add,result_num);
     }




    }
    //销毁划过去的决策界面
    destroyDecision(){
        let Decctrl = DecisionController.instance;
        Decctrl.DecisionList[Decctrl.decision_num-1].destroy();
        Decctrl.DecisionList.splice(Decctrl.decision_num-1,1);
        console.log('销毁',Decctrl.DecisionList);
        
        Decctrl.decision_num = Decctrl.DecisionList.length;

        const Canvas = find("Canvas")
        if (GameData.userData.guideListId === 84) {
            Canvas.getComponent(guideManager).guideNext()
        }
        Decctrl.isTouch = true;
        Decctrl.closeBySelf();
    }
    //全部选择完后关闭此页面，打开消除负面弹窗
    public closeBySelf(){
        // let Decctrl = DecisionController.instance;
        // let DecBuffctrl = DecisionBuffController.instance;
        // if (Decctrl.DecisionList.length == 0 ) {
        //     BattleManager.Instance.setDecisionView(false);
        //     if (Decctrl.negativeResult.length != 0) {
        //         BattleManager.Instance.setDecisionRemoveBuff(true,Decctrl.negativeResult);  
        //     }else {
        //         BattleManager.Instance.setDecisionRemoveBuff(false,null);
        //     }
            

        // } 

    }



    update(deltaTime: number) {
        
    }
}


