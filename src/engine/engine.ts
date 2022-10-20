import ThreeDefault, { Camera } from "./three";
import World from "./world/world";
import Human from "./human/human";
import { Models } from "../app/app";
import User from "./human/user";

export default class Engine {
    private threeDefault: ThreeDefault
    public worlds:Map<string, World> = new Map()
    public humans:Map<string, Human> = new Map();

    private models:Models;
    constructor(
        root: HTMLElement,
        models: Models
    ) {
        this.models = models;
        this.threeDefault = new ThreeDefault(root)
        // this.threeDefault = new ThreeDefault(root, { orbitcontrol: root } )
        this.threeDefault.getCamera().position.setZ(10)
    }
    public createHuman(name: string, fileName?:string, camera?: boolean) {
        fileName = fileName ?? this.models.humanModel
        if(camera) 
            this.humans.set(name, new User(this.models.humanModel,this.threeDefault.getScene(), this.threeDefault.getCamera()))
        else 
            this.humans.set(name, new Human(this.models.humanModel,this.threeDefault.getScene()))
    
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
    public update(interval: number) {
        this.threeDefault.update()
        this.humans.forEach(human => {
            human.update(interval)
        })
    }
}