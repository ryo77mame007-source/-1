import { useState, useEffect } from "react";
import { useStorage } from "../hooks/useStorage";

export default function BasicsDetail({ topic, onBack }) {
  const [activeTab, setActiveTab] = useState("table");
  const [speaking, setSpeaking] = useState(null);
  const [viewedBasics, setViewedBasics] = useStorage("viewedBasics", []);

  useEffect(() => {
    if (!viewedBasics.includes(topic.id)) {
      setViewedBasics((prev) => [...prev, topic.id]);
    }
  }, [topic.id]);

  const speak = (text, id) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(id);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.filter(
      (v) => v.lang.startsWith("en") && v.name.match(/female|zira|samantha|susan|karen|victoria/i)
    );
    if (preferred.length > 0) utter.voice = preferred[0];
    utter.onend = () => setSpeaking(null);
    utter.onerror = () => setSpeaking(null);
    window.speechSynthesis.speak(utter);
  };

  const tabs = [
    { id: "table", label: "一覧表" },
    { id: "usage", label: "使い方" },
    { id: "examples", label: "例文" },
  ];

  return (
    <div className="screen">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>‹ 戻る</button>
      </div>

      <div className="basics-detail-hero">
        <div className="basics-detail-emoji">{topic.emoji}</div>
        <div className="basics-detail-no">Topic {topic.id} / 26</div>
        <h2 className="basics-detail-title">{topic.title}</h2>
        <p className="basics-detail-sub">{topic.subtitle}</p>
      </div>

      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "table" && (
          <div>
            <div className="basics-table-scroll">
              <table className="basics-table">
                <thead>
                  <tr>
                    {topic.columns.map((col, i) => (
                      <th key={i}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topic.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {topic.notes && topic.notes.length > 0 && (
              <div className="basics-notes">
                <div className="basics-notes-title">📝 注意点</div>
                {topic.notes.map((note, i) => (
                  <div key={i} className="basics-note-item">
                    <span className="basics-note-bullet">•</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "usage" && (
          <div className="basics-usage-list">
            {topic.usage.map((tip, i) => (
              <div key={i} className="basics-usage-item">
                <div className="basics-usage-num">{i + 1}</div>
                <div className="basics-usage-text">{tip}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "examples" && (
          <div className="examples-list">
            {topic.examples.map((ex, i) => (
              <div key={i} className="example-item">
                <div className="example-num">例文 {i + 1}</div>
                <div className="example-text">{ex.english}</div>
                <div className="basics-example-jp">{ex.japanese}</div>
                <button
                  className={`speak-btn-sm ${speaking === `ex-${i}` ? "speaking" : ""}`}
                  onClick={() => speak(ex.english, `ex-${i}`)}
                >
                  {speaking === `ex-${i}` ? "♪" : "🔊"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
