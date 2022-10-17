import { inputAble, outputAble } from "../interface"
import KeyboardIo from "./keyboardIo"
import WebCamIo from "./webCamIo"

/** 네트워크, 웹캠 */
export default class IO implements inputAble, outputAble {
    public static KeyBoard: number = 0
    public static Webcam: number = 1
    public static Network: number = 2

    private keyBoardModule:KeyboardIo;
    private webCamModule:WebCamIo;

    constructor(
        recieve:(inputType: number, namespace: string, value: any) => void,
        send:(inputType: number, namespace: string, value: any) => void
    ) {
        this.recieve = recieve
        this.send = send
        this.keyBoardModule = new KeyboardIo(IO.KeyBoard, recieve)
        this.webCamModule = new WebCamIo(IO.Webcam, recieve)
    }

    public recieve: (inputType: number, namespace: string, value: any) => void
    public send: (inputType: number, namespace: string, value: any) => void
}
