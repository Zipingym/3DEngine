import EventListener from "@class/event/EventListener";
import Hook from "@class/hook/Hook";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";


export default class TimeUIStartEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        target.setAttribute("start", true)
    }
}