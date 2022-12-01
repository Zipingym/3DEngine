import EventInterface from "./EventInterface"

interface EventListenAble {
    isEqualCode: (eventCode: number) => boolean
    onEventOccur: (event: EventInterface<any>) => void
}
export default EventListenAble