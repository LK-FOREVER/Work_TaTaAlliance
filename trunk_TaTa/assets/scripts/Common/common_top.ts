import { _decorator, Component, find, instantiate, Sprite, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import EventConst from "../Utils/EventConst";
import LoadUtils from "../Utils/LoadUtils";
import EventManager from "../Common/EventManager";
import Utils from '../Utils/Utils';
import mainui_module from '../module/mainui_module';
import { Const } from '../const/consts';

@ccclass('common_top')
export default class common_top extends Component {

    private close_evt: string = null;
    private title_frame_name: any = null;

    protected onLoad() {
        //注册资源更新事件
        //给关闭按钮绑定事件
        let title_bg = find("title_bg", this.node);

        title_bg.getChildByName("sp_title").active = true;
        find("sp_title", title_bg).getComponent(Sprite).spriteFrame = LoadUtils.Instance.common_top.getSpriteFrame(this.title_frame_name);


        let btn_close = find("btn_close", this.node);
        btn_close.on(Node.EventType.TOUCH_END, ()=> {
            if (this.close_evt == null) {
                return;
            }
			const blockClick = mainui_module.Instance.get_model().blockClick;
			if(blockClick) {
				return;
			}

            EventManager.Instance.emit(this.close_evt, false);
           
        });
    }
    /**
     * 
     * @param close_evt 窗口开关事件名 必传
     * @param title_texture     窗口标题名      必传
     * @param desc_id 窗口功能描述id    可选
     * @param show_money 是否显示货币模块 默认显示 可选
     */
    public init(close_evt: string, title_frame_name: string, desc_id: number, sub_desc_id: number) {
        this.close_evt = close_evt;
        this.title_frame_name = title_frame_name;
    }


}
