import React from "react";

export default function QuizStart(props) {
  console.log(props.setQuizStart());
  return (
    <div className="quizzical">
      <h1>Quizzical</h1>
      {/* <p></p> */}
      <button
        className="start-quiz-btn"
        onClick={() => props.setQuizStart((prevQuizStart) => !prevQuizStart)}
      >
        Start Quiz
      </button>
    </div>
  );
}
