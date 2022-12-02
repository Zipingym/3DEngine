import Member from "@class/member/Member";
import Performance from "@/util/performance";
import Event from "@class/event/Event";
export default class UpdateMember extends Member {
    private static ID = 1
    private performance: Performance
    private updateEvent: Event<number>
    constructor (

    ) {
        super(UpdateMember.ID)
        this.performance = new Performance()
        this.updateEvent = new Event(this.findRoot(), Event.UPDATE, 0);
        
    }
    protected onPatchTree = () => {
        this.updateEvent.eventCaller = this.findRoot()
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.performance.start()
        this.updateEvent.value = this.performance.getInterval()
        this.updateEvent.occur()
        this.performance.end()
    }
}