import Bind from './bind'
export default class Input {
  constructor() {}
  public do(degrees: Map<string, number>) {
    const leftArm = degrees.get(Bind.leftArm)
    const rightArm = degrees.get(Bind.rightArm)
    // console.log(Calculation.RadianToDegree(degrees.get(Bind.leftShoulderX)!))
    // eventListener.execute()
  }
}