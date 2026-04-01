import { useState, useEffect } from "react";

const sentences = [
  "Practice makes perfect",
  "Stay focused and keep learning",
  "Consistency is the key to success",
  "Small steps lead to big results",
  "Discipline beats motivation"
];

function TypingGame() {
  const [text, setText] = useState("");
  const [target, setTarget] = useState("");
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setTarget(sentences[Math.floor(Math.random() * sentences.length)]);
  }, []);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }

    if (time === 0) {
      setRunning(false);
      calculateResult();
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const startGame = () => {
    setText("");
    setTime(30);
    setRunning(true);
    setResult(null);
    setTarget(sentences[Math.floor(Math.random() * sentences.length)]);
  };

  const calculateResult = () => {
    let correct = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === target[i]) correct++;
    }

    const accuracy = ((correct / target.length) * 100).toFixed(0);
    const words = text.split(" ").length;
    const wpm = words * 2;

    setResult({ accuracy, wpm });
  };

  return (
    <div className="typing-game">
      <p className="target-text">{target}</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!running}
        placeholder="Start typing..."
      />

      <p>Time: {time}s</p>

      <button onClick={startGame}>
        {running ? "Restart" : "Start"}
      </button>

      {result && (
        <div className="result">
          <p>WPM: {result.wpm}</p>
          <p>Accuracy: {result.accuracy}%</p>
        </div>
      )}
    </div>
  );
}

export default TypingGame;