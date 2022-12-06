import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import PoseResult from "./PoseResult";
import Event from "@class/event/Event";
import ExerciseResult from "./ExerciseResult";
import ExerciseInput from "./ExerciseInput";

export default abstract class ExerciseInputEventListener extends EventListener {
    public abstract exerciseName: string
    constructor (

    ) {
        super(ExerciseInput.PoseResultEventCode)
    }
    public onEventOccur = (event: EventInterface<PoseResult>, target: Member) => {
        const result = this.onPoseChange(event.value)
        if(result != 0) {
            const event = new Event(
                target.findRoot(),
                Event.EXERCISE,
                new ExerciseResult(this.exerciseName, result)
            )
            event.occur()
        }
    }
    protected abstract onPoseChange: (poseResult: PoseResult) => number
}