import React from "react";
import { useQuizState } from "../hooks/useQuizState";
import { apiAllOptions, QuizState } from "../utils/constant";
import QuizSelectOptions from "./QuizOptions";
function QuizStart({ setApiOptions, fetchQuizzes }) {
  const { setQuizState } = useQuizState();
  const selectionOptions = Object.entries(apiAllOptions).map(
    ([type, options], id) => {
      return (
        <QuizSelectOptions
          key={id}
          type={type}
          options={options}
          setSelectedOptions={setApiOptions}
        />
      );
    }
  );

  function handleClick(e) {
    e.preventDefault();
    setQuizState(QuizState.QUESTION);
    fetchQuizzes();
    setApiOptions({
      amount: 10,
      difficulty: null,
      type: null,
      category: null,
    });
  }

  return (
    <div className="quizzical">
      <h1>Quizzical</h1>
      <div className="quiz-mode-container">
        <div className="mode-selection-containers">{selectionOptions}</div>
      </div>
      <button className="start-quiz-btn" onClick={handleClick}>Start Quiz</button>
    </div>
  );
}

export default QuizStart;
