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
  const timeArr = time.split(":");
  return {
    hour: (Number(timeArr[0]) % 12).toString(),
    minute: timeArr[1],
    second: timeArr[2],
    meridiem: (Number(timeArr[0]) % 12).toString() == timeArr[0] ? "AM" : "PM",
  };
};
