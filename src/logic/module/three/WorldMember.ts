import Member from "@class/member/Member";
import App from "@/logic/app/app";
import BeachWorld from "@/logic/visible/BeachWorld";

export default class WorldMember extends Member {
    protected onPatchTree = () => {
        this.appendChild(new BeachWorld(this.findRoot().getAttribute(App.worldModel)))
    }

}