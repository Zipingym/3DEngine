import ThreeDefault from "./three";
import World from "./world/world";
import * as THREE from "three"
import Human from "./human/human";
import { Models } from "../app/app";
import { Vector3 } from "three";
import User from "./human/user";

export default class Engine {
    private threeDefault: ThreeDefault
    private world:World;
    private human:Human
    private currentX: number = 1
    constructor(
        root: HTMLElement,
        models: Models
    ) {
        this.threeDefault = new ThreeDefault(root)
        this.world = new World(models.worldModel,new THREE.Vector3(0,0,0),this.threeDefault.getScene());
        this.human = new User(models.humanModel,this.threeDefault.getScene(), this.threeDefault.getCamera())
    }
    public update() {
        this.threeDefault.update()
        this.human.setPosition(new Vector3(this.currentX += 0.01, 1, 1))
    }
}