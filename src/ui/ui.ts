import Component from "./package";
import S from './ui.style.scss'
import WebcamIoUi from "./webcamIo/webcamIo";
import Timer from "./timer/timer";
export default class UI extends Component {
    public webcamIoUi: WebcamIoUi
    public timer: Timer
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
        //@ts-ignore
        this.timer = this.appendChild(new Timer(main))
        
        this.render()
    }
}