import { useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizStart from "./components/QuizStart";

function App() {
  const [quizStart, setQuizStart] = useState("true");

  return (
    <main className="quiz-container">
      {quizStart ? <QuizStart setQuizStart={setQuizStart} /> : <QuizQuestion />}
      {console.log(quizStart)}
    </main>
  );
}

export default App;
