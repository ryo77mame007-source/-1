import { phrases } from "../data/phrases";

export default function FavoritesMode({ favorites, onSelect }) {
  const favPhrases = phrases.filter((p) => favorites.includes(p.id));

  if (favPhrases.length === 0) {
    return (
      <div className="screen">
        <h2 className="section-title">お気に入り</h2>
        <div className="empty-state">
          <div className="empty-icon">☆</div>
          <div className="empty-title">お気に入りがありません</div>
          <div className="empty-desc">構文の詳細画面で ☆ をタップして登録してください。</div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <h2 className="section-title">お気に入り</h2>
      <p className="section-desc">{favPhrases.length}件登録されています</p>

      <div className="phrase-list">
        {favPhrases.map((phrase) => (
          <button key={phrase.id} className="phrase-row" onClick={() => onSelect(phrase)}>
            <div className="phrase-row-left">
              <span className="phrase-num">No.{phrase.id}</span>
              <div className="phrase-row-content">
                <div className="phrase-row-english">{phrase.english}</div>
                <div className="phrase-row-japanese">{phrase.japanese}</div>
              </div>
            </div>
            <div className="phrase-row-right">
              <span className="badge-star">⭐</span>
              <span className="importance-dots">{"★".repeat(phrase.importance)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
