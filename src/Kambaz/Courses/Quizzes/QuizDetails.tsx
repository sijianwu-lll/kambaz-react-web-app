import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { Quiz } from "./types";

export default function QuizDetails() {
  const { qid, cid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const quiz = quizzes.find((q) => q._id === qid);

  if (!quiz) return <div>❌ Quiz not found</div>;

  const format = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <div className="mb-2"><b>Due:</b> {format(quiz.dueDate)} &nbsp; <b>Points:</b> {quiz.points}</div>
      <div className="mb-2"><b>Available:</b> {format(quiz.availableDate)} - {format(quiz.untilDate)}</div>
      <div className="mb-2"><b>Time Limit:</b> {quiz.timeLimit} minutes</div>
      <div className="mb-2"><b>Status:</b> {quiz.published ? "✅ Published" : "⌛ Draft"}</div>

      <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-outline-primary mt-3">
        Edit
      </Link>
    </div>
  );
}
