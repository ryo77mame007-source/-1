import { useState } from "react";
import { phrases } from "../data/phrases";

export default function SearchMode({ onSelect }) {
  const [query, setQuery] = useState("");

  const results = query.trim().length >= 1
    ? phrases.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.english.toLowerCase().includes(q) ||
          p.japanese.includes(q) ||
          p.scene.includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.examples.some((e) => e.toLowerCase().includes(q)) ||
          p.variations.some((v) => v.toLowerCase().includes(q)) ||
          p.points.includes(q)
        );
      })
    : [];

  const highlight = (text, q) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="highlight">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const suggestedSearches = ["thank", "confirm", "request", "attach", "delivery", "sensor", "calibr", "謝罪", "確認", "依頼", "添付"];

  return (
    <div className="screen">
      <h2 className="section-title">検索</h2>

      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="英語・日本語・場面で検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery("")}>✕</button>
        )}
      </div>

      {!query && (
        <div className="suggested-searches">
          <div className="suggested-title">よく検索されるワード</div>
          <div className="suggested-chips">
            {suggestedSearches.map((s) => (
              <button key={s} className="suggested-chip" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <div>「{query}」に一致する構文が見つかりません</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="search-results">
          <div className="results-count">{results.length}件見つかりました</div>
          {results.map((phrase) => (
            <button key={phrase.id} className="phrase-row" onClick={() => onSelect(phrase)}>
              <div className="phrase-row-left">
                <span className="phrase-num">No.{phrase.id}</span>
                <div className="phrase-row-content">
                  <div className="phrase-row-english">{highlight(phrase.english, query)}</div>
                  <div className="phrase-row-japanese">{highlight(phrase.japanese, query)}</div>
                </div>
              </div>
              <div className="phrase-row-right">
                <span className="detail-category">{phrase.category}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
