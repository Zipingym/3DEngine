import * as THREE from 'three'

class Camera extends THREE.PerspectiveCamera{
	constructor (FOV: number, aspect: number) {
		super(FOV, aspect, 1, 1000)
		this.near = 0.001
		this.far = 500
		this.position.z = 10
	}
}
export default Camera