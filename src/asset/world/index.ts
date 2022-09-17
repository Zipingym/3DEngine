import Loader from "../loader";
import { Scene } from "../../three";
import { UpdateAble } from "../../interface";

export default class World extends Loader implements UpdateAble{
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
        this.model.scale.set(1.7, 1.7, 1.7)
        console.log(this.model)
        this.model.children.forEach((ele: any)  => {
            if(ele.isLight) {
                ele.intensity = 1
            }
        })
        this.render(this.scene)
    };
    protected onProgress = (xhr: any) => {
    };
    protected onError = (error: any) => {
        console.log(error)
    };

    public update: (interval: number) => void = (interval: number) => {
    }
}