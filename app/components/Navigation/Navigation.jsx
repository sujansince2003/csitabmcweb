import React, { useState } from "react";
import IMG from "../../Assets/partners/logohero.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import "./navigation.css";
import { Link as ScrollLink } from "react-scroll";
import { Links } from "../../data";
import Image from "next/image";
const Navigation = () => {
  window.onscroll = () => {
    let navbar = document.querySelector(".nav-area");
    if (window.scrollY > 660) {
      navbar.classList.add("toggle");
    } else {
      navbar.classList.remove("toggle");
    }
  };
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [hideHam, setHideHam] = useState(false);
  return (
    <div className="nav-area">
      <div className="logo">
        <Image src={IMG} />
      </div>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
          setHideHam(!hideHam);
        }}
      >
        {hideHam ? (
          <MdClose color="#7676f1" className="close-icon" />
        ) : (
          <GiHamburgerMenu color="#7676f1" className="ham-icon" />
        )}
      </button>
      <ul className={isNavExpanded ? "navlinks expanded" : "navlinks"}>
        {Links.map((link, id) => (
          <ScrollLink
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
              setHideHam(!hideHam);
            }}
            className="link"
            key={`${link.title}-${id}`}
            to={link.path}
            spy={true}
            activeClass="active"
          >
            {link.title}
          </ScrollLink>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
