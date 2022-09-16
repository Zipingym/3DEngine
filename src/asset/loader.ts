import { RenderAble } from "../interface"
import { Scene } from "../three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default abstract class Loader implements RenderAble {
    public fileName: string
    protected model: any = 0
    constructor (
        fileName: string
    ) {
        this.fileName = fileName
    }
    public load() {
        const loader = new GLTFLoader();
        loader.load(
            this.fileName,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this)
        );
    }
    public render = (scene: Scene) => {
        scene.add(this.model)
    }

    protected abstract onLoad: (gltf:any) => void
    protected abstract onProgress: (xhr:any) => void
    protected abstract onError: (error:any) => void
}

// import Loader from "./loader";

// export default class A extends Loader {
//     constructor(
//         fileName: string
//     ) {
//         super(fileName)
//     }
//     protected onLoad = (gltf: any) => {

//     };
//     protected onProgress = (xhr: any) => {

//     };

//     protected onError = (error: any) => {

//     };
// }