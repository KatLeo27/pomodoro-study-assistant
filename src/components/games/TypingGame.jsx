import { useState, useEffect, useRef } from "react";

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog like it’s late for class and suddenly remembered there was a test today",
  "Practice makes perfect, but honestly some days it just feels like you’re practicing being confused and that’s okay too",
  "Focus is the key to unlocking your potential, but your phone notifications really have other plans for you every five minutes",
  "Every moment of concentration builds your strength, even if half those moments are spent wondering what you were doing",
  "Small steps every day lead to big achievements, unless you trip over your own plans and then start again tomorrow",
  "Discipline is choosing between what you want now and what you want most, like snacks vs success… a daily struggle",
  "The only way to do great work is to love what you do, or at least pretend you do until it starts growing on you"
];

export default function TypingGame() {
  const [target, setTarget] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const newRound = () => {
    setTarget(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput("");
    setStartTime(null);
    setWpm(null);
    setAccuracy(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => { newRound(); }, []);

  const handleInput = (val) => {
    if (!startTime) setStartTime(Date.now());
    setInput(val);

    if (val.length >= target.length) {
      const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
      const words = target.split(" ").length;
      setWpm(Math.round(words / elapsed));

      let correct = 0;
      for (let i = 0; i < target.length; i++) {
        if (val[i] === target[i]) correct++;
      }
      setAccuracy(Math.round((correct / target.length) * 100));
    }
  };

  return (
    <div className="typing-game">
      <p className="target-text">{target}</p>

      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        disabled={wpm !== null}
        placeholder="Start typing..."
      />

      <p>Time: {startTime ? Math.floor((currentTime - startTime) / 1000) : 0}s</p>

      <button onClick={newRound}>
        {wpm !== null ? "Try Again" : "Start"}
      </button>

      {wpm !== null && (
        <div className="result">
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
        </div>
      )}
    </div>
  );
}
