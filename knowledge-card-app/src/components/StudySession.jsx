import { useState } from "react";
import { applyReviewResult, formatRelativeDays } from "../utils/cards";
import DetailText from "./DetailText";

// Shared flip-card flow used by both ReviewMode (due cards, SRS-scheduled)
// and QuizMode (一問一答, all cards): title only -> tap to reveal the short
// answer -> optional "詳しく見る" for the fuller explanation -> rate
// understanding to advance and reschedule the card.
export default function StudySession({ heading, cards, onUpdateCard, emptyTitle, emptyDesc, upcoming }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [done, setDone] = useState(false);

  const advance = (understanding) => {
    const card = cards[index];
    onUpdateCard(applyReviewResult(card, understanding));
    setRevealed(false);
    setShowDetail(false);
    if (index + 1 < cards.length) {
      setIndex((i) => i + 1);
    } else {
      setDone(true);
    }
  };

  if (cards.length === 0 || done) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="text-5xl mb-4">{cards.length === 0 ? "🎉" : "✅"}</div>
        <div className="text-lg font-bold text-slate-800 mb-2">
          {cards.length === 0 ? emptyTitle : "完了しました！"}
        </div>
        <div className="text-sm text-slate-500 mb-6">
          {cards.length === 0 ? emptyDesc : `${cards.length}枚のカードを確認しました。`}
        </div>
        {upcoming && upcoming.length > 0 && (
          <div className="w-full bg-slate-50 rounded-xl p-4 text-left">
            <div className="text-xs font-semibold text-slate-400 mb-2">次の復習予定</div>
            {upcoming.map((c) => (
              <div key={c.id} className="flex justify-between text-sm py-1">
                <span className="text-slate-600 truncate mr-2">{c.title}</span>
                <span className="text-slate-400 shrink-0">{formatRelativeDays(c.nextReviewAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const card = cards[index];
  const progress = (index / cards.length) * 100;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-slate-700">{heading}</span>
          <span className="text-xs text-slate-400">{index + 1} / {cards.length}</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
        <div className="text-xs text-slate-400 mb-3">{card.category}</div>

        <button
          type="button"
          onClick={() => !revealed && setRevealed(true)}
          className={`w-full text-left rounded-2xl border border-slate-200 p-6 mb-4 ${!revealed ? "active:bg-slate-50" : ""}`}
        >
          <div className="text-xl font-bold text-slate-900 leading-snug">{card.title}</div>

          {revealed && (
            <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed">
              {card.shortDescription}
            </div>
          )}
        </button>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-3 rounded-xl bg-indigo-500 text-white font-semibold active:bg-indigo-600"
          >
            答えを見る
          </button>
        ) : (
          <>
            <button
              onClick={() => setShowDetail((v) => !v)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium mb-4 active:bg-slate-50"
            >
              {showDetail ? "詳しい説明を閉じる" : "詳しく見る"}
            </button>

            {showDetail && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <DetailText text={card.detailDescription} />
              </div>
            )}

            <div className="text-xs font-semibold text-slate-400 mb-2">理解度を選んでください</div>
            <div className="flex gap-2 pb-2">
              <button onClick={() => advance("不安")} className="flex-1 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-sm font-semibold active:bg-rose-100">
                不安
              </button>
              <button onClick={() => advance("普通")} className="flex-1 py-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-sm font-semibold active:bg-amber-100">
                普通
              </button>
              <button onClick={() => advance("覚えた")} className="flex-1 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold active:bg-emerald-100">
                覚えた
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
