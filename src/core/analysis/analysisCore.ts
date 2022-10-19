import Analysis from "./analysis";
import leftDumbbellCurlAnalysis from "./leftDumbbellCurlAnalysis";
import rightDumbbellCurlAnalysis from "./rightDumbbellCurlAnalysis";

export default class AnalysisCore{
    public static leftDumbbellCurlId = "left-dumbbellCurl"
    public static rightDumbbellCurlId = "right-dumbbellCurl"
    private analysises:Map<string, Analysis> = new Map()
    constructor (

    ) {
        this.analysises.set(AnalysisCore.leftDumbbellCurlId, new leftDumbbellCurlAnalysis())
        this.analysises.set(AnalysisCore.rightDumbbellCurlId, new rightDumbbellCurlAnalysis())
    }

    public inputValue(joints: Map<string, number>) {
        const result:Array<string> = new Array()
        this.analysises.forEach((value, key) => {
            if(value.inputValue(joints)) result.push(key)
        })
        return result
    }
}