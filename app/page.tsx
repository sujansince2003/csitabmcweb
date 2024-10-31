"use client";
import "aos/dist/aos.css";
import About from "./about/page";
import Event from "./events/page";
import HeroLander from "@/components/custom/HeroLander/HeroLander";
import Testimonial from "@/components/custom/Testimonial";
import CommunityPartners from "@/components/custom/CommunityPartners";

export default function Home() {
  return (
    <>
      <HeroLander/>
      <About/>
      <Event/>
      <Testimonial/>
      <CommunityPartners/>
    </>
  );
}
