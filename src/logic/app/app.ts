import Member from "@class/member/Member";
import * as module from '../module'
export default class App extends Member {
    public static rootELement = "rootElement"
    constructor (
        config: Config
    ) {
        super(0)
        this.setAttribute(App.rootELement, config.rootELement)
        this.appendChild(new module.UpdateMember())
    }
}

export interface Config {
    rootELement: HTMLElement
}