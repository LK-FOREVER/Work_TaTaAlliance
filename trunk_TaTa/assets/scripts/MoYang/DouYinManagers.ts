import { _decorator, Component, Node } from 'cc';
import { LoginController } from '../Controllers/login/LoginController';
const { ccclass, property } = _decorator;
declare var tt:any;
@ccclass('DouYinManagers')
export class DouYinManagers extends Component {
    //抖音登录
    public static douyinLogin() {
        //抖音登录
        tt.login({
            force: true,
            success(res) {
                // 成功调用
                console.log(`login 调用成功${res.code} ${res.anonymousCode}`);
                DouYinManagers.getUserInfo();

            },
            fail(res) {
                console.log(`login 调用失败`);
                console.log(res.anonymousCode)
            },
        });
    }
    public static checkLogin() {
        tt.checkSession({
            success() {
                console.log(`session 未过期`);
            },
            fail() {
                console.log(`session 已过期，需要重新登录`);
                tt.login({
                    success: (res) => {
                        console.log("登录成功", res);
                    },
                    fail: (err) => {
                        console.log("登录失败", err);
                    },
                });
            },
        });
    }
    public static getUserInfo() {
        // 调用 getUserInfo 前, 请确保登录成功
        // 获取用户信息
        tt.getUserInfo({
            // withCredentials: true,
            // withRealNameAuthenticationInfo: true,
            success(res) {
                console.log(`getUserInfo 调用成功`, res.userInfo);
                let nickname = res.userInfo.nickName;
                let account = res.userInfo.nickName;
                let userdata = account + "|" + nickname + "|" + res.userInfo.nickName;
                LoginController.instance.onlogin(userdata);
            },
            fail(res) {
                console.log(`getUserInfo 调用失败`, res.errMsg);
            },
        });
    }
    public static realName() {
        //实名认证需要用户点击触发
        tt.onTouchEnd(realNameAuth);
        function realNameAuth() {
            tt.authenticateRealName({
                success(_res) {
                    console.log("用户实名认证成功");
                },
                fail(res) {
                    console.log("用户实名认证失败", res.errMsg);
                },
            });
        }
    }
}


