import moveAble from "../interface/moveAble";
import Model from "../model";
import {
    Vector3,
    Euler
} from 'three'
import { Scene } from "../three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export default class Human extends Model implements moveAble{
    constructor(
        fileName: string,
        scene:Scene
    ) {
        const render = (gltf: GLTF) => {
            scene.add(gltf.scene)
        }
        super(fileName,render)
        
    }
    setPosition = (position: Vector3) => {
        if(this.loadedModel != undefined) this.loadedModel.scene.position.set(position.x, position.y, position.z)
    }
    setRotation = (rotation: Euler) => {
        if(this.loadedModel != undefined) this.loadedModel.scene.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order)
    }
    setScale = (scale: Vector3) => {
        if (this.loadedModel != undefined) this.loadedModel.scene.scale.set(scale.x, scale.y, scale.z)   
    }
    
}