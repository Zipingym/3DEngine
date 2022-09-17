import { Results } from '@mediapipe/pose'
import { UpdateAble } from '../interface';
import Core from './core'
import Graphic from './graphic'

//@ts-ignore
import testVideo from '../../static/video/front.mp4'

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
            
            this.out({
                ...results,
                degrees: this.graphic.set(results.poseWorldLandmarks)
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