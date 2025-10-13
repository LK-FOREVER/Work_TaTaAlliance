import { _decorator, Component, Label, sys } from 'cc';
import { LoginController } from '../Controllers/login/LoginController';
import { BattleLockBuildControllers } from '../Controllers/Battle/BattleLockBuildControllers';
import { BoxRewardControllers } from '../Controllers/Battle/BoxRewardControllers';
import { bonusController } from '../Controllers/Bonus/bonusController';
import { DecisionBuffController } from '../Controllers/Decision/DecisionBuffController';
import { HangupController } from '../Controllers/Hangup/HangupController';
import { SevenSignController } from '../Controllers/SevenSign/SevenSignController';
import { staffUpController } from '../Controllers/StaffUp/staffUpController';
import { InviteController } from '../Controllers/invite/InviteController';
import { promotion_free } from '../Controllers/promotion/promotion_free';
import { BattleManager } from '../Managers/BattleManager';
import { MD5 } from '../Common/MD5';
import { MainUIControllers } from '../Controllers/MainUI/MainUIControllers';
import { ToastControllers } from '../Common/ToastControllers';
import { AudioManager } from '../Managers/AudioManager';
import { HangupToplimitController } from '../Controllers/Hangup/HangupToplimitController';
const { ccclass, property } = _decorator;
declare var tt: any;
@ccclass('MoYangManagers')
export class MoYangManagers extends Component {
    public static is_record = false;
    public static videoPath: any;
    public static AD_id: string;
    //require('./sdk/dysdk_v1.0.js');
    //获取用户信息授权接口及登录
    public static getUserInfo() {
        dyb.getDybUserInfo(function (callback) {
            console.log('getDyUserInfo-------------:' + JSON.stringify(callback));
            let nickname = "优秀员工";
            // tt.getUserInfo({
            //     success(res) {
            //         console.log(`getUserInfo 调用成功`, res.userInfo);
            //         nickname = res.userInfo.nickName;
            //         let account = callback.user.openid;
            //         let userdata = account + "|" + nickname + "|" + callback.user.openid;
            //         LoginController.instance.onlogin(userdata);
            //         setTimeout(() => {
            //             MoYangManagers.creatrRole(nickname);
            //         }, 4)
            //     },
            //     fail(res) {
            //         console.log(`getUserInfo 调用失败`, res.errMsg);
            //     },
            // });
            let account = callback.user.openid;
            let userdata = account + "|" + nickname + "|" + callback.user.openid;
            LoginController.instance.onlogin(userdata);
            setTimeout(() => {
                MoYangManagers.creatrRole(nickname);
            }, 4)
        })
        //  getDyUserInfo-------------:{"user":{"openid":"_000tSU1U4sQNo0lzULmCcewwj1ejdD0jMQe","sign":"ecebeb265bb64dba8c34e99077fdcb3a"},"shareInfo":{}}
    }
    //创角信息上报
    public static creatrRole(role_name) {
        //创建角色
        let param = {
            server_id: 1,
            server_name: '服务器',
            role_name: role_name,
        }
        dyb.createRole(param, function (callback) {
            console.log('roleData:' + JSON.stringify(callback));
        });
        // roleData:{"code":1,"msg":"角色已经上报","time":"1586418685","data":null}
    }
    //反垃圾接口（内容检测接口）
    public static checkmsg(txt: string) {
        let data = txt;
        data = '特3456书yuuo莞6543李zxcz蒜7782法fgnv级';
        dyb.msg_check(data, function (callback) {
            console.log('内容检测:' + JSON.stringify(callback));
        });
        // {
        //     "code": 1, //(0检验失败，1检验通过)
        //      "msg": ""
        //     }
    }
    //支付接口
    public static paysdk() {
        let pay_data = {
            pay_amount: 1,
            extra_info: 'a=b',
            goods_count: 1,
            goods_name: '测试商品',
            redirect_uri: 'http://nginx56.local/test',
            role_name: '无角色',
            server_name: '默认服务器',
            order_sn: 1111,
        }
        dyb.submitOrder(pay_data, function (callback) {
            console.log('生成订单:' + JSON.stringify(callback));
        });
        // {
        //     "code": 1, //(0失败，直接提示，1调用成功)//此处仅提供前端参考，游戏发货必须以服务端支付回调为准
        //     "msg": "成功"
        //     }
    }
    //激励视频广告
    public static playAd() {
        // let AD_id = id;
        // console.log("广告id",id);
        AudioManager.ins._music.pause();
        dyb.createVideoAd('2a6nkn7mkama127ehb', function (call) {

            //call返回的state有三种状态，分别是show,close,error
            //show {"state":"show","isEnded":false,"msg":"视频展示成功"}
            //close {"state":"close","isEnded":true,"msg":"视频广告关闭"}
            //error {"state":"error","isEnded":false,"msg":"视频广告错误"}

            console.log(JSON.stringify(call), 'createRewardedVideoAd')
            if (call.state == 'close' && call.isEnded) {
                //视频完整看完，进行发送奖励
                console.log('视频完整看完，进行发送奖励', MoYangManagers.AD_id)
                AudioManager.ins._music.play();
                switch (MoYangManagers.AD_id) {
                    case "1":
                        //招聘次数不够时看广告进行招聘
                        InviteController.Instance.inviteStaff(true)
                        break;
                    case "2":
                        //职位晋升时金币不足看广告领取-
                        promotion_free.Instance.promotionFree()
                        break;
                    case "3":
                        //季度奖金看广告领取金币
                        bonusController.Instance.bonusReceiveFn()
                        break;
                    case "4":
                        //领取宝箱奖励时看广告领取三倍奖励
                        BoxRewardControllers.Instance.setDoubleReward();
                        break;
                    case "5":
                        //决策有负面效果时看广告消除负面效果
                        DecisionBuffController.instance.setremovebuff();
                        break;
                    case "6":
                        //角色直升领取奖励
                        staffUpController.Instance.receiveFn();
                        break;
                    case "7":
                        //观看广告解锁建造点
                        BattleLockBuildControllers.instance.changeBuild();
                        break;
                    case "8":
                        //观看广告释放全体禁锢
                        BattleManager.Instance.onAdAllStop();
                        break;
                    case "9":
                        //观看广告释放全体伤害
                        BattleManager.Instance.onAdAllHurt();
                        break;
                    case "10":
                        //七日登录
                        SevenSignController.Instance.receiveFn(true);
                        break;
                    case "11":
                        //挂机奖励
                        HangupController.Instance.receiveFn(true);
                        break;
                    case "12":
                        //增加挂机时长
                        HangupToplimitController.instance.hangup();
                        break;

                }
            } else {
                console.log('//视频没看完')
            }
        })
    }
    //录制游戏
    public static recordScreen() {
        const recorder = tt.getGameRecorderManager();
        if (!MoYangManagers.is_record) {
            tt.getSystemInfo({
                success(res) {
                    const screenWidth = res.screenWidth;
                    const screenHeight = res.screenHeight;

                    var maskInfo = recorder.getMark();
                    var x = (screenWidth - maskInfo.markWidth) / 2;
                    var y = (screenHeight - maskInfo.markHeight) / 2;

                    recorder.onStart((res) => {
                        console.log("录屏开始");
                        MoYangManagers.is_record = true;
                        MainUIControllers.instance.txt_record.getComponent(Label).string = "录制中"
                    });
                    //添加水印并且居中处理
                    recorder.start({
                        duration: 30,
                        isMarkOpen: true,
                        locLeft: x,
                        locTop: y,
                    });
                },
            });
        } else {
            recorder.onStop((res) => {
                MoYangManagers.is_record = false;
                MainUIControllers.instance.txt_record.getComponent(Label).string = "录制游戏"
                console.log(res.videoPath);
                tt.shareAppMessage({
                    title: "鬼王晋升之路",
                    channel: "video",
                    extra: {
                        videoPath: res.videoPath, //录屏后得到的文件地址
                        withVideoId: true,
                    },
                    success(res) {
                        tt.showModal({
                            title: "分享成功",
                            // content: JSON.stringify(res),
                        });
                    },
                    fail(e) {
                        // tt.showModal({
                        //     title: "分享失败",
                        //     content: JSON.stringify(e),
                        // });
                        if (e.errNo == 21105) {
                            ToastControllers.Instance.showToast("录屏需超过3S");
                        }

                    },
                });
            });

            recorder.stop();
        }


    }

