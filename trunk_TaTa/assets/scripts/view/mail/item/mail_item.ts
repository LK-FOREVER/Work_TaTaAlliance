import { _decorator, Component, Label, Node, Sprite } from "cc";
import EventManager from "../../../Common/EventManager";
import EventConst from "../../../Utils/EventConst";
import Utils from "../../../Utils/Utils";
import LoadUtils from "../../../Utils/LoadUtils";
import { mailStatus } from "../../../enum/mail_enum";
const { ccclass, property } = _decorator;

@ccclass("mail_item")
export class mail_item extends Component {
    @property(Node)
    public attachmentFlag: Node = null;
    @property(Node)
    public newNode: Node = null;
    @property(Sprite)
    public mailStatusSprite: Sprite = null;
    @property(Label)
    public mailTimeLabel: Label = null;
	@property(Label)
	public subjectLabel: Label = null;

    private _data = null;
    private _guid: string = "";
    private _sendTime: number;
    private _expireTime: string = "";
    public mailReaded = false; //邮件是否已读，与status不一样
	public readStatus:number = -1;

	private _initHaveAttacghment = false;

    public init(data) {
        this._data = data;
        this._guid = data.guid;
        this._sendTime = data.send_timestamp;
        this._expireTime = data.expire_timestamp;
		this.readStatus = data.read_status;
        this.updateMailItem(data);
        this.showSelected(false);
        this.showMailTimeAndNew(true);
    }
    public updateMailItem(data) {
        //没有附件:直接看是否已读
        // 有附件: 先看是否=2  =2则视为已读 其他视为未读
		this._initHaveAttacghment = !(data.items.length === 0);
        if (data.items.length === 0) {
            if (data.read_status === mailStatus.Unread) {
				this.setState(false, false);
            } else {
				this.setState(false, true);
            }
        } else {
            if (data.read_status === mailStatus.HaveGetAttachment) {
                this.setState(false, true);
            } else {
                this.setState(true, false);
            }
        }
		if(data.subject.length <= 7) {
			this.subjectLabel.string = data.subject;
		} else {
			this.subjectLabel.string = data.subject.substring(0, 7) + "...";
		}
		
    }
	public setState(b1, b2) {
		this.attachmentFlag.active = b1;
		this.mailReaded = b2;
	}
    public showMailTimeAndNew(isInit = true) {
		if(isInit) {
			const re = Utils.getMailTimeElapsedSince(this._sendTime);
			this.mailTimeLabel.string = re["result1"];
			this.newNode.active = re["result2"] && !this.mailReaded;
		} else {
			this.newNode.active = !this.mailReaded;
		}
       
        
    }
    public showSelected(isClick) {
		this.node.getChildByName("mail_status5").active = false;
        if (!isClick) {
            if (!this.mailReaded) {
                this.mailStatusSprite.spriteFrame = LoadUtils.Instance.mail.getSpriteFrame("mail_status1");
            } else {
				if(this._initHaveAttacghment) {
					this.mailStatusSprite.spriteFrame = LoadUtils.Instance.mail.getSpriteFrame("mail_status3");
				} else {
					this.mailStatusSprite.spriteFrame = LoadUtils.Instance.mail.getSpriteFrame("mail_status4");
				}
            }
        } else {
            if (!this.mailReaded) {
                this.mailStatusSprite.spriteFrame = LoadUtils.Instance.mail.getSpriteFrame("mail_status2");
            } else {
				if(this._initHaveAttacghment) {
					this.mailStatusSprite.spriteFrame = LoadUtils.Instance.mail.getSpriteFrame("mail_status3");
				} else {
					this.mailStatusSprite.spriteFrame = LoadUtils.Instance.mail.getSpriteFrame("mail_status4");
				}
                this.node.getChildByName("mail_status5").active = true;
            }
        }
		this.showMailTimeAndNew();
    }
    public clickMail() {
        EventManager.Instance.emit(EventConst.QUERY_100002, this._guid);
    }
}
