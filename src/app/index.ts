import ThreeDefault from "../three";
import Core from "../core";
import Socket from '../socket'

import { Performance } from "../util";

// import eventListener from "../global/eventlistener";

export default class App {
    private root: HTMLElement

    private performance:Performance = new Performance()
    
    private threeDefault: ThreeDefault
    private core: Core
    private socket?: Socket

    constructor(
        root: HTMLElement
    ) {
        this.root = root
        this.threeDefault = new ThreeDefault(this.root)
        this.core = new Core(this.threeDefault.getScene())
        this.socket = new Socket()
        this.update()

        // eventListener.add('emit', (data) => {
        //     console.log(data)
        // })

        // eventListener.execute('emit', {
        //     adasd: "asdasd"
        // })
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()

        this.core.update(interval)
        this.threeDefault.update(interval)
        this.performance.end()
    }
}