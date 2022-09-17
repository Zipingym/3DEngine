import eventListener from "../global/eventlistener";

export default class Input {
  private checks: Map<string, (degrees: Map<string, number>) => boolean> =
    new Map();

  private bendRight: boolean = false;
  private bendLeft: boolean = false;

  constructor() {}
  public do(degrees: Map<string, number>) {
    let leftArm = degrees.get("leftArm");
    let rightArm = degrees.get("RightArm");

    // if (leftArm){
    //     if (leftArm > 80 && leftArm < 180){
    //         if (this.bendLeft){
    //             this.bendLeft = false
    //             // eventListener.execute("input-walk", 1000)
    //             console.log("ㅎㅇ")
    //             eventListener.execute("input-rotate", 0.1)
    //         }
    //     } else if(leftArm <= 80 && leftArm > 0) { // 굽혔을 때
    //         this.bendLeft = true
    //     }
    // }else if (rightArm){
    //     if (rightArm > 180 && rightArm < 260){
    //         if (this.bendRight){
    //             this.bendRight = false
    //             // eventListener.execute("input-walk",1000)
    //             console.log("ㅂㅇ")
    //             eventListener.execute("input-rotate", -0.1)
    //         }
    //     } else if(rightArm >= 260 && rightArm < 360){ // 폈을 때
    //         this.bendRight = true
    //     }
    // }

    if (leftArm && rightArm) {
      console.log(degrees)
      // 둘 다 유요할 때
      // 두 팔을 각각 폈는지 확인
      if (!this.bendLeft && leftArm > 80 && leftArm < 180) {
        // 왼쪽 폈는지 확인
        console.log("왼쪽 핌");
        this.bendLeft = true;
      }
      if (!this.bendRight && rightArm > 120 && rightArm < 160) {
        // 오른쪽 폈는지
        console.log("오른쪽 핌");
        this.bendRight = true;
      }

      // 굽혔을 때 excute하기 위해 굽혔을 때를 기준으로
      if (this.bendLeft && this.bendRight) {
        if ((leftArm <= 80 && leftArm > 0) && (rightArm <= 120 && rightArm > 30)) {
          // 두 팔 굽혔을 때
          eventListener.execute('input-walk',1000)
          this.clearIsBand()
        } else if ((leftArm > 80 && leftArm < 180) && (rightArm <= 120 && rightArm > 30)) { // 왼쪽핌, 오른쪽 굽힘
            eventListener.execute('input-rotate',0.05)
        } else if ((leftArm <= 80 && leftArm > 0) && (rightArm > 120 && rightArm < 160)){
            eventListener.execute('input-rotate',-0.05)
        }

      }

    } else {
        console.log("없음")
    }
  }

  private clearIsBand(){
    this.bendLeft = false
    this.bendRight = false
  }
}

