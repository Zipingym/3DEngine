import Member from "@class/member/Member";
import { AmbientLight, PerspectiveCamera } from "three";
import CameraMember from "./CameraMember";
import ThreeMember from "./ThreeMember";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default class OrbitControlMember extends Member {
    public static ID = 94
    public static Controller = "controller"
    constructor (

    ) {
        super(OrbitControlMember.ID)
    }

    protected onPatchTree = () => {
        const threeMember:Member = this.findRoot().findOneChild((m) => m.id === ThreeMember.ID)!
        const renderer = threeMember.getAttribute(ThreeMember.RENDERER)
        const camera = new PerspectiveCamera(100, renderer.domElement.width / renderer.domElement.height, 1, 1000)
        camera.near = 0.01
        camera.far = 500
        camera.position.set(0, 0, 10)
        const cameraMember = threeMember.findOneChild((e) => e.id === CameraMember.ID)
        const control = new OrbitControls(camera, renderer.domElement)
        cameraMember?.setAttribute(CameraMember.CAMERA, camera)
    }
}