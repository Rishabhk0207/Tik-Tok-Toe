const submitBtn = document.querySelector("#submit");
const firstContiner = document.querySelector("[first-container]");
const secondContiner = document.querySelector("[second-container]");
const playerOne = document.querySelector("#player-one");
const playerTwo = document.querySelector("#player-two");
const showPlayerName = document.querySelector("[playerInfo]");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const restartBtn = document.querySelector("#restart");

submitBtn.addEventListener("click", () => {
 if(( playerOne.value.trim()==="") || (playerTwo.value.trim() === "")){
    alert("Player name missing");
 }else{
  secondContiner.classList.add("active");
  firstContiner.classList.add("active");
  showPlayerName.innerText = playerOne.value + " turn";
 }
});

let icon = "X";
let check = ["", "", "", "", "", "", "", "", ""];

function switchPlayer() {
  if (showPlayerName.innerText == playerOne.value + " turn") {
    showPlayerName.innerText = playerTwo.value + " turn";
  } else if (showPlayerName.innerText == playerTwo.value + " turn") {
    showPlayerName.innerText = playerOne.value + " turn";
  }
}
let arr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  let ans = "";
  arr.forEach((key) => {
    if (
      check[key[0]] === check[key[1]] &&
      check[key[0]] === check[key[2]] &&
      check[key[0]] !== ""
    ) {
      ans = check[key[0]];

      key.forEach((index) => {
        boxes[index].classList.add("win");
      });

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
    }
  });

  if (ans !== "") {
    if (ans === "X") {
      showPlayerName.innerHTML = "Winner is " + playerOne.value;
      showPlayerName.style.backgroundColor = "rgba(19, 208, 31, 0.5)";
    } else if (ans === "O") {
      showPlayerName.innerHTML = "Winner is " + playerTwo.value;
      showPlayerName.style.backgroundColor = "rgba(19, 208, 31, 0.5)";
    }
  } else if (!check.includes("")) {
    showPlayerName.innerHTML = "Its a Tie";
    showPlayerName.style.backgroundColor = "rgba(19, 208, 31, 0.5)";
  }
}

boxes.forEach((key, index) => {
  key.addEventListener("click", () => {
    key.innerText = icon;
    key.style.pointerEvents = "none";
    check[index] = icon;
    if (icon == "X") {
      icon = "O";
    } else {
      icon = "X";
    }
    switchPlayer();
    checkWinner();
  });
});

function restart() {
  boxes.forEach((key) => {
    key.innerText = "";
    check = ["", "", "", "", "", "", "", "", ""];
    key.style.pointerEvents = "auto";
  });
  showPlayerName.innerHTML = playerOne.value + " turn";
  boxes.forEach((key) => {
    if (key.classList.contains("win")) {
      key.classList.remove("win");
    }
  });
  icon = "X";
}

resetBtn.addEventListener("click", () => {
  restart();
  showPlayerName.style.backgroundColor= "rgba(101, 105, 101, 0.5)";
});

restartBtn.addEventListener("click", () => {
  restart();
  showPlayerName.style.backgroundColor= "rgba(101, 105, 101, 0.5)";
  playerOne.value = "";
  playerTwo.value = "";
  secondContiner.classList.remove("active");
  firstContiner.classList.remove("active");
});


