import Loader from "../loader";
import Animator from "./animator";
import { Scene } from "../../three";
import { UpdateAble } from "../../interface";
import { Vector2, Vector3 } from "three";
import eventListener from "../../global/eventlistener";

export default class Human extends Loader implements UpdateAble{
    public animator?: Animator
    private scene: Scene

    public position: Vector3 = new Vector3(0, 0, 0)
    public rotation: number = 0.5
    public movement: Array<{func: (ms: number) => void, time: number}> = new Array()
    constructor(
        fileName: string,
        scene: Scene
    ) {
        super(fileName)
        this.scene = scene
        this.load()
    }
    protected onLoad = (gltf: any) => {
        this.model = gltf.scene
        this.render(this.scene)
        this.animator = new Animator(gltf)
        this.animator.animate("Armature|mixamo.com|Layer0")
        eventListener.add('input-walk', this.walk.bind(this))
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
            for(let i = 0; i < this.movement.length; i++){ 
                if (this.movement[i].time <= 0) { 
                    this.movement.splice(i, 1); 
                    i--; 
                }
            }
            this.model.position.set(this.position.x, this.position.y, this.position.z)
            this.model.rotation.set(0, this.rotation, 0)
            this.animator.update(interval)
        }
    }
    private walkSpeed = 0.0002
    public walk(ms: number) {
        this.position.setX(this.position.x + (ms / (Math.cos(this.model.rotation.y) / this.walkSpeed)))
        const a = this.position.z + (ms / (Math.sin(this.model.rotation.y) / this.walkSpeed))
        if(a != Infinity) {
            this.position.setZ(this.position.z + (ms / (Math.sin(this.model.rotation.y) / this.walkSpeed)))
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