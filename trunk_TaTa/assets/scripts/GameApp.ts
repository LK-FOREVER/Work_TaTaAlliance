import {_decorator,Component,Label,Node,resources,Sprite,SpriteFrame,JsonAsset,error,EventTarget,} from "cc";
import { GameData } from "./Common/GameData";
const { ccclass, property } = _decorator;

@ccclass("GameApp")
export class GameApp extends Component {
    main_top: Node;
    player_name: Node;
    head_icon: Node;
    player_career: Node;
    crystal_value: Node;
    coin_value: Node;
    performance_value: Node;
    career_bg: Node;
    public static instance: GameApp = null;

    init(): void {
        //初始化游戏框架
        GameApp.instance = this;
    }

    start(): void {
        this.updateplayerinfo();
    }
    //刷新玩家头像，名称，职位，冥币，事件值，业绩值等数据
    public updateplayerinfo() {
        //获取组件
        this.main_top = this.node.getChildByName("main_top");
        this.player_name = this.main_top.getChildByName("player_name");
        this.head_icon = this.main_top.getChildByName("head_icon");
        this.career_bg = this.main_top.getChildByName("career_bg");
        this.player_career = this.career_bg.getChildByName("player_career");
        let crystal_bg = this.main_top.getChildByName("crystal_bg");
        this.crystal_value = crystal_bg.getChildByName("crystal_value");
        let coin_bg = this.main_top.getChildByName("coin_bg");
        this.coin_value = coin_bg.getChildByName("coin_value");
        let performance_bg = this.main_top.getChildByName("performance_bg");
        this.performance_value = performance_bg.getChildByName("performance_value");

        let parmas = GameData.userData;

        //刷新数据
        let name_txt = this.player_name.getComponent(Label);
        name_txt.string = parmas.nickName_InGame;
        // let head = this.head_icon.getComponent(Sprite);
        //头像
        // resources.load("images/head/"+parmas.head+"/spriteFrame",SpriteFrame,(err,spriteFrame) => {
        //     if (err) {
        //         console.log(err);
        //         return
        //     }
        //     if (head) {
        //         head.spriteFrame = spriteFrame;
        //     }
        // })

        // let career_txt = this.player_career.getComponent(Label);

        //职位
        // resources.load("data/promotion/staff_position",(err: any, res: JsonAsset) => {
        //         if (err) {
        //             error(err.message || err);
        //             return;
        //         }
        //         const jsonData: object = res.json!;
        //         for (const key in jsonData) {
        //             if (parmas.career == jsonData[key].id) {
        //                 career_txt.string = jsonData[key].small_position;
        //                 //职位背景
        //                 resources.load("textures/career/" + jsonData[key].major_position_id + "/spriteFrame",SpriteFrame,(err, spriteFrame) => {
        //                         if (err) {
        //                             console.log(err);
        //                             return;
        //                         }
        //                         this.career_bg.getComponent(Sprite).spriteFrame = spriteFrame;
        //                     });
        //             }
        //         }
        //     });
        let crystal_txt = this.crystal_value.getComponent(Label);
        crystal_txt.string = GameData.num2cn(parmas.hasGoodsList[11]) as unknown as string;
        let coin_txt = this.coin_value.getComponent(Label);
        coin_txt.string = GameData.num2cn(parmas.hasGoodsList[1]) as unknown as string;
        let performance_txt = this.performance_value.getComponent(Label);
        performance_txt.string = GameData.num2cn(parmas.hasGoodsList[2]) as unknown as string;
        GameData.setUserData();
    }
}
