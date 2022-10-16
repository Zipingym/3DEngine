import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Model{
    private fileName: string
    private isLoading:boolean = false;
    protected loadedModel?:GLTF;
    private afterLoad?: (model: GLTF) => void
    constructor(
        fileName: string,
        afterLoad?: (model: GLTF) => void
    ) {
        this.fileName = fileName
        this.afterLoad = afterLoad
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(fileName,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this))
    }
    protected onLoad(model:GLTF) {
        this.loadedModel = model;
        this.isLoading = true;
        if(this.afterLoad != undefined) this.afterLoad(model)
    }
    protected onProgress(progress:any) {
        
    }
    protected onError(error:any) {
        console.log(error)
    }
    public getIsLoading = () => this.isLoading
    public getLoadedModel = () => this.loadedModel
}