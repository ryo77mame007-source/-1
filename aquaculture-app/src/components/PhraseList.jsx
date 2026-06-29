import { useState } from "react";
import { phrases, categories } from "../data/phrases";

export default function PhraseList({ favorites, reviewData, onSelect }) {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortBy, setSortBy] = useState("id");

  const filtered = phrases
    .filter((p) => selectedCategory === "すべて" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "importance") return b.importance - a.importance;
      if (sortBy === "learned") {
        const aLearned = reviewData[a.id] ? 1 : 0;
        const bLearned = reviewData[b.id] ? 1 : 0;
        return bLearned - aLearned;
      }
      return a.id - b.id;
    });

  return (
    <div className="screen">
      <div className="section-header">
        <h2>構文一覧</h2>
        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">番号順</option>
          <option value="importance">重要度順</option>
          <option value="learned">学習済み</option>
        </select>
      </div>

      <div className="category-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="phrase-list">
        {filtered.map((phrase) => {
          const rd = reviewData[phrase.id];
          const isFav = favorites.includes(phrase.id);
          const isLearned = !!rd;
          const isMastered = rd && rd.repetitions >= 3;

          return (
            <button key={phrase.id} className="phrase-row" onClick={() => onSelect(phrase)}>
              <div className="phrase-row-left">
                <span className="phrase-num">No.{phrase.id}</span>
                <div className="phrase-row-content">
                  <div className="phrase-row-english">{phrase.english}</div>
                  <div className="phrase-row-japanese">{phrase.japanese}</div>
                </div>
              </div>
              <div className="phrase-row-right">
                {isFav && <span className="badge-star">⭐</span>}
                {isMastered && <span className="badge-mastered">定着</span>}
                {isLearned && !isMastered && <span className="badge-learned">学習中</span>}
                <span className="importance-dots">
                  {"★".repeat(phrase.importance)}{"☆".repeat(5 - phrase.importance)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
