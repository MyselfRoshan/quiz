import React, { useState } from "react";

export default function QuizQuestion(props) {
  const [clickedId, setClickedId] = useState(-1);
  // ?Inserting all the correct answer into clickedAnswers array
  const [clickedAnswers, setClickedAnswers] = useState([]);

  function base64toString(value) {
    return atob(value);
  }

  function handleClick(e, index) {
    setClickedId(index);
    // setClickedAnswers({ index: index, answer: e.target.textContent });
    setClickedAnswers([
      ...clickedAnswers,
      { index: index, answer: e.target.textContent },
    ]);
  }
  console.log(clickedAnswers);
  const answers = props.answers.map((answer, index) => (
    <button
      key={index}
      className={index === clickedId ? "quiz-answer active" : "quiz-answer"}
      onClick={(e) => handleClick(e, index)}
    >
      {answer}
    </button>
  ));
  return (
    <div className="quiz">
      <h2 className="quiz-question">{props.question}</h2>
      <div className="quiz-answers">{answers}</div>
    </div>
  );
}
