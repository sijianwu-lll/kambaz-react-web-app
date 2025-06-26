import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { Quiz } from "./types";

export default function QuizPreview() {
  const { qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const quiz = quizzes.find((q) => q._id === qid);

  if (!quiz) return <div>❌ Quiz not found</div>;

  return (
    <div className="p-4">
      <h2>📋 Preview: {quiz.title}</h2>
      <p>This is a preview screen. (You can show questions here later.)</p>
    </div>
  );
}
