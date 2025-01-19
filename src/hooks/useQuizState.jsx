import React, { createContext, useContext, useState } from "react";
import { QuizState } from "../utils/constant";

const QuizStateContext = createContext();

export function QuizStateProvider({ children }) {
  const [quizState, setQuizState] = useState(QuizState.INITIAL);

  return (
    <QuizStateContext.Provider value={{ quizState, setQuizState }}>
      {children}
    </QuizStateContext.Provider>
  );
}

export function useQuizState() {
  const context = useContext(QuizStateContext);
  if (!context) {
    throw new Error("useQuizState must be used within a QuizStateProvider");
  }
  return context;
}
