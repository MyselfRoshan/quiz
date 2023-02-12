import React from "react";

export default function QuizStart(props) {
  const modes = [
    {
      type: {
        "Multiple Choice": "multiple",
        "True / False": "boolean",
        "Any Type": "",
      },
    },
  ];
  return (
    <div className="quizzical">
      <h1>Quizzical</h1>
      <div className="quiz-mode-container">
        <h2>Quiz Modes</h2>
        <div className="mode-selection">
          <button type="button" className="mode-selection-btn mode-difficulty">
            Difficulty
          </button>
          <button type="button" className="mode-selection-btn mode-type">
            Type
          </button>
          <button type="button" className="mode-selection-btn mode-category">
            Category
          </button>
        </div>
        <div className="mode-selection-items">
          <span>Multiple Choice</span>
          <span></span>
        </div>
      </div>
      <button
        className="start-quiz-btn"
        onClick={() => props.setQuizStart((prevQuizStart) => !prevQuizStart)}
      >
        Start Quiz
      </button>
    </div>
  );
}
