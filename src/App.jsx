import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./Components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "0";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActvePlayer] = useState("X");
  const activePlayer = driveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //setActvePlayer((curActivePlayer) => (curActivePlayer === "X" ? "0" : "X"));

    setGameTurns((prevValue) => {
      const currentPlayer = driveActivePlayer(prevValue);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevValue,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1 " symbol="X" isActive={activePlayer === "X"} />
          <Player name="player 2" symbol="0" isActive={activePlayer === "0"} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard onSelected={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
