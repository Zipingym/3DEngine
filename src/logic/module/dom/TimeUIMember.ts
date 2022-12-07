import UIMember from './UIMember'
import S from './timeui.style.scss'
import Hook from '@class/hook/Hook'
import Event from '@class/event/Event'
import TimeUIUpdateEventListener from './TimeUIUpdateEventListener'
import TimeUIStartEventListener from './TimeUIStartEventListener'
import TimeUIEndEventListener from './TimeUIEndEventListener'
export default class TimeUIMember extends UIMember {
    protected html: string = `
        <div class="${S.main}">
            00 : 00
        </div>
    `
    protected afterRender = () => {
        this.setAttribute("started", false)
        this.setAttribute("time", new Hook(0))
        this.getAttribute("time").hang(this.onTimeChange.bind(this))
        this.appendEventListener(new TimeUIUpdateEventListener(Event.UPDATE))
        this.appendEventListener(new TimeUIStartEventListener(Event.START))
        this.appendEventListener(new TimeUIEndEventListener(Event.END))
        
    }
    private convertTime(val:number):string{

        if (val < 0) return "시작하지 않음"
        const conVertedval = Math.floor((val % 1000)/10) 
        const second = Math.floor((val / 1000) % 60)
        const minutes = Math.floor((val / 1000) / 60)

        return `${String(minutes).padStart(2,"0")} : ${String(second).padStart(2,"0")} . ${String(conVertedval).padStart(2,"0")}`
    }
    private onTimeChange(time: number) {
        this.getAsClassName(S.main).innerText = this.convertTime(time)
    }
}