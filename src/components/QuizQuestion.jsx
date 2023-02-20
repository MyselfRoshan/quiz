import React, { useState } from "react";
import { useMemo } from "react";

export default function QuizQuestion(props) {
  const [clickedId, setClickedId] = useState(-1);
  const [choseOption, setChoseOption] = useState({ id: props.id, text: "" });
  // To decode url3986 string
  function decodeURL3986(html) {
    return decodeURIComponent(html);
  }

  function handleClick(e, index) {
    setClickedId(index);
    setChoseOption({
      ...choseOption,
      text: btoa(e.target.textContent),
    });
  }

  const options = props.optionArray.map((answer, index) => {
    let optionChoseBtnClass = "quiz-answer ";
    // Adds correct class to correct option if question id matches anser array id
    if (props.optionCheckerBtnTxt === "Play again") {
      optionChoseBtnClass =
        props.correctOptionArray === answer
          ? "quiz-answer correct"
          : "quiz-answer";
    }
    // Buttons acts like radio buttons if clicKedId and index are equal
    if (index === clickedId) {
      optionChoseBtnClass = optionChoseBtnClass.concat(" active");

      // Adds incorrect to all active class if it doesn't include "correct"
      if (props.optionCheckerBtnTxt === "Play again") {
        if (!optionChoseBtnClass.includes("correct")) {
          optionChoseBtnClass = optionChoseBtnClass.replace(
            "active",
            "incorrect",
          );
        }
      }
    }

    return (
      <button
        key={index}
        className={optionChoseBtnClass}
        onClick={(e) => handleClick(e, index)}
        disabled={props.optionCheckerBtnTxt === "Play again"}
      >
        {decodeURL3986(answer)}
      </button>
    );
  });

  return (
    <div className="quiz">
      <p className="quiz-question">{decodeURL3986(props.question)}</p>
      <div className="quiz-answers">{options}</div>
    </div>
  );
}
