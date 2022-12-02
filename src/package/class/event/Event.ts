import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";

export default class Event<T> implements EventInterface<T> {
    public static UPDATE = 0

    public eventCaller: Member;
    public value: T;
    public eventCode: number;
    constructor (
        target: Member,
        code: number,
        value: T,
    ) {
        this.eventCaller = target
        this.eventCode = code
        this.value = value
    }
    occur () {
        this.eventCaller.occur(this)
    }
}