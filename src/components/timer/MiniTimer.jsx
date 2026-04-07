import ProgressRing from "../timer/ProgressRing";
import useTimer from "../../hooks/useTimer";
import { useEffect } from "react";
import "./MiniTimer.css";

export default function MiniTimer({ mode, setMode }) {
  const getTime = () => {
    if (mode === "focus") return 1500;
    if (mode === "short") return 300;
    if (mode === "long") return 900;
  };

  const getColor = () => {
    if (mode === "focus") return "#a78bfa";
    if (mode === "short") return "#6ee7b7";
    if (mode === "long") return "#fdba74";
  };

  const { time, setTime, isRunning, setIsRunning } = useTimer(getTime());

  useEffect(() => {
    setTime(getTime());
    setIsRunning(false);
  }, [mode]);

  // Auto-stop when break time ends
  useEffect(() => {
    if (time === 0 && isRunning && (mode === "short" || mode === "long")) {
      setIsRunning(false);
    }
  }, [time, isRunning, mode]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const isBreakActive = (mode === "short" || mode === "long");
  const isFocusMode = mode === "focus";

  return (
    <div className="mini-timer">
      <div className="mini-timer-circle">
        <ProgressRing time={time} total={getTime()} color={getColor()} />
        <div className="mini-time-text">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>
      
      {isFocusMode && (
        <div className="focus-notice">Focus Time</div>
      )}
      
      {isBreakActive && (
        <div className="break-notice">Break Time 🎮</div>
      )}

      <button
        className="mini-timer-btn"
        onClick={() => setIsRunning(!isRunning)}
        title={isRunning ? "Pause" : "Start"}
      >
        {isRunning ? "⏸" : "▶"}
      </button>
    </div>
  );
}
