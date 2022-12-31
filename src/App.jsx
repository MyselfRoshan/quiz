import React, { useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

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
    encoding: "&encode=base64",
    sessionToken: "",
    difficulty: "", //? Easy='easy' Medium='medium' Hard='hard'
    category: "", //?
    type: "", //?Multiple choice ='multiple' true/false='boolean'
  });
  console.log(correctOptionArray);
  console.log(quizzesArray);

  useEffect(() => {
    const apiBaseURL = "https://opentdb.com/api.php?";

    async function getQuizQuestion() {
      const response = await fetch(
        `${apiBaseURL}amount=${apiUri.amount}${apiUri.encoding}${apiUri.sessionToken}`,
      );
      const data = response.ok
        ? await response.json()
        : Promise.reject(response);
      setQuizzesArray(data.results);
    }
    getQuizQuestion();

    async function getSessionToken() {
      const response = await fetch(
        "https://opentdb.com/api_token.php?command=request",
      );
      const sessionTokenData = await response.json();
      setApiUri({
        ...apiUri,
        sessionToken: sessionTokenData,
      });
      // console.log(sessionToken);
    }
    getSessionToken();
  }, []);
  const quizQuestions = quizzesArray.map((quiz, index) => {
    // ? To use randomise array use useEffect of choseOption from QuizQuestion
    const optionArray = [quiz.correct_answer, ...quiz.incorrect_answers];
    // optionArray.sort(() => Math.random() - 0.5);
    return (
      <QuizQuestion
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
    // ? Add error msg if all the answers are no chose
    if (btnTxt === "Check answers") {
      setButtonText("Play again");
    } else if (btnTxt === "Play again") {
      setQuizStart(true);
      setButtonText("Check answers");
    }
  }
  console.log(choseOption);
  const commonElements = correctOptionArray.filter((x) =>
    choseOption.some((y) => JSON.stringify(x) === JSON.stringify(y)),
  );
  return (
    <main className="quiz-container">
      {quizStart ? (
        <QuizStart setQuizStart={setQuizStart} />
      ) : (
        <>
          {quizQuestions}
          <div className="score-section">
            <span
              className="message-txt"
              hidden={buttonText === "Check answers"}
            >
              You scored {commonElements.length}/{apiUri.amount} correct answers
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
