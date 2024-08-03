import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import "./Teams.css";
import Image from "next/image";

const Teams = ({ img, Name, Post, Facebook, Github }) => {
  return (
    <div className="parent">
      <div>
        <Image src={img} alt="" className="p-img" />
      </div>
      <div className="naming">
        <div className="Name">{Name}</div>
        <div className="Post">{Post}</div>
        <div className="social--icons">
          <div>
            <a href={Facebook} target="_blank">
              <BsFacebook size={"25px"} color="#3B5998" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
