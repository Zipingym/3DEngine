import Human from "../../engine/human/human"
import Controller, { ControlInfo } from "./controller"

export default class WebcamController extends Controller {
    constructor (
        human: Human
    ) {
        super(human)
    }
    public control: (code: number, value: any) => ControlInfo | undefined = (code: number, value: any) => {
        return undefined
    }
}