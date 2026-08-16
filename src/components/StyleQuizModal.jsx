import { useState } from "react";
import { useStyleQuiz } from "../context/StyleQuizContext";

const questions = [
  {
    key: "whoFor",
    question: "Who are you shopping for?",
    options: [
      { label: "Kids", value: "kids" },
      { label: "Adults", value: "adults" },
      { label: "Both", value: "both" },
    ],
  },
  {
    key: "vibe",
    question: "Pick a vibe",
    options: [
      { label: "Casual", value: "casual" },
      { label: "Sporty", value: "sporty" },
      { label: "Elegant", value: "elegant" },
    ],
  },
  {
    key: "budget",
    question: "What's your budget range?",
    options: [
      { label: "Budget-friendly", value: "budget" },
      { label: "Mid-range", value: "mid" },
      { label: "Premium", value: "premium" },
    ],
  },
];

function StyleQuizModal() {
  const { completeQuiz, skipQuiz } = useStyleQuiz();
  const [step, setStep] = useState(0);
  const [draftAnswers, setDraftAnswers] = useState({});

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;

  function handleSelect(value) {
    const updated = { ...draftAnswers, [currentQuestion.key]: value };
    setDraftAnswers(updated);

    if (isLastStep) {
      completeQuiz(updated);
    } else {
      setStep((s) => s + 1);
    }
  }

  return (
    <div className="quiz-overlay">
      <div className="quiz-card">
        <button className="quiz-skip" onClick={skipQuiz}>Skip for now</button>

        <div className="quiz-progress">
          {questions.map((_, i) => (
            <span key={i} className={`quiz-dot ${i <= step ? "filled" : ""}`} />
          ))}
        </div>

        <p className="quiz-eyebrow">Let's find your style</p>
        <h2 className="quiz-question">{currentQuestion.question}</h2>

        <div className="quiz-options">
          {currentQuestion.options.map((opt) => (
            <button key={opt.value} className="quiz-option-btn" onClick={() => handleSelect(opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StyleQuizModal;