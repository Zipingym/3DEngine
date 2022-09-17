import ThreeDefault, { Camera, Renderer } from "../three";
import Core from "../core";
import Socket from "../socket";

import { Performance } from "../util";

import * as THREE from "three";
import * as CANNON from "cannon";
import { Light, Mesh, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import eventListener from "../global/eventlistener";

export default class App {
  private socket:Socket;

    private scene:Scene
    private camera:Camera
    private renderer:Renderer

    //-------

  private root: HTMLElement;
//   private world: CANNON.World;

//   private clock: THREE.Clock;
//   private oldElapsedTime: number;

//   private sphereBody: CANNON.Body;


  constructor(root: HTMLElement) {
    this.root = root;

    this.scene = new Scene()
    this.renderer = new Renderer(this.root.clientWidth, this.root.clientHeight, this.root)
    // this.renderer = new THREE.WebGLRenderer()
    
    this.camera = new Camera(95, this.root.clientWidth / this.root.clientHeight)
    this.camera.position.set(10,10,10);
    
    this.scene.add(new THREE.DirectionalLight(0xffffff,0.6))
    this.scene.add(new THREE.AmbientLight(0xffffff,0.6))

    
    const sphere = new THREE.SphereGeometry(1,10,10)
    const material = new THREE.MeshBasicMaterial({color:0x00ff00})
    const example = new THREE.Mesh(sphere,material )
    example.position.set(0,10,0);
    this.scene.add(example)
    
    this.render();
    
      this.socket = new Socket();

    this.update();
    // window.addEventListener('resize', this.resize.bind(this), false)
  }

  private update() {
    requestAnimationFrame(this.update.bind(this))
    this.socket.update()
    this.render();


    // const interval = this.performance.getInterval()
    // this.performance.start()

    // // console.log(interval)

    // this.core.update(interval)
    // this.threeDefault.update(interval)
    // this.socket.update()
    // this.performance.end()

}


  private render() {
    this.renderer.render(this.scene, this.camera)
}
private resize() {

    this.camera.aspect = this.root.clientWidth / this.root.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.root.clientWidth, this.root.clientHeight)
    this.render()
}

  

  // private root: HTMLElement

  // private performance:Performance = new Performance()

  // private threeDefault: ThreeDefault
  // private core: Core
  // private socket: Socket

  // private world:CANNON.World;

  // constructor(
  //     root: HTMLElement
  // ) {
  //     this.root = root
  //     this.threeDefault = new ThreeDefault(this.root)
  //     this.core = new Core(this.threeDefault.getScene())

  //     // cannon
  //     this.world = new CANNON.World();
  //     this.world.gravity.set(0,-9.82,0)

  //     const sphereShape = new CANNON.Sphere(1);
  //     const sphereBody = new CANNON.Body({
  //         mass:1,
  //         position:new CANNON.Vec3(0,10,0),
  //         shape:sphereShape,
  //     })

  //     this.world.addBody(sphereBody);
  //     // this.world.step(1/60,10,3);

  //     // this.threeDefault.update()
  //     // this.core.update()
  //     this.socket = new Socket()
  //     this.update()
  // }
  // private update() {
  //     requestAnimationFrame(this.update.bind(this))
  //     const interval = this.performance.getInterval()
  //     this.performance.start()

  //     // console.log(interval)

  //     this.core.update(interval)
  //     this.threeDefault.update(interval)
  //     this.socket.update()
  //     this.performance.end()

  // }
}
