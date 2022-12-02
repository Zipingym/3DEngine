interface TraversalAble<T> {
    appendChild:(member: T) => void

    findRoot: () => T
    findParent: () => T | undefined

    findAllSiblings: () => Array<T>
    findAllChildren:() => Array<T>
    findAllAllDescendentes: () => Array<T>

    findOneSiblings: (lambda: (tree: T) => boolean) => T | undefined
    findOneChildren: (lambda: (tree: T) => boolean) => T | undefined
    findOneDescendentes: (lambda: (tree: T) => boolean) => T | undefined

    findSiblings: (lambda: (tree: T) => boolean) => Array<T>
    findChildren: (lambda: (tree: T) => boolean) => Array<T>
    findDescendentes: (lambda: (tree: T) => boolean) => Array<T>
}
export default TraversalAble