import React, { useState } from "react";
import QuizAnswer from "./QuizAnswer";

export default function QuizQuestion(props) {
  // useState[quizAnswers,setQuizAnswers]=useState([]);
  function base64toString(value) {
    return atob(value);
  }
  const quizAnswers = [...props.incorrect_answers, props.correct_answer];
  const randomizeQuizAnswers = quizAnswers
    .slice()
    .sort(() => Math.random() - 0.5);
  console.log(quizAnswers);
  console.log(randomizeQuizAnswers);
  const randomQuizAnswers = randomizeQuizAnswers.map((randomQuizAnswer) => (
    <QuizAnswer answer={randomQuizAnswer} />
  ));
  return (
    <div className="quiz">
      <h2 className="quiz-question">{props.question}</h2>
      <div className="quiz-answers">{randomQuizAnswers}</div>
    </div>
  );
}
