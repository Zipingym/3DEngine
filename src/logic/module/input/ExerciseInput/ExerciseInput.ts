import App from "@/logic/app"
import Event from "@class/event/Event"
import Member from "@class/member/Member"
import { GpuBuffer, LandmarkList, NormalizedLandmarkList, Pose, Results } from "@mediapipe/pose"
import DumbleCurl from "./analysis/DumbleCurl"
import { ExerciseInputChild } from "./ExerciseInputChild"
import PoseResult from "./PoseResult"
import Video from "./Video"
import Performance from "@/util/performance"

export default class ExerciseInput extends Member {
    private pose: Pose
    private performance: Performance = new Performance()
    public static PoseResultEventCode = 21
    
    constructor (

    ) {
        super()
        this.pose = new Pose({locateFile: (file) => {
            return `./mediapipe/${file}`;
        }})
        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        })

        this.pose.onResults(this.onResult.bind(this));

        this.appendChild(new ExerciseInputChild(new DumbleCurl()))
    }
    protected onPatchTree = () => {
        const videoElement = document.createElement("video")
        videoElement.style.position = "absolute"
        videoElement.style.zIndex = "1"
        videoElement.style.width = "240px"
        videoElement.style.height = "150px"
        this.findRoot().getAttribute(App.rootElement).appendChild(videoElement)

        new Video(videoElement, async (arg: HTMLVideoElement) => { await this.pose.send({image: arg}) })
    }
    private onResult = (result: Results) => {
        this.performance.start()
        const event = new Event(this, ExerciseInput.PoseResultEventCode, new PoseResult(result, this.performance.getInterval()))
        event.occur()
        this.performance.end()
    }
}