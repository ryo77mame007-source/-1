import { useState } from "react";
import { emailExamples } from "../data/emails";

const typeColors = {
  greeting: "#9C27B0",
  opening: "#2196F3",
  purpose: "#4CAF50",
  request: "#FF9800",
  "additional-request": "#FF5722",
  closing: "#607D8B",
  "sign-off": "#795548",
  attachment: "#00BCD4",
  response: "#4CAF50",
  "follow-up": "#FF9800",
  problem: "#f44336",
  detail: "#FF5722",
  "action-taken": "#FFC107",
  urgency: "#f44336",
  offer: "#4CAF50",
  reference: "#2196F3",
  payment: "#9C27B0",
  thanks: "#4CAF50",
};

export default function EmailExamples() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  if (selectedEmail) {
    return (
      <div className="screen">
        <button className="back-btn" onClick={() => { setSelectedEmail(null); setSelectedPart(null); }}>
          ‹ 戻る
        </button>

        <div className="email-header">
          <div className="email-subject">{selectedEmail.subject}</div>
          <div className="email-meta">
            <span>From: {selectedEmail.from}</span>
            <span>To: {selectedEmail.to}</span>
            <span>{selectedEmail.date}</span>
          </div>
        </div>

        <p className="email-instruction">各文をタップして解説を見る</p>

        <div className="email-body">
          {selectedEmail.parts.map((part, i) => (
            <div key={i}>
              <button
                className={`email-part ${selectedPart === i ? "selected" : ""}`}
                onClick={() => setSelectedPart(selectedPart === i ? null : i)}
              >
                <div
                  className="part-label"
                  style={{ backgroundColor: (typeColors[part.type] || "#607D8B") + "20", color: typeColors[part.type] || "#607D8B" }}
                >
                  {part.label}
                </div>
                <div className="part-text">{part.text}</div>
                {part.ja && <div className="part-text-ja">{part.ja}</div>}
              </button>
              {selectedPart === i && part.note && (
                <div className="part-note">
                  <div className="part-note-icon">💡</div>
                  <div>{part.note}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <h2 className="section-title">メール例文</h2>
      <p className="section-desc">実務メールを文ごとに分解して学習できます。</p>

      <div className="email-list">
        {emailExamples.map((email) => (
          <button key={email.id} className="email-card" onClick={() => setSelectedEmail(email)}>
            <div className="email-card-from">{email.from} → {email.to}</div>
            <div className="email-card-subject">{email.subject}</div>
            <div className="email-card-meta">
              <span>{email.date}</span>
              <span>{email.parts.length}パーツ</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
