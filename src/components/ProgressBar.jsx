import { useEffect, useState } from "react";

const INTERVAL_MS = 100;

export default function ProgressBar({ timeout, mode, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevState) => prevState - INTERVAL_MS);
    }, INTERVAL_MS);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <header>
      {remainingTime}
      <progress
        id="question-time"
        max={timeout}
        value={remainingTime}
        className={mode}
      />
    </header>
  );
}
