import { inputAble, outputAble } from "../interface";

export default class KeyboardIo implements inputAble {
    private inputType: number
    public recieve:(inputType: number, namespace: string, value: any) => void
    constructor(
        inputType: number,
        recieve:(inputType: number, namespace: string, value: any) => void
    ) {
        this.recieve = recieve
        this.inputType = inputType
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            recieve(inputType, "keydown", e)
        })
    }
}