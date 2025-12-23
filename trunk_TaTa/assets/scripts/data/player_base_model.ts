/**
 * 玩家基础信息池
 */
import { _decorator } from 'cc';
import EventConst from "../Utils/EventConst";
import EventManager from "../Common/EventManager";
import { Const } from '../const/consts';

export default class player_base_model{
    public base_info:any = null;
    public is_first_pve: number = 0;
	public can_show_powerchange = true;
	public can_show_lvchange = true;
	public show_powerchange_delay = false; //是否延时出现战力变化
    public set_player_base(value:any){

		if(this.base_info) {
			if(this.base_info.power !== value.base_info.power) {
				this.emit_power_change(value);
			}
		}
        this.base_info = value.base_info;
		console.log("player_base_model set_player_base", value);

        EventManager.Instance.emit(EventConst.PLAYER_BASE_CHANGE,this.base_info);
    }
	

	private emit_power_change(value) {
		if(!this.can_show_powerchange) return;
	}
}