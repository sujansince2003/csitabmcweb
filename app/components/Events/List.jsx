import React from "react";
import Product from "./Product/Product";
import { products } from "../../data";
import "./List.css";
const List = () => {
  return (
    <div className="pl events">
      <h1 className="event-heading">Some Events Organized By CSITA-BMC</h1>
      <div className="pl-texts"></div>
      <div className="pl-list">
        {products.map((item,index) => (
          <Product
            title={item.title}
            key={index}
            img={item.img}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
