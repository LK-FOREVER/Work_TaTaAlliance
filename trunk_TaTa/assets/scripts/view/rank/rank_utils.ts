import { _decorator} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rank_utils')
export default class rank_utils {
	public static getScaleByRankGrade(rankGrade: number) {
		if(rankGrade === 1) {
			return 0.25;
		} else if(rankGrade === 2) {
			return 0.2;
		} else if(rankGrade === 3) {
			return 0.175;
		} else if(rankGrade === 4) {
			return 0.15;
		} else if(rankGrade === 5) {
			return 0.14;
		} else if(rankGrade === 6) {
			return 0.14;
		} else if(rankGrade === 7) {
			return 0.13;
		} 
		return 1;
	}
}


