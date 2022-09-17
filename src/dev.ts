import App from "./index";
import "./static/index.css";
import axios from "axios";



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
function closeAuth(){
    signIn.style.visibility = "hidden";
    signUp.style.visibility = "hidden";
}

function getSignElement() {
  signUp = document.querySelector(".signUp")!;
  signIn = document.querySelector(".signIn")!;
}
function checkSession() {
  if (!sessionStorage.getItem("loggedIn")) {
    getSignElement();
    popAuth();
  } else {
    const app = new App(document.getElementById("app")!);
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
    axios
      .post("http://172.30.7.186:8100/api/join", {
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
  } else {
    alert("비밀번호 확인과 다릅니다");
  }
}

function doSingIn() {
axios.post("http://172.30.7.186:8100/api/login", {
    username: inName.value,
    password: inPassword.value
  })
  .then((res) => {
    console.log(res);
    setSession("loggedIn",JSON.stringify(res.data.session.user))
    closeAuth()
    const app = new App(document.getElementById("app")!);
  }).catch((err) => {
    console.log(err)
  });
}

// 스토리지 세팅
function setSession(key:string,value:string){
    sessionStorage.setItem(key,value);
}

