import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";

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
        <GameBoard onSelected={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
