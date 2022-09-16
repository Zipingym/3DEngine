import {io,Socket} from "socket.io-client"

export default class socket{
    public socket!:Socket;

    constructor(){
    }

    public makeSocket(){
        this.socket = io("http://172.30.7.186:8001/").connect();
    }
}