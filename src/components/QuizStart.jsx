import React, { useEffect } from "react";

export default function QuizStart(props) {
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
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
