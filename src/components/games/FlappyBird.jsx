import { useState, useEffect } from "react";

function FlappyBird() {
  const [birdY, setBirdY] = useState(150);
  const [velocity, setVelocity] = useState(0);
  const [pipeX, setPipeX] = useState(300);
  const [gapY, setGapY] = useState(120);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const gameLoop = setInterval(() => {
      setBirdY((y) => y + velocity);
      setVelocity((v) => v + 1);
      setPipeX((x) => x - 5);

      if (pipeX < -50) {
        setPipeX(300);
        setGapY(Math.random() * 200);
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [running, velocity, pipeX]);

  const jump = () => {
    setVelocity(-8);
  };

  const startGame = () => {
    setBirdY(150);
    setVelocity(0);
    setPipeX(300);
    setRunning(true);
  };

  return (
    <div className="flappy-game" onClick={jump}>
      <div className="bird" style={{ top: birdY }}></div>

      <div className="pipe top" style={{ left: pipeX, height: gapY }}></div>
      <div
        className="pipe bottom"
        style={{ left: pipeX, top: gapY + 100 }}
      ></div>

      <button onClick={startGame}>
        {running ? "Restart" : "Start"}
      </button>
    </div>
  );
}

export default FlappyBird;