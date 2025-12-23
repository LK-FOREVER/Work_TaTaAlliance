import {_decorator, Node, Component,Prefab,ScrollView,instantiate,UITransform,Label,RichText,Animation} from "cc";
import EventManager from "../../Common/EventManager";
import EventConst from "../../Utils/EventConst";
import { mail_item } from "./item/mail_item";
import Utils from "../../Utils/Utils";
import { mailStatus } from "../../enum/mail_enum";
import { common_goods_noName } from "../../Common/common_goods_noName";
import _ from "lodash";
const { ccclass, property } = _decorator;

@ccclass("mail_view")
export class mail_view extends Component {
    @property(ScrollView)
    commonScrollView: ScrollView = null;
	@property(Prefab)
	mailItemPrefab: Prefab = null;
    @property(Node)
    rightNode: Node = null;
    @property(Label)
    mailExpireTimeLabel: Label = null;
    @property(Label)
    mailSubjectLabel: Label = null;
    @property(RichText)
    mailContentLabel: RichText = null;
    @property(Node)
    attachmentNode: Node = null;
    @property(Node)
    attachmentContentNode: Node = null;
    @property(Prefab)
    attachmentPrefab: Prefab = null;
    @property(Node)
    deleteMailNode: Node = null;
	@property(Node)
	receiveMailNode: Node = null;
	@property(Node)
	mailContentNode: Node = null;

    private _readingMailGuid: string = "";
    //邮件map
    public mailItemMap: Map<string, mail_item> = new Map();
	private _mailList = [];

    //点击显示邮件内容
    public reply100002(data) {
        this.rightNode.active = true;
		this.rightNode.getComponent(Animation).play();
        this._readingMailGuid = data.guid;
		let subject2String = data.subject2;
        if(data.subject2.length > 23) {
			subject2String = subject2String.substring(0, 23);
		}
		this.mailSubjectLabel.string = subject2String;
		this.mailSubjectLabel.updateRenderData(true);

		if(subject2String.length < 6) {
			this.mailSubjectLabel.node.parent.getComponent(UITransform).width = 280; //最小值
		} else {
			const w = this.mailSubjectLabel.node.getComponent(UITransform).width;
			this.mailSubjectLabel.node.parent.getComponent(UITransform).width = w + 20;
		}
		
        this.mailContentLabel.string = data.content;
		//如果content是纯文字，则要控制content高度与文字的高度稍大，要不不能滚动
		this.scheduleOnce(()=>{
			this.mailContentNode.getComponent(UITransform).height = this.mailContentLabel.node.getComponent(UITransform).height;
		}, 0.03);

        this.mailExpireTimeLabel.string = Utils.getMailExpireTime(
            Utils.getTodayTimestamp(), data.expire_timestamp
        );
        //附件:如果附件为空则直接显示 删除附件 按钮
        //    如果附件不为空，则判断是否为2，是2的话也显示删除按钮
        //    其余显示 领取附件  按钮，并显示附件
        this.attachmentContentNode.destroyAllChildren();
		if(data.items.length === 0) {
			this.attachmentNode.active = false;
			this.receiveMailNode.active = false;
            this.deleteMailNode.active = true;
		} else if ((data.items.length > 0 && data.read_status === mailStatus.HaveGetAttachment)) {
			this.attachmentNode.active = true;
			this.receiveMailNode.active = false;
            this.deleteMailNode.active = true;
			for (let i = 0; i < data.items.length; i += 1) {
                const attachment = instantiate(this.attachmentPrefab);
                this.attachmentContentNode.addChild(attachment);
                attachment.getComponent(common_goods_noName).init(data.items[i]);
				attachment.getComponent(common_goods_noName).setComplete();
            }
        } else {
            this.attachmentNode.active = true;
			this.receiveMailNode.active = true;
            this.deleteMailNode.active = false;
            for (let i = 0; i < data.items.length; i += 1) {
                const attachment = instantiate(this.attachmentPrefab);
                this.attachmentContentNode.addChild(attachment);
                attachment.getComponent(common_goods_noName).init(data.items[i]);
            }
        }
        //更新左边附件标识
        const mailItem = this.mailItemMap.get(data.guid);
        mailItem.updateMailItem(data);
		//
        for (let [key, value] of this.mailItemMap) {
            if (key === this._readingMailGuid) {
                value.showSelected(true);
            } else {
                value.showSelected(false);
            }
        }
    }

