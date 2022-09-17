import ThreeDefault from "../three";
import Core from "../core";
import Socket from '../socket'
import Motion from '../motion'

import { Performance } from "../util";
import { Results } from "../../dist/mediapipe";
import Input from "../input";

export default class App {
    private root: HTMLElement

    private performance:Performance = new Performance()
    
    private threeDefault: ThreeDefault
    private core: Core
    private socket: Socket
    private motion: Motion
    private input: Input
    constructor(
        root: HTMLElement
    ) {
        this.root = root
        this.threeDefault = new ThreeDefault(this.root)
        this.core = new Core(this.threeDefault.getScene())
        this.socket = new Socket()
        this.motion = new Motion(this.root, this.onResult)
        this.input = new Input()
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()
        this.core.update(interval)
        this.threeDefault.update(interval)
        this.socket.update()
        this.motion.update()
        this.performance.end()
    }
    private onResult = (result: any) => {
        this.input.do(result.degrees)
        // console.log(result.degrees)
        // this.posture.check(result.poseWorldLandmarks)
        // console.log(result.poseWorldLandmarks)
    }
}