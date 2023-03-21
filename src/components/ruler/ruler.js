import dayjs from "dayjs";
import RulerEvent from "./rulerEvent";

const Ruler = ({ targetEvent, className, transform }) => {
  return (
    <div
      className={className}
      style={{
        ...RulerStyle,
        transform,
      }}
    >
      {targetEvent.map((event, i) => {
        const eventStart = event.start
          ? dayjs(event.start, "HH mm")
          : dayjs("00:00", "HH mm");
        const next = targetEvent[i + 1];
        const eventEnd = next
          ? dayjs(next.start, "HH mm").subtract(1, "minute")
          : dayjs("23:59", "HH mm");
        const eventDuration = eventEnd.diff(eventStart, "minutes");
        return (
          <RulerEvent
            event={event}
            eventDuration={eventDuration}
            key={event.key}
          />
        );
      })}
    </div>
  );
};

const RulerStyle = {
  position: "absolute",
  left: "50%",
  display: "flex",
  transition: "transform 1s linear",
};

export default Ruler;
