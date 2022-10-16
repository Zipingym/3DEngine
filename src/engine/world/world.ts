import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Model from "../model";
import { Scene } from "../three";

export default class World extends Model {
    constructor (
        worldFileName: string,
        location:THREE.Vector3,
        scene:Scene
    ) {
        const render = (gltf: GLTF) => {
            gltf.scene.position.set(location.x, location.y, location.z)
            scene.add(gltf.scene)
        }
        super(worldFileName, render)
    }
}