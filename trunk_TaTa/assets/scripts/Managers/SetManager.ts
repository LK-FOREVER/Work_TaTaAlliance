import { _decorator, Component, Node, resources, JsonAsset, error, Label, RichText, ProgressBar, NodeEventType, find, Sprite, Button, Slider, instantiate, Prefab, v3, director } from 'cc';
const { ccclass, property } = _decorator;
import { AudioManager } from './AudioManager';
import { GameData } from '../Common/GameData';
import netManager from '../Network/netManager';
import EventManager from '../Common/EventManager';

@ccclass('SetManager')
export class SetManager extends Component {
    setting_panel: Node = null;
    music: Node = null;
    sound: Node = null;
    music_slider: Node = null;
    music_slider_com: Slider;
    music_progress: ProgressBar;
    sound_slider: Node = null;
    sound_slider_com: Slider;
    sound_progress: ProgressBar;
    audioMgr: AudioManager;
    set_close: Node = null;
    Login_out: Node = null;//退出登录
    tip_box: Node = null;//提示框
    button_ok: Node = null;//提示框 确定按钮
    button_cancel: Node = null;//提示框 取消按钮

    start() {
        this.audioMgr = AudioManager.ins;
        this.settingAudioinit();
    }

    settingAudioinit() {
        this.setting_panel = this.node.getChildByName("setting_panel")
        this.music = this.setting_panel.getChildByName('music');
        this.sound = this.setting_panel.getChildByName('sound');

        this.music_slider = this.music.getChildByName('Slider');
        this.music_slider_com = this.music_slider.getComponent(Slider);
        this.music_progress = this.music_slider.getComponent(ProgressBar);

        this.sound_slider = this.sound.getChildByName('Slider');
        this.sound_slider_com = this.sound_slider.getComponent(Slider);
        this.sound_progress = this.sound_slider.getComponent(ProgressBar);
        this.tip_box = this.node.getChildByName("tip_box");
        this.button_ok = this.tip_box.getChildByName("container").getChildByName("confirm");
        this.button_cancel = this.tip_box.getChildByName("container").getChildByName("cancel");
        this.tip_box.active = false;
        this.Login_out = this.node.getChildByName("Login_out");
        this.Login_out.on(NodeEventType.TOUCH_END, () => {
            //点击退出登录
            this.tip_box.active = true;
        })
        this.button_ok.on(NodeEventType.TOUCH_END, () => {
            //退出登录
            // GameData.saveData(false);
            if (!this.audioMgr) {
                this.audioMgr = AudioManager.ins;
            }
            this.audioMgr.stopMusic();
            this.audioMgr.stopAllSound();
            //断开网络连接
            netManager.Instance.kick_status = true;
            netManager.Instance.is_reconnect = false;
            netManager.Instance.stop_heart();
            netManager.Instance['webSocket']?.close();

            // 清理事件监听
            // EventManager.Instance.clear();
            //加载登录场景
            director.preloadScene("Login",
                (completedCount: number, totalCount: number, item: any) => { },
                () => {
                    director.loadScene("Login");
                });
        })
        this.button_cancel.on(NodeEventType.TOUCH_END, () => {
            //取消退出登录
            AudioManager.ins.playSound("click", false);
            this.tip_box.active = false;
        })

        this.music_progress.progress = GameData.userData.audioMusic;
        this.sound_progress.progress = GameData.userData.audioSound;
        this.music_slider_com.progress = GameData.userData.audioMusic;
        this.sound_slider_com.progress = GameData.userData.audioSound;

        this.music_slider_com!.node.on('slide', this.musicCall, this);
        this.sound_slider_com!.node.on('slide', this.soundCall, this);

        this.set_close = this.node.getChildByName("set_close");
        this.set_close.on(NodeEventType.TOUCH_END, () => {
            AudioManager.ins.playSound("click", false);
            this.node.active = false;
            GameData.saveData(false);
        })
    }
    musicCall(slider: Slider) {
        let pro = slider.progress;
        this.music_slider.getComponent(ProgressBar).progress = pro;
        this.audioMgr.setMusicVolume(pro);
        this.saveAudiodata()
    }
    soundCall(slider: Slider) {
        let pro = slider.progress;
        this.sound_slider.getComponent(ProgressBar).progress = pro;
        this.audioMgr.setSoundVolume(pro);
        this.saveAudiodata();
    }
    //保存音量
    saveAudiodata() {
        GameData.userData.audioMusic = this.music_slider_com.progress;
        GameData.userData.audioSound = this.sound_slider_com.progress;
    }
}

