import moveAble from "../interface/moveAble";
import Model from "../model";
import {
    Vector3,
    Euler,
    Box3
} from 'three'
import { Scene } from "../three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Animation from "./animation";

export default class Human extends Model implements moveAble {
    private static PositionCode: number = 0
    private static RotationCode: number = 1
    private static ScaleCode: number = 2
    
    protected scene: Scene
    public box?: Box3
    protected animation?: Animation
    private updateQueue: Array<UpdateInfo> = new Array()
    constructor(
        fileName: string,
        scene:Scene
    ) {
        super(fileName)
        this.scene = scene
    }
    protected afterLoad(model: GLTF): void {
        this.scene.add(model.scene)
        this.animation = new Animation(model.animations, model.scene)
    }  
    getPosistion = () => this.loadedModel?.scene.position
    getRotation = () => this.loadedModel?.scene.rotation
    getScale = () => this.loadedModel?.scene.scale
    setPosition = (position: Vector3) => {
        if(this.loadedModel != undefined) this.loadedModel.scene.position.set(position.x, position.y, position.z)
    }
    setRotation = (rotation: Euler) => {
        if(this.loadedModel != undefined) this.loadedModel.scene.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order)
    }
    setScale = (scale: Vector3) => {
        if (this.loadedModel != undefined) this.loadedModel.scene.scale.set(scale.x, scale.y, scale.z)   
    }
    private _updatePosition (position:THREE.Vector3) {
        this.setPosition(new Vector3(
            this.loadedModel!.scene.position.x + position.x,
            this.loadedModel!.scene.position.y + position.y,
            this.loadedModel!.scene.position.z + position.z
        ))
    }
    private _updateRotation (rotation:THREE.Euler) {
        this.setRotation(new Euler(
            this.loadedModel!.scene.rotation.x + rotation.x,
            this.loadedModel!.scene.rotation.y + rotation.y,
            this.loadedModel!.scene.rotation.z + rotation.z
        ))
    }
    private _updateScale (scale:THREE.Vector3) {
        this.setScale(new Vector3(
            this.loadedModel!.scene.scale.x + scale.x,
            this.loadedModel!.scene.scale.y + scale.y,
            this.loadedModel!.scene.scale.z + scale.z
        ))
    }
    updatePosition (position:THREE.Vector3, duration?: number) {
        if(duration == undefined || duration == 0) {
            this.setPosition(position)
        }
        else {
            this.updateQueue.push({
                code: Human.PositionCode,
                current: 0,
                duration: duration,
                everyMillsecond: position
            })
        }
    }
    updateRotation (rotation:THREE.Euler, duration?: number) {
        if(duration == undefined || duration == 0) {
            this.setRotation(rotation)
        }
        else {
            this.updateQueue.push({
                code: Human.RotationCode,
                current: 0,
                duration: duration,
                everyMillsecond: rotation
            })
        }
    }
    updateScale (scale:THREE.Vector3, duration?: number) {
        if(duration == undefined || duration == 0) {
            this.setScale(scale)
        }
        else {
            this.updateQueue.push({
                code: Human.ScaleCode,
                current: 0,
                duration: duration,
                everyMillsecond: scale
            })
        }
    }
    update = (interval: number) => {
        const updatePosistion = new Vector3(0, 0, 0)
        const updateRotation = new Euler(0, 0, 0)
        const updateScale = new Vector3(0, 0, 0)
        this.updateQueue.forEach((updateInfo: UpdateInfo, idx: number) => {
            updateInfo.current += interval
            const delta = (updateInfo.current > updateInfo.duration ? interval - (updateInfo.current - updateInfo.duration) : interval) / updateInfo.duration
            const { x, y, z } = updateInfo.everyMillsecond
            if(updateInfo.code === Human.PositionCode) {
                updatePosistion.add(new Vector3(x * delta, y * delta, z * delta))
            }
            else if(updateInfo.code === Human.RotationCode) {
                updateRotation.set(updateRotation.x + x * delta, updateRotation.y + y * delta, updateRotation.z + z * delta)
            }
            else if(updateInfo.code === Human.ScaleCode) {
                updateScale.add(new Vector3(x * delta, y * delta, z * delta))
            }
            if(updateInfo.current > updateInfo.duration) {
                this.updateQueue.splice(idx, 1)
            }
        })
        const moveDelta = (Math.abs(updatePosistion.x) + Math.abs(updatePosistion.z)) / interval * 1000
        if(moveDelta == 0) {
            this.animation?.animate("Idle")
        }
        else if(moveDelta < 6) {
            this.animation?.animate("Walking")
        }
        else if(moveDelta >= 6) {
            this.animation?.animate("Running")
        }
        if(this.loadedModel != undefined) {
            this._updatePosition(updatePosistion)
            this._updateRotation(updateRotation)
            this._updateScale(updateScale)
        }
        if(this.animation != undefined) this.animation.update(interval)
    }
}

interface UpdateInfo {
    code: number
    everyMillsecond: THREE.Vector3 | THREE.Euler
    current: number
    duration: number
}