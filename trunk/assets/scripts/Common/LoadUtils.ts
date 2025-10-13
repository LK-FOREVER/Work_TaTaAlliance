import {
    _decorator,
    AssetManager,
    assetManager,
    Component,
    error,
    Node,
    resources,
    sp,
    Sprite,
    SpriteAtlas,
    SpriteFrame,
} from "cc";
import { AudioManager } from "../Managers/AudioManager";
import EventManager from "./EventManager";
import { EventConst } from "./EventConst";
const { ccclass, property } = _decorator;

@ccclass("LoadUtils")
export class LoadUtils extends Component {
    private static _instance: LoadUtils = null;
    static get Instance() {
        if (this._instance === null) {
            this._instance = new LoadUtils();
        }
        return this._instance;
    }

    LOAD_FINISH_NUM = 15;
    loadCount: number = 0;

    animationBundle: AssetManager.Bundle;
    atlasBundle: AssetManager.Bundle;
    bonesBundle: AssetManager.Bundle;
    fontBundle: AssetManager.Bundle;

    public furniture_icon: SpriteAtlas | null = null;
    public main_furniture: SpriteAtlas | null = null;
    public towers: SpriteAtlas | null = null;
    public towers_new: SpriteAtlas | null = null;
    public towers_card: SpriteAtlas | null = null;
    public staff_up: SpriteAtlas | null = null;
    public goods_list: SpriteFrame[] = [];
    public common: SpriteFrame[] = [];
    public equip: SpriteFrame[] = [];
    public staff: SpriteFrame[] = [];
    public main_build: SpriteFrame[] = [];

    private atlas_list: string[] = [
        "furniture_icon",
        "main_furniture",
        "towers",
        "towers_new",
        "towers_card",
        "staff_up",
    ];
    private loadDirGoodsAsset() {
        resources.loadDir("images/goods", SpriteFrame, (err, assets) => {
            if (err) {
                error(err);
                return
            }
            this.goods_list = assets
            this.loadSuccess();
            console.log("goods加载完成")
        });
    }
    private loadDirCommonAsset() {
        resources.loadDir("textures/common", SpriteFrame, (err, assets) => {
            if (err) {
                error(err);
                return
            }
            this.common = assets
            this.loadSuccess();
            console.log("common加载完成")
        });
    }
    private loadDirEquipAsset() {
        resources.loadDir("textures/equip", SpriteFrame, (err, assets) => {
            if (err) {
                error(err);
                return
            }
            this.equip = assets
            this.loadSuccess();
            console.log("equip加载完成")
        });
    }
    private loadDirStaffAsset() {
        resources.loadDir("textures/staff", SpriteFrame, (err, assets) => {
            if (err) {
                error(err);
                return
            }
            this.staff = assets
            this.loadSuccess();
            console.log("staff加载完成")
        });
    }
    private loadDirMainBuildAsset() {
        resources.loadDir("textures/main_build", SpriteFrame, (err, assets) => {
            if (err) {
                error(err);
                return
            }
            this.main_build = assets
            this.loadSuccess();
            console.log("main_build加载完成")
        });
    }

    private loadAnimationBundle() {
        assetManager.loadBundle("animation", (err, bundle) => {
            this.animationBundle = bundle;
            this.loadSuccess();
            console.log("动画加载完成");
        });
    }
    private loadAtlasBundle() {
        assetManager.loadBundle("atlasBundle", (err, bundle) => {
            this.atlasBundle = bundle;
            this.loadSuccess();
            this.loadPicByBundle();
            console.log("图集资源加载完毕");
        });
    }
    private loadAudioBundle() {
        assetManager.loadBundle("audioBundle", (err, bundle) => {
            AudioManager.ins.audioBundle = bundle;
            this.loadSuccess();
            console.log("音效加载完成");
        });
    }
    private loadBonesBundle() {
        assetManager.loadBundle("bonesBundle", (err, bundle) => {
            this.bonesBundle = bundle;
            this.loadSuccess();
            console.log("骨骼动画资源加载完毕");
        });
    }
    private loadFontBundle() {
        assetManager.loadBundle("fontBundle", (err, bundle) => {
            this.fontBundle = bundle;
            this.loadSuccess();
            console.log("字体资源加载完毕");
        });
    }

    private loadPicByBundle() {
        this.atlas_list.forEach((element) => {
            this.atlasBundle.load(
                element,
                SpriteAtlas,
                (err, atlas: SpriteAtlas) => {
                    this[element] = atlas;
                    this.loadSuccess();
                    console.log(element);
                }
            );
        });
    }

    public changeTowerBones(id: any, node: Node) {
        this.bonesBundle.load(
            "towers/spine_" + id,
            sp.SkeletonData,
            (err, skedata) => {
                let tower_sk = node.getComponent(sp.Skeleton);
                tower_sk.skeletonData = skedata;
                tower_sk.setAnimation(0, "idle_" + id, true);
            }
        );
    }
    public changeEnemysBones(id: any, node: Node, state: any) {
        this.bonesBundle.load(
            "enemy/enemy_" + id,
            sp.SkeletonData,
            (err, skedata) => {
                if (node && node.isValid) {
                    let enemy_sk = node.getComponent(sp.Skeleton);
                    enemy_sk.skeletonData = skedata;
                    if (state === "walk") {
                        enemy_sk.setAnimation(0, "walk_" + id, true);
                    } else if (state === "idle") {
                        enemy_sk.setAnimation(0, "idle_" + id, true);
                    }
                }
            }
        );
    }
    public changeNpcBones(id: any, node: Node) {
        this.bonesBundle.load(
            "npc/npc_" + id,
            sp.SkeletonData,
            (err, skedata) => {
                let npc = node.getComponent(sp.Skeleton);
                npc.skeletonData = skedata;
                console.log(npc.findAnimation("work"));
                if (npc.findAnimation("work") !== null) {
                    npc.setAnimation(0, "work", true);
                }
            }
        );
    }

    private loadSuccess() {
        this.loadCount++;
        if (this.loadCount >= this.LOAD_FINISH_NUM) {
            console.log("=========资源加载完毕");
            EventManager.Instance.emit(EventConst.LOAD_RES_SUCCESS);
        }
    }

    public load() {
        this.loadAnimationBundle();
        this.loadAtlasBundle();
        this.loadAudioBundle();
        this.loadBonesBundle();
        this.loadFontBundle();
        this.loadDirGoodsAsset();
        this.loadDirCommonAsset();
        this.loadDirEquipAsset();
        this.loadDirStaffAsset();
        this.loadDirMainBuildAsset();
    }
}
