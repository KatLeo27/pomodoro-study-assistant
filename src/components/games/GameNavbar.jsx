import "./GameNavbar.css";

export default function GameNavbar({ activeGame, setActiveGame, onClose, mode }) {
  const games = [
    { id: "typing", label: "Typing" },
    { id: "whackamole", label: "Whack A Mole" },
    { id: "memory", label: "Memory" },
    { id: "snake", label: "Snake" },
    { id: "timing", label: "Timing" },
    { id: "flappybird", label: "Flappy Bird" },
  ];

  const isFocusMode = mode === "focus";

  return (
    <div className="game-navbar">
      <div className="game-list">
        {isFocusMode && (
          <div className="lock-message">🔒 Focus Time - Games Locked</div>
        )}
        {games.map((game) => (
          <button
            key={game.id}
            className={`game-btn ${activeGame === game.id ? "active" : ""} ${
              isFocusMode ? "locked" : ""
            }`}
            onClick={() => setActiveGame(game.id)}
            disabled={isFocusMode}
            title={isFocusMode ? "Games are locked during focus time" : ""}
          >
            {game.label}
            {isFocusMode && " 🔒"}
          </button>
        ))}
      </div>
      {activeGame && (
        <button className="close-btn" onClick={onClose} title="Close game">
          ✕
        </button>
      )}
    </div>
  );
}
