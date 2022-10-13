import {
    Scene,
} from 'three'
import { Human, World } from '../asset';
import { UpdateAble } from '../interface';
//@ts-ignore
import humanModel from '../static/model/anmatied_man.gltf'
//@ts-ignore
import town from '../static/model/town.glb'
import { Camera } from '../three';
export default class Core implements UpdateAble {
    private scene: Scene

    public humans: Map<string, Human> = new Map()
    private world: World

    constructor (
        scene: Scene,
        camera: Camera
    ) {
        this.scene = scene
        this.humans.set("123", new Human(humanModel, this.scene, camera))
        this.world = new World(town, this.scene)
    }
    public update = (interval:number) => {
        this.humans.forEach((v, k) => {
            v.update(interval)
        })
    }
}