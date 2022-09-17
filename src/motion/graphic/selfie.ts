import * as THREE from 'three'
import { PerspectiveCamera, Vector2, Vector3 } from 'three'
import { NormalizedLandmark } from '../../../dist/mediapipe'
import Calculation from '../calculation'
export default class Selfie {
    private length: number = 32

    protected xMaterial: THREE.Material = new THREE.MeshStandardMaterial({ color: 0xFF0000 })
    protected yMaterial: THREE.Material = new THREE.MeshStandardMaterial({ color: 0x00FF00 })
    protected zMaterial: THREE.Material = new THREE.MeshStandardMaterial({ color: 0x0000FF })

    protected origin: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16)
    protected xAsix: THREE.BoxGeometry = new THREE.BoxGeometry(this.length, 1, 1)
    protected yAsix: THREE.BoxGeometry = new THREE.BoxGeometry(1, this.length, 1)
    protected zAsix: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, this.length)
    private test: THREE.BoxGeometry = new THREE.BoxGeometry(8,8,8)

    public meshs: Array<THREE.Mesh> = new Array()
    public camera: Camera

    private positions: Array<number>
    constructor(
        positions: Array<number>
    ) {
        this.positions = positions
        const position = new Vector3(0, 0, 0)
        let temp = new THREE.Mesh(this.xAsix, this.xMaterial)
        temp.position.set(position.x, position.y, position.z)
        
        // const sex = new THREE.Mesh(this.test, new THREE.MeshStandardMaterial({ color: 0x000000 }))
        this.camera = new Camera()
        this.camera.position.set(32, 0, 0)
        temp.add(this.camera)
        this.meshs.push(temp)
    }
    public set(positions: Array<NormalizedLandmark>) {
        let jump = false
        this.positions.forEach((element) => {
            if(positions[element].visibility != undefined)
                if(positions[element].visibility! < 0.7) {
                    jump = true
                }
        })
        if(jump) return
        const fir = this.positions[0]
        this.meshs[0].position.set(positions[fir].x, positions[fir].y, positions[fir].z)

        let euler
        if(this.positions.length == 3) {
            euler = Calculation.getBodyinfo(
                positions[this.positions[0]],
                {
                    x: (positions[this.positions[1]].x + positions[this.positions[2]].x) / 2,
                    y: (positions[this.positions[1]].y + positions[this.positions[2]].y) / 2,
                    z: (positions[this.positions[1]].z + positions[this.positions[2]].z) / 2
                },
                {
                    x: (positions[this.positions[1]].x + positions[this.positions[0]].x) / 2,
                    y: (positions[this.positions[1]].y + positions[this.positions[0]].y) / 2,
                    z: (positions[this.positions[1]].z + positions[this.positions[0]].z) / 2
                },
                {
                    x: (positions[this.positions[0]].x + positions[this.positions[2]].x) / 2,
                    y: (positions[this.positions[0]].y + positions[this.positions[2]].y) / 2,
                    z: (positions[this.positions[0]].z + positions[this.positions[2]].z) / 2
                },
            )
        }
        else {
            euler = Calculation.getBodyinfo(
                positions[this.positions[0]],
                positions[this.positions[1]],
                positions[this.positions[2]],
                positions[this.positions[3]],
            )
        }
        this.meshs[0].rotation.set(euler.x, euler.y, 0)
        this.camera.lookAt(new Vector3(positions[this.positions[0]].x, positions[this.positions[0]].y, positions[this.positions[0]].z))
        const test:Array<any> = []
        this.positions.forEach((element, idx) => {
            test.push(Calculation.createVector(positions[element].x, positions[element].y, positions[element].z, this.camera))
        })

        let result = 180 - (Calculation.TwoDegree(test[0], test[1], test[2]) * 180 / (Math.PI))
        return result
    }
    public render(scene: THREE.Scene) {
        this.meshs.forEach((mesh: THREE.Mesh) => {
            scene.add(mesh)
        })
    }
}


class Camera extends PerspectiveCamera{
	constructor () {
		super(100, 1, 1, 1000)
		this.near = 0.1
		this.far = 500
	}
}