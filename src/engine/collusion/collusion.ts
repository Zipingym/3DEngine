import { Box3,  Object3D } from "three";
import { Scene } from "../three";

export default class Collusion {
    private scene: Scene
    private world: Array<{object: Object3D, box: Box3}> = new Array()
    constructor (
        scene: Scene
    ) {
        this.scene = scene
    }
    public collusion(object: Box3): Array<string> {
        const result: Array<string> = new Array()
        this.world.forEach((element) => {
            if(element.box.containsBox(object)) {
                result.push(element.object.name)
            }
        })
        return result
    }
    public setLeafChildren(object: Object3D) {
        const box = new Box3().setFromObject(object)
        this.world.push({object, box: box})
        // if(object.name === "Plane048_ColorPalette_0") {
        //     object.scale.set(0, 0, 0)
        // }
        // this.scene.add(new Box3Helper(box))
        object.children.forEach(this.setLeafChildren.bind(this))
    }
    
}