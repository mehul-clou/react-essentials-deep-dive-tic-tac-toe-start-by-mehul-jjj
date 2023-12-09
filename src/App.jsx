import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./Components/GameOver";

const PLAYER = {
  X: "Player 1",
  O: "player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveWinner(gameBoard, players) {
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function driveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((initial) => [...initial])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function driveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "0";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({ X: "player 1", 0: "player 2" });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = driveActivePlayer(gameTurns);

  const gameBoard = driveGameBoard(gameTurns);

  const winner = driveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevValue) => {
      const currentPlayer = driveActivePlayer(prevValue);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevValue,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayers((prevValue) => {
      return {
        ...prevValue,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onchangeName={handleChangePlayerName}
          />
          <Player
            name={PLAYER.O}
            symbol="0"
            isActive={activePlayer === "0"}
            onchangeName={handleChangePlayerName}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onReset={handleRestart} />
        )}
        <GameBoard onSelected={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
