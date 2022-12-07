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

        if(this.recentLeftArm < 300 && this.recentRightArm < 300) {
            this.exerciseName = ExerciseResult.DumbleCurl
            this.recentLeftArm = 1000
            this.recentRightArm = 1000
            return 1
        }
        else if(this.recentLeftArm >= 300 && this.recentLeftArm - poseResult.duration < 300) {
            this.exerciseName = ExerciseResult.LeftDumbleCurl
            return 1
        }
        else if(this.recentRightArm >= 300 && this.recentRightArm - poseResult.duration < 300) {
            this.exerciseName = ExerciseResult.rightDumbleCurl
            return 1
        }
        else return 0
        // const leftArm = this.foo(poseResult.getJointAngle(PoseResult.LEFT_ARM))
        // const rightArm = this.foo(poseResult.getJointAngle(PoseResult.RIGHT_ARM))

        // this.recentLeftArm += poseResult.duration
        // this.recentRightArm += poseResult.duration

        // if(leftArm && rightArm) {
        //     this.recentLeftArm = 0
        //     this.recentRightArm = 0
        //     this.exerciseName = ExerciseResult.DumbleCurl
        //     return 1
        // }
        // if(this.recentLeftArm <= 200) {
        //     if(rightArm) {
        //         this.recentLeftArm = 0
        //         this.recentRightArm = 0
        //         this.exerciseName = ExerciseResult.DumbleCurl
        //         return 1
        //     }
        // }
        // else if(this.recentLeftArm - poseResult.duration < 200) {
        //     this.exerciseName = ExerciseResult.LeftDumbleCurl
        //     return 1
        // }
        // else {
        //     if(leftArm) {
        //         this.recentLeftArm = 0
        //     }
        // }

        // if(this.recentRightArm <= 200) {
        //     if(leftArm) {
        //         this.recentLeftArm = 0
        //         this.recentRightArm = 0
        //         this.exerciseName = ExerciseResult.DumbleCurl
        //         return 1
        //     }
        // }
        // else if(this.recentRightArm - poseResult.duration < 200) {
        //     this.exerciseName = ExerciseResult.rightDumbleCurl
        //     return 1
        // }
        //  else {
        //     if(rightArm) {
        //         this.recentRightArm = 0
        //     }
        // }
        // return 0
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