"use client";

import { Partnerdata } from "@/app/data";
import { useEffect, useRef } from "react";

export default function Component() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let start: number | null = null;
    const totalWidth = marquee.scrollWidth / 2;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const move = (progress * 0.05) % totalWidth;
      marquee.style.transform = `translateX(-${move}px)`;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 overflow-hidden">
       <h2 className="relative text-2xl font-medium text-center mb-12 pb-2">We Have 
        <span className="text-red-600"> Worked With </span>
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-[2px] bg-red-600" />
      </h2>
      <div className="relative">
        <div
          className="flex items-center overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div ref={marqueeRef} className="flex">
            {Partnerdata.concat(Partnerdata).map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-16">
                <img
                  src={logo.Image}
                  alt="CSIT - BMC Partner"
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
