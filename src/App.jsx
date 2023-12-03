import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActvePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActvePlayer((curActivePlayer) => (curActivePlayer === "X" ? "0" : "X"));

    setGameTurns((prevValue) => {
      let currentPlayer = "X";

      if (prevValue.length > 0 && prevValue[0].player === "X") {
        currentPlayer = "0";
      }

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
      <Log />
    </main>
  );
}

export default App;
