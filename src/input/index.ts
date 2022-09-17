import eventListener from "../global/eventlistener";

export default class Input {
  private checks: Map<string, (degrees: Map<string, number>) => boolean> = new Map();

  private bendRight: boolean = false;
  private bendLeft: boolean = false;

  constructor() {}
  public do(degrees: Map<string, number>) {
    let leftArm = degrees.get("leftArm");
    let rightArm = degrees.get("RightArm");

    if (leftArm && rightArm) {
      console.log(degrees)
      // 둘 다 유요할 때
      // 두 팔을 각각 폈는지 확인
      if (!this.bendLeft && leftArm > 150 && leftArm < 165) {
        // 왼쪽 폈는지 확인
        console.log("왼쪽 핌");
        this.bendLeft = true;
      }
      if (!this.bendRight && rightArm > 145 && rightArm < 165) {
        // 오른쪽 폈는지
        console.log("오른쪽 핌");
        this.bendRight = true;
      }

      // 핌
      // 같이
      // 오른쪽 = 140 ~ 160
      // 왼쪽 = 155 ~ 170
      // 따로
      // 오른쪽 = 155 ~ 170
      // 왼쪽 = 160 ~ 175

      // 굽힘      
      // 오른쪽만 = 100 ~ 125
      // 왼쪽만 = 50 ~ 90
      // 왼쪽이랑 같이 오른쪽 = 80 ~ 100
      // = 55 ~ 80
      

      // 굽혔을 때 excute하기 위해 굽혔을 때를 기준으로
      if (this.bendLeft && this.bendRight) {
        if ((leftArm <= 90 && leftArm > 50) && (rightArm <= 125 && rightArm > 80)) {
          // 두 팔 굽혔을 때
          eventListener.execute('input-walk',1000)
          this.clearIsBand()
        } else if ((leftArm > 150 && leftArm < 165) && (rightArm <= 125 && rightArm > 80)) { // 왼쪽핌, 오른쪽 굽힘
            eventListener.execute('input-rotate',0.2)

        } else if ((leftArm <= 90 && leftArm > 50) && (rightArm > 145 && rightArm < 165)){
            eventListener.execute('input-rotate',-0.2)
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

