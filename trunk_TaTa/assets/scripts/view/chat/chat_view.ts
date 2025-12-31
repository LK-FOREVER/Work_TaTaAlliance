import { _decorator, Component, Prefab, Node, Button, tween, Vec3, UITransform, Sprite, Layout, RichText, EditBox, Label, instantiate, Color, Event, v3, ScrollView, resources, SpriteFrame } from 'cc';
import EventConst from '../../Utils/EventConst';
import EventManager from "../../Common/EventManager";
import List from '../../Utils/VirtualList/List';
import LoadUtils from '../../Utils/LoadUtils';
import chat_module from '../../module/chat_module';
import Utils from '../../Utils/Utils';
import player_base_module from '../../module/player_base_module';
import { chat_item } from './item/chat_item';
import TxtUtils from '../../Utils/TxtUtils';
import { ToastControllers } from '../../Common/ToastControllers';
import { GameData } from '../../Common/GameData';
const { ccclass, property } = _decorator;

const BADGE_CHAT_POSITION = v3(50, 20);
const BADGE_FRIEND_POSITION = v3(125, -13);

@ccclass('chat_view')
export default class chat_view extends Component {
    //主要内容
    @property(Node)
    chat_container: Node = null;
    //设置按钮
    @property(Node)
    set_btn: Node = null;
    //频道组按钮列表
    @property(Node)
    tab_0_btn_list: Node = null;
    //输入框组
    @property(Node)
    input_node_list: Node = null;
    //聊天列表
    @property(List)
    chat_list: List = null;
    //好友列表容器
    @property(Node)
    friend_list_content: Node = null;
    //输入节点
    @property(EditBox)
    input_edit: EditBox | null = null;
    //消息发送按钮
    @property(Node)
    btn_send: Node = null;
    //还有按钮
    @property(Node)
    friendChatNode: Node = null;
    // 选中的顶部索引
    selected_top_idx = 0;
    // 选中的tab0索引
    selected_tab0_idx = 0;
    close_btn: Node = null;
    top_btns: Node = null!;
    tab_list: Node = null!;
    mask_bg: Node = null!;
    set_view: Node = null!;
    show_receive_text: Node = null!;
    filter_world: Node = null!;
    filter_system: Node = null!;
    chatData: any = {
        all_history_chat_list: [],
        chat_friend_list: [],
        friend_history_chat_list: [],
        history_chat_list_1: [],
        history_chat_list_2: [],
        history_chat_list_3: [],
        history_chat_list_6: [],
        my_friend_list: [],
        red_pack_reward_list: [],
        red_pack_reward_record_list: [],
        red_pack_guid_list: [],
        red_pack_remain_reward: [],
        channel_hidden: {}
    };
    nowList: any[] = [];
    inputText: any;
    searchText: any;
    nowChangedFriend: any = null;
    player_base_info: any = player_base_module.Instance.get_model().base_info
    // 屏蔽世界信息
    is_filter_world: boolean = false
    // 屏蔽系统信息
    is_filter_system: boolean = false

    private _friend_item_map: Map<number, any> = new Map();

    protected onLoad(): void {
        this.add_listener()
        this.initUI()
    }
    protected onDestroy(): void {
        this.remove_listener()
    }
    private add_listener() {
        EventManager.Instance.on(EventConst.INIT_CHAT, this.initUI, this);
        EventManager.Instance.on(EventConst.UPDATE_CHAT_LIST, this.updateList, this);
        EventManager.Instance.on(EventConst.SEND_CHAT, this.newSendAlreadyHandler, this);
        EventManager.Instance.on(EventConst.DISABLE_CHAT, this.disableSendHandler, this);
        EventManager.Instance.on(EventConst.UPDATE_CHAT_FRIEND_LIST, this.updateFriendList, this);
        EventManager.Instance.on(EventConst.UPDATE_CHAT_FRIEND_CHAT_LIST, this.updataFriendChat, this);
        EventManager.Instance.on(EventConst.UPDATE_CHANNEL_HIDDEN, this.update_channel_hidden, this);
    }
    private remove_listener() {
        EventManager.Instance.off(EventConst.INIT_CHAT, this.initUI, this);
        EventManager.Instance.off(EventConst.UPDATE_CHAT_LIST, this.updateList, this);
        EventManager.Instance.off(EventConst.SEND_CHAT, this.newSendAlreadyHandler, this);
        EventManager.Instance.off(EventConst.DISABLE_CHAT, this.disableSendHandler, this);
        EventManager.Instance.off(EventConst.UPDATE_CHAT_FRIEND_LIST, this.updateFriendList, this);
        EventManager.Instance.off(EventConst.UPDATE_CHAT_FRIEND_CHAT_LIST, this.updataFriendChat, this);
        EventManager.Instance.off(EventConst.UPDATE_CHANNEL_HIDDEN, this.update_channel_hidden, this);

    }

