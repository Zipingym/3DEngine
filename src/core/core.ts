import Engine from "../engine/engine";
import UI from "../ui/ui";
import AnalysisCore from "./analysis/analysisCore";
import UserControl from "./humanControl/userController";
import IO from "./io/io";
import Performance from "../util/performance";
import { Euler, Vector3 } from "three";
import NetworkIo from "./io/networkIo";
export default class Core {
    private engine: Engine
    private ui: UI
    private performance: Performance
    private io: IO
    private analysisCore: AnalysisCore = new AnalysisCore();
    private myController: UserControl
    private myName:string = "park";

    private intervalStack:number = 0;

    constructor(
        engine: Engine,
        ui: UI,
        name: string
    ) {
        this.myName = name
        this.engine = engine
        this.engine.createWorld("default")
        this.engine.createHuman(this.myName, undefined, true)
        // this.engine.getHuman

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
            this.output(IO.Network, "login", {name: this.myName})
        }
        else if(namespace === "onconnect") {
            value.users.forEach((user: any) => {
                // console.log(user)
                this.engine.createHuman(user.name)
                // console.log(user)
                // this.engine.getHuman(user.name)!.setPosition(new Vector3(user.position.x, user.position.y, user.position.z))
                // this.engine.getHuman(user.name)!.setRotation(new Euler(user.rotation.x, user.rotation.y, user.rotation.z))
                // this.engine.getHuman(user.name)!.setScale(new Vector3(user.scale.x, user.scale.y, user.scale.z))
            })
        }
        else if(namespace === "join") {
            this.engine.createHuman(value.name)
        }
        else if(namespace === "out") {
        }
        else if(namespace === "control") {
            console.log(value)
            const human = this.engine.getHuman(value.name)
            if(human != undefined) {
                (value.functionCode === UserControl.UpdatePositionCode ? 
                human.updatePosition : value.functionCode === UserControl.UpdateRotationCode ?
                human.updateRotation : human.updateScale).bind(human)(value.value, value.duration)
            }
        }
        else if(namespace === "exit") {

        }
        else if(namespace === "sync") {
            const human = this.engine.getHuman(value.name)
            const {
                position,
                rotation,
                scale
            } = value
            human?.setPosition(new Vector3(position.x, position.y, position.z))
            human?.setRotation(new Euler(rotation._x, rotation._y, rotation._z))
        }
    }

    private checkInterval(interval:number){
        this.intervalStack += interval
        if (this.intervalStack >= 1000){
            const me = this.engine.getHuman(this.myName);
            const sendInfo = {
                position:me?.getPosistion(),
                rotation:me?.getRotation(),
                scale:me?.getScale(),
            }
            this.io.send(IO.Network,"sync",sendInfo);
            this.intervalStack = 0
        }
    }

    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.performance.start()
        const interval = this.performance.getInterval()
        this.checkInterval(interval)

        this.engine.update(interval)
        const val = this.engine.getHuman(this.myName)?.race
        if(val != undefined) {
            this.ui.timer.setTime(val)
        }
        
        this.performance.end()
    }
    private output: (inputType: number, namespace: string, value: any) => void
}