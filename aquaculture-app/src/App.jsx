import { useState } from "react";
import { useStorage } from "./hooks/useStorage";
import HomeScreen from "./components/HomeScreen";
import PhraseList from "./components/PhraseList";
import PhraseDetail from "./components/PhraseDetail";
import TestMode from "./components/TestMode";
import ReviewMode from "./components/ReviewMode";
import EmailExamples from "./components/EmailExamples";
import SearchMode from "./components/SearchMode";
import FavoritesMode from "./components/FavoritesMode";
import "./App.css";

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "ホーム" },
  { id: "phrases", icon: "📚", label: "構文" },
  { id: "test", icon: "✍️", label: "テスト" },
  { id: "review", icon: "🔄", label: "復習" },
  { id: "search", icon: "🔍", label: "検索" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [previousScreen, setPreviousScreen] = useState("home");
  const [favorites, setFavorites] = useStorage("favorites", []);
  const [reviewData, setReviewData] = useStorage("reviewData", {});

  const navigate = (target) => {
    setPreviousScreen(screen);
    setScreen(target);
    setSelectedPhrase(null);
  };

  const openPhrase = (phrase, from) => {
    setPreviousScreen(from || screen);
    setSelectedPhrase(phrase);
    setScreen("detail");
  };

  const handleBack = () => {
    setSelectedPhrase(null);
    setScreen(previousScreen);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const markLearned = (id) => {
    setReviewData((prev) => {
      if (prev[id]) return prev;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return {
        ...prev,
        [id]: { repetitions: 0, interval: 1, easeFactor: 2.5, nextReview: tomorrow.toISOString() },
      };
    });
  };

  const updateReview = (id, data) => {
    setReviewData((prev) => ({ ...prev, [id]: data }));
  };

  const renderScreen = () => {
    if (screen === "detail" && selectedPhrase) {
      return (
        <PhraseDetail
          phrase={selectedPhrase}
          isFavorite={favorites.includes(selectedPhrase.id)}
          onToggleFavorite={toggleFavorite}
          onBack={handleBack}
          onMarkLearned={markLearned}
        />
      );
    }

    switch (screen) {
      case "home":
        return <HomeScreen reviewData={reviewData} favorites={favorites} onNavigate={navigate} />;
      case "phrases":
        return <PhraseList favorites={favorites} reviewData={reviewData} onSelect={(p) => openPhrase(p, "phrases")} />;
      case "test":
        return <TestMode reviewData={reviewData} onUpdateReview={updateReview} />;
      case "review":
        return <ReviewMode reviewData={reviewData} onUpdateReview={updateReview} />;
      case "emails":
        return <EmailExamples />;
      case "search":
        return <SearchMode onSelect={(p) => openPhrase(p, "search")} />;
      case "favorites":
        return <FavoritesMode favorites={favorites} onSelect={(p) => openPhrase(p, "favorites")} />;
      default:
        return <HomeScreen reviewData={reviewData} favorites={favorites} onNavigate={navigate} />;
    }
  };

  const activeNavId = screen === "detail" ? previousScreen : screen;

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="main-content">{renderScreen()}</div>

        <nav className="bottom-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNavId === item.id ? "active" : ""}`}
              onClick={() => navigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
