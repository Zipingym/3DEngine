import LoadAbleAsset from "@class/asset/LoadableAsset";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Visible from "./visible";

export default class World extends Visible {
    constructor (
        asset: LoadAbleAsset<GLTF>
    ) {
        super(asset)
    }
}