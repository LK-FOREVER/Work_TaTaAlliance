import { _decorator, Component} from "cc";
const { ccclass, property } = _decorator;

import proto from "../../proto/proto.js";
import EventManager from '../Common/EventManager';

@ccclass("netManager")
export default class netManager extends Component {
    private static _instance: netManager = null;
    private webSocket: WebSocket = null;
    private connected: boolean = false;
    private heart_delay: number = 1;
    public is_reconnect:boolean = false;
    private is_connecting:boolean = false;
    public kick_status:boolean = false;
    private svr_ip:string = null;
    private svr_port:string = null;
    private connect_timestamp:number= 0;
    static get Instance() {
        if (this._instance === null) {
            this._instance = new this();
        }
        return this._instance;
    }
    init(ip:string,port:string) {
        this.svr_ip = ip;
        this.svr_port = port;
        this.kick_status = false;
        this.prepareWebSocket();
    }
    prepareWebSocket() {
        this.webSocket = new WebSocket("ws://"+this.svr_ip+":"+this.svr_port);
        this.webSocket.binaryType = "arraybuffer";
        this.webSocket.onopen = (evt: Event) => {
            this.unscheduleAllCallbacks();
            this.connected = true;
            this.send_heart();
            this.is_connecting = false;
            if(this.is_reconnect)
            {
                EventManager.Instance.emit("query_101");
            }
            this.is_reconnect = true;
        };
        this.webSocket.onmessage = (evt) => {
            this.parseMessage(evt);
        };
        this.webSocket.onerror = (evt: Event) => {
            this.webSocket.close();
            this.is_connecting = false;
            const cd = Date.now() - this.connect_timestamp;
            if(cd >= 1000)
            {
                this.connect_timestamp = Date.now()
                this.reconnect();
            }
            
        };
        this.webSocket.onclose = () => {
            console.log("服务器链接关闭");
            this.is_connecting = false;
            EventManager.Instance.emit("NETCLOSED")
        };
    }
    private reconnect() {
        if(this.is_connecting || this.kick_status)
        {
            return
        }
        this.stop_heart();

        this.scheduleOnce(() => {
            this.try_reconnect();
        }, 2);
    }

    private try_reconnect() {
        this.is_connecting = true;
        if (!this.connected) {
            this.webSocket = null;
            this.prepareWebSocket();
        }
    }
    public server_kick()
    {
        this.kick_status = true;
        this.is_reconnect = false;
        if(this.webSocket)
        {
            this.webSocket.close();
            this.webSocket = null;
        }
        
    }
    send_heart() {
        if (this.connected) {
            this.sendMessage(100, {});
            this.scheduleOnce(function () {
                this.send_heart();
            }, this.heart_delay);
        }
    }
    stop_heart() {
        this.connected = false;
    }

    private int32ToBuffer(num: number): Uint8Array {
        let buffer = new ArrayBuffer(4);
        let view = new DataView(buffer);
        view.setInt32(0, num, true);
        let uint8Array = new Uint8Array(buffer);

        return uint8Array.reverse();
    }

    private make_proto(msg_id: number, data: any): any {
        let msg_class = proto["query_" + msg_id];
        let message = msg_class.create(data);
        let content_uint8 = msg_class.encode(message).finish();
        
        let msg_id_uint8 = this.int32ToBuffer(msg_id);
        let msg_len = msg_id_uint8.length + content_uint8.length
        let msg_len_uint8 = this.int32ToBuffer(msg_len);
        
        let combined = new Uint8Array(
            msg_id_uint8.length*2 + content_uint8.length
        );
        combined.set(msg_len_uint8, 0);
        combined.set(msg_id_uint8, msg_id_uint8.length);
        combined.set(content_uint8, msg_id_uint8.length*2);

        this.webSocket.send(combined);
    }

    sendMessage(msg_id: number, data: any) {
        if(this.webSocket == null)
        {
            return;
        }
        if (this.webSocket.readyState != WebSocket.OPEN) {
            if (this.webSocket.readyState == WebSocket.CLOSED) {
                const cd = Date.now() - this.connect_timestamp;
                if(cd >= 1000)
                {
                    this.connect_timestamp = Date.now()
                    this.reconnect();
                }
                
            }
            return;
        }
        console.log("发送协议："+msg_id)
        this.make_proto(msg_id, data);
        
    }

    private get_msg_id(uint8Array:Uint8Array)
    {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        uint8Array = uint8Array.reverse()
        uint8Array.forEach((value, index) => {
        view.setUint8(index, value);
        });
        return view.getUint32(0, true);
    }
    private parseMessage(evt: MessageEvent) {
        
        const uint8Array: Uint8Array = new Uint8Array(evt.data);
        let id = this.get_msg_id(uint8Array.slice(4,8));
        let content_array = uint8Array.slice(8,uint8Array.length);

        let protoBody: any = null;
        let msg_content:any = {};
        let msg_name = "reply_" + id;
        protoBody = proto[msg_name];
        if (protoBody) {
            if (content_array.length > 1) {
                msg_content = protoBody.decode(content_array);
            } else {
                msg_content = {};
            }
        }
        if(id == 100)
        {
            this.set_time(msg_content.time);
        }
        else
        {
            console.log("收到--协议："+msg_name)
            EventManager.Instance.emit(msg_name, msg_content);
        }
    }
    
    private time_dif:number = 0;
    private set_time(time:number)
    {
        this.time_dif = time - Date.now()
    }
    /**
     * 
     * @param time 服务器当前时间戳 毫秒
     */
    public get_time()
    {
        return Date.now() + this.time_dif;
    }
}
