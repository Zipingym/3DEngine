import LoadAbleAsset from "@class/asset/LoadableAsset";
import Event from "@class/event/Event";
import { Euler, Ray, Raycaster, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import BeachWorld from "./BeachWorld";
import HumanAnimation from "./HumanAnimation";
import HumanUpdateEventListener from "./HumanUpdateEventListener";
import Visible from "./visible";
import World from "./World";

export default class Human extends Visible {
    public static POSITION = "position"
    public static ROTATION = "rotation"

    public static SET_POSITION = "setPosition"
    public static ADD_POSITION = "addPosition"
    public static GET_POSITION = "getPosition"

    public static SET_ROTATION = "setRotation"
    public static ADD_ROTATION = "addRotation"
    public static GET_ROTATION = "getRotation"

    public static DIR_CALCULATOR = "dirCalculator"

    public static POS_WAIT_QUEUE = "positionWaitQueue"
    public static ROT_WAIT_QUEUE = "rotationWaitQueue"

    public static ANIMATION = "animation"
    public static RAYCASTER = "raycaster"

    private positionWaitQueue:Array<ChangeWait<Vector3>> = new Array()
    private rotationWaitQueue:Array<ChangeWait<Euler>> = new Array()
    protected raycaster: Raycaster
    constructor (
        asset: LoadAbleAsset<GLTF>,
        className?: string
    ) {
        super(asset)
        this.class = className ?? ""
        this.raycaster = new Raycaster()

        this.setAttribute(Human.RAYCASTER, this.raycaster)

        this.setAttribute(Human.SET_POSITION, this.setPosition.bind(this))
        this.setAttribute(Human.ADD_POSITION, this.addPosition.bind(this))
        this.setAttribute(Human.GET_POSITION, this.getPosition.bind(this))

        this.setAttribute(Human.SET_ROTATION, this.setRotation.bind(this))
        this.setAttribute(Human.ADD_ROTATION, this.addRotation.bind(this))
        this.setAttribute(Human.GET_ROTATION, this.getRotation.bind(this))

        this.setAttribute(Human.DIR_CALCULATOR, this.dirCalculator.bind(this))

        this.setAttribute(Human.POS_WAIT_QUEUE, this.positionWaitQueue)
        this.setAttribute(Human.ROT_WAIT_QUEUE, this.rotationWaitQueue)

        this.appendEventListener(new HumanUpdateEventListener(Event.UPDATE))
    }
    protected dirCalculator(move: number): Vector3 {
        const asset = this.getAttribute(Visible.ASSET)
        if(asset != undefined) {
            const rotation:number = asset.scene.rotation.y
            let x = (Math.sin(rotation) * move)
            let z = (Math.cos(rotation) * move)
            if(x == Infinity || isNaN(x)) x = 0
            if(z == Infinity || isNaN(z)) z = 0
            return new Vector3(x, 0, z)
        }
        else {
            return new Vector3(0, 0, 0)
        }
    }
    protected afterRender(gltf: GLTF): void {
        this.setAttribute(Human.ANIMATION, new HumanAnimation(gltf.animations, gltf.scene))
    }
    public setPosition(position: Vector3) {
        this.executeWithAttribute(Visible.ASSET, (asset: GLTF) => {
            const world = this.findRoot().findOneDescendente((e) => e.class === BeachWorld.CLASS_NAME)
            this.raycaster.ray = new Ray(position, new Vector3(0, -1, 0))
            if(this.raycaster.intersectObject(world?.getAttribute(BeachWorld.ROAD)).length > 0)
                asset.scene.position.set(position.x, position.y, position.z)
        })
    }
    public addPosition(position: Vector3, time: number = 0) {
        const bef = this.getPosition()
        if(time === 0) this.setPosition(new Vector3(bef.x + position.x, bef.y + position.y, bef.z + position.z))
        else this.positionWaitQueue.push(new ChangeWait(position, time))
    }
    public getPosition() {
        return this.getAttribute(Visible.ASSET).scene.position
    }

    public setRotation(rotation: Euler) {
        this.executeWithAttribute(Visible.ASSET, (asset: GLTF) => {
            asset.scene.rotation.set(rotation.x, rotation.y, rotation.z)
        })
    }
    public addRotation(rotation: Euler, time: number = 0) {
        const bef = this.getRotation()
        if(time === 0) this.setRotation(new Euler(bef.x + rotation.x, bef.y + rotation.y, bef.z + rotation.z))
        else this.rotationWaitQueue.push(new ChangeWait(rotation, time))
    }
    public getRotation() {
        return this.getAttribute(Visible.ASSET).scene.rotation
    }
}

export class ChangeWait<T extends {x: number, y: number, z: number}> {
    private target: {x: number, y: number, z: number}
    private time: number
    constructor (
        target: T,
        time: number
    ) {
        this.target = {
            x: target.x / time, 
            y: target.y / time, 
            z: target.z / time
        }
        this.time = time
    }
    public getAsTime(time: number) {
        this.time -= time
        if(this.time < 0) {
            time += this.time
        }
        if(time <= 0) {
            return {
                x: 0,
                y: 0,
                z: 0
            }
        }
        else {
            return {
                x: this.target.x * time,
                y: this.target.y * time,
                z: this.target.z * time
            }
        }
    }
}