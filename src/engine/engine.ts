import ThreeDefault, { Camera } from "./three";
import World from "./world/world";
import Human from "./human/human";
import { Models } from "../app/app";
import User from "./human/user";
import { Box3, Color, Vector3 } from "three";
import Collusion from "./collusion/collusion";

export default class Engine {
    private root: HTMLElement
    private threeDefault: ThreeDefault
    public worlds:Map<string, World> = new Map()
    public humans:Map<string, Human> = new Map()
    private collusion: Collusion
    private models:Models;
    constructor(
        root: HTMLElement,
        models: Models
    ) {
        this.root = root
        this.models = models;
        // this.threeDefault = new ThreeDefault(root)
        this.threeDefault = new ThreeDefault(root, { orbitcontrol: root } )
        this.threeDefault.getCamera().position.setZ(10)
        this.threeDefault.getScene().background = new Color(0x9FFFF3)

        this.collusion = new Collusion(this.threeDefault.getScene())
    }
    public createHuman(name: string, fileName?:string, camera?: boolean) {
        if(!this.humans.has(name)) {
            fileName = fileName ?? this.models.humanModel
            if(camera) 
                this.humans.set(name, new User(this.models.humanModel,this.threeDefault.getScene(), this.threeDefault.getCamera(), this.getWorld("default")!))
            else 
                this.humans.set(name, new Human(this.models.humanModel,this.threeDefault.getScene(), this.getWorld("default")!))
        }
        console.log(this.humans)
    }
    public getHuman(name: string): Human | undefined {
        return this.humans.get(name)
    }
    public createWorld(name: string, fileName?:string) {
        this.worlds.set(name, new World(fileName ?? this.models.worldModel, new Vector3(0, 0, 0), this.threeDefault.getScene(), this.collusion))
    }
    public getWorld(name: string): World | undefined {
        return this.worlds.get(name)
    }
    public update(interval: number) {
        this.threeDefault.update()
        this.humans.forEach(human => {
            human.update(interval)
        })
    }
}