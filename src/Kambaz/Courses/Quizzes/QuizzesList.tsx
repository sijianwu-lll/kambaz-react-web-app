import { useSelector, useDispatch } from "react-redux";
import { addQuiz } from "./quizzesReducer";
import { useNavigate, Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { Quiz } from "./types";

export default function QuizzesList() {
  const { cid } = useParams(); // ✅ 获取课程 ID

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddQuiz = () => {
    const now = new Date();
    const due = new Date(now);
    due.setDate(due.getDate() + 7); // 默认一周后 due
  
    const newQuiz: Quiz = {
      _id: uuidv4(),
      title: "New Quiz",
      availableDate: now.toISOString(),
      untilDate: due.toISOString(),
      dueDate: due.toISOString(),
      points: 100,
      numQuestions: 0,
      timeLimit: 60,  // 默认 60 分钟
      published: false,
    };
    dispatch(addQuiz(newQuiz));
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}/Edit`);
  };
  

  return (
    <div className="p-4">
      <h2>Quizzes</h2>

      {quizzes.length === 0 ? (
        <div className="text-muted mb-3">
          No quizzes yet. Click + Quiz to create one.
        </div>
      ) : (
        <ul className="list-group mb-3">
          {quizzes.map((quiz: Quiz) => (
            <li key={quiz._id} className="list-group-item">
              <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Edit`}>
                {quiz.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn-primary" onClick={handleAddQuiz}>
        + Quiz
      </button>
    </div>
  );
}
