import LoadAbleAsset from "@class/asset/LoadableAsset";
import Member from "@class/member/Member";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ThreeMember } from "../module";

export default class Visible extends Member {
    private asset: LoadAbleAsset<GLTF>
    public static ASSET = "asset"
    constructor (
        asset: LoadAbleAsset<GLTF>
    ) {
        super()
        this.asset = asset
    }
    protected onPatchTree = () => {
        this.asset.onAfterLoad((gltf: GLTF) => {
            this.setAttribute(Visible.ASSET, gltf)
            this.beforeRender(gltf)
            this.findRoot().findOneChild((e) => e.id === ThreeMember.ID)?.getAttribute(ThreeMember.SCENE).add(gltf.scene)
            this.afterRender(gltf)
        })
    }
    protected beforeRender(gltf: GLTF){};
    protected afterRender(gltf: GLTF){};
}