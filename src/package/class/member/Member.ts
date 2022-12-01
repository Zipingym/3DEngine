import TraversalAbleImpl from "./TraversalAbleImpl";
import HaveAttributeAble from "@interface/HaveAttributeAble";
import EventListenAble from "@interface/EventListenAble";
import EventInterface from "@interface/EventInterface";
abstract class MemberClass extends TraversalAbleImpl<MemberClass> implements HaveAttributeAble {
    constructor(

    ) {
        super()
    }
    private attribute: Map<string, object> = new Map()
    private eventListeners: Array<EventListenAble> = new Array()

    public getAttribute(name: string) {
        return this.attribute.get(name)
    }
    public setAttribute (name: string, obj: object) {
        this.attribute.set(name, obj)
    }
    public executeWithAttribute (name: string, lambda: (value: object) => void) {
        const get = this.getAttribute(name)
        if(get != undefined) {
            lambda(get)
            return true
        }
        else return false
    }

    public appendChild(member: MemberClass): void {
        this.children.push(member)
        member.setParent(this)
    }
    public appendEventListener(eventListener: EventListenAble) {
        this.eventListeners.push(eventListener)
    }
    public occur (event: EventInterface<any>) {
        this.eventListeners.forEach((eventListener: EventListenAble) => {
            if (eventListener.isEqualCode(event.eventCode)) eventListener.onEventOccur(event)
        })
        this.findAllChildren().forEach((child) => {
            child.occur(event)
        })
    }
}
export default MemberClass