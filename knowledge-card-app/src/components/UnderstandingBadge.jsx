const STYLES = {
  不安: "bg-rose-100 text-rose-600",
  普通: "bg-amber-100 text-amber-700",
  覚えた: "bg-emerald-100 text-emerald-700",
};

export default function UnderstandingBadge({ level }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STYLES[level] || STYLES["普通"]}`}>
      {level}
    </span>
  );
}
