import * as THREE from 'three'
import { Vector2 } from 'three';

export default class Light {
    private directionalLight: THREE.DirectionalLight
    private ambientLight: THREE.AmbientLight
    constructor (

    ){
        const color = 0xdddddd;
        const intensity = 0.5; // 강도
        this.directionalLight = new THREE.DirectionalLight(color, intensity);
        this.ambientLight = new THREE.AmbientLight(color, intensity)
        this.directionalLight.position.set(0, 100, 0)
        this.ambientLight.position.set(0, 100, 0)
        this.directionalLight.castShadow = true
        this.ambientLight.castShadow = true
        this.directionalLight.shadow.mapSize = new Vector2(1024, 1024)
    }

    addLight(scene:THREE.Scene){
        scene.add(this.directionalLight)
        scene.add(this.ambientLight)
    }
}