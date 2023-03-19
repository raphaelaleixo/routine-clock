import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useClock = () => {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const h = date.getHours(); // 0 - 23
  const m = date.getMinutes();
  const s = date.getSeconds(); // 0 - 59

  return {
    hours: h < 10 ? "0" + h : h,
    minutes: m < 10 ? "0" + m : m,
    seconds: s < 10 ? "0" + s : s,
    date,
    dayjsDate: dayjs(date),
  };
};

export default useClock;
