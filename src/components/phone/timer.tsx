import { useEffect, useState } from "react";

export interface ITimerProps {
  timeout: number;
}

export default function SessionTimer({ timeout }: ITimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (seconds <= timeout) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (seconds >= timeout) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, timeout]);
  return (
    <div>
      <span>{seconds}</span>
    </div>
  );
}
