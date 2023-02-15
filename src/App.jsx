import React, { useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

function App() {
  const [quizStart, setQuizStart] = useState(true);
  const [quizzesArray, setQuizzesArray] = useState([]);
  const [choseOption, setChoseOption] = useState([]);
  const [buttonText, setButtonText] = useState("Check answers");
  const [optionArray, setOptionArray] = useState([]);
  const [apiUri, setApiUri] = useState({
    amount: 10,
    encoding: "&encode=url3986",
    sessionToken: "",
    difficulty: "", //? Easy='easy' Medium='medium' Hard='hard'
    category: "", //?
    type: "", //?Multiple choice ='multiple' true/false='boolean'
  });

  useEffect(() => {
    const apiBaseURL = "https://opentdb.com/api.php?";
    getQuizQuestion();

    async function getQuizQuestion() {
      const response = await fetch(
        `${apiBaseURL}amount=${apiUri.amount}${apiUri.encoding}`,
      );
      const data = response.ok
        ? await response.json()
        : Promise.reject(response);
      console.log(data);
      setQuizzesArray(data.results);
      setOptionArray(
        data.results.map((quiz) => {
          const optionArrays = [quiz.correct_answer, ...quiz.incorrect_answers];
          optionArrays.sort(() => Math.random() - 0.5);
          return optionArrays;
        }),
      );
    }
  }, [quizStart]);
  const quizQuestions = quizzesArray.map((quiz, index) => {
    return (
      <QuizQuestion
        key={index}
        {...quiz}
        id={index}
        optionArray={optionArray[index]}
        correctOptionArray={quiz.correct_answer}
        setChoseOption={setChoseOption}
        choseOption={choseOption}
        optionCheckerBtnTxt={buttonText}
      />
    );
  });

  function handleClick(e) {
    let btnTxt = e.target.textContent;
    // Change the text content and api content on click
    // ? Add error msg if all the answers are no chose
    if (btnTxt === "Check answers") {
      setButtonText("Play again");
    } else if (btnTxt === "Play again") {
      setQuizStart(true);
      setButtonText("Check answers");
    }
  }
  return (
    <>
      {quizStart ? (
        <QuizStart
          setQuizStart={setQuizStart}
          apiUri={apiUri}
          setApiUri={setApiUri}
        />
      ) : (
        <>
          <main className="quiz-container">
            {quizQuestions}
            <div className="score-section">
              {/* ! add no of correct answer*/}
              <span
                className="message-txt"
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
          </main>
        </>
      )}
    </>
  );
}

export default App;
