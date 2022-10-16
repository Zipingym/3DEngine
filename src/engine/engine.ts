import ThreeDefault from "./three";
import World from "./world/world";
import * as THREE from "three"

export default class Engine {
    private threeDefault: ThreeDefault

    private world:World;

    constructor(
        root: HTMLElement,
        worldModel:string,
    ) {
        this.threeDefault = new ThreeDefault(root)
        this.world = new World(worldModel,new THREE.Vector3(0,0,0),this.threeDefault.getScene());
    }
    public update() {
        this.threeDefault.update()
    }
}