import { useState, useEffect } from "react";

export function useTimeFormat(ms: number): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    setTime(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
  }, [ms]);

  return time;
}
