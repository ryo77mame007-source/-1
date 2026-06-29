import { useState, useMemo } from "react";
import { phrases } from "../data/phrases";
import { calculateNextReview } from "../hooks/useStorage";

export default function TestMode({ reviewData, onUpdateReview }) {
  const [mode, setMode] = useState("select"); // select | test | result
  const [testSet, setTestSet] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState([]);
  const [testType, setTestType] = useState("all"); // all | weak | favorites

  const startTest = (type, count = 10) => {
    let pool = [...phrases];
    if (type === "weak") {
      pool = phrases.filter((p) => {
        const rd = reviewData[p.id];
        return !rd || rd.repetitions < 2;
      });
    }
    if (type === "important") {
      pool = phrases.filter((p) => p.importance >= 4);
    }

    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
    setTestSet(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
    setResults([]);
    setMode("test");
    setTestType(type);
  };

  const handleRate = (quality) => {
    const phrase = testSet[currentIndex];
    const rd = reviewData[phrase.id] || { repetitions: 0, interval: 1, easeFactor: 2.5 };
    const next = calculateNextReview(quality, rd.repetitions, rd.easeFactor, rd.interval);
    onUpdateReview(phrase.id, next);
    setResults((prev) => [...prev, { phrase, quality }]);

    if (currentIndex + 1 < testSet.length) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setMode("result");
    }
  };

  const qualityLabels = [
    { q: 5, label: "完璧", color: "#4CAF50", emoji: "😄" },
    { q: 4, label: "正解", color: "#8BC34A", emoji: "🙂" },
    { q: 3, label: "大体OK", color: "#FFC107", emoji: "😐" },
    { q: 1, label: "難しい", color: "#FF5722", emoji: "😕" },
    { q: 0, label: "わからない", color: "#f44336", emoji: "😞" },
  ];

  if (mode === "select") {
    const weakCount = phrases.filter((p) => !reviewData[p.id] || reviewData[p.id].repetitions < 2).length;
    return (
      <div className="screen">
        <h2 className="section-title">テスト</h2>
        <p className="section-desc">日本語を見て英語を考えるテストです。</p>

        <div className="test-options">
          <button className="test-option-card" onClick={() => startTest("all", 10)}>
            <div className="test-option-icon">📚</div>
            <div className="test-option-title">全構文から10問</div>
            <div className="test-option-sub">ランダムに出題</div>
          </button>
          <button className="test-option-card" onClick={() => startTest("important", 10)}>
            <div className="test-option-icon">⭐</div>
            <div className="test-option-title">重要構文（★4以上）</div>
            <div className="test-option-sub">{phrases.filter((p) => p.importance >= 4).length}問から10問</div>
          </button>
          <button className="test-option-card" onClick={() => startTest("weak", 10)}>
            <div className="test-option-icon">💪</div>
            <div className="test-option-title">苦手な構文</div>
            <div className="test-option-sub">{weakCount}件の未習得構文</div>
          </button>
          <button className="test-option-card" onClick={() => startTest("all", 20)}>
            <div className="test-option-icon">🎯</div>
            <div className="test-option-title">全構文から20問</div>
            <div className="test-option-sub">まとめてテスト</div>
          </button>
        </div>
      </div>
    );
  }

  if (mode === "result") {
    const perfect = results.filter((r) => r.quality >= 4).length;
    const good = results.filter((r) => r.quality === 3).length;
    const poor = results.filter((r) => r.quality < 3).length;

    return (
      <div className="screen">
        <h2 className="section-title">テスト結果</h2>
        <div className="result-summary">
          <div className="result-score">{Math.round((perfect / results.length) * 100)}点</div>
          <div className="result-detail">
            <span className="result-perfect">完璧/正解: {perfect}</span>
            <span className="result-good">大体OK: {good}</span>
            <span className="result-poor">要復習: {poor}</span>
          </div>
        </div>

        <div className="result-list">
          {results.map(({ phrase, quality }, i) => (
            <div key={i} className={`result-item quality-${quality >= 4 ? "good" : quality >= 3 ? "ok" : "poor"}`}>
              <div className="result-item-english">{phrase.english}</div>
              <div className="result-item-japanese">{phrase.japanese}</div>
              <div className="result-item-quality">{qualityLabels.find((q) => q.q === quality)?.emoji || "❓"}</div>
            </div>
          ))}
        </div>

        <button className="primary-btn" onClick={() => setMode("select")}>
          もう一度テストする
        </button>
      </div>
    );
  }

  const current = testSet[currentIndex];
  const progress = ((currentIndex) / testSet.length) * 100;

  return (
    <div className="screen">
      <div className="test-progress-bar">
        <div className="test-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="test-counter">{currentIndex + 1} / {testSet.length}</div>

      <div className="test-card">
        <div className="test-scene">場面: {current.scene}</div>
        <div className="test-question">{current.japanese}</div>

        {!showAnswer ? (
          <button className="show-answer-btn" onClick={() => setShowAnswer(true)}>
            答えを見る
          </button>
        ) : (
          <>
            <div className="test-answer">{current.english}</div>
            <div className="test-example">{current.examples[0]}</div>
            <div className="rating-label">理解度を選んでください</div>
            <div className="rating-btns">
              {qualityLabels.map(({ q, label, color, emoji }) => (
                <button
                  key={q}
                  className="rating-btn"
                  style={{ borderColor: color, color: color }}
                  onClick={() => handleRate(q)}
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
