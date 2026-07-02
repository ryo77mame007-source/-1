// Renders free-form detailDescription text (補足説明/具体例/関連知識/覚え方/使いどころ etc.)
// preserving the author's own line breaks and blank-line paragraph breaks.
export default function DetailText({ text }) {
  if (!text) {
    return <p className="text-slate-400 text-sm">詳しい説明はまだ登録されていません。</p>;
  }
  const paragraphs = text.split(/\n\s*\n/);
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className="whitespace-pre-wrap text-slate-700 leading-relaxed text-[15px]">
          {para}
        </p>
      ))}
    </div>
  );
}
