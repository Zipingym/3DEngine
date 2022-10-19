import Component from "./package";
import S from './ui.style.scss'
import WebcamIoUi from "./webcamIo/webcamIo";
export default class UI extends Component {
    public webcamIoUi: WebcamIoUi
    constructor (
        root: HTMLElement
    ) {
        super(root)
        this.render (
            `
                <div class="${S.main}">
                </div>
            `
        )
        const main = this.getAsClassName(S.main)
        //@ts-ignore
        this.webcamIoUi = this.appendChild(new WebcamIoUi(main))
        
        this.render()
    }
}