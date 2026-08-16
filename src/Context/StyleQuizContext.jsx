import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const StyleQuizContext = createContext();
const defaultAnswers = { whoFor: null, vibe: null, budget: null };

function getAllQuizData() {
  const saved = localStorage.getItem("styleQuizData");
  return saved ? JSON.parse(saved) : {};
}

function saveAllQuizData(data) {
  localStorage.setItem("styleQuizData", JSON.stringify(data));
}

export function StyleQuizProvider({ children }) {
  const { currentUser } = useAuth();
  const userKey = currentUser ? currentUser.email : "guest";

  const [answers, setAnswers] = useState(defaultAnswers);
  const [quizStatus, setQuizStatus] = useState("unseen");

  useEffect(() => {
    const allData = getAllQuizData();
    const userData = allData[userKey];
    setAnswers(userData?.answers || defaultAnswers);
    setQuizStatus(userData?.status || "unseen");
  }, [userKey]);

  function updateUserQuizData(newStatus, newAnswers) {
    const allData = getAllQuizData();
    allData[userKey] = { status: newStatus, answers: newAnswers };
    saveAllQuizData(allData);
    setQuizStatus(newStatus);
    setAnswers(newAnswers);
  }

  function completeQuiz(newAnswers) {
    updateUserQuizData("completed", newAnswers);
  }

  function skipQuiz() {
    updateUserQuizData("skipped", answers);
  }

  function retakeQuiz() {
    updateUserQuizData("unseen", answers);
  }

  return (
    <StyleQuizContext.Provider value={{ answers, quizStatus, completeQuiz, skipQuiz, retakeQuiz }}>
      {children}
    </StyleQuizContext.Provider>
  );
}

export function useStyleQuiz() {
  return useContext(StyleQuizContext);
}