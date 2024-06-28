import { useCallback, useState } from "react";
import completedQuizImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
import Question from "./Question";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionID =
    answerState === "" ? answers.length : answers.length - 1;
  const quizIsComplete = activeQuestionID === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (answer) => {
      setAnswerState("answered");
      setAnswers((prevState) => [...prevState, answer]);

      setTimeout(() => {
        if (QUESTIONS[activeQuestionID].answers[0] === answer) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionID]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={completedQuizImg} alt="Quiz completed!" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionID}
        questionText={QUESTIONS[activeQuestionID].text}
        answers={QUESTIONS[activeQuestionID].answers}
        selectedAnswer={answers[answers.length - 1]}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
