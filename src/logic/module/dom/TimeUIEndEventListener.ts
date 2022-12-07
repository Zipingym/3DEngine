import api from "@/util/axios";
import EventListener from "@class/event/EventListener";
import Hook from "@class/hook/Hook";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";


export default class TimeUIEndEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        const start = target.getAttribute("start")
        if(start) {
            target.setAttribute("start", false)
            api.post("rank/addrank", {
                name: "김건호",
                time: target.getAttribute("time").get(),
                map: "beach"
            })
        }
        
    }
}