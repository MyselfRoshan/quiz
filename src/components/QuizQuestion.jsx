import React, { useEffect, useState } from "react";

export default function QuizQuestion(props) {
  const [clickedId, setClickedId] = useState(-1);
  const [choseOption, setChoseOption] = useState({ id: props.id, text: "" });

  // To decode base64 string
  function base64toString(value) {
    return atob(value);
  }

  function handleClick(e, index) {
    setClickedId(index);
    setChoseOption({
      ...choseOption,
      text: btoa(e.target.textContent),
    });
  }

  useEffect(() => {
    if (props.optionCheckerBtnTxt === "Check answers") {
      const foundIndex = props.choseOption.findIndex(
        (el) => el.id === choseOption.id,
      );
      if (foundIndex !== -1) {
        // Replace the element at the found index
        props.setChoseOption((prevChoseOption) => [
          ...prevChoseOption.slice(0, foundIndex),
          choseOption,
          ...prevChoseOption.slice(foundIndex + 1),
        ]);
      } else {
        // Append the element to the array
        props.setChoseOption((prevChoseOption) => [
          ...prevChoseOption,
          choseOption,
        ]);
      }
    }
  }, [choseOption]);
  // console.log(choseOption);

  const options = props.optionArray.map((answer, index) => {
    let optionChoseBtnClass = "quiz-answer ";
    // Adds correct class to correct option if question id matches anser array id
    if (props.optionCheckerBtnTxt === "Play again") {
      const correctAnswer = props.correctOptionArray.some(
        (a) => a.text === answer && a.id === props.id,
      );
      optionChoseBtnClass = correctAnswer
        ? "quiz-answer correct"
        : "quiz-answer";
    }
    // Buttons acts like radio buttons if clicKedId and index are equal
    if (index === clickedId) {
      optionChoseBtnClass = optionChoseBtnClass.concat(" active");
      // Adds incorrect to all active class if it doesn't include "correct"
      if (props.optionCheckerBtnTxt === "Play again") {
        if (!optionChoseBtnClass.includes("correct"))
          optionChoseBtnClass = optionChoseBtnClass.replace(
            "active",
            "incorrect",
          );
      }
    }

    return (
      <button
        key={index}
        className={optionChoseBtnClass}
        onClick={(e) => handleClick(e, index)}
        disabled={props.optionCheckerBtnTxt === "Play again"}
      >
        {base64toString(answer)}
      </button>
    );
  });
  return (
    <div className="quiz">
      <h2 className="quiz-question">{base64toString(props.question)}</h2>
      <div className="quiz-answers">{options}</div>
    </div>
  );
}
