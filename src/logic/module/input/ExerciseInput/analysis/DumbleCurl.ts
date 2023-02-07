import ExerciseInputEventListener from "../ExerciseInputEventListener";
import ExerciseResult from "../ExerciseResult";
import PoseResult, { JoinAngle } from "../PoseResult";
import DumbbellCurlAnalysis from "./DumbleCurlCore";

export default class DumbleCurl extends ExerciseInputEventListener {
    public exerciseName: string = "dumbleCurl";

    private leftArmFlag: boolean = false
    private rightArmFlag: boolean = false

    private recentLeftArm: number = 1000
    private recentRightArm: number = 1000

    private leftDumbleCurlCore: DumbbellCurlAnalysis = new DumbbellCurlAnalysis()
    private rightDumbleCurlCore: DumbbellCurlAnalysis = new DumbbellCurlAnalysis()
    protected onPoseChange = (poseResult: PoseResult) => {
        // const leftJoint = poseResult.getJointAngle(PoseResult.LEFT_ARM)
        // const rightJoint = poseResult.getJointAngle(PoseResult.RIGHT_ARM)
        const isLeft =  this.leftDumbleCurlCore.inputValue(poseResult.getJointAngle(PoseResult.LEFT_ARM))
        const isRight = this.rightDumbleCurlCore.inputValue(poseResult.getJointAngle(PoseResult.RIGHT_ARM))
        if(isLeft) this.recentLeftArm = 0
        if(isRight) this.recentRightArm = 0

        this.recentLeftArm += poseResult.duration
        this.recentRightArm += poseResult.duration
        const wait = 200;
        if(this.recentLeftArm < wait && this.recentRightArm < wait) {
            this.exerciseName = ExerciseResult.DumbleCurl
            this.recentLeftArm = 1000
            this.recentRightArm = 1000
            return 1
        }
        else if(this.recentLeftArm >= wait && this.recentLeftArm - poseResult.duration < wait) {
            this.exerciseName = ExerciseResult.LeftDumbleCurl
            return 1
        }
        else if(this.recentRightArm >= wait && this.recentRightArm - poseResult.duration < wait) {
            this.exerciseName = ExerciseResult.RightDumbleCurl
            return 1
        }
        else return 0
    }
}