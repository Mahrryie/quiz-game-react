import { useCallback, useState } from "react";
import quizCompleted from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import Answers from "./Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

const QUESTION_TIME = 5000;

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUsersAnswers] = useState([]);

  const activeQuestionId =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
      setAnswerState("selected");
      setUsersAnswers((prevState) => {
        return [...prevState, answer];
      });

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionId].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionId]
  );

  const handleTimeout = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  const questionsOver = userAnswers.length === QUESTIONS.length;

  if (questionsOver) {
    return (
      <div id="summary">
        <img src={quizCompleted} alt="Quiz complete" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  return (
    <>
      <div id="quiz">
        <QuestionTimer
          key={`timer-${activeQuestionId}`}
          onTimeout={handleTimeout}
          time={QUESTION_TIME}
        />
        <div id="question">
          <p>
            {activeQuestionId + 1}/{QUESTIONS.length}
          </p>
          <h2>{QUESTIONS[activeQuestionId].text}</h2>
          <Answers
            key={`answers-${activeQuestionId}`}
            answers={QUESTIONS[activeQuestionId].answers}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            answerState={answerState}
            onSelect={handleSelectAnswer}
          />
        </div>
      </div>
    </>
  );
}
