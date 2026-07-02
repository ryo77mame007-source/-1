import { isDue } from "../utils/cards";

const TILES = [
  { id: "list", icon: "🗂️", label: "カード一覧", desc: "登録したカードを見る" },
  { id: "review", icon: "🔄", label: "復習", desc: "期限のきたカードを復習" },
  { id: "quiz", icon: "❓", label: "一問一答", desc: "全カードでクイズ形式に確認" },
  { id: "add", icon: "➕", label: "追加・アップロード", desc: "手動入力 / JSONで一括登録" },
];

export default function HomeScreen({ cards, onNavigate }) {
  const dueCount = cards.filter((c) => isDue(c)).length;

  return (
    <div className="h-full overflow-y-auto px-4 py-6">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">知識カード</h1>
      <p className="text-sm text-slate-500 mb-6">大事なことを、忘れる前に。</p>

      <div className="grid grid-cols-2 gap-3">
        {TILES.map((tile) => (
          <button
            key={tile.id}
            onClick={() => onNavigate(tile.id)}
            className="relative bg-white border border-slate-200 rounded-2xl p-4 text-left active:bg-slate-50"
          >
            {tile.id === "review" && dueCount > 0 && (
              <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                {dueCount}
              </span>
            )}
            <div className="text-2xl mb-2">{tile.icon}</div>
            <div className="font-bold text-slate-800 text-sm">{tile.label}</div>
            <div className="text-xs text-slate-400 mt-1">{tile.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 bg-slate-50 rounded-xl p-4 flex justify-between text-sm text-slate-500">
        <span>登録カード数</span>
        <span className="font-bold text-slate-700">{cards.length}枚</span>
      </div>
    </div>
  );
}
