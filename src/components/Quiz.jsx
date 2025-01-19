import React, { useState } from "react";
import { useQuizState } from "../hooks/useQuizState";
import { QuizState } from "../utils/constant";
import { cn } from "../utils/helper";

export default function Quiz(props) {
  const { quizState } = useQuizState();
  const {
    id,
    allAnswers,
    question,
    selectedAnswers,
    addSelectedAnswers,
    correctAnswer,
  } = props;
  const [clickedId, setClickedId] = useState(-1);

  const quizAnswers = allAnswers?.map((answer, index) => {
    function handleClick(e) {
      setClickedId(index);
      addSelectedAnswers(id, index, e.target.textContent, correctAnswer);
    }

    const selectedAnswer = selectedAnswers.get(id);
    const answerId = selectedAnswer ? selectedAnswer.answerId : -1;
    const answerText = selectedAnswer ? selectedAnswer.selectedAnswer : null;

    const isCorrect = correctAnswer === answerText;
    const isSelected = clickedId === index;

    return (
      <button
        key={index}
        className={cn(
          "quiz-answer",
          quizState === QuizState.QUESTION && isSelected ? "active" : null,
          quizState === QuizState.ANSWER && answerId === index
            ? isCorrect
              ? "correct"
              : "incorrect"
            : null
        )}
        onClick={handleClick}
      >
        {answer}
      </button>
    );
  });

  return (
    <div className="quiz">
      <p className="quiz-question">{question}</p>
      <div className="quiz-answers">{quizAnswers}</div>
    </div>
  );
}
