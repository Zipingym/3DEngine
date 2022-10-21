import { Box3, BoxHelper, Object3D, Scene, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Collusion from "../collusion/collusion";
import Model from "../model";

export default class World extends Model {
    private location: Vector3
    private scene: Scene
    private collusion?: Collusion
    constructor (
        worldFileName: string,
        location:THREE.Vector3,
        scene:Scene,
        collusion?: Collusion
    ) {
        super(worldFileName)
        this.location = location
        this.scene = scene
        this.collusion = collusion
    }
    protected afterLoad(model: GLTF): void {
        this.scene.add(model.scene)
        if(this.collusion != undefined) this.collusion.setLeafChildren(model.scene)
    }
}