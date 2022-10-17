import { Webcam } from '../../util';
/**document비디오 element를 관리 */
export default class Video {
    private parent: HTMLElement
    private element:HTMLVideoElement
    private onFrame:(video: HTMLVideoElement) => Promise<void>
    private currentTime: number = 0
    constructor(
        parent: HTMLElement,
        onFrame:(video: HTMLVideoElement) => Promise<void>,
        videoSrc?: string,
    ) {
        this.parent = parent
        this.onFrame = onFrame
        this.element = document.createElement('video')

        if(videoSrc === undefined) {
            const webcam = new Webcam(this.element)
        }
        else {
            this.element.src = videoSrc
        }

        const style = "width: 360px; position: absolute; left: 0; top: 0"
        
            
        this.element.autoplay = true
        this.element.muted = true
        this.element.playsInline = true
        this.element.controls = true
        this.element.style.cssText = style
        // this.element.style.position = "absolute"
        // this.element.style.left = "0px"
        // this.element.style.top = "0px"


        
        this.parent.appendChild(this.element)

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