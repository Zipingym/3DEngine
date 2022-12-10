import Analysis from "./analysis";

export default class sideLateralRaiseAnalysis extends Analysis {
    private flag:boolean = false; // 구부렸을 때 true

    protected use = [
        Analysis.leftShoulderY,
        Analysis.rightShoulderY
    ]

    public inputValue = (joints: Map<string, number>) => {
        if(this.checkUndefined(joints)) return false

        if (!this.flag && Analysis.RadianToDegree(joints.get(Analysis.leftShoulderY)!) > 60 
            &&
            Analysis.RadianToDegree(joints.get(Analysis.rightShoulderY)!) > 60
        ){
            this.flag = true
        } else if (
            this.flag && 
            (Analysis.RadianToDegree(joints.get(Analysis.leftShoulderY)!) <= 60 && Analysis.RadianToDegree(joints.get(Analysis.rightShoulderY)!) <= 60)
            )
        {
            this.flag = false;
            return true
        }


        return false
    };

    
}