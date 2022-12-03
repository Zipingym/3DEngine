import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Vector3 } from "three";
import Human from "./Human";

export default class UserKeyboardInputEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<KeyboardEvent>, target: Member) => {
        target.executeWithAttribute(Human.ADD_POSITION, (adder: (pos: Vector3, time?: number) => void) => {
            adder(new Vector3(1, 1, 1))
        })
    }
}