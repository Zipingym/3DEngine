import Engine from "../engine/engine";
import UI from "../ui/ui";

export default class Core {
    private engine: Engine
    private ui: UI
    constructor(
        engine: Engine,
        ui: UI
    ) {
        this.engine = engine
        this.ui = ui
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.engine.update()
    }
}