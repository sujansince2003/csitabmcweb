import React from "react";
import './timeLine.css'

import { FaChalkboardTeacher } from "react-icons/fa"; 

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const TimeLine = ({events}) => {
  return (
    <div className="TimeLine">
        <h2 className="timeLine-title">Timeline of Event</h2>

 <VerticalTimeline>
      
      {events.map( (event,index) =>
             <VerticalTimelineElement
             key={index}
        className="vertical-timeline-element--education"
        date={event.time}
        iconStyle={{ background: "#1c67a8", color: "#fff" }}
        icon={<FaChalkboardTeacher />}
        >
        <h3 className="timeline-primary">
          {event.primary}
        </h3>
        <p>{event.secondary}</p>

      </VerticalTimelineElement>
)
      }

      </VerticalTimeline>
    </div>
  );
};

export default TimeLine;
