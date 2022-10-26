import { io, Socket } from "socket.io-client";
import { inputAble, outputAble } from "../interface";

export default class NetworkIo implements inputAble, outputAble {
    private inputType: number
    private socket: Socket
    private namespaces = new Array("connect", "test", "onconnect", "join", "out", "control", "exit", "sync")
    constructor(
        inputType:number,
        recieve: (inputType: number, namespace: string, value: any) => void,
        ip:string
    ){
        this.inputType = inputType
        this.recieve = recieve
        this.socket = io(`http://${ip}`, {
            path: '/socket.io',
            transports: ['websocket'],
        })
        this.namespaces.forEach((namespace: string) => {
            this.socket.on(namespace, (data: any) => {
                this.recieve(inputType, namespace, data)
            })
        })
    }
    public recieve: (inputType: number, namespace: string, value: any) => void
    public send = (inputType: number, namespace: string, value: any) => {
        this.socket.emit(namespace, value);
    };
}