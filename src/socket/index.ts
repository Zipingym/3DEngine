import { io, Socket } from 'socket.io-client'
import { Scene } from 'three'
import { Human } from '../asset'
import Core from '../core'
import eventListener from '../global/eventlistener'
//@ts-ignore
import humanModel from '../static/model/anmatied_man.gltf'
export default class socket {
  public socket: Socket
  private core
  private name: string = ''
  private scene: Scene
  private interval: number = 0
  constructor(core: Core, scene: Scene) {
    this.core = core
    this.scene = scene
    this.socket = io('http://172.30.7.186:8400', {
      path: '/socket.io',
      transports: ['websocket'],
    })
    this.on('connect', () => {
      const userData = sessionStorage.getItem('loggedIn')!
      this.name = JSON.parse(userData).username
      this.emit('login', this.name)
    })
    this.on('user', (data: Array<string>) => {
        data.forEach((d, idx) => {
            if(!this.core.humans.has(d)) {
                this.core.humans.set(d, new Human(humanModel, this.scene))
            }
        })
    })
    this.on('vector', (data: any) => {
      if(data.name != this.name) {
        const human = this.core.humans.get(data.name)!
        console.log(Math.abs(human.position.z - data.z))
        const delta = Math.abs(human.position.x - data.x) + Math.abs(human.position.x - data.y) + Math.abs(human.position.z - data.z)
        human.rotation = data.rotation
        human.position.set(data.x, data.y, data.z)
        if(delta < 0.5) {
          console.log("SEX")
          human.animator?.animate("idle")
        }
        else {
          console.log(delta)
          human.animator?.animate("walk")
        }
        
      }
    })
    this.on('event', (data: any) => {
      // console.log(data)
    })
  }

  public update(interval: number) {
    this.interval += interval
    if (this.interval > 30) {
      if (this.name != '') {
        this.emit('vector', {
          rotation: this.core.humans.get(this.name)!.rotation,
          ...this.core.humans.get(this.name)!.position,
          name: this.name,
        })
      }
      this.interval = 0
    }
  }
  public emit(namespace: string, data: any) {
    this.socket.emit(namespace, data)
  }
  public on(namespace: string, data: any) {
    this.socket.on(namespace, data)
  }
}
