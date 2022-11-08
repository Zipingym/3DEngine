import Analysis from "./analysis";
import leftDumbbellCurlAnalysis from "./leftDumbbellCurlAnalysis";
import rightDumbbellCurlAnalysis from "./rightDumbbellCurlAnalysis";
import sideLateralRaiseAnalysis from "./sideLateralRaiseAnalysis";

export default class AnalysisCore{
    public static leftDumbbellCurlId = "left-dumbbellCurl"
    public static rightDumbbellCurlId = "right-dumbbellCurl"
    public static sideLateralRaiseAnalysis = "side-lateralRaise"

    private analysises:Map<string, Analysis> = new Map()
    constructor (
        
    ) {
        this.analysises.set(AnalysisCore.leftDumbbellCurlId, new leftDumbbellCurlAnalysis())
        this.analysises.set(AnalysisCore.rightDumbbellCurlId, new rightDumbbellCurlAnalysis())
        
        this.analysises.set(AnalysisCore.sideLateralRaiseAnalysis, new sideLateralRaiseAnalysis())
    }

    public inputValue(joints: Map<string, number>) {
        const result:Array<string> = new Array()
        this.analysises.forEach((value, key) => {
            if(value.inputValue(joints)) result.push(key)
        })
        return result
    }
}