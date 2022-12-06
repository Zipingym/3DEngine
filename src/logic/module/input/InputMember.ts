import Event from "@class/event/Event";
import Member from "@class/member/Member";
import ExerciseInput from "./ExerciseInput/ExerciseInput";
import KeyboardInput from "./KeyboardInput";

export default class InputMember extends Member {
    constructor (

    ) {
        super()
    }
    protected onPatchTree = () => {
        this.appendChild(new KeyboardInput())
        this.appendChild(new ExerciseInput())
    }
}