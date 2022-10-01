import Loader from "../loader";
import Animator from "./animator";
import { Camera, Scene } from "../../three";
import { UpdateAble } from "../../interface";
import { Vector2, Vector3 } from "three";
import eventListener from "../../global/eventlistener";

export default class Human extends Loader implements UpdateAble {
    public static Me: Human
    public animator?: Animator
    private scene: Scene
    private camera?: Camera
    private isMe: boolean
    public position: Vector3 = new Vector3(10, 0, 40)
    public rotation: number = 0
    private movements: Array<animationInfo> = new Array()
    constructor(
        fileName: string,
        scene: Scene,
        isMe?: Camera
    ) {
        super(fileName)
        this.camera = isMe
        this.scene = scene
        this.isMe = (isMe != undefined)
        this.load()
    }
    protected onLoad = (gltf: any) => {
        this.model = gltf.scene
        this.render(this.scene)
        this.animator = new Animator(gltf)
        this.animator.animate("idle")
        if(this.isMe) {
            Human.Me = this
        }
    };
    protected onProgress = (xhr: any) => {
        // console.log(xhr)
    };
    protected onError = (error: any) => {
        console.log(error)
    };
    public update: (interval: number) => void = (interval: number) => {
        if(this.animator != undefined) {
            const { posistion, rotation } = this.calcMovement(interval)
            const dis = posistion.x + posistion.y + posistion.z
            let ani
            if(dis == 0) { ani = "idle" }
            else { ani = "walk" }
            this.animator.animate(ani);

            this.position.x += posistion.x
            this.position.y += posistion.y
            this.position.z += posistion.z
            this.rotation += rotation

            this.model.position.set(this.position.x, this.position.y, this.position.z)
            this.model.rotation.set(0, this.rotation, 0)
            if(this.isMe) {
                this.camera!.position.set(this.position.x, this.position.y + 2, this.position.z)
                this.camera!.rotation.set(0, this.rotation, 0)
            }
            this.animator.update(interval)
        }
    }
    private calcMovement(interval: number): {posistion: Vector3, rotation: number} {
        const posistion = new Vector3(0, 0, 0)
        const rotation = 0
        this.movements.forEach((movement: animationInfo, idx) => {
            this.position.x += movement.movement.pos.x * interval
            this.position.y += movement.movement.pos.y * interval
            this.position.z += movement.movement.pos.z * interval
            this.rotation += movement.movement.rot * interval
            movement.time -= interval
            if(movement.time <= 0) {
                this.movements.splice(idx)
            }
        })
        return {
            posistion,
            rotation
        }
    }
    public dirCalculator(move: number): Vector3 {
        let x = -(Math.sin(this.rotation) * move)
        let z = -(Math.cos(this.rotation) * move)
        if(x == Infinity || isNaN(x)) x = 0
        if(z == Infinity || isNaN(z)) z = 0
        return new Vector3(x, 0, z)
    }
    public controll(animation: animationInfo) {
        this.movements.push(animation)
    }
}

interface animationInfo {
    movement: {
        pos: Vector3,
        rot: number
    }
    time: number
}