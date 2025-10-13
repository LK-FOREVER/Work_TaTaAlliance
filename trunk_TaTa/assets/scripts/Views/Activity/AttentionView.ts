import { _decorator,Texture2D,view,RenderTexture, find, Camera, Button, Component, native, Node } from 'cc';
// import { ActivityControllers } from '../../Controllers/Activity/ActivityControllers';
import { TapSDKManager } from '../../LeChen/TapSDKManager';
const { ccclass, property } = _decorator;

@ccclass('AttentionView')
export class AttentionView extends Component {
    btn_confirm: Node;
    rt:RenderTexture = null;
    camera
    start() {
        this.btn_confirm = this.node.getChildByName('btn_confirm');
        this.btn_confirm.on(Button.EventType.CLICK, (event) => {
            //确认按钮，链接SDK
            this.saveQRCode();
        })

    }
    saveQRCode() {
        if(this.camera == null)
        {
            this.camera = find("Camera");
        }
        let xxx_w = view.getVisibleSize().width;
        let xxx_h = view.getVisibleSize().height;
        this.rt = new RenderTexture();
        this.rt.initialize({width: xxx_w,height: xxx_h})
        this.camera.getComponent(Camera).targetTexture = this.rt;
        this.scheduleOnce(()=>{
            this.camera.getComponent(Camera).targetTexture = null;
            let _buffer = this.rt.readPixels();

            //翻转图片
            let picData = new Uint8Array(xxx_w * xxx_h * 4);
            let rowBytes = xxx_w * 4;
            for (let row = 0; row < xxx_h; row++) {
                let srow = xxx_h - 1 - row;
                let start = srow * xxx_w * 4;
                let reStart = row * xxx_w * 4;
                // save the piexls data
                for (let i = 0; i < rowBytes; i++) {
                    picData[reStart + i] = _buffer[start + i];
                }
            }    

            console.log(picData)
            var path = native.fileUtils.getWritablePath() + 'xx.png';
            native.saveImageData(picData, xxx_w, xxx_h, path).then(()=>{
                // console.log("截图保存成功");
                // if(native.fileUtils.isFileExist(path))
                // {
                //     console.log("图片验证存在")
                // }
                let args = {};
                args["path"] = path;
                args["filename"] = 'xx.png';
                let json = JSON.stringify(args);
    
                TapSDKManager.onSaveQRCode(json);
            }).catch(()=>{
                console.log("截图保存失败");
            });
            // //关闭当前页面
            // ActivityControllers.instance.showAttentionView();
        })
        
        
    }


    callQRCode(spriteFrame) {
        //修改对应参数
    }

    update(deltaTime: number) {

    }
}


