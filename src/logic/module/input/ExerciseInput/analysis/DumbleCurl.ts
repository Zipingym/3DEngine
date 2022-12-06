import ExerciseInputEventListener from "../ExerciseInputEventListener";
import ExerciseResult from "../ExerciseResult";
import PoseResult, { JoinAngle } from "../PoseResult";

export default class DumbleCurl extends ExerciseInputEventListener {
    public exerciseName: string = "dumbleCurl";

    private leftArmFlag: boolean = false
    private rightArmFlag: boolean = false

    private recentLeftArm: number = 0
    private recentRightArm: number = 0

    protected onPoseChange = (poseResult: PoseResult) => {
        const leftArm = this.foo(poseResult.getJointAngle(PoseResult.LEFT_ARM))
        const rightArm = this.foo(poseResult.getJointAngle(PoseResult.RIGHT_ARM))

        this.recentLeftArm += poseResult.duration
        this.recentRightArm += poseResult.duration

        // console.log(this.recentLeftArm, this.recentRightArm)

        if(leftArm && rightArm) {
            this.recentLeftArm = 0
            this.recentRightArm = 0
            this.exerciseName = ExerciseResult.DumbleCurl
            return 1
        }
        if(this.recentLeftArm <= 200) {
            if(rightArm) {
                this.recentLeftArm = 0
                this.recentRightArm = 0
                this.exerciseName = ExerciseResult.DumbleCurl
                return 1
            }
        }
        else if(this.recentLeftArm - poseResult.duration < 200) {
            this.exerciseName = ExerciseResult.LeftDumbleCurl
            return 1
        }
        else {
            if(leftArm) {
                this.recentLeftArm = 0
            }
        }

        if(this.recentRightArm <= 200) {
            if(leftArm) {
                this.recentLeftArm = 0
                this.recentRightArm = 0
                this.exerciseName = ExerciseResult.DumbleCurl
                return 1
            }
        }
        else if(this.recentRightArm - poseResult.duration < 200) {
            this.exerciseName = ExerciseResult.rightDumbleCurl
            return 1
        }
         else {
            if(rightArm) {
                this.recentRightArm = 0
            }
        }
        return 0
    }
    private foo(angle: JoinAngle) {
        const degree = angle.getAngle("degree")
        if(angle.accuracy > 0.8) {
            if(degree < 100) {
                this.leftArmFlag = false
            }
            else if(degree > 120) {
                if(this.leftArmFlag === false) {
                    this.leftArmFlag = true
                    return true
                }
            }
        }
        return false
    }
}