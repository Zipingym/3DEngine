import Member from "@class/member/Member"
import EventInterface from "./EventInterface"

interface EventListenAble {
    isEqualCode: (eventCode: number) => boolean
    onEventOccur: (event: EventInterface<any>, target: Member) => void
}
export default EventListenAble