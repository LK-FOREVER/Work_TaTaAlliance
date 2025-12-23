import { _decorator } from "cc";
export default class EventConst {
    // 协议事件名
    // 登录
    public static QUERY_101: string = "query_101";
    public static REPLY_101: string = "reply_101";
    public static REPLY_102: string = "reply_102";
    public static REPLY_103: string = "reply_103";

    //数据
    public static QUERY_265: string = "query_265";//请求客户端的数据
    public static REPLY_265: string = "reply_265";
    public static QUERY_266: string = "query_266";//保存客户端的数据
    public static REPLY_266: string = "reply_266";

    // 好友
    public static QUERY_300: string = "query_300"; //查询好友列表
    public static QUERY_304: string = "query_304"; //删除好友
    public static QUERY_305: string = "query_305"; //可添加为好友的陌生人列表
    public static QUERY_306: string = "query_306"; //申请添加好友
    public static QUERY_307: string = "query_307"; //批量添加好友
    public static QUERY_310: string = "query_310"; //好友申请列表
    public static QUERY_311: string = "query_311"; //同意 好友申请
    public static QUERY_312: string = "query_312"; //批量同意 好友申请
    public static QUERY_314: string = "query_314"; //批量忽略好友申请，单个忽略也调用这个
    public static QUERY_315: string = "query_315"; //黑名单列表
    public static QUERY_316: string = "query_316"; //加入黑名单
    public static QUERY_317: string = "query_317"; //移出黑名单
    public static QUERY_318: string = "query_318"; //黑名单留言
    public static QUERY_319: string = "query_319"; //留言次数信息
    public static QUERY_320: string = "query_320"; //查看其他玩家信息
    public static QUERY_321: string = "query_321"; //赠与好友道具
    public static REPLY_300: string = "reply_300";
    public static REPLY_304: string = "reply_304";
    public static REPLY_305: string = "reply_305";
    public static REPLY_306: string = "reply_306";
    public static REPLY_307: string = "reply_307";
    public static REPLY_310: string = "reply_310";
    public static REPLY_311: string = "reply_311";
    public static REPLY_312: string = "reply_312";
    public static REPLY_313: string = "reply_313";
    public static REPLY_314: string = "reply_314";
    public static REPLY_315: string = "reply_315";
    public static REPLY_316: string = "reply_316";
    public static REPLY_317: string = "reply_317";
    public static REPLY_318: string = "reply_318";
    public static REPLY_319: string = "reply_319";
    public static REPLY_320: string = "reply_320";
    public static REPLY_321: string = "reply_321";


    // 聊天
    public static QUERY_400: string = "query_400"; //获取历史聊天记录
    public static QUERY_402: string = "query_402"; //发送新消息
    public static QUERY_405: string = "query_405"; //设置屏蔽聊天频道
    public static QUERY_406: string = "query_406"; //获取私聊好友列表
    public static QUERY_407: string = "query_407"; //私聊发送新消息
    public static QUERY_408: string = "query_408"; //获取历史聊天记录
    public static QUERY_409: string = "query_409"; //删除或者添加私聊信息
    public static QUERY_410: string = "query_410"; //删除红点
    public static QUERY_411: string = "query_411"; //红包领取奖励/查看详情
    public static QUERY_412: string = "query_412"; //查看个人的获奖记录
    public static QUERY_413: string = "query_413"; //获取已读取过的红包
    public static REPLY_400: string = "reply_400";
    public static REPLY_401: string = "reply_401"; //推送新消息
    public static REPLY_402: string = "reply_402";
    public static REPLY_405: string = "reply_405";
    public static REPLY_406: string = "reply_406";
    public static REPLY_407: string = "reply_407";
    public static REPLY_408: string = "reply_408";
    public static REPLY_409: string = "reply_409";
    public static REPLY_410: string = "reply_410";
    public static REPLY_411: string = "reply_411";
    public static REPLY_412: string = "reply_412";
    public static REPLY_413: string = "reply_413";

    // 玩家
    public static QUERY_200: string = "query_200";
    public static REPLY_200: string = "reply_200";
    public static REPLY_201: string = "reply_201";
    public static QUERY_204: string = "query_204";
    public static REPLY_204: string = "reply_204";
    public static REPLY_205: string = "reply_205";
    public static QUERY_206: string = "query_206";
    public static REPLY_206: string = "reply_206";
    public static REPLY_207: string = "reply_207";
    public static QUERY_208: string = "query_208";
    public static REPLY_208: string = "reply_208";
    public static QUERY_211: string = "query_211";
    public static REPLY_211: string = "reply_211";
    public static QUERY_213: string = "query_213";
    public static REPLY_213: string = "reply_213";
    public static QUERY_214: string = "query_214";
    public static REPLY_214: string = "reply_214";
    public static QUERY_228: string = "query_228";
    public static QUERY_209: string = "query_209";
    public static REPLY_209: string = "reply_209";


