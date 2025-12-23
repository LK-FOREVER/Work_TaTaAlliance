import { _decorator, Component, Node } from 'cc';
import { GameData } from '../Common/GameData';
const { ccclass, property } = _decorator;
//用于管理游戏主流程

export class GameManager extends Component {
    /**
     *  初始化单例
     */
    public static Instance:GameManager = null!;

    onLoad(): void {
        if(GameManager.Instance === null) {
            GameManager.Instance = this;
        }else {
            this.destroy();
            return;
        }

        //存储用户数据
    //     this.schedule(()=>{
    //   //      console.log('saveUserData_local');
    //         // GameData.saveData();},30
    //     );
    }
    

    //改变待选择员工列表
    public upateWaitTowerList(){
        let WaitTowerList = GameData.battleData.WaitTowerList;
        

    }
    //改变上阵员工列表
    public upateBuildTowerList(){

    }
    //获取员工数据
    public getTowerInfo(){

    }




}
