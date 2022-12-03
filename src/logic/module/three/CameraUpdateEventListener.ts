import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import CameraMember from "./CameraMember";
import ThreeMember from "./ThreeMember";

export default class CameraUpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<any>, target: Member) => {
        const parent: Member = target.findParent()!
        parent.executeWithAttribute(ThreeMember.RENDERER, (renderer) => {
            parent.executeWithAttribute(ThreeMember.SCENE, (scene) => {
                target.executeWithAttribute(CameraMember.CAMERA, (camera) => {
                    renderer.render(
                        scene,
                        camera
                    )
                })
            })
        })
    }
}