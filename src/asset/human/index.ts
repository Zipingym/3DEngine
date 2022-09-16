import Loader from "../loader";
import Animator from "./animator";
import { Scene } from "../../three";
import { UpdateAble } from "../../interface";

export default class Human extends Loader implements UpdateAble{
    public animator?: Animator
    private scene: Scene
    constructor(
        fileName: string,
        scene: Scene
    ) {
        super(fileName)
        this.scene = scene
        this.load()
    }
    protected onLoad = (gltf: any) => {
        this.model = gltf.scene
        this.render(this.scene)
        this.animator = new Animator(gltf)
        this.animator.animate("Armature|mixamo.com|Layer0")
    };
    protected onProgress = (xhr: any) => {
        // console.log(xhr)
    };
    protected onError = (error: any) => {
        console.log(error)
    };

    public update: (interval: number) => void = (interval: number) => {
        if(this.animator != undefined) this.animator.update(interval)
    }
}