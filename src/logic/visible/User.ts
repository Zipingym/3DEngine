import LoadAbleAsset from "@class/asset/LoadableAsset";
import { PerspectiveCamera, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import app from "../app";
import CameraMember from "../module/three/CameraMember";
import Human from "./Human";

export default class User extends Human {
    private camera: PerspectiveCamera
    constructor (
        asset: LoadAbleAsset<GLTF>
    ) {
        super(asset)
        this.camera = new PerspectiveCamera()
    }
    protected beforeRender(gltf: GLTF): void {
        const root = this.findRoot().getAttribute(app.rootELement)
        this.camera = new PerspectiveCamera(100, root.clientWidth / root.clientHeight, 1, 1000)
        this.camera.near = 0.01
        this.camera.far = 500
        this.setCameraPosistion(new Vector3(-55, -0.5, 66))
        this.findRoot().findOneDescendente((e) => e.id === CameraMember.ID)?.setAttribute(CameraMember.CAMERA, this.camera)
        gltf.scene.position.set(-55, -0.5, 66)
    }

    private setCameraPosistion(def: Vector3) {
        const dir = this.dirCalculator(-2)
        const delta = new Vector3(def.x + dir.x, def.y + dir.y + 2, def.z + dir.z)
        this.camera.position.set(delta!.x, delta!.y, delta!.z)
        this.camera.lookAt(new Vector3(def.x, def.y + 1, def.z))
    }
    
}