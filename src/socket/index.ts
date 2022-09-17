import { io,Socket } from "socket.io-client"
import { Scene } from "three";
import { Human } from "../asset";
import Core from "../core";
import eventListener from "../global/eventlistener";
//@ts-ignore
import humanModel from '../static/model/anmatied_man.gltf'
export default class socket{
    public socket: Socket;
    private core
    private name: string = ""
    private scene: Scene
    private interval: number = 0
    constructor(
        core: Core,
        scene: Scene
    ) {
        this.core = core
        this.scene = scene
        this.socket = io('http://172.30.7.186:8400',{
            path:'/socket.io',
            transports: ['websocket'],
        })

        
        this.on('connect', () => {
            console.log("SEX")
            const userData = sessionStorage.getItem('loggedIn')!
            this.name = JSON.parse(userData).username
            
        })
        
       

        this.on('userList',(req: string) => {
            const res = JSON.parse(req)
            res.forEach((element: string) => {
                if(!this.core.humans.has(element)) {
                    this.core.humans.set(element, new Human(humanModel, this.scene))
                }
            })
            console.log(req)
        })
        this.on('vector',(req: string) => {
            const res = JSON.parse(req)
            this.core.humans.get(res.name)!.rotation = res.rotation
            this.core.humans.get(res.name)!.position.set(res.x, res.x, res.z)
        })
    }
    public emit(namespace: string, data: any) {
        this.socket.emit(namespace, data)
    }
    public update(interval: number) {
        this.interval += interval
        if(this.interval > 100) {
            if(this.name != "") {
                this.emit("vector", JSON.stringify({
                    rotation: this.core.humans.get(this.name)!.rotation,
                    ...this.core.humans.get(this.name)!.position,
                    name: this.name
                }))
            }
            this.interval = 0
        }
    }
    public on(namespace:string,data:any){
        this.socket.on(namespace,data)
    }
}
