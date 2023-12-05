export default function GameOver({ winner, onReset }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>You Won {winner}</p>}
      {!winner && <p>It's a Draw</p>}
      <button onClick={onReset}>Rematch</button>
    </div>
  );
}
