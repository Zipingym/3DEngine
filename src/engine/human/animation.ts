import { AnimationAction, AnimationClip, AnimationMixer, Object3D } from "three";
import { Scene } from "../three";
import * as THREE from 'three'

export default class Animation {
    private bind: Map<string, string> = new Map([
        ["Idle", "Armature|mixamo.com|Layer0"],
        ["Running", "Armature.002|mixamo.com|Layer0"],
        ["Jumping", "Armature.001|mixamo.com|Layer0"],
        ["Walking", "Armature.003|mixamo.com|Layer0"],
    ])
    private animations: Map<string, AnimationAction> = new Map()
    private animationClips: Map<string, AnimationClip> = new Map()
    private mixer: AnimationMixer
    constructor (
        animations: Array<AnimationClip>,
        target: Object3D
    ) {
        this.mixer = new AnimationMixer(target)
        animations.forEach((element: AnimationClip) => {
            this.animationClips.set(element.name, element)
            this.animations.set(element.name, this.mixer.clipAction(element))
            
            // this.animations.get(element.name)!.loop = THREE.LoopOnce 
        })
    }
    public animate(name: string) {
        const action = this.bind.has(name) ? this.animations.get(this.bind.get(name)!) : undefined
        if(action != undefined) {
            this.animations.forEach((v, k) => {
                if(v === action) {
                    action.play()
                }
                else {
                    v.stop()
                }
            })
        }
    }
    public getAnimations():Array<string> {
        const result = new Array()
        this.animations.forEach((v, k) => {
            result.push(k)
        })
        return result
    }
    public update(interval: number) {
        this.mixer.update(interval / 1000)
    }
}