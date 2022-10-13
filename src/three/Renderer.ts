import * as THREE from 'three'

export default class Renderer extends THREE.WebGLRenderer{
	constructor (width: number, height: number, parent: HTMLElement) {
		super({
			antialias: true,
		})
		this.setClearColor(0xff0000, 1.0)
		this.setSize(width, height)
		this.shadowMap.enabled = true
		this.outputEncoding = THREE.sRGBEncoding
		parent.appendChild(this.domElement)
	}
}