    //邮件
    public static QUERY_100001: string = "query_100001"; //获取
    public static REPLY_100001: string = "reply_100001";
    public static QUERY_100002: string = "query_100002"; // 读取
    public static REPLY_100002: string = "reply_100002";
    public static QUERY_100003: string = "query_100003"; // 领取附件
    public static REPLY_100003: string = "reply_100003";
    public static QUERY_100004: string = "query_100004"; //一键领取附件
    public static REPLY_100004: string = "reply_100004";
    public static QUERY_100005: string = "query_100005"; //一键删除邮件
    public static REPLY_100005: string = "reply_100005";
    public static QUERY_100006: string = "query_100006"; //删除单个邮件
    public static REPLY_100006: string = "reply_100006";
    public static REPLY_100008: string = "reply_100008"; // 推送新邮件

    //排行榜
    public static QUERY_5901: string = "query_5901"; // 操作过程用红点状态
    public static REPLY_5901: string = "reply_5901";
    //窗口事件名

    // 用户基础信息
    public static PLAYER_BASE_CHANGE: string = "PLAYER_BASE_CHANGE";
    public static PLAYER_ASSETS_CHANGE: string = "PLAYER_ASSETS_CHANGE";
    // 登录
    public static OPEN_LOADING_VIEW: string = "OPEN_LOADING_VIEW";
    public static OPEN_LOGIN_VIEW: string = "OPEN_LOGIN_VIEW";
    public static LOAD_RES_SUCCESS: string = "LOAD_RES_SUCCESS";
    // 主UI
    public static OPEN_MAINUI_VIEW: string = "OPEN_MAINUI_VIEW";
    // 服务器选择
    public static OPEN_SELECT_SERVER_VIEW: string = "OPEN_SELECT_SERVER_VIEW";
    // 公告
    public static OPEN_NOTICE_VIEW: string = "OPEN_NOTICE_VIEW";
    //邮箱
    public static OPEN_MAIL_VIEW: string = "OPEN_MAIL_VIEW";

    // 个人信息
    public static OPEN_PLAYER_INFO_VIEW: string = "OPEN_PLAYER_INFO_VIEW";

    //排行榜
    public static OPEN_RANK_VIEW: string = "OPEN_RANK_VIEW"; //打开排行榜

    // 好友
    public static OPEN_FRIEND_VIEW: string = "OPEN_FRIEND_VIEW"; //打开好友界面
    public static UPDATE_FRIEND_LIST: string = "UPDATE_FRIEND_LIST"; //更新好友列表

    // 聊天
    public static OPEN_CHAT_VIEW: string = "OPEN_CHAT_VIEW"; //打开聊天界面
    public static INIT_CHAT: string = "INIT_CHAT"; //初始化聊天界面
    public static UPDATE_CHAT_LIST: string = "UPDATE_CHAT_LIST"; //更新聊天列表
    public static UPDATE_MAIN_CHAT_LIST: string = "UPDATE_MAIN_CHAT_LIST"; //更新主页聊天列表
    public static SEND_CHAT: string = "SEND_CHAT"; //发送新消息
    public static DISABLE_CHAT: string = "DISABLE_CHAT"; //禁用发送新消息
    public static UPDATE_CHAT_FRIEND_LIST: string = "UPDATE_CHAT_FRIEND_LIST"; //更新聊天好友列表
    public static UPDATE_CHAT_FRIEND_CHAT_LIST: string = "UPDATE_CHAT_FRIEND_CHAT_LIST"; //更新聊天好友消息
    public static UPDATE_CHANNEL_HIDDEN: string = "UPDATE_CHANNEL_HIDDEN"; //更新屏蔽聊天频道



    //加载资源
    public static LOAD_RES_PROGRESS: string = "LOAD_RES_PROGRESS"; //加载资源
    public static LOAD_DATA_PROGRESS: string = "LOAD_DATA_PROGRESS"; //加载大的view预制体
    //公告
    public static QUERY_NOTICE: string = "QUERY_NOTICE";
    //设置
    public static OPEN_SET_VIEW: string = "OPEN_SET_VIEW";
    //留言
    public static OPEN_MESSAGE_VIEW: string = "OPEN_MESSAGE_VIEW";
    //选服
    public static CHANGE_SERVER: string = "CHANGE_SERVER";
    public static RESTART_INIT: string = "RESTART_INIT";
    //加载prefab
    public static LOAD_PREFABS_COMPLETE: string = "LOAD_PREFABS_COMPLETE";
    public static NETCLOSED: string = "NETCLOSED";
    public static GAME_RES_START_LOAD: string = "GAME_RES_START_LOAD";
    // 网络连接成功
    public static NETWORK_CONNECT_SUCCESS: string = "NETWORK_CONNECT_SUCCESS";
}