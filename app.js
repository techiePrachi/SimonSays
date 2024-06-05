let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let maxlevel = 0;

let btns = ["yellow", "red", "green", "purple"];
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("click", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  // random btn selected
  let randIdx = Math.floor(Math.random() * 3);
  let randClr = btns[randIdx];
  let randBtn = document.querySelector(`.${randClr}`);
  gameSeq.push(randClr);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  // console.log(`curr level ${level}`);
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b> ${level}</b>. <br> Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    displayScore();
    reset();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userClr = btn.getAttribute("id");
  userSeq.push(userClr);
  //    console.log(`user seq = ${userSeq}`);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
}

function displayScore() {
  maxlevel = Math.max(level, maxlevel);
  h3.innerText = `Highest Score = ${maxlevel}`;
}
