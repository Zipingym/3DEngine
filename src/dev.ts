import App from './index'
// import './dev.style.scss'
import worldModel from '../static/model/beach2.glb'
import manModel from "../static/model/girl.glb"

const app = new App(document.getElementById('app')!, "park", {
    worldModel: worldModel,
    humanModel: manModel
})