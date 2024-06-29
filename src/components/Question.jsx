import { useState } from "react";
import QUESTIONS from "../questions";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";

const TIMEOUT_MS = 5000;
const TIMEOUT_TO_CORRECT_MS = 1000;
const TIMEOUT_TO_SELECT_MS = 2000;

export default function Question({
  questionKey,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timerVal = TIMEOUT_MS;

  if (answer.selectedAnswer) {
    timerVal = TIMEOUT_TO_CORRECT_MS;
  }

  if (answer.isCorrect !== null) {
    timerVal = TIMEOUT_TO_SELECT_MS;
  }

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
      }, TIMEOUT_TO_SELECT_MS);
    }, TIMEOUT_TO_CORRECT_MS);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <ProgressBar
        key={timerVal}
        timeout={timerVal}
        mode={answerState}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
      />
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
