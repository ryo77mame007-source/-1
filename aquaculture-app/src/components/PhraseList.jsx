import { useState } from "react";
import { phrases } from "../data/phrases";

const tagGroups = {
  Email: [
    { label: "すべて", filter: () => true },
    { label: "Could you...?", filter: (p) => p.english.startsWith("Could you") },
    { label: "Would you...?", filter: (p) => p.english.startsWith("Would") },
    { label: "We would like to", filter: (p) => p.english.startsWith("We would like to") },
    { label: "We would appreciate", filter: (p) => p.english.startsWith("We would appreciate") },
    { label: "Please", filter: (p) => p.english.startsWith("Please") },
    { label: "We will/have", filter: (p) => p.english.startsWith("We will") || p.english.startsWith("We have") },
    { label: "Thank you", filter: (p) => p.english.startsWith("Thank you") },
    { label: "Regarding/Based on", filter: (p) => p.tags.includes("reference") || p.tags.includes("reasoning") },
    { label: "Opening/Closing", filter: (p) => p.tags.includes("opening") || p.tags.includes("closing") },
  ],
  Meeting: [
    { label: "すべて", filter: () => true },
    { label: "会議開始", filter: (p) => p.tags.includes("opening") },
    { label: "技術トラブル", filter: (p) => p.tags.includes("technical") },
    { label: "聞き返し・確認", filter: (p) => p.tags.includes("clarification") },
    { label: "発言・割り込み", filter: (p) => p.tags.includes("turn-taking") },
    { label: "プレゼン", filter: (p) => p.tags.includes("presentation") },
    { label: "意見・同意", filter: (p) => p.tags.includes("opinion") || p.tags.includes("agreement") || p.tags.includes("disagreement") },
    { label: "アクション", filter: (p) => p.tags.includes("action-item") || p.tags.includes("deadline") },
    { label: "クロージング", filter: (p) => p.tags.includes("closing") },
  ],
};

export default function PhraseList({ favorites, reviewData, onSelect, initialTab = "Email" }) {
  const [mainTab, setMainTab] = useState(initialTab);
  const [subFilter, setSubFilter] = useState("すべて");
  const [sortBy, setSortBy] = useState("id");

  const handleTabChange = (tab) => {
    setMainTab(tab);
    setSubFilter("すべて");
  };

  const filters = tagGroups[mainTab];
  const currentFilter = filters.find((f) => f.label === subFilter) || filters[0];

  const pool = phrases.filter((p) => p.category === mainTab);
  const filtered = pool
    .filter(currentFilter.filter)
    .sort((a, b) => {
      if (sortBy === "importance") return b.importance - a.importance;
      if (sortBy === "learned") return (reviewData[b.id] ? 1 : 0) - (reviewData[a.id] ? 1 : 0);
      return a.id - b.id;
    });

  return (
    <div className="screen">
      {/* Main tab */}
      <div className="main-tab-bar">
        {["Email", "Meeting"].map((tab) => (
          <button
            key={tab}
            className={`main-tab-btn ${mainTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab === "Email" ? "📧 メール" : "💻 オンライン会議"}
            <span className="main-tab-count">
              {phrases.filter((p) => p.category === tab).length}構文
            </span>
          </button>
        ))}
      </div>

      {/* Header row */}
      <div className="section-header" style={{ paddingTop: 12 }}>
        <span className="list-count">{filtered.length}件</span>
        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">番号順</option>
          <option value="importance">重要度順</option>
          <option value="learned">学習済み</option>
        </select>
      </div>

      {/* Sub filter chips */}
      <div className="category-scroll">
        {filters.map((f) => (
          <button
            key={f.label}
            className={`category-chip ${subFilter === f.label ? "active" : ""}`}
            onClick={() => setSubFilter(f.label)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Phrase rows */}
      <div className="phrase-list">
        {filtered.map((phrase) => {
          const rd = reviewData[phrase.id];
          const isFav = favorites.includes(phrase.id);
          const isMastered = rd && rd.repetitions >= 3;
          const isLearned = !!rd;

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
