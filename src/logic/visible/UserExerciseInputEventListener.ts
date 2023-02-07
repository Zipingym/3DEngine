import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Euler, Vector3 } from "three";
import ExerciseResult from "../module/input/ExerciseInput/ExerciseResult";
import Human from "./Human";

export default class UserExerciseInputEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<ExerciseResult>, target: Member) => {
        target.executeWithAttribute(Human.ADD_POSITION, (posAdder: (pos: Vector3, time?: number) => void) => {
            target.executeWithAttribute(Human.ADD_ROTATION, (rotAdder: (rot: Euler, time?: number) => void) => {
                const dirCalculator = target.getAttribute(Human.DIR_CALCULATOR)
                const exerciseName = event.value.name
                if(exerciseName === ExerciseResult.DumbleCurl) posAdder(dirCalculator(5), 500)
                else if(exerciseName === ExerciseResult.LeftDumbleCurl) rotAdder(new Euler(0, 0.3, 0), 300)
                else if(exerciseName === ExerciseResult.RightDumbleCurl) rotAdder(new Euler(0, -0.3, 0), 300)
                else if(exerciseName === ExerciseResult.Squart) posAdder(new Vector3(0, 0.01, 0), 1500)
            })
        })
    }
}