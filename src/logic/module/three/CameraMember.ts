import Member from "@class/member/Member";
import { PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";
import App from "../../app";
import UpdateEventListener from "./UpdateEventListener";
import Event from "@class/event/Event";
import ThreeMember from "./ThreeMember";
export default class CameraMember extends Member {
    public static ID = 92
    public static CAMERA = "camera"
    constructor (

    ) {
        super(CameraMember.ID)
    }

    protected onPatchTree = () => {
        const renderer = this.findParent()?.getAttribute(ThreeMember.RENDERER)
        const camera = new PerspectiveCamera(100, renderer.domElement.width / renderer.domElement.height)
        camera.near = 0.01
        camera.far = 500
        this.setAttribute(CameraMember.CAMERA, camera)
    }
}