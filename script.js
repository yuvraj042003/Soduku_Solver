document.addEventListener("DOMContentLoaded", function () {
  var arr = [[], [], [], [], [], [], [], [], []];

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j] = document.getElementById(i * 9 + j);
    }
  }

  var board = [[], [], [], [], [], [], [], [], []];

  function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (board[i][j] != 0) {
          arr[i][j].innerText = board[i][j];
        } else arr[i][j].innerText = "";
      }
    }
  }

  let GetPuzzle = document.getElementById("GetPuzzle");
  let SolvePuzzle = document.getElementById("SolvePuzzle");

  GetPuzzle.onclick = function () {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
      var response = JSON.parse(xhrRequest.response);
      console.log(response);
      board = response.board;
      FillBoard(board);
    };
    xhrRequest.open("get", "https://sugoku.onrender.com/board?difficulty=easy");
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send();
  };

  SolvePuzzle.onclick = () => {
    SudokuSolver(board, 0, 0, 9);
  };

  function SudokuSolver(board, i, j, n) {
    // Write your Code here
  }

  // #################### LOGIC OF BACKTRACKING #####################
  function isValid(board, i, j, num, n) {
    // Check if 'num' is not in current row and current column
    for (let x = 0; x < n; x++) {
      if (board[i][x] == num || board[x][j] == num) {
        return false;
      }
    }

    // Check if 'num' is not in current 3x3 box
    let rn = Math.sqrt(n);
    let sx = Math.floor(i / rn) * rn;
    let sy = Math.floor(j / rn) * rn;
    for (let x = sx; x < sx + rn; x++) {
      for (let y = sy; y < sy + rn; y++) {
        if (board[x][y] == num) {
          return false;
        }
      }
    }
    return true;
  }

  // #####################SudokuSolver###########
  function SudokuSolver(board, i, j, n) {
    // If we have reached the end of the board, return true
    if (i == n) {
      FillBoard(board);
      return true;
    }

    // If we have reached the end of the row, go to the next row
    if (j == n) {
      return SudokuSolver(board, i + 1, 0, n);
    }

    // If the current cell is already filled, move to the next cell
    if (board[i][j] != 0) {
      return SudokuSolver(board, i, j + 1, n);
    }

    // Try placing numbers 1 to n in the current cell
    for (let num = 1; num <= n; num++) {
      if (isValid(board, i, j, num, n)) {
        board[i][j] = num;
        let solved = SudokuSolver(board, i, j + 1, n);
        if (solved) {
          return true;
        }
        // If placing num doesn't lead to a solution, backtrack
        board[i][j] = 0;
      }
    }

    // If no number can be placed in the current cell, return false
    return false;
  }
});
