import { useEffect, useState } from "react";

const INTERVAL_MS = 100;

export default function QuestionTimer({ time, onTimeout }) {
  const [timeValue, setTimeValue] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeValue((prevState) => prevState - INTERVAL_MS);
    }, INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("timeout");
    const timeout = setTimeout(() => {
      onTimeout();
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [time, onTimeout]);

  return (
    <>
      <progress id="question-time" value={timeValue} max={time} />
      <div>{timeValue}</div>
    </>
  );
}
