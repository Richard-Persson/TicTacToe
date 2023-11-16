const X_CLASS = 'X'
const O_CLASS = 'O'
var score_O = 0;
var score_X = 0;
let turn = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let gameAcitve = true;
const boxEl = document.querySelectorAll(".box");
const titleEl = document.getElementById("title");
const resetEl = document.querySelector("#reset");

boxEl.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true })
})

resetEl.addEventListener("click",reset)

function handleClick(e) {
  
  if (!gameAcitve) return;

  const cell = e.target
  const currentclass = cicrcleTurn() ? O_CLASS : X_CLASS;
  //Place mark
  placeMark(cell, currentclass);
  //LogicBoard
  logicBoard(e.target.id, currentclass);
  //Check win
  checkWin(currentclass);
  //Check draw
  checkDraw();
}

function placeMark(cell,currentClass) {
  cell.classList.add(currentClass)
}

function logicBoard(index,icon) {
  board[index]=icon
}

function cicrcleTurn() {
  let svar = turn % 2 !== 0
  turn++;
  console.log(turn)
  return svar
}

function checkDraw() {
  if (turn === 9 && !checkWin()) {
    resetEl.style.visibility = "initial"
    titleEl.textContent = "Draw"
    titleEl.style.visibility="initial"
  }
}

function checkWin(currentClass) {
  
  let vunnet = false;

  let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < win.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[win[i][j]] != currentClass) {
        console.log("nej")
        break
      }
      else if (j == 2)
        vunnet = true;
      
    }
  }
    if (vunnet) {
      console.log("SEIER FOR: " + currentClass)
      display(currentClass);
      gameAcitve = false;
      return vunnet
    }

  return vunnet;
  

  function display(vinner) {
    const player1Score = document.querySelector("#scoreX")
    const player2Score = document.querySelector("#scoreO")

    switch (vinner) {

      case "X":
        score_X++;
        player1Score.textContent ="Score: " + score_X;
      break
      
      case "O":
      score_O++;
      player2Score.textContent = "Score: " + score_O;
      break
    }
    resetEl.style.visibility = "initial";
    titleEl.style.visibility = "initial";
    titleEl.textContent =vinner + " vant"
  }


}

function reset() {

  setTimeout(rest, 200)
  console.log(board)

  function rest() {
    turn = 0;
    resetEl.style.visibility = "hidden"
    gameAcitve = true;
    titleEl.style.visibility = "hidden"
    for (let i = 0; i < board.length; i++){
      board[i] = "";
    }
    boxEl.forEach((e) => { e.classList.remove("X"); e.classList.remove("O") })
   
    boxEl.forEach(cell => {
      cell.removeEventListener("click", handleClick); // Remove existing click listeners
      cell.addEventListener("click", handleClick, { once: true }); // Add new click listeners
    });
  }
}