import { useCallback, useRef, useState } from "react";
import quizCompleted from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

const QUESTION_TIME = 5000;

export default function Quiz() {
  const shuffledAnswers = useRef();
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

      console.log(userAnswers, "userAnswers");
    },
    [activeQuestionId]
  );

  const handleTimeout = useCallback(() => {
    console.log("test");
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

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionId].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
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
          <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
              const isSelected = userAnswers[userAnswers.length - 1];

              let cssClasses = "";

              if (answer === isSelected) {
                cssClasses = answerState;
              }
              return (
                <li key={answer} className="answer">
                  <button
                    className={cssClasses}
                    onClick={() => handleSelectAnswer(answer)}
                  >
                    {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
