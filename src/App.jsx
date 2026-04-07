import Timer from "./components/timer/timer";
import GameView from "./components/games/GameView";
import Calendar from "./components/calendar/Calendar";
import Navigation from "./components/navigation/Navigation";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("focus");
  const [mode, setMode] = useState("focus");

  return (
    <div className="app-container">
      {activeTab === "focus" && <Timer mode={mode} setMode={setMode} />}
      {activeTab === "games" && <GameView mode={mode} setMode={setMode} />}
      {activeTab === "calendar" && <Calendar />}

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;