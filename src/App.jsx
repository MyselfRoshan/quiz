import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
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
  console.log(apiUri);

  const apiCall = useCallback(() => {
    const apiBaseURL = "https://opentdb.com/api.php?";
    getQuizQuestion();

    async function getQuizQuestion() {
      const response = await fetch(
        `${apiBaseURL}amount=${apiUri.amount}${apiUri.encoding}${apiUri.difficulty}${apiUri.type}${apiUri.category}`,
      );
      const data = response.ok
        ? await response.json()
        : Promise.reject(response);
      console.log(data);
      /*
      Code 0: Success Returned results successfully.
      Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
      Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
      Code 3: Token Not Found Session Token does not exist.
      Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary
      */
      const code = data.response_code;
      if (!code) {
        setQuizzesArray(data.results);
        setOptionArray(
          data.results.map((quiz) => {
            const optionArrays = [
              quiz.correct_answer,
              ...quiz.incorrect_answers,
            ];
            optionArrays.sort(() => Math.random() - 0.5);
            return optionArrays;
          }),
        );
      }
      if (code === 1) {
        setTimeout(() => {
          alert(
            "No results found for selected options. Redirecting to main page",
          );
          setQuizStart(true);
        }, 5000);
      }
    }
  }, [apiUri]);

  useEffect(() => {
    apiCall();
  }, [apiUri]);

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
      apiCall();
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
