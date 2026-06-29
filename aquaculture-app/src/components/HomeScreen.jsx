import { phrases } from "../data/phrases";

export default function HomeScreen({ reviewData, favorites, onNavigate }) {
  const today = new Date().toDateString();
  const dueForReview = phrases.filter((p) => {
    const rd = reviewData[p.id];
    if (!rd) return false;
    return new Date(rd.nextReview) <= new Date();
  });

  const learnedCount = Object.keys(reviewData).length;
  const masteredCount = Object.values(reviewData).filter((r) => r.repetitions >= 3).length;

  const stats = [
    { label: "学習済み", value: learnedCount, total: phrases.length, color: "#4CAF50" },
    { label: "定着済み", value: masteredCount, total: phrases.length, color: "#2196F3" },
    { label: "お気に入り", value: favorites.length, total: phrases.length, color: "#FF9800" },
    { label: "復習待ち", value: dueForReview.length, total: null, color: "#f44336" },
  ];

  const menuItems = [
    { id: "phrases", icon: "📚", label: "構文一覧", sub: `全${phrases.length}構文`, color: "#4CAF50" },
    { id: "test", icon: "✍️", label: "テスト", sub: "日→英 練習", color: "#2196F3" },
    { id: "review", icon: "🔄", label: "復習", sub: dueForReview.length > 0 ? `${dueForReview.length}件待ち` : "すべて最新", color: "#FF9800" },
    { id: "emails", icon: "📧", label: "メール例文", sub: "実務メール分解", color: "#9C27B0" },
    { id: "search", icon: "🔍", label: "検索", sub: "構文・単語を探す", color: "#607D8B" },
    { id: "favorites", icon: "⭐", label: "お気に入り", sub: `${favorites.length}件登録済み`, color: "#FF5722" },
  ];

  return (
    <div className="screen">
      <div className="home-header">
        <h1 className="app-title">Business English</h1>
        <p className="app-subtitle">for Aquaculture</p>
        <p className="home-date">{today}</p>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>
              {s.value}
              {s.total && <span className="stat-total">/{s.total}</span>}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {dueForReview.length > 0 && (
        <button className="review-banner" onClick={() => onNavigate("review")}>
          <span>🔄 {dueForReview.length}件の復習が待っています</span>
          <span className="arrow">›</span>
        </button>
      )}

      <div className="menu-grid">
        {menuItems.map((item) => (
          <button key={item.id} className="menu-card" onClick={() => onNavigate(item.id)}>
            <div className="menu-icon" style={{ backgroundColor: item.color + "20" }}>
              {item.icon}
            </div>
            <div className="menu-label">{item.label}</div>
            <div className="menu-sub">{item.sub}</div>
          </button>
        ))}
      </div>

      <div className="home-tip">
        💡 1日5構文を目標に学習しましょう
      </div>
    </div>
  );
}
