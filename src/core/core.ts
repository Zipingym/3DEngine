import Engine from "../engine/engine";
import UI from "../ui/ui";
import AnalysisCore from "./analysis/analysisCore";
import HumanControl from "./humanControl/humanController";
import IO from "./io/io";
import Performance from "../util/performance";
export default class Core {
    private engine: Engine
    private ui: UI
    private performance: Performance
    private io: IO
    private analysisCore: AnalysisCore = new AnalysisCore();
    private myController: HumanControl
    private myName:string = "park";
    constructor(
        engine: Engine,
        ui: UI,
    ) {
        this.engine = engine
        this.engine.createWorld("default")
        this.engine.createHuman(this.myName, undefined, true)

        this.ui = ui

        this.io = new IO(this.recieve.bind(this), this.ui.webcamIoUi)
        this.output = this.io.send.bind(this)

        this.myController = new HumanControl(this.engine.getHuman(this.myName)!)

        this.performance = new Performance()
        this.update()
    }

    private recieve(inputType: number, namespace: string, value: any) {
        if(inputType === IO.Webcam) { this.onWebcamInput(namespace, value) }
        else if(inputType === IO.KeyBoard) { this.onKeyboardInput(namespace, value) }
        else if(inputType === IO.Network) { this.onNetworkInput(namespace, value) }
    }

    private onWebcamInput(namespace: string, value: any) {
        const result = this.myController.control(HumanControl.webcamControl, this.analysisCore.inputValue(value.jointDegrees))
        if(result != undefined) {
            this.output(IO.Network, "control", { name: this.myName, ...result })
        }
    }
    private onKeyboardInput(namespace: string, value: any) {
        const result = this.myController.control(HumanControl.keyboardControl, value)
        if(result != undefined) {
            this.output(IO.Network, "control", result)
        }
    }
    private onNetworkInput(namespace: string, value: any) {
        if(namespace === "onconnect") {
            value.users.forEach((user: string) => {
                this.engine.createHuman(user)
            })
        }
        else if(namespace === "join") {
            this.engine.createHuman(value.name)
        }
        else if(namespace === "control") {
            const human = this.engine.getHuman(value.name)
            if(human != undefined) {
                (value.functionCode === HumanControl.UpdatePositionCode ? 
                human.updatePosition : value.functionCode === HumanControl.UpdateRotationCode ?
                human.updateRotation : human.updateScale)(value.value, value.duration)
            }
        }
        else if(namespace === "exit") {

        }
    }
    
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.performance.start()
        const interval = this.performance.getInterval()
        this.engine.update(interval)
        this.performance.end()
    }
    private output: (inputType: number, namespace: string, value: any) => void
}