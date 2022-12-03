import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Human from "./Human";
import Visible from "./visible";

export default class HumanUpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        target.executeWithAttribute(Visible.ASSET, (asset:GLTF) => {
            target.executeWithAttribute(Human.POSITION, (position: Vector3) => {
                asset.scene.position.set(position.x, position.y, position.z)
            })
            target.executeWithAttribute(Human.ROTATION, (rotation: Euler) => {
                asset.scene.position.set(rotation.x, rotation.y, rotation.z)
            })
        })
    }
}