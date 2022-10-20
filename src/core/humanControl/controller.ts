import { Euler, Vector3 } from "three";
import Human from "../../engine/human/human";

export default abstract class Controller {
    public static UpdatePositionCode: number = 0
    public static UpdateRotationCode: number = 1
    public static UpdateScaleCode: number = 2
    protected human: Human
    constructor (
        human: Human
    ) {
        this.human = human
    }
    public abstract control: (code: number, any: any) => ControlInfo | undefined

    protected dirCalculator(move: number): Vector3 {
        if(this.human.getIsLoading()) {
            const rotation:number = this.human.getRotation()!.y
            let x = -(Math.sin(rotation) * move)
            let z = (Math.cos(rotation) * move)
            if(x == Infinity || isNaN(x)) x = 0
            if(z == Infinity || isNaN(z)) z = 0
            return new Vector3(x, 0, z)
        }
        return new Vector3(0, 0, 0)
    }
    protected humanUpdatePosition(value: Vector3, duration?: number): ControlInfo {
        this.human.updatePosition(value, duration)
        return {
            functionCode: Controller.UpdatePositionCode,
            value: value,
            duration: duration ?? 0
        }
    }
    protected humanUpdateRotation(value: Euler, duration?: number) {
        this.human.updateRotation(value, duration)
        return {
            functionCode: Controller.UpdateRotationCode,
            value: value,
            duration: duration ?? 0
        }
    }
    protected humanUpdateScale(value: Vector3, duration?: number) {
        this.human.updateScale(value, duration)
        return {
            functionCode: Controller.UpdateScaleCode,
            value: value,
            duration: duration ?? 0
        }
    }
}

export interface ControlInfo {
    functionCode: number
    value: Euler | Vector3
    duration: number
}