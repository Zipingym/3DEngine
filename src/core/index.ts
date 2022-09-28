import {
    Mesh,
    Scene,
    Vector3
} from 'three'
import { Human, World } from '../asset';
import { UpdateAble } from '../interface';

import * as THREE from "three"

//@ts-ignore
import humanModel from '../static/model/anmatied_man.gltf'
//@ts-ignore
import gymModel from '../static/model/gym1_2_5.gltf'
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
        this.world = new World(gymModel, this.scene)
    }
    public update = (interval:number) => {
        this.humans.forEach((v, k) => {
            v.update(interval)
        })
    }
}