import { Vector3 } from 'three'
import Calculation from '../motion/calculation'
import Bind from './bind'
import { Human } from "../asset";
// Calculation.DegreeToRadian(180) // 도를 라디안으로
// Calculation.RadianToDegree(3.1415) // 라디안을 도로
// Human.Me.controll({
//   movement: {
//       pos: new Vector3(0, 0, 0),
//       rot: 0
//   },
//   time: 1000
// })  //time만큼 1ms에 pos와 rot를 바꾸기
// Human.Me.dirCalculator(0.01) //바라보는 방향으로 위치를 구해주기
let left_flag = 0;
let right_flag = 0;
export default class Input {

  constructor() {}
  public do(degrees: Map<string, number>) {
  
  //   if ((Calculation.RadianToDegree(degrees.get(Bind.leftArm)!)<110)&&((Calculation.RadianToDegree(degrees.get(Bind.rightArm)!)<110))){
  //     Human.Me.controll({
  //       movement: {
  //           pos: Human.Me.dirCalculator(0.0005),
  //           rot: 0
  //       },
  //       time: 1000
  //   })
  //   }
  //   else if (Calculation.RadianToDegree(degrees.get(Bind.leftArm)!)<110) {
  //     Human.Me.controll({
  //       movement: {
  //           pos: new Vector3(0, 0, 0),
  //           rot: Calculation.DegreeToRadian(0.003)
  //       },
  //       time: 1000
  //   })
  // }
  // else if (Calculation.RadianToDegree(degrees.get(Bind.rightArm)!)<110){
  // Human.Me.controll({
  //     movement: {
  //         pos: new Vector3(0, 0, 0),
  //        rot:  Calculation.DegreeToRadian(-0.003)
  //     },
  //     time: 1000
  //   })
  // }
  // else{
  //   Human.Me.controll({
  //     movement: {
  //       pos: Human.Me.dirCalculator(0),
  //       rot: 0
  //     },
  //     time: 1000
  //   })
  // }
  console.log(Calculation.RadianToDegree(degrees.get(Bind.leftArm)!));
  if ((Calculation.RadianToDegree(degrees.get(Bind.leftArm)!)<110)){
    left_flag = 1;
  }
  else if((Calculation.RadianToDegree(degrees.get(Bind.leftArm)!)===NaN)){
    left_flag = -1;
  }
  if((Calculation.RadianToDegree(degrees.get(Bind.rightArm)!))<110){
    right_flag = 1;
  }
  else if((Calculation.RadianToDegree(degrees.get(Bind.rightArm)!))===NaN){
    right_flag = -1;
  }

  if(left_flag==1&&right_flag==1){
    Human.Me.controll({
      movement: {
          pos: Human.Me.dirCalculator(0.0005),
          rot: 0
      },
      time: 1000
  })
}
  else if(left_flag==1){
    Human.Me.controll({
      movement: {
          pos: new Vector3(0, 0, 0),
          rot: Calculation.DegreeToRadian(0.003)
      },
      time: 1000
  })
  }
  else if(right_flag==1){
    Human.Me.controll({
      movement: {
          pos: new Vector3(0, 0, 0),
          rot: Calculation.DegreeToRadian(-0.003)
      },
      time: 1000
  })
  }
  else if(left_flag==-1&&right_flag==-1){
    Human.Me.controll({
      movement: {
          pos: Human.Me.dirCalculator(-0.0005),
          rot: 0
      },
      time: 1000
  })
}
left_flag = 0;
right_flag = 0;

  }
  }