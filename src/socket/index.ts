import { io,Socket } from "socket.io-client"
import eventListener from "../global/eventlistener";

export default class socket{
    public socket: Socket;
 
    constructor() {
        this.socket = io('http://172.30.7.186:8400',{
            path:'/socket.io',
            transports: ['websocket'],
        })

        const userData = sessionStorage.getItem('loggedIn')!
        this.emit('a',JSON.parse(userData))

        this.on('userList',(req:Array<string>) => {
            console.log(req)
        })

    }
    public emit(namespace: string, data: any) {
        this.socket.emit(namespace, data)
    }
    public update() {
        console.log(this.socket.connected)
    }
    public on(namespace:string,data:any){
        this.socket.on(namespace,data)
    }
}
