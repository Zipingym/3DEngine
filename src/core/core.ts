import { Vector3 } from "three";
import Engine from "../engine/engine";
import UI from "../ui/ui";
import IO from "./io/io";

export default class Core {
    private engine: Engine
    private ui: UI
    private io: IO
    private myName:string = "park";
    constructor(
        engine: Engine,
        ui: UI,
    ) {
        this.engine = engine
        this.ui = ui
        this.io = new IO(this.recieve.bind(this), this.send.bind(this))
        this.engine.createWorld("default")
        this.engine.createHuman(this.myName)
        this.update()
    }

    private recieve(inputType: number, namespace: string, value: any) {
        if(inputType === IO.Webcam) {
            // console.log(value.jointDegrees)
        }
    }
    private send(inputType: number, namespace: string, value: any) {

    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.engine.update()
    }
}