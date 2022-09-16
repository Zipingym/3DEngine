import {
    Scene
} from 'three'
import { RenderAble, UpdateAble } from '../interface';
export default class Core implements UpdateAble {
    private scene: Scene
    constructor (
        scene: Scene
    ) {
        this.scene = scene
    }
    public update = (interval: number) => {

    }
}