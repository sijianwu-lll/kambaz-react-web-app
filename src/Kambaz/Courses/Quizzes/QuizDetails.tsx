import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { togglePublish } from "./quizzesReducer"; // ✅ 导入切换操作
import type { Quiz } from "./types";

export default function QuizDetails() {
  const { qid, cid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const quiz = quizzes.find((q) => q._id === qid);
  const dispatch = useDispatch();

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

      <div className="mb-2">
        <b>Due:</b> {format(quiz.dueDate)} &nbsp; 
        <b>Points:</b> {quiz.points}
      </div>
      <div className="mb-2">
        <b>Available:</b> {format(quiz.availableDate)} - {format(quiz.untilDate)}
      </div>
      <div className="mb-2">
        <b>Time Limit:</b> {quiz.timeLimit} minutes
      </div>
      <div className="mb-2">
        <b>Status:</b> {quiz.published ? "✅ Published" : "⌛ Draft"}
      </div>

      <div className="mt-3">
        <button
          className={`btn ${quiz.published ? "btn-warning" : "btn-success"} me-2`}
          onClick={() => dispatch(togglePublish(quiz._id))}
        >
          {quiz.published ? "Unpublish" : "Publish"}
        </button>

        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-outline-primary">
          Edit
        </Link>
      </div>
    </div>
  );
}
