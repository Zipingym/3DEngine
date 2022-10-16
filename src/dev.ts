import App from './index'
import './static/index.css'
//@ts-ignore
import worldModel from './static/model/town.glb'
const app = new App(document.getElementById('app')!, worldModel)