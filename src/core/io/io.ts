import WebcamIoUi from "../../ui/webcamIo/webcamIo"
import { inputAble, outputAble } from "../interface"
import KeyboardIo from "./keyboardIo"
import NetworkIo from "./networkIo"
import WebCamIo from "./webCamIo"

/** 네트워크, 웹캠 */
export default class IO implements inputAble, outputAble {
    public static KeyBoard: number = 0
    public static Webcam: number = 1
    public static Network: number = 2

    private keyBoardModule:KeyboardIo;
    private webCamModule:WebCamIo;
    private networkIo:NetworkIo;

    constructor(
        recieve:(inputType: number, namespace: string, value: any) => void,
        webcamUi: WebcamIoUi
    ) {
        this.recieve = recieve
        this.keyBoardModule = new KeyboardIo(IO.KeyBoard, recieve)
        this.webCamModule = new WebCamIo(IO.Webcam, recieve, webcamUi)
        this.networkIo = new NetworkIo(IO.Network, recieve, "192.169.0.36:8000")
    }

    public recieve: (inputType: number, namespace: string, value: any) => void
    public send = (inputType: number, namespace: string, value: any) =>  {
        if (inputType === IO.Network){
            this.networkIo.send(inputType, namespace, value)
        }
    }
}
