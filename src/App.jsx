import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster } from "sonner";
import QuizSection from "./components/QuizSection";
import QuizStart from "./components/QuizStart";
import { useQuizState } from "./hooks/useQuizState";
import { NO_OF_QUIZ_TO_FETCH, QuizState } from "./utils/constant";
import { decodeURL3986, shuffle } from "./utils/helper";
import { useEffect } from "react";

function App() {
  const { quizState } = useQuizState();
  const [apiOptions, setApiOptions] = useState({
    amount: NO_OF_QUIZ_TO_FETCH,
    encode: "url3986",
    difficulty: null,
    type: null,
    category: null,
  });

  const {
    data: quizzes,
    isLoading,
    refetch: fetchQuizzes,
  } = useQuery({
    enabled: false,
    staleTime: 10000,
    queryKey: ["quizzes"],
    queryFn: async () => {
      const { amount, category, difficulty, type } = apiOptions;
      const BASE_URL = "https://opentdb.com/api.php";

      const params = {};
      if (amount) params.amount = amount;
      if (category) params.category = category;
      if (difficulty) params.difficulty = difficulty;
      if (type) params.type = type;
      const queryString = new URLSearchParams(params).toString();

      const response = await fetch(`${BASE_URL}?${queryString}`);
      const data = (await response.json()).results;

      return data?.map((quiz) => {
        let { correct_answer, incorrect_answers, question } = quiz;

        correct_answer = decodeURL3986(correct_answer);
        incorrect_answers = incorrect_answers.map((ans) => decodeURL3986(ans));
        const all_answers = [correct_answer, ...incorrect_answers];
        shuffle(all_answers);
        return {
          question: decodeURL3986(question),
          correct_answer,
          all_answers,
        };
      });
    },
  });

  return (
    <>
      {quizState === QuizState.QUESTION || quizState == QuizState.ANSWER ? (
        <QuizSection quizzes={quizzes} isLoading={isLoading} />
      ) : (
        <QuizStart setApiOptions={setApiOptions} fetchQuizzes={fetchQuizzes} />
      )}
      <Toaster
        position="top-right"
        richColors
        closeButton
        visibleToasts={100}
        className="toaster-section"
      />
    </>
  );
}

export default App;
