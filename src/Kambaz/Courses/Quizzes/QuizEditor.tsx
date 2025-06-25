import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { Quiz } from "./types";

export default function QuizEditor() {
  const { qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const quiz = quizzes.find((q) => q._id === qid);

  if (!quiz) return <div>❌ Quiz not found</div>;

  const formatDate = (iso: string) => new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <hr />
      <div className="mb-2">
        <strong>Due:</strong> {formatDate(quiz.dueDate)} &nbsp;
        <strong>Points:</strong> {quiz.points} &nbsp;
        <strong>Questions:</strong> {quiz.numQuestions}
      </div>
      <div className="mb-2">
        <strong>Available:</strong> {formatDate(quiz.availableDate)} - {formatDate(quiz.untilDate)} &nbsp;
        <strong>Time Limit:</strong> {quiz.timeLimit} minutes
      </div>
      <div className="mb-2">
        <strong>Status:</strong> {quiz.published ? "Published ✅" : "Draft ⌛"}
      </div>
    </div>
  );
}
