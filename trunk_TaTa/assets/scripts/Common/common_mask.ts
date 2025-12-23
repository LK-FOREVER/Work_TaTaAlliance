import { _decorator, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("common_mask")
export class common_mask extends Component {
    private eventName: string = "";
    protected onLoad(): void {
        this.eventName;
    }

    public close() {}
}
