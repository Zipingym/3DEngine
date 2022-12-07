import EventListener from "@class/event/EventListener";
import Hook from "@class/hook/Hook";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";


export default class TimeUIUpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        if(target.getAttribute("start")) {
            const timeHook: Hook<number> = target.getAttribute("time")
            timeHook.set(timeHook.get() + event.value)

        }
    }
}