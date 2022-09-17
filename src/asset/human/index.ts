import Loader from "../loader";
import Animator from "./animator";
import { Camera, Scene } from "../../three";
import { UpdateAble } from "../../interface";
import { Vector2, Vector3 } from "three";
import eventListener from "../../global/eventlistener";

export default class Human extends Loader implements UpdateAble{
    public animator?: Animator
    private scene: Scene
    private camera?: Camera
    private isMe: boolean
    public position: Vector3 = new Vector3(0, 0, 0)
    public rotation: number = 0
    public movement: Array<{delta: {pos: Vector3 | number, rot: number}, time: number,animateV:string}> = new Array()
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

        // this.animator.animate("walk")
        this.animator.animate("idle")
        if(this.isMe) {
            eventListener.add('input-walk', (time: number) => {
                this.movement.push({
                    delta: {
                        pos: 0.002,
                        rot: 0
                    },
                    time,
                    animateV:"walk"
                })
            })
            eventListener.add('input-rotate', (rot: number) => {
                this.movement.push({
                    delta: {
                        pos: 0,
                        rot: rot
                    },
                    time: 16,
                    animateV: "walk"
                })
            })

            // 가만히 있게 해야됨
            eventListener.add('stop',() => {
                this.movement.push({
                    delta:{
                        pos:0,
                        rot:0,
                    },
                    time:16,
                    animateV:"idle"
                })
            })
        }
    };
    protected onProgress = (xhr: any) => {
        // console.log(xhr)
    };
    protected onError = (error: any) => {
        console.log(error)
    };
    public update: (interval: number) => void = (interval: number) => {
        if(this.isMe) {
            this.camera!.position.set(this.position.x, this.position.y + 2, this.position.z)
            this.camera!.rotation.set(0, Math.PI - this.rotation, 0)
        }
        if(this.animator != undefined) {

            const buffer = new Vector3(0, 0, 0)
            this.movement.forEach((e) => {
                e.time -= interval
                if(typeof e.delta.pos == "number") {
                    const {
                        x, z
                    } = this.move(interval, e.delta.pos)
                    buffer.x += x
                    buffer.z += z
                }
                else {
                    const {
                        x, y, z
                    } = e.delta.pos
                    console.log("number아님",x)
                    buffer.x += x
                    buffer.y += y
                    buffer.z += z
                }
                this.rotation += e.delta.rot
                // ani = e.animateV
            })

            this.movement.forEach((ele, key) => {
                for(let i = 0; i < this.movement.length; i++){ 
                    if (this.movement[i].time <= 0) { 
                        this.movement.splice(i, 1); 
                        i--; 
                    }
                }
            })

            

            const dis = buffer.x + buffer.y + buffer.z
            let ani
            if(dis == 0) {
                ani = "idle"
            }
            else {
                ani = "walk"
            }
            this.animator.animate(ani);

            this.position.x += buffer.x
            this.position.y += buffer.y
            this.position.z += buffer.z

            this.model.position.set(this.position.x, this.position.y, this.position.z)

            this.model.rotation.set(0, this.rotation, 0)
            this.animator.update(interval)
        }
    }
    public move(ms: number, move: number) {
        let x = ms / (Math.sin(this.rotation) / move)
        let z = ms / (Math.cos(this.rotation) / move)
        if(x == Infinity || isNaN(x)) x = 0
        if(z == Infinity || isNaN(z)) z = 0
        if(this.rotation > Math.PI / 2) {
            return {
                x: x * -1,z: z * -1
            }
        }
        else {
            return {
                x, z
            }
        }

    }
    // public walk(ms: number):void {
    //     this.position.setX()
    //     const a = this.position.z + (ms / (Math.sin(this.model.rotation.y) / this.walkSpeed))
    //     if(a != Infinity) {
    //         this.position.setZ(this.position.z + (ms / (Math.sin(this.model.rotation.y) / this.walkSpeed)))
    //     }
        
    // }
}

interface animationInfo {
    name: string,
    movement: {
        pos: Vector3,
        rot: number
    }
}