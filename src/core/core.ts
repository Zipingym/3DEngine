import Engine from "../engine/engine";
import UI from "../ui/ui";
import AnalysisCore from "./analysis/analysisCore";
import UserControl from "./humanControl/userController";
import IO from "./io/io";
import Performance from "../util/performance";
import { Euler, Vector3 } from "three";
export default class Core {
    private engine: Engine
    private ui: UI
    private performance: Performance
    private io: IO
    private analysisCore: AnalysisCore = new AnalysisCore();
    private myController: UserControl
    private myName:string = "park";
    constructor(
        engine: Engine,
        ui: UI,
        name: string
    ) {
        this.myName = name
        this.engine = engine
        this.engine.createWorld("default")
        this.engine.createHuman(this.myName, undefined, true)

        this.ui = ui

        this.io = new IO(this.recieve.bind(this), this.ui.webcamIoUi)
        this.output = this.io.send.bind(this)

        //@ts-ignore
        this.myController = new UserControl(this.engine.getHuman(this.myName))

        this.performance = new Performance()
        this.update()
    }

    private recieve(inputType: number, namespace: string, value: any) {
        if(inputType === IO.Webcam) { this.onWebcamInput(namespace, value) }
        else if(inputType === IO.KeyBoard) { this.onKeyboardInput(namespace, value) }
        else if(inputType === IO.Network) { this.onNetworkInput(namespace, value) }
    }

    private onWebcamInput(namespace: string, value: any) {
        const result = this.myController.control(UserControl.webcamControl, this.analysisCore.inputValue(value.jointDegrees))
        if(result != undefined) {
            this.output(IO.Network, "control", { name: this.myName, ...result })
        }
    }
    private onKeyboardInput(namespace: string, value: any) {
        const result = this.myController.control(UserControl.keyboardControl, value)
        if(result != undefined) {
            this.output(IO.Network, "control", result)
        }
    }
    private onNetworkInput(namespace: string, value: any) {
        if(namespace === "connect") {
            console.log(this.myName)
            this.output(IO.Network, "login", {name: this.myName})
        }
        else if(namespace === "onconnect") {
            value.users.forEach((user: any) => {
                this.engine.createHuman(user.name)
                // this.engine.getHuman(user.name)!.setPosition(new Vector3(user.position.x, user.position.y, user.position.z))
                // this.engine.getHuman(user.name)!.setRotation(new Euler(user.rotation.x, user.rotation.y, user.rotation.z))
                // this.engine.getHuman(user.name)!.setScale(new Vector3(user.scale.x, user.scale.y, user.scale.z))
            })
        }
        else if(namespace === "join") {
            this.engine.createHuman(value.name)
        }
        else if(namespace === "control") {
            const human = this.engine.getHuman(value.name)
            if(human != undefined) {
                (value.functionCode === UserControl.UpdatePositionCode ? 
                human.updatePosition : value.functionCode === UserControl.UpdateRotationCode ?
                human.updateRotation : human.updateScale).bind(human)(value.value, value.duration)
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