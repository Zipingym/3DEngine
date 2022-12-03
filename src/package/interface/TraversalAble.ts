interface TraversalAble<T> {
    appendChild:(member: T) => void

    findRoot: () => T
    findParent: () => T | undefined

    findAllSiblings: () => Array<T>
    findAllChildren:() => Array<T>
    findAllAllDescendentes: () => Array<T>

    findOneSibling: (lambda: (tree: T) => boolean) => T | undefined
    findOneChild: (lambda: (tree: T) => boolean) => T | undefined
    findOneDescendente: (lambda: (tree: T) => boolean) => T | undefined

    findSiblings: (lambda: (tree: T) => boolean) => Array<T>
    findChildren: (lambda: (tree: T) => boolean) => Array<T>
    findDescendentes: (lambda: (tree: T) => boolean) => Array<T>
}
export default TraversalAble