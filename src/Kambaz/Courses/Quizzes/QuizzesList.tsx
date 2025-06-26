import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, togglePublish } from "./quizzesReducer";
import { useNavigate, Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { Quiz } from "./types";

export default function QuizzesList() {
  const { cid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddQuiz = () => {
    const now = new Date();
    const due = new Date(now);
    due.setDate(due.getDate() + 7);

    const newQuiz: Quiz = {
      _id: uuidv4(),
      title: "New Quiz",
      availableDate: now.toISOString(),
      untilDate: due.toISOString(),
      dueDate: due.toISOString(),
      points: 100,
      numQuestions: 0,
      timeLimit: 60,
      published: false,
    };

    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}/Edit`, {
      state: { newQuiz },
    });
  };

  const sortedQuizzes = [...quizzes].sort(
    (a, b) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()
  );

  const visibleQuizzes = isFaculty
    ? sortedQuizzes
    : sortedQuizzes.filter((q) => q.published);

  return (
    <div className="p-4">
      <h2>Quizzes</h2>

      {visibleQuizzes.length === 0 ? (
        <div className="text-muted mb-3">
          No quizzes yet. {isFaculty && "Click + Quiz to create one."}
        </div>
      ) : (
        <ul className="list-group mb-3">
          {visibleQuizzes.map((quiz: Quiz) => (
            <li
              key={quiz._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link
                to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                className="text-decoration-none"
              >
                {quiz.title}
                {quiz.published && <span className="text-success ms-2">✅</span>}
              </Link>

              {isFaculty && (
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ⋮
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => dispatch(togglePublish(quiz._id))}
                      >
                        {quiz.published ? "Unpublish" : "Publish"}
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => dispatch(deleteQuiz(quiz._id))}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {isFaculty && (
        <button className="btn btn-primary" onClick={handleAddQuiz}>
          + Quiz
        </button>
      )}
    </div>
  );
}