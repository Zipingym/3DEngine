import { GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import LoadAbleAsset from "./LoadableAsset";
export default class GltfAsset extends LoadAbleAsset<GLTF> {
    protected asset?: GLTF | undefined;
    constructor (
        fileName: string
    ) {
        super(fileName)
        const loader = new GLTFLoader()
        loader.load(
            fileName,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this)
        )
    }
    protected onLoad(gltf: GLTF): void {
        this.asset = gltf
        this.executeLoadQueue()
    }
    protected onProgress(event: ProgressEvent): void {
        
    }
    protected onError(event: ErrorEvent): void {
        throw new Error("Method not implemented.");
    }
}