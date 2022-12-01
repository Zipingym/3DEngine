import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";

export default class Event<T> implements EventInterface<T> {
    public static UPDATE = 0

    public eventTarget: Member;
    public value: T;
    public eventCode: number;
    constructor (
        target: Member,
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