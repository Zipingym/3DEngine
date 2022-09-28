import Loader from "../loader";
import { Scene } from "../../three";
import { UpdateAble } from "../../interface";
import eventListener from "../../global/eventlistener";

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
        this.model.children.forEach((ele: any)  => {
            if(ele.isLight) {
                ele.intensity = 1
            }
        })
        this.render(this.scene)
        this.model.children[29].visible = false
        eventListener.add("event-game", () => {
            this.model.children[23].visible = false
            this.model.children[29].visible = true
        })
        // eventListener.execute('event-game')
        
    };
    protected onProgress = (xhr: any) => {
    };
    protected onError = (error: any) => {
        console.log(error)
    };

    public update: (interval: number) => void = (interval: number) => {
    }
}