import { Euler, Vector2, Vector3 } from "three";
import { Camera } from "../three";

export default class Calculation {
    constructor (
        
    ) {

    }
    public static getBodyinfo(
        top1: any,
        top2: any,
        bottom1: any,
        bottom2: any
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
    public static createVector(x: number, y: number, z: number, camera: Camera) {
        const p = new Vector3(x, y, z);
        const vector = p.project(camera);
        return vector
    }
    public static TwoDegree(target: Vector2, standard: Vector2, extention: Vector2): number {
        const result = (Math.atan2(
            standard.y - target.y, 
            standard.x - target.x
        ) - 
        Math.atan2(
            extention.y - target.y, 
            extention.x - target.x
        ))
        return result >= 0 ? result : Math.PI / 2 - result
    }
    public static ThreeDegree(a: Vector3, b: Vector3, c: Vector3) {
        const ab = [b.x - a.x, b.y - a.y, b.z - a.z]
        const bc = [c.x - b.x, c.y - b.y, c.z - b.z]
        const abVec = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
        const bcVec = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1] + bc[2] * bc[2]);
        const abNorm = [ab[0] / abVec, ab[1] / abVec, ab[2] / abVec]
        const bcNorm = [bc[0] / bcVec, bc[1] / bcVec, bc[2] / bcVec]
        const res = abNorm[0] * bcNorm[0] + abNorm[1] * bcNorm[1] + abNorm[2] * bcNorm[2];
        return Math.PI - Math.acos(res)
    }
    public static isMiddle(target: number, other1: number, other2: number): boolean {
        return (target > other1 && target < other2) || (target > other2 && target < other1)
    }

    public static cha(a: number, b: number) {
        if(a > b) {
            return a - b
        }
        else {
            return b - a
        }
    }
}