import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

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
    return <Summary userAnswers={answers} />;
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
