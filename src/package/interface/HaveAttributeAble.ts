import { Vector3 } from "three"

interface HaveAttributeAble {
    getAttribute: (name: string) => any | undefined
    setAttribute: (name: string, obj: any) => void
    executeWithAttribute: (name: string, lambda: (value: any) => void) => boolean
}

export default HaveAttributeAble