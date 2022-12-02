import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import EventListenAble from "@interface/EventListenAble";

export default abstract class EventListener implements EventListenAble {
    private static isEqualCode (listenerCode: number, eventCode: number)  {
        return listenerCode === eventCode
    }
    private eventCode: number;
    constructor (
        code: number
    ) {
        this.eventCode = code
    }
    public isEqualCode (eventCode: number) {
        return EventListener.isEqualCode(this.eventCode, eventCode)
    }
    public abstract onEventOccur: (event: EventInterface<any>, target: Member) => void;
}