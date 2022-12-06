import Event from "@class/event/Event";
import Member from "@class/member/Member";

export default class KeyboardInput extends Member {
    private keyboardEvent: Event<KeyboardEvent>
    constructor (

    ) {
        super();
        this.keyboardEvent = new Event(this.findRoot(), Event.KEYBOARD, new KeyboardEvent(""));
    }
    protected onPatchTree = () => {
        this.keyboardEvent.eventCaller = this.findRoot()
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keyboardEvent.value = event
            this.keyboardEvent.occur()
        })
    }
}