    startTween() {
        // if (this.chat_container.getPosition().x === -535) {
        //     this.updateTopTab();
        //     this.updateTab0Btn();
        // } else {
        //     // 开始请求
        //     tween(this.chat_container)
        //         .to(0.3, { position: new Vec3(-535, 0, 0) })
        //         .start()
        // }
        // this.updateTopTab();
        // this.updateTab0Btn();
    }
    startRequest() {
        if (this.selected_top_idx === 0) {
            // 获取聊天记录
            EventManager.Instance.emit(EventConst.QUERY_400);
            // 获取已读取过的红包
            // EventManager.Instance.emit(EventConst.QUERY_413);
        } else if (this.selected_top_idx === 1) {
            // 获取私聊好友列表
            EventManager.Instance.emit(EventConst.QUERY_406);
        } else if (this.selected_top_idx == 2) {
            // 暂时不开启联盟
            ToastControllers.Instance.showToast("功能暂未开放")
            return;
        }
    }
    initUI(isfirend: boolean = false) {
        if (!this.node) return
        if (isfirend && this.selected_top_idx === 0) return
        this.startTween();
        this.chatData.all_history_chat_list = chat_module.Instance.get_model().all_history_chat_list;
        this.chatData.chat_friend_list = chat_module.Instance.get_model().chat_friend_list;
        this.chatData.friend_history_chat_list = chat_module.Instance.get_model().friend_history_chat_list;
        this.chatData.history_chat_list_1 = chat_module.Instance.get_model().history_chat_list_1;
        this.chatData.history_chat_list_2 = chat_module.Instance.get_model().history_chat_list_2;
        this.chatData.history_chat_list_3 = chat_module.Instance.get_model().history_chat_list_3;
        this.chatData.history_chat_list_6 = chat_module.Instance.get_model().history_chat_list_6;
        this.chatData.my_friend_list = chat_module.Instance.get_model().my_friend_list;
        this.chatData.channel_hidden = chat_module.Instance.get_model().channel_hidden;

        this.top_btns = this.chat_container.getChildByName("top_btns")
        this.tab_list = this.chat_container.getChildByName("tab_list")
        this.close_btn = this.chat_container.getChildByName("bottom_bg_2").getChildByName("close_btn")
        this.mask_bg = this.node.getChildByName("mask_bg")
        this.set_view = this.chat_container.getChildByName("set_view")
        this.filter_world = this.set_view.getChildByName("filter_world")
        this.filter_system = this.set_view.getChildByName("filter_system")

        this.filter_world.on(Node.EventType.TOUCH_END, this.filter_chat_handler, this)
        this.filter_system.on(Node.EventType.TOUCH_END, this.filter_chat_handler, this)
        this.top_btns.children.forEach(item => {
            item.on(Button.EventType.CLICK, this.top_btn_handler, this);
        });
        this.tab_0_btn_list.children.forEach(item => {
            item.on(Button.EventType.CLICK, this.tab_0_btn_handler, this);
        });
        this.close_btn.on(Button.EventType.CLICK, this.btn_handler, this);
        this.set_btn.on(Button.EventType.CLICK, this.btn_handler, this);
        this.mask_bg.on(Node.EventType.TOUCH_END, this.btn_handler, this);
        this.input_edit.node.on('text-changed', this.onInputTextChanged, this);

        this.set_view.active = false
        // 设置屏蔽聊天信息属性
        this.is_filter_world = this.chatData.channel_hidden.channel_world_hidden === 1;
        this.is_filter_system = this.chatData.channel_hidden.channel_system_hidden === 1;

        if (this.is_filter_world) {
            // 将世界聊天记录只筛选出红包的项
            this.chatData.history_chat_list_2 = this.chatData.history_chat_list_2.filter(msg => msg.type === 4);
        }
        if (this.is_filter_system) {
            // 将系统聊天记录全部清空
            this.chatData.history_chat_list_6 = [];
        }

        this.updateTopTab();
        this.updateTab0Btn();
        this.init_filter_chat();
    }
    // 更新屏蔽聊天记录
    update_channel_hidden() {
        if (this.is_filter_world) {
            // 将世界聊天记录只筛选出红包的项
            this.chatData.history_chat_list_2 = this.chatData.history_chat_list_2.filter(msg => msg.type === 4);
        } else {
            this.chatData.history_chat_list_2 = chat_module.Instance.get_model().history_chat_list_2
        }
        if (this.is_filter_system) {
            // 将系统聊天记录全部清空
            this.chatData.history_chat_list_6 = [];
        } else {
            this.chatData.history_chat_list_6 = chat_module.Instance.get_model().history_chat_list_6
        }
        if (this.selected_top_idx === 0) {
            if (this.selected_tab0_idx === 0) {
                this.nowList = this.chatData.history_chat_list_6.slice()
            } else if (this.selected_tab0_idx === 1) {
                this.nowList = this.chatData.history_chat_list_2.slice()
            }
        }
        this.nowList.reverse();
        this.updateList()
    }

