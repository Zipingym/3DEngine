import { Euler, Scene, Vector3 } from "three";
import { Camera } from "../three";
import Human from "./human";

export default class User extends Human {
    private camera;
    private isCameraMove: boolean
    constructor (
        fileName:string,
        scene:Scene,
        camera:Camera,
        isCameraMove?: boolean
    ) {
        super(fileName,scene)
        this.camera = camera
        this.isCameraMove = isCameraMove == undefined || isCameraMove == false ? false : true
    }

    setPosition = (position: Vector3) => {
        if(this.loadedModel != undefined) {
            this.loadedModel.scene.position.set(position.x, position.y, position.z)
            if(this.isCameraMove) {
                this.camera.position.set(position.x, position.y + 1, position.z)
            }            
        }

    }
    setRotation = (rotation: Euler) => {
        if(this.loadedModel != undefined) {
            this.loadedModel.scene.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order)
            if(this.isCameraMove) {
                this.camera.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order)
            }
        }
    }
    setScale = (scale: Vector3) => {
        if (this.loadedModel != undefined) this.loadedModel.scene.scale.set(scale.x, scale.y, scale.z)
    }
    
}