import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
// Import Swiper styles
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";

import "swiper/css/pagination";
import { Testidata } from "../../data";
import { Partdata } from "../../data";
import "./Testimonials.css";
// import { Pagination } from "swiper";
import SwiperCore from "swiper/core";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
SwiperCore.use([Autoplay]); //import swipercore to use autoplay
const Testimonials = () => {
  return (
    <div className="myReview">
      <div className="WellWishers">
        <h2 className="reviews--heading">What our wellwishers say</h2>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
          speed={2000}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {Testidata.map((item, key) => {
            //While rendering data on screen return the component with small brackets
            return (
              <div>
                <SwiperSlide key={item.id}>
                  <div className="hero--wrapper">
                    <div className="parentwrapper">
                      <div className="slidewrapper">
                        <Image
                          className="wrapperimg"
                          src={item.image}
                          alt="wrapper img"
                          width={100}
                          height={100}
                        />
                        <h5>{item.Name}</h5>
                        <h5 className="secHeading">{item.Post}</h5>
                      </div>
                      <p className="para">
                        <FaQuoteLeft className="quoteIcon" /> {item.testimony}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
        <div className="SwiperHeading">
          <h2 className="reviews--heading">We've worked with</h2>
        </div>
        <div className="imagePartners">
          <Swiper
            slidesPerView={5}
            autoplay={{
              delay: 1000,
            }}
            loop={true}
            speed={3000}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper2"
          >
            {Partdata.map((items, key) => {
              return (
                <div>
                  <SwiperSlide key={items.id}>
                    <Image
                      className="wrapperimg"
                      src={items.Image}
                      alt=""
                      fill
                    />
                  </SwiperSlide>
                </div>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
