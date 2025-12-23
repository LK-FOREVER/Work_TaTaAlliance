import { _decorator, Color, Component, Event, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import LoadUtils from '../../Utils/LoadUtils';
import EventManager from '../../Common/EventManager';
import EventConst from '../../Utils/EventConst';
import { Const } from '../../const/consts';
const { ccclass, property } = _decorator;

@ccclass('select_server_view')
export class select_server_view extends Component {
    server_group_list_content: Node = null!;
    server_list_content: Node = null!;
    @property(Prefab)
    server_group_item: Prefab = null!;
    @property(Prefab)
    server_item: Prefab = null!;
    private select_group_id: number = 0;
    private selected_server_list: any[] = [];
    serverData: any[] = [];
    start() {
        this.server_group_list_content = this.node.getChildByName("server_group_list").getChildByName("view").getChildByName("content")
        this.server_list_content = this.node.getChildByName("server_list").getChildByName("view").getChildByName("content")
        const mask = this.node.getChildByName("mask")
        const btn_close = this.node.getChildByName("btn_close")
        mask.on(Node.EventType.TOUCH_END, this.close_handler, this)
        btn_close.on(Node.EventType.TOUCH_END, this.close_handler, this)
        // 请求服务器信息
        fetch(Const.srv_list_url+`?random=${Date.now()}`).then((response: Response) => {
            return response.text()
        }).then((value) => {
            this.serverData = JSON.parse(value)
            this.loadResourcePrefab()
        })
    }
    private close_handler(){
        EventManager.Instance.emit(EventConst.OPEN_SELECT_SERVER_VIEW, false);
    }
    loadResourcePrefab() {
        this.server_group_list_content.removeAllChildren()
        // 区列表
        this.serverData.forEach(item => {
            const group_item = instantiate(this.server_group_item)
            group_item.setParent(this.server_group_list_content)
            group_item.getChildByName("group_name").getComponent(Label).string = item.z_name
            group_item.on(Node.EventType.TOUCH_END, this.selectServerGroup, this)
        })
        this.server_group_list_content.children.forEach((item, index) => {
            if (index === this.select_group_id) {
                item.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_group_bg_2")
                item.getChildByName("group_name").getComponent(Label).color = new Color("#5F2517")
                item.getChildByName("group_name").getComponent(Label).enableOutline = true
                this.selected_server_list = this.serverData[this.select_group_id].servers
            } else {
                item.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_group_bg_1")
                item.getChildByName("group_name").getComponent(Label).color = new Color("#dca677")
                item.getChildByName("group_name").getComponent(Label).enableOutline = false
            }
        })
        this.createServerItem()
    }
    selectServerGroup(event: Event) {
        // 服务器区列表
        const select_node: Node = event.target
        const idx = select_node.getSiblingIndex()
        this.select_group_id = idx

        this.server_group_list_content.children.forEach(item => {
            item.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_group_bg_1")
            item.getChildByName("group_name").getComponent(Label).color = new Color("#dca677")
            item.getChildByName("group_name").getComponent(Label).enableOutline = false
        })
        select_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_group_bg_2")
        select_node.getChildByName("group_name").getComponent(Label).color = new Color("#5F2517")
        select_node.getChildByName("group_name").getComponent(Label).enableOutline = true
        this.selected_server_list = this.serverData[this.select_group_id].servers
        this.createServerItem()
    }
    createServerItem() {
        // 服务器列表
        this.server_list_content.removeAllChildren()
        this.selected_server_list.forEach(item => {
            const server_item = instantiate(this.server_item)
            server_item.setParent(this.server_list_content)
            server_item.getChildByName("server_name").getComponent(Label).string = item.svr_name
            const tag_node = server_item.getChildByName("tag_node")
            if (item.status === 0){
                // 维护
                tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_3")
            }else if (item.status === 1){
                // 爆满
                tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_1")
            } else if (item.status === 2) {
                // 流畅
                tag_node.getComponent(Sprite).spriteFrame = LoadUtils.Instance.login.getSpriteFrame("login_server_tag_2")
            }
            server_item.on(Node.EventType.TOUCH_END, ()=>{
                EventManager.Instance.emit(EventConst.CHANGE_SERVER,item);
                this.close_handler();
            }, this)
        })
    }
}


