'use client'
import Image from "next/image";
import {
  Testimonials,
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
 
  return (
    <div>
      
        <>
          <Header />
          <About />
          <List />
          <Tlist />
        </>
    </div>
  );
}
