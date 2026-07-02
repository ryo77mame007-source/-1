import { useState } from "react";
import { useCards } from "./hooks/useCards";
import HomeScreen from "./components/HomeScreen";
import CardList from "./components/CardList";
import CardDetail from "./components/CardDetail";
import ReviewMode from "./components/ReviewMode";
import QuizMode from "./components/QuizMode";
import AddScreen from "./components/AddScreen";

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "ホーム" },
  { id: "list", icon: "🗂️", label: "一覧" },
  { id: "review", icon: "🔄", label: "復習" },
  { id: "quiz", icon: "❓", label: "一問一答" },
  { id: "add", icon: "➕", label: "追加" },
];

export default function App() {
  const { cards, addCards, updateCard } = useCards();
  const [screen, setScreen] = useState("home");
  const [previousScreen, setPreviousScreen] = useState("home");
  const [selectedCardId, setSelectedCardId] = useState(null);

  const navigate = (target) => {
    setPreviousScreen(screen);
    setScreen(target);
    setSelectedCardId(null);
  };

  const openCard = (card) => {
    setPreviousScreen(screen);
    setSelectedCardId(card.id);
    setScreen("detail");
  };

  const handleBack = () => {
    setSelectedCardId(null);
    setScreen(previousScreen);
  };

  const selectedCard = selectedCardId ? cards.find((c) => c.id === selectedCardId) : null;

  const renderScreen = () => {
    if (screen === "detail" && selectedCard) {
      return (
        <CardDetail
          card={selectedCard}
          onBack={handleBack}
          onSetUnderstanding={(level) =>
            updateCard(selectedCard.id, { ...selectedCard, understanding: level, updatedAt: new Date().toISOString() })
          }
        />
      );
    }

    switch (screen) {
      case "home":
        return <HomeScreen cards={cards} onNavigate={navigate} />;
      case "list":
        return <CardList cards={cards} onSelect={openCard} />;
      case "review":
        return <ReviewMode cards={cards} onUpdateCard={(c) => updateCard(c.id, c)} />;
      case "quiz":
        return <QuizMode cards={cards} onUpdateCard={(c) => updateCard(c.id, c)} />;
      case "add":
        return <AddScreen onAddCards={addCards} />;
      default:
        return <HomeScreen cards={cards} onNavigate={navigate} />;
    }
  };

  const activeNavId = screen === "detail" ? previousScreen : screen;

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-xl">
        <div className="flex-1 min-h-0">{renderScreen()}</div>

        <nav className="shrink-0 grid grid-cols-5 border-t border-slate-100 bg-white">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center py-2 text-xs gap-0.5 ${
                activeNavId === item.id ? "text-indigo-500" : "text-slate-400"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
