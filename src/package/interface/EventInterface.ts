import Member from "@class/member/Member"

interface EventInterface<T> {
    eventTarget: Member,
    value: T
    eventCode: number
    occur: () => void
}
export default EventInterface