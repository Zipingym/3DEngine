import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Euler, Vector3 } from "three";
import Human from "./Human";

export default class UserKeyboardInputEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<KeyboardEvent>, target: Member) => {
        target.executeWithAttribute(Human.ADD_POSITION, (posAdder: (pos: Vector3, time?: number) => void) => {
            target.executeWithAttribute(Human.ADD_ROTATION, (rotAdder: (rot: Euler, time?: number) => void) => {
                const dirCalculator = target.getAttribute(Human.DIR_CALCULATOR)
                const { key } = event.value
                if(key === "w") posAdder(dirCalculator(3), 300)
                else if(key === "a") rotAdder(new Euler(0, 0.5, 0), 100)
                else if(key === "d") rotAdder(new Euler(0, -0.5, 0), 100)
            })
        })
    }
}