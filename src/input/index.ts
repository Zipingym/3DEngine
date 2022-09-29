import eventListener from "../global/eventlistener";
import Calculation from "../motion/calculation";

export default class Input {
  constructor() {}
  public do(degrees: Map<string, number>) {
    const leftArm = degrees.get("leftArm")
    const rightArm = degrees.get("rightArm")
    // if(leftArm != undefined && rightArm != undefined) {
    //   const standard = Calculation.DegreeToRadian(100)
    //   const isLeft = standard > leftArm, isRight = standard > rightArm
    //   if(isLeft && isRight) {
    //     eventListener.execute('input-walk',10)
    //   }
    //   else if(isLeft) {
    //     eventListener.execute('input-rotate',0 -.005)
    //   }
    //   else if(isRight) {
    //     eventListener.execute('input-rotate',0.005)
    //   }
    // }
  }
}