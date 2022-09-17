import eventListener from "../global/eventlistener";

export default class Input {
  private checks: Map<string, (degrees: Map<string, number>) => boolean> =
    new Map();

  private bend: boolean;

  constructor() {
    this.bend = false;
  }
  public do(degrees: Map<string, number>) {
    // console.log(degrees)
    let leftArm = degrees.get("leftArm");
    if (leftArm != undefined){
        if (leftArm > 80 && leftArm < 180){
            if (this.bend){
                this.bend = false
                console.log("실행")
                eventListener.execute("input-walk",1000)
            }
        } else if(leftArm < 80 && leftArm > 0) { // 굽혔을 때
            this.bend = true
        }
    }

    // undefined됐을 때 바꿔주기도,

  }
}
