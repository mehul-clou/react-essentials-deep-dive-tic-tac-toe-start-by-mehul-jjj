import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";

function App() {
  const [activePlayer, setActvePlayer] = useState("X");

  function handleSelectSquare() {
    setActvePlayer((curActivePlayer) => (curActivePlayer === "X" ? "0" : "X"));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1 " symbol="X" isActive={activePlayer === "X"} />
          <Player name="player 2" symbol="0" isActive={activePlayer === "0"} />
        </ol>
        <GameBoard
          onSelected={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
