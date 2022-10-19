export default class CircularQueue<T> {
    private body: Array<T>
    private size: number
    private pointer: number = 0
    constructor (
        size: number
    ) {
        this.body = new Array(size)
        this.size = size
    }
    public get(index: number) {
        index = index % this.size
        return this.body[this.pointer + index]
    }
    // private index
    public push(value: T) {
        this.body[this.pointer] = value
        this.pointer++
        if(this.pointer >= this.size) this.pointer = 0
    }
}