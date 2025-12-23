import {Component,ScrollView,Slider,Node,_decorator,Prefab,instantiate,Vec2,v3,Enum,UITransform,math,CCFloat,CCInteger,CCBoolean} from "cc";
import _ from "lodash";

const { ccclass, property } = _decorator;

enum Type {
    HORIZONTAL = 0,
    VERTICAL = 1,
}
Enum(Type);
enum VerticalAxisDirection {
    TOP_TO_BOTTOM = 0,
    BOTTOM_TO_TOP = 1,
}
Enum(VerticalAxisDirection);
enum HorizontalAxisDirection {
    LEFT_TO_RIGHT = 0,
    RIGHT_TO_LEFT = 1,
}
Enum(HorizontalAxisDirection);

const ITEM_COUNT_PER_FRAME = 5;

@ccclass
export default class common_scrollView extends Component {
    @property(ScrollView)
    scrollView: ScrollView = undefined;

    @property(Slider)
    slider: Slider = undefined;

    @property(Node)
    content: Node = undefined;

    @property(Node)
    mask: Node = undefined;

    @property(Prefab)
    itemPrefab: Prefab = undefined;

    @property({ type: HorizontalAxisDirection })
    startAxis: HorizontalAxisDirection = HorizontalAxisDirection.LEFT_TO_RIGHT;
    @property(CCFloat)
    paddingLeft: number = 0;
    @property(CCFloat)
    paddingRight: number = 0;
    @property(CCFloat)
    paddingTop: number = 0;
    @property(CCFloat)
    paddingBottom: number = 0;
    @property(CCInteger)
    paddingRow: number = 1;
    @property(CCFloat)
    spacingX: number = 0;
    @property(CCFloat)
    spacingY: number = 0;
    @property({ type: VerticalAxisDirection })
    verticalDirection: VerticalAxisDirection =
        VerticalAxisDirection.TOP_TO_BOTTOM;
    @property({ type: HorizontalAxisDirection })
    horizontalDirection: HorizontalAxisDirection =
        HorizontalAxisDirection.LEFT_TO_RIGHT;
    @property(CCBoolean)
    isRecycle = true;

    _itemNodeList: Node[] = [];
    _currentShowIndexs: number[] = [];
    _itemWidth = 0;
    _itemHeight = 0;
    _itemColCount = 0;
    _itemRowCount = 0;
    _dataGroups: number[][] = [];

    // 分帧创建
    _frameIndex = 0;
    _startFrame = false;
    _preY: number = undefined;
    _contentWidth: number = undefined;
    _contentHeight: number = undefined;
    _sliderShow = false;
    _removeItemNodeList: Node[] = [];
    _itemScaleX = 1;
    _itemScaleY = 1;

    refreshItemAction: Action2<Node, number> = null;
    initItemFinishAction: Action = null;
    cleanup() {
        this._itemNodeList = [];
        this._removeItemNodeList = [];
        this._currentShowIndexs = [];
        this._dataGroups = [];

        this._frameIndex = 0;
        this._startFrame = false;
        this._preY = undefined;
        this.content.removeAllChildren();

        this.scrollView.node.off("scrolling", this.scrolling, this);
        this.scrollView.node.off("scroll-ended", this.scrollingEnd, this);
        if (this._sliderShow && this.slider) this.slider.progress = 0;
        this._sliderShow = false;
    }

    _initData(count, callback, finishCallback) {
        this.cleanup();
        this.refreshItemAction = callback;
        this.initItemFinishAction = finishCallback;
        const itemNode = instantiate(this.itemPrefab);
        this._itemWidth =
            itemNode.getComponent(UITransform).width * this._itemScaleX;
        this._itemHeight =
            itemNode.getComponent(UITransform).height * this._itemScaleY;
        itemNode.destroy();

        this._itemColCount = Math.floor(
            (this.mask.getComponent(UITransform).width -
                this.paddingLeft -
                this.paddingRight +
                this.spacingX) /
                (this._itemWidth + this.spacingX)
        );

        this._itemColCount = this._itemColCount > 0 ? this._itemColCount : 1;

        this._itemNodeList = new Array(count);
        this._removeItemNodeList = [];
        this._dataGroups = _.chunk(_.range(count), this._itemColCount);
        this._itemRowCount = this._dataGroups.length;

        this._contentWidth = this.mask.getComponent(UITransform).width;
        this._contentHeight =
            this.paddingTop +
            this.paddingBottom +
            this._itemRowCount * this._itemHeight +
            (this._itemRowCount - 1) * this.spacingY;
        this.content
            .getComponent(UITransform)
            .setContentSize(math.size(this._contentWidth, this._contentHeight));
        this._sliderShow =
            this._contentHeight > this.mask.getComponent(UITransform).height;
        this.scrollView.node.on("scroll-ended", this.scrollingEnd, this);

        if (this.slider) {
            this.slider.node.active = this._sliderShow;
            if (this._sliderShow) {
                this.slider.node.on(
                    "slide",
                    (slider: Slider) => {
                        this.slide(slider);
                    },
                    this
                );
            }
        }
    }

    setItemPrefab(prefab: Prefab) {
        this.itemPrefab = prefab;
    }

    initDataToIndex(count, index, callback?, finishCallback?) {
        this._initData(count, callback, finishCallback);
        this._startInitMove(index);
    }

