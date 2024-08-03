import React from "react";

import "./Product.css";
import Image from "next/image";
const Product = ({ img, title, link, id }) => {
  return (
    <>
      <a className="p" href={link} target="_blank" rel="noreferrer">
        <div className="project-info">
          <span className="p-title">{title}</span>
        </div>
        <Image src={img} alt="" className="event-img" />
      </a>
    </>
  );
};

export default Product;
