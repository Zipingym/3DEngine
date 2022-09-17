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
import gymModel from '../static/model/gym1_2_4.gltf'
import { Camera } from '../three';
export default class Core implements UpdateAble {
    private scene: Scene

    public humans: Map<string, Human> = new Map()
    private world: World
    private example: Mesh

    constructor (
        scene: Scene,
        camera: Camera
    ) {
        this.scene = scene
        this.humans.set(JSON.parse(sessionStorage.getItem('loggedIn')!).username, new Human(humanModel, this.scene, camera))
        this.world = new World(gymModel, this.scene)

        const sphere = new THREE.SphereGeometry(1,10,10)
        const material = new THREE.MeshBasicMaterial({color:0x00ff00})
        this.example = new THREE.Mesh(sphere,material )
        this.example.position.set(0,10,0);

        this.scene.add(this.example)
    }
    public update = (interval:number) => {
        this.humans.forEach((v, k) => {
            v.update(interval)
        })
    }
}