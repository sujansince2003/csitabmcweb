"use client";
import Image from "next/image";
import {
  Testimonials,
  Header,
  Teams,
  Loader,
  Footer,
  List,
  Tlist,
} from "./components";
import "aos/dist/aos.css";

export default function Home() {
  return (
    <div>
      <Header />
      <List />
      <Tlist />
    </div>
  );
}
