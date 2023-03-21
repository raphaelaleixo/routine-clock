import Ruler from "./ruler";

const RulerWrapper = ({ className, todayEvent, nextEvent, percentage }) => {
  return (
    <div style={WrapperStyle}>
      <Ruler
        className={className}
        targetEvent={todayEvent}
        transform={`translateX(calc(-${percentage * 100}%))`}
      />
      {nextEvent ? (
        <Ruler
          className={className}
          targetEvent={nextEvent}
          transform={`translateX(${(1 - percentage) * 100}%)`}
        />
      ) : null}
      <div style={ArrowStyle}></div>
    </div>
  );
};

const WrapperStyle = {
  display: "flex",
  overflow: "hidden",
  margin: " 0 -2em",
  position: "relative",
  height: "6em",
};

const ArrowStyle = {
  background: "#f7fff7",
  position: "absolute",
  left: "50%",
  height: "3em",
  width: "3em",
  borderRadius: "0.5em",
  transform: "translate(-50%, -70%) rotate(45deg) "
}

export default RulerWrapper;
