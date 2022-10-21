import { Box3, Euler, Ray, Raycaster, Scene, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Collusion from "../collusion/collusion";
import Model from "../model";
import ThreeDefault, { Camera } from "../three";
import Human from "./human";

export default class User extends Human {
    public camera: Camera;
    private raycaster: Raycaster
    private bottomCamera: Camera
    private world: Model
    private root: HTMLElement
    private three: ThreeDefault
    constructor (
        fileName:string,
        scene:Scene,
        camera:Camera,
        world: Model,
        root: HTMLElement,
        three: ThreeDefault
    ) {
        super(fileName,scene)
        this.root = root
        this.camera = camera
        this.world = world
        this.three = three
        this.raycaster = new Raycaster()

        this.bottomCamera = new Camera(100, 1)
        this.bottomCamera.rotation.set(-Math.PI / 2, 0, 0)
        // three.camera = this.bottomCamera
    }
    protected afterLoad(model: GLTF): void {
        this.scene.add(model.scene)   
        this.box = new Box3().setFromObject(model.scene)   
        this.setPosition(new Vector3(-119, 0, 14))
        this.setRotation(new Euler(0, 1.4, 0))
    }
    setPosition = (position: Vector3) => {
        if(this.loadedModel != undefined) {
            // const { x, y, z } = this.loadedModel.scene.position
            this.loadedModel.scene.position.set(position.x, position.y, position.z)
            // this.raycaster.ray.direction = new Vector3(0, -1, 0)
            // this.raycaster.ray.recast
            // this.raycaster.far = 10
            this.raycaster.ray = new Ray(position, new Vector3(0, -1, 0))
            if(this.world.getIsLoading()) {
                console.log(this.raycaster.intersectObjects(this.world.getLoadedModel()!.scene.children).map(element => element.object.name).filter((element) => element.includes("Plane048")).length)
            }
            // this.camera.rotation.set(x, y, z)
            if(false) {
                // this.loadedModel.scene.position.set(x, y, z)
            }
            else {
                this.camera.position.set(position.x, position.y + 1.5, position.z)
                this.bottomCamera.position.set(position.x, position.y + 1.5, position.z)
            }
        }
    }
    setRotation = (rotation: Euler) => {
        if(this.loadedModel != undefined) {
            this.loadedModel.scene.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order)
            this.camera.rotation.set(0, rotation.y - Math.PI, 0, rotation.order)
        }
    }
    setScale = (scale: Vector3) => {
        if (this.loadedModel != undefined) this.loadedModel.scene.scale.set(scale.x, scale.y, scale.z)
    }
}