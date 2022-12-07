import LoadAbleAsset from "@class/asset/LoadableAsset";
import Event from "@class/event/Event";
import { PerspectiveCamera, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import app from "../app";
import CameraMember from "../module/three/CameraMember";
import Human from "./Human";
import UserKeyboardInputEventListener from "./UserKeyboardInputEventListener";
import UserUpdateEventListener from "./UserUpdateEventListener";
import UserExerciseInputEventListener from "./UserExerciseInputEventListener";

export default class User extends Human {
    private camera: PerspectiveCamera
    public static SET_CAMERA_POS = "setCameraPosition"
    constructor (
        asset: LoadAbleAsset<GLTF>,
        className?: string
    ) {
        super(asset, className)
        this.camera = new PerspectiveCamera()
    }
    protected beforeRender(gltf: GLTF): void {
        const root = this.findRoot().getAttribute(app.rootElement)
        this.camera = new PerspectiveCamera(100, root.clientWidth / root.clientHeight, 1, 1000)
        this.camera.near = 0.01
        this.camera.far = 500
        this.setCameraPosistion(new Vector3(-55, -0.5, 66))

        this.findRoot().findOneDescendente((e) => e.id === CameraMember.ID)?.setAttribute(CameraMember.CAMERA, this.camera)
        this.setAttribute(CameraMember.CAMERA, this.camera)

        gltf.scene.position.set(-55, -0.5, 66)

        this.setAttribute(User.SET_CAMERA_POS, this.setCameraPosistion.bind(this))

        this.appendEventListener(new UserUpdateEventListener(Event.UPDATE))
        this.appendEventListener(new UserKeyboardInputEventListener(Event.KEYBOARD))
        this.appendEventListener(new UserExerciseInputEventListener(Event.EXERCISE))
    }

    // public setPosition(position: Vector3, time: number = 0) {
    //     this.executeWithAttribute(Visible.ASSET, (asset: GLTF) => {
    //         if(time === 0) {
    //             asset.scene.position.set(position.x, position.y, position.z)
    //             this.setCameraPosistion(position)
    //         }
    //     })
    // }

    private setCameraPosistion(def: Vector3) {
        const dir = this.dirCalculator(-2)
        const delta = new Vector3(def.x + dir.x, def.y + dir.y + 2, def.z + dir.z)
        this.camera.position.set(delta!.x, delta!.y, delta!.z)
        this.camera.lookAt(new Vector3(def.x, def.y + 1, def.z))
    }
}