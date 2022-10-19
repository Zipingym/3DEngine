export default abstract class Analysis {
    constructor(

    ) {

    }
    protected static RadianToDegree = (radian: number) => radian * 180 / Math.PI
    protected static DegreeToRadian = (degree: number) => degree * Math.PI / 180
    public abstract inputValue: (joints: Map<string, number>) => boolean
    protected abstract use:Array<string>
    protected checkUndefined(joints: Map<string, number>): boolean {
        let result = false
        this.use.forEach((element) => {
            if(joints.get(element) === undefined) {
                result = true
            }
        })
        return result
    }

    public static readonly leftArm = "leftArm"
    public static readonly rightArm = "rightArm"
    public static readonly leftLeg = "leftLeg"
    public static readonly rightLeg = "rightLeg"
    public static readonly leftHipY = "leftHipY"
    public static readonly rightHipY = "rightHipY"
    public static readonly leftHipX = "leftHipX"
    public static readonly rightHipX = "rightHipX"
    public static readonly leftShoulderX = "leftShoulderX"
    public static readonly rightShoulderX = "rightShoulderX"
    public static readonly leftShoulderY = "leftShoulderY"
    public static readonly rightShoulderY = "rightShoulderY"

}

export interface exerciseInfo {
    count: number,
    score: number
}
