import React from "react";
import { BsFillTelephoneFill, BsFacebook } from "react-icons/bs";
import { LuInstagram } from "react-icons/lu";
import { SiLinkedin } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

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
            text1="+977-9869144346"
            text2="+977-9843409076"
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
            text1="Golpark-3,Butwal"
            text2="Butwal Multiple Campus"
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
            text1="csitassociationbmc@gmail.com"
          />
        </div>
        <div className="social-item-wrapper">
          <span className="logo-bmc">
            <Image
              src={
                "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
              }
              width={60}
              height={60}
              alt="logo"
            />
          </span>
          <div className="social-links-wrapper ">
            <div className="flex gap-3">
              <SocialLink
                sicon={
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "25px",
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
              <SocialLink
                sicon={
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "25px",
                      className: "global-class-name",
                    }}
                  >
                    <a
                      href="https://www.linkedin.com/company/csitabmc"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiLinkedin />
                    </a>
                  </IconContext.Provider>
                }
              />
              <SocialLink
                sicon={
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "25px",
                      className: "global-class-name",
                    }}
                  >
                    <a
                      href="https://x.com/csitabmc"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <RiTwitterXFill />
                    </a>
                  </IconContext.Provider>
                }
              />
              <SocialLink
                sicon={
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "25px",
                      className: "global-class-name",
                    }}
                  >
                    <a
                      href="https://www.instagram.com/csitabmc/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LuInstagram />
                    </a>
                  </IconContext.Provider>
                }
              />
            </div>
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
            <p>{props.text1}</p>
            <p>{props.text2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink(props) {
  return <div className="social-icons">{props.sicon}</div>;
}
