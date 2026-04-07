import "./Games.css";
import { useState } from "react";
import WhackAMole from "./WhackAMole";
import TypingGame from "./TypingGame";
import MemoryGame from "./MemoryGame";
import SnakeGame from "./SnakeGame";
import TimingGame from "./TimingGame";
import FlappyBird from "./FlappyBird";

function GamePanel({ mode }) {
  const isBreak = mode !== "focus";
  const [activeGame, setActiveGame] = useState(null);

  const renderGame = () => {
    switch (activeGame) {
      case "typing": return <TypingGame />;
      case "mole": return <WhackAMole />;
      case "memory": return <MemoryGame />;
      case "snake": return <SnakeGame />;
      case "timing": return <TimingGame />;
      case "flappy": return <FlappyBird />;
      default: return null;
    }
  };

  return (
    <div className="game-panel">

      {!isBreak && (
        <div className="locked">
          <p>Games available during breaks</p>
        </div>
      )}

      {isBreak && (
        <>
          {/* FULLSCREEN GAME */}
          {activeGame && (
            <div className="fullscreen-game">
              <button className="back-btn" onClick={() => setActiveGame(null)}>
                ⬅ Back
              </button>
              {renderGame()}
            </div>
          )}

          {/* BOTTOM DOCK */}
          <div className="game-dock">
  <div onClick={() => setActiveGame("typing")} className="dock-card typing">Typing</div>
  <div onClick={() => setActiveGame("mole")} className="dock-card mole">Mole</div>
  <div onClick={() => setActiveGame("memory")} className="dock-card memory">Memory</div>
  <div onClick={() => setActiveGame("snake")} className="dock-card snake">Snake</div>
  <div onClick={() => setActiveGame("timing")} className="dock-card timing">Timing</div>
  <div onClick={() => setActiveGame("flappy")} className="dock-card flappy">Flappy</div>
</div>
        </>
      )}
    </div>
  );
}

export default GamePanel;