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
    <section
      style={{ ...ClockWrapperStyle, backgroundColor: targetEvent.color }}
    >
      <div style={GradientStyle}></div>
      <img alt="" style={ImageStyle} src={`/images/${targetEvent.image}.svg`} />
      <div style={ClockFaceStyle}>
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

const ClockWrapperStyle = {
  borderRadius: "1em",
  flexGrow: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  transition: "background-color 1s ease-out",
  position: "relative",
  overflow: "hidden",
};

const GradientStyle = {
  backgroundImage: "linear-gradient(0deg, #00121955 0%, #00121900 30%)",
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const ImageStyle = {
  position: "absolute",
  height: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ClockFaceStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25em",
  padding: "1em 1em 3em",
  textYransform: "uppercase",
  position: "relative",
  zIndex: 2,
};

export default ClockFace;
