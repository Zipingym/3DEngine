import LoadAbleAsset from "@class/asset/LoadableAsset";
import { Object3D } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import World from "./World";
import Event from "@class/event/Event";

export default class BeachWorld extends World {
    public static ROAD = "road"
    public static START_LINE = "startLine"
    public static END_LINE = "endLine"
    public static CLASS_NAME = "BeachWorld"
    constructor (
        asset: LoadAbleAsset<GLTF>
    ) {
        super(asset)
        this.class = "BeachWorld"
    }
    protected beforeRender(gltf: GLTF): void {
        this.setAttribute(BeachWorld.ROAD, this.findObject("Plane048", gltf.scene))
        this.setAttribute(BeachWorld.START_LINE, this.findObject("Plane068", gltf.scene))
        this.setAttribute(BeachWorld.END_LINE, this.findObject("Plane067", gltf.scene))
    }
    private findObject(name: string, target: Object3D): Object3D | undefined {
        if(target.name === name) {
            return target
        }
        else {
            for(let i = 0; i < target.children.length; i++) {
                const get = this.findObject(name, target.children[i])
                if(get != undefined) return get
            }
        }
        return undefined
    }
}