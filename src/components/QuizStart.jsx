import React from "react";
import ModeSelectionBtn from "./ModeSelectionBtn";
import ModeSelectionContainer from "./ModeSelectionContainer";

export default function QuizStart(props) {
  const modes = {
    Difficulty: [
      { id: "", name: "Any Type" },
      { id: "easy", name: "Easy" },
      { id: "medium", name: "Medium" },
      { id: "hard", name: "Hard" },
    ],
    Type: [
      { id: "", name: "Any Type" },
      { id: "multiple", name: "Multiple Choice" },
      { id: "boolean", name: "True / False" },
    ],
    Category: [
      { id: "", name: "All Type" },
      { id: 9, name: "General Knowledge" },
      { id: 10, name: "Entertainment: Books" },
      { id: 11, name: "Entertainment: Film" },
      { id: 12, name: "Entertainment: Music" },
      { id: 13, name: "Entertainment: Musicals & Theatres" },
      { id: 14, name: "Entertainment: Television" },
      { id: 15, name: "Entertainment: Video Games" },
      { id: 16, name: "Entertainment: Board Games" },
      { id: 17, name: "Science & Nature" },
      { id: 18, name: "Science: Computers" },
      { id: 19, name: "Science: Mathematics" },
      { id: 20, name: "Mythology" },
      { id: 21, name: "Sports" },
      { id: 22, name: "Geography" },
      { id: 23, name: "History" },
      { id: 24, name: "Politics" },
      { id: 25, name: "Art" },
      { id: 26, name: "Celebrities" },
      { id: 27, name: "Animals" },
      { id: 28, name: "Vehicles" },
      { id: 29, name: "Entertainment: Comics" },
      { id: 30, name: "Science: Gadgets" },
      { id: 31, name: "Entertainment: Japanese Anime & Manga" },
      { id: 32, name: "Entertainment: Cartoon & Animations" },
    ],
  };
  const modeSelectionBtns = Object.keys(modes).map(
    (modeSelectionBtnTxt, index) => (
      <ModeSelectionBtn key={index} modeSelectionBtnTxt={modeSelectionBtnTxt} />
    ),
  );

  const modeSelectionContainers = Object.values(modes).map(
    (modeSelectionContainer, id) => (
      <ModeSelectionContainer key={id} {...modeSelectionContainer} />
    ),
  );
  return (
    <div className="quizzical">
      <h1>Quizzical</h1>
      <div className="quiz-mode-container">
        <h2>Quiz Modes</h2>
        <div className="mode-selection">{modeSelectionBtns}</div>
        <div className="mode-selection-containers">
          {modeSelectionContainers}
        </div>
      </div>
      <button
        className="start-quiz-btn"
        onClick={() => props.setQuizStart((prevQuizStart) => !prevQuizStart)}
      >
        Start Quiz
      </button>
    </div>
  );
}
