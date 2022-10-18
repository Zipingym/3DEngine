import App from './index'
import './dev.style.scss'
import worldModel from '../static/model/town.glb'
import manModel from "../static/model/man.gltf"
const app = new App(document.getElementById('app')!, {
    worldModel: worldModel,
    humanModel: manModel
})