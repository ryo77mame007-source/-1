import { useState } from "react";
import { basicTopics } from "../data/basics";
import { useStorage } from "../hooks/useStorage";
import BasicsDetail from "./BasicsDetail";

export default function BasicsList() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [viewedBasics] = useStorage("viewedBasics", []);

  if (selectedTopic) {
    return <BasicsDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <div className="basics-list-screen">
      <div className="basics-list-header">
        <h2 className="basics-list-title">🌟 超基礎英語</h2>
        <p className="basics-list-sub">ビジネス英語の土台を固める26トピック</p>
        <div className="basics-list-progress">
          <div className="basics-list-progress-bar">
            <div
              className="basics-list-progress-fill"
              style={{ width: `${(viewedBasics.length / basicTopics.length) * 100}%` }}
            />
          </div>
          <span className="basics-list-progress-text">
            {viewedBasics.length}/{basicTopics.length}
          </span>
        </div>
      </div>

      <div className="basics-topic-grid">
        {basicTopics.map((topic) => {
          const isViewed = viewedBasics.includes(topic.id);
          return (
            <button
              key={topic.id}
              className={`basics-topic-card ${isViewed ? "viewed" : ""}`}
              onClick={() => setSelectedTopic(topic)}
            >
              {isViewed && <div className="basics-viewed-badge">✓</div>}
              <div className="basics-topic-emoji">{topic.emoji}</div>
              <div className="basics-topic-num">No.{topic.id}</div>
              <div className="basics-topic-title">{topic.title}</div>
              <div className="basics-topic-subtitle">{topic.subtitle}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
