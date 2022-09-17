import { AnimationMixer } from "three";
import { AnimationClip } from "three"

export default class Animator {
    private animations: Map<string, AnimationClip> = new Map()
    private mixer: AnimationMixer
    private model: any
    constructor (
        model: any
    ) {
        this.model = model
        
        this.model.animations.forEach((v: AnimationClip) => {
            this.animations.set(v.name, v)
        })
        this.mixer = new AnimationMixer( model.scene );
    }
    public animate(anime: string) {
        const action = this.mixer.clipAction(this.animations.get(anime)!)
        action.play()
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