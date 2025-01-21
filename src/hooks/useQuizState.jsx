import React, { createContext, useContext, useState } from "react"
import { NO_OF_QUIZ_TO_FETCH, QuizState } from "../utils/constant"

const QuizStateContext = createContext()

export function QuizStateProvider({ children }) {
  const [quizState, setQuizState] = useState(QuizState.INITIAL)
  const [apiOptions, setApiOptions] = useState({
    amount: NO_OF_QUIZ_TO_FETCH,
    encode: "url3986",
    difficulty: null,
    type: null,
    category: null,
  })

  return (
    <QuizStateContext.Provider
      value={{ quizState, setQuizState, apiOptions, setApiOptions }}
    >
      {children}
    </QuizStateContext.Provider>
  )
}

export function useQuizState() {
  const context = useContext(QuizStateContext)
  if (!context) {
    throw new Error("useQuizState must be used within a QuizStateProvider")
  }
  return context
}
