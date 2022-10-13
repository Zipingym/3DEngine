import * as THREE from 'three'

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
    }

    addLight(scene:THREE.Scene){
        scene.add(this.directionalLight)
        scene.add(this.ambientLight)
    }
}