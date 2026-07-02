import { useMemo, useState } from "react";
import UnderstandingBadge from "./UnderstandingBadge";

export default function CardList({ cards, onSelect }) {
  const [category, setCategory] = useState("すべて");

  const categories = useMemo(() => {
    const set = new Set(cards.map((c) => c.category));
    return ["すべて", ...Array.from(set)];
  }, [cards]);

  const filtered = category === "すべて" ? cards : cards.filter((c) => c.category === category);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 shrink-0">
        <h2 className="text-lg font-bold text-slate-800 mb-3">カード一覧</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                category === cat ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-2">
        {filtered.length === 0 && (
          <div className="text-center text-sm text-slate-400 mt-10">カードがありません</div>
        )}
        {filtered.map((card) => (
          <button
            key={card.id}
            onClick={() => onSelect(card)}
            className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 active:bg-slate-50"
          >
            <div className="flex justify-between items-start gap-2 mb-1">
              <div className="font-bold text-slate-800 leading-snug">{card.title}</div>
              <UnderstandingBadge level={card.understanding} />
            </div>
            <div className="text-sm text-slate-500 line-clamp-2">{card.shortDescription}</div>
            <div className="text-xs text-slate-400 mt-2">{card.category}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
