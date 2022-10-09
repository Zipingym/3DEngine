import ThreeDefault from "../three";
import Core from "../core";
import Socket from '../socket'
import Motion from '../motion'

import { Performance } from "../util";
import { Results } from "../../dist/mediapipe";
import Input from "../input";
import { Human } from "../asset";
import { Vector3 } from "three";
import Calculation from '../motion/calculation'

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
        const ui = document.createElement('div')
        ui.style.position = "absolute"
        this.root.appendChild(ui)
        this.threeDefault = new ThreeDefault(this.root)
        this.core = new Core(this.threeDefault.getScene(), this.threeDefault.getCamera())
        this.socket = new Socket(this.core, this.threeDefault.getScene())
        this.motion = new Motion(ui, this.onResult)
        this.input = new Input()
        this.update()

        document.addEventListener('keydown', (e) => {
            if(e.key === 'w') {
                Human.Me.controll({
                    movement: {
                        pos: Human.Me.dirCalculator(0.01),
                        rot: 0
                    },
                    time: 1000
                })
            }
            else if(e.key === 'a') {
                Human.Me.controll({
                    movement: {
                        pos: new Vector3(0, 0, 0),
                        rot: Calculation.DegreeToRadian(0.04)
                    },
                    time: 1000
                })
            }
            else if(e.key === 'd') {
                Human.Me.controll({
                    movement: {
                        pos: new Vector3(0, 0, 0),
                        rot:  Calculation.DegreeToRadian(-0.04)
                    },
                    time: 1000
                })
            }
            else if(e.key === 's') {
                Human.Me.controll({
                    movement: {
                        pos: Human.Me.dirCalculator(-0.01),
                        rot: 0
                    },
                    time: 1000
                })
            }
        })
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()
        this.core.update(interval)
        this.threeDefault.update(interval)
        this.socket.update(interval)
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