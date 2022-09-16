import ThreeDefault from "../three";
import { Performance } from "../util";
import eventListener from "../global/eventlistener";

export default class App {
    private root: HTMLElement

    private performance:Performance = new Performance()
    
    private threeDefault: ThreeDefault
    constructor(
        root: HTMLElement
    ) {
        this.root = root
        this.threeDefault = new ThreeDefault(this.root)
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()

        this.threeDefault.update()
        this.performance.end()
    }
}