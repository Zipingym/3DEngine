import eventListener from "../global/eventlistener";

export default class Input {
    private checks: Map<string, (degrees: Map<string, number>) => boolean> = new Map();

    private bendRight: boolean = false
    private bendLeft: boolean = false


  constructor() {

  }
  public do(degrees: Map<string, number>) {
    let leftArm = degrees.get("leftArm");
    let rightArm = degrees.get("RightArm");

    if (leftArm != undefined){
        if (leftArm > 80 && leftArm < 180){
            if (this.bendLeft){
                this.bendLeft = false
                eventListener.execute("input-walk", 1000)
            }
        } else if(leftArm <= 80 && leftArm > 0) { // 굽혔을 때
            // eventListener.execute("input-rotate", 0.1)
            this.bendLeft = true
        }
    }else if (rightArm != undefined){
        if (rightArm > 180 && rightArm < 260){
            if (this.bendRight){
                this.bendRight = false
                eventListener.execute("input-walk",1000)
            }
        } else if(rightArm >= 260 && rightArm < 360){ // 폈을 때
            // eventListener.execute("input-rotate", -0.1)
            this.bendRight = true
        }
    }else{
        // console.log("ASE")
        // eventListener.execute("stop")
    }


    // let rightArm = degrees.get("rightArm");
    // rightArm = 360 - rightArm
    // if (rightArm != undefined){
    //     if (rightArm > 80 && rightArm < 180){
    //         if (this.bendRight){
    //             this.bendRight = false
    //             eventListener.execute("input-walk", 1000)
    //         }
    //     } else if(rightArm < 80 && rightArm > 0) { // 굽혔을 때
    //         this.bendRight = true
    //     }
    // }
  }
}
