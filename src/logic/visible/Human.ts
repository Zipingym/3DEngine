import LoadAbleAsset from "@class/asset/LoadableAsset";
import Event from "@class/event/Event";
import { Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import HumanUpdateEventListener from "./HumanUpdateEventListener";
import Visible from "./visible";

export default class Human extends Visible {
    public static POSITION = "position"
    public static ROTATION = "rotation"

    public static SET_POSITION = "setPosition"
    public static ADD_POSITION = "addPosition"
    public static GET_POSITION = "getPosition"

    public static SET_ROTATION = "setRotation"
    public static ADD_ROTATION = "addRotation"
    public static GET_ROTATION = "getRotation"
    constructor (
        asset: LoadAbleAsset<GLTF>,
        className?: string
    ) {
        super(asset)
        this.class = className ?? ""
        this.setAttribute(Human.SET_POSITION, this.setPosition.bind(this))
        this.setAttribute(Human.ADD_POSITION, this.addPosition.bind(this))
        this.setAttribute(Human.GET_POSITION, this.getPosition.bind(this))
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

    public setPosition(position: Vector3, time: number = 0) {
        this.executeWithAttribute(Visible.ASSET, (asset: GLTF) => {
            if(time === 0) {
                asset.scene.position.set(position.x, position.y, position.z)
            }
        })
    }
    public addPosition(position: Vector3, time: number = 0) {
        this.executeWithAttribute(Visible.ASSET, (asset: GLTF) => {
            const bef = this.getPosition()
            if(time === 0) {
                asset.scene.position.set(bef.x + position.x, bef.y + position.y, bef.z + position.z)
            }
        })
    }
    public getPosition() {
        return this.getAttribute(Visible.ASSET).scene.position
    }
}