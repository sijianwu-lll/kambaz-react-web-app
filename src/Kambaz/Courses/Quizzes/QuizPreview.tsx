import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { Quiz, Question } from "./types";

export default function QuizPreview() {
  const { qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const quiz = quizzes.find((q) => q._id === qid);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  if (!quiz) return <div>❌ Quiz not found</div>;
  if (!isFaculty && !quiz.published) return <div className="text-danger">This quiz is not available yet.</div>;

  const question = quiz.questions?.[currentIndex];
  if (!question) return <div>✅ No questions in this quiz</div>;

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [question._id]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    alert("Answers submitted! (see console)");
  };

  return (
    <div className="p-4">
      <h3>Preview: {quiz.title}</h3>
      <p>Question {currentIndex + 1} of {quiz.questions?.length}</p>

      <div className="d-flex gap-2 mb-3 flex-wrap">
        {quiz.questions?.map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${idx === currentIndex ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setCurrentIndex(idx)}
          >
            Q{idx + 1}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <strong>{question.title}</strong>
        <p>{question.question}</p>

        {question.type === "MULTIPLE_CHOICE" && (
          <ul className="list-group">
            {question.options?.map((opt, idx) => (
              <li key={idx} className="list-group-item">
                <label>
                  <input
                    type="checkbox"
                    checked={answers[question._id]?.includes?.(idx) || false}
                    disabled={isFaculty}
                    onChange={() => {
                      if (isFaculty) return;
                      const prev = answers[question._id] || [];
                      const updated = prev.includes(idx)
                        ? prev.filter((i: number) => i !== idx)
                        : [...prev, idx];
                      handleAnswer(updated);
                    }}
                  /> {String.fromCharCode(65 + idx)}. {opt}
                </label>
              </li>
            ))}
          </ul>
        )}

        {question.type === "TRUE_FALSE" && (
          <ul className="list-group">
            {[true, false].map((val, idx) => (
              <li key={idx} className="list-group-item">
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value={val.toString()}
                    checked={answers[question._id] === val}
                    disabled={isFaculty}
                    onChange={() => !isFaculty && handleAnswer(val)}
                  /> {val ? "True" : "False"}
                </label>
              </li>
            ))}
          </ul>
        )}

        {question.type === "FILL_IN_THE_BLANK" && (
          <div>
            {(question.blanks || []).map((_, i) => (
              <div key={i} className="mb-2">
                <label>Blank {i + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your answer"
                  value={answers[question._id]?.[i] || ""}
                  disabled={isFaculty}
                  onChange={(e) => {
                    if (isFaculty) return;
                    const prev = answers[question._id] || [];
                    const updated = [...prev];
                    updated[i] = e.target.value;
                    handleAnswer(updated);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="d-flex gap-2 mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          disabled={currentIndex >= (quiz.questions?.length ?? 1) - 1}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          Next
        </button>
        {!isFaculty && currentIndex === (quiz.questions?.length ?? 1) - 1 && (
          <button className="btn btn-success ms-auto" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}