import Loader from "../loader";
import Animator from "./animator";
import { Scene } from "../../three";
import { UpdateAble } from "../../interface";
import { Vector2, Vector3 } from "three";
import eventListener from "../../global/eventlistener";

export default class Human extends Loader implements UpdateAble{
    public animator?: Animator
    private scene: Scene
    private isMe: boolean
    public position: Vector3 = new Vector3(0, 0, 0)
    public rotation: number = 0.5
    public movement: Map<string, {func: (ms: number) => void, time: number}> = new Map()
    constructor(
        fileName: string,
        scene: Scene,
        isMe?: boolean
    ) {
        super(fileName)
        this.scene = scene
        this.isMe = isMe != undefined ? isMe : false
        this.load()
    }
    protected onLoad = (gltf: any) => {
        this.model = gltf.scene
        this.render(this.scene)
        this.animator = new Animator(gltf)

        this.animator.animate("walk")
        if(this.isMe) {
            eventListener.add('input-walk', (time: number) => {
                this.push("walk", this.walk.bind(this), time)
            })
        }
        // this.movement.push({ func: this.walk.bind(this), time: 20000})
    };
    protected onProgress = (xhr: any) => {
        // console.log(xhr)
    };
    protected onError = (error: any) => {
        console.log(error)
    };
    public update: (interval: number) => void = (interval: number) => {
        if(this.animator != undefined) {
            this.movement.forEach((e) => {
                e.time -= interval
                e.func(interval)
            })
            this.movement.forEach((ele, key) => {
                if(ele.time <= 0) {
                    this.movement.delete(key)
                }
            })
            this.model.position.set(this.position.x, this.position.y, this.position.z)
            this.model.rotation.set(0, this.rotation, 0)
            this.animator.update(interval)
        }
    }
    private walkSpeed = 0.001
    public walk(ms: number):void {
        this.position.setX(this.position.x + (ms / (Math.cos(this.model.rotation.y) / this.walkSpeed)))
        const a = this.position.z + (ms / (Math.sin(this.model.rotation.y) / this.walkSpeed))
        if(a != Infinity) {
            this.position.setZ(this.position.z + (ms / (Math.sin(this.model.rotation.y) / this.walkSpeed)))
        }
        
    }
    public push(name: string, func: (ms: number) => void, time: number) {
        if(this.movement.has(name)) {
            if(this.movement.get(name)!.time > time) {
                console.log("SEX")
                return
            }
                
        }
        else {
            this.movement.set(name, {
                func, time
            })
        }
    }
}

interface animationInfo {
    name: string,
    movement: {
        pos: Vector3,
        rot: number
    }
}