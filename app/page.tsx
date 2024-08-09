"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Testimonials,
  Navigation,
  Header,
  About,
  Teams,
  Loader,
  Footer,
  List,
  Tlist,
} from "./components";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [loader, setloader] = useState(true);
  useEffect(() => {
    Aos.init({ easing: "ease", duration: 700 });
  });
  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2000);
  });
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Navigation />
          <Header />
          <About />
          <List />
          <Tlist />
          <Testimonials />
          <Footer />
        </>
      )}
    </div>
  );
}
