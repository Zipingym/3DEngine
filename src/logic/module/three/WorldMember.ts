import Member from "@class/member/Member";
import World from "@/logic/visible/World";
import App from "@/logic/app/app";

export default class WorldMember extends Member {
    protected onPatchTree = () => {
        this.appendChild(new World(this.findRoot().getAttribute(App.worldModel)))
    }

}