import Core from "../core/core";
import Engine from "../engine/engine";
import UI from "../ui/ui";

export interface Models {
    worldModel: string,
    humanModel: string
}
export default class App {
    private root: HTMLElement
    private engine:Engine;
    private ui:UI;
    private core: Core
    constructor (
        root: HTMLElement,
        models: Models
    ) {
        this.root = root
        this.engine = new Engine(root,models);
        this.ui = new UI(root)
        this.core = new Core(this.engine, this.ui)
    }
}
