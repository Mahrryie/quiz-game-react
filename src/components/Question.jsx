import Answers from "./Answers";
import ProgressBar from "./ProgressBar";

const TIMEOUT_MS = 50000;

export default function Question({
  questionText,
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      {/* key used to force update ProgressBar */}
      <ProgressBar timeout={TIMEOUT_MS} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
