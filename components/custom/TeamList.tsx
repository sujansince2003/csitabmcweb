import { TeamDetails } from "@/app/data";
import { Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
export default function TeamList() {
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="relative text-2xl font-medium text-center mb-12 pb-2">
          Our
          <span className="text-red-600"> Teams </span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[2px] bg-red-600" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {TeamDetails.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.img}
                  alt={member.Name}
                  fill
                  className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-600 mb-1">
                  {member.Name}
                </h3>
                <p className="text-gray-600 mb-4">{member.Post}</p>
                <div className="flex justify-center items-center gap-3">
                  {member.Facebook && (
                    <a
                      href={member.Facebook}
                      className="text-gray-600 relative z-20 hover:text-blue-600 transition-colors"
                      aria-label={`${member.Facebook}'s Facebook profile`}
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {member.LinkedIn && (
                    <a
                      href={member.LinkedIn}
                      className="text-gray-600 relative z-20 hover:text-blue-600 transition-colors"
                      aria-label={`${member.Name}'s LinkedIn profile`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
