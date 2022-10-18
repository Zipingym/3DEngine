export default abstract class Component {
    protected abstract html:string
    protected children: Array<Component> = new Array()
    private nodes: Array<ChildNode> = new Array()
    private parent: HTMLElement
    constructor (
        parent: HTMLElement
    ) {
        this.parent = parent
    }
    public render() {
        const nodes = new DOMParser().parseFromString(this.html, 'text/html').body.childNodes
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
    public appendChild(child: Component) {
        this.children.push(child)
    }
    public _update() {
        this.update()
        this.children.forEach((child: Component) => {
            child._update()
        })
    }
    public update() {

    }
}