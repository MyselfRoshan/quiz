import { useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

function App() {
  const [quizStart, setQuizStart] = useState(true);
  const [quizzesArray, setQuizzesArray] = useState([]);
  const [choseOption, setChoseOption] = useState([]);
  const [apiUri, setApiUri] = useState({
    amount: 10,
    difficulty: "", //? Easy='easy' Medium='medium' Hard='hard'
    category: "", //?
    type: "", //?Multiple choice ='multiple' true/false='boolean'
  });
  const [buttonText, setButtonText] = useState("Check answers");
  const correctOptionArray = quizzesArray.map((quiz) => quiz.correct_answer);
  console.log(correctOptionArray);
  console.log(choseOption);

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
    console.log(quizzesArray);

    return () => clearTimeout(getQuizQuestion());
  }, []);

  const quizQuestions = quizzesArray.map((quiz, index) => {
    const options = [...quiz.incorrect_answers, quiz.correct_answer];
    options.sort(() => Math.random() * 0.5);

    return (
      <QuizQuestion
        key={index}
        {...quiz}
        options={options}
        setChoseOption={setChoseOption}
      />
    );
  });

  function handleClick() {
    if (buttonText === "Check answers") setButtonText("Play again");
    if (buttonText === "Play again") {
      setQuizStart(true);
      setButtonText("Check answers");
    }
    const result =
      choseOption.length === correctOptionArray.length &&
      choseOption.every((clickedAnswer) =>
        correctOptionArray.includes(clickedAnswer),
      );
    if (result) {
      console.log("hi");
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
              You scored 3/{apiUri.amount} correct answers
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
