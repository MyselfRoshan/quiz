import React from "react";

export default function QuizStart(props) {
  return (
    <div className="quizzical">
      <h1>Quizzical</h1>
      <div className="quiz-modification"></div>
      <button
        className="start-quiz-btn"
        onClick={() => props.setQuizStart((prevQuizStart) => !prevQuizStart)}
      >
        Start Quiz
      </button>
    </div>
  );
}
