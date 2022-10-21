import Analysis from "./analysis";

export default class rightDumbbellCurlAnalysis extends Analysis {
    private flag:boolean = false; // 구부렸을 때 true

    protected use = [
        Analysis.rightArm
    ]

    public inputValue = (joints: Map<string, number>) => {
        if(this.checkUndefined(joints)) return false
        if(Analysis.RadianToDegree(joints.get(Analysis.rightArm)!) < 100 &&
        !this.flag){
            this.flag = true
        } else if (this.flag && Analysis.RadianToDegree(joints.get(Analysis.rightArm)!) >= 120){
            this.flag = false
            return true
        }
        return false
    };
}