    init_filter_chat() {
        const setting_close_world = this.filter_world.getChildByName("setting_btn_list").getChildByName("setting_close")
        const setting_open_world = this.filter_world.getChildByName("setting_btn_list").getChildByName("setting_open")
        const setting_close_system = this.filter_system.getChildByName("setting_btn_list").getChildByName("setting_close")
        const setting_open_system = this.filter_system.getChildByName("setting_btn_list").getChildByName("setting_open")
        setting_close_world.active = !this.is_filter_world
        setting_open_world.active = this.is_filter_world
        setting_close_system.active = !this.is_filter_system
        setting_open_system.active = this.is_filter_system
    }
    filter_chat_handler(event: Event) {
        const filter_node: Node = event.target
        const setting_close = filter_node.getChildByName("setting_btn_list").getChildByName("setting_close")
        const setting_open = filter_node.getChildByName("setting_btn_list").getChildByName("setting_open")
        switch (filter_node.name) {
            case "filter_world":
                this.is_filter_world = !this.is_filter_world
                setting_open.active = this.is_filter_world
                setting_close.active = !this.is_filter_world
                break;
            case "filter_system":
                this.is_filter_system = !this.is_filter_system
                setting_open.active = this.is_filter_system
                setting_close.active = !this.is_filter_system
                break;

            default:
                break;
        }
        EventManager.Instance.emit(EventConst.QUERY_405, this.is_filter_world === true ? 1 : 0, 0, 0, this.is_filter_system === true ? 1 : 0);
    }

    // 文本输入框输入事件
    onInputTextChanged(editbox: EditBox) {
        this.inputText = editbox.string
    }
    // 文本发送事件 
    inputSendHandler() {
        //console.log(this.input_edit)
        this.input_edit.string = ""
        let channel: number = 2
        if (this.selected_top_idx === 0) {
            if (this.selected_tab0_idx === 0) {
                channel = 6
            } else if (this.selected_tab0_idx === 1) {
                channel = 2
            }
        } else if (this.selected_top_idx === 1) {
            channel = 4
        }
        if (this.inputText === undefined || this.inputText.length === 0) {
            ToastControllers.Instance.showToast("请输入聊天内容");
            return
        }
        // 发送新消息
        if (this.selected_top_idx === 0 && this.selected_tab0_idx === 1) {
            EventManager.Instance.emit(EventConst.QUERY_402, channel, this.inputText);
        } else {
            // 私聊
            EventManager.Instance.emit(EventConst.QUERY_407, channel, this.inputText, this.nowChangedFriend);
        }
    }
    // 禁用发送消息
    public disableSendHandler() {
        this.inputText = ""
        let disableTime = 3;
        this.btn_send.getComponent(Button).interactable = false
        this.btn_send.getComponent(Sprite).grayscale = true
        this.input_edit.placeholder = `距离下次发言还剩${disableTime}秒`
        const callback = function () {
            disableTime--;
            if (disableTime == 0) {
                this.btn_send.getComponent(Button).interactable = true
                this.btn_send.getComponent(Sprite).grayscale = false
                this.input_edit.placeholder = `点击输入文字`
                // 取消这个计时器
                this.unschedule(callback);
            } else {
                this.btn_send.getComponent(Button).interactable = false
                this.btn_send.getComponent(Sprite).grayscale = true
                this.input_edit.placeholder = `距离下次发言还剩${disableTime}秒`
            }
        }
        this.schedule(callback, 1);
    }
    newSendAlreadyHandler() {
        //console.log("newSendHandler")
        const chatData = {
            content: this.inputText,
            player: player_base_module.Instance.get_model().base_info,
            type: 1,
            time: Math.floor(Date.now() / 1000)
        }
        this.nowList.push(chatData)
        // this.chatData.history_chat_list_2.unshift(chatData)
        // chat_module.Instance.get_model().history_chat_list_2.unshift(chatData)
        this.updateList();
    }
    // 搜索输入框输入事件
    onSearchTextChanged(val) {
        //console.log('val', val)
        this.searchText = val
    }
    // 搜索事件 
    searchHandler() {
        //console.log("searchHandler")
    }

