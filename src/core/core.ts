import { Vector3 } from "three";
import Engine from "../engine/engine";
import UI from "../ui/ui";
import AnalysisCore from "./analysis/analysisCore";
import IO from "./io/io";

export default class Core {
    private engine: Engine
    private ui: UI
    private io: IO
    private analysisCore:AnalysisCore = new AnalysisCore();
    private myName:string = "park";
    constructor(
        engine: Engine,
        ui: UI,
    ) {
        this.engine = engine
        this.ui = ui
        console.log(this.ui.webcamIoUi.getContainerElement())
        this.io = new IO(this.recieve.bind(this), this.ui.webcamIoUi)
        this.send = this.io.send.bind(this)
        this.engine.createWorld("default")
        this.engine.createHuman(this.myName)
        this.update()
    }

    private recieve(inputType: number, namespace: string, value: any) {
        if(inputType === IO.Webcam) { this.onWebcamInput(namespace, value) }
        else if(inputType === IO.KeyBoard) { this.onKeyboardInput(namespace, value) }
        else if(inputType === IO.Network) { this.onNetworkInput(namespace, value) }
    }
    private onWebcamInput(namespace: string, value: any) {
        // console.log(this.analysisCore.inputValue(value.jointDegrees))
    }
    private onKeyboardInput(namespace: string, value: any) {

    }
    private onNetworkInput(namespace: string, value: any) {
        console.log(namespace, value)
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.engine.update()
    }
    private send
}