import eventListener from "../global/eventlistener"

export default class Input {
    private checks:Map<string, (degrees: Map<string, number>) => boolean> = new Map()
    constructor (

    ) {

    }
    public do(degrees: Map<string, number>) {
        let temp = degrees.get("leftArm")
        if(temp != undefined)
            if(!(temp > 90 && temp < 180))
                eventListener.execute('input-walk', 1000)
    }
}