    //领取附件
    public getAttachment() {
        EventManager.Instance.emit(EventConst.QUERY_100003, this._readingMailGuid);
    }
    public reply100003(data) {
			this.attachmentNode.active = true;
			this.receiveMailNode.active = false;
			this.deleteMailNode.active = true;
			const read_status = data.mail_subject.read_status;
			if(read_status === 2) {
				this.attachmentContentNode.destroyAllChildren();
				for(let i = 0; i < data.mail_subject.items.length; i+= 1) {
					const attachment = instantiate(this.attachmentPrefab);
                	this.attachmentContentNode.addChild(attachment);
                	attachment.getComponent(common_goods_noName).init(data.mail_subject.items[i]);
					attachment.getComponent(common_goods_noName).setComplete();
				}
			}
            
			const mailItem = this.mailItemMap.get(this._readingMailGuid);
			mailItem.setState(false, true);
			mailItem.showSelected(true);
        
    }
    //一键领取附件
    public getAllAttachments() {
        EventManager.Instance.emit(EventConst.QUERY_100004);
    }
    public reply100004(data) {
       // console.log('%c [ data ]-163', 'font-size:13px; background:pink; color:#bf2c9f;', data)
			this.attachmentNode.active = true;
			this.deleteMailNode.active = true;
			this.receiveMailNode.active = false;
			for(let [key, value] of this.mailItemMap) {
				const mailItem = this.mailItemMap.get(key);
				mailItem.setState(false, true);
				mailItem.showSelected(false);
			}
			for(let i = 0; i < data.mail_subject_list.length; i+= 1) {
				const mail_subject = data.mail_subject_list[i];
				const guid = mail_subject.guid;
				if(this._readingMailGuid === guid) {
					const read_status = mail_subject.read_status;
					if(read_status === 2) {
						this.attachmentContentNode.destroyAllChildren();
						for(let j = 0; j < mail_subject.items.length; j+= 1) {
							const attachment = instantiate(this.attachmentPrefab);
							this.attachmentContentNode.addChild(attachment);
							attachment.getComponent(common_goods_noName).init(mail_subject.items[j]);
							attachment.getComponent(common_goods_noName).setComplete();
						}
					}
				}
 			}
    }
    //删除单个邮件
    public deleteMail() {
        EventManager.Instance.emit(
            EventConst.QUERY_100006,
            this._readingMailGuid
        );
    }
    public reply100006(data) {
			this.mailItemMap.delete(this._readingMailGuid);
			this._mailList = _.filter(this._mailList, (item) => item.guid != this._readingMailGuid);
			for(let i = 0; i < this.commonScrollView.content.children.length; i+= 1) {
				const item = this.commonScrollView.content.children[i];
				if(item.name === this._readingMailGuid) {
					item.destroy();
					break;
				}
			}
			if (this._mailList.length > 0) {
				this.node.getChildByName("Label").active = false;
				EventManager.Instance.emit(EventConst.QUERY_100002, this._mailList[0].guid);
			}
			if (this._mailList.length === 0) {
				 this.rightNode.active = false;
				this.node.getChildByName("Label").active = true;
			}
    }
    //一键删除
    public deleteAllMail() {
        EventManager.Instance.emit(EventConst.QUERY_100005);
    }
    public reply100005(data) {
			const guidList = data.del_guids;
			for(let i = 0; i < guidList.length; i+= 1) {
				this.mailItemMap.delete(guidList[i]);
				this._mailList = _.filter(this._mailList, (item) => item.guid != guidList[i]);
			}
			const chiren = this.commonScrollView.content.children;
			for(let i = chiren.length - 1; i >= 0; i -= 1) {
				const item = chiren[i];
				if(guidList.includes(item.name)) {
					item.destroy();
				}
			}
			if (this._mailList.length > 0) {
				this.node.getChildByName("Label").active = false;
				EventManager.Instance.emit(EventConst.QUERY_100002, this._mailList[0].guid);
			}
			if (this._mailList.length === 0) {
				this.rightNode.active = false;
				this.node.getChildByName("Label").active = true;
			}
    }
	addMailList(mailList) {
		this._mailList = mailList;
		this.commonScrollView.content.destroyAllChildren();
		for(let i = 0; i < this._mailList.length; i+= 1) {
			const mailItem = instantiate(this.mailItemPrefab);
			this.commonScrollView.content.addChild(mailItem);
			mailItem.name = this._mailList[i].guid;
			const mail = mailItem.getComponent(mail_item);
			mail.init(this._mailList[i]);
			this.mailItemMap.set(this._mailList[i].guid, mail);
		}
		if (this._mailList.length > 0) {
			this.node.getChildByName("Label").active = false;
			EventManager.Instance.emit(EventConst.QUERY_100002, this._mailList[0].guid);
		}
		if (this._mailList.length === 0) {
		 	this.rightNode.active = false;
			this.node.getChildByName("Label").active = true;
		}
	}
    //关闭
    close() {
        EventManager.Instance.emit(EventConst.OPEN_MAIL_VIEW, false);
    }
}
