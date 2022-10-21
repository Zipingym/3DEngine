import { Euler } from "three"
import Human from "../../engine/human/human"
import { AnalysisCore } from "../analysis"
import Analysis from "../analysis/analysis"
import WebCamIo from "../io/webCamIo"
import Controller, { ControlInfo } from "./controller"

export default class WebcamController extends Controller {
    private one:{ type: string, did: number } = {type: "right-dumbbellCurl", did: 0}
    constructor (
        human: Human
    ) {
        super(human)
    }
    public control: (code: number, value: any) => ControlInfo | undefined = (code: number, value: any) => {
        this.one.did--
        if(value.length === 2) this.human.updatePosition(this.dirCalculator(1), 400)
        else if(value.length === 1) {
            if(this.one.did >= 0) {
                this.human.updatePosition(this.dirCalculator(5), 1000)
                this.one.did = -1
            }
            else {
                this.one.type = value[0]
                this.one.did = 2
            }
        }
        if(this.one.did === 0) {
            if(this.one.type == AnalysisCore.leftDumbbellCurlId) {
                this.human.updateRotation(new Euler(0, 0.3, 0), 400)
            }
            else {
                this.human.updateRotation(new Euler(0, -0.3, 0), 400)
            }
        }
        console.log(value)
        return undefined
    }
}