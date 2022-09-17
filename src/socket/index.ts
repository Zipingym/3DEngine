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
        this.core.humans.get(data.name)!.rotation = data.rotation
        this.core.humans.get(data.name)!.position.set(data.x, data.y, data.z)
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
