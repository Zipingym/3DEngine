export default abstract class Analysis{
    constructor(onResult: (info: exerciseInfo,) => void){}
    protected static RadianToDegree = (radian: number) => radian * 180 / Math.PI
    protected static DegreeToRadian = (degree: number) => degree * Math.PI / 180

    public exe(){}
}   

export interface exerciseInfo {
    count: number,
    score: number
}