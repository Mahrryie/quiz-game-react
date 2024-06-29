import { useCallback, useState } from "react";
import completedQuizImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
import Question from "./Question";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionID = answers.length;
  const quizIsComplete = activeQuestionID === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (answer) => {
      setAnswers((prevState) => [...prevState, answer]);
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
        questionKey={activeQuestionID}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
