import React, { useState } from "react";

export default function quizAnswers(props) {
  // ? Make only one option clickable at once
  const [activeness, SetActiveness] = useState("");
  // const activeness = "";
  function handleClick(e) {
    const currentAnswer = e.target.classList;
    // SetActiveness((prevActiveness) => (prevActiveness = ""));
    currentAnswer.add("active");
    currentAnswer.h;
  }
  return (
    <button className={`quiz-answer ${activeness}`} onClick={handleClick}>
      {props.answer}
    </button>
  );
  // return (
  //   <input
  //     className="quiz-answer"
  //     type="radio"
  //     name={props.answer}
  //     id={props.answer}
  //     value={props.answer}

  //   />
  // );
}
