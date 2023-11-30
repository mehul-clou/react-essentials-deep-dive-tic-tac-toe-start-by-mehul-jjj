import Player from "./Components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1 " symbol="x" />
          <Player name="player 2" symbol="0" />
        </ol>
      </div>
    </main>
  );
}

export default App;
