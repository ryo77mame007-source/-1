export const UNDERSTANDING_LEVELS = ["不安", "普通", "覚えた"];

// review interval (days) indexed by reviewStage
const INTERVAL_DAYS = [1, 3, 7, 14, 30, 60, 120];

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `card_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createCard(input) {
  const now = new Date().toISOString();
  return {
    id: newId(),
    title: input.title?.trim() || "",
    shortDescription: input.shortDescription?.trim() || "",
    detailDescription: input.detailDescription?.trim() || "",
    category: input.category?.trim() || "未分類",
    tags: Array.isArray(input.tags) ? input.tags.filter(Boolean) : [],
    understanding: UNDERSTANDING_LEVELS.includes(input.understanding) ? input.understanding : "普通",
    createdAt: now,
    updatedAt: now,
    lastReviewedAt: null,
    nextReviewAt: now,
    reviewCount: 0,
    correctCount: 0,
    reviewStage: 0,
  };
}

export function nextReviewDate(stage) {
  const idx = Math.min(Math.max(stage, 0), INTERVAL_DAYS.length - 1);
  const d = new Date();
  d.setDate(d.getDate() + INTERVAL_DAYS[idx]);
  return d.toISOString();
}

export function applyReviewResult(card, understanding) {
  let reviewStage = card.reviewStage;
  if (understanding === "不安") reviewStage = 0;
  else if (understanding === "覚えた") reviewStage = card.reviewStage + 1;

  const now = new Date().toISOString();
  return {
    ...card,
    understanding,
    reviewCount: card.reviewCount + 1,
    correctCount: card.correctCount + (understanding === "不安" ? 0 : 1),
    reviewStage,
    lastReviewedAt: now,
    nextReviewAt: nextReviewDate(reviewStage),
    updatedAt: now,
  };
}

export function isDue(card, now = new Date()) {
  return new Date(card.nextReviewAt) <= now;
}

export function daysUntil(isoDate) {
  const diffMs = new Date(isoDate) - new Date();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function formatRelativeDays(isoDate) {
  const d = daysUntil(isoDate);
  if (d <= 0) return "今日";
  if (d === 1) return "明日";
  return `${d}日後`;
}

// Parses and validates the upload JSON format, returning card objects (with
// defaults filled in) or throwing an Error describing the first problem found.
export function parseUploadJson(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("JSONの形式が正しくありません。");
  }
  if (!Array.isArray(data)) {
    throw new Error("JSONは配列形式である必要があります。");
  }
  return data.map((item, i) => {
    if (!item || typeof item !== "object") {
      throw new Error(`${i + 1}件目: オブジェクトではありません。`);
    }
    if (!item.title || typeof item.title !== "string") {
      throw new Error(`${i + 1}件目: title は必須です。`);
    }
    if (!item.shortDescription || typeof item.shortDescription !== "string") {
      throw new Error(`${i + 1}件目: shortDescription は必須です。`);
    }
    return createCard({
      title: item.title,
      shortDescription: item.shortDescription,
      detailDescription: item.detailDescription || "",
      category: item.category || "未分類",
      tags: item.tags || [],
      understanding: item.understanding || "普通",
    });
  });
}
