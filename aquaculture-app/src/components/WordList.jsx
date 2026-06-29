import { useState, useMemo } from "react";
import { words, wordCategories } from "../data/words";
import { useStorage } from "../hooks/useStorage";

const POS_COLORS = {
  "n.": "#1976D2",
  "v.": "#2E7D32",
  "adj.": "#E65100",
  "adv.": "#7B1FA2",
  "conj.": "#00695C",
  "phrase": "#5C6B7A",
  "abbr.": "#C62828",
  "prep.": "#6D4C41",
  "adj./adv.": "#E65100",
};

function WordCard({ word, isFavorite, onFavorite }) {
  const [expanded, setExpanded] = useState(false);
  const badgeColor = POS_COLORS[word.pos] || "#5C6B7A";

  return (
    <div
      className="word-card"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="word-card-top">
        <span className="word-pos-badge" style={{ background: badgeColor }}>
          {word.pos}
        </span>
        <button
          className="word-fav-btn"
          onClick={(e) => { e.stopPropagation(); onFavorite(); }}
          aria-label={isFavorite ? "お気に入り解除" : "お気に入り登録"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <div className="word-english">{word.english}</div>
      <div className="word-japanese">{word.japanese}</div>
      {expanded && word.collocation && (
        <div className="word-collocation">
          <span className="collocation-label">例：</span>
          {word.collocation}
        </div>
      )}
    </div>
  );
}

export default function WordList() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteWordIds, setFavoriteWordIds] = useStorage("favoriteWords", []);

  const filtered = useMemo(() => {
    let list = words;
    if (selectedCategory !== "すべて") {
      list = list.filter((w) => w.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (w) =>
          w.english.toLowerCase().includes(q) ||
          w.japanese.includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const toggleFavorite = (id) => {
    setFavoriteWordIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="word-list-screen">
      <div className="word-header">
        <h2 className="word-title">単語帳</h2>
        <div className="word-search-wrap">
          <input
            className="word-search-input"
            type="search"
            placeholder="英語・日本語で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="word-chip-scroll">
          {wordCategories.map((cat) => (
            <button
              key={cat}
              className={`word-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="word-meta">
          {selectedCategory !== "すべて" && (
            <span className="word-category-label">{selectedCategory} / </span>
          )}
          <span>{filtered.length}語</span>
          {searchQuery && <span> 「{searchQuery}」</span>}
        </div>
      </div>

      <div className="word-grid-scroll">
        {filtered.length === 0 ? (
          <div className="word-empty">該当する単語が見つかりません</div>
        ) : (
          <div className="word-grid">
            {filtered.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                isFavorite={favoriteWordIds.includes(word.id)}
                onFavorite={() => toggleFavorite(word.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
