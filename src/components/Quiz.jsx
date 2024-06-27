import { useState } from "react";
import completedQuizImg from "../assets/quiz-complete.png";
import questions from "../questions";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionID = answers.length;
  const quizIsComplete = activeQuestionID === questions?.length;

  function handleSelectAnswer(answer) {
    // console.log(answer);
    setAnswers((prevState) => [...prevState, answer]);
  }

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
