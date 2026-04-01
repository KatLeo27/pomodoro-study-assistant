import { useState, useEffect } from "react";

function WhackAMole() {
  const [score, setScore] = useState(0);
  const [circle, setCircle] = useState(null);
  const [time, setTime] = useState(15);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (running && time > 0) {
      timer = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }

    if (time === 0) {
      setRunning(false);
      setCircle(null);
    }

    return () => clearInterval(timer);
  }, [running, time]);

  useEffect(() => {
    if (running) {
      spawnCircle();
    }
  }, [running]);

  const spawnCircle = () => {
    const size = 50;

    const x = Math.random() * 250;
    const y = Math.random() * 150;

    setCircle({ x, y, size });

    setTimeout(() => {
      setCircle(null);
    }, Math.max(300, 800 - score * 20));
  };

  const handleClick = () => {
    setScore((s) => s + 1);
    spawnCircle();
  };

  const startGame = () => {
    setScore(0);
    setTime(15);
    setRunning(true);
  };

  return (
    <div className="focus-game">
      <p>Score: {score}</p>
      <p>Time: {time}s</p>

      <button onClick={startGame}>
        {running ? "Restart" : "Start"}
      </button>

      <div className="game-area">
        {circle && (
          <div
            className="circle"
            onClick={handleClick}
            style={{
              left: circle.x,
              top: circle.y,
              width: circle.size,
              height: circle.size,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default WhackAMole;