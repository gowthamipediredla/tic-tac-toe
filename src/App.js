import "./styles.css";
import React, { useState } from "react";
import { winningmessages } from "./messages";
export default function App() {
  const [board, setBoard] = useState(new Array(9).fill(""));
  const [isNextXMove, setIsNextXMove] = useState(true);
  const clickHandler = (i) => {
    if (board[i] || winner) return;
    let newBoard = [...board];
    newBoard[i] = isNextXMove ? "X" : "O";
    setBoard(newBoard);
    setIsNextXMove(!isNextXMove);
  };
  const resetHandler = () => {
    setBoard(new Array(9).fill(""));
    setIsNextXMove(true);
  };
  const calculateWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let winningCombo of winningCombinations) {
      const [a, b, c] = winningCombo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
  const winner = calculateWinner();
  const message = winningmessages(winner);

  return (
    <div className="App">
      <div className="title">Tic Tac Toe</div>
      {winner && (
        <div className="winner">
          {message[Math.floor(Math.random() * message.length)]}
        </div>
      )}
      {!winner && (
        <div className="winner">Next Move: {isNextXMove ? "X" : "O"}</div>
      )}
      <button onClick={resetHandler}>Reset Game </button>
      <div className="parent-box">
        {board.map((grid, i) => {
          return (
            <div
              className={`box ${grid === "X" && "colorblue"}`}
              onClick={() => clickHandler(i)}
            >
              {grid}
            </div>
          );
        })}
      </div>
    </div>
  );
}
