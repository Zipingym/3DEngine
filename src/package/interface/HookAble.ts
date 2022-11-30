interface Hookable<T> {
    get: () => T
    set: (arg: T) => void
    hang: (func: () => void) => void
    rise: (func: () => void) => number
}
export default Hookable