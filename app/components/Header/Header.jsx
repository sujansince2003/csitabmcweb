import React from "react";
import "./header.css";
import Typewriter from "typewriter-effect";
import Particles from "react-particles";
import { particlesConfig } from "../../constant/Constant";
// import MessengerCustomerChat from "react-messenger-customer-chat";
const Header = () => {
  return (
    <section data-aos="fade-up" className="header" id="home">
      <Particles className="particles" params={particlesConfig} />

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
      {/* <MessengerCustomerChat pageId="151990145269970" appId="590338082605549" /> */}
    </section>
  );
};

export default Header;
