import React from "react";

const Pragraph = ({ pragraph }) => {
  if (typeof pragraph == "object") {
    return (
      <div>
        {pragraph.map((item, index) => (
          <p className="description" key={index}>
            {item}
          </p>
        ))}
      </div>
    );
  } else {
    return <p className="description">{pragraph}</p>;
  }
};

export default Pragraph;
