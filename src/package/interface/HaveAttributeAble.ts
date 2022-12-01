import { Vector3 } from "three"

interface HaveAttributeAble {
    getAttribute: (name: string) => object | undefined
    setAttribute: (name: string, obj: object) => void
    executeWithAttribute: (name: string, lambda: (value: object) => void) => boolean
}

export default HaveAttributeAble