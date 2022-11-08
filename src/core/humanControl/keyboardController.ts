import { Euler } from "three"
import Human from "../../engine/human/human"
import User from "../../engine/human/user"
import Controller, { ControlInfo } from "./controller"

export default class KeyboardController extends Controller {
    private user: User
    constructor (
        human: User
    ) {
        super(human)
        this.user = human
    }
    public control: (code: number, value: any) => ControlInfo | undefined = (code: number, value: KeyboardEvent) => {
        if(value.code === "KeyW") {
            return this.humanUpdatePosition(this.dirCalculator(2), 500)
        }
        else if(value.code === "KeyA") {
            return this.humanUpdateRotation(new Euler(0, 0.5, 0), 300)
        }
        else if(value.code === "KeyD") {
            return this.humanUpdateRotation(new Euler(0, -0.5, 0), 300)
        }
        else if(value.code === "KeyV") {
            this.user.toggleMode()
        }
        else {
            // console.log(value)
        }
        return undefined
    }
}