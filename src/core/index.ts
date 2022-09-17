import {
    Mesh,
    Scene,
    Vector3
} from 'three'
import { Human, World } from '../asset';
import { UpdateAble } from '../interface';

import * as THREE from "three"

//@ts-ignore
import humanModel from '../static/model/man.gltf'
//@ts-ignore
import gymModel from '../static/model/gym1_1_8.gltf'
export default class Core implements UpdateAble {
    private scene: Scene

    private human: Human
    private world: World
    private example: Mesh

    constructor (
        scene: Scene
    ) {
        this.scene = scene
        this.human = new Human(humanModel, this.scene)
        this.world = new World(gymModel, this.scene)

        const sphere = new THREE.SphereGeometry(1,10,10)
        const material = new THREE.MeshBasicMaterial({color:0x00ff00})
        this.example = new THREE.Mesh(sphere,material )
        this.example.position.set(0,10,0);

        this.scene.add(this.example)
    }
    public update = (interval:number) => {
        this.human.update(interval)
    }
}