import { useState } from "react";

const categoryColors = {
  Email: "#1565C0",
  Meeting: "#00695C",
};

const sectionColors = {
  examples: "#1565C0",
  variations: "#F57F17",
  points: "#6A1B9A",
};

export default function PhraseDetail({ phrase, isFavorite, onToggleFavorite, onBack, onMarkLearned }) {
  const [activeTab, setActiveTab] = useState("examples");
  const [speaking, setSpeaking] = useState(null);
  const [voiceGender, setVoiceGender] = useState("female");

  const speak = (text, id) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(id);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.filter(
      (v) => v.lang.startsWith("en") && (voiceGender === "female" ? v.name.match(/female|zira|samantha|susan|karen|victoria/i) : v.name.match(/male|david|mark|daniel|alex/i))
    );
    if (preferred.length > 0) utter.voice = preferred[0];

    utter.onend = () => setSpeaking(null);
    utter.onerror = () => setSpeaking(null);
    window.speechSynthesis.speak(utter);
  };

  const tabs = [
    { id: "examples", label: "例文" },
    { id: "variations", label: "応用表現" },
    { id: "points", label: "ポイント" },
  ];

  const catColor = categoryColors[phrase.category] || "#1565C0";
  const otherExample = phrase.examples[phrase.examples.length - 1];
  const otherVariation = phrase.variations[phrase.variations.length - 1];

  return (
    <div className="screen">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>‹ 戻る</button>
        <div className="detail-controls">
          <button
            className={`voice-toggle ${voiceGender === "female" ? "active" : ""}`}
            onClick={() => setVoiceGender(voiceGender === "female" ? "male" : "female")}
          >
            {voiceGender === "female" ? "♀" : "♂"}
          </button>
          <button
            className={`fav-btn ${isFavorite ? "active" : ""}`}
            onClick={() => onToggleFavorite(phrase.id)}
          >
            {isFavorite ? "⭐" : "☆"}
          </button>
        </div>
      </div>

      <div className="detail-card" style={{ borderLeft: `4px solid ${catColor}` }}>
        <div className="detail-meta">
          <span className="detail-num">No.{phrase.id}</span>
          <span className="detail-category" style={{ background: catColor + "20", color: catColor }}>{phrase.category}</span>
          <span className="detail-importance">{"★".repeat(phrase.importance)}{"☆".repeat(5 - phrase.importance)}</span>
        </div>

        <div className="detail-main">
          <div className="detail-english">{phrase.english}</div>
          <button
            className={`speak-btn ${speaking === "main" ? "speaking" : ""}`}
            onClick={() => speak(phrase.english, "main")}
          >
            {speaking === "main" ? "♪" : "🔊"}
          </button>
        </div>

        <div className="detail-japanese">{phrase.japanese}</div>
        <div className="detail-scene">
          <span className="scene-label">使う場面：</span>{phrase.scene}
        </div>
      </div>

      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            style={activeTab === tab.id ? { color: sectionColors[tab.id], borderBottomColor: sectionColors[tab.id] } : undefined}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "examples" && (
          <div className="examples-list">
            {phrase.examples.map((ex, i) => (
              <div key={i} className="example-item" style={{ borderLeftColor: sectionColors.examples }}>
                <div className="example-num" style={{ color: sectionColors.examples }}>例文 {i + 1}</div>
                <div className="example-text">{ex}</div>
                <button
                  className={`speak-btn-sm ${speaking === `ex-${i}` ? "speaking" : ""}`}
                  onClick={() => speak(ex, `ex-${i}`)}
                >
                  {speaking === `ex-${i}` ? "♪" : "🔊"}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "variations" && (
          <div className="variations-list">
            {phrase.variations.map((v, i) => (
              <div key={i} className="variation-item" style={{ borderLeftColor: sectionColors.variations, borderLeftWidth: "3px" }}>
                <div className="variation-text">{v}</div>
                <button
                  className={`speak-btn-sm ${speaking === `var-${i}` ? "speaking" : ""}`}
                  onClick={() => speak(v, `var-${i}`)}
                >
                  {speaking === `var-${i}` ? "♪" : "🔊"}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "points" && (
          <div className="points-card">
            <div className="points-text">{phrase.points}</div>
            <div className="tags-row">
              {phrase.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="application-card" style={{ borderColor: catColor + "40" }}>
        <div className="application-title" style={{ color: catColor }}>💡 応用：こんな場面でも使えます</div>
        <div className="application-text">
          言い方を変えて <strong>"{otherVariation}"</strong> としても、同じ構文で別の場面に対応できます。
        </div>
        <div className="application-example" style={{ borderLeftColor: catColor }}>
          <div className="application-example-text">{otherExample}</div>
          <button
            className={`speak-btn-sm ${speaking === "app-ex" ? "speaking" : ""}`}
            onClick={() => speak(otherExample, "app-ex")}
          >
            {speaking === "app-ex" ? "♪" : "🔊"}
          </button>
        </div>
      </div>

      <button className="learned-btn" onClick={() => onMarkLearned(phrase.id)}>
        ✓ 学習完了としてマーク
      </button>
    </div>
  );
}
