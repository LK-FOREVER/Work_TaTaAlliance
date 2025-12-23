import { _decorator } from 'cc';
import EventManager from '../Common/EventManager';
import EventConst from '../Utils/EventConst';

export default class friend_model {
	// 好友列表
    public friend_list = null;
	// 好友申请列表
    public application_friend_list = null;
	// 黑名单
    public black_list = null;
    // 推荐好友列表
    public suggest_friend_list = [];
    // 搜索好友列表
    public search_friend_list = [];
	//留言信息
	public leaveMessageMap: Map<number, number> = new Map();

	
    // 设置搜索好友列表
    public set_search_friend_list(data) {
        this.suggest_friend_list = []
        this.search_friend_list = []
        data.relation_list.forEach(item => {
            if (item.is_friend === 0) {
                this.suggest_friend_list.push(item)
            } else if (item.is_friend === 1 || item.is_friend === 9) {
                this.search_friend_list.push(item)
            }
        });
        EventManager.Instance.emit(EventConst.UPDATE_FRIEND_LIST, 999);
    }
    public get_search_friend_list() {
        return this.search_friend_list
    }
    public get_suggest_friend_list() {
        return this.suggest_friend_list
    }
    // 好友列表
    public set_friend_list(data) {
        this.friend_list = data
        console.log('this.friend_list:========', this.friend_list)
        EventManager.Instance.emit(EventConst.UPDATE_FRIEND_LIST, 0);
    }
    public get_friend_list() {
        return this.friend_list
    }
    // 好友申请列表
    public set_application_friend_list(data) {
        this.application_friend_list = data
        EventManager.Instance.emit(EventConst.UPDATE_FRIEND_LIST, 2);
    }
    public get_application_friend_list() {
        return this.application_friend_list
    }
    // 黑名单列表
    public set_black_list(data) {
        this.black_list = data
        EventManager.Instance.emit(EventConst.UPDATE_FRIEND_LIST, 3);
    }
    public get_black_list() {
        return this.black_list
    }
    // 删除好友
    public delete_friend(data) {
       // //console.log('data', data)
    }
    // 添加单个好友
    public add_friend(data) {
       // //console.log('data', data)
    }
    // 批量添加好友
    public add_friend_list(data) {
		////console.log('data', data)
    }
    // 同意好友申请
    public agree_friend_request(data) {
        ////console.log('data', data)
    }
    // 批量同意好友申请
    public agree_friend_request_list(data) {
        ////console.log('data', data)
    }
    // 加入黑名单
    public add_black_list(data) {
        ////console.log('data', data)
    }
    // 移出黑名单
    public remove_black_list(data) {
        ////console.log('data', data)
    }
}