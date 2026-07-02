import { useState, useEffect, useCallback } from "react";
import { SAMPLE_CARDS } from "../data/sampleCards";

const STORAGE_KEY = "knowledgeCards";

export function useCards() {
  const [cards, setCards] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SAMPLE_CARDS;
    } catch {
      return SAMPLE_CARDS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCards = useCallback((newCards) => {
    setCards((prev) => [...prev, ...newCards]);
  }, []);

  const updateCard = useCallback((id, updatedCard) => {
    setCards((prev) => prev.map((c) => (c.id === id ? updatedCard : c)));
  }, []);

  const deleteCard = useCallback((id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { cards, addCards, updateCard, deleteCard };
}
