import React from "react";
import { BsFacebook } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import "./Teams.css";
import Image from "next/image";

const Teams = ({ img, Name, Post, Facebook, Linkedin }) => {
  return (
    <div className="parent">
      <div>
        <Image
          src={img}
          width={100}
          height={100}
          alt="team img"
          className="p-img"
        />
      </div>
      <div className="naming">
        <div className="Name">{Name}</div>
        <div className="Post">{Post}</div>
        <div className="social--icons">
          <div className="flex gap-2">
            <a href={Facebook} target="_blank">
              <BsFacebook size={"20px"} color="#3B5998" />
            </a>
            {Linkedin.length !== 0 && (
              <a href={Linkedin} target="_blank">
                <SiLinkedin size={"20px"} color="#3B5998" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
