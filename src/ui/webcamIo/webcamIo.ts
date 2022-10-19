import Component from "../package/component";
import S from './webcamIo.style.scss'
export default class WebcamIoUi extends Component {
    protected html: string = `
        <div class="${S.main}">
            <video class="${S.video}"></video>
            <div class="${S.container}"></div>
        </div>
    `
    constructor(
        parent: HTMLElement
    ) {
        super(parent)
    }
    public getVideoElement(): HTMLVideoElement {
        //@ts-ignore
        return this.getAsClassName(S.video)
    }
    public getContainerElement(): HTMLElement {
        return this.getAsClassName(S.container)
    }
}