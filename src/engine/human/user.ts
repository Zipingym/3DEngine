import { Euler, Scene, Vector3 } from "three";
import { Camera } from "../three";
import Human from "./human";

export default class User extends Human {
    private camera: Camera;
    constructor (
        fileName:string,
        scene:Scene,
        camera:Camera
    ) {
        super(fileName,scene)
        this.camera = camera
        this.camera.position.set(0, 1.5, 0)
        this.camera.rotation.set(0, Math.PI, 0)
    }
    setPosition = (position: Vector3) => {
        if(this.loadedModel != undefined) {
            this.loadedModel.scene.position.set(position.x, position.y, position.z)
            this.camera.position.set(position.x, position.y + 1.5, position.z)
        }
    }
    setRotation = (rotation: Euler) => {
        if(this.loadedModel != undefined) {
            this.loadedModel.scene.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order)
            this.camera.rotation.set(0, Math.PI - rotation.y, 0, rotation.order)
        }
    }
    setScale = (scale: Vector3) => {
        if (this.loadedModel != undefined) this.loadedModel.scene.scale.set(scale.x, scale.y, scale.z)
    }
}