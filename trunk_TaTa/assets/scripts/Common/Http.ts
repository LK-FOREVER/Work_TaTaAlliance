import { _decorator, Component } from 'cc';
import { MD5 } from './MD5';
import { GameData } from './GameData';
import { LoginController } from '../Controllers/login/LoginController';

const { ccclass, property } = _decorator;
const url = `http://game3-haiwai.julelekeji.cn/login/login_api.php`
const Key = "0Ee2lkMDT@O$ildv8GGuIxNRP02RW3ww"

let data = {
    account: 'null',
    time: 0,
    sign: '',
    type: 1
};

let url_data = `account=${data.account}&time=${data.time}&sign=${data.sign}&type=${data.type}`
//type状态
enum LOGIN_TYPE {
    LOGIN = 1,
    REGISTER = 2,
    RESET = 2,
}

@ccclass('Http')
export class Http extends Component {
    public static readonly LOGINSUCCESS: string = 'LOGINSUCCESS';
    public static readonly REGISTERSUCCESS: string = 'REGISTERSUCCESS';

    //登录请求
    public request(account) {
        //当前时间
        let date = new Date();
        data.time = date.getTime()/1000;
        data.account = account;
        console.log(account)
        
        data.sign = MD5.instance.hex_md5(data.account + data.time + Key);
        //换大写
        data.sign = data.sign.toUpperCase();
        data.type = LOGIN_TYPE.LOGIN;

        var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
        httpRequest.open('POST', url, true); //第二步：打开连接

        /**
        *发送json格式文件必须设置请求头 ；如下 - 
        */
        httpRequest.setRequestHeader("Content-type", 'application/x-www-form-urlencoded; charset=UTF-8');//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        let urldata = JSON.stringify(data);
        httpRequest.send(urldata);//发送请求 将json写入send中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = () => {
            //请求后的回调接口，可将请求成功后要执行的程序写在其中
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                var json = httpRequest.responseText;//获取到服务端返回的数据
                console.log("登录数据",json);           
                let response = JSON.parse(json);
                let { data } = response
                if (response.success === true) {
                    console.log("序列化后", data.type);
                    if (data.type == 2) {
                        console.log("登陆成功")
                        let userdata = JSON.parse(data.data1);
                        let taskdata = JSON.parse(data.data2);
                        let battledata = JSON.parse(data.data3);

                        if (userdata != null && taskdata != null && battledata != null) {
                            this.setLocalData(account, userdata, taskdata, battledata);
                            this.node.emit(Http.LOGINSUCCESS);
                        } else {
                            console.log("重新注册")
                            GameData.userData.account = account;
                            this.node.emit(Http.REGISTERSUCCESS);
                        }
                        
                    } else if (data.type == 1) {
                        console.log("注册成功")
                        GameData.userData.account = account;
                        this.node.emit(Http.REGISTERSUCCESS);
                    }
                    //更新本地用户数据
                    GameData.userData.player_id = data.player_id;
                    //GameData.Instance.sendDataRequest();
                }
            }
        }
    }

    //为新设备老号，即本地缓存为空，使用网络请求数据 
    setLocalData(account, requestuserData, requesttaskData, requestbattleData) {
        GameData.userData.account = account;
        GameData.userData = requestuserData;
        GameData.taskData = requesttaskData;
        GameData.battleData = requestbattleData;
        // this.checkIfTimeHasPassed()
    }

    deleteData() {
        const url = `http://new-game-3.julelekeji.cn/login/login_api.php`;
        const Key = "0Ee2lkMDT@O$ildv8GGuIxNRP02RW3ww";
        enum DATA_TYPE {
            DELETE = 5,
        }

        let data = {
            time: 0,
            type: 5,
        };

        //当前时间
        let date = new Date();
        data.time = date.getTime()/1000;
        data.type = DATA_TYPE.DELETE;

        var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
        httpRequest.open("POST", url, true); //第二步：打开连接

        /**
         *发送json格式文件必须设置请求头 ；如下 -
         */
        httpRequest.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        ); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        let urldata = JSON.stringify(data);
        httpRequest.send(urldata); //发送请求 将json写入send中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
            //请求后的回调接口，可将请求成功后要执行的程序写在其中
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                //验证请求是否发送成功
                var json = httpRequest.responseText; //获取到服务端返回的数据
                console.log("删除数据",json);
            }
        };
    }
}
