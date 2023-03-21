import dayjs from "dayjs";
import { useState, useEffect } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useClock from "./hooks/useClock";
import ClockFace from "./components/clockFace";
import RulerWrapper from "./components/ruler/rulerWrapper";
import { useFetchFromSheets } from "./hooks/useFetchFromSheets";

dayjs.extend(customParseFormat);

function App() {
  const { weekday } = useFetchFromSheets();
  const { dayjsDate } = useClock();
  const [todayEvent, setTodayEvent] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [dayStart, setDayStart] = useState(
    dayjsDate.set("hour", 0).set("minute", 0).set("second", 0)
  );
  const [className, setClassName] = useState("");

  const timePassed = dayjsDate.diff(dayStart, "seconds");

  const percentage = timePassed / 86400;

  useEffect(() => {
    setTodayEvent(weekday);
  }, [weekday]);

  useEffect(() => {
    let timeout;
    const minDateToNext = dayjsDate.set("hour", 22).set("minute", 0);
    if (nextEvent === null && dayjsDate.isAfter(minDateToNext)) {
      setNextEvent(todayEvent);
    }
    if (
      nextEvent !== null &&
      dayjsDate.isAfter(dayStart.add(1, "day").set("hour", 1).set("minute", 0))
    ) {
      setClassName("no-transition");
      setDayStart(dayjsDate.set("hour", 0).set("minute", 0));
      setNextEvent(null);
      timeout = setTimeout(() => {
        setClassName("");
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [dayjsDate, dayStart, nextEvent, todayEvent]);

  return todayEvent ? (
    <div className="App">
      <ClockFace calendar={todayEvent} />
      <RulerWrapper
        className={className}
        nextEvent={nextEvent}
        percentage={percentage}
        todayEvent={todayEvent}
      />
    </div>
  ) : null;
}

export default App;
