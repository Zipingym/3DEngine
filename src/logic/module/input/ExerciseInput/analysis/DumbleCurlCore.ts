import { JoinAngle } from "../PoseResult";

export default class DumbbellCurlAnalysis {
    private flag:boolean = false; // 구부렸을 때 true

    public inputValue = (angle: JoinAngle) => {
        if(angle.accuracy < 0.8)
            return false
        const degree = angle.getAngle("degree")
        if(degree < 100 &&
        !this.flag){
            this.flag = true
        } else if (this.flag && degree >= 110){
            this.flag = false
            return true
        }
        return false
    };
}