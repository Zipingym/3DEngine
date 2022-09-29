export default class CircleQueue {
    private size: number
    private array: Array<any>
    private current: number = 0
    constructor(
        size: number
    ) {
        this.size = size
        this.array = new Array(this.size)
    }
    public at(index: number) {

    }
    private change = (val: number) => {
        const plus = this.current + val
        if(plus < 0) {
            return this.current
        }
        else if(plus > this.size) {
            return this.current + (plus - this.size)
        }
        else return plus
    } 
}