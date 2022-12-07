import { inputAble } from "../interface";
import VideoControl from './videoControl'
import { GpuBuffer, LandmarkList, NormalizedLandmarkList, Pose, Results } from "@mediapipe/pose"
import { Vector3 } from "three";
import Graphic from "./graphic/graphic";
import WebcamIoUi from "../../ui/webcamIo/webcamIo";
export default class WebCamIo implements inputAble {
    private inputType: number
    public recieve:(inputType: number, namespace: string, value: any) => void
    private video:VideoControl
    private pose: Pose
    private graphic: Graphic

    public static joints = new Map([
        ["leftArm", [11, 13, 15]],
        ["rightArm", [12, 14, 16]],
        ["leftLeg", [23, 25, 27]],
        ["rightLeg", [24, 26, 28]],
        ["leftHipY", [25, 23, 24]],
        ["rightHipY", [26, 24, 23]],
        ["leftHipX", [11, 23, 25]],
        ["rightHipX", [12, 24, 26]],
        ["leftShoulderX", [13, 11, 23]],
        ["rightShoulderX", [14, 12, 24]],
        ["leftShoulderY", [13, 11, 12]],
        ["rightShoulderY", [14, 12, 11]],
    ])
    constructor(
        inputType: number,
        recieve:(inputType: number, namespace: string, value: any) => void,
        webcamUi: WebcamIoUi
    ) {
        this.recieve = recieve
        this.inputType = inputType
        this.graphic = new Graphic(webcamUi.getContainerElement())
        this.pose = new Pose({locateFile: (file) => {
            return `./mediapipe/${file}`;
        }})
        this.pose.setOptions({
            modelComplexity: 0,
            smoothLandmarks: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        })
        this.video = new VideoControl(
            webcamUi.getVideoElement(),
            async (arg: HTMLVideoElement) => { await this.pose.send({image: arg}) },
        )
        this.pose.onResults((result: Results) => {
            const points = result.poseWorldLandmarks
            const jointDegrees = new Map()
            if(points == undefined) {
                return
            }
            WebCamIo.joints.forEach((value: Array<number>, key: string) => {
                if((points[value[0]].visibility! + 
                    points[value[1]].visibility! + 
                    points[value[2]].visibility!) / 3 > 0.75) 
                {
                    jointDegrees.set(key, WebCamIo.ThreeDegree(
                        new Vector3(points[value[0]].x, points[value[0]].y, points[value[0]].z),
                        new Vector3(points[value[1]].x, points[value[1]].y, points[value[1]].z),
                        new Vector3(points[value[2]].x, points[value[2]].y, points[value[2]].z)
                    ))
                }
            })
            this.graphic.update(result.poseWorldLandmarks);
            this.recieve(this.inputType, "webcam", {
                ...result,
                jointDegrees
            })
        });
    }
    
    public static ThreeDegree(a: Vector3, b: Vector3, c: Vector3) {
        const ab = [b.x - a.x, b.y - a.y, b.z - a.z]
        const bc = [c.x - b.x, c.y - b.y, c.z - b.z]
        const abVec = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
        const bcVec = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1] + bc[2] * bc[2]);
        const abNorm = [ab[0] / abVec, ab[1] / abVec, ab[2] / abVec]
        const bcNorm = [bc[0] / bcVec, bc[1] / bcVec, bc[2] / bcVec]
        const res = abNorm[0] * bcNorm[0] + abNorm[1] * bcNorm[1] + abNorm[2] * bcNorm[2];
        return Math.PI - Math.acos(res)
    }
}
export interface WebcamInput {
    poseLandmarks: NormalizedLandmarkList;
    poseWorldLandmarks: LandmarkList;
    jointDegrees: Map<string, number>
    segmentationMask: GpuBuffer;
    image: GpuBuffer;
}