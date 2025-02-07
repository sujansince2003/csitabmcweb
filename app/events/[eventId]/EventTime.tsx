import { Clock } from "lucide-react";
import React from "react";

const EventTime = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  if (!startTime) return null;

  const startTimeFormated = formatTime(startTime);
  if (!endTime)
    return (
      <div className="flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        <span>
          {startTimeFormated.hour}:{startTimeFormated.minute}{" "}
          {startTimeFormated.meridiem}
        </span>
      </div>
    );
  const endTimeFormated = formatTime(endTime);
  return (
    <div className="flex items-center">
      <Clock className="w-5 h-5 mr-2" />
      <span>
        {startTimeFormated.hour}:{startTimeFormated.minute}{" "}
        {startTimeFormated.meridiem} - {endTimeFormated.hour}:
        {endTimeFormated.minute} {endTimeFormated.meridiem}
      </span>
    </div>
  );
};
export default EventTime;

const formatTime = (time: string) => {
  const [hour, minute, second] = time.split(":").map(Number);
  const formattedHour = hour % 12 || 12;
  const meridiem = hour < 12 ? "AM" : "PM";
  return {
    hour: formattedHour.toString().padStart(2, "0"),
    minute: minute.toString().padStart(2, "0"),
    second: second.toString().padStart(2, "0"),
    meridiem,
  };
};
