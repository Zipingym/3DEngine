import * as THREE from 'three'

export default class Renderer extends THREE.WebGLRenderer{
	constructor (width: number, height: number, canvas: HTMLElement) {
		super({
			antialias: true
		})
		this.outputEncoding = THREE.sRGBEncoding
		this.setSize(width, height)
	}
}