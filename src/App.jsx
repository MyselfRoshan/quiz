import { useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

function App() {
  const [quizStart, setQuizStart] = useState(true);
  const [quizzesArray, setQuizzesArray] = useState([]);

  useEffect(() => {
    const apiBaseURL = "https://opentdb.com/api.php?";
    const numberOfquiz = "10";
    // const encoding = "&encode=base64";

    async function getQuizQuestion() {
      const response = await fetch(`${apiBaseURL}amount=${numberOfquiz}`);
      const data = response.ok
        ? await response.json()
        : Promise.reject(response);
      setQuizzesArray(data.results);
    }
    getQuizQuestion();
  }, []);

  const quizQuestions = quizzesArray.map((quiz, index) => {
    const randomizeQuizAnswers = [
      ...quiz.incorrect_answers,
      quiz.correct_answer,
    ];
    randomizeQuizAnswers.sort(() => Math.random() * 0.5);

    return (
      <QuizQuestion key={index} {...quiz} answers={randomizeQuizAnswers} />
    );
  });

  function handleClick() {
    console.log("hi");
  }
  return (
    <main className="quiz-container">
      {quizStart ? (
        <QuizStart setQuizStart={setQuizStart} />
      ) : (
        <>
          {quizQuestions}
          <button className="check-playagain" onClick={handleClick}>
            Check answers
          </button>
        </>
      )}
    </main>
  );
}

export default App;
