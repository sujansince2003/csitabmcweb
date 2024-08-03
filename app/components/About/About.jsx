import React from "react";
import ImG2 from "../../Assets/partners/aboutimg.jpeg";
import "./About.css";
import Image from "next/image";
const about = () => {
  return (
    <div className="about">
      <div className="about-left">
        <div className="about-card bg"></div>
        <div className="about-card">
          <Image src={ImG2} alt="" className="about-img" />
        </div>
      </div>
      <div className="about-right">
        <h1 className="a-title">About Us</h1>
        <div className="sep">
          <p className="a-sub" data-aos="fade-left">
            <span style={{ fontWeight: "bold" }}>CSIT Association of BMC</span>{" "}
            is a non-profitable organization inside Butwal Multiple Campus
            created for the welfare of CSIT Students by the CSIT students and
            operating actively since 2016
          </p>
          <br />
          <p className="a-desc" data-aos="fade-left" data-aos-delay={200}>
            We have been conducting several tech and non-tech workshops
            internally and helping students to connect with national tech
            community. Similarly, we also play a part in assisting our college
            department for technical assistance and provide suggestions based on
            technology criteria.
          </p>
          <br />
          <p className="a-desc" data-aos="fade-left" data-aos-delay={300}>
            We believe that the students should be provided with the relevant
            skills and platform to prepare them for their career and at last we
            are at Butwal Multiple Campus with the motive of helping students to
            address their problem as well.
          </p>
        </div>
      </div>
    </div>
  );
};

export default about;
