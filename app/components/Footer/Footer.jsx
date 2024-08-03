import React from "react";
import logo from "../../Assets/partners/logohero.png";
import { BsFillTelephoneFill, BsFacebook } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

import { IconContext } from "react-icons";
import "./footer.css";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="FooterDiv">
      <footer>
        <div className="contact-item-wrapper">
          <ContactItem
            icon={
              <IconContext.Provider
                value={{
                  color: "black",
                  size: "33px",
                  className: "global-class-name",
                }}
              >
                <BsFillTelephoneFill />
              </IconContext.Provider>
            }
            title="Phone"
            text="+9779869144346"
          />
          <ContactItem
            icon={
              <IconContext.Provider
                value={{
                  color: "black",
                  size: "33px",
                  className: "global-class-name",
                }}
              >
                <a
                  href="https://goo.gl/maps/rPLSanzeQobPvRbb7"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HiLocationMarker />
                </a>
              </IconContext.Provider>
            }
            title="Address"
            text="Butwal-Golpark"
          />
          <ContactItem
            icon={
              <IconContext.Provider
                value={{
                  color: "black",
                  size: "33px",
                  className: "global-class-name",
                }}
              >
                <a href="mailto:csitassociationbmc@gmail.com">
                  <MdEmail />
                </a>
              </IconContext.Provider>
            }
            title="Email"
            text="csitassociationbmc@gmail.com"
          />
        </div>
        <div className="social-item-wrapper">
          <span className="logo-bmc">
            <Image src={logo} alt="logo" />
          </span>
          <div className="social-links-wrapper">
            <SocialLink
              sicon={
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "33px",
                    className: "global-class-name",
                  }}
                >
                  <a
                    href="https://www.facebook.com/csit.bmc/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsFacebook />
                  </a>
                </IconContext.Provider>
              }
            />
          </div>
        </div>
        <div className="footer--end">
          <h3 className="copyright-section ">
            © 2024 CSIT Association Of BMC. All Rights Reserved.{" "}
          </h3>
          <h5 className="copyright-section ">
            Developed by{" "}
            <a
              className="credit"
              target="_blank"
              href="https://www.facebook.com/sachin.nihc"
              rel="noreferrer"
            >
              Sachin Pantha
            </a>{" "}
            and{" "}
            <a
              className="credit"
              target="_blank"
              href="https://www.facebook.com/itsmesarad"
              rel="noreferrer"
            >
              Sarad Gyawali
            </a>{" "}
            &lt; / &gt;
          </h5>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

function ContactItem(props) {
  return (
    <section className="footer-contact">
      <div className="container">
        <span className="icon">{props.icon}</span>
        <div className="contact-desc">
          <span>
            <h1 className="heading-social">{props.title}</h1>
          </span>

          <div className="info">
            <p>{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink(props) {
  return <div className="social-icons">{props.sicon}</div>;
}
