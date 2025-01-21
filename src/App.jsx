import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import QuizSection from "./components/QuizSection";
import QuizStart from "./components/QuizStart";
import { useQuizState } from "./hooks/useQuizState";
import { QuizState } from "./utils/constant";
import { decodeURL3986, shuffle } from "./utils/helper";
import Spinner from "./components/Spinner";

function App() {
  const { quizState, setQuizState, apiOptions } = useQuizState();

  const {
    data: quizzes,
    isLoading,
    isError,
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

      if (response.status !== 200) {
        throw new Error("Something went wrong, please try again!");
      }

      const data = await response.json();

      return data?.results.map(quiz => {
        let { correct_answer, incorrect_answers, question } = quiz;

        correct_answer = decodeURL3986(correct_answer);
        incorrect_answers = incorrect_answers.map(ans => decodeURL3986(ans));
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

  function handleFetch() {
    setQuizState(QuizState.QUESTION);
    fetchQuizzes();
  }

  const handleLoading = () => {
    if (isError) {
      toast.error("Something went wrong, please try again!");
      return <QuizStart handleFetch={handleFetch} />;
    }

    if (isLoading) {
      return <Spinner />;
    }

    return <QuizSection quizzes={quizzes} isLoading={isLoading} />;
  };

  return (
    <>
      {quizState === QuizState.INITIAL ? (
        <QuizStart handleFetch={handleFetch} />
      ) : (
        handleLoading()
      )}
      <Toaster
        position="top-right"
        richColors
        closeButton
        className="toaster-section"
      />
    </>
  );
}

export default App;
