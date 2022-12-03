import LoadAble from "@interface/LoadAble";

export default abstract class LoadAbleAsset<T> implements LoadAble<T> {
    protected abstract asset?: T
    protected onloadQueue: Array<(arg: T) => any> = new Array()
    protected fileName: string
    constructor (
        fileName: string
    ) {
        this.fileName = fileName
    }
    protected executeLoadQueue() {
        if(this.asset != undefined) {
            this.onloadQueue.forEach((lambda: (arg: T) => any) => {
                lambda(this.asset!)
            })
            this.onloadQueue.length = 0
        }
    }
    public onAfterLoad (lambda: (arg: T) => any) {
        this.onloadQueue.push(lambda)
        this.executeLoadQueue()
    }
    public getAsset() {
        return this.asset
    }
}