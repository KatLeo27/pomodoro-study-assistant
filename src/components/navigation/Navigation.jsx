import "./Navigation.css";

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "focus", label: "Focus" },
    { id: "games", label: "Games" },
    { id: "calendar", label: "Calendar" },
  ];

  return (
    <nav className="navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
