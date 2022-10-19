import { Webcam } from '../../util';
/**document비디오 element를 관리 */
export default class Video {
    private element:HTMLVideoElement
    private onFrame:(video: HTMLVideoElement) => Promise<void>
    private currentTime: number = 0
    constructor(
        video: HTMLVideoElement,
        onFrame:(video: HTMLVideoElement) => Promise<void>,
        videoSrc?: string,
    ) {
        this.element = video
        this.onFrame = onFrame

        if(videoSrc === undefined) {
            const webcam = new Webcam(this.element)
        }
        else {
            this.element.src = videoSrc
        }
        this.element.autoplay = true
        this.element.muted = true
        this.element.playsInline = true
        this.element.controls = true
        this.update()
    }
    update() {
        if(
            this.element.readyState === 4 &&
            this.element.currentTime != this.currentTime
        ) {
            this.onFrame(this.element)
            .then(() => {
                this.currentTime = this.element.currentTime
                requestAnimationFrame(this.update.bind(this))
            })
        }
        else 
            requestAnimationFrame(this.update.bind(this))
    }

}