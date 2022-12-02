import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import CameraMember from "./CameraMember";
import ThreeMember from "./ThreeMember";

export default class UpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<any>, target: Member) => {
        target.executeWithAttribute(ThreeMember.RENDERER, (renderer) => {
            renderer.render(
                target.getAttribute(ThreeMember.SCENE), 
                target.findOneChildren((arg) => arg.id === CameraMember.ID)!.getAttribute(CameraMember.CAMERA)
            )
        })
    }
}