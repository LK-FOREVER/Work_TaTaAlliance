import { _decorator, Button, Component, EditBox, native, Node } from 'cc';
import { ActivityControllers } from '../../Controllers/Activity/ActivityControllers';
import { SDKManagers } from '../../Common/SDKManagers';
import { LeChenManager } from '../../LeChen/LeChenManager';
import { ShowGoods } from '../../Common/ShowGoods';
import { ToastControllers } from '../../Common/ToastControllers';
const { ccclass, property } = _decorator;

@ccclass('DuiHuanView')
export class DuiHuanView extends Component {
    public static instance: DuiHuanView = null!;
    duihuan_str: string;
    btn_close: Node;
    btn_confirm: Node;
    onLoad(): void {
        DuiHuanView.instance = this;


    }

    start() {


        this.btn_close = this.node.getChildByName('btn_close');
        this.btn_close.on(Button.EventType.CLICK, (event) => {
            ActivityControllers.instance.showDuihuanView();
        })
        this.btn_confirm = this.node.getChildByName('btn_confirm');
        this.btn_confirm.on(Button.EventType.CLICK, (event) => {
            //确认按钮，链接SDK
            this.sendCDKEY();
        })

    }
    sendCDKEY(){
        let content = this.node.getChildByName('content'); 
        this.duihuan_str = content.getComponent(EditBox).string;
        if (this.duihuan_str) {
            console.log('发送兑换码',this.duihuan_str);
            LeChenManager.onQRCode(this.duihuan_str);
            content.getComponent(EditBox).string = "";
            ActivityControllers.instance.showDuihuanView();
        }
       
    }
    callCDKEY(response){
        let data = response.data;
        //获得奖励
        console.log("获得兑换码奖励",data);
        //礼包为空，被使用
        if (data.length == 0 || response.msg!= "success") {
            ToastControllers.Instance.showToast(response.msg);

            return 
            
        }
        let rewardlist:any = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            rewardlist.push(
                {   reward: element.product as unknown as Number ,
                    number:element.num
                });
        }
        
        ShowGoods.init(rewardlist);

        


    }

    update(deltaTime: number) {
        
    }
}


