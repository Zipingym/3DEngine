import Analysis from "./analysis";

export default class leftDumbbellCurlAnalysis extends Analysis {
    private flag:boolean = false; // 구부렸을 때 true

    protected use = [
        Analysis.leftArm
    ]

    public inputValue = (joints: Map<string, number>) => {
        if(this.checkUndefined(joints)) return false
        if(Analysis.RadianToDegree(joints.get(Analysis.leftArm)!) < 100 &&
        !this.flag){
            this.flag = true
        } else if (this.flag && Analysis.RadianToDegree(joints.get(Analysis.leftArm)!) >= 120){
            this.flag = false
            return true
        }
        return false
    };
}