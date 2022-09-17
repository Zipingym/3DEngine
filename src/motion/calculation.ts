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
        const yMinusStandard = standard.y - target.y
        const yMinusExtention = extention.y - target.y
        const xMinusStandard = standard.x - target.x
        const xMinusExtention = extention.x - target.x
        if(xMinusStandard == 0 || xMinusExtention == 0) {
            if(Calculation.isMiddle(target.x, standard.x, extention.x)) {
                return Math.PI / 2
            }
            else {
                return 0
            }
        }
        const result = Math.atan((yMinusStandard) / (xMinusStandard)) - Math.atan((yMinusExtention) / (xMinusExtention))
        return result
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