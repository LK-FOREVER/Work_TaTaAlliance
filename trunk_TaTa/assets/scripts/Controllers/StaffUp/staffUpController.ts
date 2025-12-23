import {_decorator,Button,Component,error,find,JsonAsset,Label,Node,NodeEventType,resources,RichText,Sprite,SpriteFrame,sys,} from "cc";
import { GameData } from "../../Common/GameData";
import { TapSDKManager } from "../../LeChen/TapSDKManager";
import { ShowGoods } from "../../Common/ShowGoods";
import { GameApp } from "../../GameApp";
import { LoadUtils } from "../../Common/LoadUtils";
import { MoYangManagers } from "../../MoYang/MoYangManagers";
import { SDKManagers } from "../../Common/SDKManagers";
import { LeChenManager } from "../../LeChen/LeChenManager";
const { ccclass, property } = _decorator;

@ccclass("staffUpController")
export class staffUpController extends Component {
    @property(Node)
    staff_up_top: Node = null;
    @property(Node)
    top_text: Node = null;
    @property(Node)
    reward_debris: Node = null;
    @property(Node)
    reward_money: Node = null;
    @property(Node)
    staff_up_receive_btn: Node = null;
    @property(Node)
    staff_up_close_text: Node = null;
    @property(Node)
    staff_up_buttom_text: Node = null;

    staff_up_info = null;
    nowStaffUpInfo = null;

    public static Instance: staffUpController = null!;
    protected onLoad(): void {
        staffUpController.Instance = this;
    }
    start() {
        //直升信息
        resources.load("data/staff_up__get_info",(err: any, res: JsonAsset) => {
                if (err) {
                    error(err.message || err);
                    return;
                }
                const jsonData = res.json!;
                this.staff_up_info = jsonData;
                this.updateUI(false);
            });

        // 点击领取
        this.staff_up_receive_btn.on(Button.EventType.CLICK, (event) => {
            const Canvas = find("Canvas");
            // if (sys.isNative) {
            //     TapSDKManager.onPullAD("6");
            // } else {
            //    this.receiveFn();
            // }
            if (!SDKManagers.SdkOn) {
                this.receiveFn();
                return;
            }
            if (sys.isNative) {
                if (SDKManagers.SDKType === 1) {
                    LeChenManager.onAdClick(SDKManagers.Positions.THREE, "6");
                }
                return;
            }
            MoYangManagers.AD_id = "6";
            MoYangManagers.playAd();
        });
        // 暂不领取
        this.staff_up_close_text.on(NodeEventType.TOUCH_END, (event) => {
            this.node.destroy();
        });
    }

    receiveFn() {
        console.log("角色直升6");

        console.log("GameData.userData.staffUpId", GameData.userData.staffUpId);
        // 对比剩余看广告的数量
        if (GameData.userData.staffUpLastNeedAdNum < this.nowStaffUpInfo.need_watch_ad_num) {
            // 每次点击将需观看的广告数量+1
            GameData.userData.staffUpLastNeedAdNum += 1;
            // 更新下方文字
            this.staff_up_buttom_text.getComponent(RichText).string = `<b><color=#84c03f>需观看广告数量：</color><color=#d04c42}>${GameData.userData.staffUpLastNeedAdNum}</color><color=#84c03f>/${this.nowStaffUpInfo.need_watch_ad_num}</color></b>`;
        }
        if (GameData.userData.staffUpLastNeedAdNum === this.nowStaffUpInfo.need_watch_ad_num) {
            const rewardList = [];
            // 遍历奖励数据
            this.nowStaffUpInfo.reward_data.forEach((rewardItem, index) => {
                const reward = {
                    reward: rewardItem.k,
                    number: rewardItem.v,
                };
                rewardList.push(reward);

                // 如果是资金的话就添加引导任务
                // if (rewardItem.k === 1) {
                //     GameData.taskData.taskMoneyNum += rewardItem.v;
                // }
            });
            // 奖励弹窗
            ShowGoods.init(rewardList);

            // 更新显示
            let MainTop = find("Canvas").getChildByName("MainTop");
            MainTop.getComponent(GameApp).updateplayerinfo();

            // 已经领取奖励就将id+1 并更新ui
            GameData.userData.staffUpId += 1;
            // 判断是否全部领完
            if (GameData.userData.staffUpId >= this.staff_up_info.length) {
                this.updateUI(true, true);
            } else {
                this.updateUI(true);
            }
        }
    }

