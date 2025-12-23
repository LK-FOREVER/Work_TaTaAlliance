import { _decorator} from "cc";
const { ccclass, property } = _decorator;

@ccclass("mainui_model")
export default class mainui_model {

	public badgeMap: Map<number, number> = new Map();

	public chatFriends = [];

	public marqueeList = []; //跑马灯

	public can_show_marquee = true;

	public sevenDaysEventsCidSet: Set<number> = new Set(); //7天活动列表

	public blockClick = false; //屏蔽其他按键
}