    //分享录屏
    public static sharerecord() {
        tt.shareAppMessage({
            title: "鬼王晋升之路",
            channel: "video",
            extra: {
                // videoTopics: ["休闲游戏", "地府打工"], // 抖音或头条小视频话题列表
                videoPath: MoYangManagers.videoPath,
                withVideoId: true,
            },
            success(res) {
                tt.showModal({
                    title: "分享成功",
                    content: JSON.stringify(res),
                });
            },
            fail(e) {
                tt.showModal({
                    title: "分享失败",
                    content: JSON.stringify(e),
                });
                if (e.errNo == 21105) {
                    ToastControllers.Instance.showToast("录屏需超过3S");
                }
            },
        });
    }
    //添加桌面
    public static addDesktop() {
        dyb.addShortcut(function (callback) {
            console.log('添加桌面:' + JSON.stringify(callback));
        })
        // {
        //     "code": 1, //(0添加失败，1添加成功，2已经添加(仅安卓设备))
        //      "msg": ""
        //     }
    }
    //主动分享
    public static onShare() {
        var param = {
            title: '鬼王晋升之路',
            desc: '鬼王晋升之路',
            imageUrl: '',
            query: 'a=b'
        }
        dyb.share(param, function (call) {
            console.log(JSON.stringify(call), '主动分享')
        });
        // {
        //     "code": 1, //0分享失败，1分享成功
        //     "msg": "分享成功"
        //     }
    }


}


