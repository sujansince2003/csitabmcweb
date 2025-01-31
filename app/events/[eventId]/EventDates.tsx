import { Calendar } from "lucide-react";
import React from "react";

const EventDates = ({
  startDate,
  endDate,
}: {
  startDate: Date | string;
  endDate: Date | string | null;
}) => {
  startDate = new Date(startDate as string);
  if (!endDate) {
    return (
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        <span>
          {months[startDate.getMonth()]} {startDate.getDate()}
        </span>
      </div>
    );
  }
  endDate = new Date(endDate as string);

  return (
    <div className="flex items-center">
      <Calendar className="w-5 h-5 mr-2" />
      <span>
        {months[startDate.getMonth()]} {startDate.getDate()} -{" "}
        {months[endDate.getMonth()]} {endDate.getDate()}
      </span>
    </div>
  );
};

export default EventDates;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
