import { useState } from "react";
import QUESTIONS from "../questions";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";

const TIMEOUT_MS = 5000;

export default function Question({
  questionKey,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      const isSelectedAnswerCorrect =
        QUESTIONS[questionKey].answers[0] === answer;

      setAnswer((prevState) => ({
        ...prevState,
        isCorrect: isSelectedAnswerCorrect,
      }));

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }

  return (
    <div id="question">
      {/* key used to force update ProgressBar */}
      <ProgressBar timeout={TIMEOUT_MS} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[questionKey].text}</h2>
      <Answers
        answers={QUESTIONS[questionKey].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
