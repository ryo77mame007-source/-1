import { useState } from "react";
import { phrases } from "../data/phrases";
import { calculateNextReview } from "../hooks/useStorage";

export default function ReviewMode({ reviewData, onUpdateReview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState(false);

  const duePhrasesAll = phrases.filter((p) => {
    const rd = reviewData[p.id];
    if (!rd) return false;
    return new Date(rd.nextReview) <= new Date();
  });

  const handleRate = (quality) => {
    const phrase = duePhrasesAll[currentIndex];
    const rd = reviewData[phrase.id];
    const next = calculateNextReview(quality, rd.repetitions, rd.easeFactor, rd.interval);
    onUpdateReview(phrase.id, next);

    if (currentIndex + 1 < duePhrasesAll.length) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setDone(true);
    }
  };

  if (duePhrasesAll.length === 0 || done) {
    return (
      <div className="screen">
        <div className="empty-state">
          <div className="empty-icon">🎉</div>
          <div className="empty-title">
            {duePhrasesAll.length === 0 ? "復習待ちはありません" : "復習完了！"}
          </div>
          <div className="empty-desc">
            {duePhrasesAll.length === 0
              ? "すべての構文は最新の状態です。テストモードで練習しましょう。"
              : `${duePhrasesAll.length}件の復習が完了しました。お疲れ様でした！`}
          </div>

          <div className="schedule-preview">
            <div className="schedule-title">次の復習スケジュール</div>
            {phrases
              .filter((p) => reviewData[p.id])
              .sort((a, b) => new Date(reviewData[a.id].nextReview) - new Date(reviewData[b.id].nextReview))
              .slice(0, 5)
              .map((p) => {
                const rd = reviewData[p.id];
                const nextDate = new Date(rd.nextReview);
                const daysUntil = Math.ceil((nextDate - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={p.id} className="schedule-item">
                    <span className="schedule-english">{p.english}</span>
                    <span className="schedule-days">
                      {daysUntil <= 0 ? "今日" : daysUntil === 1 ? "明日" : `${daysUntil}日後`}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  const current = duePhrasesAll[currentIndex];
  const rd = reviewData[current.id];
  const progress = (currentIndex / duePhrasesAll.length) * 100;

  const qualityLabels = [
    { q: 5, label: "完璧", color: "#4CAF50", emoji: "😄" },
    { q: 4, label: "正解", color: "#8BC34A", emoji: "🙂" },
    { q: 3, label: "大体OK", color: "#FFC107", emoji: "😐" },
    { q: 1, label: "難しい", color: "#FF5722", emoji: "😕" },
    { q: 0, label: "わからない", color: "#f44336", emoji: "😞" },
  ];

  return (
    <div className="screen">
      <div className="review-header">
        <div className="review-title">復習</div>
        <div className="review-counter">{currentIndex + 1}/{duePhrasesAll.length}</div>
      </div>

      <div className="test-progress-bar">
        <div className="test-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="review-meta">
        <span>復習回数: {rd.repetitions}</span>
        <span>間隔: {rd.interval}日</span>
      </div>

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
