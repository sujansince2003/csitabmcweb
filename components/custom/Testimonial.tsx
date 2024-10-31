"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { TestimonialData } from "@/app/data";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}


export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TestimonialData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="relative text-2xl font-medium text-center mb-12 pb-2">Our 
        <span className="text-red-600"> Testimonial </span>
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-[2px] bg-red-600" />
      </h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {TestimonialData.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="p-6 md:p-8 flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.Name} />
                  <AvatarFallback>{testimonial.Name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-lg md:text-xl line-clamp-5 mb-6 text-muted-foreground italic">
                  "{testimonial.testimony}"
                </p>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.Name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.Post}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {TestimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                activeIndex === index ? "bg-primary w-6" : "bg-primary/30"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
