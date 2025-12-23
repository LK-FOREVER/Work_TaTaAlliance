import {_decorator,Component,assetManager,AssetManager,Sprite,SpriteFrame,SpriteAtlas,Node} from "cc";
const { ccclass, property } = _decorator;

import EventManager from "../Common/EventManager";
import EventConst from "./EventConst";
import TxtUtils from "./TxtUtils";

@ccclass("LoadUtils")
export default class LoadUtils extends Component {
    private static _instance: LoadUtils = null;
    static get Instance() {
        if (this._instance === null) {
            this._instance = new LoadUtils();
        }
        return this._instance;
    }
    loadCount = 0;
	prefabNodeMap: Map<number, string>;
    atlasBundle: AssetManager.Bundle;
    resBundle: AssetManager.Bundle;

    public common_top: SpriteAtlas | null = null;
    public common: SpriteAtlas | null = null;
    public friend: SpriteAtlas | null = null;
    public chat: SpriteAtlas | null = null;
    public notice: SpriteAtlas | null = null;
    public mail: SpriteAtlas | null = null;
    public rank: SpriteAtlas | null = null;
    public player_info: SpriteAtlas | null = null;
    public main: SpriteAtlas | null = null;
    public login: SpriteAtlas | null = null;
    
    private total_num:number = 0;
    private atlas_list: string[] = [
        "common_top",
        "common",
        "friend",
        "chat",
        "notice",
        "mail",
        "rank",
        "player_info",
        "main",
        "login"
    ];

    //    // LIFE-CYCLE CALLBACKS:
    private loadAtlasBundle() {
        assetManager.loadBundle("atlasBundle", (err, bundle) => {
            this.atlasBundle = bundle;
            this.loadPicByBundle();
        });
    }
    
    private loadPicByBundle() {
        let element = this.atlas_list.shift();
        if(element)
        {
            // console.log("图集开始加载"+element)
            this.atlasBundle.load(element,SpriteAtlas,(err, atlas: SpriteAtlas) => {
                    console.log("图集加载完成"+element)
                    atlas.addRef();
                    this[element] = atlas;
                    this.loadSuccess(element);
                    this.loadPicByBundle();
                }
            );
        }
    }

    private loadResBundle() {
        assetManager.loadBundle("res", (err, bundle) => {
            this.resBundle = bundle;
            this.loadSuccess("res");
            TxtUtils.Instance.load();
        });
	}
    private loadSuccess(name:string="ssss") {
        this.loadCount += 1;
        console.log("加载chenggong"+name);
		EventManager.Instance.emit(EventConst.LOAD_RES_PROGRESS);
        console.log("loadCount:   " +this.loadCount +"  total_num:" +this.total_num);
        if (this.loadCount == this.total_num) {
            // console.log("图片资源加载完毕");
            // EventManager.Instance.emit(EventConst.LOAD_RES_SUCCESS);
        }
    }

    public load() {
        this.total_num = this.atlas_list.length + 1;
        this.loadResBundle();
        this.loadAtlasBundle();
		//this.loadPrefabs();
    }
}
