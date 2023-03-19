import dayjs from "dayjs";
import useClock from "../hooks/useClock";

const ClockFace = ({ time, calendar }) => {
  const { hours, minutes } = useClock();
  const currentTime = dayjs(`${hours}:${minutes}:00`, "HH mm ss");

  const targetEvent = calendar.find((event, index) => {
    const nextEvent = calendar[index + 1];
    if (nextEvent) {
      return currentTime.isBefore(dayjs(nextEvent.start, "HH mm"));
    } else {
      return index === calendar.length - 1;
    }
  });

  return (
    <section style={{ backgroundColor: targetEvent.color }}>
      <img src={`/images/${targetEvent.image}.svg`} />
      <div>
        <time>
          <span>{hours}</span>
          <span className="dots">:</span>
          <span>{minutes}</span>
        </time>
        <span>{targetEvent.text}</span>
      </div>
    </section>
  );
};

export default ClockFace;
