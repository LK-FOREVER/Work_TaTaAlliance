import { _decorator, Component, native, Node } from "cc";
import { MD5 } from "../Common/MD5";
import { GameData } from "../Common/GameData";
import { DuiHuanView } from "../Views/Activity/DuiHuanView";
import { LoginController } from "../Controllers/login/LoginController";
import { SDKManagers } from "../Common/SDKManagers";
import { MainUIControllers } from "../Controllers/MainUI/MainUIControllers";
import { TapSDKManager } from "./TapSDKManager";
import { ToastControllers } from "../Common/ToastControllers";
const { ccclass, property } = _decorator;
const domain = `https://adplatform.lc2game.com`;
const Key = "2dec661e5e682259aa48fb093a7b3bc0";
const package_id = 74;

@ccclass("LeChenManager")
export class LeChenManager extends Component {
    start() {}

    public static onLogin(arg1) {
        let parts = arg1.split("|");
        let account = parts[0];
        let nickname = parts[1];
        let game_version = "1.0";
        const logindata: any = {
            package_id: package_id,
            time: 0,
            sign: null,
            game_version: game_version,
        };
        let url = "/v1/user/login";

        //当前时间
        let date = new Date();
        logindata.time = date.getTime();
        logindata.sign = MD5.instance.hex_md5(
            package_id + "" + logindata.time + Key
        );
        let url_data = `package_id=${logindata.package_id}&time=${logindata.time}&sign=${logindata.sign}&game_version=${logindata.game_version}`;
        console.log(
            "GameData.getUserData()",
            JSON.stringify(GameData.getUserData())
        );
        console.log("account", account);
        //有本地缓存，不是第一次登录
        if (
            GameData.getUserData() &&
            account == GameData.getUserData().account
        ) {
            console.log("本地有缓存");

            logindata.user_id = GameData.getUserData().use_id;
            url_data = `package_id=${logindata.package_id}&time=${logindata.time}&sign=${logindata.sign}&user_id=${logindata.user_id}&game_version=${logindata.game_version}`;
        }

        let geturl = domain + url + "?" + url_data;
        fetch(geturl)
            .then((response: Response) => {
                return response.text();
            })
            .then((value) => {
                let response = JSON.parse(value);
                console.log("请求乐辰登录成功", JSON.stringify(response));

                LoginController.instance.callLechenLogin(response, arg1);
            })
            .catch((err) => {
                console.log("请求乐辰登录错误", JSON.stringify(err));
            });
    }
    public static onQRCode(data) {
        // console.log("请求兑换码奖励");

        let use_id = GameData.userData.use_id;

        const request: any = {
            package_id: package_id,
            time: 0,
            sign: null,
            user_id: use_id,
            code: data,
        };
        let url = "/v1/user/giftcode";
        //当前时间
        let date = new Date();
        request.time = date.getTime();
        request.sign = MD5.instance.hex_md5(
            package_id + "" + request.time + Key
        );
        let url_data = `package_id=${request.package_id}&time=${request.time}&sign=${request.sign}&user_id=${request.user_id}&code=${request.code}`;
        let geturl = domain + url + "?" + url_data;
        console.log("url_data", url_data);

        fetch(geturl)
            .then((response: Response) => {
                return response.text();
            })
            .then((value) => {
                let response = JSON.parse(value);
                console.log("请求兑换码奖励成功", response);
                DuiHuanView.instance.callCDKEY(response);
            });
    }

    //显示活动列表拍脸图
    public static onShowActivityFace() {
        let use_id = GameData.userData.use_id;
        const request: any = {
            package_id: package_id,
            time: 0,
            sign: null,
            user_id: use_id,
        };
        let url = "/v1/activity";
        //当前时间
        let date = new Date();
        request.time = date.getTime();
        request.sign = MD5.instance.hex_md5(
            package_id + "" + request.time + Key
        );
        let url_data = `package_id=${request.package_id}&time=${request.time}&sign=${request.sign}&user_id=${request.user_id}`;

        let geturl = domain + url + "?" + url_data;
        fetch(geturl)
            .then((response: Response) => {
                return response.text();
            })
            .then((value) => {
                let response = JSON.parse(value);
                console.log("请求activity-->" + value);
                MainUIControllers.instance.setActivitydata(response);
            })
            .catch((err) => {
                console.log("onShowActivityFace err-->", err);
            });
    }
    //点击广告
    public static onAdClick(position, id) {
        let use_id = GameData.userData.use_id;
        const request = {
            package_id: package_id,
            time: 0,
            sign: null,
            user_id: use_id,
            position: position,
        };
        let url = "/v1/ad/behavior/click";
        let date = new Date();
        request.time = date.getTime();
        request.sign = MD5.instance.hex_md5(
            package_id + "" + request.time + Key
        );
        let url_data = `package_id=${request.package_id}&time=${request.time}&sign=${request.sign}&user_id=${request.user_id}&position=${request.position}`;
        let geturl = domain + url + "?" + url_data;
        fetch(geturl)
            .then((response: Response) => {
                return response.text();
            })
            .then((value) => {
                let response = JSON.parse(value);
                console.log("onAdClick response-->", JSON.stringify(response));
                TapSDKManager.onPullAD(position, id);
            })
            .catch((err) => {
                console.log("onAdClick err-->", err);
            });
    }
    //广告上报
    public static AdCallback(position) {
        let use_id = GameData.userData.use_id;
        console.log("AdCallback-->", use_id);
        const request = {
            package_id: package_id,
            time: 0,
            sign: null,
            user_id: use_id,
            position: position,
        };
        let url = "/v1/ad/behavior/reward";
        let date = new Date();
        request.time = date.getTime();
        request.sign = MD5.instance.hex_md5(
            package_id + "" + request.time + Key
        );
        let url_data = `package_id=${request.package_id}&time=${request.time}&sign=${request.sign}&user_id=${request.user_id}&position=${request.position}`;
        console.log("广告上报发送数据-->", url_data);
        let geturl = domain + url + "?" + url_data;
        fetch(geturl)
            .then((response: Response) => {
                return response.text();
            })
            .then((value) => {
                let response = JSON.parse(value);
                console.log("AdCallback response-->", JSON.stringify(response));
            })
            .catch((err) => {
                console.log("AdCallback err-->", err);
            });
    }
    public static getHttp(url, request) {
        let geturl = domain + url + "?" + request;
        console.log(geturl, "geturl");
        let a = fetch(geturl).then((response: Response) => {
            return response.text();
        });
        return a.then((value) => {
            let response = JSON.parse(value);
            console.log("请求乐辰成功", response);
            return response;
        });
    }

    update(deltaTime: number) {}
}
