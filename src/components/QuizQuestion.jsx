import React, { useEffect, useState } from "react";

export default function QuizQuestion(props) {
  const [clickedId, setClickedId] = useState(-1);
  // Inserting all the correct answer into choseOption array
  const [choseOption, setChoseOption] = useState({
    id: props.id,
    text: "",
  });

  // To decode base64 string
  function base64toString(value) {
    return atob(value);
  }

  function handleClick(e, index) {
    setClickedId(index);
    setChoseOption({ ...choseOption, text: e.target.textContent });
  }
  useEffect(() => {
    const foundIndex = props.choseOption.findIndex(
      (el) => el.id === choseOption.id,
    );
    if (foundIndex !== -1) {
      // Replace the element at the found index
      props.setChoseOption((pre) => [
        ...pre.slice(0, foundIndex),
        choseOption,
        ...pre.slice(foundIndex + 1),
      ]);
    } else {
      // Append the element to the array
      props.setChoseOption((pre) => [...pre, choseOption]);
    }
  }, [choseOption]);

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
