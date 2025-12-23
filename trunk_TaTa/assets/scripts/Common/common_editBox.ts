import { _decorator, Component, Label, Vec3 } from 'cc';
import Utils from '../Utils/Utils';
import { ToastControllers } from './ToastControllers';
const { ccclass, property } = _decorator;

@ccclass('common_editBox')
export class common_editBox extends Component {
	private _parent;
	private _initValue;
	private _maxValue;
	private _isMultiple = false;//是否输入倍数数字
	private _multipleNumber: number = 0; //倍数数字
	init(parent, initValue, maxValue) {
		this._parent = parent;
		this._initValue = initValue;
		this._maxValue = maxValue;
		this._isMultiple = false;
		this.editDidBegin();
		this.setNumber(initValue);

	}

	setMultiple(isMultiple, multipleNumber) {
		this._isMultiple = isMultiple;
		this._multipleNumber = multipleNumber;
	}
	editDidBegin() {
		this.node.getChildByName("number").setPosition(new Vec3(0, 0));
		this.node.getChildByName("placeholder").setPosition(new Vec3(0, 0));
	}

	editDidEnd() {
		this.editDidBegin();
		const v = this.node.getChildByName("number").getComponent(Label).string;
		if (!Utils.isValidNumber(v)) {
			this.setNumber(this._initValue);
			ToastControllers.Instance.showToast("请输入有效数字");
			return;
		}

		const v2 = Math.floor(Number(v));
		if (v2 > this._maxValue) {
			ToastControllers.Instance.showToast("超出所能购买的最大数量");
			this.setNumber(this._maxValue);
		} else {
			this.setNumber(v2);
		}

	}

	setNumber(num: number) {
		if (this._isMultiple && this._maxValue > this._initValue) {
			if (num < this._multipleNumber) {
				num = this._multipleNumber;
			} else {
				num = Math.floor(num / this._multipleNumber) * this._multipleNumber;
			}
		}
		this.node.getChildByName("number").getComponent(Label).string = Utils.changeNumber(num, 2);
		this._parent.setPrice(num);
	}
	getNumber() {
		return this.node.getChildByName("number").getComponent(Label).string;
	}
}


