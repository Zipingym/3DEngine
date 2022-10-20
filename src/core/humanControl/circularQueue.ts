export default class CircularQueue<T extends Array<string>> {
    private body: Array<T>
    private size: number
    private pointer: number = 0
    constructor (
        size: number
    ) {
        this.size = size
        this.body = new Array(size).fill(new Array())

    }
    public get(index: number): T {
        index = index % this.size
        return this.body.at(this.pointer + index)!
    }
    public exist(range: number, value: string) {
        for(let i = 1; i <= range; i++) {
            if(this.get(-i).includes(value)) return true
        }
        return false
    }
    public push(value: T) {
        this.body[this.pointer] = value
        this.pointer++
        if(this.pointer >= this.size) this.pointer = 0
    }
}