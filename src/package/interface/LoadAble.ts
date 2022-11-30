interface LoadAble<T> {
    onAfterLoad: (lambda: (arg: T) => any) => void
}
export default LoadAble