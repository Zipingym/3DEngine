import Human from "../../engine/human/human";
import User from "../../engine/human/user";
import Controller, { ControlInfo } from "./controller";
import KeyboardController from "./keyboardController";
import WebcamController from "./webcamController";
export default class UserControl extends Controller {
    public static keyboardControl: number = 0
    public static webcamControl: number = 1
    private keyboardController: KeyboardController
    private webcamController: WebcamController

    constructor (
        user: User
    ) {
        super(user)
        this.keyboardController = new KeyboardController(user)
        this.webcamController = new WebcamController(user)
    }
    public control: (code: number, any: any) => ControlInfo | undefined = (code: number, value: any) => {
        if(code === UserControl.keyboardControl) {
            return this.keyboardController.control(code, value)
        }
        else if (code === UserControl.webcamControl) {
            return this.webcamController.control(code, value)
        }
        return undefined
    }
}