import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Quiz, Question } from "./types";
import { addQuiz, updateQuiz, deleteQuiz } from "./quizzesReducer";

export default function QuizEditor() {
  const { qid, cid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];
  const existingQuiz = quizzes.find((q) => q._id === qid);
  const isNew = !!location.state?.newQuiz;
  const initialQuiz = isNew ? location.state.newQuiz : existingQuiz;

  const [tab, setTab] = useState<"details" | "questions">("details");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [draftQuestion, setDraftQuestion] = useState<Question | null>(null);

  if (!initialQuiz) return <div>❌ Quiz not found</div>;

  const [form, setForm] = useState<Quiz>({ ...initialQuiz });

  const handleChange = (field: keyof Quiz, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    const updated = { ...form, numQuestions: form.questions?.length ?? 0 };
    if (isNew) {
      dispatch(addQuiz(updated));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${updated._id}/Details`);
    } else {
      dispatch(updateQuiz(updated));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Details`);
    }
  };

  const handleSaveAndPublish = () => {
    const updated = {
      ...form,
      published: true,
      numQuestions: form.questions?.length ?? 0,
    };
    if (isNew) {
      dispatch(addQuiz(updated));
    } else {
      dispatch(updateQuiz(updated));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    if (isNew && form._id) {
      dispatch(deleteQuiz(form._id));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      _id: uuidv4(),
      title: `Question ${(form.questions?.length ?? 0) + 1}`,
      type: "MULTIPLE_CHOICE",
      points: 10,
      question: "Your question text here...",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: [0],
    };
    setDraftQuestion(newQuestion);
    setEditingQuestionId(newQuestion._id);
  };

  return (
    <div className="p-4">
      <h2>{isNew ? "Create Quiz" : `Edit Quiz: ${initialQuiz.title}`}</h2>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "details" ? "active" : ""}`}
            onClick={() => setTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "questions" ? "active" : ""}`}
            onClick={() => setTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {tab === "details" && (
        <form>
          <div className="mb-3">
            <label>Title</label>
            <input
              className="form-control"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Points</label>
            <input
              type="number"
              className="form-control"
              value={form.points}
              onChange={(e) => handleChange("points", Number(e.target.value))}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="shuffle"
              checked={form.shuffle || false}
              onChange={(e) => handleChange("shuffle", e.target.checked)}
            />
            <label htmlFor="shuffle" className="form-check-label">
              Shuffle answers
            </label>
          </div>

          <div className="mb-3">
            <label>Time Limit (minutes)</label>
            <input
              type="number"
              className="form-control"
              value={form.timeLimit}
              onChange={(e) => handleChange("timeLimit", Number(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              value={form.dueDate?.split("T")[0]}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Available From</label>
            <input
              type="date"
              className="form-control"
              value={form.availableDate?.split("T")[0]}
              onChange={(e) => handleChange("availableDate", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Until</label>
            <input
              type="date"
              className="form-control"
              value={form.untilDate?.split("T")[0]}
              onChange={(e) => handleChange("untilDate", e.target.value)}
            />
          </div>

          <div className="d-flex gap-2 mt-3">
            <button type="button" className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveAndPublish}>
              Save & Publish
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {tab === "questions" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Questions ({form.questions?.length ?? 0})</h5>
            <button className="btn btn-outline-primary btn-sm" onClick={handleAddQuestion}>
              + New Question
            </button>
          </div>

          <ul className="list-group">
            {form.questions?.map((q, idx) => (
              <li key={q._id} className="list-group-item">
                {editingQuestionId === q._id ? (
                  <div>
                    <input
                      className="form-control mb-2"
                      value={q.title}
                      onChange={(e) => {
                        const updated = [...form.questions!];
                        updated[idx] = { ...q, title: e.target.value };
                        setForm({ ...form, questions: updated });
                      }}
                    />
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditingQuestionId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{idx + 1}. {q.title}</strong> ({q.points} pts) – {q.type}
                    </div>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingQuestionId(q._id)}>
                      Edit
                    </button>
                  </div>
                )}
              </li>
            ))}

            {draftQuestion && (
              <li key={draftQuestion._id} className="list-group-item">
                <div>
                  <input
                    className="form-control mb-2"
                    value={draftQuestion.title}
                    onChange={(e) =>
                      setDraftQuestion({ ...draftQuestion, title: e.target.value })
                    }
                  />

                  <select
                    className="form-select mb-2"
                    value={draftQuestion.type}
                    onChange={(e) =>
                      setDraftQuestion({
                        ...draftQuestion,
                        type: e.target.value as Question["type"],
                      })
                    }
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
                  </select>

                  <textarea
                    className="form-control mb-2"
                    value={draftQuestion.question}
                    onChange={(e) =>
                      setDraftQuestion({ ...draftQuestion, question: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    className="form-control mb-2"
                    value={draftQuestion.points}
                    onChange={(e) =>
                      setDraftQuestion({
                        ...draftQuestion,
                        points: Number(e.target.value),
                      })
                    }
                  />

                  {draftQuestion.options?.map((opt, i) => (
                    <div key={i} className="input-group mb-2">
                      <span className="input-group-text">Option {String.fromCharCode(65 + i)}</span>
                      <textarea
                        className="form-control"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...draftQuestion.options!];
                          updated[i] = e.target.value;
                          setDraftQuestion({ ...draftQuestion, options: updated });
                        }}
                      />
                    </div>
                  ))}

                  <button
                    className="btn btn-outline-success btn-sm mb-3"
                    onClick={() => {
                      const updated = [...(draftQuestion.options || []), ""];
                      setDraftQuestion({ ...draftQuestion, options: updated });
                    }}
                  >
                    + Add Option
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setDraftQuestion(null);
                        setEditingQuestionId(null);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        const updated = [...(form.questions || []), draftQuestion];
                        setForm({ ...form, questions: updated });
                        setDraftQuestion(null);
                        setEditingQuestionId(null);
                      }}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        const updated = [...(form.questions || []), draftQuestion];
                        setForm({
                          ...form,
                          questions: updated,
                          published: true,
                        });
                        setDraftQuestion(null);
                        setEditingQuestionId(null);
                      }}
                    >
                      Save & Publish
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}