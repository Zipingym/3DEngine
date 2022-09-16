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
        this.socket = io('http://172.30.7.186:8001', {
            path: '/socket',
            transports: ['websocket']
        })
        this.socket.on('connect', function () {
            console.log('connect')
        })
        this.reciveNamespaces.forEach((recive: reciveSocket) => {
            this.socket.on(recive.namespace, recive.on)
        })
        this.sendNamespaces.forEach((send: sendSocket) => {
            eventListener.add(send.event, (data: string) => { this.emit(send.namespace, data) })
        })
    }
    private emit(namespace: string, data: any) {
        this.socket.emit(namespace, data)
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