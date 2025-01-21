import React from "react";
import { apiAllOptions } from "../utils/constant";
import QuizSelectOptions from "./QuizOptions";
function QuizStart({ handleFetch }) {
  const selectionOptions = Object.entries(apiAllOptions).map(
    ([type, options], id) => {
      return <QuizSelectOptions key={id} type={type} options={options} />;
    },
  );

  return (
    <div className="quizzical">
      <h1>Quizzical</h1>
      <div className="quiz-mode-container">
        <div className="mode-selection-containers">{selectionOptions}</div>
      </div>
      <button className="start-quiz-btn" onClick={handleFetch}>
        Start Quiz
      </button>
    </div>
  );
}

export default QuizStart;
