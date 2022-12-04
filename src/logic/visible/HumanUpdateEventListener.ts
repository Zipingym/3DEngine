import EventListener from "@class/event/EventListener";
import Member from "@class/member/Member";
import EventInterface from "@interface/EventInterface";
import { Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Human, { ChangeWait } from "./Human";
import Visible from "./visible";

export default class HumanUpdateEventListener extends EventListener {
    public onEventOccur = (event: EventInterface<number>, target: Member) => {
        target.executeWithAttribute(Visible.ASSET, (asset:GLTF) => {
            // console.log(event.value)
            target.executeWithAttribute(Human.POS_WAIT_QUEUE, (arr: Array<ChangeWait<Vector3>>) => {
                const final = new Vector3()
                arr.forEach((e: ChangeWait<Vector3>) => {
                    const {x,y,z} = e.getAsTime(event.value)
                    final.x += x
                    final.y += y
                    final.z += z
                })
                target.executeWithAttribute(Human.ADD_POSITION, (adder) => {
                    adder(final)
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
                target.executeWithAttribute(Human.ADD_ROTATION, (adder) => {
                    adder(final)
                })
            })
        })
    }
}