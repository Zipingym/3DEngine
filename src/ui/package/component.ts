export default class Component {
    protected html:string = ""
    protected children: Array<Component> = new Array()
    private nodes: Array<ChildNode> = new Array()
    private parent: HTMLElement
    constructor (
        parent: HTMLElement
    ) {
        this.parent = parent
    }
    public render(html?: string) {
        const target = html ? html : this.html
        const nodes = new DOMParser().parseFromString(target, 'text/html').body.childNodes
        nodes.forEach((node) => {
            this.nodes.push(node)
            this.parent.appendChild(node)
        })
        this.children.forEach((child) => {
            child.render()
        })
    }
    public destructor (

    ) {
        this.nodes.forEach((node) => {
            this.parent.removeChild(node)
        })
        this.children.forEach((child) => {
            child.destructor()
        })
    }
    public appendChild(child: Component): Component {
        this.children.push(child)
        return child
    }
    public _update() {
        this.update()
        this.children.forEach((child: Component) => {
            child._update()
        })
    }
    public update() {

    }
    public getAsClassName(className: string): HTMLElement {
        //@ts-ignore
        return this.parent.getElementsByClassName(className)[0]
    }
}