import GltfAsset from "@class/asset/GltfAsset";
import Member from "@class/member/Member";
import * as module from '../module'
export default class App extends Member {
    public static rootElement = "rootElement"
    public static worldModel = "worldModel"
    public static characterModel = "characterModel"
    constructor (
        config: Config
    ) {
        super(0)
        config.rootELement.style.position = "relative"

        this.setAttribute(App.rootElement, config.rootELement)
        this.setAttribute(App.worldModel, new GltfAsset(config.worldModel))
        this.setAttribute(App.characterModel, new GltfAsset(config.characterModel))

        this.appendChild(new module.ThreeMember())
        this.appendChild(new module.InputMember())
        this.appendChild(new module.UpdateMember())

    }
    protected onPatchTree = () => {}
}

export interface Config {
    rootELement: HTMLElement
    worldModel: string
    characterModel: string
}