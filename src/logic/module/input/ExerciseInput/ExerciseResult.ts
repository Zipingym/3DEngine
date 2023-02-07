import { Vector3 } from "three"

export default class ExerciseResult {
    public static DumbleCurl = "dumbleCurl"
    public static LeftDumbleCurl = "left-dumbleCurl"
    public static RightDumbleCurl = "right-dumbleCurl"
    public static Squart = "Squart"
    
    public name: string
    public accuracy: number 
    constructor (
        name: string,
        accuracy: number
    ) {
        this.name = name
        this.accuracy = accuracy
    }
}

