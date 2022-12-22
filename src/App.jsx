import { useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

function App() {
  const [quizStart, setQuizStart] = useState(true);
  console.log(quizStart);
  return (
    <main className="quiz-container">
      {quizStart ? <QuizStart setQuizStart={setQuizStart} /> : <QuizQuestion />}
    </main>
  );
}

export default App;
