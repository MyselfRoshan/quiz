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
  }, [choseOption]);

  const options = props.options.map((answer, index) => {
    let optionChoseBtnClass = "quiz-answer ";
    if (props.optionCheckerBtnTxt === "Play again") {
      const correctAnswer = props.correctOptionArray.some((a) =>
        props.options.some((ae) => a.text === ae),
      );
      console.log(correctAnswer);
      if (correctAnswer)
        optionChoseBtnClass = optionChoseBtnClass.replace("active", "correct");
    }
    if (index === clickedId) {
      optionChoseBtnClass = optionChoseBtnClass.concat(" active");
      if (props.optionCheckerBtnTxt === "Play again") {
        // optionChoseBtnClass = optionChoseBtnClass.replace("active", "correct");
        const correctAnswer = props.correctOptionArray.some(
          (a) => choseOption.text === a.text,
        );
        console.log(props.choseOption);
        console.log(correctAnswer);
        if (!correctAnswer)
          optionChoseBtnClass = optionChoseBtnClass.replace(
            "correct",
            "incorrect",
          );
      }
    }

    return (
      <button
        key={index}
        className={optionChoseBtnClass}
        onClick={(e) => handleClick(e, index)}
      >
        {answer}
      </button>
    );
  });
  return (
    <div className="quiz">
      <h2 className="quiz-question">{props.question}</h2>
      <div className="quiz-answers">{options}</div>
    </div>
  );
}
