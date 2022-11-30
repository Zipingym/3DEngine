import { Vector3 } from "three"

interface HaveEulerAble {
    getAngle: () => Vector3
    setAngle: () => Vector3
}

export default HaveEulerAble