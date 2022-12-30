import React, { useCallback, useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

const QuizQuestionMemo = React.memo(QuizQuestion);

function App() {
  const [quizStart, setQuizStart] = useState(true);
  const [quizzesArray, setQuizzesArray] = useState([]);
  const [choseOption, setChoseOption] = useState([]);
  const [buttonText, setButtonText] = useState("Check answers");
  const correctOptionArray = quizzesArray.map((quiz, index) => {
    return { id: index, text: quiz.correct_answer };
  });

  const [apiUri, setApiUri] = useState({
    amount: 10,
    difficulty: "", //? Easy='easy' Medium='medium' Hard='hard'
    category: "", //?
    type: "", //?Multiple choice ='multiple' true/false='boolean'
  });
  console.log(correctOptionArray);

  useEffect(() => {
    const apiBaseURL = "https://opentdb.com/api.php?";
    // const numberOfquiz = "10";
    // const encoding = "&encode=base64";

    async function getQuizQuestion() {
      const response = await fetch(`${apiBaseURL}amount=${apiUri.amount}`);
      const data = response.ok
        ? await response.json()
        : Promise.reject(response);
      setQuizzesArray(data.results);
    }
    getQuizQuestion();
  }, []);
  useCallback;
  const quizQuestions = quizzesArray.map((quiz, index) => {
    const optionArray = [quiz.correct_answer, ...quiz.incorrect_answers];
    optionArray.sort(() => Math.random() - 0.5);
    return (
      <QuizQuestionMemo
        key={index}
        {...quiz}
        id={index}
        optionArray={optionArray}
        correctOptionArray={correctOptionArray}
        setChoseOption={setChoseOption}
        choseOption={choseOption}
        optionCheckerBtnTxt={buttonText}
        quizStart={quizStart}
      />
    );
  });

  function handleClick(e) {
    let btnTxt = e.target.textContent;
    // Change the text content and api content on click
    if (btnTxt === "Check answers") {
      setButtonText("Play again");
    } else if (btnTxt === "Play again") {
      setQuizStart(true);
      setButtonText("Check answers");
    }
    // ? get score points i.e. 1 to 10
    const commonElements = choseOption.filter((x) =>
      correctOptionArray.some((y) => JSON.stringify(y) === JSON.stringify(x)),
    );
    console.log(commonElements);
  }

  return (
    <main className="quiz-container">
      {quizStart ? (
        <QuizStart setQuizStart={setQuizStart} />
      ) : (
        <>
          {quizQuestions}
          <div className="score-section">
            <span
              className="score-text"
              hidden={buttonText === "Check answers"}
            >
              You scored {}/{apiUri.amount} correct answers
            </span>
            <button
              className="score-checker_btn"
              onClick={(e) => handleClick(e)}
            >
              {buttonText}
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
