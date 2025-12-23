import { _decorator} from "cc";
const { ccclass, property } = _decorator;

@ccclass("rank_model")
export default class rank_model {
	public currentRankId: number = 0;
}
