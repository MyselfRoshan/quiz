import { useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

function App() {
  const [score, setScore] = useState([]);
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

  const quizQuestions = quizzesArray.map((quiz, index) => {
    const options = [quiz.correct_answer, ...quiz.incorrect_answers];
    options.sort(() => Math.random() * 0.5);

    return (
      <QuizQuestion
        key={index}
        {...quiz}
        id={index}
        options={options}
        correctOptionArray={correctOptionArray}
        setChoseOption={setChoseOption}
        choseOption={choseOption}
        optionCheckerBtnTxt={buttonText}
      />
    );
  });

  function handleClick() {
    // Change the text content and api content on click
    if (buttonText === "Check answers") {
      setButtonText("Play again");
    }
    if (buttonText === "Play again") {
      setQuizStart(true);
      setButtonText("Check answers");
    }
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
              You scored {score.length}/{apiUri.amount} correct answers
            </span>
            <button className="score-checker_btn" onClick={handleClick}>
              {buttonText}
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
