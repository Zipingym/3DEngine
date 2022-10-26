import { Box3, Euler, Ray, Raycaster, Scene, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Collusion from "../collusion/collusion";
import Model from "../model";
import { Camera } from "../three";
import Human from "./human";
import Animation from './animation'

export default class User extends Human {
    public camera: Camera;
    private raycaster: Raycaster
    private world: Model
    constructor (
        fileName:string,
        scene:Scene,
        camera:Camera,
        world: Model
    ) {
        super(fileName,scene)
        this.camera = camera
        this.world = world
        this.raycaster = new Raycaster()
        this.raycaster.far = 10
    }
    protected afterLoad(model: GLTF): void {
        this.scene.add(model.scene)
        this.animation = new Animation(model.animations, model.scene)
        this.box = new Box3().setFromObject(model.scene)   
        this.setPosition(new Vector3(-119, 0, 14))
        this.setRotation(new Euler(0, 1.4, 0))
    }
    setPosition = (position: Vector3) => {
        if(this.loadedModel != undefined) {
            const { x, y, z } = this.loadedModel.scene.position
            this.loadedModel.scene.position.set(position.x, position.y, position.z)
            if(this.world.getIsLoading()) {
                this.raycaster.ray = new Ray(position, new Vector3(0, -1, 0))
                if(this.raycaster.intersectObjects(this.world.getLoadedModel()!.scene.children).map(element => element.object.name).filter((element) => element.includes("Plane048")).length == 0) {
                    this.loadedModel.scene.position.set(x, y, z)
                }
                else {
                    this.camera.position.set(position.x - 3, position.y + 3, position.z)
                }
            }
            else {
                this.camera.position.set(position.x - 3, position.y + 3, position.z)
            }
        }
    }
    setRotation = (rotation: Euler) => {
        if(this.loadedModel != undefined) {
            this.loadedModel.scene.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order)
            this.camera.rotation.set(0, rotation.y - Math.PI, 0, rotation.order)
            // console.log(this.loadedModel.animations)
            this.camera.lookAt(this.loadedModel.scene.position)
        }
    }
    setScale = (scale: Vector3) => {
        if (this.loadedModel != undefined) this.loadedModel.scene.scale.set(scale.x, scale.y, scale.z)
    }
}