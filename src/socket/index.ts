import { io,Socket } from "socket.io-client"
import eventListener from "../global/eventlistener";

export default class socket{
    public socket: Socket;
    private reciveNamespaces: Array<reciveSocket> = [
        {
            namespace: "test1",
            on: (data: any) => { console.log("test") }
        },
        {
            namespace: "test2",
            on: (data: any) => { console.log(data) }
        }
    ]

    private sendNamespaces: Array<sendSocket> = [
        {
            namespace: "test",
            event: "test"
        }
    ]

    constructor() {
        this.socket = io('http://localhost:8001', {
            autoConnect: true,
            transports: ['websocket']
            
        })
        this.socket.on('connect', function () {
            console.log('connected!')
        })
        // this.reciveNamespaces.forEach((recive: reciveSocket) => {
        //     this.socket.on(recive.namespace, recive.on)
        // })
        // this.sendNamespaces.forEach((send: sendSocket) => {
        //     eventListener.add(send.event, (data: string) => { this.emit(send.namespace, data) })
        // })
        // console.log(this.socket)
        // this.emit("events", {
        //     sex: "SEX"
        // })
    }
    private emit(namespace: string, data: any) {
        this.socket.emit(namespace, data)
    }
    public update() {
        // console.log(this.socket.connected)
    }
}

interface reciveSocket {
    namespace: string,
    on: (data: any) => void
}

interface sendSocket {
    namespace: string,
    event: string
}