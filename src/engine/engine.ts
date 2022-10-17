import ThreeDefault from "./three";
import World from "./world/world";
import Human from "./human/human";
import { Models } from "../app/app";

export default class Engine {
    private threeDefault: ThreeDefault
    public worlds:Map<string, World> = new Map()
    public humans:Map<string,Human> = new Map();

    private models:Models;
    constructor(
        root: HTMLElement,
        models: Models
    ) {
        this.models = models;
        this.threeDefault = new ThreeDefault(root)
        // this.human = new User(models.humanModel,this.threeDefault.getScene(), this.threeDefault.getCamera())
    }
    public createHuman(name: string, fileName?:string) {
        if (fileName === undefined){
            this.humans.set(name,new Human(this.models.humanModel,this.threeDefault.getScene()))
        } else {
            this.humans.set(name,new Human(fileName,this.threeDefault.getScene()))
        }
    }
    public getHuman(name: string): Human | undefined {
        return this.humans.get(name)
    }
    public createWorld(name: string, fileName?:string) {
        if (fileName === undefined){
            this.worlds.set(name,new Human(this.models.worldModel,this.threeDefault.getScene()))
        } else {
            this.worlds.set(name,new Human(fileName,this.threeDefault.getScene()))
        } 
    }
    public getWorld(name: string): World | undefined {
        return this.worlds.get(name)
    }
    public update() {
        this.threeDefault.update()
    }
}