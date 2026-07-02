import StudySession from "./StudySession";

export default function QuizMode({ cards, onUpdateCard }) {
  return (
    <StudySession
      heading="一問一答"
      cards={cards}
      onUpdateCard={onUpdateCard}
      emptyTitle="カードがありません"
      emptyDesc="まずはカードを追加してください。"
    />
  );
}
