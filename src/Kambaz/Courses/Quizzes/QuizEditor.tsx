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
  const [, setEditingQuestionId] = useState<string | null>(null); 
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
      correct: [],
    };
    setDraftQuestion(newQuestion);
    setEditingQuestionId(newQuestion._id);
  };

  const handleSaveDraft = () => {
    if (!draftQuestion) return;
    const exists = form.questions?.some((q) => q._id === draftQuestion._id);
    const updated = exists
      ? form.questions?.map((q) => (q._id === draftQuestion._id ? draftQuestion : q))
      : [...(form.questions || []), draftQuestion];
    setForm({ ...form, questions: updated });
    setDraftQuestion(null);
    setEditingQuestionId(null);
  };

  const handlePublishDraft = () => {
    handleSaveDraft();
    setForm((prev) => ({ ...prev, published: true }));
  };

  return (
    <div className="p-4">
      <h2>{isNew ? "Create Quiz" : `Edit Quiz: ${initialQuiz.title}`}</h2>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${tab === "details" ? "active" : ""}`} onClick={() => setTab("details")}>Details</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "questions" ? "active" : ""}`} onClick={() => setTab("questions")}>Questions</button>
        </li>
      </ul>

      {tab === "details" && (
        <form>
          <div className="mb-3">
            <label>Title</label>
            <input className="form-control" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea className="form-control" value={form.description || ""} onChange={(e) => handleChange("description", e.target.value)} />
          </div>

          <div className="mb-3">
            <label>Points</label>
            <input type="number" className="form-control" value={form.points} onChange={(e) => handleChange("points", Number(e.target.value))} />
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="shuffle" checked={form.shuffle || false} onChange={(e) => handleChange("shuffle", e.target.checked)} />
            <label htmlFor="shuffle" className="form-check-label">Shuffle answers</label>
          </div>

          <div className="mb-3">
            <label>Time Limit (minutes)</label>
            <input type="number" className="form-control" value={form.timeLimit} onChange={(e) => handleChange("timeLimit", Number(e.target.value))} />
          </div>

          <div className="mb-3">
            <label>Due Date</label>
            <input type="date" className="form-control" value={form.dueDate?.split("T")[0]} onChange={(e) => handleChange("dueDate", e.target.value)} />
          </div>

          <div className="mb-3">
            <label>Available From</label>
            <input type="date" className="form-control" value={form.availableDate?.split("T")[0]} onChange={(e) => handleChange("availableDate", e.target.value)} />
          </div>

          <div className="mb-3">
            <label>Until</label>
            <input type="date" className="form-control" value={form.untilDate?.split("T")[0]} onChange={(e) => handleChange("untilDate", e.target.value)} />
          </div>

          <div className="d-flex gap-2 mt-3">
            <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveAndPublish}>Save & Publish</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      {tab === "questions" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Questions ({form.questions?.length ?? 0})</h5>
            <button className="btn btn-outline-primary btn-sm" onClick={handleAddQuestion}>+ New Question</button>
          </div>

          <ul className="list-group">
            {form.questions?.map((q, idx) => (
              <li key={q._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{idx + 1}. {q.title}</strong> ({q.points} pts) – {q.type}
                  </div>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                    setEditingQuestionId(q._id);
                    setDraftQuestion({ ...q });
                  }}>Edit</button>
                </div>
              </li>
            ))}

            {draftQuestion && (
              <li key={draftQuestion._id} className="list-group-item">
                <div>
                  <input className="form-control mb-2" value={draftQuestion.title} onChange={(e) => setDraftQuestion({ ...draftQuestion, title: e.target.value })} />

                  <select className="form-select mb-2" value={draftQuestion.type} onChange={(e) => setDraftQuestion({ ...draftQuestion, type: e.target.value as Question["type"] })}>
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
                  </select>

                  <textarea className="form-control mb-2" value={draftQuestion.question} onChange={(e) => setDraftQuestion({ ...draftQuestion, question: e.target.value })} />

                  <input type="number" className="form-control mb-2" value={draftQuestion.points} onChange={(e) => setDraftQuestion({ ...draftQuestion, points: Number(e.target.value) })} />

                  {draftQuestion.type === "FILL_IN_THE_BLANK" && (
                    <>
                      {(draftQuestion.blanks || []).map((answers, i) => (
                        <div key={i} className="mb-3">
                          <label className="form-label">Blank {i + 1} - Correct Answers</label>
                          {(answers || []).map((ans, j) => (
                            <div className="input-group mb-1" key={j}>
                              <textarea
                                className="form-control"
                                value={ans}
                                placeholder={`Answer ${j + 1}`}
                                rows={2}
                                onChange={(e) => {
                                  const updatedBlanks = [...(draftQuestion.blanks || [])];
                                  updatedBlanks[i][j] = e.target.value;
                                  setDraftQuestion({ ...draftQuestion, blanks: updatedBlanks });
                                }}
                              />
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  const updatedBlanks = [...(draftQuestion.blanks || [])];
                                  updatedBlanks[i] = updatedBlanks[i].filter((_, idx) => idx !== j);
                                  setDraftQuestion({ ...draftQuestion, blanks: updatedBlanks });
                                }}
                              >🗑️</button>
                            </div>
                          ))}
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => {
                              const updatedBlanks = [...(draftQuestion.blanks || [])];
                              updatedBlanks[i] = [...(updatedBlanks[i] || []), ""];
                              setDraftQuestion({ ...draftQuestion, blanks: updatedBlanks });
                            }}
                          >+ Add Answer</button>
                        </div>
                      ))}
                      <button
                        className="btn btn-outline-primary btn-sm mb-3"
                        onClick={() => {
                          const updatedBlanks = [...(draftQuestion.blanks || []), [""]];
                          setDraftQuestion({ ...draftQuestion, blanks: updatedBlanks });
                        }}
                      >+ Add Blank</button>
                    </>
                  )}

                  {draftQuestion.type === "MULTIPLE_CHOICE" && (
                    <>
                      {(draftQuestion.options || []).map((opt, i) => (
                        <div key={i} className="input-group mb-2 align-items-start">
                          <div className="input-group-text d-flex flex-column align-items-start">
                            <input
                              type="checkbox"
                              className="form-check-input mt-2"
                              checked={draftQuestion.correct?.includes(i)}
                              onChange={() => {
                                const correct = draftQuestion.correct || [];
                                const newCorrect = correct.includes(i)
                                  ? correct.filter(c => c !== i)
                                  : [...correct, i];
                                setDraftQuestion({ ...draftQuestion, correct: newCorrect });
                              }}
                            />
                            <small className="text-muted">{String.fromCharCode(65 + i)}</small>
                          </div>
                          <textarea
                            className="form-control"
                            value={opt}
                            onChange={(e) => {
                              const updated = [...(draftQuestion.options || [])];
                              updated[i] = e.target.value;
                              setDraftQuestion({ ...draftQuestion, options: updated });
                            }}
                          />
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => {
                              const updatedOptions = (draftQuestion.options || []).filter((_, index) => index !== i);
                              const updatedCorrect = (draftQuestion.correct || [])
                                .filter(c => c !== i)
                                .map(c => (c > i ? c - 1 : c));
                              setDraftQuestion({
                                ...draftQuestion,
                                options: updatedOptions,
                                correct: updatedCorrect,
                              });
                            }}
                          >🗑️</button>
                        </div>
                      ))}
                      <button
                        className="btn btn-outline-success btn-sm mb-3"
                        onClick={() => {
                          const updated = [...(draftQuestion.options || []), ""];
                          setDraftQuestion({ ...draftQuestion, options: updated });
                        }}
                      >+ Add Option</button>
                    </>
                  )}

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-secondary" onClick={() => {
                      setDraftQuestion(null);
                      setEditingQuestionId(null);
                    }}>Cancel</button>
                    <button className="btn btn-sm btn-success" onClick={handleSaveDraft}>Save</button>
                    <button className="btn btn-sm btn-primary" onClick={handlePublishDraft}>Save & Publish</button>
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