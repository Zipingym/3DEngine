import Member from "@class/member/Member";
import ExerciseInputEventListener from "./ExerciseInputEventListener";

export class ExerciseInputChild extends Member {
    constructor (
        eventListener: ExerciseInputEventListener
    ) {
        super()
        this.appendEventListener(eventListener)
    }
    protected onPatchTree = () => {
        
    }
}
