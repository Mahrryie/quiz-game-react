import { useCallback, useState } from "react";
import completedQuizImg from "../assets/quiz-complete.png";
import questions from "../questions";
import ProgressBar from "./ProgressBar";

const TIMEOUT_MS = 5000;

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionID = answers.length;
  const quizIsComplete = activeQuestionID === questions?.length;

  const handleSelectAnswer = useCallback(
    (answer) => setAnswers((prevState) => [...prevState, answer]),
    []
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

  const shuffledQuestion = [...questions[activeQuestionID].answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div id="quiz">
      <div id="question">
        {/* key used to force update ProgressBar */}
        <ProgressBar
          key={activeQuestionID}
          timeout={TIMEOUT_MS}
          onTimeout={handleSkipAnswer}
        />
        <h2>{questions[activeQuestionID].text}</h2>
        <ul id="answers">
          {shuffledQuestion.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