    // 每次看完全部广告更换角色的时候调用
    updateUI(updataAD, isHide = false) {
        const Canvas = find("Canvas");
        if (isHide) {
            this.node.destroy();
            // 隐藏主场景图标
            Canvas.getChildByName("open_up_btn").active = false;
        }
        this.staff_up_info.forEach((item) => {
            // 已领取的奖励id+1为下一个奖励   例：未领取奖励时id为0,0+1=1，下一个要领取的奖励为1
            if (item.id === GameData.userData.staffUpId + 1) {
                this.nowStaffUpInfo = item;
                // 判断是否到达领取奖励的条件
                // 到达时：topText为item.unlock_text并启用看广告领取按钮
                // 未到达时：topText为item.lock_text并禁用看广告领取按钮
                if (GameData.userData.max_chapter - 1 >= item.pass_chapter) {
                    // 按钮启用
                    this.staff_up_receive_btn.getComponent(Button).interactable = true;
                    // 取消变灰
                    this.staff_up_receive_btn.getComponent(Sprite).grayscale = false;
                    // 修改顶部文字
                    this.top_text.getComponent(RichText).string = item.unlock_text;
                } else {
                    // 按钮禁用
                    this.staff_up_receive_btn.getComponent(Button).interactable = false;
                    // 按钮变灰
                    this.staff_up_receive_btn.getComponent(Sprite).grayscale = true;
                    // 修改顶部文字
                    this.top_text.getComponent(RichText).string = item.lock_text;
                }

                // 奖励列表
                item.reward_data.forEach((rewardItem, index) => {
                    console.log("rewardItem", rewardItem);
                    rewardItem.k === 1
                        ? (this.reward_money.getChildByName("staff_up_reward_num").getComponent(Label).string = rewardItem.v)
                        : (resources.load(`images/goods/${rewardItem.k}/spriteFrame`,SpriteFrame,(err, sp) => {
                                  this.reward_debris.getChildByName("staff_up_reward_icon").getComponent(Sprite).spriteFrame = sp;
                              }),(this.reward_debris.getChildByName("staff_up_reward_num").getComponent(Label).string = rewardItem.v));
                });
                // 更新顶部角色
                // resources.load(`textures/staff_up/staff_up_top_${item.staff_id < 10 ? "0" + item.staff_id : item.staff_id}/spriteFrame`, SpriteFrame, (err, sp) => {
                //     this.staff_up_top.getComponent(Sprite).spriteFrame = sp
                // })
                let sp = LoadUtils.Instance.staff_up.getSpriteFrame(`staff_up_top_${item.staff_id < 10 ? "0" + item.staff_id : item.staff_id}`);
                this.staff_up_top.getComponent(Sprite).spriteFrame = sp;
                // 更新主场景图标
                // resources.load(`textures/staff_up/staff_up_btn_${item.staff_id < 10 ? "0" + item.staff_id : item.staff_id}/spriteFrame`, SpriteFrame, (err, sp) => {
                //     Canvas.getChildByName("open_up_btn").getComponent(Sprite).spriteFrame = sp
                // })
                let sp2 = LoadUtils.Instance.staff_up.getSpriteFrame(`staff_up_btn_${item.staff_id < 10 ? "0" + item.staff_id : item.staff_id}`);
                Canvas.getChildByName("open_up_btn").getComponent(Sprite).spriteFrame = sp2;
                // 判断是否需要更新广告数量
                // 如果id为1的话更新一次
                if (item.id === 1) {
                    // 更新需观看广告数量
                    GameData.userData.staffUpLastNeedAdNum = 0;
                }
                if (updataAD) {
                    // 更新需观看广告数量
                    GameData.userData.staffUpLastNeedAdNum = 0;
                }
                // 更新下方文字
                this.staff_up_buttom_text.getComponent(RichText).string = `<b><color=#84c03f>需观看广告数量：</color><color=#d04c42}>${GameData.userData.staffUpLastNeedAdNum}</color><color=#84c03f>/${this.nowStaffUpInfo.need_watch_ad_num}</color></b>`;
            }
        });
    }

    updateMainUIIcon() {
        // 更新主场景图标
        const Canvas = find("Canvas");
        // resources.load(`textures/staff_up/staff_up_btn_${this.nowStaffUpInfo.staff_id < 10 ? "0" + this.nowStaffUpInfo.staff_id : this.nowStaffUpInfo.staff_id}/spriteFrame`, SpriteFrame, (err, sp) => {
        //     Canvas.getChildByName("open_up_btn").getComponent(Sprite).spriteFrame = sp
        // })
        let sp2 = LoadUtils.Instance.staff_up.getSpriteFrame(`staff_up_btn_${this.nowStaffUpInfo.staff_id < 10 ? 
            "0" + this.nowStaffUpInfo.staff_id
            : this.nowStaffUpInfo.staff_id}`);
        Canvas.getChildByName("open_up_btn").getComponent(Sprite).spriteFrame = sp2;
    }
}
