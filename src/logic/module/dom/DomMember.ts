import Member from "@class/member/Member";
import App from "@/logic/app";
import TimeUIMember from "./TimeUIMember";
export default class DomMember extends Member {
    private static ID = 5
    
    constructor (

    ) {
        super(DomMember.ID)
    }
    protected onPatchTree = () => {
        const domElement = this.findRoot().getAttribute(App.rootElement)
        this.appendChild(new TimeUIMember(domElement))
        
    }
}