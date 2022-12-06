import Member from "@class/member/Member";
import { Color, Light, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";
import App from "../../app";
import UpdateEventListener from "./CameraUpdateEventListener";
import Event from "@class/event/Event";
import LightMember from "./LightMember";
import CameraMember from "./CameraMember";
import Visible from "@/logic/visible/visible";
import OrbitControlMember from "./OrbitControlMember";
import World from "@/logic/visible/World";
import User from "@/logic/visible/User";
import WorldMember from "./WorldMember";
import HumanMember from "./HumanMember";
export default class ThreeMember extends Member {
    public static ID = 9
    public static RENDERER = "renderer"
    public static SCENE = "scene"
    constructor (

    ) {
        super(ThreeMember.ID)
        
    }

    protected onPatchTree = () => {
        const domElement = this.findRoot().getAttribute(App.rootElement)

        const scene = this.sceneSetter()
        this.setAttribute(ThreeMember.SCENE, scene)

        const renderer = this.rendererSetter(domElement)
        domElement.appendChild(renderer.domElement)
        this.setAttribute(ThreeMember.RENDERER, renderer)

        this.appendChild(new LightMember())
        this.appendChild(new CameraMember())
        this.appendChild(new OrbitControlMember())
        this.appendChild(new WorldMember())
        // this.appendChild(new HumanMember())
        
        this.appendChild(new User(this.findRoot().getAttribute(App.characterModel)))
    }

    private sceneSetter() {
        const scene = new Scene()
        scene.background = new Color(0xabe7f5)
        return scene
    }

    private rendererSetter(html: HTMLElement) {
        const renderer = new WebGLRenderer({
			antialias: true,
		})
        renderer.setClearColor(0xff0000, 1.0)
        renderer.setSize(html.clientWidth * 2, html.clientHeight * 2)
		renderer.outputEncoding = sRGBEncoding
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.position = "absolute"
        
        return renderer
    }
}