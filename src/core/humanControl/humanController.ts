import Human from "../../engine/human/human";
import Controller, { ControlInfo } from "./controller";
import KeyboardController from "./keyboardController";
import WebcamController from "./webcamController";
export default class HumanControl extends Controller {
    public static keyboardControl: number = 0
    public static webcamControl: number = 1
    private keyboardController: KeyboardController
    private webcamController: WebcamController

    constructor (
        human: Human
    ) {
        super(human)
        this.keyboardController = new KeyboardController(human)
        this.webcamController = new WebcamController(human)
    }
    public control: (code: number, any: any) => ControlInfo | undefined = (code: number, value: any) => {
        if(code === HumanControl.keyboardControl) {
            return this.keyboardController.control(code, value)
        }
        else if (code === HumanControl.webcamControl) {
            return this.webcamController.control(code, value)
        }
        return undefined
    }
}