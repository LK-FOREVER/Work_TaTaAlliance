import { _decorator, Button, Component, Label, Node, RichText, Toggle } from 'cc';
import { StorageManager } from '../Managers/StorageManager';
import { Const } from '../const/consts';
import Utils from '../Utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('common_tips_view')
export class common_tips_view extends Component {
    @property({ type: Node, displayName: "关闭" })
    close: Node = null!
    @property({ type: Node, displayName: "标题" })
    title: Node = null!
    @property({ type: Node, displayName: "内容" })
    container_text: Node = null!
    @property({ type: Node, displayName: "取消按钮" })
    cancel_btn: Node = null!
    @property({ type: Node, displayName: "确认按钮" })
    confirm_btn: Node = null!
	@property(Toggle)
	toggle: Toggle = null;

	private _skipTipInfo: any = null; // null和0为不跳过  其余为可跳过
    /**
     * 创建提示弹窗
     * @param msg 提示弹窗的内容
     * @param title 提示弹窗的标题
     * @param type 类型，需传入数字，1为确认和取消，2为确认
     * @param yes_cb 确认时的回调
     * @param default_yes 任何点击都会触发确认回调
     */
    public init(msg: string, title: string, type: 1 | 2, yes_cb: Function, no_cb: Function = undefined,default_yes:boolean = false,enable_toggle:boolean = true) {
        this.container_text.getComponent(RichText).string = msg
        this.title.getComponent(Label).string = title
        if (type === 1) {
            this.confirm_btn.active = true
            this.cancel_btn.active = true
        } else if (type === 2) {
            this.confirm_btn.active = true
            this.confirm_btn.setPosition(0,15);
            this.cancel_btn.active = false
        }
        const callback = (evt) => {
            let target_name = evt.target.name;
            if (target_name === "confirm_btn" || default_yes) {
                yes_cb()
                this.node.destroy()
                return
            }
            if(no_cb)
            {
                no_cb()
            }
            
            this.node.destroy()
        }
        this.confirm_btn.on(Button.EventType.CLICK, callback, this);
        this.cancel_btn.on(Button.EventType.CLICK, callback, this);
        this.close.on(Button.EventType.CLICK, callback, this);
        this.node.getChildByName("common_mask_bg").on(Node.EventType.TOUCH_END, callback, this);

        // this.toggle.node.active = enable_toggle;
		this._skipTipInfo = StorageManager.Instance.getLocalStorageJson(Const.account + "skiptip");
		if(this._skipTipInfo.isSkip === 0) {
			// this.toggle.isChecked = false;
		} else {
			// this.toggle.isChecked = true;
		}
    }

	clickSelectBtn() {
		this._skipTipInfo = {
			isSkip: this._skipTipInfo.isSkip === 0? 1: 0,
			time: Utils.getTodayTimestamp()
		}
		StorageManager.Instance.saveLocalStorage(Const.account + "skiptip", this._skipTipInfo);
		// this.toggle.isChecked = !this.toggle.isChecked;
	}
}


