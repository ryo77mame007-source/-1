import { useRef, useState } from "react";
import { UNDERSTANDING_LEVELS, createCard, parseUploadJson } from "../utils/cards";

const SAMPLE_JSON = `[
  {
    "title": "GPUは並列計算が得意",
    "shortDescription": "GPUは大量の計算を同時に処理するのが得意。AIや画像処理で重要。",
    "detailDescription": "CPUは少数の複雑な処理が得意なのに対し、GPUは大量の単純な計算を同時に処理するのが得意。AIの学習や画像処理、データセンターで重要になる。",
    "category": "AI・IT・半導体",
    "tags": ["GPU", "CPU", "AI", "データセンター"],
    "understanding": "普通"
  }
]`;

function ManualForm({ onAddCards }) {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    detailDescription: "",
    category: "",
    tags: "",
    understanding: "普通",
  });
  const [message, setMessage] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.shortDescription.trim()) {
      setMessage("「大事なこと」と「短い説明」は必須です。");
      return;
    }
    const card = createCard({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    onAddCards([card]);
    setForm({ title: "", shortDescription: "", detailDescription: "", category: "", tags: "", understanding: "普通" });
    setMessage("カードを追加しました。");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-xs font-semibold text-slate-500">大事なこと（10〜20文字）</label>
        <input
          value={form.title}
          onChange={update("title")}
          placeholder="例: GPUは並列計算が得意"
          className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500">短い説明（思い出せる説明）</label>
        <textarea
          value={form.shortDescription}
          onChange={update("shortDescription")}
          rows={2}
          className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500">詳しい説明（補足・具体例・関連知識・覚え方・使いどころ）</label>
        <textarea
          value={form.detailDescription}
          onChange={update("detailDescription")}
          rows={5}
          className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-500">カテゴリ</label>
          <input value={form.category} onChange={update("category")} className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">タグ（カンマ区切り）</label>
          <input value={form.tags} onChange={update("tags")} className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500">理解度</label>
        <div className="flex gap-2 mt-1">
          {UNDERSTANDING_LEVELS.map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setForm((f) => ({ ...f, understanding: level }))}
              className={`flex-1 py-2 rounded-lg text-sm border ${
                form.understanding === level ? "border-indigo-400 bg-indigo-50 text-indigo-600" : "border-slate-200 text-slate-500"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      {message && <div className="text-xs text-indigo-500">{message}</div>}
      <button type="submit" className="w-full py-3 rounded-xl bg-indigo-500 text-white font-semibold active:bg-indigo-600">
        カードを追加
      </button>
    </form>
  );
}

function UploadForm({ onAddCards }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || ""));
    reader.readAsText(file);
  };

  const handleImport = () => {
    try {
      const cards = parseUploadJson(text);
      onAddCards(cards);
      setStatus({ ok: true, message: `${cards.length}件のカードを追加しました。` });
      setText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setStatus({ ok: false, message: err.message });
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-semibold text-slate-500">JSONファイルを選択</label>
        <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFile} className="w-full mt-1 text-sm" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500">またはJSONを貼り付け</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={SAMPLE_JSON}
          rows={10}
          className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono"
        />
      </div>
      {status && (
        <div className={`text-xs ${status.ok ? "text-emerald-600" : "text-rose-600"}`}>{status.message}</div>
      )}
      <button
        onClick={handleImport}
        disabled={!text.trim()}
        className="w-full py-3 rounded-xl bg-indigo-500 text-white font-semibold active:bg-indigo-600 disabled:opacity-40"
      >
        インポート
      </button>
      <div className="text-xs text-slate-400">
        title と shortDescription は必須です。detailDescription / category / tags / understanding は省略できます。
      </div>
    </div>
  );
}

export default function AddScreen({ onAddCards }) {
  const [tab, setTab] = useState("manual");

  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <h2 className="text-lg font-bold text-slate-800 mb-3">カードを追加</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("manual")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${tab === "manual" ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"}`}
        >
          手動入力
        </button>
        <button
          onClick={() => setTab("upload")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${tab === "upload" ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"}`}
        >
          JSONアップロード
        </button>
      </div>
      {tab === "manual" ? <ManualForm onAddCards={onAddCards} /> : <UploadForm onAddCards={onAddCards} />}
    </div>
  );
}
