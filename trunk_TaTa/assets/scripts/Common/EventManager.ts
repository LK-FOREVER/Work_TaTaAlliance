import { _decorator } from 'cc';
interface IItem {
    func: Function;
    ctx: unknown;
}

export default class EventManager {
    private static _instance: EventManager = null;
    private constructor() {

    }
    eventDic: Map<string, Array<IItem>> = new Map();

    on(event: string, func: Function, ctx?: unknown) {
        if (this.eventDic.has(event)) {
            if (this.eventDic.get(event).find(item => (item.func === func && item.ctx === ctx)) !== undefined) {
                return
            }
            this.eventDic.get(event).push({ func, ctx });
        } else {
            this.eventDic.set(event, [{ func, ctx }]);
        }
    }
    off(event: string, func: Function, ctx?: unknown) {
        if (this.eventDic.has(event)) {
            const index = this.eventDic.get(event).findIndex((i) => func === i.func && i.ctx === ctx);
            index > -1 && this.eventDic.get(event).splice(index, 1);
        }
    }

    emit(event: string, ...params: unknown[]) {
        if (this.eventDic.has(event)) {
            this.eventDic.get(event).forEach(({ func, ctx }) => {
                ctx ? func.apply(ctx, params) : func(...params);
            });
        }
    }

    clear() {
        this.eventDic.clear();
    }
    static get Instance() {
        if (this._instance === null) {
            this._instance = new this()
        }
        return this._instance
    }
}
