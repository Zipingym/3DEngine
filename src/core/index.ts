import {
    Scene
} from 'three'
import { Human, World } from '../asset';
import { UpdateAble } from '../interface';

//@ts-ignore
import humanModel from '../static/model/man.gltf'
//@ts-ignore
import gymModel from '../static/model/gym1_1.gltf'
export default class Core implements UpdateAble {
    private scene: Scene

    private human: Human
    private world: World
    constructor (
        scene: Scene
    ) {
        this.scene = scene
        this.human = new Human(humanModel, this.scene)
        this.world = new World(gymModel, this.scene)
    }
    public update = (interval: number) => {
        this.human.update(interval)
    }
}