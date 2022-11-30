import UpdateAble from "@interface/UpdataAble"
import TraversalAble from "@interface/TraversalAble"

abstract class MemberClass implements UpdateAble, TraversalAble<MemberClass> {
    private children: Array<MemberClass> = new Array();

    constructor(

    ) {

    }
    public appendChild(member: MemberClass) {
        this.children.push(member)
    }
    public findAllChildren(): Array<MemberClass> {
        return this.children
    }
    public findAllAllDescendentes(): Array<MemberClass> {
        const result: Array<MemberClass> = new Array()
        result.push(...this.findAllChildren())
        this.children.forEach((child) => result.push(...child.findAllAllDescendentes()))
        return result;
    }
    public findChildren(lambda: (arg: MemberClass) => boolean): Array<MemberClass> {
        return this.children.filter(lambda)
    }
    public findDescendentes(lambda: (arg: MemberClass) => boolean): Array<MemberClass> {
        const result: Array<MemberClass> = new Array()
        this.children.forEach((child) => result.push(...child.findChildren(lambda)))
        return result
    }
    protected _update (interval: number) {
        this.update(interval);
        this.findAllChildren().forEach((child) => child.update(interval))
    }
    public update (interval: number) {

    }
}
export default MemberClass