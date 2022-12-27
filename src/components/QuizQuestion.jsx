import React, { useEffect, useMemo, useState } from "react";

export default function QuizQuestion(props) {
  const [clickedId, setClickedId] = useState(-1);
  // ?Inserting all the correct answer into choseOption array
  const [choseOption, setChoseOption] = useState();
  // let choseOption;

  // To decode base64 string
  function base64toString(value) {
    return atob(value);
  }

  function handleClick(e, index) {
    setClickedId(index);
    setChoseOption(e.target.textContent);
  }
  // useMemo(() => {
  //   props.setChoseOption((prevchoseOption) => [
  //     ...prevchoseOption,
  //     choseOption,
  //   ]);
  // }, [choseOption]);

  const options = props.options.map((answer, index) => (
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
      <div className="quiz-answers">{options}</div>
    </div>
  );
}
