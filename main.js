const words = [
  "Hello",
  "Code",
  "Town",
  "Programming",
  "Javascript",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentatation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runners",
  "Rules",
  "Test",
  "Rust",
  "Playing",
];
const lvls = {
  ["Easy"]: 7,
  ["Normal"]: 5,
  ["Hard"]: 3,
};
let strenth = document.querySelectorAll(".levels div");
let easy = document.querySelector(".easy");
let normal = document.querySelector(".normal");
let hard = document.querySelector(".hard");
easy.onclick = function (ele) {
  console.log(ele.dataset);
};
let defaultLevelName = ["Normal"];
let defaultLevelSeconds = lvls[defaultLevelName];
// Dynamic
let startBotton = document.querySelector(".start"); // 1
let lvlNameSpan = document.querySelector(".message .lvl"); // 2
let secondsSpan = document.querySelector(".message .seconds"); // 3
let theWord = document.querySelector(".the-word"); // 4
let upcomingWords = document.querySelector(".upcoming-words"); // 5
let input = document.querySelector(".input"); // 6
let timeLeftSpan = document.querySelector(".time span"); // 7
let scoreGot = document.querySelector(".got"); // 8
let scoreTotal = document.querySelector(".total");
let finishMessage = document.querySelector(".finish"); // 10
////////////////////////////////
////////////////////////////////
////////////////////////////////
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;
// To Prevent Paste Event Into the input
input.onpaste = function () {
  return false;
};
startBotton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word
  genWords();
};
function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let indexWord = words.indexOf(randomWord);
  words.splice(indexWord, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
          console.log(defaultLevelSeconds);
        } else {
          let good = document.createElement("div");
          let txtgood = document.createTextNode("Congratulations");
          good.className = "good";
          good.appendChild(txtgood);
          finishMessage.appendChild(good);
          upcomingWords.remove();
        }
      } else {
        let bad = document.createElement("span");
        bad.className = "bad";
        let txtBad = document.createTextNode("Game Over");
        bad.appendChild(txtBad);
        finishMessage.appendChild(bad);
        if (finishMessage.hasChildNodes()) {
          let button = document.createElement("div");
          let txtBtn = document.createTextNode("Try Again");
          button.appendChild(txtBtn);
          button.style.cssText =
            "font-size: 30px; padding: 10px; margin: 20px auto 0; color: var(--second-color);border: 2px solid var(--second-color); border-raduis: 6px; width: fit-content; user-select: none; cursor: pointer";
          button.classList.add("again");
          finishMessage.appendChild(button);
          button.onclick = function () {
            finishMessage.remove();
            // timeLeftSpan.innerHTML = defaultLevelSeconds;
            genWords();
            startPlay();
          };
        }
      }
    }
  }, 1000);
}
