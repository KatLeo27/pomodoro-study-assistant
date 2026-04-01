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

  return (
    <div className="game-panel glass">
      {!isBreak && (
        <div className="locked">
          <p>Games available during breaks</p>
        </div>
      )}

      {isBreak && (
        <>
          <div className="game-grid">
            <div onClick={() => setActiveGame("typing")} className="game-card typing">Typing</div>
            <div onClick={() => setActiveGame("mole")} className="game-card mole">Whack-a-Mole</div>
            <div onClick={() => setActiveGame("memory")} className="game-card memory">Memory</div>
            <div onClick={() => setActiveGame("snake")} className="game-card snake">Snake</div>
            <div onClick={() => setActiveGame("timing")} className="game-card timing">Timing</div>
            <div onClick={() => setActiveGame("flappy")} className="game-card flappy">Flappy</div>
          </div>

          <div className="game-display">
            {activeGame === "typing" && <TypingGame />}
            {activeGame === "mole" && <WhackAMole />}
            {activeGame === "memory" && <MemoryGame />}
            {activeGame === "snake" && <SnakeGame />}
            {activeGame === "timing" && <TimingGame />}
            {activeGame === "flappy" && <FlappyBird />}
          </div>
        </>
      )}
    </div>
  );
}

export default GamePanel;