    // 频道组按钮事件
    tab_0_btn_handler(evt) {
        // 获取聊天记录
        // EventManager.Instance.emit(EventConst.QUERY_400);
        let idx = evt.target.getSiblingIndex();
        //console.log('idx', idx)
        if (this.selected_tab0_idx == idx) {
            return;
        }
        this.selected_tab0_idx = idx;
        this.updateTab0Btn()
    }
    updateTab0Btn() {
        // this.node.getComponent(Animation).play();
        // 切换Tab0按钮
        this.tab_0_btn_list.children.forEach((item, idx) => {
            const selectedBg = item.getChildByName("btn_bg");
            selectedBg.active = idx === this.selected_tab0_idx;
        });
        this.updateUI();
        this.nowList = []
        // console.log('this.selected_top_idx',this.selected_top_idx)
        // console.log('this.selected_tab0_idx',this.selected_tab0_idx)
        if (this.selected_top_idx === 0) {
            if (this.selected_tab0_idx === 0) {
                this.nowList = this.chatData.history_chat_list_6.slice()
            } else if (this.selected_tab0_idx === 1) {
                this.nowList = this.chatData.history_chat_list_2.slice()
            }
        }
        this.nowList.reverse();
        this.updateList();
    }
    updateUI() {
        this.chatData.friend_history_chat_list = chat_module.Instance.get_model().friend_history_chat_list;
        if (this.selected_top_idx === 1) {
            if (!this.nowChangedFriend) {
                this.input_node_list.getChildByName("type_1").active = false;
                this.input_node_list.getChildByName("type_2").active = true;
                this.input_node_list.getChildByName("type_2").getChildByName("label").getComponent(Label).string = "请先选择好友"
            } else {
                this.input_node_list.getChildByName("type_1").active = true;
                this.input_node_list.getChildByName("type_2").active = false;
            }
        } else if (this.selected_top_idx === 0) {
            if (this.selected_tab0_idx === 0) {
                this.input_node_list.getChildByName("type_1").active = false;
                this.input_node_list.getChildByName("type_2").active = true;
                this.input_node_list.getChildByName("type_2").getChildByName("label").getComponent(Label).string = "该频道下玩家无法发言";
            } else if (this.selected_tab0_idx === 1) {
                this.input_node_list.getChildByName("type_1").active = true;
                this.input_node_list.getChildByName("type_2").active = false;
            }
        }
    }
    /**
     * 更新列表
     * @param isForced 是否强制更新
     * @param channel 消息推送频道
     * @param player 消息推送时发送消息的玩家
     */
    public updateList(isForced: boolean = false, player = null, channel: number = 2) {
        if (!this.node) return
        // this.selected_top_idx === 0的情况下只有系统和世界聊天 channel === 4为私聊
        if (this.selected_top_idx === 0 && channel === 4) return;
        // 如果是强制更新的话表明是推送消息，判断推送消息的玩家和当前聊天框的玩家是否相同，如果不相同则更新列表
        if (isForced && (player && player.player_id !== this.player_base_info.player_id)) {
            this.chatData.friend_history_chat_list = chat_module.Instance.get_model().friend_history_chat_list;
            this.chatData.history_chat_list_2 = chat_module.Instance.get_model().history_chat_list_2;
            this.chatData.history_chat_list_6 = chat_module.Instance.get_model().history_chat_list_6;
            if (this.selected_top_idx === 0) {
                if (this.selected_tab0_idx === 0) {
                    this.nowList = this.chatData.history_chat_list_6.slice()
                } else if (this.selected_tab0_idx === 1) {
                    this.nowList = this.chatData.history_chat_list_2.slice()
                }
            } else if (this.selected_top_idx === 1) {
                this.nowList = this.chatData.friend_history_chat_list.slice()
            }
            // this.nowList = this.nowList.filter((item) => item.hasOwnProperty('msg_arg_list'));
            // this.chatData.history_chat_list_2 = this.chatData.history_chat_list_2.filter((item) => item.hasOwnProperty('msg_arg_list'));
            // this.chatData.friend_history_chat_list = this.chatData.friend_history_chat_list.filter((item) => item.hasOwnProperty('msg_arg_list'));
            this.nowList.reverse();
        }
        if (!isForced) {
            // Delay setting numItems until next frame so UI layouts/RichText can compute sizes first
            this.scheduleOnce(() => {
                this.chat_list.numItems = this.nowList.length;
                this.chat_list.scrollTo(this.nowList.length - 1, 0.1);
            }, 0);
        } else {
            // Forced update (push), update immediately
            this.chat_list.numItems = this.nowList.length;
        }
    }
    /**
     * 更新好友列表
     */
    public updateFriendList() {
        if (!this.node) return;
        this.friend_list_content.removeAllChildren();
        this.friend_list_content.getComponent(Layout).updateLayout();
        const badgePlayerSet = chat_module.Instance.get_model().badgePlayerSet;
        console.log("chatData.chat_friend_list", this.chatData.chat_friend_list);
        this.chatData.chat_friend_list.forEach((item, index) => {
            resources.load("prefabs/chat/item/friend_item", Prefab, (_err, prefab) => {
                const friend_item = instantiate(prefab);
                friend_item.setParent(this.friend_list_content);
                const chooseFriend = friend_item.getChildByName("chooseFriend");
                const avatar = friend_item.getChildByName("head_node").getChildByName("avatar");
                const level = friend_item.getChildByName("head_node").getChildByName("level");
                const vip = friend_item.getChildByName("head_node").getChildByName("vip_bg");
                const name = friend_item.getChildByName("name");
                const online_text = friend_item.getChildByName("online_text");

                this._friend_item_map.set(item.full_id.player_id, friend_item);
                if (index === 0) {
                    chooseFriend.active = true
                    // 请求私聊聊天记录
                    EventManager.Instance.emit(EventConst.QUERY_408, item.full_id);
                    this.nowChangedFriend = item.full_id;
                    EventManager.Instance.emit(EventConst.QUERY_410, item.full_id);
                    console.log("默认选择第一个好友进行聊天:", item.full_id);
                } else {
                    chooseFriend.active = false
                }
                level.getComponent(Label).string = item.other_player.lv
                name.getComponent(Label).string = item.other_player.nickname
                level.active = false;
                vip.active = false;
                // 头像
                resources.load("images/goods/" + item.other_player.head_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    avatar.getComponent(Sprite).spriteFrame = spriteFrame
                })
                // 判断是否在线
                if (item.other_player.online_flag == 1) {
                    online_text.getComponent(Label).string = "在线"
                    online_text.getComponent(Label).color = new Color('#29991F');
                } else {
                    // 计算离线时间
                    if (Utils.getTimeElapsedSince(item.other_player.last_logout_time))
                        online_text.getComponent(Label).string = Utils.getTimeElapsedSince(item.other_player.last_logout_time)
                    online_text.getComponent(Label).color = new Color('#635b4c');
                }
                friend_item.on(Button.EventType.CLICK, () => {
                    if (friend_item.getChildByName("chooseFriend").active === true) return
                    this.friend_list_content.children.forEach(item => {
                        item.getChildByName("chooseFriend").active = false
                    });
                    friend_item.getChildByName("chooseFriend").active = true
                    // 请求私聊聊天记录
                    EventManager.Instance.emit(EventConst.QUERY_408, item.full_id);
                    this.nowChangedFriend = item.full_id;
                    EventManager.Instance.emit(EventConst.QUERY_410, item.full_id);
                });
            });
        });
    }


    // 更新好友聊天记录
    updataFriendChat() {
        if (this.selected_top_idx === 1) {
            this.updateUI()
            this.nowList = this.chatData.friend_history_chat_list.slice()
            this.nowList.reverse();
            this.updateList();
        }
    }
    // 顶部按钮事件
    top_btn_handler(evt) {
        this.selected_tab0_idx = 1
        this.chat_list.numItems = 0
        this.nowChangedFriend = null
        this.friend_list_content.removeAllChildren()
        let idx = evt.target.getSiblingIndex();
        if (this.selected_top_idx == idx) {
            return;
        }
        this.selected_top_idx = idx;
        this.updateTab0Btn();
        if (this.selected_top_idx === 0) {
            // 获取聊天记录
            EventManager.Instance.emit(EventConst.QUERY_400);
        } else if (this.selected_top_idx === 1) {
            // 获取私聊好友列表
            EventManager.Instance.emit(EventConst.QUERY_406);
        } else if (this.selected_top_idx == 2) {
            // 暂时不开启联盟
            ToastControllers.Instance.showToast("功能暂未开放")
            return;
        }
        this.updateTopTab();
    }
    updateTopTab() {
        // this.node.getComponent(Animation).play();
        // 切换顶部tab
        this.top_btns.children.forEach((item, idx) => {
            const selectedBg = item.getChildByName("bg");
            selectedBg.active = idx === this.selected_top_idx;
        });
        // 切换左侧功能
        this.tab_list.children.forEach((item, idx) => {
            item.active = idx === this.selected_top_idx;
        });
        this.updateUI();
    }
    btn_handler(evt) {
        let target_name = evt.target.name;
        //console.log("按钮点击" + target_name);
        if (target_name == "close_btn") {
            // tween(this.chat_container)
            //     .to(0.3, { position: new Vec3(-1867, 0, 0) })
            //     // to 动作完成后会调用该方法     
            //     .call(() => {
            //         EventManager.Instance.emit(EventConst.OPEN_CHAT_VIEW, false);
            //     })
            //     .start()
            EventManager.Instance.emit(EventConst.OPEN_CHAT_VIEW, false);
        } else if (target_name == "set_btn") {
            this.set_view.active = !this.set_view.active;
        }
    }
    onChatListRender(item: Node, idx: number) {
        const item_ut: UITransform = item.getComponent(UITransform);
        const head_node: Node = item.getChildByName("head_node");
        const system_name: Node = item.getChildByName("system_name");
        const tag_node: Node = item.getChildByName("tag_node");
        const chat_word_arrow: Node = item.getChildByName("chat_word_arrow");
        const word_node: Sprite = item.getChildByName("word_node").getComponent(Sprite);
        const word_node_ut: UITransform = word_node.node.getComponent(UITransform);
        const word_node_layout: Layout = word_node.node.getComponent(Layout);
        const word_text: RichText = item.getChildByName("word_node").getChildByName("word_text").getComponent(RichText)
        const richText_test: Node = item.getChildByName("richText_test")
        const word_time: Node = item.getChildByName("word_time")
        // word_time.active = false;
        tag_node.getChildByName("position_name").active = false;
        tag_node.getChildByName("rank_level").active = false;
        const data: any = this.nowList[idx];
        console.log("ChatData:", data);
        if (data.type === 1) { // 世界频道
            system_name.active = false;
            head_node.active = true;
            tag_node.active = true;
            word_node.node.active = true;
            chat_word_arrow.active = true;
            // 获取当前用户信息
            let player_base_info = player_base_module.Instance.get_model().base_info;
            console.log("player_base_info:", player_base_info);
            if (data.player.player_id === player_base_info.player_id) { // 自己
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv;
                head_node.getChildByName("level").active = false;
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = GameData.client_data.client_data.user_data.nickname;
                tag_node.getChildByName("name").setPosition(new Vec3(0, 0));
                tag_node.getChildByName("name").getComponent(UITransform).anchorX = 1;
                // 头像
                resources.load("images/goods/" + GameData.client_data.client_data.user_data.head_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    head_node.getChildByName("avatar").getComponent(Sprite).spriteFrame = spriteFrame
                })
                //职位
                // tag_node.getChildByName("position_name").getComponent(Label).string = "data.player.position";
                // let position_name_ut = tag_node.getChildByName("position_name").getComponent(UITransform);
                // position_name_ut.anchorX = 1;
                // let name_width = tag_node.getChildByName("name").getComponent(UITransform).width;
                // tag_node.getChildByName("position_name").setPosition(new Vec3(tag_node.getChildByName("name").position.x - name_width - 30, tag_node.getChildByName("position_name").position.y));
                // 段位
                // const playerRankConf = TxtUtils.Instance.getPlayerRankConf(this.player_base_info.cur_grade);
                // tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                tag_node.getChildByName("rank_level").active = false;
                // vip等级
                // head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;
                head_node.getChildByName("vip_bg").active = false;
                // 消息发送时间
                word_time.getComponent(Label).string = Utils.convertTimestampToDateTime(data.time);

                head_node.setPosition(new Vec3(330, -60));
                tag_node.getComponent(UITransform).anchorX = 1;
                tag_node.setPosition(new Vec3(260, -20));
                // word_node.spriteFrame = LoadUtils.Instance.chat.getSpriteFrame(`chat_word_bg`);
                word_node_ut.anchorX = 1
                word_text.node.getComponent(UITransform).anchorX = 1
                word_text.node.setPosition(new Vec3(-10, -5));
                word_node.node.setPosition(new Vec3(260, -45));
                chat_word_arrow.setPosition(new Vec3(267.741, -67.03));
                chat_word_arrow.setScale(-1, 1);
                item.getComponent(chat_item).setData(true, null);
                word_time.getComponent(UITransform).anchorX = 1
                word_time.setPosition(new Vec3(250, word_time.position.y));
            } else { // 其他人
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv
                head_node.getChildByName("level").active = false;
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname
                tag_node.getChildByName("name").setPosition(new Vec3(0, 0));
                tag_node.getChildByName("name").getComponent(UITransform).anchorX = 0
                // 头像
                resources.load("images/goods/" + data.player.head_id + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    head_node.getChildByName("avatar").getComponent(Sprite).spriteFrame = spriteFrame
                })
                //职位
                // tag_node.getChildByName("position_name").getComponent(Label).string = "data.player.position";
                // let position_name_ut = tag_node.getChildByName("position_name").getComponent(UITransform);
                // position_name_ut.anchorX = 0;
                // let name_width = tag_node.getChildByName("name").getComponent(UITransform).width;
                // tag_node.getChildByName("position_name").setPosition(new Vec3(tag_node.getChildByName("name").position.x + name_width + 30, tag_node.getChildByName("position_name").position.y));
                // 段位
                // const playerRankConf = TxtUtils.Instance.getPlayerRankConf(data.player.cur_grade);
                // tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                tag_node.getChildByName("rank_level").active = false;
                // vip等级
                // head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;
                head_node.getChildByName("vip_bg").active = false;
                // 消息发送时间
                word_time.getComponent(Label).string = Utils.convertTimestampToDateTime(data.time);

                head_node.setPosition(new Vec3(-330, -60));
                tag_node.getComponent(UITransform).anchorX = 0
                tag_node.setPosition(new Vec3(-260, -20));
                // word_node.spriteFrame = LoadUtils.Instance.chat.getSpriteFrame(`chat_word_bg`)
                word_node_ut.anchorX = 0
                word_text.node.getComponent(UITransform).anchorX = 0
                word_text.node.setPosition(new Vec3(0, -5));
                word_node.node.setPosition(new Vec3(-260, -45));
                chat_word_arrow.setPosition(new Vec3(-267.741, -67.03));
                chat_word_arrow.setScale(1, 1);
                item.getComponent(chat_item).setData(false, data.player);
                word_time.getComponent(UITransform).anchorX = 0
                word_time.setPosition(new Vec3(-250, word_time.position.y));
            }
        } else if (data.type === 0 || data.type === 2) { //系统消息(只能看，不能说)
            // //console.log('系统')
            system_name.active = true;
            head_node.active = false;
            tag_node.active = false;
            word_node.node.active = true;
            chat_word_arrow.active = true;

            const msgId = data.msg_id;
            const chatConf = TxtUtils.Instance.getChatConfByMsgId(msgId);
            const msg = chatConf.msg;
            const color = chatConf.color.split("|");
            const contents = data.msg_arg_list;
            const rarityName = ["全部", "完整", "精良", "稀有", "史诗", "传说", "绝世",];
            if (msgId >= 16 && msgId <= 19) {
                const userName = contents[0].arg_content_list[0].content; //主公
                const id = Number(contents[1].arg_content_list[0].content);  //id
                const thing = contents[1].arg_content_list[0].content;
                const type = Utils.getTypeById(id).zh;//英雄
                const replacements = [color[0], userName, color[1], rarityName[1], color[2], type, color[3], thing];
                const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
                data.content = formattedStr;
            } else if (msgId === 20 || msgId === 21) {
                const userName = contents[0].arg_content_list[0].content;
                const thing = contents[1].arg_content_list[0].content;
                const replacements = [color[0], userName, color[1], thing];
                const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
                data.content = formattedStr;
            } else if (msgId >= 22 && msgId <= 24) {
                const userName = contents[0].arg_content_list[0].content; //主公
                const id = Number(contents[2].arg_content_list[0].content);  //id
                const rarity = 1; //绝世
                const type = Utils.getTypeById(id).zh;//英雄
                const thing = "英雄名";//英雄名
                if (msgId === 22) {
                    const levelName = contents[1].arg_content_list[0].content + "级"; //50
                    const replacements = [color[0], userName, color[1], rarityName[rarity], color[2], type, color[3], thing, color[4], levelName];
                    const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
                    data.content = formattedStr;
                } else if (msgId === 23) {
                    const levelName = contents[1].arg_content_list[0].content + "级"; //50
                    color[1] = "#ff4233";

                    const replacements = [color[0], userName, color[1], rarityName[rarity], color[2], type, color[3], thing, color[4], levelName];
                    const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
                    data.content = formattedStr;
                } else if (msgId === 24) {
                    const levelName = contents[1].arg_content_list[0].content + "星"; //50
                    color[1] = "#ff4233";
                    const replacements = [color[0], userName, color[1], rarityName[rarity], color[2], type, color[3], thing, color[4], levelName];
                    const formattedStr = msg.replace(/%s/g, (match) => replacements.shift());
                    data.content = formattedStr;
                }
            }

            // 等级
            head_node.getChildByName("level").getComponent(Label).string = data.player.lv
            // 昵称
            tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname

            head_node.setPosition(new Vec3(-330, -60));
            tag_node.getComponent(UITransform).anchorX = 0
            tag_node.setPosition(new Vec3(-260, -20));
            word_node.spriteFrame = LoadUtils.Instance.chat.getSpriteFrame(`chat_word_bg`)
            word_node_ut.anchorX = 0
            word_node.node.setPosition(new Vec3(-260, -35));
            chat_word_arrow.setPosition(new Vec3(-267.741, -57.03));
            chat_word_arrow.setScale(1, 1);
            word_time.getComponent(UITransform).anchorX = 0
            word_time.setPosition(new Vec3(-250, word_time.position.y));
        } else if (data.type === 4) {//红包
            system_name.active = false;
            head_node.active = true;
            tag_node.active = true;
            word_node.node.active = false;
            chat_word_arrow.active = false;
            // 获取当前用户信息
            let player_base_info = player_base_module.Instance.get_model().base_info;
            if (data.player.player_id === player_base_info.player_id) { // 自己
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv;
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname;
                // 段位
                const playerRankConf = TxtUtils.Instance.getPlayerRankConf(this.player_base_info.cur_grade);
                tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                // vip等级
                head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;

                head_node.setPosition(new Vec3(330, -60));
                tag_node.getComponent(UITransform).anchorX = 1;
                tag_node.setPosition(new Vec3(260, -20));
                item.getComponent(chat_item).setData(true, null, data.content);
                word_time.getComponent(UITransform).anchorX = 1
                word_time.setPosition(new Vec3(250, word_time.position.y));
            } else { // 其他人
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname
                // 段位
                const playerRankConf = TxtUtils.Instance.getPlayerRankConf(data.player.cur_grade);
                tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                // vip等级
                head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;

                head_node.setPosition(new Vec3(-330, -60));
                tag_node.getComponent(UITransform).anchorX = 0
                tag_node.setPosition(new Vec3(-260, -20));
                item.getComponent(chat_item).setData(false, data.player, data.content);
                word_time.getComponent(UITransform).anchorX = 0
                word_time.setPosition(new Vec3(-250, word_time.position.y));
            }
        }
        else if (data.type === 5) {//pve
            system_name.active = false;
            head_node.active = true;
            tag_node.active = true;
            word_node.node.active = false;
            chat_word_arrow.active = false;
            // 获取当前用户信息
            let player_base_info = player_base_module.Instance.get_model().base_info;
            if (data.player.player_id === player_base_info.player_id) { // 自己
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv;
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname;
                // 段位
                const playerRankConf = TxtUtils.Instance.getPlayerRankConf(this.player_base_info.cur_grade);
                tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                // vip等级
                head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;

                head_node.setPosition(new Vec3(330, -60));
                tag_node.getComponent(UITransform).anchorX = 1;
                tag_node.setPosition(new Vec3(260, -20));
                item.getComponent(chat_item).setData(true, null, null, data.content);
                word_time.getComponent(UITransform).anchorX = 1
                word_time.setPosition(new Vec3(250, word_time.position.y));
            } else { // 其他人
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname
                // 段位
                const playerRankConf = TxtUtils.Instance.getPlayerRankConf(data.player.cur_grade);
                tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                // vip等级
                head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;

                head_node.setPosition(new Vec3(-330, -60));
                tag_node.getComponent(UITransform).anchorX = 0
                tag_node.setPosition(new Vec3(-260, -20));
                item.getComponent(chat_item).setData(true, null, null, data.content);
                word_time.getComponent(UITransform).anchorX = 0
                word_time.setPosition(new Vec3(-250, word_time.position.y));
            }

            //
            if (!Utils.isSameDay(Utils.now() / 1000, data.time)) {
                item.getComponent(chat_item).out_date = true;
            }
            else {
                item.getComponent(chat_item).out_date = false;
            }
        }
        else if (data.type === 6) {//pvp
            system_name.active = false;
            head_node.active = true;
            tag_node.active = true;
            word_node.node.active = false;
            chat_word_arrow.active = false;
            // 获取当前用户信息
            let player_base_info = player_base_module.Instance.get_model().base_info;
            if (data.player.player_id === player_base_info.player_id) { // 自己
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv;
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname;
                // 段位
                const playerRankConf = TxtUtils.Instance.getPlayerRankConf(this.player_base_info.cur_grade);
                tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                // vip等级
                head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;

                head_node.setPosition(new Vec3(330, -60));
                tag_node.getComponent(UITransform).anchorX = 1;
                tag_node.setPosition(new Vec3(260, -20));
                item.getComponent(chat_item).setData(true, null, null, null, data.content);
                word_time.getComponent(UITransform).anchorX = 1
                word_time.setPosition(new Vec3(250, word_time.position.y));
            } else { // 其他人
                // 等级
                head_node.getChildByName("level").getComponent(Label).string = data.player.lv
                // 昵称
                tag_node.getChildByName("name").getComponent(Label).string = data.player.nickname
                // 段位
                const playerRankConf = TxtUtils.Instance.getPlayerRankConf(data.player.cur_grade);
                tag_node.getChildByName("rank_level").getComponent(Sprite).spriteFrame = LoadUtils.Instance.common.getSpriteFrame(playerRankConf[3]);
                // vip等级
                head_node.getChildByName("vip_bg").getChildByName("lv").getComponent(Label).string = data.player.vip;

                head_node.setPosition(new Vec3(-330, -60));
                tag_node.getComponent(UITransform).anchorX = 0
                tag_node.setPosition(new Vec3(-260, -20));
                item.getComponent(chat_item).setData(true, null, null, null, data.content);
                word_time.getComponent(UITransform).anchorX = 0
                word_time.setPosition(new Vec3(-250, word_time.position.y));
            }
            if (!Utils.isSameDay(Utils.now() / 1000, data.time)) {
                item.getComponent(chat_item).out_date = true;
            }
            else {
                item.getComponent(chat_item).out_date = false;
            }
        }

        let h: number;
        let minH: number = 120;
        let offset: number = 100;
        const maxWidth: number = 550;
        // 根据内容长度设置宽度
        richText_test.getComponent(RichText).string = data.content
        if (richText_test.getComponent(UITransform).width < maxWidth) {
            word_node_ut.width = richText_test.getComponent(UITransform).width + 20
        } else {
            word_node_ut.width = maxWidth + 10
            word_text.maxWidth = maxWidth
        }
        richText_test.active = false;
        word_text.string = data.content
        // 立即更新布局
        word_node_layout.updateLayout();
        word_node.node.getComponent(UITransform).setContentSize(word_text.getComponent(UITransform).width + 10, word_text.getComponent(UITransform).height + 10);
        // 根据内容长度设置高度
        h = word_node.node.getPosition().y + word_node_ut.height + offset;
        item_ut.height = (data.type !== 4 && data.type !== 5 && data.type !== 6) ? (h < minH ? minH + 30 : h + 30) : 260;


        if (data.type === 0 || data.type === 2) {
            // 系统单独判断
            // 设置聊天时间高度
            const word_time_add_height = item_ut.height - 51.58;
            word_time.setPosition(new Vec3(word_time.position.x, -word_time_add_height));
        } else if (data.type === 4) {
            // 红包单独判断
            const word_time_add_height = item_ut.height - 20;
            word_time.setPosition(new Vec3(word_time.position.x, -word_time_add_height));
        } else if (data.type === 5 || data.type === 6) {
            // 红包单独判断
            const word_time_add_height = item_ut.height - 50;
            word_time.setPosition(new Vec3(word_time.position.x, -word_time_add_height));
        } else {
            // 设置聊天时间高度
            const word_time_add_height = h < minH ? item_ut.height - 51.58 : item_ut.height - 35;
            word_time.setPosition(new Vec3(word_time.position.x, -word_time_add_height));
        }
    }
}
