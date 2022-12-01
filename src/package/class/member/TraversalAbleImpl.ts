import TraversalAble from "@interface/TraversalAble";

export default abstract class TraversalAbleImpl<T extends TraversalAbleImpl<T>> implements TraversalAble<T> {
    protected children: Array<T> = new Array();
    private parent: T | undefined
    constructor (

    ) {
        
    }
    //@ts-ignore
    public findRoot() {
        if(this.parent === undefined) {
            return this
        }
        else {
            return this.parent.findRoot()
        }
    }
    public findAllSiblings() {
        if(this.parent === undefined) {
            return new Array()
        }
        else {
            return this.parent.findAllChildren()
        }
    }
    public findSiblings(lambda: (tree: T) => boolean) {
                if(this.parent === undefined) {
            return new Array()
        }
        else {
            return this.parent.findChildren(lambda)
        }
    }
    public findParent() {
        return this.parent
    }
    public setParent(parent: T) {
        this.parent = parent
    }
    public abstract appendChild(member: T): void
    public findAllChildren(): Array<T> {
        return this.children
    }
    public findAllAllDescendentes(): Array<T> {
        const result: Array<T> = new Array()
        result.push(...this.findAllChildren())
        this.children.forEach((child) => result.push(...child.findAllAllDescendentes()))
        return result;
    }
    public findChildren(lambda: (arg: T) => boolean): Array<T> {
        return this.children.filter(lambda)
    }
    public findDescendentes(lambda: (arg: T) => boolean): Array<T> {
        const result: Array<T> = new Array()
        this.children.forEach((child) => result.push(...child.findChildren(lambda)))
        return result
    }
}