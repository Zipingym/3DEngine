import { Results } from '@mediapipe/pose'
import { Vector3 } from 'three';
import { UpdateAble } from '../interface';
import Calculation from './calculation';
import Core from './core'
import Graphic from './graphic'
import joints from './joints';
export default class Motion implements UpdateAble{
    private parent: HTMLElement
    private core: Core
    private graphic: Graphic
    private delta: number = -100
    constructor(
        parent: HTMLElement,
        onResult: (poseInfo: Results) => void
    ) {
        this.parent = parent
        this.out = onResult
        this.core = new Core(
            this.parent,
            this.onResult.bind(this)
        )
        const three = document.createElement('div')
        three.style.width = '360px'
        three.style.height = '360px'

        this.parent.appendChild(three)
        this.graphic = new Graphic(
            three
        )
    }
    private out: (poseInfo: any) => void
    private onResult(results: Results) {
        if(results.poseWorldLandmarks != undefined) {

            results.poseWorldLandmarks.forEach((element, idx) => {
                results.poseWorldLandmarks[idx].x *= this.delta
                results.poseWorldLandmarks[idx].y *= this.delta
                results.poseWorldLandmarks[idx].z *= this.delta
            })
            const points = results.poseWorldLandmarks
            const degrees:Map<string, number> = new Map()
            joints.forEach((value: Array<number>, key: string) => {
                if((points[value[0]].visibility! + 
                    points[value[1]].visibility! + 
                    points[value[2]].visibility!) / 3 > 0.75) 
                {
                    degrees.set(key, Calculation.ThreeDegree(
                        new Vector3(points[value[0]].x, points[value[0]].y, points[value[0]].z),
                        new Vector3(points[value[1]].x, points[value[1]].y, points[value[1]].z),
                        new Vector3(points[value[2]].x, points[value[2]].y, points[value[2]].z)
                    ))
                }
            })
            this.graphic.set(results.poseWorldLandmarks)
            this.out({
                ...results,
                degrees 
            })
        }
    }
    public update() {
        this.graphic.update()
    }
    public getCamera() {
        return this.graphic.camera
    }

}