import * as THREE from 'three'
import { Vector3 } from 'three'

class Camera extends THREE.PerspectiveCamera{
	constructor (FOV: number, aspect: number) {
		super(FOV, aspect, 1, 1000)
		this.near = 0.001
		this.far = 500
		this.position.y = 3
		this.position.z = 10
		this.lookAt(new Vector3(0, 0, 0))
	}
}
export default Camera