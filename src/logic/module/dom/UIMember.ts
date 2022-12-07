import Member from "@class/member/Member"

export default abstract class UIMember extends Member {
    protected abstract html:string
    private parentElement: HTMLElement
    constructor (
        parent: HTMLElement
    ) {
        super()
        this.parentElement = parent
    }
    protected onPatchTree = () => {
        const target = this.html
        const nodes = new DOMParser().parseFromString(target, 'text/html').body.childNodes
        nodes.forEach((node) => {
            this.parentElement.appendChild(node)
        })
        this.afterRender()
    }
    protected abstract afterRender: () => void
    public getAsClassName(className: string): HTMLElement {
        //@ts-ignore
        return this.parentElement.getElementsByClassName(className)[0]
    }
}