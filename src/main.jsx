import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./base.scss";
import { QuizStateProvider } from "./hooks/useQuizState";
import "./main.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuizStateProvider>
        <App />
      </QuizStateProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
