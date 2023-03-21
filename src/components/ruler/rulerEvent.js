import RulerTick from "./rulerTick";

const RulerEvent = ({ event, eventDuration }) => {
  return (
    <div
      style={{
        ...RulerEventStyle,
        backgroundColor: event.color,
      }}
    >
      {[...Array(eventDuration).keys()].map((tick) => (
        <RulerTick event={event} tick={tick} key={tick} eventDuration={eventDuration} />
      ))}
    </div>
  );
};

const RulerEventStyle = {
  height: "6em",
  display: "flex",
  borderRadius: "1em",
  margin: "0 0.25em",
};

export default RulerEvent;
