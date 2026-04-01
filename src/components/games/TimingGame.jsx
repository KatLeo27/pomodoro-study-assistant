import { useState, useEffect } from "react";

function TimingGame() {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setPosition((prev) => {
          let next = prev + direction * 5;

          if (next >= 100 || next <= 0) {
            setDirection((d) => -d);
          }

          return Math.max(0, Math.min(100, next));
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [running, direction]);

  const stopGame = () => {
    setRunning(false);

    const distance = Math.abs(50 - position);

    let score;
    if (distance < 5) score = "Perfect!";
    else if (distance < 15) score = "Good";
    else score = "Miss";

    setResult(score);
  };

  const startGame = () => {
    setPosition(0);
    setDirection(1);
    setResult(null);
    setRunning(true);
  };

  return (
    <div className="timing-game">
      <div className="bar">
        <div className="target"></div>
        <div
          className="slider"
          style={{ left: `${position}%` }}
        ></div>
      </div>

      <button onClick={running ? stopGame : startGame}>
        {running ? "Stop" : "Start"}
      </button>

      {result && <p>{result}</p>}
    </div>
  );
}

export default TimingGame;