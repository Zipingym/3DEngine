import MemberClass from "@class/member/Member";
import EventInterface from "@interface/EventInterface";

export default class Event<T> implements EventInterface<T> {
    public eventTarget: MemberClass;
    public value: T;
    public eventCode: number;
    constructor (
        target: MemberClass,
        code: number,
        value: T,
    ) {
        this.eventTarget = target
        this.eventCode = code
        this.value = value
    }
    occur () {
        this.eventTarget.occur(this)
    }
}