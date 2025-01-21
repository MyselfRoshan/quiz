import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useQuizState } from "../hooks/useQuizState";
import { NO_OF_QUIZ_TO_FETCH, QuizState } from "../utils/constant";
import Quiz from "./Quiz";
import Spinner from "./Spinner";

function QuizSection({ quizzes, isLoading }) {
  const { quizState, setQuizState } = useQuizState();
  const selectedAnswers = useRef(new Map());
  const [score, setScore] = useState(0);

  const addSelectedAnswers = (
    quizId,
    answerId,
    selectedAnswer,
    actualAnswer,
  ) => {
    selectedAnswers.current.set(quizId, {
      answerId,
      selectedAnswer,
      actualAnswer,
    });
  };
  const quizSection = quizzes?.map((quiz, index) => {
    const buttonText = "a";
    const { correct_answer, all_answers, question } = quiz;
    return (
      <Quiz
        key={index}
        id={index}
        question={question}
        allAnswers={all_answers}
        correctAnswer={correct_answer}
        selectedAnswers={selectedAnswers?.current}
        addSelectedAnswers={addSelectedAnswers}
        optionCheckerBtnTxt={buttonText}
      />
    );
  });

  function handleClick(e) {
    if (quizState === QuizState.ANSWER) {
      setQuizState(QuizState.INITIAL);
      return;
    }

    const questionsLeftToAnswer =
      NO_OF_QUIZ_TO_FETCH - selectedAnswers.current.size;

    if (NO_OF_QUIZ_TO_FETCH === selectedAnswers.current.size) {
      setQuizState(QuizState.ANSWER);
      let scoreCount = 0;

      selectedAnswers.current.forEach((selectedAnswer, quizId) => {
        if (selectedAnswer.selectedAnswer === selectedAnswer.actualAnswer) {
          scoreCount++;
        }
      });

      setScore(scoreCount);
      toast.success(
        `You scored ${scoreCount}/${NO_OF_QUIZ_TO_FETCH} correct answers!`,
      );
      return;
    }

    toast.warning(
      `You're doing great! Just answer ${questionsLeftToAnswer} more question(s) to complete the quiz!`,
    );
  }

  return (
    <section className="quizzes-wrapper">
      {quizSection}
      <div className="score-section">
        <button className="score-checker_btn" onClick={e => handleClick(e)}>
          {quizState === QuizState.ANSWER ? "Play Again" : "Check Answer"}
        </button>
      </div>
      {quizState === QuizState.ANSWER && (
        <span className="message-txt">
          You scored {score}/{NO_OF_QUIZ_TO_FETCH} correct answers
        </span>
      )}
    </section>
  );
}

export default QuizSection;
