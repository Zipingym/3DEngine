import App from './index'
import './static/index.css'
//@ts-ignore
import worldModel from './static/model/town.glb'
//@ts-ignore
import manModel from "./static/model/man.gltf"
const app = new App(document.getElementById('app')!, {
    worldModel: worldModel,
    humanModel: manModel
})