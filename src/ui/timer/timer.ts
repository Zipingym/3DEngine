import Component from "../package/component";
import S from './timer.style.scss'
export default class Timer extends Component {
    protected html: string = `
        <div class="${S.main}">
            00 : 00
        </div>
    `
    constructor(
        parent: HTMLElement
    ) {
        super(parent)
    }
    public setTime(val: number)  {
        // 마이크로를 밀리로 변경

        // const newVal = Math.round(val / 1000)
        this.getAsClassName(S.main).innerText = this.convertTime(val)

        // this.getAsClassName(S.main).innerText = `${Timer.zeroPlus(Math.round(newVal / 60), 2)} : ${Timer.zeroPlus(newVal % 60, 2)} . ${Timer.zeroPlus(val % 1000, 3)}`
    }

    private convertTime(val:number):string{

        if (val < 0) return "시작하지 않음"
        const conVertedval = Math.floor((val % 1000)/10) 
        const second = Math.floor((val / 1000) % 60)
        const minutes = Math.floor((val / 1000) / 60)
        console.log("second",second)
        console.log("minutes",minutes)

        return `${String(minutes).padStart(2,"0")} : ${String(second).padStart(2,"0")} . ${String(conVertedval).padStart(2,"0")}`
    }

    private static zeroPlus(val: number, count: number): string {
        const strval = String(val)
        // strval.padStart(2,'0')
        // return strval

        let temp = ""
        for(let i = 0; i < count - strval.length; i++) {
            temp += "0"
        }
        return temp + strval
    }
}