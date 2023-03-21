const RulerTick = ({ tick, event, eventDuration }) => {
  const eventStart = event.start ? event.start.split(":") : [0, 0];
  const eventStartHours = eventStart ? parseInt(eventStart[0]) : 0;
  const eventStartMinutes = eventStart ? parseInt(eventStart[1]) : 0;
  const isFiveMinuteTick = (eventStartMinutes + tick + 1) % 5 === 0;
  const isHourTick = (eventStartMinutes + tick + 1) % 60 === 0;
  const isFirstTick = tick === 0;
  const isLastTick = tick === eventDuration - 1;

  const hoursPassed = eventStartHours + Math.ceil(tick / 60);

  return (
    <div
      key={tick}
      style={{
        ...TickStyle,
        opacity: isHourTick ? 0.5 : 0.1,
        margin: isHourTick
          ? "0.5em 0.25em"
          : isFiveMinuteTick
          ? "1.5em 0.25em"
          : "2.5em 0.25em",
        marginLeft: isFirstTick ? "0.5em" : "0.25em",
        marginRight: isLastTick ? "0.5em" : "0.25em",
      }}
    >
      {isHourTick ? (
        <span style={{...HourStyle, background: event.color}}>{hoursPassed < 10 ? `0${hoursPassed}` : hoursPassed}</span>
      ) : null}
    </div>
  );
};

const TickStyle = {
  background: "#001219",
  margin: "2.5em 0.25em",
  width: "0.5em",
  borderRadius: "1em",
  position: "relative",
};

const HourStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  color: "#001219",
  height: "2em",
  width: "2em",
  fontSize: "0.75em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "translate(-50%, -50%)"
}

export default RulerTick;
