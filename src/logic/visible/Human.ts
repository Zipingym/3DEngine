import LoadAbleAsset from "@class/asset/LoadableAsset";
import { Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Visible from "./visible";

export default class Human extends Visible {
    constructor (
        asset: LoadAbleAsset<GLTF>
    ) {
        super(asset)
    }
    protected dirCalculator(move: number): Vector3 {
        const asset = this.asset.getAsset() 
        if(asset != undefined) {
            const rotation:number = asset.scene.rotation.y
            let x = (Math.sin(rotation) * move)
            let z = (Math.cos(rotation) * move)
            if(x == Infinity || isNaN(x)) x = 0
            if(z == Infinity || isNaN(z)) z = 0
            return new Vector3(x, 0, z)
        }
        else {
            return new Vector3(0, 0, 0)
        }
    }
}