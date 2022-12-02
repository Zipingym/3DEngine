import TraversalAbleImpl from "./TraversalAbleImpl";
import HaveAttributeAble from "@interface/HaveAttributeAble";
import EventListenAble from "@interface/EventListenAble";
import EventInterface from "@interface/EventInterface";
abstract class Member extends TraversalAbleImpl<Member> implements HaveAttributeAble {
    public static DEFAULT_ID = -1
    constructor(
        id?: number
    ) {
        super()
        this.id = id ?? Member.DEFAULT_ID
    }
    public id: number;
    public class: string = "";
    private attribute: Map<string, any> = new Map()
    private eventListeners: Array<EventListenAble> = new Array()

    public getAttribute(name: string) {
        return this.attribute.get(name)
    }
    public setAttribute (name: string, obj: any) {
        this.attribute.set(name, obj)
    }
    public executeWithAttribute (name: string, lambda: (value: any) => void) {
        const get = this.getAttribute(name)
        if(get != undefined) {
            lambda(get)
            return true
        }
        else return false
    }
    public appendChild(member: Member): void {
        this.children.push(member)
        member.setParent(this)
        member.onPatchTree()
    }
    public appendEventListener(eventListener: EventListenAble) {
        this.eventListeners.push(eventListener)
    }
    public occur (event: EventInterface<any>) {
        this.eventListeners.forEach((eventListener: EventListenAble) => {
            if (eventListener.isEqualCode(event.eventCode)) eventListener.onEventOccur(event, this)
        })
        this.findAllChildren().forEach((child) => {
            child.occur(event)
        })
    }

    protected abstract onPatchTree: () => void
}
export default Member