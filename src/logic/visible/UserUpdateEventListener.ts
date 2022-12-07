import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Euler, Ray, Raycaster, Vector3 } from "three";
import BeachWorld from "./BeachWorld";
import Human, { ChangeWait } from "./Human";
import User from "./User";
import Visible from "./visible";
import Event from "@class/event/Event";
export default class UserUpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        target.executeWithAttribute(User.SET_CAMERA_POS, (setter) => {
            setter(target.getAttribute(Visible.ASSET).scene.position)
        })
        target.executeWithAttribute(Human.RAYCASTER, (raycaster: Raycaster) => {
            const world = target.findRoot().findOneDescendente((e) => e.class === BeachWorld.CLASS_NAME)
            raycaster.ray = new Ray(target.getAttribute(Human.GET_POSITION)(), new Vector3(0, -1, 0))
            if(raycaster.intersectObject(world?.getAttribute(BeachWorld.START_LINE)).length > 0) {
                const event = new Event(target.findRoot(), Event.START, true)
                event.occur()
            }
            else if(raycaster.intersectObject(world?.getAttribute(BeachWorld.END_LINE)).length > 0) {
                const event = new Event(target.findRoot(), Event.END, true)
                event.occur()
            }
        })
    }
}