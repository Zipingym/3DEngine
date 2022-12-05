import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Human, { ChangeWait } from "./Human";
import HumanAnimation from "./HumanAnimation";
import Visible from "./visible";

export default class HumanUpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        target.executeWithAttribute(Visible.ASSET, (asset:GLTF) => {
            target.executeWithAttribute(Human.POS_WAIT_QUEUE, (arr: Array<ChangeWait<Vector3>>) => {
                const final = new Vector3()
                arr.forEach((e: ChangeWait<Vector3>) => {
                    const {x,y,z} = e.getAsTime(event.value)
                    final.x += x
                    final.y += y
                    final.z += z
                })
                target.getAttribute(Human.ADD_POSITION)(final)
                
                target.executeWithAttribute(Human.ANIMATION, (anime: HumanAnimation) => {
                    const dis = Math.abs(final.x) + Math.abs(final.y) + Math.abs(final.z)
                    if(dis === 0) {
                        target.getAttribute(Human.ANIMATION).animate("Idle")
                    }
                    else if(dis / event.value > 0.015) {
                        target.getAttribute(Human.ANIMATION).animate("Running")
                    }
                    else {
                        target.getAttribute(Human.ANIMATION).animate("Walking")
                    }
                    anime.update(event.value)
                })
            })
            target.executeWithAttribute(Human.ROT_WAIT_QUEUE, (arr: Array<ChangeWait<Euler>>) => {
                const final = new Euler()
                arr.forEach((e: ChangeWait<Euler>) => {
                    const {x,y,z} = e.getAsTime(event.value)
                    final.x += x
                    final.y += y
                    final.z += z
                })
                target.getAttribute(Human.ADD_ROTATION)(final)
            })
        })
    }
}