import Member from "@class/member/Member";
import { AmbientLight } from "three";
import ThreeMember from "./ThreeMember";
export default class LightMember extends Member {
    public static ID = 93
    public static LIGHT = "light"
    constructor (

    ) {
        super(LightMember.ID)
    }

    protected onPatchTree = () => {
        const color = 0xdddddd;
        const intensity = 0.9;
        const ambientLight = new AmbientLight(color, intensity)
        this.findParent()?.getAttribute(ThreeMember.SCENE).add(ambientLight)
    }
}