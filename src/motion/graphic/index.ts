import { Euler, Vector2, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Core from './core'
import Point from './point'
import { NormalizedLandmark, NormalizedLandmarkList } from '@mediapipe/pose'
import Line from './line'
import Axis from './axis'
import link, { boneInfo } from '../link'
import Selfie from './selfie'
import Calculation from '../calculation'
export default class Graphic {
    private scene:Core.Scene
    public camera:Core.Camera
    private renderer:Core.Renderer
    private light:Core.Light
    private control:OrbitControls
    private parent: HTMLElement

    private link: Array<boneInfo> = new Array()

    private points: Array<Point> = new Array()
    private lines: Array<Line> = new Array()
    private axis: Axis
    private selfies: Array<Selfie> = new Array()
    constructor (
        parent: HTMLElement
    ) {
        this.parent = parent
        this.link = link
        this.scene = new Core.Scene()
        this.camera = new Core.Camera(95, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Core.Renderer(this.parent.clientWidth, this.parent.clientHeight, this.parent)
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.light = new Core.Light()
        this.light.addLight(this.scene)

        for(let i = 0; i < 33; i++) {
            this.points.push(new Point(new Vector3(0, 0, 0)))
            this.points[i].render(this.scene)
        }
        this.link.forEach((element) => {
            const line = new Line()
            this.lines.push(line)
            line.render(this.scene)
        })
        this.axis = new Axis(new Vector3(0, 0, 0))
        this.axis.render(this.scene)
        selfies.forEach((element, idx) => {
            this.selfies.push(new Selfie(element.bones))
            this.selfies[idx].render(this.scene)
        })
        // this.selfies.push("")
    }
    public set(positions: NormalizedLandmarkList): Map<string, any> {
        this.setPoints(positions)
        this.setBone(positions)
        const ret = new Map()
        this.selfies.forEach((element, idx) => {
            const val = element.set(positions)
            if(val != undefined)
                ret.set(selfies[idx].name, val)
        })
        ret.set("Spine", -1 * Calculation.TwoDegree(new Vector2(positions[24].y, positions[24].x), new Vector2(positions[24].y + 2, positions[24].x), new Vector2(positions[12].y, positions[12].x)))
        return ret
    }

    private setBone(positions: NormalizedLandmarkList) {
        this.link.forEach((element, idx) => {
            this.lines[idx].set([
                Graphic.LandmarkToVec3(positions[element.parent]),
                Graphic.LandmarkToVec3(positions[element.child]),
            ])
        })
    }
    private setPoints(positions: NormalizedLandmarkList) {
        this.points.forEach((element: Point, idx: number) => {
            let color: number;
            if(positions[idx].visibility === undefined) {
                color = 0xFF0000
            }
            else if(positions[idx].visibility! < 0.9) {
                color = 0xFF0000
            }
            else {
                color = 0x00AA00
            }
            element.set(
                Graphic.LandmarkToVec3(positions[idx]),
                color
            )
        })
    }
    public update() {
        this.render()
    }
    private render() {
        this.renderer.render(this.scene, this.camera)
    }

    private static LandmarkToVec3(landMark: NormalizedLandmark): Vector3 {
        return new Vector3(
            landMark.x,
            landMark.y,
            landMark.z
        )
    }
}

const selfies = [
    {
        name: "leftArm",
        bones: [13, 11, 15]
    },
    {
        name: "RightArm",
        bones: [14, 12, 16]
    }
]