    initData(count, callback?, finishCallback?) {
        this._initData(count, callback, finishCallback);
        this._startInitMove();
    }

    setItemScale(itemScaleX, itemScaleY) {
        this._itemScaleX = itemScaleX;
        this._itemScaleY = itemScaleY;
    }

    _startInitMove(index?: number) {
        const pos = new Vec2(0, 0);
        if (index) {
            pos.y = -this.getPosition(index).y;
            const maxY =
                this._contentHeight -
                this.mask.getComponent(UITransform).height;
            if (pos.y > maxY) pos.y = maxY;
        }

        this.moveToY(pos.y, true);
        this.scrollView.scrollToOffset(pos, 0.1);
    }

    slide(slider: Slider) {
        this.scrollView.scrollToPercentVertical(1 - slider.progress, 0.01);
    }

    scrolling(scrollView: ScrollView) {
        let curY =
            scrollView.getContentPosition().y -
            this.mask.getComponent(UITransform).height / 2;
        curY = curY < 0 ? 0 : curY;
        if (this.isRecycle && this._preY && Math.abs(this._preY - curY) < 5)
            return;

        this._preY = curY;
        if (this.isRecycle) this.moveToY(curY);
        if (this._sliderShow && this.slider)
            this.slider.progress =
                curY /
                (this.content.getComponent(UITransform).height -
                    this.mask.getComponent(UITransform).height);
    }

    scrollingEnd() {
        this.scrollView.node.off("scroll-ended", this.scrollingEnd, this);
        this.scrollView.node.on("scrolling", this.scrolling, this);
    }

    moveToY(y, isInit = false) {
        const paddingY = (this.spacingY + this._itemHeight) * this.paddingRow;
        const topY = -(y - paddingY);
        const bottomY = -(
            y +
            this.mask.getComponent(UITransform).height +
            paddingY
        );
        const currentShowIndexs = [];
        this._dataGroups.forEach((row) => {
            row.forEach((index) => {
                const v3 = this.getPosition(index);
                if ((v3.y < topY && v3.y > bottomY) || !this.isRecycle) {
                    currentShowIndexs.push(index);
                }
            });
        });

        if (isInit) {
            this._currentShowIndexs = currentShowIndexs;
            this._frameIndex = 0;
            this._startFrame = true;
        } else {
            this.createItem(currentShowIndexs);
        }
    }
    redrawItem() {
        for (let i = 0; i < this._currentShowIndexs.length; i++) {
            const index = this._currentShowIndexs[i];
            if (this._itemNodeList[index]) {
                this.onRefreshItem(this._itemNodeList[index], index);
            }
        }
    }
    createItem(indexs: number[]) {
        const addIndexs = _.difference(indexs, this._currentShowIndexs);
        const removeIndexs = _.difference(this._currentShowIndexs, indexs);

        addIndexs.forEach((x) => {
            let itemNode: Node = undefined;
            if (removeIndexs.length > 0) {
                const oldIndex = removeIndexs.shift();
                itemNode = this._itemNodeList[oldIndex];
                this._itemNodeList[x] = itemNode;
                this._itemNodeList[oldIndex] = undefined;
            } else {
                if (this._removeItemNodeList.length > 0) {
                    itemNode = this._removeItemNodeList.shift();
                } else {
                    itemNode = instantiate(this.itemPrefab);
                    itemNode.setScale(this._itemScaleX, this._itemScaleY);
                    this.content.addChild(itemNode);
                }
            }
            itemNode.position = this.getPosition(x);
            this.onRefreshItem(itemNode, x);
            this._itemNodeList[x] = itemNode;
        });

        removeIndexs.forEach((x) => {
            const itemNode = this._itemNodeList[x];
            this._removeItemNodeList.push(itemNode);
            this._itemNodeList[x] = undefined;
        });

        this._currentShowIndexs = [];
        this._itemNodeList.forEach((x, i) => {
            if (x) {
                this._currentShowIndexs.push(i);
            }
        });
    }

    getPosition(index) {
        const row = Math.floor(index / this._itemColCount);
        const col = index % this._itemColCount;
        const x =
            this.paddingLeft +
            this._itemWidth / 2 +
            (this._itemWidth + this.spacingX) * col;
        const y = -(
            this.paddingTop +
            this._itemHeight / 2 +
            (this._itemHeight + this.spacingY) * row
        );
        return v3(x, y, 0);
    }

    protected onRefreshItem(item: Node, index: number) {
        //
        this?.refreshItemAction(item, index);
    }

    initItem(index) {
        const x = index;
        const itemNode = instantiate(this.itemPrefab);
        itemNode.setScale(this._itemScaleX, this._itemScaleY);
        this.content.addChild(itemNode);
        itemNode.position = this.getPosition(x);
        this.onRefreshItem(itemNode, x);
        this._itemNodeList[x] = itemNode;
        this._frameIndex++;
    }
    update(dt) {
        if (this._startFrame) {
            for (let i = 0; i < ITEM_COUNT_PER_FRAME; i++) {
                if (this._frameIndex >= this._currentShowIndexs.length) {
                    this._startFrame = false;
                    this.initItemFinishAction && this.initItemFinishAction();
                    return;
                }

                this.initItem(this._currentShowIndexs[this._frameIndex]);
            }
        }
    }

	removeChildren() {
		this.content.destroyAllChildren();
		this.cleanup();
	}
}
