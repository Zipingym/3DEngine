import moveAble from "../interface/moveAble";
import Model from "../model";
import {
    Vector3,
    Euler
} from 'three'
import { Scene } from "../three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export default class Human extends Model implements moveAble {
    private static PositionCode: number = 0
    private static RotationCode: number = 1
    private static ScaleCode: number = 2
    private updateQueue: Array<UpdateInfo> = new Array()
    constructor(
        fileName: string,
        scene:Scene,
    ) {
        super(fileName, (gltf: GLTF) => {
            scene.add(gltf.scene)
        })
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
        this.updateQueue.forEach((updateInfo: UpdateInfo, idx: number) => {
            updateInfo.current += interval
            const delta = (updateInfo.current > updateInfo.duration ? interval - (updateInfo.current - updateInfo.duration) : interval) / updateInfo.duration
            const { x, y, z } = updateInfo.everyMillsecond
            if(updateInfo.code === Human.PositionCode) {
                this._updatePosition(new Vector3(x * delta, y * delta, z * delta))
            }
            else if(updateInfo.code === Human.RotationCode) {
                this._updateRotation(new Euler(x * delta, y * delta, z * delta))
            }
            else if(updateInfo.code === Human.ScaleCode) {
                this._updateScale(new Vector3(x * delta, y * delta, z * delta))
            }
            if(updateInfo.current > updateInfo.duration) {
                this.updateQueue.splice(idx, 1)
            }
        })
    }
}

interface UpdateInfo {
    code: number
    everyMillsecond: THREE.Vector3 | THREE.Euler
    current: number
    duration: number
}