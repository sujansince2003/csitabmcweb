"use client";
import React, { useEffect } from "react";
import "./hero.css";
import Typewriter from "typewriter-effect";
import Aos from "aos";
const HeroLander = () => {
  useEffect(() => {
    Aos.init({ easing: "ease", duration: 700 });
  });
  return (
    <section data-aos="fade-up" className="header" id="home">
      <div className="typewriter">
        <Typewriter
          options={{
            strings: [
              "We are Non-Political",
              "We are Technological",
              "We are Non-Profit",
              "We are Community",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </section>
  );
};

export default HeroLander;
