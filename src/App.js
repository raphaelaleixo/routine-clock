import dayjs from "dayjs";
import { useState, useEffect, useMemo } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useClock from "./hooks/useClock";
import ClockFace from "./components/clockFace";

const calendarEvent = [
  {
    key: "sleep",
    color: "#005F73",
    text: "Time to sleep",
    image: "sleep",
  },
  {
    key: "breakfast",
    start: "07:00",
    color: "#CA6702",
    text: "Good morning! Time for breakfast!",
  },
  {
    key: "daycare",
    start: "08:30",
    color: "#EE9B00",
    text: "Let's go to the daycare",
    image: "study",
  },
  {
    key: "playTime",
    start: "17:00",
    color: "#94D2BD",
    text: "Playtime!",
    image: "play",
  },
  {
    key: "dinner",
    start: "18:00",
    color: "#CA6702",
    text: "Time to eat dinner",
    image: "eat",
  },
  {
    key: "bath",
    start: "19:00",
    color: "#0A9396",
    text: "Let's take a bath",
    image: "bath",
  },
  {
    key: "sleep2",
    start: "20:00",
    color: "#005F73",
    text: "Time to sleep",
    image: "sleep",
  },
];

dayjs.extend(customParseFormat);

function App() {
  const { dayjsDate } = useClock();
  const [todayEvent, setTodayEvent] = useState(calendarEvent);
  const [nextEvent, setNextEvent] = useState(null);
  const [dayStart, setDayStart] = useState(
    dayjsDate.set("hour", 0).set("minute", 0)
  );
  const [className, setClassName] = useState("");

  const timePassed = dayjsDate.diff(dayStart, "seconds");

  const percentage = timePassed / 86400;

  useEffect(() => {
    let timeout;
    const minDateToNext = dayjsDate.set("hour", 22).set("minute", 0);
    if (nextEvent === null && dayjsDate.isAfter(minDateToNext)) {
      setNextEvent(calendarEvent);
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
  }, [dayjsDate, dayStart, nextEvent]);

  return (
    <div className="App">
      <ClockFace calendar={todayEvent} />
      <aside>
        <div
          className={className}
          style={{
            transform: `translateX(-${percentage * 100}%)`,
          }}
        >
          {todayEvent.map((event, i) => {
            const eventStart = event.start
              ? dayjs(event.start, "HH mm")
              : dayjs("00:00", "HH mm");
            const next = todayEvent[i + 1];
            const eventEnd = next
              ? dayjs(next.start, "HH mm").subtract(1, "minute")
              : dayjs("23:59", "HH mm");
            const eventDuration = eventEnd.diff(eventStart, "minutes");
            return (
              <div key={event.key} style={{ backgroundColor: event.color }}>
                {[...Array(eventDuration).keys()].map((tick) => (
                  <span key={tick} />
                ))}
              </div>
            );
          })}
        </div>
        {nextEvent ? (
          <div
            className={className}
            style={{
              transform: `translateX(${(1 - percentage) * 100}%)`,
            }}
          >
            {nextEvent.map((event, i) => {
              const eventStart = event.start
                ? dayjs(event.start, "HH mm")
                : dayjs("00:00", "HH mm");
              const next = todayEvent[i + 1];
              const eventEnd = next
                ? dayjs(next.start, "HH mm").subtract(1, "minute")
                : dayjs("23:59", "HH mm");
              const eventDuration = eventEnd.diff(eventStart, "minutes");
              return (
                <div key={event.key} style={{ backgroundColor: event.color }}>
                  {[...Array(eventDuration).keys()].map((tick) => (
                    <span key={tick} />
                  ))}
                </div>
              );
            })}
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export default App;
