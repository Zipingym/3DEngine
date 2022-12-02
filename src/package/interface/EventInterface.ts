import Member from "@class/member/Member"

interface EventInterface<T> {
    eventCaller: Member,
    value: T
    eventCode: number
    occur: () => void
}
export default EventInterface