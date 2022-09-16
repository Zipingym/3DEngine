import {
    Scene
} from 'three'
import { Human } from '../asset';
import { UpdateAble } from '../interface';

//@ts-ignore
import humanModel from '../static/model/man.gltf'
export default class Core implements UpdateAble {
    private scene: Scene
    private human: Human
    constructor (
        scene: Scene
    ) {
        
        this.scene = scene
        this.human = new Human(humanModel, this.scene)
        
    }
    public update = (interval: number) => {

    }
}