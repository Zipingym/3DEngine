import Member from "@class/member/Member";
import { Scene, sRGBEncoding, WebGLRenderer } from "three";
import App from "../../app";
export default class ThreeMember extends Member {
    public static ID = 9
    constructor (

    ) {
        super(ThreeMember.ID)
        const domElement = this.findRoot().getAttribute(App.rootELement)
        this.setAttribute("scene", new Scene())
        
        const renderer = new WebGLRenderer({
			antialias: true,
		})
        renderer.setSize(renderer.domElement.width, renderer.domElement.height)
		renderer.outputEncoding = sRGBEncoding
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.position = "absolute"
        domElement.appendChild(renderer.domElement)
        this.setAttribute("renderer", renderer)
        
    }
}