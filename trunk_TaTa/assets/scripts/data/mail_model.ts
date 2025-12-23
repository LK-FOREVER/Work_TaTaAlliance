import { _decorator} from "cc";
import _ from "lodash";
const { ccclass, property } = _decorator;

@ccclass("mail_model")
export default class mail_model {

	public unreadMailSet:Set<string> = new Set();

	public mailList: any[] = [];

	// state0: number = 0; //未读 协议中为0
	// state1: number = 1; //已读有附件 
	// state2: number = 2; //已读没附件
	// state3: number = 3; //已领取附件 协议中为2

	sortMail(array) {
		if(!array || array.length === 0) return [];
		let arr = [];
        let reuslt = [];
        for (let i = 0; i < array.length; i += 1) {
			let state = -1;
			if(array[i].read_status === 0) {
				state = 0;
			}
			else if(array[i].read_status === 1) {
				if(array[i].items.length > 0) {
					state = 1;
				} else {
					state = 2;
				}
			} 
			else if(array[i].read_status === 2) {
				state = 3;
			}
            const ob = {
                guid: array[i].guid,
                readStatus: state,
                sendTime: array[i].send_timestamp,
            };
            arr.push(ob);
        }
        if (array.length > 0) {
            //排序
            arr = _.orderBy(
                arr,
                ["readStatus", "sendTime"],
                [   "asc",       "desc"  ]
            );
            for (let i = 0; i < arr.length; i += 1) {
                const guid = arr[i].guid;
				const mail = _.find(array, (item)=>{
					return item.guid == guid;
				});
                reuslt.push(mail);
            }
        }
        return reuslt;
	}
}
