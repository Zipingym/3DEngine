import App from './index'
import './dev.style.scss'
import worldModel from '../static/model/beach.glb'
import manModel from "../static/model/man.gltf"

const app = new App(document.getElementById('app')!, "park", {
    worldModel: worldModel,
    humanModel: manModel
})
// document.getElementById('tempbutton')?.addEventListener("click", () => {
//     //@ts-ignore
//     const app = new App(document.getElementById('app')!, document.getElementById("tempinput").value, {
//         worldModel: worldModel,
//         humanModel: manModel
//     })
//     let temp = document.getElementById('tempbutton')!
//     temp.style.cssText = "display: 'none'"
//     temp = document.getElementById("tempinput")!
//     temp.style.cssText = "display: 'none'"
// })

