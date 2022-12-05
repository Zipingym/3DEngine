import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Human, { ChangeWait } from "./Human";
import User from "./User";
import Visible from "./visible";

export default class UserUpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        target.executeWithAttribute(User.SET_CAMERA_POS, (setter) => {
            setter(target.getAttribute(Visible.ASSET).scene.position)
        })
    }
}