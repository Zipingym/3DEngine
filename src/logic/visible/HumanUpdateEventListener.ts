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
            let moveFinal: Vector3
            let rotationFinal: Euler
            target.executeWithAttribute(Human.POS_WAIT_QUEUE, (arr: Array<ChangeWait<Vector3>>) => {
                moveFinal = this.positionUpdate(arr, event.value)
                target.getAttribute(Human.ADD_POSITION)(moveFinal)
            target.executeWithAttribute(Human.ROT_WAIT_QUEUE, (arr: Array<ChangeWait<Euler>>) => {
                rotationFinal = this.rotationUpdate(arr, event.value)
                target.getAttribute(Human.ADD_ROTATION)(rotationFinal)
            })
            target.executeWithAttribute(Human.ANIMATION, (anime: HumanAnimation) => {
                    const animationName = this.animationUpdate(moveFinal, rotationFinal)
                    target.getAttribute(Human.ANIMATION).animate(animationName)
                    anime.update(event.value)
                })
            })
        })
    }

    private positionUpdate(
        queue: Array<ChangeWait<Vector3>>,
        time: number
    ): Vector3 {
        const final = new Vector3()
        queue.forEach((e: ChangeWait<Vector3>) => {
            const {x,y,z} = e.getAsTime(time)
            final.x += x
            final.y += y
            final.z += z
        })
        return final
    }

    private rotationUpdate (
        queue: Array<ChangeWait<Euler>>,
        time: number
    ): Euler {
        const final = new Euler()
        queue.forEach((e: ChangeWait<Euler>) => {
            const {x,y,z} = e.getAsTime(time)
            final.x += x
            final.y += y
            final.z += z
        })
        return final
    }

    private animationUpdate(
        movePos: Vector3,
        moveRot: Euler
    ): string {
        if(movePos.y > 0) {
            return "Jumping"
        }
        if(movePos.y < 0) {
            return "Sliding"
        }
        else if(Math.abs(movePos.x) + Math.abs(movePos.z) > 0) {
            return "Running"
        }
        else { return "Idle"}
    }
}