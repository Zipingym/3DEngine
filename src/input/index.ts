import eventListener from "../global/eventlistener";

export default class Input {
    private checks: Map<string, (degrees: Map<string, number>) => boolean> = new Map();


    private combo: number = 0
    private pushState: boolean = false

    constructor() {

    }
    public do(degrees: Map<string, number>) {
        const spine = Math.abs(degrees.get("Spine")! * 180 / Math.PI)
        if(spine > 60 && spine < 90) {
            const right = degrees.get("RightArm")!
            if(right > 180 || right < 15) {
                if(this.pushState)
                    this.combo++
                else
                    this.combo = 0
                if(this.combo > 5) {
                    this.pushState = false
                    this.combo = 0
                    eventListener.execute("run-walk", 1000)
                }
            }
            else {
                if(!this.pushState)
                    this.combo++
                else
                    this.combo = 0
                if(this.combo > 5) {
                    this.pushState = true
                    this.combo = 0
                    console.log("Up")
                }
            }
        }
    }
}
