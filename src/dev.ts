import App from "./index";
import "./static/index.css";
import axios from "axios";

const app = new App(document.getElementById("app")!);

// 로그인 회원가입 팝업
let signUp: HTMLElement;
let signIn: HTMLElement;

window.addEventListener("load", function () {
  checkSession();
});

function popAuth() {
  signIn.style.visibility = "visible";
  signUp.style.visibility = "hidden";
  // popup이 됐으면 input들을 가져온다
  getInputElements();
  setButtonEvent();
}
function getSignElement() {
  signUp = document.querySelector(".signUp")!;
  signIn = document.querySelector(".signIn")!;
}
function checkSession() {
  if (!sessionStorage.getItem("loggedIn")) {
    getSignElement();
    popAuth();
  }
}

// 로그인, 회원가입
let upHeight: HTMLInputElement;
let upWeight: HTMLInputElement;
let upName: HTMLInputElement;
let upPassword: HTMLInputElement;
let upPasswordCheck: HTMLInputElement;
let inName: HTMLInputElement;
let inPassword: HTMLInputElement;

function getInputElements() {
  upHeight = document.querySelector(".signUp > .inputs > input:nth-child(1)")!;
  upWeight = document.querySelector(".signUp > .inputs > input:nth-child(2)")!;
  upName = document.querySelector(".signUp > .inputs > input:nth-child(3)")!;
  upPassword = document.querySelector(
    ".signUp > .inputs > input:nth-child(4)"
  )!;
  upPasswordCheck = document.querySelector(
    ".signUp > .inputs > input:nth-child(5)"
  )!;

  inName = document.querySelector(".signIn > .inputs > input:nth-child(1)")!;
  inPassword = document.querySelector(
    ".signIn > .inputs > input:nth-child(2)"
  )!;
}

// 로그인 회원가입 버튼 함수
function setButtonEvent() {
  document.querySelector(".joinSubmit")?.addEventListener("click", () => {
    console.log("ㅎㅇㅌ");
    doSignUp();
  });
  document.querySelector(".loginSubmit")?.addEventListener("click", () => {
    console.log("ㅎㅇ");
    doSingIn();
  });
}

function doSignUp() {
  if (upPassword.value === upPasswordCheck.value) {
    // postData("/api/join/", {
    //   username: upName.value,
    //   password: upPassword.value,
    //   tall: upHeight.value,
    //   weight: upWeight.value,
    // })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .post("http://172.30.7.186:8000/api/join", {
        username: upName.value,
        password: upPassword.value,
        tall: upHeight.value,
        weight: upWeight.value,
      })
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err)
      });

    // axios({
    //   url: "/api/join",
    //   method: "post",
    //   data: {
    //     username: upName.value,
    //     password: upPassword.value,
    //     tall: upHeight.value,
    //     weight: upWeight.value,
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });
  } else {
    alert("비밀번호 확인과 다릅니다");
  }
}

function doSingIn() {
  postData("http://172.30.7.186:8000/login", {
    name: inName.value,
    password: inPassword.value,
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function postData(url = "", data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE 등
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}
