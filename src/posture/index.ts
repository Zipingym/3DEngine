import { LandmarkList } from "@mediapipe/pose";
import { Vector2, Vector3, PerspectiveCamera, Euler } from "three";
import Motion from "../motion";
import { Camera } from "../three";
import Calculation from "./calculation";

export default class Posture {
    private parent: HTMLElement
    private camera: THREE.Camera
    private motion: Motion
    constructor (
        camera: Camera,
        parent: HTMLElement,
        motion: Motion
    ) {
        this.camera = camera
        this.motion = motion
        this.parent = parent.getElementsByTagName('div')[0].getElementsByTagName('canvas')[0]
        this.camera = new PerspectiveCamera(75, this.parent.clientWidth / this.parent.clientHeight, 1, 100)
    }
    public check(pose: LandmarkList) {
        // const body = Posture.getBodyinfo(pose[12], pose[11], pose[24], pose[23])
        // console.log(body.x * (180 / Math.PI))
        // const test = Calculation.TwoDegree(
        //     new Vector2(pose[12].y, pose[12].z),
        //     new Vector2(pose[14].y, pose[14].z),
        //     new Vector2(pose[16].y, pose[16].z)
        // )
        // this.createVector(pose[12].x, pose[12].y, pose[12].z)
        // console.log(test * 180 / Math.PI)
    }

    private createVector(x: number, y: number, z: number) {
        const p = new Vector3(x, y, z);
        const vector = p.project(this.camera);
        // console.log(vector)
        return vector
    }

    public static getBodyinfo(
        top1, 
        top2,
        bottom1, 
        bottom2
    ) {
        const a = Calculation.TwoDegree(
            new Vector2(top1.x, top1.z),
            new Vector2(top2.x, top2.z),
            new Vector2(top1.x + 1, top1.z),
        )
        const b = Calculation.TwoDegree(
            new Vector2(bottom1.x, bottom1.z),
            new Vector2(bottom2.x, bottom2.z),
            new Vector2(bottom1.x + 1, bottom1.z),
        )

        const c = Calculation.TwoDegree(
            new Vector2(bottom1.y, bottom1.z),
            new Vector2(top1.y, top1.z),
            new Vector2(bottom1.y + 1, bottom1.z),
        )
        const d = Calculation.TwoDegree(
            new Vector2(bottom2.y, bottom2.z),
            new Vector2(top2.y, top2.z),
            new Vector2(bottom2.y + 1, bottom2.z),
        )
        return  {
            x: ((Math.PI - a - b) / 2),
            y: ((c + d) / 2),
        }
    }

}
interface Pose {
    bodyRotationX: number
    bodyRotationY: number
}

function findOffset(element: any) {
    throw new Error("Function not implemented.");
}
