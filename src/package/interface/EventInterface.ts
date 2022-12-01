import MemberClass from "@class/member/Member"

interface EventInterface<T> {
    eventTarget: MemberClass,
    value: T
    eventCode: number
    occur: () => void
}
export default EventInterface