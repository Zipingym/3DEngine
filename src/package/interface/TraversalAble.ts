interface TraversalAble<T> {
    appendChild:(member: T) => void
    findParent: () => T | undefined

    findAllSiblings: () => Array<T>
    findAllChildren:() => Array<T>
    findAllAllDescendentes: () => Array<T>

    findSiblings: (lambda: (tree: T) => boolean) => Array<T>
    findChildren: (lambda: (tree: T) => boolean) => Array<T>
    findDescendentes: (lambda: (tree: T) => boolean) => Array<T>
}
export default TraversalAble