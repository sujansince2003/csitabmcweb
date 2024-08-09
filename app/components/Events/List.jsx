import React, { useState, useEffect } from "react";

import Product from "./Product/Product";
import "./List.css";

const List = ({ title, showAll }) => {
  const [Events, setEvents] = useState([]);
  let List;
  useEffect(() => {
    fetch("./events/events.json")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setEvents(myJson);
      });
  }, []);

  if (showAll) {
    List = Object.keys(Events);
  } else {
    List = Object.keys(Events).slice(-8);
  }

  return (
    <>
      <div className="pl events">
        <h1 className="event-heading">{title}</h1>
        <div className="pl-texts"></div>
        <div className="pl-list">
          {List.reverse().map((event) => (
            <Product
              title={Events[event].Name}
              key={`${event}`}
              img={Events[event].Banner}
              link={`/${event}`}
              desc={Events[event].summary.slice(0, 150)}
            />
          ))}
        </div>
        {/* <div className=""></div> */}
      </div>
    </>
  );
};

export default List;
