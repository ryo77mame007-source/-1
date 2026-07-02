import { UNDERSTANDING_LEVELS } from "../utils/cards";
import DetailText from "./DetailText";
import UnderstandingBadge from "./UnderstandingBadge";

// The detail screen: the top ~3/4 of the viewport is dominated by the
// headline (title) and short recall description, so the gist of the card is
// visible at a glance without scrolling. A scrollable area below carries the
// fuller explanation.
export default function CardDetail({ card, onBack, onSetUnderstanding }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 pt-4 pb-2 shrink-0">
        <button
          onClick={onBack}
          className="text-slate-500 text-sm px-2 py-1 -ml-2 active:bg-slate-100 rounded-lg"
        >
          ← 戻る
        </button>
        <span className="text-xs text-slate-400 truncate">{card.category}</span>
      </div>

      <div className="flex-[3] min-h-0 flex flex-col items-center justify-center text-center px-6 py-4">
        <div className="text-xs font-medium text-indigo-400 mb-2 tracking-wide">大事なこと</div>
        <h1 className="text-3xl font-extrabold text-slate-900 leading-snug mb-5">{card.title}</h1>
        <div className="text-base text-slate-600 leading-relaxed max-w-sm">{card.shortDescription}</div>
      </div>

      <div className="flex-[1] min-h-0 overflow-y-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
        <div className="text-xs font-semibold text-slate-400 mb-2 tracking-wide">もう少し詳しく</div>
        <DetailText text={card.detailDescription} />

        {card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {card.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-200">
          <div className="text-xs font-semibold text-slate-400 mb-2">理解度</div>
          <div className="flex gap-2 mb-3">
            {UNDERSTANDING_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => onSetUnderstanding(level)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border ${
                  card.understanding === level
                    ? "border-indigo-400 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 text-slate-500"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-400 flex justify-between">
            <span>復習回数: {card.reviewCount}</span>
            <UnderstandingBadge level={card.understanding} />
          </div>
        </div>
      </div>
    </div>
  );
}
