import React from "react";
import "./Description.css";
import Pragraph from "./Pragraph";

const EventDescription = ({ description }) => {
  return (
    <>
      <div className="middle-contents">
        {Object.keys(description).map((item, index) => (
          <div className="decs" key={index}>
            <span className="heading">{description[item].title}</span>
            <Pragraph pragraph={description[item].paragraph} />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventDescription;
