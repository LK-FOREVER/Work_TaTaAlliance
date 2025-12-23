import { _decorator, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StorageManager')
export class StorageManager {
    private static _instance: StorageManager = null;
    public static get Instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new StorageManager();
        return this._instance;
    }

	public saveLocalStorage(key: string, value: any) {
		if(value === undefined || value === null) {
			console.warn("value 有误-->" + key);
			return;
		}
		key = String(key);
		if(typeof value === "number") {
			value = value + "";
		} else if(typeof value === "boolean") {
			value = value ? "1" : "0";
		} else if(typeof value === "object") {
			value = JSON.stringify(value);
		}
		try {
			sys.localStorage.setItem(key, value);
		} catch (error) {
			console.log(error)
		}
		
	}

	public getLocalStorageString(key: string, defaultValue: string = "") {
		const data = sys.localStorage.getItem(key);
		if(data === null) {
			return defaultValue;
		}
		return data;
	}

	public getLocalStorageNumber(key: string, defaultValue: number = 0) {
		const data = sys.localStorage.getItem(key);
		if(data === null) {
			return defaultValue;
		}
		return Number(data);
	}

	public getLocalStorageBoolean(key: string) {
		let data = sys.localStorage.getItem(key);
		data = Number(data);
		return Boolean(data);
	}

	public getLocalStorageJson(key: string) {
		const data = sys.localStorage.getItem(key);
		console.log("getLocalStorageJson-->", key, "data:", data);
		if(data === null) {
			console.warn("getLocalStorageJson 无数据-->", key);
			return {isSkip: 0};
		}
		return JSON.parse(data);
	}

	public removeLocalStorage(key) {
		sys.localStorage.removeItem(key);
	}
}


