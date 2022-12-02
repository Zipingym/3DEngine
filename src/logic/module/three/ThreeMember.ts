import Member from "@class/member/Member";
import { Color, Light, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";
import App from "../../app";
import UpdateEventListener from "./UpdateEventListener";
import Event from "@class/event/Event";
import LightMember from "./LightMember";
import CameraMember from "./CameraMember";
export default class ThreeMember extends Member {
    public static ID = 9
    public static RENDERER = "renderer"
    public static SCENE = "scene"
    constructor (

    ) {
        super(ThreeMember.ID)
        
    }

    protected onPatchTree = () => {
        const domElement = this.findRoot().getAttribute(App.rootELement)

        const scene = this.sceneSetter()
        this.setAttribute(ThreeMember.SCENE, scene)

        const renderer = this.rendererSetter()
        domElement.appendChild(renderer.domElement)
        this.setAttribute(ThreeMember.RENDERER, renderer)

        this.appendEventListener(new UpdateEventListener(Event.UPDATE))

        this.appendChild(new LightMember())
        this.appendChild(new CameraMember())
    }

    private sceneSetter() {
        const scene = new Scene()
        scene.background = new Color(0xf0f0f0)
        return scene
    }

    private rendererSetter() {
        const renderer = new WebGLRenderer({
			antialias: true,
		})
        renderer.setSize(renderer.domElement.width, renderer.domElement.height)
		renderer.outputEncoding = sRGBEncoding
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.position = "absolute"
        
        return renderer
    }
}