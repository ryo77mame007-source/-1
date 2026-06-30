import { phrases } from "../data/phrases";
import { words } from "../data/words";
import { useStorage } from "../hooks/useStorage";

const BASICS_TOTAL = 26;

export default function HomeScreen({ reviewData, favorites, onNavigate }) {
  const today = new Date().toDateString();
  const [favoriteWordIds] = useStorage("favoriteWords", []);
  const [viewedBasics] = useStorage("viewedBasics", []);

  const dueForReview = phrases.filter((p) => {
    const rd = reviewData[p.id];
    return rd && new Date(rd.nextReview) <= new Date();
  });

  const emailPhrases = phrases.filter((p) => p.category === "Email");
  const meetingPhrases = phrases.filter((p) => p.category === "Meeting");

  const learnedEmail = emailPhrases.filter((p) => reviewData[p.id]).length;
  const learnedMeeting = meetingPhrases.filter((p) => reviewData[p.id]).length;

  const menuItems = [
    { id: "phrases", icon: "📧", label: "メール構文", sub: `${emailPhrases.length}構文`, color: "#1565C0" },
    { id: "meeting", icon: "💻", label: "会議構文", sub: `${meetingPhrases.length}構文`, color: "#00695C" },
    { id: "words", icon: "📚", label: "単語帳", sub: `${words.length}語`, color: "#AD1457" },
    { id: "basics", icon: "🌟", label: "超基礎英語", sub: `${BASICS_TOTAL}トピック`, color: "#F57F17" },
    { id: "test", icon: "✍️", label: "テスト", sub: "日→英 練習", color: "#6A1B9A" },
    { id: "review", icon: "🔄", label: "復習", sub: dueForReview.length > 0 ? `${dueForReview.length}件待ち` : "最新状態", color: "#E65100" },
    { id: "emails", icon: "📄", label: "メール例文", sub: "実務メール分解", color: "#2E7D32" },
    { id: "search", icon: "🔍", label: "検索", sub: "構文・単語を探す", color: "#37474F" },
    { id: "toeic", icon: "🗣️", label: "TOEIC SW", sub: "スピーキング練習", color: "#0277BD" },
  ];

  return (
    <div className="screen">
      <div className="home-header">
        <h1 className="app-title">Business English</h1>
        <p className="app-subtitle">for Aquaculture</p>
        <p className="home-date">{today}</p>
      </div>

      {/* Progress bars */}
      <div className="progress-section">
        <div className="progress-row">
          <span className="progress-label">📧 メール</span>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(learnedEmail / emailPhrases.length) * 100}%`, backgroundColor: "#1565C0" }}
            />
          </div>
          <span className="progress-text">{learnedEmail}/{emailPhrases.length}</span>
        </div>
        <div className="progress-row">
          <span className="progress-label">💻 会議</span>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(learnedMeeting / meetingPhrases.length) * 100}%`, backgroundColor: "#00695C" }}
            />
          </div>
          <span className="progress-text">{learnedMeeting}/{meetingPhrases.length}</span>
        </div>
        <div className="progress-row">
          <span className="progress-label">⭐ お気に入り</span>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(favorites.length / phrases.length) * 100}%`, backgroundColor: "#FF8F00" }}
            />
          </div>
          <span className="progress-text">{favorites.length}/{phrases.length}</span>
        </div>
        <div className="progress-row">
          <span className="progress-label">📚 単語</span>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(favoriteWordIds.length / words.length) * 100}%`, backgroundColor: "#AD1457" }}
            />
          </div>
          <span className="progress-text">{favoriteWordIds.length}/{words.length}</span>
        </div>
        <div className="progress-row">
          <span className="progress-label">🌟 超基礎</span>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(viewedBasics.length / BASICS_TOTAL) * 100}%`, backgroundColor: "#F57F17" }}
            />
          </div>
          <span className="progress-text">{viewedBasics.length}/{BASICS_TOTAL}</span>
        </div>
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
