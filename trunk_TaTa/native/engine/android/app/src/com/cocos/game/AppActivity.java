package com.cocos.game;

import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration;

import com.cocos.service.SDKWrapper;
import com.cocos.lib.CocosActivity;
import com.cocos.lib.JsbBridge;

import android.util.Log;
import android.view.View;

import java.util.HashMap;
import java.util.Map;

import AAsdk.union.Funsdk;
import AAsdk.union.common.CallBack;

import org.json.JSONObject;

public class AppActivity extends CocosActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.shared().init(this);
        Funsdk.onCreate(savedInstanceState);
        //初始化
        Funsdk.mainInit(this, new CallBack() {
            @Override
            public void onResult(Map<String, String> data, boolean isSuccess) {
                if (isSuccess) {
                    // 初始化成功
                    // login();
                    initGame();
                }
            }
        }, new CallBack() {
            @Override
            public void onResult(Map<String, String> data, boolean isSuccess) {
                if (isSuccess) {
                    // 登出（注销）成功
                }
            }
        });
    }

    public void initGame() {
        JsbBridge.setCallback(new JsbBridge.ICallback() {
            @Override
            public void onScript(String arg0, String arg1) {
                //TO DO
                if(arg0.equals("login")){
                    //call openAd method.
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() { login(); }
                    });
                } else if (arg0.equals("exit")) {
                    exit();
                } else if (arg0.equals("pay")) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() { pay(); }
                    });
                } else if (arg0.equals("getPayResult")) {
                //    getPayResult(arg1);
                } else if (arg0.equals("setPayment")) {
                //    setPayment(arg1);
                }
            }
        });
    }

    public  void login() {
        Funsdk.login(new CallBack() {
            @Override
            public void onResult(Map<String, String> data, boolean isSuccess) {
                if (isSuccess) {
                    Log.d("tag", "登录成功：" + data.get("adult_level")+" "+data.get("is_holiday"));

                    JSONObject jsonObject = new JSONObject();
                    try{
                        jsonObject.put("adult_level",data.get("adult_level"));
                        jsonObject.put("is_holiday",data.get("is_holiday"));
                        jsonObject.put("user_id",data.get("user_id"));
                        jsonObject.put("nickname",data.get("nickname"));
                        jsonObject.put("timestamp",data.get("timestamp"));
                        String jsonString = jsonObject.toString();
                        JsbBridge.sendToScript("login",jsonString);
                    }catch (Exception e) {
                        e.printStackTrace();
                        Log.e("tag", "JSON构建失败：" + e.getMessage());
                    }
                }
            }
        });
    }

    public void pay() {
        Map<String, String> payInfo = new HashMap<>();
        payInfo.put("order_id", System.currentTimeMillis() + "");       // 订单号
        payInfo.put("money", "500");                                    // 钱，单位分
        payInfo.put("product_id", "167");                               // 商品id
        payInfo.put("product_des", "魔法之路");                           // 商品描述
        payInfo.put("product_count", "1");                              // 商品数量
        payInfo.put("server_id", "8848");                               // 服务器id
        payInfo.put("server_name", "8848pro");                          // 服务器名字
        payInfo.put("role_name", "小明");                                // 角色名字
        payInfo.put("role_id", "169");                                  // 角色id
        payInfo.put("role_level", "0");                                 // 角色等级,无的话可传0
        payInfo.put("notify_url", "http://www.baidu.com");              // 支付通知回调地址
        payInfo.put("custom", "透传透传");                                // 透传
        // Funsdk.pay(payInfo);
    }


//    public void getPayResult(String id) {
//        Funsdk.getPayResult(id,new CallBack() {
//            @Override
//            public void onResult(Map<String, String> data, boolean isSuccess) {
//                if (isSuccess) {
//                    Log.d("tag", "支付成功" + data);
//                    JsbBridge.sendToScript("pay","success");
//                }
//            }
//        });
//    }

//    public void setPayment(String id) {
//        Funsdk.setPayment(id,new CallBack() {
//            @Override
//            public void onResult(Map<String, String> data, boolean isSuccess) {
//                if (isSuccess) {
//                    Log.d("tag", "支付" + data);
//                    JsbBridge.sendToScript("pay","success1");
//                }
//            }
//        });
//    }

    public void reportData(String str) {
        Funsdk.reportData(commonRoleInfo(str));
    }

    public void loginOut() {
        Funsdk.loginOut();
    }

    public void exit() {
        Funsdk.exit(new CallBack() {
            @Override
            public void onResult(Map<String, String> data, boolean isSuccess) {
                //关闭游戏
                AppActivity.this.finish();
                android.os.Process.killProcess(android.os.Process.myPid());
                System.exit(0);
            }
        });
    }

    private Map<String, String> commonRoleInfo(String reportType) {
        Map<String, String> roleParam = new HashMap<>();
        roleParam.put("report_type", reportType);                   // 上报类型,创角填"1"，升级填"2",进入游戏填"3"

        roleParam.put("server_id", "10086");                        // 服务器id
        roleParam.put("server_name", "10086s");                     // 服务器名称
        roleParam.put("role_id", "8848");                           // 角色id
        roleParam.put("role_name", "小强");                         // 角色名称
        roleParam.put("role_level", "99");                          // 角色等级
        roleParam.put("role_sex", "男");                            // 角色性别，填"男"或"女"
        roleParam.put("role_power", "5");                           // 角色战力
        roleParam.put("role_create_time", "1630655714");            // 角色创建时间，秒级时间戳
        roleParam.put("role_vip_level", "1");                       // 角色vip等级
        roleParam.put("party_id", "2");                             // 帮派（公会）id
        roleParam.put("party_name", "学习公会");                    // 帮派（公会）名称
        return roleParam;
    }

    @Override
    public void onResume() {
        super.onResume();
        SDKWrapper.shared().onResume();
        Funsdk.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        SDKWrapper.shared().onPause();
        Funsdk.onPause();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }
        SDKWrapper.shared().onDestroy();
        Funsdk.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.shared().onActivityResult(requestCode, resultCode, data);
        Funsdk.onActivityResult(this, requestCode, resultCode, data);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.shared().onNewIntent(intent);
        Funsdk.onNewIntent(intent);
    }

    @Override
    public void onRestart() {
        super.onRestart();
        SDKWrapper.shared().onRestart();
        Funsdk.onRestart();
    }

    @Override
    public void onStop() {
        super.onStop();
        SDKWrapper.shared().onStop();
        Funsdk.onStop();
    }

    @Override
    public void onBackPressed() {

        SDKWrapper.shared().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.shared().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.shared().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.shared().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    public void onStart() {
        SDKWrapper.shared().onStart();
        super.onStart();
        Funsdk.onStart();
    }

    @Override
    public void onLowMemory() {
        SDKWrapper.shared().onLowMemory();
        super.onLowMemory();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        Funsdk.onRequestPermissionsResult(this, requestCode, permissions, grantResults);
    }
}
