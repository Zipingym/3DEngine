import Loader from "./loader";
import { Scene } from "../three";

export default class Human extends Loader {
    private animations: Map<string, any> = new Map()
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
        gltf.animations.forEach((animation: any) => {
            this.animations.set(animation.name, animation)
            console.log(animation)
        })
       
    };
    protected onProgress = (xhr: any) => {
        // console.log(xhr)
    };
    protected onError = (error: any) => {
        console.log(error)
    };
    public getAnimations(): Array<string> {
        const animations: Array<string> = new Array()
        this.animations.forEach((v, k:string) => {
            animations.push(k)
        })
        return animations
    }
}