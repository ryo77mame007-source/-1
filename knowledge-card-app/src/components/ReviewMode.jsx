import { isDue } from "../utils/cards";
import StudySession from "./StudySession";

export default function ReviewMode({ cards, onUpdateCard }) {
  const due = cards.filter((c) => isDue(c)).sort((a, b) => new Date(a.nextReviewAt) - new Date(b.nextReviewAt));
  const upcoming = cards
    .filter((c) => !isDue(c))
    .sort((a, b) => new Date(a.nextReviewAt) - new Date(b.nextReviewAt))
    .slice(0, 5);

  return (
    <StudySession
      heading="復習"
      cards={due}
      onUpdateCard={onUpdateCard}
      emptyTitle="復習待ちのカードはありません"
      emptyDesc="すべてのカードは最新の状態です。"
      upcoming={upcoming}
    />
  );
}
