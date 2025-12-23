import { _decorator} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EventConst')
export class EventConst {
    public static LOAD_RES_SUCCESS: string = "LOAD_RES_SUCCESS";
    public static EXPLOSION: string = "EXPLOSION";
    public static DEAD: string = "DEAD";
    public static ATTACKED_START = "ATTACKED_START";
    public static ATTACKED_END = "ATTACKED_END";
    public static UPGRADE = "UPGRADE";
    public static UPDATE_CONTINUOUS_TASK = "UPDATE_CONTINUOUS_TASK"; 
    public static BUY = "BUY";
    public static CHOSE_SHOP_GOOD = "CHOSE_SHOP_GOOD";
    public static UPDATE_SHOP = "UPDATE_SHOP";
    public static UPDATE_GOLD_ITEM = "UPDATE_GOLD_ITEM";
    public static PLAY_AD = "PLAY_AD";
    public static CLOSE_SHOP = "CLOSE_SHOP";
    public static PURCHASE = "PURCHASE";
    public static SAVE_SUCCESS = "SAVE_SUCCESS";
    public static START_TIMER = "START_TIMER";
    public static PLAYER_ICON_SELECT = "PLAYER_ICON_SELECT";
    public static PLAYER_ICON_CHANGE = "PLAYER_ICON_CHANGE";

    public static FRIEND_CHANGE_PAGE = "FRIEND_CHANGE_PAGE";
    public static FRIEND_REFRESH_APPLY = "FRIEND_REFRESH_APPLY";
    public static SELECT_FRIEND = "SELECT_FRIEND";
    public static DELETE_FRIEND = "DELETE_FRIEND";
    public static DELETE_FRIEND_TIPS = "DELETE_FRIEND_TIPS";
    public static REFRESH_GET_SEND_BUTTON = "REFRESH_GET_SEND_BUTTON";
    public static FULL_FRIEND_TIPS = "FULL_FRIEND_TIPS";

    public static DAY_SHOP_LIMIT = "DAY_SHOP_LIMIT";
    public static MONTH_SHOP_LIMIT = "MONTH_SHOP_LIMIT";

    public static REFRESH_STAFF_INFO = "REFRESH_STAFF_INFO";
    public static QUERY_266: string = "query_266";//保存客户端的数据

}
