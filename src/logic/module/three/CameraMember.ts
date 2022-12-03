import Member from "@class/member/Member";
import UpdateEventListener from "./CameraUpdateEventListener";
import Event from "@class/event/Event";
export default class CameraMember extends Member {
    public static ID = 92
    public static CAMERA = "camera"
    constructor (

    ) {
        super(CameraMember.ID)
    }

    protected onPatchTree = () => {
        this.appendEventListener(new UpdateEventListener(Event.UPDATE))
    }
}