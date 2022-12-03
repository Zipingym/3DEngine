import Member from "@class/member/Member";
import App from "@/logic/app/app";
import User from "@/logic/visible/User";

export default class HumanMember extends Member {
    protected onPatchTree = () => {
        this.appendChild(new User(this.findRoot().getAttribute(App.worldModel)))
    }

}