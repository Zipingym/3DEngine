import Component from "./package";
import S from './ui.style.scss'
export default class UI extends Component {
    protected html = `
        <div "${S.main}"></div>
    `
    constructor (
        root: HTMLElement
    ) {
        super(root)
    }
}