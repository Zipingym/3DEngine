import { Box3, Euler, Ray, Raycaster, Scene, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Collusion from "../collusion/collusion";
import Model from "../model";
import { Camera } from "../three";
import Human from "./human";
import Animation from './animation'

export default class User extends Human {
    public static firstPerson = 1
    public static thirdPerson = 3
    public camera: Camera;
    private mode: number = User.thirdPerson
    constructor (
        fileName:string,
        scene:Scene,
        camera:Camera,
        world: Model
    ) {
        super(fileName, scene, world)
        this.camera = camera 
    }
    protected afterLoad(model: GLTF): void {
        this.scene.add(model.scene)
        this.animation = new Animation(model.animations, model.scene)
        this.box = new Box3().setFromObject(model.scene)   
        this.setPosition(new Vector3(-119, -0.5, 14))
        this.setRotation(new Euler(0, 1.4, 0))
    }
    setPosition = (position: Vector3) => {
        if(this.loadedModel != undefined) {
            const { x, y, z } = this.loadedModel.scene.position
            this.loadedModel.scene.position.set(position.x, position.y, position.z)
            if(this.world.getIsLoading()) {
                this.raycaster.ray = new Ray(position, new Vector3(0, -1, 0))
                const objects = this.raycaster.intersectObjects(this.world.getLoadedModel()!.scene.children).map(element => element.object.name)
                if(objects.filter((element) => element.includes("Plane068")).length === 1) {
                    this.inRace = true
                }
                else if(objects.filter((element) => element.includes("Plane067")).length === 1) {
                    this.inRace = false
                }
                
                if(objects.filter((element) => element.includes("Plane048")).length == 0) {
                    this.loadedModel.scene.position.set(x, y, z)
                }
                else {
                    this.setCameraPosistion(position)
                }
            }
            else {
                this.setCameraPosistion(position)
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
    setMode(mode: number) {
        this.mode = mode
        // this.setCameraPosistion(this.getPosistion()!)
    }
    toggleMode() {
        if(this.mode === User.firstPerson) {
            this.setMode(User.thirdPerson)
        }
        else {
            this.setMode(User.firstPerson)
        }
    }
    private setCameraPosistion(def: Vector3) {
        let delta
        if(this.mode === User.firstPerson) {
            delta = new Vector3(def.x + 0, def.y + 1, def.z + 0)
        }
        else if(this.mode === User.thirdPerson) {
            const dir = this.dirCalculator(-2)
            delta = new Vector3(def.x + dir.x, def.y + dir.y, def.z + dir.z)
        }
        else {
            delta = def
        }
        this.camera.position.set(delta!.x, delta!.y, delta!.z)
    }
    private dirCalculator(move: number): Vector3 {
        const rotation:number = this.getRotation()!.y
        let x = (Math.sin(rotation) * move)
        let z = (Math.cos(rotation) * move)
        if(x == Infinity || isNaN(x)) x = 0
        if(z == Infinity || isNaN(z)) z = 0
        return new Vector3(x, 2, z)
    }
}