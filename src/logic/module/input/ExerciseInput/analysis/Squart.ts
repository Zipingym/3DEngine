import ExerciseInputEventListener from "../ExerciseInputEventListener";
import ExerciseResult from "../ExerciseResult";
import PoseResult, { JoinAngle } from "../PoseResult";
import DumbbellCurlAnalysis from "./DumbleCurlCore";

export default class Squart extends ExerciseInputEventListener {
    public exerciseName: string = ExerciseResult.Squart
    private flag:boolean = false; // 구부렸을 때 true


    protected onPoseChange = (poseResult: PoseResult) => {
        const angle = poseResult.getJointAngle(PoseResult.RIGHT_LEG)
        if(angle.accuracy < 0.8)
            return 0
        const degree = angle.getAngle("degree")
        if(degree < 110 &&
        !this.flag){
            this.flag = true
        } else if (this.flag && degree >= 120){
            this.flag = false
            return 1
        }
        return 0
    }
}